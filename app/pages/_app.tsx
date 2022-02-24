import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Button, Footer, Navigation } from "@button-inc/bcgov-theme";
import styled from "styled-components";
import Menu from "../components/Menu";
import BCGovTypography from "../components/BCGovTypography";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

const StyledFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const LogoutButton = styled(Button)`
  margin: 0 5px 0 auto;
  background-color: #fff;
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BCGovTypography />
        <Navigation header="main" title="Request to Participate">
          <LogoutButton variant="secondary">Logout</LogoutButton>
        </Navigation>
        <Component {...pageProps} />
        <StyledFooter>
          <Menu />
        </StyledFooter>
      </ThemeProvider>
    </>
  );
};
