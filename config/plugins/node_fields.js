module.exports = [
  {
    resolve: "gatsby-plugin-node-fields",
    options: {
      fields: [
        {
          name: "tag",
          getter: (node) => node.frontmatter.tag,
          transformer: (value) => value && value.map((t) => t.toLowerCase()),
        },
      ],
    },
  },
];
