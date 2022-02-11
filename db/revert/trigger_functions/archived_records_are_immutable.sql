-- Revert connectivity-intake:trigger_functions/archived_records_are_immutable from pg

begin;

drop function connectivity_intake_public.archived_records_are_immutable;

commit;
