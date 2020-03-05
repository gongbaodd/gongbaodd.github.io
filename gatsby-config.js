const transformerRemark = require("./config/plugins/transformer_remark");
const sourceFilesystems = require("./config/plugins/source_filesystem");
const googleAnalytics = require("./config/plugins/google_analytics");
const feed = require("./config/plugins/feed");
const manifest = require("./config/plugins/manifest");
const typography = require("./config/plugins/typography");
const csp = require("./config/plugins/csp");

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
    ...sourceFilesystems,
    ...transformerRemark,
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    ...googleAnalytics,
    ...feed,
    ...manifest,
    "gatsby-plugin-react-helmet",
    ...typography,
    ...csp,
    "gatsby-plugin-offline",
  ],
};
