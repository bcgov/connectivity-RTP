-- Verify connectivity-intake:trigger_functions/archived_records_are_immutable on pg

begin;

select pg_get_functiondef('connectivity_intake_public.archived_records_are_immutable()'::regprocedure);

rollback;
