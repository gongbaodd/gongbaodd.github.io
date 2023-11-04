---
type: post
category: fe
---
# TypeScript编译抽象语法树

[代码地址](http://gongbushang.com:3000/gongbushang/typescript_compiler)

两年前我曾写了一个篇
[Esprima静态分析js代码](http://gongbaodd.github.io/fe/2015/12/25/esprima%E9%9D%99%E6%80%81%E5%88%86%E6%9E%90js%E4%BB%A3%E7%A0%81.html),
当时的目的是为了检查一个js文件对某些函数的调用数计数来确定这个函数是不是可删的.

自从用了typescript,
这种方法自然就不需要使用了,
但是如果我想获取 typescript 的 AST 怎么办?

很简单, 因为 Ts 本身就是开源项目, 官方已经有解决方案.

假设我想看一下 "const a:number = 11;" 的 AST 树, 代码如下.

```typescript
import ts = require("typescript");
const source = "const a:number = 11;";

function printChildren(node: ts.Node, depth = 0) {
    console.log(new Array(depth + 1).join("---"), ts.SyntaxKind[node.kind], node.pos, node.end);
    depth++;
    node.getChildren().forEach(c => printChildren(c, depth));
}

const sourceFile = ts.createSourceFile("a.ts", source, ts.ScriptTarget.ES2016, true);
printChildren(sourceFile);
```

结果

```shell
 SourceFile 0 20
--- SyntaxList 0 20
------ VariableStatement 0 20
--------- VariableDeclarationList 0 19
------------ ConstKeyword 0 5
------------ SyntaxList 5 19
--------------- VariableDeclaration 5 19
------------------ Identifier 5 7
------------------ ColonToken 7 8
------------------ NumberKeyword 8 14
------------------ FirstAssignment 14 16
------------------ FirstLiteralToken 16 19
--------- SemicolonToken 19 20
--- EndOfFileToken 20 20
```

一个空对象的抽象语法树.

```typescript
class a {}
```

```shell
 SourceFile 0 10
--- SyntaxList 0 10
------ ClassDeclaration 0 10
--------- ClassKeyword 0 5
--------- Identifier 5 7
--------- FirstPunctuation 7 9
--------- SyntaxList 9 9
--------- CloseBraceToken 9 10
--- EndOfFileToken 10 10
```

那么复杂点的对象

```typescript
class a {
    public num: number = 11;
    public getNumber() {
        return this.num;
    }
}
```

```shell
 SourceFile 0 96
--- SyntaxList 0 96
------ ClassDeclaration 0 96
--------- ClassKeyword 0 5
--------- Identifier 5 7
--------- FirstPunctuation 7 9
--------- SyntaxList 9 94
------------ PropertyDeclaration 9 38
--------------- SyntaxList 9 20
------------------ PublicKeyword 9 20
--------------- Identifier 20 24
--------------- ColonToken 24 25
--------------- NumberKeyword 25 32
--------------- FirstAssignment 32 34
--------------- FirstLiteralToken 34 37
--------------- SemicolonToken 37 38
------------ MethodDeclaration 38 94
--------------- SyntaxList 38 49
------------------ PublicKeyword 38 49
--------------- Identifier 49 59
--------------- OpenParenToken 59 60
--------------- SyntaxList 60 60
--------------- CloseParenToken 60 61
--------------- Block 61 94
------------------ FirstPunctuation 61 63
------------------ SyntaxList 63 88
--------------------- ReturnStatement 63 88
------------------------ ReturnKeyword 63 78
------------------------ PropertyAccessExpression 78 87
--------------------------- ThisKeyword 78 83
--------------------------- DotToken 83 84
--------------------------- Identifier 84 87
------------------------ SemicolonToken 87 88
------------------ CloseBraceToken 88 94
--------- CloseBraceToken 94 96
--- EndOfFileToken 96 96
```

那么看看应用, 之前我写过 [plantUML的使用](http://gongbaodd.github.io/fe/2017/12/20/plantUML.html),
正好可以试一下看看能不能自动生成类图.

```typescript
import { readFileSync } from "fs";
import * as ts from "typescript";

export function uml(src: ts.SourceFile) {
    const classMap = {};
    analyseNode(src);
    console.log(draw());

    function analyseNode(node: ts.Node) {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            const cls = {};
            node.forEachChild(n => {
                if (n.kind === ts.SyntaxKind.Identifier) {
                    classMap[n.getText()] = cls;
                }
                if (n.kind === ts.SyntaxKind.PropertyDeclaration) {
                    n.forEachChild(i => {
                        if (i.kind === ts.SyntaxKind.Identifier) {
                            cls[i.getText()] = "var";
                        }
                    });
                }
                if (n.kind === ts.SyntaxKind.MethodDeclaration) {
                    n.forEachChild(i => {
                        if (i.kind === ts.SyntaxKind.Identifier) {
                            cls[i.getText()] = "function";
                        }
                    })
                }
            });
        }
        node.forEachChild(analyseNode);
    }

    function draw() {
        const tpl = `
@startuml
#
@enduml
        `.trim();
        let str = "";

        Object.keys(classMap).forEach(className => {
            const classItems = classMap[className];
            str += `class ${className} {\n`;
            Object.keys(classItems).forEach(i => {
                str += `${classItems[i]} ${i}\n`;
            });
            str += "}\n";
        });

        return tpl.replace("#", str);
    }
}


const file = process.argv.slice(2);
file.forEach(f => {
    const src = ts.createSourceFile(f, readFileSync(f).toString(), ts.ScriptTarget.ES2016, true);
    uml(src);
})

```


```plantuml
@startuml
class A {
var num
function getNumber
}

@enduml
```