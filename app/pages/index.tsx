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
            the Zone Map (Appendix C) and supporting materials (linked in Appendix D).
          </p>
          <p>In addition, please access the information below:</p>
          <span>
            <ol>
              <li><p>Download and view the supporting files</p>
                <p>
                  The KMZ files which describe the remaining gaps of underserved households
                  in the province can be viewed by anyone who has Google Earth. Please
                  download the files from the <Link href="https://catalogue.data.gov.bc.ca/group/1849a583-98c1-452b-a5ec-3447edfc0cd9">BC Data Catalogue</Link> to your computer and open
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
                <br/>
                <p>
                  If you need assistance with viewing the KMZ files, or with any aspect
                  of the RTP process, please email: <Link href="mailto:connectingcommunitiesbc@gov.bc.ca">connectingcommunitiesbc@gov.bc.ca</Link>.
                </p>
              </li>
              <li><p>Prepare to answer the questions</p>
                <p>
                  Please ensure you have the following information for your organization
                  ready to fill out the form. These questions are described in Appendix B 
                  of the RTP document.
                </p>
                <p>
                  Note: There is a section at the end of this form for organizations to
                  upload Geomarks for information provided. Providing Geomarks is a recommended
                  step for organizations that have the capacity to do so, but is not mandatory.
                  Information on creating Geomarks can be found in Appendix A, Q8 of the RTP document.
                </p>
              </li>
            </ol>
          </span>
          <form action="/login" method="post">
            <SButton type="submit">Login</SButton>
          </form>
        </Card>
      </LandingStyledDiv>
    </>
  );
};
