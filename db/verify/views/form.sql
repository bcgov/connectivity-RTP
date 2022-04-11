-- Verify connectivity-intake:views/form on pg

BEGIN;

select pg_catalog.has_table_privilege('connectivity_intake_public.form', 'select');

ROLLBACK;
