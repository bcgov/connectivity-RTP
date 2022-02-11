-- Deploy connectivity-intake:trigger_functions/update_timestamps to pg
-- requires: schemas/private

begin;

create or replace function connectivity_intake_public.update_timestamps()
  returns trigger as $$
    declare
      user_sub uuid;
    begin
      user_sub := (select sub from connectivity_intake_public.session());
      if tg_op = 'INSERT' then
        if to_jsonb(new) ? 'created_at' then
          new.created_at = now();
          new.created_by = user_sub;
        end if;
        if to_jsonb(new) ? 'updated_at' then
          new.updated_at = now();
          new.updated_by = user_sub;
        end if;
      elsif tg_op = 'UPDATE' then
        if to_jsonb(new) ? 'deleted_at' then
          if old.deleted_at is distinct from new.deleted_at and new.deleted_at is not null then
            new.deleted_at = now();
            new.deleted_by = user_sub;
          end if;
        end if;
        if to_jsonb(new) ? 'updated_at' then
          new.updated_at = greatest(now(), old.updated_at + interval '1 millisecond');
          new.updated_by = user_sub;
        end if;
      end if;
      return new;
    end;
  $$ language plpgsql;

grant execute on function connectivity_intake_public.update_timestamps to connectivity_intake_auth_user;

comment on function connectivity_intake_public.update_timestamps()
  is $$
  a trigger to set created_at and updated_at columns.
  example usage:

  create table some_schema.some_table (
    ...
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
  );
  create trigger _100_timestamps
    before insert or update on some_schema.some_table
    for each row
    execute procedure connectivity_intake_public.update_timestamps();
  $$;

commit;
