-- Verify connectivity-intake:util_functions/grant_permissions on pg

begin;

select pg_get_functiondef('connectivity_intake_public.grant_permissions(text, text, text, text)'::regprocedure);
select pg_get_functiondef('connectivity_intake_public.grant_permissions(text, text, text, text[], text)'::regprocedure);

rollback;
