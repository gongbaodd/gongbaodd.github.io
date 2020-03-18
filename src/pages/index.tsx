import React, { FC } from "react";
import { Link, graphql, PageProps } from "gatsby";
import { sanitize } from "../utils/sanitize";

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

// eslint-disable-next-line quotes
const quote = '"';
const TOKEN_FUNC = "token function";
const TOKEN_PUNC = "token punctuation";
const TOKEN_STR = "token string";
const TOKEN_OP = "token operator";
const TOKEN_COMMENT = "token comment";

const BlogIndex: FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const { title, date } = node.fields;
        const { category } = node.frontmatter;

        return (
          <article key={node.fields.slug} style={{ marginBottom: "2em" }}>
            <header>
              <small className={TOKEN_COMMENT}>{`/** ${date} **/`}</small>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <small className={TOKEN_FUNC}>post</small>
                <small className={TOKEN_OP}>{`<${category || "{}"}>`}</small>
                <small className={TOKEN_PUNC}>(</small>
                <br />
                <Link
                  className={TOKEN_STR}
                  style={{ paddingLeft: "1em", textDecoration: "none" }}
                  to={node.fields.slug}
                >
                  <small>{quote}</small>
                  {title}
                  <small>{quote}</small>
                </Link>
                <br />
                <small className={TOKEN_PUNC}>)</small>
                <small className={TOKEN_PUNC}>;</small>
              </h3>
            </header>
            <section>
              <span className={TOKEN_COMMENT}>/**</span>
              <p
                className={TOKEN_COMMENT}
                dangerouslySetInnerHTML={{
                  __html: sanitize(node.excerpt),
                }}
                style={{
                  marginBottom: 0,
                  paddingLeft: "1em",
                }}
              />
              <span className={TOKEN_COMMENT}>**/</span>
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;
