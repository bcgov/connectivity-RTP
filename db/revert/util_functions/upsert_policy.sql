-- Revert connectivity-intake:util_functions/upsert_policy from pg

begin;

drop function connectivity_intake_public.upsert_policy(text, text, text, text, text, text);
drop function connectivity_intake_public.upsert_policy(text, text, text, text, text, text, text);

commit;
