import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SButton from "../components/SButton";
import MainStyledDiv from "../components/MainStyledDiv";
import getConfig from "next/config";
import BCGovTitle from "../components/BCGovTitle";

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};

const baseUrl =
  runtimeConfig.NODE_ENV === "production"
    ? `https://${runtimeConfig.HOST}`
    : `http://localhost:${runtimeConfig.PORT || 3000}`;

export default function Home() {
  const [buttonText, setButtonText] = useState("");
  const router = useRouter();

  const provisionApplicationForm = async () => {
    const createApplication = JSON.stringify({
      query: `mutation MyMutation { createApplication ( input: { application: { } } ) { application { id } } }`,
    });
    await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: createApplication,
    })
      .then(() => {
        router.push(`/form/1`);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const setButton = (response) => {
    if (response.data.allApplications.nodes[0]) {
      const applicationStatus = response.data.allApplications.nodes[0].status;
      const isExistingApplication = response.data.allApplications.nodes[0]
        ? true
        : false;
      if (applicationStatus === "complete") {
        setButtonText("View Responses");
      } else if (isExistingApplication) {
        setButtonText("Resume");
      }
    } else {
      setButtonText("Begin");
    }
  };

  const pageRouter = async () => {
    if (buttonText === "Begin") {
      provisionApplicationForm();
    } else if (buttonText === "View Responses") {
      router.push("/form/review");
    } else {
      router.push("/form/1");
    }
  };

  const queryUser = async () => {
    const userQuery = JSON.stringify({
      query: `query MyQuery { session { sub } allApplications { nodes { id status } } }`,
    });
    await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: userQuery,
    })
      .then(async (res) => {
        const response = await res.json();
        setButton(response);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    queryUser();
  }, [SButton]);

  return (
    <>
      <MainStyledDiv>
        <BCGovTitle>About this form</BCGovTitle>
        <p>
          Thank you for providing feedback in this Request to Participate form.
        </p>
        <p>
          This form contains eight sections of questions and is designed to
          collect input from internet service providers, as well as feedback
          from local governments and First Nations organizations into
          connectivity gaps in the province. Please enter the information
          applicable to your organization.
        </p>
        <p>
          The form will autosave when you click “Continue” on each page. After
          you begin the form, you may log out and return later to complete it.
        </p>
        <p>
          Please ensure all responses are submitted before the RTP closes on
          April 25, 2022 at 2:00 pm PST.
        </p>
        <SButton onClick={pageRouter}>{buttonText}</SButton>
      </MainStyledDiv>
    </>
  );
};

export const getServerSideProps = async (context) => {
  if (!context.req.claims) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
};
