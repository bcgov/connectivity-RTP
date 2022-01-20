-- Verify connectivity-intake:create_roles on pg

begin;

do
$verify$
begin

  if(select not exists(select true from pg_roles where rolname='connectivity_intake_guest')) then
    raise exception 'role connectivity_intake_guest does not exist.';

  end if;

end
$verify$;

rollback;
