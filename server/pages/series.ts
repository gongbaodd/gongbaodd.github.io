import path from "path";
import { CreatePagesArgs } from "gatsby";
import { PageContext } from "../../src/templates/series";

const query = `
{
  allMarkdownRemark(sort: {fields: [fields___date, frontmatter___series___number], order: ASC}) {
    group(field: frontmatter___series___name) {
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
    "./src/templates/series.tsx"
  );

  if (result.errors) {
    throw result.errors;
  }

  if (!result.data) {
    return;
  }

  result.data.allMarkdownRemark.group.forEach(({ fieldValue }) => {
    createPage<PageContext>({
      path: `series/${fieldValue}`,
      component: CategoryTemplate,
      context: {
        series: fieldValue,
      },
    });
  });
}

export default createTags;
