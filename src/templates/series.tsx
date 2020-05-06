import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import Posts from "../components/Posts";
import GroupLinks from "../components/GroupLinks";

export const pageQuery = graphql`
  query BlogPostsBySeries($series: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { series: { name: { eq: $series } } } }
      sort: {
        order: ASC
        fields: [fields___date, frontmatter___series___number]
      }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            series {
              name
              number
            }
            category
          }
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
            title
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
          category: string;
        };
        fields: {
          slug: string;
          title: string;
          date: string;
          tag?: string[];
        };
      };
    }>;
  };
}

export interface PageContext {
  series: string;
}

const CategoryTemplate: FC<PageProps<PageData, PageContext>> = ({
  data,
  location,
  pageContext: { series },
}) => {
  return (
    <Layout location={location} series={series}>
      <SEO title={series} />
      <Bio />
      <GroupLinks />
      <Posts data={data} />
    </Layout>
  );
};

export default CategoryTemplate;
