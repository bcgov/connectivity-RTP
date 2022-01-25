-- Deploy connectivity-intake:tables/connect_session to pg
-- requires: schemas/private

begin;

create table connectivity_intake_private.connect_session (
  sid varchar(4096) not null collate "default",
	sess json not null,
	expire timestamp(6) not null
)
with (oids=false);

alter table connectivity_intake_private.connect_session add constraint session_pkey primary key (sid) not deferrable initially immediate;

create index idx_session_expire on connectivity_intake_private.connect_session(expire);
grant all on connectivity_intake_private.connect_session to public;

commit;
