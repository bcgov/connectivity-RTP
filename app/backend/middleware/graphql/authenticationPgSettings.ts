import { isAuthenticated } from '@bcgov-cas/sso-express';

const authenticationPgSettings = (req) => {
  const claimsSettings = {
    role: 'connectivity_intake_guest'
  };

  if (!isAuthenticated(req)) return claimsSettings;

  const claims = req.claims;

  const properties = [
    'jti',
    'exp',
    'nbf',
    'iat',
    'iss',
    'aud',
    'sub',
    'typ',
    'azp',
    'auth_time',
    'session_state',
    'acr',
    'email_verified',
    'name',
    'preferred_username',
    'given_name',
    'family_name',
    'email',
    'broker_session_id'
  ];
  properties.forEach((property) => {
    claimsSettings[`jwt.claims.${property}`] = claims[property];
  });

  claimsSettings.role = 'connectivity_intake_auth_user';

  return {
    ...claimsSettings
  };
};

export default authenticationPgSettings;
