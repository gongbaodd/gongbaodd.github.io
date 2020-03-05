module.exports = [
  {
    resolve: "gatsby-plugin-feed",
    options: {
      query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
      feeds: [
        {
          query: `
                {
                  allMarkdownRemark(
                    sort: { order: DESC, fields: [fields___date] },
                  ) {
                    edges {
                      node {
                        excerpt
                        html
                        fields { slug, title, date }
                        frontmatter {
                          category
                        }
                      }
                    }
                  }
                }
              `,
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return {
                ...edge.node.frontmatter,
                ...{
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                },
              };
            });
          },

          output: "/rss.xml",
          title: "Your Site's RSS Feed",
        },
      ],
    },
  },
];
