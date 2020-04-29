import React from "react";
import { Container } from "theme-ui";
import { CategoryLinks } from "../components/CategoryLink";
import { TagLinks } from "../components/TagLink";

const GroupLinks = () => {
  return (
    <Container pt={4} pb={4}>
      <CategoryLinks />
      <TagLinks />
    </Container>
  );
};

export default GroupLinks;
