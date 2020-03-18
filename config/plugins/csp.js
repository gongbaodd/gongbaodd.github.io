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
          "'unsafe-inline'",
          "utteranc.es",
          "*.utteranc.es",
          "*.cloudflareinsights.com",
        ].join(" "),
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "utteranc.es",
          "*.utteranc.es",
        ].join(" "),
        "img-src": ["*", "data:", "*.cloudflareinsights.com"].join(" "),
        "default-src": [
          "'self'",
          "utteranc.es",
          "*.utteranc.es",
          "fonts.gstatic.com",
        ].join(" "),
      },
    },
  },
];
