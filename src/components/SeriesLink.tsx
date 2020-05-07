import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import CountLink from "./CountLink";

const tagQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___series___slug) {
        fieldValue
        totalCount
        edges {
          node {
            frontmatter {
              series {
                name
              }
            }
          }
        }
      }
    }
  }
`;

interface Query {
  allMarkdownRemark: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
      edges: Array<{
        node: {
          frontmatter: {
            series: {
              name: string;
            };
          };
        };
      }>;
    }>;
  };
}

export const SeriesLinks = () => {
  const {
    allMarkdownRemark: { group: tags },
  } = useStaticQuery<Query>(tagQuery);

  return (
    <>
      {tags.map(
        ({
          fieldValue,
          totalCount,
          edges: [
            {
              node: {
                frontmatter: {
                  series: { name },
                },
              },
            },
          ],
        }) => {
          return (
            <CountLink
              to={`/series/${fieldValue}`}
              key={fieldValue}
              fieldValue={name}
              totalCount={totalCount}
            />
          );
        }
      )}
    </>
  );
};
