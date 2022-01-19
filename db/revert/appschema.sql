-- Revert connectivity-intake:appschema from pg

begin;

drop schema connectivity_intake;

commit;
