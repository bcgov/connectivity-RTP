import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Footer, Navigation } from '@button-inc/bcgov-theme';
import styled from 'styled-components';
import Menu from '../components/Menu';
import BCGovTypography from '../components/BCGovTypography';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const SFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BCGovTypography />
        <Navigation
          header="main"
          title="Connectivity Intake"
        >
          <Menu />
        </Navigation>
        <Component {...pageProps} />
        <SFooter>
          <Menu />
        </SFooter>
      </ThemeProvider>
    </>
  )
};
