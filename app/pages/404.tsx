import Card from "@button-inc/bcgov-theme/Card"
import Link from "@button-inc/bcgov-theme/Link"
import LandingStyledDiv from "../components/LandingStyledDiv";
import getConfig from "next/config";

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};
const landingPage =
  runtimeConfig.NODE_ENV === "production"
    ? `https://${runtimeConfig.HOST}`
    : `http://${runtimeConfig.HOST}:${runtimeConfig.PORT}`;

export default function Custom404() {
  return (
    <>
      <LandingStyledDiv>
        <Card title="Uh Oh - Error">
          <p>
            A page isn’t where it was supposed to be or a link isn’t working properly.
            Luckily, your responses were auto-saved the last time you pressed Continue.
          </p>
          <p>
            <Link href={landingPage}>
              Return back to the main page
            </Link> and log back in to pick up where you left off.
          </p>
          <p>
            If that doesn't work, trying clearing your cookies then logging in again.
          </p>
          </Card>
        </LandingStyledDiv>
    </>
  )
}
