---
type: post
category: fe
---

# Fekit 支持 es6 和 riot 的 tag

在如下目录里面添加 tag.js 和 es6.js

```shell
/usr/local/lib/node_modules/fekit/lib/compiler/plugins
```

```javascript
// tag.js
(function() {
  var compiler = require("riot-compiler");

  exports.contentType = "javascript";

  exports.process = function(txt, path, module, cb) {
    try {
      var prefix = 'var riot = require("riot");\n';
      return cb(null, prefix + compiler.compile(txt));
    } catch (err) {
      return cb(err);
    }
  };
})();
```

```javascript
// es6.js
(function() {
  var babel;

  babel = require("babel-core");

  exports.contentType = "javascript";

  exports.process = function(txt, path, module, cb) {
    try {
      return cb(
        null,
        babel.transform(txt, {
          presets: ["es2015"],
        }).code
      );
    } catch (err) {
      return cb(err);
    }
  };
}.call(this));
```
