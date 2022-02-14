-- Revert connectivity-intake:trigger_functions/set_random_reference_number from pg

begin;

drop function connectivity_intake_public.set_random_reference_number;

commit;
