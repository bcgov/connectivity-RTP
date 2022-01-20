-- Revert connectivity-intake:tables/applications from pg

begin;

drop table connectivity_intake_public.applications;

commit;
