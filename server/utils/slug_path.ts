const SLUG_REG = /\/(\d{4})-(\d{2})-(\d{2})-(.*)\//;

export function slug2path(slug: string, category?: string) {
  const match = slug.match(SLUG_REG) || [];

  const year = match[1];
  const month = match[2];
  const day = match[3];
  const title = match[4];

  const path = `${
    category ? `/${category}` : ""
  }/${year}/${month}/${day}/${title}.html`;

  return {
    year,
    month,
    day,
    title,
    category,
    path,
  };
}
