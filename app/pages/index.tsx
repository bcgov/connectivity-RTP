import styled from 'styled-components';
import Link from 'next/link';
import Card from '@button-inc/bcgov-theme/Card';
import SButton from '../components/SButton';
import StyledDiv from '../components/StyledDiv';

export default function start() {
  return (
    <>
      <StyledDiv>
        <Card title="Welcome to Connected Communities BC">
          <br />
          <form action="/login" method="post">
            <SButton type="submit">Login</SButton>
          </form>
        </Card>
      </StyledDiv>
    </>
  )
};
