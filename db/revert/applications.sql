-- Revert connectivity-intake:applications from pg

begin;

drop table connectivity_intake.applications;

commit;
