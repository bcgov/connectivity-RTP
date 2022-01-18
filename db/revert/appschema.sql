-- Revert connectivity-intake:appschema from pg

BEGIN;

drop schema connectivity_intake;

COMMIT;
