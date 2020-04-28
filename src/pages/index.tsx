import React, { FC } from "react";
import { graphql, PageProps } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import BlogLink from "../components/BlogLink";

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: fields___date, order: DESC }) {
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

const BlogIndex: FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const { title, date, slug } = node.fields;
        const { category } = node.frontmatter;

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

export default BlogIndex;
