import React, { FC } from "react";
import { Link, PageProps } from "gatsby";
import Github from "./github";
import { rhythm, scale } from "../utils/typography";

// eslint-disable-next-line no-undef
const rootPath = `${__PATH_PREFIX__}/`;
// eslint-disable-next-line quotes
const quote = '"';
const TOKEN_FUNC = "token function";
const TOKEN_PUNC = "token punctuation";
const TOKEN_STR = "token string";
const TOKEN_OP = "token operator";

interface HeaderProps {
  title: string;
  location: PageProps["location"];
  category?: string;
}

const Header: FC<HeaderProps> = ({ title, location, category }) => {
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
        {title}
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
      {!category && (
        <>
          <small className={TOKEN_PUNC}>{");"}</small>
        </>
      )}
    </h1>
  );
};

const Footer: FC<{}> = () => {
  return (
    <footer>
      {`© ${new Date().getFullYear()}, Built with `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  );
};

const Layout: FC<HeaderProps> = ({ children, title, location, category }) => {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: rhythm(42),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Github />
      <Header title={title} location={location} category={category} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
