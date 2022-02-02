-- Verify connectivity-intake:util_functions/upsert_policy on pg

begin;

select pg_get_functiondef('connectivity_intake_public.upsert_policy(text,text,text,text,text,text)'::regprocedure);
select pg_get_functiondef('connectivity_intake_public.upsert_policy(text,text,text,text,text,text,text)'::regprocedure);

rollback;
