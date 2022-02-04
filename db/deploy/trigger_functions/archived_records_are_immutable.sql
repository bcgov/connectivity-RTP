-- Deploy connectivity-intake:trigger_functions/archived_records_are_immutable to pg

begin;

create or replace function connectivity_intake_public.archived_records_are_immutable()
  returns trigger as $$
    begin
      if old.archived_at is not null then
        raise exception 'Deleted records cannot be modified.';
      end if;
      return new;
    end;
  $$ language plpgsql;

grant execute on function connectivity_intake_public.archived_records_are_immutable to connectivity_intake_auth_user;

comment on function connectivity_intake_public.archived_records_are_immutable()
  is $$
    A trigger that raises an exception if changes happen on a record where ''archived_at'' is set.
    example usage:

    create table some_schema.some_table (
      ...
    );
    create trigger _050_immutable_archived_records
      before insert or update on some_schema.some_table
      for each row
      execute procedure connectivity_intake_public.archived_records_are_immutable();
  $$;

commit;
