import path from "path";
import { CreatePagesArgs } from "gatsby";
import { FilterOptions } from "../src/values/FilterOptions";
import { PageContext as CategoryPageContext } from "../src/templates/categories";

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

type Result = { errors?: object; data: Data };

async function createPosts(
  result: Result,
  createPage: CreatePagesArgs["actions"]["createPage"]
) {
  const posts = result.data.allMarkdownRemark.edges;
  const blogPost = path.resolve("./src/templates/blog-post.tsx");

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

async function createCategories(
  result: Result,
  createPage: CreatePagesArgs["actions"]["createPage"]
) {
  const posts = result.data.allMarkdownRemark.edges;
  const CategoryTemplate = path.resolve("./src/templates/categories.tsx");
  const categories: Record<string, typeof posts[0]["node"][]> = {};

  posts.forEach((post) => {
    const { category } = post.node.frontmatter;

    if (!category) {
      return;
    }

    if (!categories[category]) {
      categories[category] = [];
    }

    categories[category].push(post.node);
  });

  Object.keys(categories).forEach((category) => {
    createPage<CategoryPageContext>({
      path: `categories/${category}`,
      component: CategoryTemplate,
      context: {
        category,
        filterOption: FilterOptions.categories,
      },
    });
  });
}

async function createPages({ graphql, actions }) {
  const { createPage } = actions;

  const result: Result = await graphql(query);

  if (result.errors) {
    throw result.errors;
  }

  await createPosts(result, createPage);
  await createCategories(result, createPage);
}

export default createPages;
