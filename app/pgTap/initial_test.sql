\unset ECHO
\set QUIET 1

\pset format unaligned
\pset tuples_only true
\pset pager off

\set ON_ERROR_ROLLBACK 1
\set ON_ERRORSTOP true

begin;

select plan(1);

select pass( 'My test passed!' );

select * from finish();
rollback;
