import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import CountLink from "./CountLink";

const categoryQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

interface Query {
  allMarkdownRemark: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>;
  };
}

export const CategoryLinks = () => {
  const {
    allMarkdownRemark: { group: categories },
  } = useStaticQuery<Query>(categoryQuery);

  return (
    <>
      {categories.map(({ fieldValue, totalCount }) => (
        <CountLink
          to={`/categories/${fieldValue}`}
          key={fieldValue}
          fieldValue={fieldValue}
          totalCount={totalCount}
        />
      ))}
    </>
  );
};
