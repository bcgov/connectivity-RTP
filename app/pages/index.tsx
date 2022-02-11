import styled from 'styled-components';
import Link from 'next/link';
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import MainStyledDiv from "../components/MainStyledDiv";

export default function start() {
  return (
    <>
      <MainStyledDiv>
        <Card title="Welcome to Connected Communities BC">
          <br />
          <form action="/login" method="post">
            <SButton type="submit">Login</SButton>
          </form>
        </Card>
      </MainStyledDiv>
    </>
  );
};
