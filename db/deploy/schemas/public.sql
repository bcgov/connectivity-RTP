-- Deploy connectivity-intake:schemas/public to pg
-- requires: create_roles

begin;

create schema connectivity_intake_public;
grant usage on schema connectivity_intake_public to connectivity_intake_guest;
comment on schema connectivity_intake_public is 'The public API schema for the connectivity intake.';

commit;
