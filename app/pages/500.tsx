import Card from "@button-inc/bcgov-theme/Card"
import Link from "@button-inc/bcgov-theme/Link"
import LandingStyledDiv from "../components/LandingStyledDiv";
import getConfig from "next/config"

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};
const landingPage =
  runtimeConfig.NODE_ENV === "production"
    ? `https://${runtimeConfig.HOST}`
    : `http://${runtimeConfig.HOST}:${runtimeConfig.PORT}`;

export default function Custom500() {
  return (
    <>
      <LandingStyledDiv>
        <Card title="500 Error - Server Error">
          <p>
            Don't worry, your responses were auto-saved the last time you pressed Continue.
          </p>
          <p>
            Please <Link href={landingPage}>
              return back to the main page
            </Link> and log back in.
          </p>
          <p>
            If that doesn't work, trying clearing your cookies then logging in again.
          </p>
          </Card>
        </LandingStyledDiv>
    </>
  )
}
