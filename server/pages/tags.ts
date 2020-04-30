import path from "path";
import { CreatePagesArgs } from "gatsby";
import { PageContext } from "../../src/templates/tags";

const query = `
{
    allMarkdownRemark(sort: {order: DESC, fields: [fields___date]}) {
      group(field: frontmatter___tag) {
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

async function createTags(
  graphql: CreatePagesArgs["graphql"],
  createPage: CreatePagesArgs["actions"]["createPage"]
) {
  const result = await graphql<Data>(query);
  const CategoryTemplate = path.resolve(
    process.cwd(),
    "./src/templates/tags.tsx"
  );

  if (result.errors) {
    throw result.errors;
  }

  if (!result.data) {
    return;
  }

  result.data.allMarkdownRemark.group.forEach(({ fieldValue }) => {
    createPage<PageContext>({
      path: `tags/${fieldValue}`,
      component: CategoryTemplate,
      context: {
        tag: fieldValue,
      },
    });
  });
}

export default createTags;
