import path from "path";

const query = `
{
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    limit: 1000
  ) {
    edges {
      node {
        fields {
          slug
          title
        }
        frontmatter {
          title
          category
        }
      }
    }
  }
}
`;

interface Data {
  allMarkdownRemark: {
    edges: Array<{
      node: {
        fields: {
          slug: string;
          title: string;
        };

        frontmatter: {
          title: string;
          category: string;
        };
      };
    }>;
  };
}

type Result = { errors?: object; data: Data };

async function createPages({ graphql, actions }) {
  const { createPage } = actions;

  const blogPost = path.resolve("./src/templates/blog-post.tsx");
  const result: Result = await graphql(query);

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
}

export default createPages;
