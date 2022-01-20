-- Verify connectivity-intake:tables/applications on pg

begin;

select id, form_data, created_at, updated_at 
  from connectivity_intake_public.applications 
 where false;

rollback;
