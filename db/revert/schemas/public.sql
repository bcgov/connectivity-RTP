-- Revert connectivity-intake:schemas/public from pg

begin;

drop schema connectivity_intake_public;

commit;
