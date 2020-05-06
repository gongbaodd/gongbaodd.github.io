import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import Posts from "../components/Posts";
import GroupLinks from "../components/GroupLinks";

export interface PageContext {
  tag: string;
}

const CategoryTemplate: FC<PageProps<{}, PageContext>> = ({
  data,
  location,
  pageContext: { tag },
}) => {
  return (
    <Layout location={location} tag={tag}>
      <SEO title={tag} />
      <Bio />
      <GroupLinks />
      <Posts data={data} />
    </Layout>
  );
};

export default CategoryTemplate;
