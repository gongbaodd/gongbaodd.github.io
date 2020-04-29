import React, { FC } from "react";
import { Link } from "gatsby";
import { Container } from "theme-ui";

import { rhythm } from "../utils/typography";
import { sanitize } from "../utils/sanitize";

// eslint-disable-next-line quotes
const quote = '"';
const TOKEN_FUNC = "token function";
const TOKEN_PUNC = "token punctuation";
const TOKEN_STR = "token string";
const TOKEN_OP = "token operator";
const TOKEN_COMMENT = "token comment";

interface Props {
  date: string;
  category: string | null;
  slug: string;
  title: string;
  excerpt: string;
}

const BlogLink: FC<Props> = ({ date, category, slug, title, excerpt }) => {
  return (
    <Container mb={4}>
      <header>
        <small className={TOKEN_COMMENT}>{`/** ${date} **/`}</small>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <small className={TOKEN_FUNC}>post</small>
          <small className={TOKEN_OP}>
            {category && (
              <Link
                className={TOKEN_OP}
                to={`/categories/${category}`}
                style={{ textDecoration: "none" }}
              >
                {`<${category}>`}
              </Link>
            )}
            {!category && "<{}>"}
          </small>
          <small className={TOKEN_PUNC}>(</small>
          <br />
          <Link
            className={TOKEN_STR}
            style={{ paddingLeft: "1em", textDecoration: "none" }}
            to={slug}
          >
            <small>{quote}</small>
            {title}
            <small>{quote}</small>
          </Link>
          <br />
          <small className={TOKEN_PUNC}>)</small>
          <small className={TOKEN_PUNC}>;</small>
        </h3>
      </header>
      <section>
        <span className={TOKEN_COMMENT}>/**</span>
        <p
          className={TOKEN_COMMENT}
          dangerouslySetInnerHTML={{
            __html: sanitize(excerpt),
          }}
          style={{
            marginBottom: 0,
            paddingLeft: "1em",
          }}
        />
        <span className={TOKEN_COMMENT}>**/</span>
      </section>
    </Container>
  );
};

export default BlogLink;
