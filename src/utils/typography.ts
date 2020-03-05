import Typography from "typography";
import githubTheme from "typography-theme-github";

// delete Wordpress2016.googleFonts;

const typography = new Typography(githubTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
