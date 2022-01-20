-- Verify connectivity-intake:appschema on pg

begin;

select pg_catalog.has_schema_privilege('connectivity_intake', 'usage');

rollback;
