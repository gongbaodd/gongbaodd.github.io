import React, { FC } from "react";
import { Link, graphql, PageProps } from "gatsby";
import { Disqus, CommentCount } from "gatsby-plugin-disqus";

import { sanitize } from "../utils/sanitize";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        category
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
        title
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

  markdownRemark: {
    id: string;
    excerpt: string;
    html: string;
    frontmatter: {
      category?: string;
    };
    fields: {
      slug: string;
      date: string;
      title: string;
    };
  };
}

type RefPageData = PageData["markdownRemark"] & {
  fields: {
    slug: string;
  };
};

const BlogPostTemplate: FC<PageProps<
  PageData,
  { previous: RefPageData; next: RefPageData }
>> = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;
  const { slug, title, date } = post.fields;
  const disqusConfig = {
    identifier: slug,
    title,
    url: location.href,
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description={post.excerpt} />
      <article>
        <header>
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              marginBottom: rhythm(1),
            }}
          >
            {date}
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: sanitize(post.html),
          }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {`← ${previous.fields.title}`}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {`${next.fields.title} →`}
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <CommentCount config={disqusConfig} placeholder="..." />
      <Disqus config={disqusConfig} />
    </Layout>
  );
};

export default BlogPostTemplate;
