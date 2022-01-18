-- Verify connectivity-intake:appschema on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('connectivity_intake', 'usage');

ROLLBACK;
