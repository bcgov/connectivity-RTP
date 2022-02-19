-- Deploy connectivity-intake:tables/applications to pg
-- requires: schemas/public

begin;

create table if not exists connectivity_intake_public.applications (
  id integer primary key generated always as identity,
  owner uuid,
  form_data jsonb,
  status varchar(1000) default 'draft',
  unique(owner)
);

select connectivity_intake_private.upsert_timestamp_columns('connectivity_intake_public', 'applications');

create index connectivity_intake_owner on connectivity_intake_public.applications(owner);

create trigger _insert_owner
  before insert on connectivity_intake_public.applications
  for each row
  execute procedure connectivity_intake_public.set_owner();

create trigger _update_owner
  before update on connectivity_intake_public.applications
  for each row
  execute procedure connectivity_intake_public.set_owner();

do
$grant$
begin

-- Grant connectivity_intake_auth_user permissions
perform connectivity_intake_public.grant_permissions('select', 'applications', 'connectivity_intake_auth_user');
perform connectivity_intake_public.grant_permissions('insert', 'applications', 'connectivity_intake_auth_user');
perform connectivity_intake_public.grant_permissions('update', 'applications', 'connectivity_intake_auth_user',
  ARRAY['id', 'owner', 'form_data', 'created_by', 'created_at', 'updated_by', 'updated_at', 'archived_by', 'archived_at']);

-- Grant connectivity_intake_guest permissions
perform connectivity_intake_public.grant_permissions('select', 'applications', 'connectivity_intake_guest');

end
$grant$;

-- Enable row level security
alter table connectivity_intake_public.applications enable row level security;

do
$policy$
begin
-- connectivity_intake_auth_user RLS: can only see and modify its own record
perform connectivity_intake_public.upsert_policy('internal_select_connectivity_intake_auth_user', 'applications', 'select', 'connectivity_intake_auth_user', 'owner=(select sub from connectivity_intake_public.session())');
perform connectivity_intake_public.upsert_policy('internal_insert_connectivity_intake_auth_user', 'applications', 'insert', 'connectivity_intake_auth_user', 'owner=(select sub from connectivity_intake_public.session())');
perform connectivity_intake_public.upsert_policy('internal_update_connectivity_intake_auth_user', 'applications', 'update', 'connectivity_intake_auth_user', 'owner=(select sub from connectivity_intake_public.session())');

-- connnectivity_intake_guest RLS: can only see its own (empty) record
perform connectivity_intake_public.upsert_policy('guest_select_connectivity_intake_auth_user', 'applications', 'select', 'connectivity_intake_guest', 'owner=(select sub from connectivity_intake_public.session())');

end
$policy$;

comment on table connectivity_intake_public.applications is 'Table containing application form data.';
comment on column connectivity_intake_public.applications.id is 'Serialized integer unique to the form application.';
comment on column connectivity_intake_public.applications.owner is 'The owner of the form data.';
comment on column connectivity_intake_public.applications.form_data is 'The form data the project is collecting.';
comment on column connectivity_intake_public.applications.created_at is 'When the form was created.';
comment on column connectivity_intake_public.applications.created_by is 'Owner uuid the form was created by.';
comment on column connectivity_intake_public.applications.updated_at is 'When the form was last updated.';
comment on column connectivity_intake_public.applications.updated_by is 'Owner uuid the form was updated by.';
comment on column connectivity_intake_public.applications.archived_at is 'When the row was archived.';
comment on column connectivity_intake_public.applications.archived_by is 'Owner uuid the row was archived by.';

commit;
