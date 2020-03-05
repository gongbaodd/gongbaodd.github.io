const path = require("path");

module.exports = [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: path.resolve(__dirname, "../../_posts"),
      name: "blog",
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: path.resolve(__dirname, "../../images"),
      name: "images",
    },
  },
];
