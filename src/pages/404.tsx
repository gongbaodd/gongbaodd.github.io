import React, { FC } from "react";
import { PageProps } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";

const NotFoundPage: FC<PageProps<{}>> = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
