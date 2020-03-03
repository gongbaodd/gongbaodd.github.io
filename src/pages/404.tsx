import React, { FC } from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export interface PageData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const NotFoundPage: FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
