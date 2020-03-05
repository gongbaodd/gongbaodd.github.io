const path = require("path");

module.exports = [
  {
    resolve: "gatsby-plugin-typography",
    options: {
      pathToConfigModule: path.resolve(__dirname, "../../src/utils/typography"),
    },
  },
];
