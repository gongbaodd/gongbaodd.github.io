import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import Posts from "../components/Posts";
import GroupLinks from "../components/GroupLinks";
import { FilterOptions } from "../values/FilterOptions";

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
  filterOption: FilterOptions;
}

const CategoryTemplate: FC<PageProps<PageData, { tag }>> = ({
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
