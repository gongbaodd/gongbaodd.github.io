---
type: post
category: fe
---

# esprima 分析 js 代码

```javascript
var fs = require("fs"),
  esprima = require("esprima"),
  estraverse = require("estraverse"),
  escodegen = require("escodegen"),
  escope = require("escope");

var funcStats = {},
  API = ["tag", "tag2", "mount", "update", "Tag", "observable", "Router"];

function addStats(name) {
  if (!funcStats[name]) {
    funcStats[name] = { calls: [], declarations: [], func: "", calling: [] };
  }
}

var a = {};

function analyze(code) {
  var ast = esprima.parse(code);
  // var scopeMan = escope.analyze(ast);

  estraverse.traverse(ast, {
    enter: function(node, parent) {
      if (node.type === "FunctionDeclaration") {
        var name = node.id.name;
        addStats(name);
        funcStats[name].declarations.push(node);
        funcStats[name].func = escodegen.generate(node);
        recurBody(node);

        function recurBody(node) {
          if (node.body) {
            node.body.body &&
              node.body.body.forEach(function(n) {
                recurBody(n);
              });
            if (node.type === "WhileStatement") {
              node.test && recurBody(node.test);
            }
          } else {
            switch (node.type) {
              case "CallExpression":
                var _name = "",
                  calling = funcStats[name].calling,
                  count = 0;
                if (node.callee.type === "Identifier") {
                  _name = node.callee.name;
                } else if (node.callee.type === "MemberExpression") {
                  _name = node.callee.property.name;
                }

                calling.forEach(function(call) {
                  if (call === _name) {
                    count++;
                  }
                });

                if (count === 0) {
                  calling.push(_name);
                }

                node.arguments.forEach(function(n) {
                  recurBody(n);
                });
                break;
              case "IfStatement":
                node.test && recurBody(node.test);
                node.consequent && recurBody(node.consequent);
                node.alternate && recurBody(node.alternate);
                break;
              case "LogicalExpression":
                node.left && recurBody(node.left);
                node.right && recurBody(node.right);
                break;
              case "UnaryExpression":
                node.argument && recurBody(node.argument);
                break;
              case "AssignmentExpression":
                node.right && recurBody(node.right);
                break;
              case "VariableDeclaration":
                node.declarations.forEach(function(n) {
                  recurBody(n);
                });
                break;
              case "VariableDeclarator":
                node.init && recurBody(node.init);
                break;
              case "ExpressionStatement":
                node.expression && recurBody(node.expression);
                break;
              case "ReturnStatement":
                node.argument && recurBody(node.argument);
                break;
            }
          }
        }
      } else if (
        node.type === "CallExpression" &&
        node.callee.type === "Identifier"
      ) {
        addStats(node.callee.name);
        funcStats[node.callee.name].calls.push(parent);
      } else if (
        node.type === "CallExpression" &&
        node.callee.type === "MemberExpression"
      ) {
        addStats(node.callee.property.name);
        funcStats[node.callee.property.name].calls.push(parent);
      }
    },
  });

  var data = {},
    statistic = {
      count: 0,
      nodes: [],
      links: [],
    },
    list = [];

  Object.keys(funcStats).forEach(function(key) {
    statistic.count++;
    data[key] = {
      calls: funcStats[key].calls.length,
      declarations: funcStats[key].declarations.length,
      func: funcStats[key].func,
      calling: [],
      weight: 0,
      category: 0, //0=>normal 1=>API
    };

    API.forEach(function(a) {
      if (a === key) {
        data[key].category = 1;
      }
    });

    funcStats[key].calling.forEach(function(c) {
      funcStats[c] && data[key].calling.push(c);
    });

    data[key].weight = data[key].calling.length;

    statistic.nodes.push({
      category: data[key].category,
      value: data[key].weight,
      name: key,
    });
  });

  statistic.nodes.forEach(function(node, source) {
    data[node.name].calling.forEach(function(call) {
      statistic.nodes.forEach(function(n, t) {
        if (n.name === call) {
          statistic.links.push({
            source: source,
            target: t + 1,
            weight: 1,
          });
        }
      });
    });
  });
  Object.keys(funcStats).forEach(function(key) {
    var d = data[key],
      w = d.weight;
    d.name = key;
    if (list.length) {
      var inserted = 0;
      list.forEach(function(item, index) {
        if (inserted) return;
        if (item.weight < w) {
          list = list.slice(0, index).concat([d], list.slice(index));
          inserted++;
        }
      });
    } else {
      list.push(d);
    }
  });
  fs.writeFileSync("ast.json", JSON.stringify(list));
}

if (process.argv.length < 3) {
  throw new Error("Usage: index.js file.js");
}

var filename = process.argv[2];
console.log("[READ]\t" + filename);
var code = fs.readFileSync(filename);
analyze(code);
console.log("[DONE]");
```
