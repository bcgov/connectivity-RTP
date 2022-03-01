import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import MainStyledDiv from "../components/MainStyledDiv";
import getConfig from "next/config";

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
        setButtonText("Resume Application");
      } else {
        setButtonText("Begin Application");
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
        <Card title="Online Application">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <br />
          <SButton onClick={pageRouter}>{buttonText}</SButton>
        </Card>
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
