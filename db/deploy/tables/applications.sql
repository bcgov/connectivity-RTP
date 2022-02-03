-- Deploy connectivity-intake:tables/applications to pg
-- requires: schemas/public

begin;

create table if not exists connectivity_intake_public.applications (
  id serial not null,
  owner uuid not null,
  form_data jsonb,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp,
  primary key(id)
);

select connectivity_intake_public.upsert_timestamp_column('connectivity_intake_public', 'applications');

create index connectivity_intake_owner_uuid on connectivity_intake_public.applications(uuid);

do
$grant$
begin

-- Grant connectivity_intake_auth_user permissions
perform connectivity_intake_public.grant_permissions('select', 'applications', 'connectivity_intake_auth_user');
perform connectivity_intake_public.grant_permissions('insert', 'applications', 'connectivity_intake_auth_user');
perform connectivity_intake_public.grant_permissions('update', 'applications', 'connectivity_intake_auth_user'
  ARRAY['first_name', 'last_name', 'email_address', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by']);

-- Grant connectivity_intake_guest permissions
perform connectivity_intake_public.grant_permissions('select', 'applications', 'connectivity_intake_guest');

end
$grant$

-- Enable row level security
alter table connectivity_intake_public.applications enable row level security;

do
$policy$
begin
-- connectivity_intake_auth_user RLS: can see all users, but can only modify its own record
perform connectivity_intake_public.upsert_policy('internal_select_connectivity_intake_auth_user', 'applications', 'select', 'connectivity_intake_auth_user', 'true');
perform connectivity_intake_public.upsert_policy('internal_insert_connectivity_intake_auth_user', 'applications', 'insert', 'connectivity_intake_auth_user', 'uuid=(select sub from connectivity_intake_private.session())');
perform connectivity_intake_public.upsert_policy('internal_update_connectivity_intake_auth_user', 'applications', 'update', 'connectivity_intake_auth_user', 'uuid=(select sub from connectivity_intake_private.session())');

-- connnectivity_intake_guest RLS: can only see its own (empty) record
perform connectivity_intake_public.upsert_policy('guest_select_connectivity_intake_auth_user', 'applications', 'select', 'connectivity_intake_guest', 'uuid=(select sub from connectivity_intake_private.session())');

end
$policy$

comment on table connectivity_intake_public.applications is 'Table containing application form data';
comment on column connectivity_intake_public.applications.id is 'Serialized integer unique to the form application';
comment on column connectivity_intake_public.applications.owner is 'The owner of the form data';
comment on column connectivity_intake_public.applications.form_data is 'The form data the project is collecting'
comment on column connectivity_intake_public.applications.created_at is 'When the form was created';
comment on column connectivity_intake_public.applications.updated_at is 'When the form was last updated';

commit;
