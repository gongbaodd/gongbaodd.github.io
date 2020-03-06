import { createFilePath } from "gatsby-source-filesystem";
import pinyin from "pinyin";

import { slug2path } from "./utils/slug_path";

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });
    const { category } = node.frontmatter;
    const { path, year, month, day, title } = slug2path(value, category);

    createNodeField({
      name: "pinyin",
      node,
      value: pinyin(title.slice(0, 10), { style: pinyin.STYLE_NORMAL })
        .flat()
        .join("_"),
    });

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
  }
};

export default onCreateNode;
