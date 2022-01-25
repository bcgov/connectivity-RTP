-- Deploy connectivity-intake:schemas/private to pg
-- requires: create_roles

begin;

create schema connectivity_intake_private;
grant usage on schema connectivity_intake_private to connectivity_intake_guest;
comment on schema connectivity_intake_private is 'The private schema for the connectivity intake.';

commit;

