import styled from 'styled-components';
import { Footer, Navigation } from '@button-inc/bcgov-theme';
import Menu from '../components/Menu';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const SFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
`

export default function Home() {
  return (
    <>
      <Navigation
        header="main"
        title="Welcome to Connectivity Intake"
      />
      <Title>Connectivity Intake Form</Title>
      <SFooter>
        <Menu />
      </SFooter>
    </>
  )
}
