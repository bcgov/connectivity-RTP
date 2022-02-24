import MainStyledDiv from "../../components/MainStyledDiv";
import BCGovTitle from "../../components/BCGovTitle";
import SButton from "../../components/SButton";
import ReviewDiv from "../../components/ReviewDiv";
import { useRouter } from "next/router";

const completeForm = () => {
  // fetch post request to /graphql
  // change status from "draft" to "complete"
  // router push to confimation of received form
};

export default function review() {
  const router = useRouter();
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
          <SButton variant="secondary" onClick={() => router.push("/form/8")}>
            Back
          </SButton>
          <SButton variant="primary" onClick={() => completeForm()}>
            Complete & Send
          </SButton>
        </div>
        <div>
          <ReviewDiv>
            <BCGovTitle>Organization Information</BCGovTitle>
            {/* insert org information here */}
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Contact Information</BCGovTitle>
            {/* insert org information here */}
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Proposed Zone Feedback</BCGovTitle>
            {/* insert org information here */}
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Technology Viability</BCGovTitle>
            {/* insert org information here */}
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Backbone to Support Last Mile</BCGovTitle>
            {/* insert org information here */}
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Additional Questions</BCGovTitle>
            {/* insert org information here */}
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Highway Cellular</BCGovTitle>
            {/* insert org information here */}
          </ReviewDiv>
          <ReviewDiv>
            <BCGovTitle>Geomarks</BCGovTitle>
            {/* insert org information here */}
          </ReviewDiv>
        </div>
        <div>
          <SButton variant="secondary" onClick={() => router.push("/form/8")}>
            Back
          </SButton>
          <SButton variant="primary">Complete & Send</SButton>
        </div>
      </MainStyledDiv>
    </div>
  );
}
