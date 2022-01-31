-- Deploy connectivity-intake:create_roles to pg

begin;

do
$do$
begin

  if not exists (
    select true
    from pg_catalog.pg_roles
    where rolname = 'connectivity_intake_guest') then

    create role connectivity_intake_guest;
  end if;

    if not exists (
    select true
    from pg_catalog.pg_roles
    where rolname = 'connectivity_intake_auth_user') then

    create role connectivity_intake_auth_user;
  end if;

  if not exists (
    select true
    from pg_catalog.pg_roles
    where rolname = 'connectivity_intake_app') then

    create user connectivity_intake_app;
  end if;
  

  grant connectivity_intake_guest, connectivity_intake_auth_user to connectivity_intake_app;
  execute format('grant create, connect on database %I to connectivity_intake_app', current_database());

end
$do$;

commit;
