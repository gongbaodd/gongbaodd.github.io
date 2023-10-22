---
type: post
category: fe
tag:
  - rust
  - wasm
---

# 使用 rust 和 webassembly 开发 game of life

这是一篇翻译，[原文](https://github.com/rustwasm/book.git)，这可能是第一篇系统讲解 rustwasm 的文章了。

## 这本书适合谁？

这本书适合任何对快速编译 Rust 和 Webassembly 感兴趣的人，相关的代码已经发布在网上。你应该已经了解一些 Rust 的知识，对 JavaScript HTML 和 css 很熟悉，但你不需要是在这些方面的专家。

还不了解 rust？请先参阅[开始使用 rust 语言](https://doc.rust-lang.org/book/)。
不了解 JavaScript 的 html 或者是 css？请参阅[MDN](https://developer.mozilla.org/en-US/docs/Learn)

## 为什么用 rust 和 webAssembly

### 底层支持和高效(Low-Level Control with Hign-Level Ergonomics)

Javascript 的应用，纠结于如何保持高效运作。但是 JavaScript 的动态类型系统和垃圾回收机制，使他们不能高效。看起来很小的修改，如果不小心走出了 JIT 的舒适区，看起来很小的修改都会导致很严重的错误。

### .wasm 文件大小

因为要通过网络下载，代码的大小就变得异常重要。Rust 不需要运行环境，使得编译文件不需要包括垃圾回收器。这些文件包括的只有真正需要的函数。

### 不要重写所有的东西

现有的代码不需要被扔走，你可以把性能最严重的 JavaScript 函数，交给 rust 去执行。

### 和其他工具交互融洽

Rust 和 WebAssembly 支持现有的工具链，它支持 ecmascript 模块，并且你依然可以使用现有的工具链如 NPM，webpack 和 greenkeeper。

## 背景和相关概念

### 什么是 WebAssembly

WebAssembly（wasm）是一个简单的机器模块拥有大量的[定义](https://webassembly.github.io/spec/)。它被设计得以相近于原生的速度便携紧密地执行。

作为一个开发语言，尽管是以两种方式展示的格式，wasm 依然表示于同样的结构。

- `.wat`文本格式（叫做 WebAssembly Text），使用[S-expression](https://en.wikipedia.org/wiki/S-expression)，有点类似于 Lisp 家族，像是 Scheme 和 Clojure。
- `.wasm`二机制格式，是一个底层的目标是让 wasm 虚拟机使用的格式，有些类似于 ELF 和 Mach-O。

以`.wat`书写的斐波那契数列如下：

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

Wasm 使用的[内存模式](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-mem)很简单。一个 wasm 模块，可以访问的一系列内存，被限制于一个字节数组中。这些内存会[增长](https://webassembly.github.io/spec/core/syntax/instructions.html#syntax-instr-memory)为多个页（64K）不会收缩。

#### Wasm 是仅仅为 web 开发的吗？

尽管在 JavaScript 和 web 社区中有很多讨论。WASM 并没有考虑过它的运用环境。所以目前只能定义它为将来可以使用的便携运行格式。但就目前而言，wasm 仍然在很多方面与 JavaScript 有关。不仅仅是浏览器，还有 Node.js。

## 关于本书

这一部分开始使用 Rust 和 WebAssembly 开发[Conway 的 Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)。

本章会讲到以下内容。

- 如何搭建编译 WebAssembly 的 Rust 工具链。
- 一个支持开发多语言程序（Rust、wasm、JavaScript、HTML 和 CSS）的工作流。
- 设计最大利用 rust 和 wasm 的优势配合 JavaScript 的优点的 API。
- 如何调试 wasm 模块。
- 如何查看 wasm 的时间日志（time profile）。
- 如何减少生成的二进制文件包大小。

## 安装工具

本节将会介绍编译 Rust 编译 WASM 并和 JavaScript 集成的工具链。

### Rust 工具链

你需要安装 rust 的标准工具链，[rustup，rustc 和 cargo](https://www.rust-lang.org/tools/install)（强烈建议你们在 WSl 的环境下面工作）。

WASM 已经推动 Rust 新特性进入稳定版，所以我们需要有 1.30 或更新版本。

### wasm-pack

`wasm-pack`是一站式的建造测试以及发布 rust 相关的 wasm 应用工具。

```shell
cargo install wasm-pack
```

### cargo-generate

`cargo-generate`帮助你使用现存的 Git 仓库作为模板新建 Rust 项目。

```shell
cargo install cargo-generate
```

### NPM

`npm`是 JavaScript 的包装管理器。我们将利用它，去安装和运行 JavaScript 的打包和测试部署。我们将把我们编译好的`.wasm`文件放到 npm 的包中。

如果你已经安装了 NPM 可以执行以下命令，安装最新版。

```shell
npm install npm@latest -g
```

## 你好，世界

通过本部分可以创建一个 Rust+WASM 页面，并能在页面弹窗展示`"Hello, World!"`。

### 复制项目模板

这个项目的模板已经提前编译好，可以借此快速绑定、集成和打包成 Web 项目。

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

`Cargo.toml`文件描述`cargo`的依赖和源文件，Rust 的包管理工具和编译工具。这个包括`wasm-bindgen`依赖，我们会稍后了解其他的依赖，还有一些用来初始化`.wasm`的`crate-type`库。

#### wasm-game-of-life/src/lib.rs

`src/lib`文件放在 Rust 项目的更目录下面。它使用`wasm-bindgen`去和 JavaScript 链接。它能引入`window.alert`这个 JavaScript 函数，并暴露`greet`函数，并弹出弹框。

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

`src/utils`模块为编译 Rust 到 WASM 提供工具函数，我们后面会在调试时提到它，现在先忽略。

### 编译项目

使用`wasm-pack`依赖以下工具：

- 保证 Rust 版本在 1.30 以上，且已经通过`rustup`安装`wasm32-unknown-unknown`工具链。
- 使用`cargo`编译 Rust 到 WASM。
- 使用`wasm-bindgen`去生成 JavaScript 的 API。

为了完成以上内容，需要在根目录执行以下命令：

```shell
wasm-pack build
```

编译完成后，我们可以看到`pkg`里面的结构，里面应该有如下文件。

```
pkg/
├── package.json
├── README.md
├── wasm_game_of_life_bg.wasm
├── wasm_game_of_life.d.ts
└── wasm_game_of_life.js
```

`README.md`文件是直接从根目录复制的，但是其他文件完全是新生成的。

#### wasm-game-of-life/pkg/wasm_game_of_life_bg.wasm

`.wasm`文件是 Rust 工具链使用 Rust 源代码生成的 WASM 的二进制文件，它包括全部的函数和数据，比方说，爆露出来的`greet`函数。

#### wasm-game-of-life/pkg/wasm_game_of_life.js

这个`.js`文件是`wasm-bindgen`引入 DOM 和 JavaScript 方法到 Rust 中，并油耗地暴露 WASM 的 API 到 JavaScript 中。举个例子，这里个`greet`函数包裹了 WASM 中的`greet`函数，目前，这个粘合还没做任何功能，当我们逐渐从 WASM 和 JavaScript 中传输数据，他会提供帮助。

```javascript
import * as wasm from "./wasm_game_of_life_bg";

export function greet() {
  return wasm.greet();
}
```

#### wasm-game-of-life/pkg/wasm_game_of_life.d.ts

这个`.d.ts`是 TypeScript 链接 JavaScript 的文件。如果你的项目中使用了 TypeScript，你可以让你的 WebAssembly 项目被类型检查，并且你的 IDE 会提供代码提醒和自动完成功能。

```TypeScript
export function greet(): void;
```

#### wasm-game-of-life/pkg/package.json

这个文件包括了所有生成的文件描述，并使得这个项目能够作为一个使用 WebAssembly 的 NPM 包，能够集成到 JavaScript 工具链并发布至 NPM。

```json
{
  "name": "wasm-game-of-life",
  "collaborators": ["Your Name <your.email@example.com>"],
  "description": null,
  "version": "0.1.0",
  "license": null,
  "repository": null,
  "files": ["wasm_game_of_life_bg.wasm", "wasm_game_of_life.d.ts"],
  "main": "wasm_game_of_life.js",
  "types": "wasm_game_of_life.d.ts"
}
```

### 开始加入页面

想要`wasm-game-of-life`能够展示到页面中，需要使用[`create-wasm-app` JavaScript 模板](https://github.com/rustwasm/create-wasm-app)。

在项目根目录执行以下命令：

```shell
npm init wasm-app www
```

这是`wasm-game-of-life/www`文件夹包括的文件。

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

这个文件包括已经配置好的`webpack`和`webpack-dev-server`依赖，和`hello-wasm-pack`，版本号为已经发布到 NPM 上面的版本号。

#### wasm-game-of-life/www/webpack.conf.js

这个是用来配置 webpack 和开发服务器的文件。该文件已经提前布置好，如果只是开发则无需过多关心这个文件。

#### wasm-game-of-life/www/index.html

这是页面的 HTML 文件，它是来调用`bootstrap.js`的。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello wasm-pack!</title>
  </head>
  <body>
    <script src="./bootstrap.js"></script>
  </body>
</html>
```

#### wasm-game-of-life/www/index.js

这是 JavaScript 的入口文件，他引入了`hello-wasm-pack`，并带哦用了 greet 函数。

```JavaScript
import * as wasm from "hello-wasm-pack";

wasm.greet();
```

#### 安装 NPM 依赖

首先保证已经在`www`文件夹下面执行过`npm i`，这个命令会安装好现有依赖包括 webpack 和开发服务器。

> 注意 webpack 并不是必须的，他只是个打包器并提供了开发服务器，这是我们选择它的原因。Parcel 和 Rollup 一样支持 WebAssembly 模块。你也可以选择[不使用打包器](https://rustwasm.github.io/docs/wasm-bindgen/examples/without-a-bundler.html)。

#### 在 www 文件夹中使用本地 wasm-game-of-life 包

相比于使用 NPM 线上的`hello-wasm-pack`，使用本地文件会提高我们的开发舒适度。

打开`www/package.json`，找到`devDependencies`，在兄弟节点增加`dependencies`字段，并在里面增加`"wasm-game-of-life": "file:../pkg"`。

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

接下来修改`www/index.js`引入 greet 函数。

```JavaScript
import * as wasm from "wasm-game-of-life";

wasm.greet();
```

既然修改了 package.json，则需要重新安装他。

```shell
npm install
```

好了，现在服务器可以成功运行了。

#### 启动本地服务

接下来，打开一个新终端来在后台运行服务器，请在`www`文件夹下执行如下命令。

```shell
npm run start
```

打开http://localhost:8080，应当会弹出如下弹窗。

![弹窗](https://rustwasm.github.io/book/images/game-of-life/hello-world.png)

### 练习

修改 greet 函数，引入参数`name: &str`，重新执行`wasm-pack build`，并刷新页面使得弹窗中能够显示"Hello, {name}"。

**_答案，不许看！_**

修改`src/lib.rs`

```Rust
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

再修改 JavaScript 绑定`www/index.js`

```JavaScript
wasm.greet("Your name");
```

## Conway 的生命游戏的游戏规则

如果你已经了解[Conway 的生命游戏](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)，可以跳过这部分。

整个 Conway 的生命游戏是在一个无限的二维的正交格子宇宙中，每一个细胞拥有两种生命状态，生或者死。或者说可增殖或者不可增殖。每一个细胞都和它的 8 个邻居交互，它们分别是纵向的，斜向的，横向的相邻。并且每一步都会发生如下的变化。

1. 任何一个活着的细胞，如果有少于两个邻居就会死亡。
2. 任何一个活细胞拥有两个或三个活着的邻居，则会继续增殖。
3. 任何一个活着的细胞拥有三个以上活着的的邻居，则会死亡。
4. 任何一个死掉的细胞，如果有三个活着的邻居，则会重生。

最初的图案组成了最初的世界。第 1 代是按照以上的规则生成的，每一个细胞的生成和死亡都是同时的。他们的生存和死亡这一个时间我们称之为一刻。用程序的语言来说，这一刻是上一次生成的纯函数。这个规则一直有效。

考虑设置如下的初始宇宙：

![初始宇宙](https://rustwasm.github.io/book/images/game-of-life/initial-universe.png)

我们可以通过考虑每一个细胞来确定下一代。最左上角的细胞已经死亡，第 4 条规则是唯一一个能够处理死亡细胞的规则。所以第 1 排的所有细胞都有相同的规则。他们都没有三个活着的邻居。只能保持死亡。

当我们看到最上面的活着的细胞时，这个游戏开始变得有趣了。在第 2 排第 3 列。对于活着细胞前三个规则都可以应用。对于这一个细胞，他只有一个活着的邻居，所以规则一可用。这个细胞会在下一次争执死亡。下面那几个活着的细胞也是有一样的命运。

中间的活着的细胞，还有两个邻居，上面的和下面的，这就意味着它符合规则二，他可以活到下一次增值。

最后一个比较有趣的例子，就是当我们看到死掉的细胞。嗯。在中间这活着的细胞的左边和右边。这三个活着的细胞都是他们的邻居。这使得他们按照规则是可以在下一轮重生。

将这些规则放在一起，我们可以获得下一刻的世界。

![下一刻的世界](https://rustwasm.github.io/book/images/game-of-life/next-universe.png)

根据这个例子，和确定的规则。不去并精彩的事情将会发生。

![Gosper's glider gun](https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif)

![Pulsar](https://upload.wikimedia.org/wikipedia/commons/0/07/Game_of_life_pulsar.gif)

![Space ship](https://upload.wikimedia.org/wikipedia/commons/3/37/Game_of_life_animated_LWSS.gif)

### 练习

手动计算出下一刻，宇宙应该是什么样

**_答案，不许看！_**

![下一刻宇宙](https://rustwasm.github.io/book/images/game-of-life/initial-universe.png)

你能找到一个稳定的没有变化的宇宙吗？

**_答案，不许看！_**

这个答案，不许看！其实有无数个，最平凡的答案，不许看！就是它是一个空宇宙。如果是一个 2×2 的方格，也可以形成一个稳定的宇宙。

## 实现 Conway 的生命游戏

### 设计

在开始之前呢，我们要先考虑以下几种设计模式。

#### 无限宇宙

生命游戏是在一个无限宇宙中玩的。但是我们没有无限的内存和计算能力。在这种情况下，我们往往会有三个选项。

1. 始终追踪这个宇宙的发展，并适当的扩展宇宙。这个扩张是无限的，所以这个实现实现了就会逐渐逐渐的变得越来越慢，直到把内存全部用完。
2. 创建一个固定的宇宙，当细胞碰到宇宙的边缘的时候，将会有更少的邻居。更简单的策略就是当他们已经达到边缘的时候，直接被宇宙剪掉。
3. 创建一个固定的宇宙，当细胞达到边缘的时候，将会从另外一边滑入这样，我的我们的应用就可以一直跑下去。

我们会按照第 3 个选项来实现。

#### 连接 Rust 和 JavaScript

> 此部分是本人最重要的一节。

JavaScript 的垃圾回收堆内存，是用来调用 Object 和 Array 还有 DOM 结点的。而 Rust 存在的 WebAssembly 线性内存和它是截然不同的。WebAssembly 目前还不能直接操作垃圾回收堆内存（在 2018 年 4 月，一个关于[接口类型（Interface Type）](https://github.com/WebAssembly/interface-types/blob/master/proposals/interface-types/Explainer.md)的提案将会改变这一局面）。JavaScript 却可以读写 WebAssembly 的线性内存，但仅限于 ArrayBuffe 支持的标量（u8, i32, f64 等等）。WebAssembly 行数一样能处理和返回这些标量。以下讲解 WebAssembly 和 JavaScript 如何链接。

wasm_bindgen 定义了如何穿过这段链接计算数据结构的方法。它包括装箱 Rust 结构，并包装指针成为一个 JavaScript 类以供使用，或者提供 JavaScript 对象给 Rust 使用。wasm_bindgen 非常便利，但并不是无需考虑怎样在这个链接上传输数据结构。你应该把它当作一个实现接口的工具。

当设计 WebAssembly 和 JavaScript 的接口时，我们需要考虑到以下内容。

1. **减少复制到和移出 WebAssembly 线性内存中的值**，无效的复制会造成无用的性能损耗。
2. **最小的序列化和解序列化**，和复制类似，序列化和解序列化一样造成性能损耗，如果想要把数据无副作用地从一端传到另一端，与其说在一端序列化，到另一端解序列化，不如使用 wasm_bindgen 帮助我们将 JavaScript 的 Object 装箱成 Rust 的 structure。

一个结论，处理 JavaScript 和 WebAssembly 接口设计时，经常将大的、生命周期长的数据结构作为 Rust 类型，存储在 WebAssembly 线性内存中，并给 JavaScript 暴露一个处理方法，JavaScript 调用 WebAssembly 转换文件，处理运算，并最终得到一个小的，可复制的结果。通过只返回计算结果，我们可以躲过复制和序列化数据的过程。

#### 在生命游戏中链接 Rust 和 JavaScript

接下来结局几个要规避的问题。我们不想每刻都复制整个宇宙到 WebAssembly 的内存中，我们不想处理宇宙中所有的细胞，也不想在每次读写细胞的时候都穿过 WebAssembly 和 JavaScript 的分界。

这是我们的 4x4 宇宙在内存中的结构。

![4x4宇宙在内存中的结构](https://rustwasm.github.io/docs/book/images/game-of-life/universe.png)

为了寻找细胞在内存中的位置，我们可以使用下面的公式。

```
index(row, column, universe) = row * width(universe) + column
```

我们有很多方法来给 JavaScript 暴露宇宙中的细胞。开始我们要为宇宙实现一个`std::fmt::Display`。我们可以使用一个 Rust 的 String，每个字符代表一个细胞。这个 Rust 的 string 将会从 WebAssembly 的内存中复制到 JavaScript 的内存里，并接下来作为 textContent 展示到 HTML 里面。本节的后面，将会讲到如何把细胞展示到 canvas 中。

> 另一种设计是让 Rust 返回每个细胞的生存状态列表，这样 JavaScript 就不需要在渲染时解析整个宇宙，这不过这个是先更加复杂些。

#### Rust 的实现

上一章，我们复制了初始化模板，我们现在要修改这个模板。

从删除 greet 函数，并定义宇宙中的细胞开始。

```Rust
#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}
```

`#[repr(u8)]`很重要，这样每个细胞都会以一个字节存储，另外 Alive 为 1，Dead 为 0 也很重要，这样我们就可以使用加法计算邻居数目。

接下来定义宇宙，一个宇宙包括宽度，高度和一个向量的细胞。

```Rust
#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}
```

访问并转换细胞的实现如下。

```Rust
impl Univers {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row*self.width + column) as usize
    }
}
```

为了计算细胞接下来的状态，我们要统计某个细胞有多少个邻居存活。

```Rust
impl Univers {
    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col ==0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx] as u8
            }
        }
        count
    }
}
```

这个函数使用取余处理边界问题。现在我们已经有所有的必须函数了，最后只需要生成下一刻的状态即可（记住，每个函数必须在`#[wasm_bindgen]`属性之下，这样 JavaScript 才能接到暴露的函数）。

```Rust
#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                let next_cell = match (cell, live_neighbors) {
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    (Cell::Dead, 3) => Cell::Alive,
                    (otherwise, _) => oterwise,
                };

                next[idx] = next_cell;
            }
        }
        self.cells = next;
    }
}
```

目前为止，一个宇宙的状态就都被存储在 cell 这个向量里面了。为了提高它的可读性，让我们实现一个文本渲染器，目的是将整个宇宙按行输出为文字，每一个活着的细胞标注为 Unicode 符号“■”，死掉的细胞则为“□”。

通过实现 Rust 标准库中的`Display`trait，我们可以将数据结构以一种用户交互方式输出，它也提供了一个`to_string`方法。

```Rust
use std::fmt;

impl fmt::Display for Universe {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for line in self.cells.as_slice().chunks(self.width as usize) {
      for &cell in line {
        let symbol = if cell == Cell::Dead {"□"} else {"■"};
        write!(f, "\n")?;
      }
    }

    Ok(())
  }
}
```

最后，我们定义一个构造器去初始化一个有趣的图案和一个渲染函数。

```Rust
#[wasm_bindgen]
impl Universe {
  pub fn new() -> {
    let width = 64;
    let height = 64;

    let cells = (0..width * height)
      .map(|i| {
        if i%2 == 0 || i%7 == 0 {
          Cell::Alive
        } else {
          Cell::Dead
        }
      }).collect();

    Universe {
      width,
      height,
      cells,
    }
  }

  pub fn render(&self) -> String {
    self.to_string()
  }
}
```

以上，Rust 部分已经完工。

#### 使用 JavaScript 渲染

首先在 HTML 中插入<pre>标签用来展示整个宇宙。

```html
<body>
  <pre id="game-of-life-canvas"></pre>
  <script src="./bootstrap.js"></script>
</body>
```

另外我们希望<pre>标签能处于页面中央。我们可以通过 CSS flex box 实现这个任务，在 html 中增加<style>标签。

```css
body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

修改 JavaScript 入口文件，将原来引入的 greet 函数改为 Universe。

```JavaScript
import { Universe } from "wasm-game-of-life";
```

让我们在那个<pre>标签中增加新的宇宙实例吧。

```JavaScript
const pre = document.getElementById("game-of-life-canvas");
const universe = Universe.new();
```

使用 JavaScript 创建一个 requestAnimationFrame 循环，每一次循环，就在<pre>标签中绘制一遍宇宙，并执行一次`Universe::tick`。

```JavaScript
function renderLoop() {
  pre.textContent = universe.render();
  universe.tick();

  requestAnimationFrame(renderLoop);
}
```

想要实现渲染，只需执行`requestAnimationFrame(renderLoop)`。

确保你的本地服务任然在运行，此时你的页面应该如下所示。

![浏览器页面](https://rustwasm.github.io/book/images/game-of-life/initial-game-of-life-pre.png)

#### 渲染到 Canvas 上

在 Rust 中生成字符串并通过 wasm-bindgen 拷贝到 JavaScript 中做了很多无关的复制。既然 JavaScript 已经知道宇宙的长度和宽度，而且 JavaScript 本来可以直接读 WebAssembly 的内存，我们将要修改 render 方法，直接返回细胞向量的指针。

同时，与其渲染 Unicode 字符，不如开始用 Canvas API。接下来我们会开始设计这些。

在 html 中，修改<pre>为<canvas>。

```html
<body>
  <canvas id="game-of-life-canvas"></canvas>
  <script src="./bootstrap.js"></script>
</body>
```

为了能拿到 Rust 中的相关数据结构，我们需要为宇宙增加 getter 函数，暴露宇宙的宽度、高度和细胞的向量。增加如下函数。

```Rust
#[wasm_bindgen]
impl Universe {
  pub fn width(&self) -> u32 {
    self.width
  }

  pub fn height(&self) -> u32 {
    self.height
  }

  pub fn cells(&self) -> *const Cell {
    self.cells.as_ptr()
  }
}
```

接下来，在 JavaScript 中，引入 Cell，并设置几个渲染画布的常量。

```JavaScript
import { Universe, Cell } from "wasm-game-of-life";

const CELL_SIZE = 5;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const LIVE_COLOR = "#000000";
```

接下来修改实现 canvas 的部分。

```JavaScript
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

const canvas = documnet.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE+1)*height + 1;
canvas.width = (CELL_SIZE+1)*width + 1;

const ctx = canvas.getContext("2d");

function renderLoop() {
  universe.tick();

  drawGrid();
  drawCells();

  requestAnimationFrame(renderLoop);
}
```

世界的网格，是一系列等宽的竖线和横线。

```JavaScript
function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  for(let i =0; i <= width; i+=1) {
    ctx.moveTo(i*(CELL_SIZE+1) + 1, 0);
    ctx.lineTo(i*(CELL_SIZE+1) + 1, (CELL_SIZE+1)*height+1);
  }

  for(let i=0; i<=height; j++) {
    ctx.moveTo(0, i*(CELL_SIZE+1)+1);
    ctx.lineTo((CELL_SIZE+1)*width+1, i*(CELL_SIZE+1)+1);
  }

  ctx.stroke();
}
```

我们可以直接访问 WebAssembly 的内存，他是直接定义在`wasm_game_of_life_bg`。为了画细胞，我们先找到一个细胞的指针，并将它们转换成 Unit8Array，迭代这些细胞，并按照他们的生命状态绘制白色和黑色方块。计量避免复制所有细胞。

```JavaScript
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

function getIndex(row, column) {
  return row*width+column;
}

function drawCells() {
  const cellsPtr = universe.cells();
  const cells = new Unit8Array(
    memory.buffer,
    cellPtr,
    width*height,
  );

  ctx.beginPath();

  for(let row=0; row<height; row+=1) {
    for (let col=0; col<width; col+=1) {
      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === CellDead
        ? DEAD_COLOR
        : LIVE_COLOR;

      ctx.fillRect(
        cell*(CELL_SIZE+1) + 1,
        row*(CELL_SIZE+1) + 1,
        CELL_SIZE,
        CELL_SIZE,
      );
    }
  }

  ctx.stroke();
}
```

开始渲染，需要添加以下表达式。

```JavaScript
drawGrid();
drawCells();
requestAnimationFrame(renderLoop);
```

注意 drawGrid 和 drawCell 必须要在 requestAnimationFrame 之前执行。

#### 成功了！

重建 WebAssembly 绑定。

```shell
wasm-pack build
```

确定开发服务器还在运行，如果不是，需要执行以下命令。

```shell
npm run start
```

刷新`http://localhost:8080/`，你应该能看到如下结果。

![页面](https://rustwasm.github.io/docs/book/images/game-of-life/initial-game-of-life.png)

结束之前，这里还有一个不错的实现生命游戏的算法，[hashlife](https://en.wikipedia.org/wiki/Hashlife)。它使用缓存，使得程序有指数级性能提升！但是为什么我们不实现它呢？它已经超出本文涉及的范围了，本文只是专注于 Rust 和 WebAssembly 集成，但是我们强烈期望你能实现这一算法。

### 练习

#### 实现一台宇宙飞船

#### 生成一个随机的初始环境，每个细胞有 50%的生存可能

**_答案，不许看！_**

先增加 js-sys 依赖

```toml
[dependencies]
js-sys="0.3"
```

接下来使用 js 的随机函数

```Rust
extern crate js_sys;

if js_sys::Math::random() < 0.5 {

} else {

}
```

#### 以 bit 形式存储每个 cell

**_答案，不许看！_**

在 Rust 中，使用 fixedbitset 代替`Vec<Cell>`;

```Rust
extern crate fixedbitset;
use fixedbitset::FixedBitSet;

#[wasm_bindgen]
pub struct Universe {
  width: u32,
  height: u32,
  cells: FixedBitSet,
}
```

宇宙的构造器应该这么修改。

```Rust
pub fn new() -> Universe {
  let width = 64;
  let height = 64;

  let size = (width*height) as usize;
  let mut cells = FixedBitSet::with_capacity(size);

  for i in 0..size {
    cells.set(i, i%2==0 || i%7==0);
  }

  Universe {
    width,
    height,
    cells,
  }
}
```

使用 FixedBitSet 的 set 方法更新宇宙的下一刻。

```Rust
next.set(idx, match (cell, live_neighbors) {
  (true, x) if x<2 => false,
  (true, 2) | (true, 3) => true,
  (true, x) if x>3 => false,
  (false, 3) => true,
  (otherwise, _) => otherwise
});
```

传输指针的时候，需要返回 slice。

```Rust
#[wasm_bindgen]
impl Universe {
  pub fn cells(&self) -> *const u32 {
    self.cells.as_slice().as_ptr()
  }
}
```

在 JavaScript 中，构造 Unit8Array 的时候需要除以 8，以为我们是以 bit 存储细胞的。

```JavaScript
const cells = new Unit8Array(
  memory.buffer,
  cellsPtr,
  width*height/8
);
```

通过判断 Unit8Array 是否被赋值而判断细胞是否是活着的。

```JavaScript
function bitIsSet(n, arr) {
  const byte = Math.floor(n/8);
  const mask = 1<<(n%8);
  return (arr[byte] & mask) == mask;
}
```

根据以上变化，新版本的 drawCells 如下。

```JavaScript
function drawCells() {
  const cellsPtr = universe.cells();
  const cells = new Unit8Array(
    memory.buffer,
    cellsPtr,
    width*height/8
  );

  ctx.beginPath();

  for (let row=0; row<height; row+=1) {
    for(let col=0; col<width; col+=1) {
      const idx = getIndex(row, col);

      ctx.fillStyle = bitIsSet(idex, cells)
        ? LIVE_COLOR
        : DEAD_COLOR;

      ctx.fillRect(
        col*(CELL_SIZE+1)+1,
        row*(CELL_SIZE+1)+1,
        CELL_SIZE,
        CELL_SIZE,
      );
    }
  }

  ctx.stroke();
}
```

## 测试

现在我们已经实现了 Rust 的实现，并成功渲染在浏览器中。现在来谈谈测试 WebAssembly 中的 Rust 函数。

我们将要测试 tick 函数，确保它能返回正确的值。

接下来，我们将处理 Universe 的 setter 函数，让我们能构造不同大小的 universe。

```Rust
#[wasm_bindgen]
impl Universe {
  pub fn set_width(&mut self, width: u32) {
    self.width = width;
    self.cells = (0..width * self.height).map(|_| Cell::Dead).collect()
  }

  pub fn set_height(&mut self, height: u32) {
    self.height = height;
    self.cells = (0..self.width * height).map(|_| Cell::Dead).collect()
  }
}
```

我们将会创建另一个不需要`#[wasm_bindgen]`的`impl Universe`实现，因为我们不能把所有的 WebAssembly 函数暴露给 JavaScript，Rust 生成的 WebAssembly 函数是不能返回引用的。可以尝试让 Rust 返回一个引用，查看一下编译结果中是什么错误。

接下来我们要写一个 get_cells 来获得细胞，和一个 set_cells 来设置哪些细胞是活的，哪些是死的。

```Rust
impl Universe {
  pub fn get_cells(&self) -> &[Cell] {
    &self.cells
  }

  pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
    for (row, col) in cells.iter().cloned() {
      let idx = self.get_index(row, col);
      self.cells[idx] = Cell::Alive;
    }
  }
}
```

现在我们将创建测试文件`tests/web.rs`。

在这之前，测试环境已经配置好，请确定`wasm-pack test --chrome --headless`能够在根目录下运行。你也可以使用`--firefox`，`--safari`和`--node`选项来在其他浏览器测试你的代码。

在`test/web.rs`中，我们需要到处 Universe 类型。

```Rust
extern crate wasm_game_of_life;
use wasm_game_of_life:Universe;
```

在测试文件中，我们要创建一个飞船构造函数。

我们要构造一个 tick 函数执行之前的飞船，和一个 tick 函数执行后的期望值。

```Rust
#[cfg(test)]
pub fn input_spaceship() -> Universe {
  let mut universe = Universe::new();

  universe.set_width(6);
  universe_set_height(6);
  universe_set_cells(
    &[
      (1,2),
      (2,3),
      (3,1), (3,2),(3,3)
    ]
  );

  universe
}

#[cfg(test)]
pub fn expected_spaceship() -> Universe {
  let mut universe = Universe::new();

  universe.set_width(6);
  universe_set_height(6);
  universe_set_cells(
    &[
      (2,1), (2,3),
      (3,2), (3,3),(4,2)
    ]
  );

  universe
}
```

现在我们写一个 test_tick 函数，创建以上的两个飞船。最后使用`assert_eq!`宏比较 expected_ship 来确保 tick 函数运行正确。我们添加`#[wasm_bindgen_test]`属性保证这个函数可以在 WebAssembly 环境下测试。

```Rust
#[wasm_bindgen_test]
pub fn test_tick() {
  let mut input_universe = input_spaceship();
  let expected_universe = expected_spaceship();

  input_universe.tick();
  assert_eq!(
    &input_universe.get_cells(),
    &expected_universe.get_cells(),
  )
}
```

测试这个测试函数使用`wasm-pack test --firefox --headless`。

## 调试

写这么多代码之前（虽然上面都写完了，我也不知道原作者抽什么风），先看一看 Rust 的调试工具。

### 调试工具

此部分将会介绍 WebAssembly 的调试工具。

#### 使用 debug 标记编译

如果没有打开 debug 标记，"name"这个部分就不会被编译到二进制程序中，错误栈也不会显示函数名，你会收到`wasm-functions[42]`而不是`wasm_game_of_file::Universe::live_neighbor_count`。

调试编译，`wasm-pack build --debug`或者`cargo build`总是会默认打开 debug 标记。

版本编译（release build），debug 标记是默认关闭的，要打开 debug 标记，需要声明`debug=true`。

```toml
[profile.release]
debug = true
```

#### 使用 console API 打印日志

打印日志是最好的判断程序是否是有错的方式。在浏览器中，`console.log`函数可以将日志打印到浏览器的 dev 工具里。

我们可以使用 web-sys 包去调用 console API。

```Rust
extern crate web_sys;

web_sys::console::log_1(&"Hello, world!".into());
```

相应的`console.error`函数用法一致，但是浏览器的调用栈还是按照`console.error`来打印。

使用`console.log`：

- [`web_sys::console::log`，接受一个向量的数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log.html)。
- [`web_sys::console::log_1`，接受一个数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log_1.html)。
- [`web_sys::console::log_2`，接受两个数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log_2.html)。
- ...

使用`console.error`：

- [`web_sys::console::error`，接受一个向量的数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error.html)。
- [`web_sys::console::error_1`，接受一个数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error_1.html)。
- [`web_sys::console::error_2`，接受两个数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error_2.html)。
- ...

#### 打印崩溃日志

[`console_error_panic_hook`包能通过`console.error`打印崩溃日志](https://github.com/rustwasm/console_error_panic_hook)。他能打印出格式化的崩溃信息而不是难以理解的`RuntimeError: unreachable executed`。

你只需要增加调用这个钩子函数。

```Rust
#[wasm_bindgen]
pub fn init_panic_hook() {
  console_error_panic_hook::set_once();
}
```

#### 使用调试器

不幸的，WebAssembly 的调试器依然不成熟，在很多 unix 系统中，DWARF 是用来解析调试程序需要的数据的工具。虽然，Windows 上面也有一个类似的工具。但还没有相当的工具提供给 WebAssembly。所以，调试器目前能给予的功能有限，我们只能收到 WebAssembly 的错误而不是 Rust 源代码的错误。

> 这里有一个故事是[跟踪 WebAssembly 的调试](https://github.com/WebAssembly/debugging)的，我们希望它将来会有所改善！

尽管如此，调试器还是能够给调试 JavaScript 方面提供效力。

#### 一开始就规避在 WebAssembly 上面使用调试

如果错误和交互 JavaScript 和 Web API 有关，则使用`wasm-bindgen-test`写测试。

如果和 JavaScript 和 Web API 无关，这是用默认的`#[test]`属性。使用[`quickcheck`包](https://crates.io/crates/quickcheck)可以减少写测试上面的时间。

为了避免`#[test]`编译器出现连接错误，你需要一个 rlib 依赖，在`Cargo.toml`文件按照如下修改。

```toml
[lib]
crate-type ["cdylib", "rlib"]
```

### 在生命游戏中打开崩溃日志

如果程序崩溃，最好是能够在审查工具中看到日志。

在``src/utils.rs`里面有一个可选的 console_error_panic_hook 包，可以在 Universe 初始化的时候调用它。

```Rust
pub fn new() -> Universe {
  utils::set_panic_hook();
}
```

### 为生命游戏增加日志

让我们在 Rust 中利用 web-sys 调用 console，打印出每一刻的细胞状态。

首先在以来中增加 web-sys，修改 Cargo.toml。

```toml
[dependencies.web-sys]
version = "0.3"
features = [
  "console",
]
```

为了高效，我们把`console.log`函数封装到`println!`一样的宏中。

```Rust
extern crate web_sys;

macro_rules! log {
  ($( $t:tt )*) => {
    web_sys::console::log_1(&format!( $( $t )* ).into());
  }
}
```

现在可以通过调用 log 发送日志了。

```Rust
log!(
  "cell[{}, {}] is initially {:?} and has {} live neighbors",
  row,
  col,
  cell,
  live_neighbors,
)
```

### 使用调试器

浏览器的调试器在调试 JavaScript 和 Rust 生成的 WebAssembly 很有效。

举个例子，在 renderLoop 函数中增加`debugger;`可以暂停页面执行的某一刻。

者给予我们查看每一刻细胞状态的能力。

![调试画面](https://rustwasm.github.io/docs/book/images/game-of-life/debugging.png)

### 练习

1. 给 tick 方法增加 log，查看细胞状态。
2. 加入`panic!()`查看打印出来的崩溃日志。

## 增加交互

接下来我们要给这个游戏增加一些交互，我们会允许用户选择细胞的生死，并且允许暂停游戏，并使绘制初始图案更加简单。

### 暂停和继续游戏

首先修改 html，在画布上面增加一个<button>标签。

```html
<button id="play-pause"></button>
```

在 JavaScript 中，我们要做以下几点改动。

- 追踪调用 requestAnimationFrame 的标识符，这样我们就能通过调用 cancelAnimationFrame 来终止动画。
- 当点击播放或者暂停键的时候，先检查标识符是否存在，一旦存在，则表示动画正在运行，我们需要取消动画以保证 renderLoop 不再被调用。如果标识符不存在，我们需要调用 requestAnimationFrame 以保证动画继续运行。

因为是 JavaScript 控制着 Rust 和 WebAssembly，我们不需要修改 Rust 部分。

我们引入 animationId 变量，保存 requestAnimationFrame 的结果。当没有排队的动画时，这个变量值为 null。

```JavaScript
let animationId = null;

function renderLoop() {
  drawGrid();
  drawCells();

  universe.tick();

  animationId = requestAnimationFrame(renderLoop);
}
```

任何一个时间，我们可以通过判断 animationId 来判断这个动画是否被暂停。

```JavaScript
function isPaused() {
  return animationId === null;
}
```

现在，当播放暂停键被点击，当正在播放时，暂停动画。并把按钮的状态改为播放。

```JavaScript
const playPauseButton = document.getElementById("play-pause");

function play() {
  playPauseButton.textContent = "⏸";
  renderLoop();
};

function pause() {
  playPauseButton.textContent = "▶";
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener("click", function playBtnListener(event) {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});
```

最后我们把之前的 requestAnimationFrame 函数封装成`play()`。刷新本地服务器，可以看到网页上已经有暂停按钮了。尝试点击一下它吧。

### 修改一个细胞的状态

现在我们能暂停这个游戏了，是时候增加一个修改细胞的功能了。

想控制细胞的生死，需要给`src/lib.rs`下的 Cell 增加一个 toggle 函数。

```Rust
impl Cell {
    fn toggle(&mut self) {
        *self = match *self {
            Cell::Dead => Cell::Alive,
            Cell::Alive => Cell::Dead,
        };
    }
}
```

想要修改在宇宙中的细胞需要获得细胞的行纵值，并转换为细胞的序号。

```Rust
#[wasm_bindgen]
impl Universe {
    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);
        self.cells[idx].toggle();
    }
}
```

这个方法增加第 1 行的属性声明是为了能够在 JavaScript 环境里面直接调用。在 JavaScript 文件中，监听<canvas>标签，将页面上的点击事件转换成画布上的点击事件，并调用 toggle_cell 方法重绘场景。

```Rust
canvas.addEventListener("click", function canvasClickListener(event) {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop/(CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft/(CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawGrid();
  drawCells();
});
```

使用`wasm-pack build`重新编译，刷新网页，并更新细胞状态。

### 练习

- 新建一个<input>标签来处理每帧更新多少个刻。
- 增加一个重置按钮，把宇宙恢复到初始状态；再增加一个消灭按钮，毁灭所有细胞。
- 当使用`Ctrl+Click`的时候，增加一个[glider](<https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life)>)，使用`Shift+Click`增加一个 pulsar。

## 性能日志(Time Profiling)

本节我们将会提高这个游戏的性能，我们将会用 time profiling 来完成。

### Time Profiling

此部分将会讲解如何获得页面的性能分析，目标是提高 JavaScript 和 WebAssembly 之间的吞吐。

> 永远使用`wasm-pack build`编译最新的代码，以确定你的优化正确。

#### windows.performance.now()

这个函数会返回以毫秒为单位的时间戳来计算页面加载速度。

调用`performance.now()`的性能损耗低，所以我们可以利用它创造一个简单的测算工具而不是产生很大误差值。

我们可以通过`web-sys`调用时间函数。

```Rust
extern crate web_sys;

fn now() -> f64 {
  web_sys::window()
    .expect("should have window")
    .performance()
    .expect("should have a Performance")
    .now()
}
```

#### 开发者工具的性能查看器

所有的浏览器的开发者工具都有性能查看器。这个查看器通过火焰图展示函数调用栈来表示哪一个函数耗时更长。

如果你编译的时候打开了调试，则函数名将会显示在这里（如果没打开则显示一个不透明的名字，比如`wasm-function[123]`）。

注意，因为性能查看器不会显示内联函数，又因为 Rust 和 LVVM 很重地依赖于内联函数，其结果就会让人感到头疼。

![性能查看器无法处理内联函数](https://rustwasm.github.io/docs/book/images/game-of-life/profiler-with-rust-names.png)

#### console.time 和 console.timeEnd

这两个函数是浏览器的内置函数。以调用`console.time("foo")`作为开始，以`console.time("foo")`作为结束，参数是可选的。

你可以通过 web-sys 调用`web_sys::console::time_with_label("foo")`和`web_sys::console::time_end_with_label("foo")`。

如下是浏览器的截图。

![使用console.time的截图](https://rustwasm.github.io/docs/book/images/game-of-life/console-time.png)

另外，`console.time`和`console.timeEnd`会调用性能检查器统计出瀑布图。

#### 使用#[bench]调用原生代码

就像我们能使用原生的测试方法`#[test]`来测试代码，我们可以使用`#[bench]`通过操作系统的工具来查看函数性能。

写好标准函数并放到`benches`文件夹下。确保`crate-type`已经引入 rlib，能使测试代码能够链接。

无论如何，先搞明白你知道 WebAssembly 里面的瓶颈之后再花费精力去调查原生的性能调查器！用你的浏览器的性能调查器，或者使用这些时间去优化你的代码不是更好？

### 利用 window.performance.now 创建一个计时器

创建一个 FPS 的计时器用来调查游戏的渲染速度不失为一个好办法。

我们在 JavaScript 增加 fps 对象。

```JavaScript
const fps = new class {
  constructor() {
    this.fps = document.getElementById("fps");
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = 1 / delta * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < this.frames.length; i++) {
      sum += this.frames[i];
      min = Math.min(this.frames[i], min);
      max = Math.max(this.frames[i], max);
    }
    let mean = sum / this.frames.length;

    // Render the statistics.
    this.fps.textContent = `
Frames per Second:
         latest = ${Math.round(fps)}
avg of last 100 = ${Math.round(mean)}
min of last 100 = ${Math.round(min)}
max of last 100 = ${Math.round(max)}
`.trim();
  }
};
```

接下来再每次迭代中调用 fps render 函数。

```JavaScript
const renderLoop = () => {
    fps.render(); //new

    universe.tick();
    drawGrid();
    drawCells();

    animationId = requestAnimationFrame(renderLoop);
};
```

最后在 HTML 中增加 fps 的展示。

```JavaScript
<div id="fps"></div>
```

增加 CSS，让它展示得更好。

```CSS
#fps {
  white-space: pre;
  font-family: monospace;
}
```

好了，现在可以在页面上看到 FPS 计数器了。

### 给每一刻计算时间

每一刻开始调用`console.time`，结束的时候调用`console.timeEnd`。

首先，要在`Cargo.toml`里面增加 web-sys。

```toml
[dependencies.web-sys]
version = "0.3"
features = [
  "console",
]
```

因为每次执行`console.time`后总要执行`console.timeEnd`，把他们包再[RAII](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization)类型下就会更加便利。

```Rust
extern crate web_sys;
use web_sys::console;

pub struct Timer<'a> {
    name: &'a str,
}

impl<'a> Timer<'a> {
    pub fn new(name: &'a str) -> Timer<'a> {
        console::time_with_label(name);
        Timer { name }
    }
}

impl<'a> Drop for Timer<'a> {
    fn drop(&mut self) {
        console::time_end_with_label(self.name);
    }
}
```

接下来，统计每一刻用的时间是多久，只需把初始化 Timer 放到 Universe 的构造函数里。

```Rust
let _timer = Timer::new("Universe::tick");
```

如下是每一刻执行的时间。

![每一刻的执行时间](https://rustwasm.github.io/book/images/game-of-life/console-time.png)

另外，通过使用`console.time`和`console.timeEnd`也能获得执行性能数据。

![性能数据](https://rustwasm.github.io/book/images/game-of-life/console-time-in-profiler.png)

### 增加宇宙大小

> 本部分是拿火狐浏览器做例子，当然还有很多浏览器有类似的功能，只是有细微的差别。这个数据是一致的，但是部分命名和标量可能不一样。

如果我们把宇宙修改的大一些，会发生什么？把 64x64 改成 128x128，结果会把 fps 从 60 降到 40。

如果我们打开性能监控器，并看到它的瀑布图，我们可以看到动画帧用了 20 毫秒，回顾 60fps 时渲染一页则需要 16 毫秒，这不仅仅是 JavaScript 和 WebAssembly，还包括重绘的部分。

![性能监视](https://rustwasm.github.io/book/images/game-of-life/drawCells-before-waterfall.png)

如果仔细查看，可以看到`CanvasRenderingContext2D.fillStyle`的 setter 是很耗费时间的。

> 再火狐，你可能看到的是"DOM"而不是"CanvasRenderingContext2D.fillStyle"，你需要打开"展示 Gecko 平台数据"。

![火狐的性能监视器](https://rustwasm.github.io/book/images/game-of-life/profiler-firefox-show-gecko-platform.png)

当然，这并不稀奇，40%的的时间都浪费在这个 setter 上面。

> 我们可能期望性能瓶颈再 tik 函数上，但并不是。永远选择性能监视器观察，因为你可能浪费很多时间在无关的地方上面。

在 drawCell 上面，fillStyle 在每次动画和每个细胞上面使用。

```JavaScript
for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    const idx = getIndex(row, col);

    ctx.fillStyle = cells[idx] === DEAD
      ? DEAD_COLOR
      : ALIVE_COLOR;

    ctx.fillRect(
      col * (CELL_SIZE + 1) + 1,
      row * (CELL_SIZE + 1) + 1,
      CELL_SIZE,
      CELL_SIZE
    );
  }
}
```

现在我们知道 fillStyle 资源耗费比较多，那么我们该怎么避免他呢？我们需要判断细胞的生命状态来自决定 fillStyle 的值，设想，如果先设定`fillStyle = ALIVE_COLOR`，再绘制所有的活着的细胞，然后设置`fillStyle = DEAD_COLOR`，再设置所有的死细胞，最后我们只设置 fillStyle 两次。

```JavaScript
// Alive cells.
ctx.fillStyle = ALIVE_COLOR;
for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    const idx = getIndex(row, col);
    if (cells[idx] !== Cell.Alive) {
      continue;
    }

    ctx.fillRect(
      col * (CELL_SIZE + 1) + 1,
      row * (CELL_SIZE + 1) + 1,
      CELL_SIZE,
      CELL_SIZE
    );
  }
}

// Dead cells.
ctx.fillStyle = DEAD_COLOR;
for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    const idx = getIndex(row, col);
    if (cells[idx] !== Cell.Dead) {
      continue;
    }

    ctx.fillRect(
      col * (CELL_SIZE + 1) + 1,
      row * (CELL_SIZE + 1) + 1,
      CELL_SIZE,
      CELL_SIZE
    );
  }
}
```

修改之后，刷新页面，此时的 fps 已经上升到 60。

如果重新看原来的数据，现在每一刻只使用 10 毫秒。

![更新后的性能检查](https://rustwasm.github.io/book/images/game-of-life/drawCells-after-waterfall.png)

消除了 fillStyle 的性能瓶颈，发现比较消耗资源的是 fillRect，用来绘制每一个细胞的。

![目前的性能损耗都在fillRect上面](https://rustwasm.github.io/book/images/game-of-life/drawCells-after-flamegraph.png)

### 让时间变快

有些人可能不喜欢等待，更希望一帧跑完九刻而不是一刻。我们可以通过修改 renderLoop 函数实现。

```JavaScript
for (let i = 0; i < 9; i++) {
  universe.tick();
}
```

在机器上，fps 降到了 35，但是我们一定要到 60fps！

现在我们知道性能瓶颈在 tick 函数上面，所以我们给函数的每一步都加上 Timer 监视，我猜测是创建向量和释放向量占用了很多资源造成的。

```Rust
pub fn tick(&mut self) {
    let _timer = Timer::new("Universe::tick");

    let mut next = {
        let _timer = Timer::new("allocate next cells");
        self.cells.clone()
    };

    {
        let _timer = Timer::new("new generation");
        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                let next_cell = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbours
                    // dies, as if caused by underpopulation.
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    // Rule 2: Any live cell with two or three live neighbours
                    // lives on to the next generation.
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    // Rule 3: Any live cell with more than three live
                    // neighbours dies, as if by overpopulation.
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    // Rule 4: Any dead cell with exactly three live neighbours
                    // becomes a live cell, as if by reproduction.
                    (Cell::Dead, 3) => Cell::Alive,
                    // All other cells remain in the same state.
                    (otherwise, _) => otherwise,
                };

                next[idx] = next_cell;
            }
        }
    }

    let _timer = Timer::new("free old cells");
    self.cells = next;
}
```

看这些时间戳，很明显我的猜测是错误的：大部分时间确实用在计算下一代细胞上面，每一刻都调用和释放向量竟然无足轻重。所以一定要使用性能监视器！

![性能监视](https://rustwasm.github.io/book/images/game-of-life/console-time-in-universe-tick.png)

下一部分需要`nightly`编译，因为我们将会使用[test-feature-gate](https://doc.rust-lang.org/unstable-book/library-features/test.html)来跑 benchmark（性能测试）。我们将会安装另一个工具[cargo-benchcmp](https://github.com/BurntSushi/cargo-benchcmp)。一个迷你的有`cargo bench`支持的性能测试工具。

让我们写一个函数使用`#[bench]`属性，我们可以使用更成熟的测试工具测试它。

```Rust
#![feature(test)]

extern crate test;
extern crate wasm_game_of_life;

#[bench]
fn universe_ticks(b: &mut test::Bencher) {
    let mut universe = wasm_game_of_life::Universe::new();

    b.iter(|| {
        universe.tick();
    });
}
```

我们也要注释掉所有`#[wasm_bindgen]`，否则"cdylib"或则其他编译流程会失败，

此时，我们可以跑`cargo bench | tee before.txt`来编译项目查看性能日志了！

```shell
$ cargo bench | tee before.txt
    Finished release [optimized + debuginfo] target(s) in 0.0 secs
     Running target/release/deps/wasm_game_of_life-91574dfbe2b5a124

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

     Running target/release/deps/bench-8474091a05cfa2d9

running 1 test
test universe_ticks ... bench:     664,421 ns/iter (+/- 51,926)

test result: ok. 0 passed; 0 failed; 0 ignored; 1 measured; 0 filtered out
```

他也告诉我们二进制文件的位置，我们可以跑第二次性能测试。但这次可以使用系统的性能测试工具。因为我用的是 Linux，所以 perf 就是我的测试工具。

```shell
$ perf record -g target/release/deps/bench-8474091a05cfa2d9 --bench
running 1 test
test universe_ticks ... bench:     635,061 ns/iter (+/- 38,764)

test result: ok. 0 passed; 0 failed; 0 ignored; 1 measured; 0 filtered out

[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.178 MB perf.data (2349 samples) ]
```

查看性能测试报告，得知所有的时间都如期使用在`Universe::tick`。

![perf的结果](https://rustwasm.github.io/book/images/game-of-life/bench-perf-report.png)

perf 会指明函数中到底是什么操作引起的性能损耗（译者：虽然我也没看出来）。

![perf的结果](https://rustwasm.github.io/book/images/game-of-life/bench-perf-annotate.png)

它告诉我们 26.67%的时间花在总和细胞数目，23.41%的时间花在获取列序号，另外 15.42%花在取得行序号。这三个性能瓶颈中，第二和第三都使用了比较耗费性能的 DIV 命令。这些 DIV 的实现是在`Universe::live_neighbor_count`。

回想这个函数的定义：

```Rust
fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
    let mut count = 0;
    for delta_row in [self.height - 1, 0, 1].iter().cloned() {
        for delta_col in [self.width - 1, 0, 1].iter().cloned() {
            if delta_row == 0 && delta_col == 0 {
                continue;
            }

            let neighbor_row = (row + delta_row) % self.height;
            let neighbor_col = (column + delta_col) % self.width;
            let idx = self.get_index(neighbor_row, neighbor_col);
            count += self.cells[idx] as u8;
        }
    }
    count
}
```

使用取余运算是为了避免使用杂乱的 if 代码来处理边界，但导致我不得不用 DIV 这样比较耗费性能的指令。相反，如果用 if 处理边界，并展开循环，则分支条件将会比较适合 CPU 处理。

```Rust
fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
    let mut count = 0;

    let north = if row == 0 {
        self.height - 1
    } else {
        row - 1
    };

    let south = if row == self.height - 1 {
        0
    } else {
        row + 1
    };

    let west = if column == 0 {
        self.width - 1
    } else {
        column - 1
    };

    let east = if column == self.width - 1 {
        0
    } else {
        column + 1
    };

    let nw = self.get_index(north, west);
    count += self.cells[nw] as u8;

    let n = self.get_index(north, column);
    count += self.cells[n] as u8;

    let ne = self.get_index(north, east);
    count += self.cells[ne] as u8;

    let w = self.get_index(row, west);
    count += self.cells[w] as u8;

    let e = self.get_index(row, east);
    count += self.cells[e] as u8;

    let sw = self.get_index(south, west);
    count += self.cells[sw] as u8;

    let s = self.get_index(south, column);
    count += self.cells[s] as u8;

    let se = self.get_index(south, east);
    count += self.cells[se] as u8;

    count
}
```

接下来再跑一次性能测试，将他输出到`after.txt`。

```shell
$ cargo bench | tee after.txt
   Compiling wasm_game_of_life v0.1.0 (file:///home/fitzgen/wasm_game_of_life)
    Finished release [optimized + debuginfo] target(s) in 0.82 secs
     Running target/release/deps/wasm_game_of_life-91574dfbe2b5a124

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

     Running target/release/deps/bench-8474091a05cfa2d9

running 1 test
test universe_ticks ... bench:      87,258 ns/iter (+/- 14,632)

test result: ok. 0 passed; 0 failed; 0 ignored; 1 measured; 0 filtered out
```

感觉性能提高了不少，现在对比一下前后的数据。

```shell
$ cargo benchcmp before.txt after.txt
 name            before.txt ns/iter  after.txt ns/iter  diff ns/iter   diff %  speedup
 universe_ticks  664,421             87,258                 -577,163  -86.87%   x 7.61
```

哇！提高了 7.61 倍！

WebAssembly 意图和原生系统贴近，但是我们确实需要在 WebAssembly 环境下也作一次测试。

从新编译程序，刷新浏览器页面，画面重新跑在 60fps，每一帧大概是 10 毫秒。

成功！

![测试结果](https://rustwasm.github.io/book/images/game-of-life/waterfall-after-branches-and-unrolling.png)

### 练习

- 现在，下一个性能瓶颈是`Universe::tick`调用和释放函数的部分，尝试缓存细胞状态，让 Universe 维护两个向量，永远不释放他们，也不掉用新的区间。
- 换一种方式实现游戏，让 Rust 和 JavaScript 以细胞的列表交互，这样能让渲染画布更快吗？你能实现这个设计同时不在每个 tick 函数中调用新的列表吗？
- 就性能显示来看 2D 画布渲染显然不够快，使用 WebGL 画布重新渲染，WebGL 能多快？使用 WebGL 能在遇到瓶颈前创建多大的宇宙空间？

## 压缩.wasm 文件大小

rustc 有很多配置项，可以让`.wasm`二进制文件更加小。在很多情况下更小的生成文件意味着更长的编译时间。另外更小的文件使得 WebAssembly 的运行时间更长。我们应该意识到这些方面上的牺牲。在这些情况下，当我们要减少编译文件大小时，我们应该考虑到使用性能监视器衡量一下这种改动是否值得。

### 使用链接配置器编译

在`Cargo.toml`，增加`lto=true`：

```toml
[profile.release]
lto = true
```

者给予 LLVM 更多机会去内联和简化函数，不仅仅会使`.wasm`更小，还会让他在运行时运行得更快！但是会让他编译得更长。

### 配置 LLVM 牺牲速度换文件大小

LLVM 默认配置是为了运行速度，并不是大小。我们可以通过更改`Cargo.toml`去修改这一配置。

```toml
[profile.release]
opt-level = 's'
```

或者，更激进的可以把它改成"z"。

但是，配置为"s"的时候有的时候会比"z"更小，所以一定要做测量！

### 使用 wasm-opt 工具

[Binaryen](https://github.com/WebAssembly/binaryen)是一个关于 WebAssembly 编译工具的集合。他比 LLVM 更加后端，使用`wasm-opt`处理生成文件常常会节省 15%~20%的代码，同时又会提高运行速度。

```
# 输出为压缩的文件大小。
wasm-opt -Os -o output.wasm input.wasm

# 更激进的输出为压缩的文件大小。
wasm-opt -Oz -o output.wasm input.wasm

# 输出文件追求运行速度。
wasm-opt -O -o output.wasm input.wasm

# 输出文件更激进的追求运行速度。
wasm-opt -O3 -o output.wasm input.wasm
```

#### 注意调试信息

占用生成文件大小的主要成分是调试信息和函数名。`wasm-pack`能够默认移除调试信息。然而`wasm-opt`在使用`-g`参数时能删除函数名。

这意味着，如果你按照以上操作，生成文件应该既没有调试信息也没有函数名。如果你想保留某些调试信息，请一定注意这一点。

### 文件大小检查调查

如果修改编译配置不能获得更小的文件大小，就应该调查一下是什么代码导致文件太大。

> 就像做性能测试，我们应让工具来判断哪里出了问题，否则我们会浪费更多自己的时间。

#### twiggy 代码检查器

[twiggy](https://github.com/rustwasm/twiggy)是一个支持 WebAssembly 的代码大小检查器，他能分析二进制代码的调用图，并解决如下问题：

- 为什么这个函数被编译到这段代码中。
- 这个函数占用大小是多少？如果我删除这个函数以及其相关函数我能节省多大的空间？

```
$ twiggy top -n 20 pkg/wasm_game_of_life_bg.wasm
 Shallow Bytes │ Shallow % │ Item
───────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────────────
          9158 ┊    19.65% ┊ "function names" subsection
          3251 ┊     6.98% ┊ dlmalloc::dlmalloc::Dlmalloc::malloc::h632d10c184fef6e8
          2510 ┊     5.39% ┊ <str as core::fmt::Debug>::fmt::he0d87479d1c208ea
          1737 ┊     3.73% ┊ data[0]
          1574 ┊     3.38% ┊ data[3]
          1524 ┊     3.27% ┊ core::fmt::Formatter::pad::h6825605b326ea2c5
          1413 ┊     3.03% ┊ std::panicking::rust_panic_with_hook::h1d3660f2e339513d
          1200 ┊     2.57% ┊ core::fmt::Formatter::pad_integral::h06996c5859a57ced
          1131 ┊     2.43% ┊ core::str::slice_error_fail::h6da90c14857ae01b
          1051 ┊     2.26% ┊ core::fmt::write::h03ff8c7a2f3a9605
           931 ┊     2.00% ┊ data[4]
           864 ┊     1.85% ┊ dlmalloc::dlmalloc::Dlmalloc::free::h27b781e3b06bdb05
           841 ┊     1.80% ┊ <char as core::fmt::Debug>::fmt::h07742d9f4a8c56f2
           813 ┊     1.74% ┊ __rust_realloc
           708 ┊     1.52% ┊ core::slice::memchr::memchr::h6243a1b2885fdb85
           678 ┊     1.45% ┊ <core::fmt::builders::PadAdapter<'a> as core::fmt::Write>::write_str::h96b72fb7457d3062
           631 ┊     1.35% ┊ universe_tick
           631 ┊     1.35% ┊ dlmalloc::dlmalloc::Dlmalloc::dispose_chunk::hae6c5c8634e575b8
           514 ┊     1.10% ┊ std::panicking::default_hook::{{closure}}::hfae0c204085471d5
           503 ┊     1.08% ┊ <&'a T as core::fmt::Debug>::fmt::hba207e4f7abaece6
```

#### 手动修改 LLVM-IR

LLVM-IR 是 LLVM 生成 WebAssembly 代码的最后一步。所以，他和最终生成的 WebAssembly 很像。更多的 LLVM-IR 代码意味着生成的文件越大，当一个函数占用了 LLVM-IR 中 25%的位置，则代表他占用了 25%的文件大小。当然这些数字只是个经验值，因为 LLVM-IR 还有一些 WebAssembly 没有的重要的信息（因为 WebAssembly 没有诸如 DWARF 调试信息）。

你可以使用 cargo 生成 LLVM-IR 代码：

```shell
cargo rustc --release -- --emit llvm-ir
```

接下来你可以使用 find 命令去寻找存储在 cargo 生成目录(target)下的`.ll`文件。

```shell
find target/release -type f -name '*.ll'
```

相关可以参考[LLVM 语言](https://llvm.org/docs/LangRef.html)

#### 更激进的工具

修改编译配置是比较好上手的。如果你想前进一个里程，你可以使用一些更激进的工具，像是重写代码以减少冗余。以下是一些不太优雅的代码，但是的确能减少生成文件大小。

##### 避免字符串格式化

`format!`,`to_string`等，能加入很多冗余代码。如果可能，在调试环境用格式化，而在发布环境使用静态字符串。

##### 避免使用崩溃

这很明显，使用 twiggy 之类的工具或者人工检查 LLVM-IR 能帮助你查出到底哪个函数崩溃。

崩溃并不总是出现在`panic!()`宏，他们会在很多情况下出现。

- 访问切片越界，如：`my_slice[i]`
- 除 0，如：`dividend/divider`
- 解 Option 类型或者 Result 类型，如：`opt.unwrap()`或者`res.unwrap()`

前两个可以被改成第三个，访问切片可以使用`my_slice.get(i)`。除法可以使用`checked_div`，所以你只有一种需要处理的情况。

解开`Option`或者`Result`有两种方法安全的和不安全的。

安全的方式是使用 abort 方法而不是返回 None 和 Error 值。

```Rust
#[inline]
pub fn unwrap_abort<T>(o: Option<T>) -> T {
  use std::process;
  match o {
    Some(t) => t,
    None => process::abort(),
  }
}
```

最终，崩溃在`wasm32-unknown-unknown`被翻译成退出，因此不会造成代码冗余。

相反的，[unreachable](https://crates.io/crates/unreachable)包为 Option 和 Result 类型提供不安全的[unchecked_unwrap](https://docs.rs/unreachable/1.0.0/unreachable/trait.UncheckedOptionExt.html#tymethod.unchecked_unwrap)方法。让 Rust 编译器假定 Option 类型是 Some 类型而 Result 类型是 Ok 类型。如果值是不正确的的情况是未被考虑的。你一定要在 110%确认的情况下使用这个包，因为编译器可没那么聪明能预估出错误。即使你这么做了，你一定要在调试环境下面做检查，而在发布环境下去掉检查。

#### 避免调用内存或者使用 wee_alloc

Rust 的默认调用器是`dlmalloc`的一部分。它能达到 10KB。如果能够避免动态调用，你应该能省下 10KB。

完全避免动态语言调用可能会非常困难。但是删除调用却在某些情况下很简单，在这些情况下，可以使用[`wee_alloc`](https://github.com/rustwasm/wee_alloc)代替全局的调用器可以从 10KB 中节省很多。`we_alloc`是当你想要一些调用器时的一个选择，并能同时减少代码大小。

#### 使用 trait 来替代泛型

当你创建一些泛型函数。

```Rust
fn whatever<T: MyTrait>(t: T) { ... }
```

`rustc`和 LLVM 会为不同类型生成新的函数拷贝。这为编译器提供了各种类型使用这个函数的机会。但会增加代码大小。

如果你为对象提供 trait，如下：

```Rust
fn whatever(t: Box<MyTrait>) { ... }
// or
fn whatever(t: &MyTrait) { ... }
// etc...
```

这样经过虚调用动态派遣（dynamic dispatch）的方法就被使用了，如此只会用一个函数会放在`.wasm`。这样的缺点是丢失了编译器自定义的机会，并且增加了不直接的，动态的语言调用。

#### 使用 wasm-snip 工具

[`wasm-snip`](https://github.com/fitzgen/wasm-snip)使用`unreachable`方法代替了 WebAssembly 的函数。这是一个又沉又钝的锤子，更像是徒手。

也许你知道有些函数可能永远不会在运行时被调用，但是编译器不能保证？掐了他！执行`wasm-opt`加上`--dce`参数，所有无关函数就会被剪掉。

这个工具对删除崩溃及其有用。

### 我们能把生命游戏缩到多小？

默认的配置下，WebAssembly 二进制大小为 29410 字节。

```shell
$ wc -c pkg/wasm_game_of_life_bg.wasm
29410 pkg/wasm_game_of_life_bg.wasm
```

打开 LTO 之后设置`opt-level="z"`执行`wasm-opt -Oz`，结果是 17317 字节。

```shell
$ wc -c pkg/wasm_game_of_life_bg.wasm
17317 pkg/wasm_game_of_life_bg.wasm
```

如果使用 gzip 压缩，你能搞到 9045 字节！

```shell
$ gzip -9 < pkg/wasm_game_of_life_bg.wasm | wc -c
9045
```

### 练习

- 使用`wasm-snp`工具删掉会有崩溃的函数，它能减少多少字节？
- 使用`wee_alloc`作为全局调用器，，修改`Cargo.toml`：

```
[features]
default = ["wee_alloc"]
```

能够减少多少大小呢？

- 我们只实现了一个 Universe，所以相比使用构造器，我们可以导出一个`static mut`实例，如果这个实例使用的是双向缓存，我们也可以让这些缓存也是全局`staic mut`。这样就移除了所有的动态调用，我们可以增加`#![no_std]`包取消掉调用器。这回能缩小多少大小？

## 发布到 NPM

首先，确保你登入了 npm。

接着，使用`wasm-pack login`登入。

### 发布

确保已经执行`wasm-pack build`并且 pkg 文件已经编译好。

已经准备好之后，跑`wasm-pack publish`上传包到 npm。

这样就发布了！

有哥们照着这个指导做完发布失败，是因为"name"字段存在重名

```toml
[package]
name = "wasm-game-of-life-my-username"
```

接着，重新编译并发布

```shell
wasm-pack build
wasm-pack publish
```

这会应该能行。

## 与 JavaScript 相互交互

### JavaScript 函数的输出和引用

#### 在 Rust 一边

在 JavaScript 为主的世界里使用 WebAssembly，引入和输出函数比较直接，有点类似于 C。

WebAssembly 模块声明了一系列引入，每一个都有模块名。模块名可以使用`#[link(wasm_import_module)]`提供给`extern {...}`。

导出的 WebAssembly 线性内存被导出作"memory"。

```Rust
// import a JS function called `foo` from the module `mod`
#[link(wasm_import_module = "mod")]
extern { fn foo(); }

// export a Rust function called `bar`
#[no_mangle]
pub extern fn bar() { /* ... */ }
```

因为 WebAssembly 的值类型有局限，这些函数只有基础的数字类型。

#### 在 JavaScript 一边

在 JavaScript 中，wasm 二进制文件转换成 ES6 模块。它必须被实例化为线性内存并由一系列函数能对应到这些引入。细节描述可在[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming)找到。

ES6 的模块包括从 Rust 暴露给 JavaScript 的函数，现在可以用 JavaScript 调用。

[这里](https://www.hellorust.com/demos/add/index.html)有一个很简单的构建流程。

### 除了数字

当在 JavaScript 中使用 WebAssembly，WebAssembly 的内存和 JavaScript 的内存有很大的不同。

- 每个 WebAssembly 模块的线性内存，JavaScript 可以自由访问。
- 对应之下，WebAssembly 不能访问 JavaScript 的内存。

所以，有两种复杂的交互。

- 复制二进制数据到 WebAssembly 内存。
- 建立一个在 JavaScript 上的堆内存，提供一堆地址。这样 WebAssembly 访问 JavaScript 对象，间接通过 JavaScript 访问。

幸运的是，通过`bindgen`框架[`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen)可以帮助交互。这个框架可以将已习惯的 Rust 语言自动翻译到 JavaScript。

### 自定义部分（译者：所以这个到底是干什么用的？）

自定义部分允许随意继承人一的数据进入 WebAssembly 模块，这个数据是在编译时设置，不能在运行时修改。

在 Rust 中，自定义部分是通过`#[link_section]`属性暴露的静态数组([T; size])。

```Rust
#[link_section = "hello"]
pub static SECTION: [u8; 24] = *b"This is a custom section";
```

这样给 wasm 增加一个 hello 部分，这个 SECTION 变量是随意的，但是无论怎么赋值，内容总是这些文字。

这个自定义内容可以被 JavaScript 通过[`WebAssembly.Module.customSections`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module/customSections)获得自定义部分，它返回一个`ArrayBuffer`，如果有同名的部分，他们会被放到一个数组中。

```JavaScript
WebAssembly.compileStreaming(fetch("sections.wasm"))
.then(mod => {
  const sections = WebAssembly.Module.customSections(mod, "hello");

  const decoder = new TextDecoder();
  const text = decoder.decode(sections[0]);

  console.log(text); // -> "This is a custom section"
});
```

## 哪些包能在 WebAssembly 下面使用

最简单的就是列出 WebAssembly 上能用的 Rust 包：如果避开了以下内容，则这些包可以在 WebAssembly 使用。如果一个包支持`#![no_std]`
的包，这个包也可能支持 WebAssembly。

### 以下包不能使用

#### C 和系统级依赖

WebAssembly 不提供系统一级别的库，所以任何链接系统库的地方都无法成功。

使用 C 库可能不会成功，既然没有稳定的交叉编译 ABI，和提供给 WebAssembly 交叉链接的连接库。虽然 clang 已经发布 wasm32 的生成，但是还远远不足。

#### 文件 I/O

WebAssembly 没有访问文件系统的功能，所以访问文件系统的库都不能使用。

#### 调用线程

目前有计划[加入线程](https://rustwasm.github.io/2018/10/24/multithreading-rust-and-wasm.html)，但是还没被发布。尝试调用线程会导致崩溃。

### 有哪些目的的包能在 WebAssembly 下面使用

如果只是提供[算法](https://crates.io/categories/algorithms)和[数据结构](https://crates.io/categories/data-structures)的包。

#### #![no-std]

[不依赖于标准库的包](https://crates.io/categories/no-std)能够运行在 WebAssembly 下面。

#### 解析器

只要是接受输入且无需文件操作的[解析器](https://crates.io/categories/parser-implementations)就可能运行在 WebAssembly 下。

#### 文字处理

[复杂的语言处理](https://crates.io/categories/text-processing)可能会运行在 WebAssembly 下面。

#### Rust 范式

[适用于不同情况下的包](https://crates.io/categories/rust-patterns)可能运行在 WebAssembly 下。

## 如何给常用库增加 WebAssembly 支持

本部分讲解如何将常用库增加 WebAssembly 支持。后面的内容我就捡感兴趣的写了。

### 在 CI 增加 wasm32-unknown-unknown

保证 CI 中增加如下命令

```shell
rustup target add wasm32-unknown-unknown
cargo check --target wasm32-unknown-unknown
```

举个例子，在 travis 的配置中增加如下配置：

```yaml
matrix:
  include:
    - language: rust
      rust: stable
      name: "check wasm32 support"
      install: rustup target add wasm32-unknown-unknown
      script: cargo check --target wasm32-unknown-unknown
```

### 在 node.js 或者无头浏览器（译者：卧槽是这么翻译么）

你可以使用`wasm-bindgen-test`和`wasm-pack test`去跑测试，详细内容上面已经提到。

## 发布 WebAssembly 到线上

> 发布过程几乎和任何 web 应用发布是一样的。

为了发布 Web 应用，复制生成文件到线上环境，配置你的 HTTP 服务器让他们可访问。

### 保证服务器支持 application/wasm

为了让浏览器加载变快，[WebAssembly.instantiateStreaming](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming)函数会使用管道传输文件（请确定你的打包器能够使用这个函数）。但是 instantiateStreaming 需要 HTTP 返回类型支持`application/wasm`，否则会丢出错误。

- [如何配置 Apache 服务器](https://httpd.apache.org/docs/2.4/mod/mod_mime.html#addtype)
- [如何配置 Nginx 服务器](https://nginx.org/en/docs/http/ngx_http_core_module.html#types)

### 更多内容

- [webpack 线上打包的最佳实践](https://webpack.js.org/guides/production/)
