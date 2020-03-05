module.exports = [
  {
    resolve: "gatsby-plugin-csp",
    options: {
      disableOnDev: true,
      reportOnly: false,
      mergeScriptHashes: true,
      mergeStyleHashes: false,
      mergeDefaultDirectives: true,
      directives: {
        "script-src": "'self' www.google-analytics.com sentry.io",
        "style-src": "'self' 'unsafe-inline'",
        "img-src": "'self' data: www.google-analytics.com sentry.io",
      },
    },
  },
];
