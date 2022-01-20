-- Revert connectivity-intake:tables/connect_session from pg

begin;

drop table connectivity_intake_private.connect_session;

commit;
