const githubRibbon = [
  {
    resolve: "gatsby-plugin-github-ribbon",
    options: {
      project: "https://github.com/gongbaodd/gongbaodd.github.io",
      color: "gray",
      position: "right",
    },
  },
];

const images = [
  {
    resolve: "gatsby-remark-images",
    options: {
      maxWidth: 590,
      showCaptions: true,
      withWebp: true,
    },
  },
];

const iframe = [
  {
    resolve: "gatsby-remark-responsive-iframe",
    options: {
      wrapperStyle: "margin-bottom: 1.0725rem",
    },
  },
];

const prismjs = [
  {
    resolve: "gatsby-remark-prismjs",
    options: {
      classPrefix: "language-",
      showLineNumbers: true,
    },
  },
];

const externalLink = [
  {
    resolve: "gatsby-remark-external-links",
    options: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
];

module.exports = [
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        ...githubRibbon,
        ...images,
        ...iframe,
        ...prismjs,
        ...externalLink,
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-smartypants",
      ],
    },
  },
];
