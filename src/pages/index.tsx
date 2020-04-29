import React, { FC } from "react";
import { PageProps } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import GroupLink from "../components/GroupLinks";
import Posts from "../components/Posts";

const BlogIndex: FC<PageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="All posts" />
      <Bio />
      <GroupLink />
      <Posts />
    </Layout>
  );
};

export default BlogIndex;
