import React, { FC } from "react";
import { Link, graphql, PageProps } from "gatsby";
import withUtterances from "with-utterances";

import Bio from "../components/bio";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";

const sanitize = (html: string) => html;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
  const { previous, next } = pageContext;
  const { title, date } = post.fields;

  return (
    <Layout location={location}>
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
          className="blog_post"
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
    </Layout>
  );
};

export default withUtterances(
  // TODO: Fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BlogPostTemplate as any,
  "gongbaodd/gongbaodd.github.io",
  "dark-blue",
  "og:title",
  "comments"
);
