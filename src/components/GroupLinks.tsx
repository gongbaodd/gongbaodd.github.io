import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Container } from "theme-ui";
import CategoryLink from "../components/CategoryLink";

const query = graphql`
  query CategoryQuery {
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

const GroupLinks = () => {
  return (
    <Container pt={4} pb={4}>
      <StaticQuery<Query>
        query={query}
        render={({ allMarkdownRemark: { group } }) =>
          group.map(({ fieldValue, totalCount }) => (
            <CategoryLink
              key={fieldValue}
              fieldValue={fieldValue}
              totalCount={totalCount}
            />
          ))
        }
      />
    </Container>
  );
};

export default GroupLinks;
