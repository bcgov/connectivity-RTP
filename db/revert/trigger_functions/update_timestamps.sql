-- Revert connectivity-intake:trigger_functions/update_timestamps from pg

begin;

drop function connectivity_intake_public.update_timestamps;

commit;
