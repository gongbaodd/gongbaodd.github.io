import { createFilePath } from "gatsby-source-filesystem";
import { CreateNodeArgs, Node } from "gatsby";

import { slug2path } from "./utils/slug_path";

interface MdNode extends Node {
  frontmatter: {
    category: string;
  };
}

const createMdNodeFields = (
  node: MdNode,
  getNode: CreateNodeArgs["getNode"],
  createNodeField: CreateNodeArgs["actions"]["createNodeField"]
) => {
  const value = createFilePath({ node, getNode });
  const { category } = node.frontmatter;
  const { path, year, month, day, title } = slug2path(value, category);

  createNodeField({
    name: "slug",
    node,
    value: path,
  });

  createNodeField({
    name: "year",
    node,
    value: year,
  });

  createNodeField({
    name: "month",
    node,
    value: month,
  });

  createNodeField({
    name: "day",
    node,
    value: day,
  });

  createNodeField({
    name: "title",
    node,
    value: title,
  });

  createNodeField({
    name: "date",
    node,
    value: new Date([year, month, day].join("-")),
  });
};

const onCreateNode = ({ node, actions, getNode }: CreateNodeArgs<MdNode>) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    createMdNodeFields(node, getNode, createNodeField);
  }
};

export default onCreateNode;
