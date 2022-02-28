import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import MainStyledDiv from "../components/MainStyledDiv";
import getConfig from "next/config";
import BCGovTitle from "../components/BCGovTitle";

const runtimeConfig = getConfig()?.publicRuntimeConfig ?? {};

const baseUrl =
  runtimeConfig.NODE_ENV === "production"
    ? `https://${runtimeConfig.HOST}`
    : `http://localhost:${runtimeConfig.PORT || 3000}`;

let applicationId;

export default function Home() {
  const [buttonText, setButtonText] = useState("");
  const router = useRouter();

  const provisionApplicationForm = async () => {
    const createApplication = JSON.stringify({
      query: `mutation MyMutation { createApplication ( input: { application: { } } ) { application { id } } }`
    });
    await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: createApplication
    }).then(async (res) => {
      const response = await res.json();
      applicationId = response.data.createApplication.application.id;
    }).then(() => {
      // session.set("applicationId", applicationId);
      router.push(`/form/1`);
    }).catch(e => {
    console.error(e.message);
    })
  }

  const pageRouter = async () => {
    if (buttonText === "Begin Application") {
      provisionApplicationForm();
    }
    else {
      // session.set("applicationId", applicationId);
      router.push(`/form/1`);
    } 
  }

  const queryUser = async () => {
    const userQuery = JSON.stringify({
      query: `query MyQuery { session { sub } allApplications { nodes { id } } }`
    });
    await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: userQuery
    }).then(async (res) => {
      const response = await res.json();
      const isExistingApplication = response.data.allApplications.nodes[0] ? true : false
      if (isExistingApplication) {
        applicationId = response.data.allApplications.nodes[0].id;
        setButtonText("Resume");
      } else {
        setButtonText("Begin");
      };
    }).catch(e => {
      console.error(e);
    })
  };

  useEffect(() => {
    queryUser();
  }, [SButton]);

  return (
    <>
      <MainStyledDiv>
        <BCGovTitle>About this Form</BCGovTitle>
        <p>
          This form will autosave. After you begin the form, you may log out and return
          at a later time to complete the form. Please have required information that
          was outlined in the instructions ready.
          <br /><br/>
          Please complete this form before it closes on April 13, 2022, 2:00 PM Pacific Time.
        </p>
        <BCGovTitle>Materials</BCGovTitle>
        <p>
          For RTP information and Form Instructions, please refer to the Request to
          Participate materials on BC Bid.
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
