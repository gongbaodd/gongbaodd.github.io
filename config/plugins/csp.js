module.exports = [
  {
    resolve: "gatsby-plugin-csp",
    options: {
      disableOnDev: true,
      reportOnly: false,
      mergeScriptHashes: false,
      mergeStyleHashes: false,
      mergeDefaultDirectives: true,
      directives: {
        "script-src": [
          "'self'",
          "www.google-analytics.com",
          "*.sentry.io",
          "*.disqus.com",
        ].join(" "),
        "style-src": ["'self'", "'unsafe-inline'", "*.disqus.com"].join(" "),
        "img-src": ["*", "data:"].join(" "),
      },
    },
  },
];
