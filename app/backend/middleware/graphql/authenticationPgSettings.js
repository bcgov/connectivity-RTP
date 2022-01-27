import { isAuthenticated } from "@bcgov-cas/sso-express";
import groupData from "../../../data/groups.json";
import { getUserGroups } from "../../helpers/userGroupAuthentication";
import { getPriorityGroup } from "../../../../lib/userGroups";

const authenticationPgSettings = (req) => {
  const groups = getUserGroups(req);
  const priorityGroup = getPriorityGroup(groups);

  const claimsSettings = {
    role: groupData[priorityGroup].pgRole,
  };
  if (!isAuthenticated(req))
    return {
      ...claimSettings,
    };

  const claims = req.claims;

  claims.user_groups = groups.join(",");
  claims.priority_group = priorityGroup;

  const properties = [
    "jti",
    "exp",
    "nbf",
    "iat",
    "iss",
    "aud",
    "sub",
    "typ",
    "azp",
    "auth_time",
    "session_state",
    "acr",
    "email_verified",
    "name",
    "preferred_username",
    "given_name",
    "family_name",
    "email",
    "broker_session_id",
    "user_groups",
    "priority_group",
  ];
  properties.forEach((property) => {
    claimsSettings[`jwt.claims.${property}`] = claims[property];
  });

  return {
    ...claimsSettings,
  };
};

export default authenticationPgSettings;
