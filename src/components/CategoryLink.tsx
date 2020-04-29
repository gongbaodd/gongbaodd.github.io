import { Link } from "gatsby";
import { Badge } from "theme-ui";
import React, { FC } from "react";

interface Props {
  fieldValue: string;
  totalCount: number;
}

const CategoryLink: FC<Props> = ({ fieldValue, totalCount }) => {
  return (
    <Link to={`/categories/${fieldValue}`} style={{ marginRight: ".5em" }}>
      {fieldValue}
      <Badge variant="circle">{totalCount}</Badge>
    </Link>
  );
};

export default CategoryLink;
