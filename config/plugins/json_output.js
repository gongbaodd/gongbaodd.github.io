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

const siteMetaData = require("../meta/site");

module.exports = [
  {
    resolve: `gatsby-plugin-json-output`,
    options: {
      graphQLQuery,
      siteUrl: siteMetaData.siteUrl,
    },
  },
];
