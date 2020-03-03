require("source-map-support").install();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
});

const createPages = require("./server/createPages.ts").default;
const onCreateNode = require("./server/onCreateNode.ts").default;

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
