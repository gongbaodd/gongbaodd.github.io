import Typography from "typography";
import doelgerTheme from "typography-theme-doelger";

const typography = new Typography(doelgerTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
