-- Revert connectivity-intake:views/form to pg


begin;

drop view connectivity_intake_public.form;

commit;
