-- Verify connectivity-intake:connect_session on pg

begin;

select sid, sess, expire from connectivity_intake.connect_session where false;

rollback;
