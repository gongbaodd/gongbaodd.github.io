module.exports = [
  {
    resolve: "gatsby-plugin-csp",
    options: {
      disableOnDev: true,
      reportOnly: false,
      mergeScriptHashes: true,
      mergeStyleHashes: true,
      mergeDefaultDirectives: true,
      directives: {
        "script-src": "'self' www.google-analytics.com",
        "style-src": "'self' 'unsafe-inline'",
        "img-src": "'self' data: www.google-analytics.com",
      },
    },
  },
];
