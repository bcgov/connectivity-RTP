-- Deploy connectivity-intake:trigger_functions/set_random_reference_number to pg
-- requires: schemas/public

begin;

create extension if not exists pgcrypto;
create function connectivity_intake_public.set_random_reference_number()
  returns trigger as $$

    declare
      new_reference_number varchar(1000);
    begin
      loop
        -- Securely generate a psuedo-random hash and re-encode it to a hex string.
        new_reference_number := encode(gen_random_bytes(4), 'hex');
        if new_reference_number in (select reference_number from connectivity_intake_public.applications) then
          raise warning 'connectivity_intake_public.set_random_reference_number() experienced hash collision on %s - rerunning hash function & generating new reference_number', new_reference_number;
        else
          exit;
        end if;
      end loop;

      new.reference_number = new_reference_number;
      return new;
    end;
  $$ language plpgsql volatile;

grant execute on function connectivity_intake_public.set_random_reference_number to connectivity_intake_auth_user;

comment on function connectivity_intake_public.set_random_reference_number()
  is $$
    a trigger to set reference_number column.
    example usage:

    create table some_schema.some_table(
      reference_number varchar(1000) primary key
      ...
    );
    create trigger _random_reference_number
      before insert on some_schema.some_table
      for each row
      execute procedure connectivity_intake_public.set_random_reference_number();
  $$;

commit;
