const transformerRemark = require("./config/plugins/transformer_remark");
const sourceFilesystems = require("./config/plugins/source_filesystem");
const googleAnalytics = require("./config/plugins/google_analytics");
const feed = require("./config/plugins/feed");
const manifest = require("./config/plugins/manifest");
const csp = require("./config/plugins/csp");
const sentry = require("./config/plugins/sentry");
const pageProgress = require("./config/plugins/page_progress");
const sourcemap = require("./config/plugins/sourcemap");
const robotsTxt = require("./config/plugins/robots_txt");
const nodeFields = require("./config/plugins/node_fields");
const siteMetadata = require("./config/meta/site.js");

module.exports = {
  siteMetadata,
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-plugin-page-progress",
    "gatsby-plugin-tidy",
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-typography",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-catch-links",
    ...nodeFields,
    ...robotsTxt,
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
