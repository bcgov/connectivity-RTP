-- Verify connectivity-intake:applications on pg

begin;

select id, form_data, created_at, updated_at 
  from connectivity_intake.applications 
 where false;

rollback;
