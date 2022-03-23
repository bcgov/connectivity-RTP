import Card from "@button-inc/bcgov-theme/Card";
import Link from "@button-inc/bcgov-theme/Link";
import LandingStyledDiv from "../../components/LandingStyledDiv";

export default function error() {
  return (
      <LandingStyledDiv>
        <Card title="Form Error">
          <p>
            Something has gone wrong with the form. Your responses were auto-saved the last time you pressed Continue.
          </p>
          <p>
            Please <Link href="/">
              return home
            </Link> and log back in.
          </p>
          <p>
            If that doesn't work, please clear any cookies and restart your browser.
          </p>
          </Card>
        </LandingStyledDiv>
  )
}
