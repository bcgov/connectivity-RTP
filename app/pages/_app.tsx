import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Button, Footer, Navigation } from "@button-inc/bcgov-theme";
import styled from "styled-components";
import FooterMenu from "../components/FooterLinks";
import BCGovTypography from "../components/BCGovTypography";
import NavBarLinks from "../components/NavBarLinks";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .pg-textarea-input {
    width: 80%;
    height: 8rem;
    margin-bottom: 1em;
  }
  label {
    font-weight: 600;
    line-height: 1.3;
  }
  .pg-input-input {
    margin-bottom: 1em;
  }
  .form-group .field:first-of-type {
    padding-top: 1em;
  }
    .pg-radio {
    margin: 1em;
  }
  .pg-card-header {
    font-size: 1.75em;
    font-weight: 700;
    padding: 0.6em;
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

const LogoutForm = styled.div`
  margin: 0 5px 0 auto;
`;

const StyledButton = styled(Button)`
  background-color: #fff !important;
`;

const formStyle = {
  marginBottom: "0",
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BCGovTypography />
        <Navigation header="main" title="Connecting Communities BC">
          <NavBarLinks />
          <LogoutForm>
            <form action="/logout" method="POST" style={formStyle}>
              <StyledButton variant="secondary">Logout</StyledButton>
            </form>
          </LogoutForm>
        </Navigation>
        <Component {...pageProps} />
        <StyledFooter>
          <FooterMenu />
        </StyledFooter>
      </ThemeProvider>
    </>
  );
};
