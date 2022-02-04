-- Verify connectivity-intake:trigger_functions/update_timestamps on pg

begin;

select pg_get_functiondef('connectivity_intake_public.update_timestamps()'::regprocedure);

rollback;
