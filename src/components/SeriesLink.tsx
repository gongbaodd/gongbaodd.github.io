import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import CountLink from "./CountLink";

const tagQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___series___name) {
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

export const SeriesLinks = () => {
  const {
    allMarkdownRemark: { group: tags },
  } = useStaticQuery<Query>(tagQuery);

  return (
    <>
      {tags.map(({ fieldValue, totalCount }) => (
        <CountLink
          to={`/series/${fieldValue}`}
          key={fieldValue}
          fieldValue={fieldValue}
          totalCount={totalCount}
        />
      ))}
    </>
  );
};
