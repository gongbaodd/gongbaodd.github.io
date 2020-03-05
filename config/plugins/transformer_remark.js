module.exports = [
  {
    resolve: "gatsby-transformer-remark",
    options: {
      pedantic: true,
      plugins: [
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 590,
          },
        },
        {
          resolve: "gatsby-remark-responsive-iframe",
          options: {
            wrapperStyle: "margin-bottom: 1.0725rem",
          },
        },
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-smartypants",
        {
          resolve: "gatsby-remark-prismjs",
          options: {
            classPrefix: "language-",
            showLineNumbers: true,
          },
        },
      ],
    },
  },
];
