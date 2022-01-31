-- Deploy connectivity-intake:types/keycloak_jwt to pg
-- requires: schemas/public

begin;

create type connectivity_intake_public.keycloak_jwt as (
  jti uuid,
  exp integer,
  nbf integer,
  iat integer,
  iss text,
  aud text,
  sub uuid,
  typ text,
  azp text,
  auth_time integer,
  session_state uuid,
  acr text,
  email_verified boolean,
  name text,
  preferred_username text,
  given_name text,
  family_name text,
  email text,
  broker_session_id text
);

commit;
