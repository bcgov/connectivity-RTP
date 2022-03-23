import Card from "@button-inc/bcgov-theme/Card";
import Link from "@button-inc/bcgov-theme/Link";
import LandingStyledDiv from "../components/LandingStyledDiv";
import getConfig from "next/config";

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};
const landingPage =
  runtimeConfig.NODE_ENV === "production"
    ? `https://${runtimeConfig.HOST}`
    : `http://localhost:${runtimeConfig.PORT || 3000}`;

export default function Custom404() {
  return (
    <>
      <LandingStyledDiv>
        <Card title="404 Error - Page Not Found">
          <p>
            Your responses were auto-saved the last time you pressed Continue.
          </p>
          <p>
            Please <Link href={landingPage}>
              return home
            </Link> and log back in.
          </p>
          <p>
            If that doesn't work, please clear any cookies and restart your browser.
          </p>
          </Card>
        </LandingStyledDiv>
    </>
  )
}
