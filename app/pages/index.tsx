import Link from 'next/link';
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import MainStyledDiv from "../components/MainStyledDiv";

export default function start() {
  return (
    <>
      <MainStyledDiv>
        <Card title="Request to Participate">
          <br />
          <p>
            The Province of British Columbia is gathering information that
            could assist in the development of future programming to enhance
            province-wide high-speed internet connectivity.
          </p>
          <p>
            {" "}
            Please refer to sections 4.3 & 4.4 of the Request to Participate for
            details regarding ownership of responses and collection and use of
            information.
          </p>
          <br />
          <h2>Prepare your materials</h2>
          <p>
            To complete the form, ensure you have the RTP document printed or open
            so that you can reference it during the submission process, as well as 
            the zone map (Appendix A) and supporting data (Appendix C).
          </p>
          <p>In addition, please access the information below:</p>
          <span>
            <ol>
              <li><p>Download and view the supporting files</p>
                <p>
                  The KMZ files which describe the remaining gaps of underserved households
                  in the province can be viewed by anyone who has Google Earth. Please
                  download the files from the BC Data Catalogue to your computer and open
                  as a project in Google Earth.
                </p>
                <span>
                  The KMZ information includes:
                  <ul>
                    <li>Provincial connectivity data divided into regions or zones.</li>
                    <li>Map of underserved households in B.C.</li>
                    <li>Information on household density data.</li>
                    <li>Gaps in highway cellular for highways that have power (hydro).</li>
                  </ul>
                </span>
                <p>
                  If you need assistance with viewing the KMZ files, or with any aspect
                  of the RTP process, please email us at <Link href="mailto:connectingcommunitiesbc@gov.bc.ca">connectingcommunitiesbc@gov.bc.ca</Link>.
                </p>
              </li>
              <li><p>Prepare to answer the questions</p>
                <p>
                  Please ensure you have the following information for your organization
                  ready to fill out the form.These questions are described in Appendix B 
                  of the RTP document.
                </p>
                <p>
                  For Service Providers, we are assuming you’ll use the data in Appendix
                  C of the RTP to overlay information on underserved households in a
                  geographic format. This type of information will be uploaded to BC’s
                  Geomark service at the end of the form. Please consult this analysis
                  when answering the questions on the RTP.
                </p>
              </li>
            </ol>
          </span>
          <form action="/login" method="post">
            <SButton type="submit">Login</SButton>
          </form>
        </Card>
      </MainStyledDiv>
    </>
  );
};
