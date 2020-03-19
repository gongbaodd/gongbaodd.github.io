module.exports = [
  {
    resolve: "gatsby-plugin-robots-txt",
    options: {
      host: "https://blog.gongbushang.com",
      sitemap: "https://blog.gongbushang.com/sitemap.xml",
      policy: [{ userAgent: "*", allow: "/" }],
    },
  },
];
