import ssoExpress from "@bcgov-cas/sso-express";

let ssoServerHost;
if (!process.env.NAMESPACE || process.env.NAMESPACE.endsWith("-dev"))
  ssoServerHost = "dev.oidc.gov.bc.ca";
else if (process.env.NAMESPACE.endsWith("-test"))
  ssoServerHost = "test.oidc.gov.bc.ca";
else ssoServerHost = "oidc.gov.bc.ca";

const baseUrl = process.env.NODE_ENV === 'production' ? `https://${process.env.HOST}` : `http://localhost:${process.env.PORT || 3000}`

export default async function middleware() {
  return ssoExpress({
    applicationDomain: ".gov.bc.ca",
    getLandingRoute: () => {
      return "/home";
    },
    oidcConfig: {
      baseUrl: baseUrl,
      clientId: "connectivity-intake-2014",
      oidcIssuer: `https://${ssoServerHost}/auth/realms/onestopauth-basic`,
      clientSecret: `${process.env.CLIENTSECRET}`,
    },
  });
};
