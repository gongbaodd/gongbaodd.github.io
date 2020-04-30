import React, { FC } from "react";
import { Link, PageProps, StaticQuery, graphql } from "gatsby";
import { rhythm, scale } from "../utils/typography";

// eslint-disable-next-line no-undef
const rootPath = `${__PATH_PREFIX__}/`;
// eslint-disable-next-line quotes
const quote = '"';
const TOKEN_FUNC = "token function";
const TOKEN_PUNC = "token punctuation";
const TOKEN_STR = "token string";
const TOKEN_OP = "token operator";

const titleQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

interface TitleQuery {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

export interface HeaderProps {
  location: PageProps["location"];
  category?: string;
  tag?: string;
}

const Header: FC<HeaderProps> = ({ location, category, tag }) => {
  const isRoot = location.pathname === rootPath;
  const style = isRoot
    ? {
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }
    : {
        marginTop: 0,
      };

  return (
    <h1 style={style}>
      <small className={TOKEN_FUNC}>blog</small>
      <small className={TOKEN_PUNC}>(</small>
      <Link className={TOKEN_STR} style={{ textDecoration: "none" }} to="/">
        <small>{quote}</small>
        <StaticQuery<TitleQuery>
          query={titleQuery}
          render={({
            site: {
              siteMetadata: { title },
            },
          }) => title}
        />
        <small>{quote}</small>
      </Link>
      {category && (
        <>
          <small className={TOKEN_PUNC}>{",{category:"}</small>
          <span className={TOKEN_OP}>
            <small>{quote}</small>
            {category}
            <small>{quote}</small>
          </span>
          <small className={TOKEN_PUNC}>{"});"}</small>
        </>
      )}
      {tag && (
        <>
          <small className={TOKEN_PUNC}>{",{tag:"}</small>
          <span className={TOKEN_OP}>
            <small>{quote}</small>
            {tag}
            <small>{quote}</small>
          </span>
          <small className={TOKEN_PUNC}>{"});"}</small>
        </>
      )}
      {!category && !tag && <small className={TOKEN_PUNC}>);</small>}
    </h1>
  );
};

export default Header;
