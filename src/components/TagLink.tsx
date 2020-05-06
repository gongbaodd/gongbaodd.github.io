import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import CountLink from "./CountLink";

const tagQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: fields___tag) {
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

export const TagLinks = () => {
  const {
    allMarkdownRemark: { group: tags },
  } = useStaticQuery<Query>(tagQuery);

  return (
    <>
      {tags.map(({ fieldValue, totalCount }) => (
        <CountLink
          to={`/tags/${fieldValue}`}
          key={fieldValue}
          fieldValue={fieldValue}
          totalCount={totalCount}
        />
      ))}
    </>
  );
};
