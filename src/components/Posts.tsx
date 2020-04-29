import React, { FC } from "react";
import { graphql, useStaticQuery } from "gatsby";
import BlogLink from "../components/BlogLink";

const pageQuery = graphql`
  query {
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

interface Query {
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

interface Props {
  data?: Query;
}

const Posts: FC<Props> = ({ data }) => {
  const {
    allMarkdownRemark: { edges },
  } = data || useStaticQuery<Query>(pageQuery);

  return (
    <>
      {edges.map(({ node }) => {
        const { title, date, slug } = node.fields;
        const { category: cate } = node.frontmatter;

        return (
          <BlogLink
            slug={slug}
            date={date}
            category={cate}
            title={title}
            key={slug}
            excerpt={node.excerpt}
          />
        );
      })}
    </>
  );
};

export default Posts;
