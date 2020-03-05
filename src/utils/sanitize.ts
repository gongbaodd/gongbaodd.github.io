import { filterXSS, whiteList } from "xss";

export function sanitize(html: string): string {
  return filterXSS(html, {
    whiteList: {
      ...whiteList,
      pre: ["class", "style"],
      code: ["class"],
      span: ["class", "style", "aria-hidden"],
    },
    stripIgnoreTag: true,
  });
}
