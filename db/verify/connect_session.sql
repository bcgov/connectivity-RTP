-- Verify connectivity-intake:connect_session on pg

BEGIN;

select sid, sess, expire from connectivity_intake.connect_session where false;

ROLLBACK;
