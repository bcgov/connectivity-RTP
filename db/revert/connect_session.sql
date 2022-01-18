-- Revert connectivity-intake:connect_session from pg

BEGIN;

drop table connectivity_intake.connect_session;

COMMIT;
