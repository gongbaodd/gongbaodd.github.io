import { Link } from "gatsby";
import { Badge } from "theme-ui";
import React, { FC } from "react";

interface Props {
  fieldValue: string;
  totalCount: number;
  to: string;
}

const CountLink: FC<Props> = ({ fieldValue, totalCount, to }) => {
  return (
    <Link to={to} style={{ marginRight: ".5em", display: "inline-block" }}>
      {fieldValue}
      <Badge variant="circle">{totalCount}</Badge>
    </Link>
  );
};

export default CountLink;
