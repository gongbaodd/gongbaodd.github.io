import { CreatePagesArgs } from "gatsby";
import path from "path";

const query = `
{
  allMarkdownRemark(
    sort: { fields: [fields___date], order: DESC }
    limit: 1000
  ) {
    edges {
      node {
        fields {
          slug
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

interface Data {
  allMarkdownRemark: {
    edges: Array<{
      node: {
        fields: {
          slug: string;
          title: string;
        };

        frontmatter: {
          category: string;
        };
      };
    }>;
  };
}

async function createPosts(
  graphql: CreatePagesArgs["graphql"],
  createPage: CreatePagesArgs["actions"]["createPage"]
) {
  const result = await graphql<Data>(query);

  if (result.errors) {
    throw result.errors;
  }

  if (!result.data) {
    return;
  }

  const posts = result.data.allMarkdownRemark.edges;
  const blogPost = path.resolve(process.cwd(), "./src/templates/blog-post.tsx");

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

export default createPosts;
