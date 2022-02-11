-- Revert connectivity-intake:trigger_functions/set_owner from pg

begin;

drop function connectivity_intake_public.set_owner;

commit;
