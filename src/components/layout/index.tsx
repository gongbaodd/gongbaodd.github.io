import React, { FC } from "react";
import { Link, PageProps } from "gatsby";

import { rhythm, scale } from "../../utils/typography";

// eslint-disable-next-line no-undef
const rootPath = `${__PATH_PREFIX__}/`;

const Header: FC<{ title: string; location: PageProps["location"] }> = ({
  title,
  location,
}) => {
  const isRoot = location.pathname === rootPath;
  const style = isRoot
    ? {
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }
    : {
        fontFamily: "Montserrat, sans-serif",
        marginTop: 0,
      };

  return (
    <h1 style={style}>
      <Link
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
        }}
        to="/"
      >
        {title}
      </Link>
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

const Layout = ({ location, title, children }) => {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Header title={title} location={location} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
