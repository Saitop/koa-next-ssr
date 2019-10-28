import React from "react";

import { withSSR } from "../lib/_ssr";

import Page from "../lib/components/Page";
import { H1 } from "../lib/components/Headers";

const HomeScreen = props => (
  <Page {...props}>
    <Page.Body>
      <H1>Welcome to CBS Regression A/B test management system!</H1>
      <p>
        <a href="/info">Show temporary info page</a>
      </p>
    </Page.Body>
  </Page>
);

export default withSSR()(HomeScreen);
