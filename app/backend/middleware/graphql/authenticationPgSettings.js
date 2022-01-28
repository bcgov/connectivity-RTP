import { isAuthenticated } from "@bcgov-cas/sso-express";

const authenticationPgSettings = (req) => {

  const claimsSettings = {};
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
