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
            assist in the development of future programming to enhance
            province-wide high-speed internet connectivity.
          </p>
          <p>
            Please refer to sections 4.3 and 4.4 of the Request to Participate
            (RTP) document for details regarding ownership of responses and
            collection and use of information.
          </p>
          <br />
          <h2>Prepare your materials</h2>
          <p>
            To complete the form, ensure you have the RTP document printed or
            open so that you can reference it during the submission process,
            particularly the Form Instructions (Appendix A), RTP Questions
            (Appendix B), the Internet Zone Map (Appendix C), and Supporting
            Materials to download (linked in Appendix D).
          </p>

          <p>
            If you are having trouble logging in or creating a BCeID, please
            clear your cookies or open an incognito window and try again.
          </p>
          <p>
            <strong>Thank you for your interest in responding to the RTP. The response
            deadline has now passed. Please direct any further questions to <a href="mailto:connectingcommunitiesbc@gov.bc.ca">connectingcommunitiesbc@gov.bc.ca</a>.</strong>
          </p>
          <form action="/login" method="post">
            <SButton type="submit" disabled>Login</SButton>
          </form>
        </Card>
      </LandingStyledDiv>
    </>
  );
};
