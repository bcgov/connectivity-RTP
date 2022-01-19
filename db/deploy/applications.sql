-- Deploy connectivity-intake:applications to pg
-- requires: appschema

begin;

drop table if exists connectivity_intake.applications;

create table if not exists connectivity_intake.applications (
  id serial not null,
  form_data jsonb,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp,
  primary key(id)
);

commit;
