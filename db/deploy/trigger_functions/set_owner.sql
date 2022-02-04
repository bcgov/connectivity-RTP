-- Deploy connectivity-intake:trigger_functions/set_owner to pg
-- requires: functions/session
-- requires: tables/applications

begin;

create or replace function connectivity_intake_public.set_owner()
  returns trigger as $$
    declare
      user_sub uuid;
    begin
      user_sub := (select sub from connectivity_intake_private.session());
      if user_sub is null then
        raise exception 'User is not authenticated.';
      end if;
      if old.owner is not null and old.owner != user_sub then
        raise exception 'Ownership of applications cannot be changed.';
      end if;
      new.owner := user_sub;
      return new;
    end;
  $$ language plpgsql volatile;

grant execute on function connectivity_intake_public.set_owner to connectivity_intake_auth_user;

comment on function connectivity_intake_public.set_owner() is 'A trigger function that sets sub uuid to be owner uuid'; 

commit;
