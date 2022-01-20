-- Verify connectivity-intake:schemas/public on pg

begin;

select pg_catalog.has_schema_privilege('connectivity_intake_public', 'usage');

rollback;
