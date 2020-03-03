import React, { FC } from "react";
import { Link, graphql, PageProps } from "gatsby";
import { filterXSS as sanitize } from "xss";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: fields___slug, order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
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
          date: string;
          title: string;
          description: string;
        };
        fields: {
          slug: string;
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
        const slugReg = /\/(\d{4}-\d{2}-\d{2})-(.*)\//;
        const { slug } = node.fields;
        const title = slug.replace(slugReg, "$2");
        const date = slug.replace(slugReg, "$1");

        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitize(node.excerpt),
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;
