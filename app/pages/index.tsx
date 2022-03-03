import styled from 'styled-components';
import Link from 'next/link';
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import MainStyledDiv from "../components/MainStyledDiv";

export default function start() {
  return (
    <>
      <MainStyledDiv>
        <Card title="Welcome to the Request to Participate">
          <br />
          <p>
            The Province of British Columbia is gathering information that could
            assist in the development of future programs to enhance
            province-wide high speed internet connectivity.
          </p>
          <p>
            {" "}
            Please refer to sections 4.3 & 4.4 of the Request to Participate for
            details regarding ownership of responses and collection and use of
            information.
          </p>
          <form action="/login" method="post">
            <SButton type="submit">Login</SButton>
          </form>
        </Card>
      </MainStyledDiv>
    </>
  );
};
