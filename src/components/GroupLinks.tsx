import React from "react";
import { Container } from "theme-ui";
import { CategoryLinks } from "../components/CategoryLink";
import { TagLinks } from "../components/TagLink";
import { SeriesLinks } from "../components/SeriesLink";

const GroupLinks = () => {
  return (
    <Container pt={4} pb={4}>
      <CategoryLinks />
      <TagLinks />
      <SeriesLinks />
    </Container>
  );
};

export default GroupLinks;
