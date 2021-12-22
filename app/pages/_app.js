import { createGlobalStyle, ThemeProvider } from 'styled-components';
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

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BCGovTypography />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
};
