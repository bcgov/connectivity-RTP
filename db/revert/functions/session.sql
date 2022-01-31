-- Revert connectivity-intake:functions/session from pg

begin;

drop function connectivity_intake_public.session();

commit;
