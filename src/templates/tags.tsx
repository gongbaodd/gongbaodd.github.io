import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import Posts from "../components/Posts";
import GroupLinks from "../components/GroupLinks";

export const pageQuery = graphql`
  query BlogPostsByTags($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tag: { in: [$tag] } } }
      sort: { fields: fields___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
            title
          }
          frontmatter {
            tag
            category
          }
        }
      }
    }
  }
`;

interface PageData {
  allMarkdownRemark: {
    edges: Array<{
      node: {
        excerpt: string;
        frontmatter: {
          tag: string[];
          category: string;
        };
        fields: {
          slug: string;
          title: string;
          date: string;
        };
      };
    }>;
  };
}

export interface PageContext {
  tag: string;
}

const CategoryTemplate: FC<PageProps<PageData, PageContext>> = ({
  data,
  location,
  pageContext: { tag },
}) => {
  return (
    <Layout location={location}>
      <SEO title={tag} />
      <Bio />
      <GroupLinks />
      <Posts data={data} />
    </Layout>
  );
};

export default CategoryTemplate;
