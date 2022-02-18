import { useRouter } from "next/router";
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import MainStyledDiv from "../components/MainStyledDiv";

const baseUrl = process.env.NODE_ENV === 'production' ? `https://${process.env.HOST}` : `http://localhost:${process.env.PORT || 3000}`

export default function Home() {
  const router = useRouter();

  const provisionApplicationForm = async () => {
  const createApplication = JSON.stringify({
    query: `mutation MyMutation {
          createApplication(input: { application: { } }) {
              application {
                id
              }
            }
          }`
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
    const applicationId = response.data.createApplication.application.id;
    router.push(`/form/${applicationId}/1`);
  }).catch(e => {
    console.error(e);
  }) 
}
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
            <SButton onClick={provisionApplicationForm}>Begin New Application</SButton>
        </Card>
        <br />
        <form action="/logout" method="post">
          <SButton type="submit">Logout</SButton>
        </form>
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
