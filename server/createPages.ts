import createPosts from "./pages/posts";
import createCategories from "./pages/categories";

async function createPages({ graphql, actions }) {
  const { createPage } = actions;

  await createPosts(graphql, createPage);
  await createCategories(graphql, createPage);
}

export default createPages;
