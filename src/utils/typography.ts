import Typography from "typography";
import altonTheme from "typography-theme-alton";

const typography = new Typography(altonTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
