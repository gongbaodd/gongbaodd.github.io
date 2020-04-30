import { Link, graphql, useStaticQuery } from "gatsby";
import { Badge } from "theme-ui";
import React, { FC } from "react";

interface Props {
  fieldValue: string;
  totalCount: number;
}

const TagLink: FC<Props> = ({ fieldValue, totalCount }) => {
  return (
    <Link
      to={`/tags/${fieldValue}`}
      style={{ marginRight: ".5em", display: "inline-block" }}
    >
      {fieldValue}
      <Badge variant="circle">{totalCount}</Badge>
    </Link>
  );
};

export default TagLink;

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
        <TagLink
          key={fieldValue}
          fieldValue={fieldValue}
          totalCount={totalCount}
        />
      ))}
    </>
  );
};
