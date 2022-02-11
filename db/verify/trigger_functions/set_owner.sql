-- Verify connectivity-intake:trigger_functions/set_owner on pg

begin;

select pg_get_functiondef('connectivity_intake_public.set_owner()'::regprocedure);

rollback;
