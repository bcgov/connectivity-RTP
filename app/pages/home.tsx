import styled from 'styled-components';
import Link from 'next/link';
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import MainStyledDiv from "../components/MainStyledDiv";

export default function Home() {
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
          <Link href="/form/1">
            <SButton>Begin New Application</SButton>
          </Link>
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
