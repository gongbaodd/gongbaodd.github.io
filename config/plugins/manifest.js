const path = require("path");

module.exports = [
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "宫不上叔的日记",
      short_name: "宫不上叔",
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#000000",
      display: "minimal-ui",
      icon: path.resolve(__dirname, "../../images/icon.png"),
    },
  },
];
