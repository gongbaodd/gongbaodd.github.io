import path from "path";
import { CreatePagesArgs } from "gatsby";
import { PageContext } from "../../src/templates/categories";

const query = `
{
    allMarkdownRemark(sort: {order: DESC, fields: [fields___date]}) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`;

interface Data {
  allMarkdownRemark: {
    group: Array<{
      fieldValue: string;
    }>;
  };
}

async function createCategories(
  graphql: CreatePagesArgs["graphql"],
  createPage: CreatePagesArgs["actions"]["createPage"]
) {
  const result = await graphql<Data>(query);
  const CategoryTemplate = path.resolve(
    process.cwd(),
    "./src/templates/categories.tsx"
  );

  if (result.errors) {
    throw result.errors;
  }

  if (!result.data) {
    return;
  }

  result.data.allMarkdownRemark.group.forEach(({ fieldValue }) => {
    createPage<PageContext>({
      path: `categories/${fieldValue}`,
      component: CategoryTemplate,
      context: {
        category: fieldValue,
      },
    });
  });
}

export default createCategories;
