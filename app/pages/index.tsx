import Link from 'next/link';
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import LandingStyledDiv from "../components/LandingStyledDiv";

export default function start() {
  return (
    <>
      <LandingStyledDiv>
        <Card title="Request to Participate">
          <br />
          <p>
            The Province of British Columbia is gathering information that could
            assist in the development of future programming to enhance province-wide
            high-speed internet connectivity.
          </p>
          <p>
            Please refer to sections 4.3 and 4.4 of the Request to Participate (RTP)
            document for details regarding ownership of responses and collection and
            use of information.
          </p>
          <br />
          <h2>Prepare your materials</h2>
          <p>
            To complete the form, ensure you have the RTP document printed or open
            so that you can reference it during the submission process, particularly
            the Form Instructions (Appendix A), a list of questions (Appendix B), the
            Internet Zone Map (Appendix C), and Supporting Materials to download
            (linked in Appendix D).
          </p>

          <p>
            If you are having trouble logging in or creating a BCeID, please clear
            your cookies or open an incognito window and try again.  
          </p>
          <form action="/login" method="post">
            <SButton type="submit">Login</SButton>
          </form>
        </Card>
      </LandingStyledDiv>
    </>
  );
};
