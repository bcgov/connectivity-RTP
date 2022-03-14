import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config';
import { ServerStyleSheet } from 'styled-components'
import Analytics from 'components/Analytics';

const CONFIG = getConfig()?.publicRuntimeConfig;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {CONFIG?.ENABLE_ANALYTICS === "true" && <Analytics />}
        </body>
      </Html>
    );
  }
}
