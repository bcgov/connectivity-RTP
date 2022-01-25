-- Deploy connectivity-intake:tables/applications to pg
-- requires: schemas/public

begin;

create table if not exists connectivity_intake_public.applications (
  id serial not null,
  form_data jsonb,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp,
  primary key(id)
);

commit;
