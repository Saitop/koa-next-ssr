/**
 * See: https://github.com/zeit/next.js/#custom-document
 */

import React from "react";
import Document, { Main, NextScript } from "next/document"; // eslint-disable-line no-shadow
import { createGlobalStyle, ServerStyleSheet } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
    margin: 0;
    padding: 0;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <GlobalStyle />
        <head>
          <meta charSet="utf-8" />
          <title>cbs test management Koa + Next.js</title>
          {this.props.styleTags}
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
