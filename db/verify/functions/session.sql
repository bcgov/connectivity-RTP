-- Verify connectivity-intake:functions/session on pg

begin;

select pg_get_functiondef('connectivity_intake_public.session()'::regprocedure);

rollback;
