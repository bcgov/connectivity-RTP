-- Revert connectivity-intake:schemas/private from pg

begin;

drop schema connectivity_intake_private;

commit;
