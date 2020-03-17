const { NODE_ENV } = process.env;

module.exports =
  NODE_ENV === "production" ? [] : ["gatsby-plugin-no-sourcemaps"];
