-- Verify connectivity-intake:trigger_functions/set_random_id on pg

begin;

select pg_get_functiondef('connectivity_intake_public.set_random_id()'::regprocedure);

rollback;
