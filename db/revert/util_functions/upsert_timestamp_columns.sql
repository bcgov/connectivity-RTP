-- Revert connectivity-intake:util_functions/upsert_timestamp_columns from pg

begin;

drop function connectivity_intake_private.upsert_timestamp_columns(text, text, boolean, boolean, boolean, text, text);

commit;
