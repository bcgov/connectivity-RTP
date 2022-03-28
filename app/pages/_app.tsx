import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Button, Footer, Navigation } from "@button-inc/bcgov-theme";
import styled from "styled-components";
import FooterMenu from "../components/FooterLinks";
import BCGovTypography from "../components/BCGovTypography";
import NavBarLinks from "../components/NavBarLinks";
import { useEffect, useState } from "react";
import { queryUser } from "../utils/query-data";
import App from "next/app";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .pg-textarea-input {
    width: 80%;
    height: 8rem;
    margin-top: 0.75em;
    margin-bottom: 1em;
  }
  label {
    font-weight: 600;
    line-height: 1.4;
  }
  .pg-input-input {
    margin-top: 0.75em;
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
    padding: 20px;
  }
  p {
    line-height: 1.4;
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

const formStyle = {
  marginBottom: "0",
};


export default function MyApp({ Component, pageProps }) {
  const [buttonText, setButtonText] = useState("Logout");
  const [buttonAction, setButtonAction] = useState("/logout");

  useEffect(() => {
    async function fetchData() {
      const response = await queryUser();
      if (response.data.session === null) {
        setButtonAction("/login");
        setButtonText("Login");
      }
    }
    fetchData();
  }, [GlobalStyle]);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Connecting Communities BC</title>
        <link
          rel="apple-touch-icon"
          href="/static/icons/bcid-apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/static/icons/bcid-favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/static/icons/bcid-favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="mask-icon"
          href="/static/icons/bcid-apple-icon.svg"
          color="#036"
        />
        <link rel="icon" href="/static/icons/bcid-favicon-32x32.png" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BCGovTypography />
        <Navigation header="main" title="Connecting Communities BC">
          <NavBarLinks />
          <LogoutForm>
            <form action={buttonAction} method="POST" style={formStyle}>
              <Button variant="secondary-inverse">{buttonText}</Button>
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

MyApp.getInitialProps = async (context) => {
  const props = await App.getInitialProps(context);
  return { ...props }
};
