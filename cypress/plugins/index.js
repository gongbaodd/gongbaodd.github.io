const { default: cucumber } = require("cypress-cucumber-preprocessor");
const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");

module.exports = on => {
  on("file:preprocessor", cucumber());
  on("file:preprocessor", cypressTypeScriptPreprocessor);
};
