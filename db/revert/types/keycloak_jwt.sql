-- Revert connectivity-intake:types/keycloak_jwt from pg

begin;

drop type connectivity_intake_public.keycloak_jwt;

commit;
