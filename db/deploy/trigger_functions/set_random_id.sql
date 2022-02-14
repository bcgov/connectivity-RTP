-- Deploy connectivity-intake:trigger_functions/set_random_id to pg
-- requires: schemas/public

begin;

create extension if not exists pgcrypto;
create function connectivity_intake_public.set_random_id()
  returns trigger as $$

    declare
      new_id varchar(1000);
    begin
      loop
        -- Securely generate a psuedo-random hash and re-encode it to a base64 string.
        new_id := encode(gen_random_bytes(64), 'base64');
        -- Base64 encoding contains 2 URL unsafe characters by default.
        -- The URL-safe version has these replacements.
        new_id := replace(new_id, '/', '_'); -- URL-safe replacement
        new_id := replace(new_id, '+', '-'); -- URL-safe replacement
        if new_id in (select id from connectivity_intake_public.applications) then
          raise warning 'connectivity_intake_public.set_random_id() experienced hash collision on %s - rerunning hash function & generating new id', new_id;
        else
          exit;
        end if;
      end loop;

      new.id = new_id;
      return new;
    end;
  $$ language plpgsql volatile;

grant execute on function connectivity_intake_public.set_random_id to connectivity_intake_auth_user;

comment on function connectivity_intake_public.set_random_id()
  is $$
    a trigger to set id column.
    example usage:

    create table some_schema.some_table(
      id varchar(1000) primary key
      ...
    );
    create trigger _random_id
      before insert on some_schema.some_table
      for each row
      execute procedure connectivity_intake_public.set_random_id();
  $$;

commit;
