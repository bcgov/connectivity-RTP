-- Verify connectivity-intake:schemas/private on pg

begin;

select pg_catalog.has_schema_privilege('connectivity_intake_private', 'usage');

rollback;
