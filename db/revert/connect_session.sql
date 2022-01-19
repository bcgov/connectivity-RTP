-- Revert connectivity-intake:connect_session from pg

begin;

drop table connectivity_intake.connect_session;

commit;
