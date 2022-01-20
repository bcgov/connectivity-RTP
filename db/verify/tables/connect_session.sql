-- Verify connectivity-intake:tables/connect_session on pg

begin;

select sid, sess, expire from connectivity_intake_private.connect_session where false;

rollback;
