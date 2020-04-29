import { Link, graphql, useStaticQuery } from "gatsby";
import { Badge } from "theme-ui";
import React, { FC } from "react";

interface Props {
  fieldValue: string;
  totalCount: number;
}

const CategoryLink: FC<Props> = ({ fieldValue, totalCount }) => {
  return (
    <Link
      to={`/categories/${fieldValue}`}
      style={{ marginRight: ".5em", display: "inline-block" }}
    >
      {fieldValue}
      <Badge variant="circle">{totalCount}</Badge>
    </Link>
  );
};

export default CategoryLink;

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
        <CategoryLink
          key={fieldValue}
          fieldValue={fieldValue}
          totalCount={totalCount}
        />
      ))}
    </>
  );
};
