import React, { FC } from "react";
import Github from "./github";
import { rhythm } from "../utils/typography";
import Header, { HeaderProps } from "../components/Header";

const Footer: FC<{}> = () => {
  return (
    <footer>
      {`© ${new Date().getFullYear()}, Built with `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  );
};

const Layout: FC<HeaderProps> = ({ children, location, category }) => {
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
      <Header location={location} category={category} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
