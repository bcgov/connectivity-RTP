import Card from "@button-inc/bcgov-theme/Card";
import Link from "@button-inc/bcgov-theme/Link";
import LandingStyledDiv from "../components/LandingStyledDiv";

export default function Custom500() {
  return (
    <>
      <LandingStyledDiv>
        <Card title="500 Error - Internal Server Error">
          <p>
            Your responses were auto-saved the last time you pressed Continue.
          </p>
          <p>
            Please <Link href="/">
              return home
            </Link> and log back in.
          </p>
          <p>
            If logging back in does not work, please clear any cookies and restart your browser.
          </p>
          </Card>
        </LandingStyledDiv>
    </>
  )
}
