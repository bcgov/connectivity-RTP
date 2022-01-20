-- Deploy connectivity-intake:connect_session to pg
-- requires: appschema

begin;

create table connectivity_intake.connect_session (
  sid varchar not null collate "default",
	sess json not null,
	expire timestamp(6) not null
)
with (oids=false);

alter table connectivity_intake.connect_session add constraint session_pkey primary key (sid) not DEFERRABLE INITIALLY immediate;

create index IDX_session_expire on connectivity_intake.connect_session (expire);

commit;
