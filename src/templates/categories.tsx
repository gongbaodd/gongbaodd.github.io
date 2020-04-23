import React, { FC } from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import BlogLink from "../components/BlogLink";
import { FilterOptions } from "../values/FilterOptions";

export const pageQuery = graphql`
  query BlogPostsByCategory($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
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
            category
          }
        }
      }
    }
  }
`;

interface PageData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
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
        };
      };
    }>;
  };
}

export interface PageContext {
  category: string;
  filterOption: FilterOptions;
}

const CategoryTemplate: FC<PageProps<PageData, { category }>> = ({
  data,
  location,
  pageContext: { category },
}) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={category} />
      <Bio />
      {posts.map(({ node }) => {
        const { title, date, slug } = node.fields;

        return (
          <BlogLink
            slug={slug}
            date={date}
            category={category}
            title={title}
            key={slug}
            excerpt={node.excerpt}
          />
        );
      })}
    </Layout>
  );
};

export default CategoryTemplate;
