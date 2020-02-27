---
type : post
category: fe
---
# 使用rust+webassembly开发game of life

这是一篇翻译，原文在https://github.com/rustwasm/book.git，这可能是第一篇系统讲解rustwasm的文章了。

## 这本书适合谁？

这本书适合任何对快速编译Rust和Webassembly感兴趣的人，相关的代码已经发布在网上。你应该已经了解一些Rust的知识，对JavaScript HTML和css很熟悉，但你不需要是在这些方面的专家。

还不了解rust？请先参阅[开始使用rust语言](https://doc.rust-lang.org/book/)。
不了解JavaScript的html或者是css？请参阅[MDN](https://developer.mozilla.org/en-US/docs/Learn)

## 为什么用rust和webAssembly

### 底层支持和高效(Low-Level Control with Hign-Level Ergonomics)

Javascript的应用，纠结于如何保持高效运作。但是JavaScript的动态类型系统和垃圾回收机制，使他们不能高效。看起来很小的修改，如果不小心走出了JIT的舒适区，看起来很小的修改都会导致很严重的错误。

### .wasm文件大小

因为要通过网络下载，代码的大小就变得异常重要。Rust不需要运行环境，使得编译文件不需要包括垃圾回收器。这些文件包括的只有真正需要的函数。

### 不要重写所有的东西

现有的代码不需要被扔走，你可以把性能最严重的JavaScript函数，交给rust去执行。

### 和其他工具交互融洽

Rust和WebAssembly支持现有的工具链，它支持ecmascript模块，并且你依然可以使用现有的工具链如NPM，webpack和greenkeeper。

## 背景和相关概念

### 什么是WebAssembly

WebAssembly（wasm）是一个简单的机器模块拥有大量的[定义](https://webassembly.github.io/spec/)。它被设计得以相近于原生的速度便携紧密地执行。

作为一个开发语言，尽管是以两种方式展示的格式，wasm依然表示于同样的结构。

+ ```.wat```文本格式（叫做WebAssembly Text），使用[S-expression](https://en.wikipedia.org/wiki/S-expression)，有点类似于Lisp家族，像是Scheme和Clojure。
+ ```.wasm```二机制格式，是一个底层的目标是让wasm虚拟机使用的格式，有些类似于ELF和Mach-O。

以```.wat```书写的斐波那契数列如下：

```wasm
(module
  (func $fac (param f64) (result f64)
    get_local 0
    f64.const 1
    f64.lt
    if (result f64)
      f64.const 1
    else
      get_local 0
      get_local 0
      f64.const 1
      f64.sub
      call $fac
      f64.mul
    end)
  (export "fac" (func $fac)))
```

如果感兴趣的话，可以使用[此工具](https://webassembly.github.io/wabt/demo/wat2wasm/)执行上面的代码。

#### 线性内存

Wasm使用的[内存模式](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-mem)很简单。一个wasm模块，可以访问的一系列内存，被限制于一个字节数组中。这些内存会[增长](https://webassembly.github.io/spec/core/syntax/instructions.html#syntax-instr-memory)为多个页（64K）不会收缩。

#### Wasm是仅仅为web开发的吗？

尽管在JavaScript和web社区中有很多讨论。WASM并没有考虑过它的运用环境。所以目前只能定义它为将来可以使用的便携运行格式。但就目前而言，wasm仍然在很多方面与JavaScript有关。不仅仅是浏览器，还有Node.js。

## 关于本书

这一部分开始使用Rust和WebAssembly开发[Conway的Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)。

本章会讲到以下内容。

+ 如何搭建编译WebAssembly的Rust工具链。
+ 一个支持开发多语言程序（Rust、wasm、JavaScript、HTML和CSS）的工作流。
+ 设计最大利用rust和wasm的优势配合JavaScript的优点的API。
+ 如何调试wasm模块。
+ 如何查看wasm的时间日志（time profile）。
+ 如何减少生成的二进制文件包大小。

## 安装工具

本节将会介绍编译Rust编译WASM并和JavaScript集成的工具链。

### Rust工具链

你需要安装rust的标准工具链，[rustup，rustc和cargo](https://www.rust-lang.org/tools/install)（强烈建议你们在WSl的环境下面工作）。

WASM已经推动Rust新特性进入稳定版，所以我们需要有1.30或更新版本。

### wasm-pack

```wasm-pack```是一站式的建造测试以及发布rust相关的wasm应用工具。

```shell
cargo install wasm-pack
```

### cargo-generate

```cargo-generate```帮助你使用现存的Git仓库作为模板新建Rust项目。

```shell
cargo install cargo-generate
```

### NPM

```npm```是JavaScript的包装管理器。我们将利用它，去安装和运行JavaScript的打包和测试部署。我们将把我们编译好的```.wasm```文件放到npm的包中。

如果你已经安装了NPM可以执行以下命令，安装最新版。

```shell
npm install npm@latest -g
```

## 你好，世界

通过本部分可以创建一个Rust+WASM页面，并能在页面弹窗展示```"Hello, World!"```。

### 复制项目模板

这个项目的模板已经提前编译好，可以借此快速绑定、集成和打包成Web项目。

利用模板创建项目的命令：

```shell
cargo generate --git https://github.com/rustwasm/wasm-pack-template
```

它会提醒你新建一个项目名称，这里我们先使用"wasm-game-of-life"。

### 文件结构

进入项目文件夹。

```shell
cd wasm-game-of-life
```

以下是项目文件夹：

```
wasm-game-of-life/
├── Cargo.toml
├── LICENSE_APACHE
├── LICENSE_MIT
├── README.md
└── src
    ├── lib.rs
    └── utils.rs
```

接下来详细看一下：

#### wasm-game-of-life/Cargo.toml

```Cargo.toml```文件描述```cargo```的依赖和源文件，Rust的包管理工具和编译工具。这个包括```wasm-bindgen```依赖，我们会稍后了解其他的依赖，还有一些用来初始化```.wasm```的```crate-type```库。

#### wasm-game-of-life/src/lib.rs

```src/lib```文件放在Rust项目的更目录下面。它使用```wasm-bindgen```去和JavaScript链接。它能引入```window.alert```这个JavaScript函数，并暴露```greet```函数，并弹出弹框。

```Rust
mod utils;
use wasm_bindgen::prelude::*;

// 当wee_alloc特性被打开，将会使用wee_alloc作为全局分匹配器
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-game-of-life!");
}
```

#### wasm-game-of-life/src/utils.rs

```src/utils```模块为编译Rust到WASM提供工具函数，我们后面会在调试时提到它，现在先忽略。

### 编译项目

使用```wasm-pack```依赖以下工具：

+ 保证Rust版本在1.30以上，且已经通过```rustup```安装```wasm32-unknown-unknown```工具链。
+ 使用```cargo```编译Rust到WASM。
+ 使用```wasm-bindgen```去生成JavaScript的API。

为了完成以上内容，需要在根目录执行以下命令：

```shell
wasm-pack build
```

编译完成后，我们可以看到```pkg```里面的结构，里面应该有如下文件。

```
pkg/
├── package.json
├── README.md
├── wasm_game_of_life_bg.wasm
├── wasm_game_of_life.d.ts
└── wasm_game_of_life.js
```

```README.md```文件是直接从根目录复制的，但是其他文件完全是新生成的。

#### wasm-game-of-life/pkg/wasm_game_of_life_bg.wasm

```.wasm```文件是Rust工具链使用Rust源代码生成的WASM的二进制文件，它包括全部的函数和数据，比方说，爆露出来的```greet```函数。

#### wasm-game-of-life/pkg/wasm_game_of_life.js

这个```.js```文件是```wasm-bindgen```引入DOM和JavaScript方法到Rust中，并油耗地暴露WASM的API到JavaScript中。举个例子，这里个```greet```函数包裹了WASM中的```greet```函数，目前，这个粘合还没做任何功能，当我们逐渐从WASM和JavaScript中传输数据，他会提供帮助。

```javascript
import * as wasm from "./wasm_game_of_life_bg";

export function greet() {
    return wasm.greet();
}
```

#### wasm-game-of-life/pkg/wasm_game_of_life.d.ts

这个```.d.ts```是TypeScript链接JavaScript的文件。如果你的项目中使用了TypeScript，你可以让你的WebAssembly项目被类型检查，并且你的IDE会提供代码提醒和自动完成功能。

```TypeScript
export function greet(): void;
```

#### wasm-game-of-life/pkg/package.json

这个文件包括了所有生成的文件描述，并使得这个项目能够作为一个使用WebAssembly的NPM包，能够集成到JavaScript工具链并发布至NPM。

```json
{   
  "name": "wasm-game-of-life",
  "collaborators": [
    "Your Name <your.email@example.com>"
  ],
  "description": null,
  "version": "0.1.0",
  "license": null,
  "repository": null,
  "files": [
    "wasm_game_of_life_bg.wasm",
    "wasm_game_of_life.d.ts"
  ],
  "main": "wasm_game_of_life.js",
  "types": "wasm_game_of_life.d.ts"
}
```

### 开始加入页面

想要```wasm-game-of-life```能够展示到页面中，需要使用[```create-wasm-app```JavaScript模板](https://github.com/rustwasm/create-wasm-app)。

在项目根目录执行以下命令：

```shell
npm init wasm-app www
```

这是```wasm-game-of-life/www```文件夹包括的文件。

```
wasm-game-of-life/www/
├── bootstrap.js
├── index.html
├── index.js
├── LICENSE-APACHE
├── LICENSE-MIT
├── package.json
├── README.md
└── webpack.config.js
```

#### wasm-game-of-life/www/package.json

这个文件包括已经配置好的```webpack```和```webpack-dev-server```依赖，和```hello-wasm-pack```，版本号为已经发布到NPM上面的版本号。

#### wasm-game-of-life/www/webpack.conf.js

这个是用来配置webpack和开发服务器的文件。该文件已经提前布置好，如果只是开发则无需过多关心这个文件。

#### wasm-game-of-life/www/index.html

这是页面的HTML文件，它是来调用```bootstrap.js```的。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello wasm-pack!</title>
  </head>
  <body>
    <script src="./bootstrap.js"></script>
  </body>
</html>
```

#### wasm-game-of-life/www/index.js

这是JavaScript的入口文件，他引入了```hello-wasm-pack```，并带哦用了greet函数。

```JavaScript
import * as wasm from "hello-wasm-pack";

wasm.greet();
```

#### 安装NPM依赖

首先保证已经在```www```文件夹下面执行过```npm i```，这个命令会安装好现有依赖包括webpack和开发服务器。

> 注意webpack并不是必须的，他只是个打包器并提供了开发服务器，这是我们选择它的原因。Parcel和Rollup一样支持WebAssembly模块。你也可以选择[不使用打包器](https://rustwasm.github.io/docs/wasm-bindgen/examples/without-a-bundler.html)。

#### 在www文件夹中使用本地wasm-game-of-life包

相比于使用NPM线上的```hello-wasm-pack```，使用本地文件会提高我们的开发舒适度。

打开```www/package.json```，找到```devDependencies```，在兄弟节点增加```dependencies```字段，并在里面增加```"wasm-game-of-life": "file:../pkg"```。

```JSON
{
  // ...
  "dependencies": {                     // Add this three lines block!
    "wasm-game-of-life": "file:../pkg"
  },
  "devDependencies": {
    //...
  }
}
```

接下来修改```www/index.js```引入greet函数。

```JavaScript
import * as wasm from "wasm-game-of-life";

wasm.greet();
```

既然修改了package.json，则需要重新安装他。

```shell
npm install
```

好了，现在服务器可以成功运行了。

#### 启动本地服务

接下来，打开一个新终端来在后台运行服务器，请在```www```文件夹下执行如下命令。

```shell
npm run start
```

打开http://localhost:8080，应当会弹出如下弹窗。

![弹窗](https://rustwasm.github.io/book/images/game-of-life/hello-world.png)


#### 练习

修改greet函数，引入参数```name: &str```，重新执行```wasm-pack build```，并刷新页面使得弹窗中能够显示"Hello, {name}"。

***答案***

修改```src/lib.rs```

```Rust
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

再修改JavaScript绑定```www/index.js```

```JavaScript
wasm.greet("Your name");
```

