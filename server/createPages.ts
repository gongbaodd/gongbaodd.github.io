import createPosts from "./pages/posts";
import createCategories from "./pages/categories";
import createTags from "./pages/tags";
import createSeries from "./pages/series";

async function createPages({ graphql, actions }) {
  const { createPage } = actions;

  await createPosts(graphql, createPage);
  await createCategories(graphql, createPage);
  await createTags(graphql, createPage);
  await createSeries(graphql, createPage);
}

export default createPages;
