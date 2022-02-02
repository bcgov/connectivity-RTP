-- Revert connectivity-intake:util_functions/grant_permissions from pg

begin;

drop function connectivity_intake_public.grant_permissions(text, text, text, text);
drop function connectivity_intake_public.grant_permissions(text, text, text, text[], text);

commit;
