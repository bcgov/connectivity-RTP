import MainStyledDiv from "../../components/MainStyledDiv";
import BCGovTitle from "../../components/BCGovTitle";
import SButton from "../../components/SButton";
import ReviewDiv from "../../components/ReviewDiv";
import { queryUser } from "../../utils/query-data";
import postStatus from "../../utils/post-status";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function review() {
  const [reviewData, setReviewData] = useState({
    city: "",
    poBox: "",
    postion: "",
    extension: "",
    telephone: "",
    postalCode: "",
    streetName: "",
    unitNumber: "",
    backboneGaps: "",
    contactEmail: "",
    streetNumber: "",
    zoneFeedback: "",
    fixedWireless: "",
    primaryContact: "",
    wiredBroadband: "",
    lastMileSupport: "",
    organizationName: "",
    underservedAreas: "",
    satelliteProposal: "",
    capitalCostFunding: "",
    registrationNumber: "",
    anticipatedProjects: "",
    newBackboneTechnology: [],
    capitalCostExplanation: "",
    highwayCellularGeomark: "",
    multipleBackboneDetails: "",
    lastMileBroadbandGeomark: "",
    lastMileNewBackboneGeomark: "",
    lastMileFixedWirelessGeomark: "",
  });
  const [applicationId, setApplicationId] = useState();
  const [status, setStatus] = useState("");
  const router = useRouter();

  const completeForm = async () => {
    const status = {
      applicationId,
      status: "complete",
    };
    postStatus(status);
    router.push("/form/end");
  };

  const buttonDisabled = () => {
    if (status === "complete") return true;
  };

  useEffect(() => {
    async function fetchData() {
      const response = await queryUser();
      setStatus(response.data.allApplications.nodes[0].status);
      setReviewData(response.data.allApplications.nodes[0].formData);
      setApplicationId(response.data.allApplications.nodes[0].id);
    }
    fetchData();
  }, [MainStyledDiv]);

  return (
    <div>
      <MainStyledDiv>
        <BCGovTitle>Review Responses</BCGovTitle>
        <div>
          <p>
            <strong>
              Review all your responses here. Use the back button to make any
              changes.
              <br /> Please click Complete & Send to finalize your response. You
              will not be able to edit your responses after you Complete & Send.
            </strong>
          </p>
        </div>
        <div>
          <SButton
            variant="secondary"
            onClick={() => router.push("/form/8")}
            disabled={buttonDisabled()}
          >
            Back
          </SButton>
          <SButton
            variant="primary"
            onClick={completeForm}
            disabled={buttonDisabled()}
          >
            Complete & Send
          </SButton>
        </div>
        <div>
          <ReviewDiv>
            <BCGovTitle>Organization Information</BCGovTitle>
            <h4>Organization name (legal name)</h4>
            <p>{reviewData.organizationName}</p>
            <h4>
              Band number, society number, or business registration number
            </h4>
            <p>{reviewData.registrationNumber}</p>
            <h4>Unit number</h4>
            <p>{reviewData.unitNumber ? reviewData.unitNumber : "N/A"}</p>
            <h4>Street number</h4>
            <p>{reviewData.streetNumber}</p>
            <h4>PO box</h4>
            <p>{reviewData.poBox ? reviewData.poBox : "N/A"}</p>
            <h4>Street name</h4>
            <p>{reviewData.streetName}</p>
            <h4>Postal code</h4>
            <p>{reviewData.postalCode}</p>
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Contact Information</BCGovTitle>
            <h4>Primary contact</h4>
            <p>{reviewData.primaryContact}</p>
            <h4>Position/Title</h4>
            <p>{reviewData.postion}</p>
            <h4>Email</h4>
            <p>{reviewData.contactEmail}</p>
            <h4>Telephone</h4>
            <p>{reviewData.telephone}</p>
            <h4>Extension</h4>
            <p>{reviewData.extension ? reviewData.extension : "N/A"}</p>
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Proposed Zone Feedback</BCGovTitle>
            <h4>
              What feedback do you have on the proposed zone boundaries? If you
              were to apply to a funding program by zone, are there alterations
              to the zone boundaries that would make that easier? <br />
              <br /> 3500 characters
            </h4>
            <p>{reviewData.zoneFeedback}</p>
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Technology Viability</BCGovTitle>
            <h4>
              Approximately how many underserved households in the province
              could be reached by wired broadband?
            </h4>
            <p>{reviewData.wiredBroadband}</p>
            <h4>
              Approximately how many underserved households could be reached by
              fixed wireless?
            </h4>
            <p>{reviewData.fixedWireless}</p>
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Backbone to Support Last Mile</BCGovTitle>
            <h4>
              Would it be possible to leverage existing backbone to implement
              the last mile technologies you indicated in the previous question?
            </h4>
            <p>{reviewData.lastMileSupport ? "Yes" : "No"}</p>
            <h4>
              If no, what type of new backbone technology would need to be
              built?
            </h4>
            <p>{reviewData.newBackboneTechnology
              ? reviewData.newBackboneTechnology.map((item) => <p>{item}</p>)
              : "N/A"}</p>
            <h4>
              Please add any important details for addressing gaps in backbone
              needed to reach underserved households.
            </h4>
            <p>{reviewData.backboneGaps ? reviewData.backboneGaps : "N/A"}</p>
            <h4>
              If multiple backbone technologies are indicated, please describe
              at a high level where each backbone technology could be
              implemented and any transport requirements.
            </h4>
            <p>
              {reviewData.multipleBackboneDetails
                ? reviewData.multipleBackboneDetails
                : "N/A"}
            </p>
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Additional Questions</BCGovTitle>
            <h4>
              Are there any specific planned or anticipated projects you want to
              tell us about?
            </h4>
            <p>{reviewData.anticipatedProjects ? reviewData.anticipatedProjects : "N/A"}</p>
            <h4>
              For underserved areas where your Geomark does not indicate a wired
              or wireless technology viability or to serve those households, how
              could internet service providers be incentivized to serve those
              areas?
            </h4>
            <p>{reviewData.underservedAreas ? reviewData.underservedAreas : "N/A"}</p>
            <h4>
              In the information linked in Appendix C of the RTP, some areas
              were proposed to be best served by satellite. How do these
              proposed areas align with the expectations of your organization?
              Please provide feedback on the modelling assumptions.
            </h4>
            <p>{reviewData.satelliteProposal ? reviewData.satelliteProposal : "N/A"}</p>
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Highway Cellular</BCGovTitle>
            <h4>
              If funding was available for capital costs, which sections of
              highway could be completed? Please consider traffic and
              consumption factors. Please list the sections of highway.
            </h4>
            <p>{reviewData.capitalCostFunding ? reviewData.capitalCostFunding : "N/A"}</p>
            <h4>Please explain why you chose those sections.</h4>
            <p>{reviewData.capitalCostExplanation ? reviewData.capitalCostExplanation : "N/A"}</p>
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Geomarks</BCGovTitle>
            <h4>Wired broadband last mile </h4>
            <p>{reviewData.lastMileBroadbandGeomark ? reviewData.lastMileBroadbandGeomark : "N/A"}</p>
            <h4>Fixed wireless last mile </h4>
            <p>{reviewData.lastMileFixedWirelessGeomark ? reviewData.lastMileFixedWirelessGeomark : "N/A"}</p>
            <h4>New backbone technology possibly needed for last mile</h4>
            <p>{reviewData.lastMileNewBackboneGeomark ? reviewData.lastMileNewBackboneGeomark : "N/A"}</p>
            <h4>Cellular along powered highways</h4>
            <p>{reviewData.highwayCellularGeomark ? reviewData.highwayCellularGeomark : "N/A"}</p>
          </ReviewDiv>
        </div>
        <div>
          <SButton
            variant="secondary"
            onClick={() => router.push("/form/8")}
            disabled={buttonDisabled()}
          >
            Back
          </SButton>
          <SButton
            variant="primary"
            onClick={completeForm}
            disabled={buttonDisabled()}
          >
            Complete & Send
          </SButton>
        </div>
      </MainStyledDiv>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  if (!context.req.claims) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
