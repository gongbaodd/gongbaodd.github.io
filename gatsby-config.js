const transformerRemark = require("./config/plugins/transformer_remark");
const sourceFilesystems = require("./config/plugins/source_filesystem");
const googleAnalytics = require("./config/plugins/google_analytics");
const feed = require("./config/plugins/feed");
const manifest = require("./config/plugins/manifest");
const csp = require("./config/plugins/csp");
const sentry = require("./config/plugins/sentry");
const pageProgress = require("./config/plugins/page_progress");
const sourcemap = require("./config/plugins/sourcemap");

module.exports = {
  siteMetadata: {
    title: "宫不上叔",
    author: {
      name: "宫不上叔",
      summary: "JJ向上的中华田园仔",
    },
    description: "宫不上的诗书年华",
    siteUrl: "https://gongbaodd.github.io/",
    social: {
      twitter: "gongbaodd",
    },
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-plugin-page-progress",
    "gatsby-plugin-tidy",
    "gatsby-plugin-theme-ui",
    ...sourceFilesystems,
    ...transformerRemark,
    ...googleAnalytics,
    ...feed,
    ...manifest,
    ...csp,
    ...sentry,
    ...pageProgress,
    ...sourcemap,
  ],
};
