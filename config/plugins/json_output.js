const graphQLQuery = `
 {
    allMarkdownRemark(sort: { fields: fields___date, order: DESC }) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
            date
            title
          }
          frontmatter {
            category
          }
        }
      }
    }
  }
`;

const serialize = (results) =>
  results.data.allMarkdownRemark.edges.map(({ node }) => ({
    path: node.fields.slug,
    title: node.frontmatter.title,
    created: node.fields.date,
    html: node.html,
  }));

const siteMetaData = require("../meta/site");

module.exports = [
  {
    resolve: `gatsby-plugin-json-output`,
    options: {
      graphQLQuery,
      serialize,
      siteUrl: siteMetaData.siteUrl,
    },
  },
];
