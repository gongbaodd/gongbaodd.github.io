---
type: post
category: fe
---
# 使用rust和webassembly开发game of life

这是一篇翻译，[原文](https://github.com/rustwasm/book.git)，这可能是第一篇系统讲解rustwasm的文章了。

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

`wasm-pack`是一站式的建造测试以及发布rust相关的wasm应用工具。

```shell
cargo install wasm-pack
```

### cargo-generate

`cargo-generate`帮助你使用现存的Git仓库作为模板新建Rust项目。

```shell
cargo install cargo-generate
```

### NPM

`npm`是JavaScript的包装管理器。我们将利用它，去安装和运行JavaScript的打包和测试部署。我们将把我们编译好的`.wasm`文件放到npm的包中。

如果你已经安装了NPM可以执行以下命令，安装最新版。

```shell
npm install npm@latest -g
```

## 你好，世界

通过本部分可以创建一个Rust+WASM页面，并能在页面弹窗展示`"Hello, World!"`。

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

`Cargo.toml`文件描述`cargo`的依赖和源文件，Rust的包管理工具和编译工具。这个包括`wasm-bindgen`依赖，我们会稍后了解其他的依赖，还有一些用来初始化`.wasm`的`crate-type`库。

#### wasm-game-of-life/src/lib.rs

`src/lib`文件放在Rust项目的更目录下面。它使用`wasm-bindgen`去和JavaScript链接。它能引入`window.alert`这个JavaScript函数，并暴露`greet`函数，并弹出弹框。

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

`src/utils`模块为编译Rust到WASM提供工具函数，我们后面会在调试时提到它，现在先忽略。

### 编译项目

使用`wasm-pack`依赖以下工具：

+ 保证Rust版本在1.30以上，且已经通过`rustup`安装`wasm32-unknown-unknown`工具链。
+ 使用`cargo`编译Rust到WASM。
+ 使用`wasm-bindgen`去生成JavaScript的API。

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

`.wasm`文件是Rust工具链使用Rust源代码生成的WASM的二进制文件，它包括全部的函数和数据，比方说，爆露出来的`greet`函数。

#### wasm-game-of-life/pkg/wasm_game_of_life.js

这个`.js`文件是`wasm-bindgen`引入DOM和JavaScript方法到Rust中，并油耗地暴露WASM的API到JavaScript中。举个例子，这里个`greet`函数包裹了WASM中的`greet`函数，目前，这个粘合还没做任何功能，当我们逐渐从WASM和JavaScript中传输数据，他会提供帮助。

```javascript
import * as wasm from "./wasm_game_of_life_bg";

export function greet() {
    return wasm.greet();
}
```

#### wasm-game-of-life/pkg/wasm_game_of_life.d.ts

这个`.d.ts`是TypeScript链接JavaScript的文件。如果你的项目中使用了TypeScript，你可以让你的WebAssembly项目被类型检查，并且你的IDE会提供代码提醒和自动完成功能。

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

想要`wasm-game-of-life`能够展示到页面中，需要使用[`create-wasm-app` JavaScript模板](https://github.com/rustwasm/create-wasm-app)。

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

这个文件包括已经配置好的`webpack`和`webpack-dev-server`依赖，和`hello-wasm-pack`，版本号为已经发布到NPM上面的版本号。

#### wasm-game-of-life/www/webpack.conf.js

这个是用来配置webpack和开发服务器的文件。该文件已经提前布置好，如果只是开发则无需过多关心这个文件。

#### wasm-game-of-life/www/index.html

这是页面的HTML文件，它是来调用`bootstrap.js`的。

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

这是JavaScript的入口文件，他引入了`hello-wasm-pack`，并带哦用了greet函数。

```JavaScript
import * as wasm from "hello-wasm-pack";

wasm.greet();
```

#### 安装NPM依赖

首先保证已经在`www`文件夹下面执行过`npm i`，这个命令会安装好现有依赖包括webpack和开发服务器。

> 注意webpack并不是必须的，他只是个打包器并提供了开发服务器，这是我们选择它的原因。Parcel和Rollup一样支持WebAssembly模块。你也可以选择[不使用打包器](https://rustwasm.github.io/docs/wasm-bindgen/examples/without-a-bundler.html)。

#### 在www文件夹中使用本地wasm-game-of-life包

相比于使用NPM线上的`hello-wasm-pack`，使用本地文件会提高我们的开发舒适度。

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

接下来修改`www/index.js`引入greet函数。

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

接下来，打开一个新终端来在后台运行服务器，请在`www`文件夹下执行如下命令。

```shell
npm run start
```

打开http://localhost:8080，应当会弹出如下弹窗。

![弹窗](https://rustwasm.github.io/book/images/game-of-life/hello-world.png)


### 练习

修改greet函数，引入参数`name: &str`，重新执行`wasm-pack build`，并刷新页面使得弹窗中能够显示"Hello, {name}"。

***答案，不许看！***

修改`src/lib.rs`

```Rust
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

再修改JavaScript绑定`www/index.js`

```JavaScript
wasm.greet("Your name");
```

## Conway的生命游戏的游戏规则

如果你已经了解[Conway的生命游戏](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)，可以跳过这部分。

整个Conway的生命游戏是在一个无限的二维的正交格子宇宙中，每一个细胞拥有两种生命状态，生或者死。或者说可增殖或者不可增殖。每一个细胞都和它的8个邻居交互，它们分别是纵向的，斜向的，横向的相邻。并且每一步都会发生如下的变化。

1. 任何一个活着的细胞，如果有少于两个邻居就会死亡。
2. 任何一个活细胞拥有两个或三个活着的邻居，则会继续增殖。
3. 任何一个活着的细胞拥有三个以上活着的的邻居，则会死亡。
4. 任何一个死掉的细胞，如果有三个活着的邻居，则会重生。

最初的图案组成了最初的世界。第1代是按照以上的规则生成的，每一个细胞的生成和死亡都是同时的。他们的生存和死亡这一个时间我们称之为一刻。用程序的语言来说，这一刻是上一次生成的纯函数。这个规则一直有效。

考虑设置如下的初始宇宙：

![初始宇宙](https://rustwasm.github.io/book/images/game-of-life/initial-universe.png)

我们可以通过考虑每一个细胞来确定下一代。最左上角的细胞已经死亡，第4条规则是唯一一个能够处理死亡细胞的规则。所以第1排的所有细胞都有相同的规则。他们都没有三个活着的邻居。只能保持死亡。

当我们看到最上面的活着的细胞时，这个游戏开始变得有趣了。在第2排第3列。对于活着细胞前三个规则都可以应用。对于这一个细胞，他只有一个活着的邻居，所以规则一可用。这个细胞会在下一次争执死亡。下面那几个活着的细胞也是有一样的命运。

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

***答案，不许看！***

![下一刻宇宙](https://rustwasm.github.io/book/images/game-of-life/initial-universe.png)

你能找到一个稳定的没有变化的宇宙吗？

***答案，不许看！***

这个答案，不许看！其实有无数个，最平凡的答案，不许看！就是它是一个空宇宙。如果是一个2×2的方格，也可以形成一个稳定的宇宙。

## 实现Conway的生命游戏

### 设计

在开始之前呢，我们要先考虑以下几种设计模式。

#### 无限宇宙

生命游戏是在一个无限宇宙中玩的。但是我们没有无限的内存和计算能力。在这种情况下，我们往往会有三个选项。

1. 始终追踪这个宇宙的发展，并适当的扩展宇宙。这个扩张是无限的，所以这个实现实现了就会逐渐逐渐的变得越来越慢，直到把内存全部用完。
2. 创建一个固定的宇宙，当细胞碰到宇宙的边缘的时候，将会有更少的邻居。更简单的策略就是当他们已经达到边缘的时候，直接被宇宙剪掉。
3. 创建一个固定的宇宙，当细胞达到边缘的时候，将会从另外一边滑入这样，我的我们的应用就可以一直跑下去。

我们会按照第3个选项来实现。

#### 连接Rust和JavaScript

> 此部分是本人最重要的一节。

JavaScript的垃圾回收堆内存，是用来调用Object和Array还有DOM结点的。而Rust存在的WebAssembly线性内存和它是截然不同的。WebAssembly目前还不能直接操作垃圾回收堆内存（在2018年4月，一个关于[接口类型（Interface Type）](https://github.com/WebAssembly/interface-types/blob/master/proposals/interface-types/Explainer.md)的提案将会改变这一局面）。JavaScript却可以读写WebAssembly的线性内存，但仅限于ArrayBuffe支持的标量（u8, i32, f64等等）。WebAssembly行数一样能处理和返回这些标量。以下讲解WebAssembly和JavaScript如何链接。

wasm_bindgen定义了如何穿过这段链接计算数据结构的方法。它包括装箱Rust结构，并包装指针成为一个JavaScript类以供使用，或者提供JavaScript对象给Rust使用。wasm_bindgen非常便利，但并不是无需考虑怎样在这个链接上传输数据结构。你应该把它当作一个实现接口的工具。

当设计WebAssembly和JavaScript的接口时，我们需要考虑到以下内容。

1. **减少复制到和移出WebAssembly线性内存中的值**，无效的复制会造成无用的性能损耗。
2. **最小的序列化和解序列化**，和复制类似，序列化和解序列化一样造成性能损耗，如果想要把数据无副作用地从一端传到另一端，与其说在一端序列化，到另一端解序列化，不如使用wasm_bindgen帮助我们将JavaScript的Object装箱成Rust的structure。

一个结论，处理JavaScript和WebAssembly接口设计时，经常将大的、生命周期长的数据结构作为Rust类型，存储在WebAssembly线性内存中，并给JavaScript暴露一个处理方法，JavaScript调用WebAssembly转换文件，处理运算，并最终得到一个小的，可复制的结果。通过只返回计算结果，我们可以躲过复制和序列化数据的过程。

#### 在生命游戏中链接Rust和JavaScript

接下来结局几个要规避的问题。我们不想每刻都复制整个宇宙到WebAssembly的内存中，我们不想处理宇宙中所有的细胞，也不想在每次读写细胞的时候都穿过WebAssembly和JavaScript的分界。

这是我们的4x4宇宙在内存中的结构。

![4x4宇宙在内存中的结构](https://rustwasm.github.io/docs/book/images/game-of-life/universe.png)

为了寻找细胞在内存中的位置，我们可以使用下面的公式。

```
index(row, column, universe) = row * width(universe) + column
```

我们有很多方法来给JavaScript暴露宇宙中的细胞。开始我们要为宇宙实现一个`std::fmt::Display`。我们可以使用一个Rust的String，每个字符代表一个细胞。这个Rust的string将会从WebAssembly的内存中复制到JavaScript的内存里，并接下来作为textContent展示到HTML里面。本节的后面，将会讲到如何把细胞展示到canvas中。

> 另一种设计是让Rust返回每个细胞的生存状态列表，这样JavaScript就不需要在渲染时解析整个宇宙，这不过这个是先更加复杂些。

#### Rust的实现

上一章，我们复制了初始化模板，我们现在要修改这个模板。

从删除greet函数，并定义宇宙中的细胞开始。

```Rust
#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}
```

`#[repr(u8)]`很重要，这样每个细胞都会以一个字节存储，另外Alive为1，Dead为0也很重要，这样我们就可以使用加法计算邻居数目。

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

这个函数使用取余处理边界问题。现在我们已经有所有的必须函数了，最后只需要生成下一刻的状态即可（记住，每个函数必须在`#[wasm_bindgen]`属性之下，这样JavaScript才能接到暴露的函数）。

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

目前为止，一个宇宙的状态就都被存储在cell这个向量里面了。为了提高它的可读性，让我们实现一个文本渲染器，目的是将整个宇宙按行输出为文字，每一个活着的细胞标注为Unicode符号“■”，死掉的细胞则为“□”。

通过实现Rust标准库中的`Display`trait，我们可以将数据结构以一种用户交互方式输出，它也提供了一个`to_string`方法。

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

以上，Rust部分已经完工。

#### 使用JavaScript渲染

首先在HTML中插入<pre>标签用来展示整个宇宙。

```html
<body>
  <pre id="game-of-life-canvas"></pre>
  <script src="./bootstrap.js"></script>
</body>
```

另外我们希望<pre>标签能处于页面中央。我们可以通过CSS flex box实现这个任务，在html中增加<style>标签。

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

修改JavaScript入口文件，将原来引入的greet函数改为Universe。

```JavaScript
import { Universe } from "wasm-game-of-life";
```

让我们在那个<pre>标签中增加新的宇宙实例吧。

```JavaScript
const pre = document.getElementById("game-of-life-canvas");
const universe = Universe.new();
```

使用JavaScript创建一个requestAnimationFrame循环，每一次循环，就在<pre>标签中绘制一遍宇宙，并执行一次`Universe::tick`。

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

#### 渲染到Canvas上

在Rust中生成字符串并通过wasm-bindgen拷贝到JavaScript中做了很多无关的复制。既然JavaScript已经知道宇宙的长度和宽度，而且JavaScript本来可以直接读WebAssembly的内存，我们将要修改render方法，直接返回细胞向量的指针。

同时，与其渲染Unicode字符，不如开始用Canvas API。接下来我们会开始设计这些。

在html中，修改<pre>为<canvas>。

```html
<body>
  <canvas id="game-of-life-canvas"></canvas>
  <script src="./bootstrap.js"></script>
</body>
```

为了能拿到Rust中的相关数据结构，我们需要为宇宙增加getter函数，暴露宇宙的宽度、高度和细胞的向量。增加如下函数。

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

接下来，在JavaScript中，引入Cell，并设置几个渲染画布的常量。

```JavaScript
import { Universe, Cell } from "wasm-game-of-life";

const CELL_SIZE = 5;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const LIVE_COLOR = "#000000";
```

接下来修改实现canvas的部分。

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

我们可以直接访问WebAssembly的内存，他是直接定义在`wasm_game_of_life_bg`。为了画细胞，我们先找到一个细胞的指针，并将它们转换成Unit8Array，迭代这些细胞，并按照他们的生命状态绘制白色和黑色方块。计量避免复制所有细胞。

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

注意drawGrid和drawCell必须要在requestAnimationFrame之前执行。

#### 成功了！

重建WebAssembly绑定。

```shell
wasm-pack build
```

确定开发服务器还在运行，如果不是，需要执行以下命令。

```shell
npm run start
```

刷新`http://localhost:8080/`，你应该能看到如下结果。

![页面](https://rustwasm.github.io/docs/book/images/game-of-life/initial-game-of-life.png)

结束之前，这里还有一个不错的实现生命游戏的算法，[hashlife](https://en.wikipedia.org/wiki/Hashlife)。它使用缓存，使得程序有指数级性能提升！但是为什么我们不实现它呢？它已经超出本文涉及的范围了，本文只是专注于Rust和WebAssembly集成，但是我们强烈期望你能实现这一算法。

### 练习

#### 实现一台宇宙飞船

#### 生成一个随机的初始环境，每个细胞有50%的生存可能

***答案，不许看！***

先增加js-sys依赖

```toml
[dependencies]
js-sys="0.3"
```

接下来使用js的随机函数

```Rust
extern crate js_sys;

if js_sys::Math::random() < 0.5 {

} else {

}
```

#### 以bit形式存储每个cell

***答案，不许看！***

在Rust中，使用fixedbitset代替`Vec<Cell>`;

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

使用FixedBitSet的set方法更新宇宙的下一刻。

```Rust
next.set(idx, match (cell, live_neighbors) {
  (true, x) if x<2 => false,
  (true, 2) | (true, 3) => true,
  (true, x) if x>3 => false,
  (false, 3) => true,
  (otherwise, _) => otherwise
});
```

传输指针的时候，需要返回slice。

```Rust
#[wasm_bindgen]
impl Universe {
  pub fn cells(&self) -> *const u32 {
    self.cells.as_slice().as_ptr()
  }
}
```

在JavaScript中，构造Unit8Array的时候需要除以8，以为我们是以bit存储细胞的。

```JavaScript
const cells = new Unit8Array(
  memory.buffer,
  cellsPtr,
  width*height/8
);
```

通过判断Unit8Array是否被赋值而判断细胞是否是活着的。

```JavaScript
function bitIsSet(n, arr) {
  const byte = Math.floor(n/8);
  const mask = 1<<(n%8);
  return (arr[byte] & mask) == mask;
}
```

根据以上变化，新版本的drawCells如下。

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

现在我们已经实现了Rust的实现，并成功渲染在浏览器中。现在来谈谈测试WebAssembly中的Rust函数。

我们将要测试tick函数，确保它能返回正确的值。

接下来，我们将处理Universe的setter函数，让我们能构造不同大小的universe。

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

我们将会创建另一个不需要`#[wasm_bindgen]`的`impl Universe`实现，因为我们不能把所有的WebAssembly函数暴露给JavaScript，Rust生成的WebAssembly函数是不能返回引用的。可以尝试让Rust返回一个引用，查看一下编译结果中是什么错误。

接下来我们要写一个get_cells来获得细胞，和一个set_cells来设置哪些细胞是活的，哪些是死的。

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

在`test/web.rs`中，我们需要到处Universe类型。

```Rust
extern crate wasm_game_of_life;
use wasm_game_of_life:Universe;
```

在测试文件中，我们要创建一个飞船构造函数。

我们要构造一个tick函数执行之前的飞船，和一个tick函数执行后的期望值。

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

现在我们写一个test_tick函数，创建以上的两个飞船。最后使用`assert_eq!`宏比较expected_ship来确保tick函数运行正确。我们添加`#[wasm_bindgen_test]`属性保证这个函数可以在WebAssembly环境下测试。

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

写这么多代码之前（虽然上面都写完了，我也不知道原作者抽什么风），先看一看Rust的调试工具。

### 调试工具

此部分将会介绍WebAssembly的调试工具。

#### 使用debug标记编译

如果没有打开debug标记，"name"这个部分就不会被编译到二进制程序中，错误栈也不会显示函数名，你会收到`wasm-functions[42]`而不是`wasm_game_of_file::Universe::live_neighbor_count`。

调试编译，`wasm-pack build --debug`或者`cargo build`总是会默认打开debug标记。

版本编译（release build），debug标记是默认关闭的，要打开debug标记，需要声明`debug=true`。

```toml
[profile.release]
debug = true
```

#### 使用console API打印日志

打印日志是最好的判断程序是否是有错的方式。在浏览器中，`console.log`函数可以将日志打印到浏览器的dev工具里。

我们可以使用web-sys包去调用console API。

```Rust
extern crate web_sys;

web_sys::console::log_1(&"Hello, world!".into());
```

相应的`console.error`函数用法一致，但是浏览器的调用栈还是按照`console.error`来打印。

使用`console.log`：

* [`web_sys::console::log`，接受一个向量的数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log.html)。
* [`web_sys::console::log_1`，接受一个数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log_1.html)。
* [`web_sys::console::log_2`，接受两个数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.log_2.html)。
* ...

使用`console.error`：

* [`web_sys::console::error`，接受一个向量的数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error.html)。
* [`web_sys::console::error_1`，接受一个数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error_1.html)。
* [`web_sys::console::error_2`，接受两个数据做参数](https://rustwasm.github.io/wasm-bindgen/api/web_sys/console/fn.error_2.html)。
* ...


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

不幸的，WebAssembly的调试器依然不成熟，在很多unix系统中，DWARF是用来解析调试程序需要的数据的工具。虽然，Windows上面也有一个类似的工具。但还没有相当的工具提供给WebAssembly。所以，调试器目前能给予的功能有限，我们只能收到WebAssembly的错误而不是Rust源代码的错误。

> 这里有一个故事是[跟踪WebAssembly的调试](https://github.com/WebAssembly/debugging)的，我们希望它将来会有所改善！

尽管如此，调试器还是能够给调试JavaScript方面提供效力。

#### 一开始就规避在WebAssembly上面使用调试

如果错误和交互JavaScript和Web API有关，则使用`wasm-bindgen-test`写测试。

如果和JavaScript和Web API无关，这是用默认的`#[test]`属性。使用[`quickcheck`包](https://crates.io/crates/quickcheck)可以减少写测试上面的时间。

为了避免`#[test]`编译器出现连接错误，你需要一个rlib依赖，在`Cargo.toml`文件按照如下修改。

```toml
[lib]
crate-type ["cdylib", "rlib"]
```

### 在生命游戏中打开崩溃日志

如果程序崩溃，最好是能够在审查工具中看到日志。

在```src/utils.rs``里面有一个可选的console_error_panic_hook包，可以在Universe初始化的时候调用它。

```Rust
pub fn new() -> Universe {
  utils::set_panic_hook();
}
```

### 为生命游戏增加日志

让我们在Rust中利用web-sys调用console，打印出每一刻的细胞状态。

首先在以来中增加web-sys，修改Cargo.toml。

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

现在可以通过调用log发送日志了。

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

浏览器的调试器在调试JavaScript和Rust生成的WebAssembly很有效。

举个例子，在renderLoop函数中增加`debugger;`可以暂停页面执行的某一刻。

者给予我们查看每一刻细胞状态的能力。

![调试画面](https://rustwasm.github.io/docs/book/images/game-of-life/debugging.png)

### 练习

1. 给tick方法增加log，查看细胞状态。
2. 加入`panic!()`查看打印出来的崩溃日志。

## 增加交互

接下来我们要给这个游戏增加一些交互，我们会允许用户选择细胞的生死，并且允许暂停游戏，并使绘制初始图案更加简单。

### 暂停和继续游戏 

首先修改html，在画布上面增加一个<button>标签。

```html
<button id="play-pause"></button>
```

在JavaScript中，我们要做以下几点改动。

+ 追踪调用requestAnimationFrame的标识符，这样我们就能通过调用cancelAnimationFrame来终止动画。
+ 当点击播放或者暂停键的时候，先检查标识符是否存在，一旦存在，则表示动画正在运行，我们需要取消动画以保证renderLoop不再被调用。如果标识符不存在，我们需要调用requestAnimationFrame以保证动画继续运行。

因为是JavaScript控制着Rust和WebAssembly，我们不需要修改Rust部分。

我们引入animationId变量，保存requestAnimationFrame的结果。当没有排队的动画时，这个变量值为null。

```JavaScript
let animationId = null;

function renderLoop() {
  drawGrid();
  drawCells();

  universe.tick();

  animationId = requestAnimationFrame(renderLoop);
}
```

任何一个时间，我们可以通过判断animationId来判断这个动画是否被暂停。

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

最后我们把之前的requestAnimationFrame函数封装成`play()`。刷新本地服务器，可以看到网页上已经有暂停按钮了。尝试点击一下它吧。

### 修改一个细胞的状态

现在我们能暂停这个游戏了，是时候增加一个修改细胞的功能了。

想控制细胞的生死，需要给`src/lib.rs`下的Cell增加一个toggle函数。

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

这个方法增加第1行的属性声明是为了能够在JavaScript环境里面直接调用。在JavaScript文件中，监听<canvas>标签，将页面上的点击事件转换成画布上的点击事件，并调用toggle_cell方法重绘场景。

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

+ 新建一个<input>标签来处理每帧更新多少个刻。
+ 增加一个重置按钮，把宇宙恢复到初始状态；再增加一个消灭按钮，毁灭所有细胞。
+ 当使用`Ctrl+Click`的时候，增加一个[glider](https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life))，使用`Shift+Click`增加一个pulsar。

## 性能日志(Time Profiling)

本节我们将会提高这个游戏的性能，我们将会用time profiling来完成。

### Time Profiling

此部分将会讲解如何获得页面的性能分析，目标是提高JavaScript和WebAssembly之间的吞吐。

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

注意，因为性能查看器不会显示内联函数，又因为Rust和LVVM很重地依赖于内联函数，其结果就会让人感到头疼。

![性能查看器无法处理内联函数](https://rustwasm.github.io/docs/book/images/game-of-life/profiler-with-rust-names.png)


#### console.time和console.timeEnd

这两个函数是浏览器的内置函数。以调用`console.time("foo")`作为开始，以`console.time("foo")`作为结束，参数是可选的。

你可以通过web-sys调用`web_sys::console::time_with_label("foo")`和`web_sys::console::time_end_with_label("foo")`。

如下是浏览器的截图。

![使用console.time的截图](https://rustwasm.github.io/docs/book/images/game-of-life/console-time.png)

另外，`console.time`和`console.timeEnd`会调用性能检查器统计出瀑布图。

#### 使用#[bench]调用原生代码

就像我们能使用原生的测试方法`#[test]`来测试代码，我们可以使用`#[bench]`通过操作系统的工具来查看函数性能。

写好标准函数并放到`benches`文件夹下。确保`crate-type`已经引入rlib，能使测试代码能够链接。

无论如何，先搞明白你知道WebAssembly里面的瓶颈之后再花费精力去调查原生的性能调查器！用你的浏览器的性能调查器，或者使用这些时间去优化你的代码不是更好？

### 利用window.performance.now创建一个计时器

创建一个FPS的计时器用来调查游戏的渲染速度不失为一个好办法。

我们在JavaScript增加fps对象。

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

接下来再每次迭代中调用fps render函数。

```JavaScript
const renderLoop = () => {
    fps.render(); //new

    universe.tick();
    drawGrid();
    drawCells();

    animationId = requestAnimationFrame(renderLoop);
};
```

最后在HTML中增加fps的展示。

```JavaScript
<div id="fps"></div>
```

增加CSS，让它展示得更好。

```CSS
#fps {
  white-space: pre;
  font-family: monospace;
}
```

好了，现在可以在页面上看到FPS计数器了。

### 给每一刻计算时间

每一刻开始调用`console.time`，结束的时候调用`console.timeEnd`。

首先，要在`Cargo.toml`里面增加web-sys。

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

接下来，统计每一刻用的时间是多久，只需把初始化Timer放到Universe的构造函数里。

```Rust
let _timer = Timer::new("Universe::tick");
```

如下是每一刻执行的时间。

![每一刻的执行时间](https://rustwasm.github.io/book/images/game-of-life/console-time.png)

另外，通过使用`console.time`和`console.timeEnd`也能获得执行性能数据。

![性能数据](https://rustwasm.github.io/book/images/game-of-life/console-time-in-profiler.png)

### 增加宇宙大小

> 本部分是拿火狐浏览器做例子，当然还有很多浏览器有类似的功能，只是有细微的差别。这个数据是一致的，但是部分命名和标量可能不一样。

如果我们把宇宙修改的大一些，会发生什么？把64x64改成128x128，结果会把fps从60降到40。

如果我们打开性能监控器，并看到它的瀑布图，我们可以看到动画帧用了20毫秒，回顾60fps时渲染一页则需要16毫秒，这不仅仅是JavaScript和WebAssembly，还包括重绘的部分。

![性能监视](https://rustwasm.github.io/book/images/game-of-life/drawCells-before-waterfall.png)

如果仔细查看，可以看到`CanvasRenderingContext2D.fillStyle`的setter是很耗费时间的。

> 再火狐，你可能看到的是"DOM"而不是"CanvasRenderingContext2D.fillStyle"，你需要打开"展示Gecko平台数据"。

![火狐的性能监视器](https://rustwasm.github.io/book/images/game-of-life/profiler-firefox-show-gecko-platform.png)

当然，这并不稀奇，40%的的时间都浪费在这个setter上面。

> 我们可能期望性能瓶颈再tik函数上，但并不是。永远选择性能监视器观察，因为你可能浪费很多时间在无关的地方上面。

在drawCell上面，fillStyle在每次动画和每个细胞上面使用。

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

现在我们知道fillStyle资源耗费比较多，那么我们该怎么避免他呢？我们需要判断细胞的生命状态来自决定fillStyle的值，设想，如果先设定`fillStyle = ALIVE_COLOR`，再绘制所有的活着的细胞，然后设置`fillStyle = DEAD_COLOR`，再设置所有的死细胞，最后我们只设置fillStyle两次。

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

修改之后，刷新页面，此时的fps已经上升到60。

如果重新看原来的数据，现在每一刻只使用10毫秒。

![更新后的性能检查](https://rustwasm.github.io/book/images/game-of-life/drawCells-after-waterfall.png)

消除了fillStyle的性能瓶颈，发现比较消耗资源的是fillRect，用来绘制每一个细胞的。

![目前的性能损耗都在fillRect上面](https://rustwasm.github.io/book/images/game-of-life/drawCells-after-flamegraph.png)

### 让时间变快

有些人可能不喜欢等待，更希望一帧跑完九刻而不是一刻。我们可以通过修改renderLoop函数实现。

```JavaScript
for (let i = 0; i < 9; i++) {
  universe.tick();
}
```

在机器上，fps降到了35，但是我们一定要到60fps！

现在我们知道性能瓶颈在tick函数上面，所以我们给函数的每一步都加上Timer监视，我猜测是创建向量和释放向量占用了很多资源造成的。



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

下一部分需要`nightly`编译，因为我们将会使用[test-feature-gate](https://doc.rust-lang.org/unstable-book/library-features/test.html)来跑benchmark（性能测试）。我们将会安装另一个工具[cargo-benchcmp](https://github.com/BurntSushi/cargo-benchcmp)。一个迷你的有`cargo bench`支持的性能测试工具。

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

他也告诉我们二进制文件的位置，我们可以跑第二次性能测试。但这次可以使用系统的性能测试工具。因为我用的是Linux，所以perf就是我的测试工具。

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

perf会指明函数中到底是什么操作引起的性能损耗（译者：虽然我也没看出来）。

![perf的结果](https://rustwasm.github.io/book/images/game-of-life/bench-perf-annotate.png)

它告诉我们26.67%的时间花在总和细胞数目，23.41%的时间花在获取列序号，另外15.42%花在取得行序号。这三个性能瓶颈中，第二和第三都使用了比较耗费性能的DIV命令。这些DIV的实现是在`Universe::live_neighbor_count`。

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

使用取余运算是为了避免使用杂乱的if代码来处理边界，但导致我不得不用DIV这样比较耗费性能的指令。相反，如果用if处理边界，并展开循环，则分支条件将会比较适合CPU处理。

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

 哇！提高了7.61倍！

 WebAssembly意图和原生系统贴近，但是我们确实需要在WebAssembly环境下也作一次测试。

 从新编译程序，刷新浏览器页面，画面重新跑在60fps，每一帧大概是10毫秒。

 成功！

 ![测试结果](https://rustwasm.github.io/book/images/game-of-life/waterfall-after-branches-and-unrolling.png)

### 练习

+ 现在，下一个性能瓶颈是`Universe::tick`调用和释放函数的部分，尝试缓存细胞状态，让Universe维护两个向量，永远不释放他们，也不掉用新的区间。
+ 换一种方式实现游戏，让Rust和JavaScript以细胞的列表交互，这样能让渲染画布更快吗？你能实现这个设计同时不在每个tick函数中调用新的列表吗？
+ 就性能显示来看2D画布渲染显然不够快，使用WebGL画布重新渲染，WebGL能多快？使用WebGL能在遇到瓶颈前创建多大的宇宙空间？

## 压缩.wasm文件大小

rustc有很多配置项，可以让`.wasm`二进制文件更加小。在很多情况下更小的生成文件意味着更长的编译时间。另外更小的文件使得WebAssembly的运行时间更长。我们应该意识到这些方面上的牺牲。在这些情况下，当我们要减少编译文件大小时，我们应该考虑到使用性能监视器衡量一下这种改动是否值得。

### 使用链接配置器编译

在`Cargo.toml`，增加`lto=true`：

```toml
[profile.release]
lto = true
```

者给予LLVM更多机会去内联和简化函数，不仅仅会使`.wasm`更小，还会让他在运行时运行得更快！但是会让他编译得更长。

### 配置LLVM牺牲速度换文件大小

LLVM默认配置是为了运行速度，并不是大小。我们可以通过更改`Cargo.toml`去修改这一配置。

```toml
[profile.release]
opt-level = 's'
```

或者，更激进的可以把它改成"z"。

但是，配置为"s"的时候有的时候会比"z"更小，所以一定要做测量！

### 使用wasm-opt工具

[Binaryen](https://github.com/WebAssembly/binaryen)是一个关于WebAssembly编译工具的集合。他比LLVM更加后端，使用`wasm-opt`处理生成文件常常会节省15%~20%的代码，同时又会提高运行速度。

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

#### twiggy代码检查器

[twiggy](https://github.com/rustwasm/twiggy)是一个支持WebAssembly的代码大小检查器，他能分析二进制代码的调用图，并解决如下问题：

+ 为什么这个函数被编译到这段代码中。
+ 这个函数占用大小是多少？如果我删除这个函数以及其相关函数我能节省多大的空间？

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

#### 手动修改LLVM-IR

LLVM-IR是LLVM生成WebAssembly代码的最后一步。所以，他和最终生成的WebAssembly很像。更多的LLVM-IR代码意味着生成的文件越大，当一个函数占用了LLVM-IR中25%的位置，则代表他占用了25%的文件大小。当然这些数字只是个经验值，因为LLVM-IR还有一些WebAssembly没有的重要的信息（因为WebAssembly没有诸如DWARF调试信息）。

你可以使用cargo生成LLVM-IR代码：

```shell
cargo rustc --release -- --emit llvm-ir
```

接下来你可以使用find命令去寻找存储在cargo生成目录(target)下的`.ll`文件。

```shell
find target/release -type f -name '*.ll'
```

相关可以参考[LLVM语言](https://llvm.org/docs/LangRef.html)

#### 更激进的工具

修改编译配置是比较好上手的。如果你想前进一个里程，你可以使用一些更激进的工具，像是重写代码以减少冗余。以下是一些不太优雅的代码，但是的确能减少生成文件大小。

##### 避免字符串格式化

`format!`,`to_string`等，能加入很多冗余代码。如果可能，在调试环境用格式化，而在发布环境使用静态字符串。

##### 避免使用崩溃

这很明显，使用twiggy之类的工具或者人工检查LLVM-IR能帮助你查出到底哪个函数崩溃。

崩溃并不总是出现在`panic!()`宏，他们会在很多情况下出现。

+ 访问切片越界，如：`my_slice[i]`
+ 除0，如：`dividend/divider`
+ 解Option类型或者Result类型，如：`opt.unwrap()`或者`res.unwrap()`

前两个可以被改成第三个，访问切片可以使用`my_slice.get(i)`。除法可以使用`checked_div`，所以你只有一种需要处理的情况。

解开`Option`或者`Result`有两种方法安全的和不安全的。

安全的方式是使用abort方法而不是返回None和Error值。

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

相反的，[unreachable](https://crates.io/crates/unreachable)包为Option和Result类型提供不安全的[unchecked_unwrap](https://docs.rs/unreachable/1.0.0/unreachable/trait.UncheckedOptionExt.html#tymethod.unchecked_unwrap)方法。让Rust编译器假定Option类型是Some类型而Result类型是Ok类型。如果值是不正确的的情况是未被考虑的。你一定要在110%确认的情况下使用这个包，因为编译器可没那么聪明能预估出错误。即使你这么做了，你一定要在调试环境下面做检查，而在发布环境下去掉检查。

#### 避免调用内存或者使用wee_alloc

Rust的默认调用器是`dlmalloc`的一部分。它能达到10KB。如果能够避免动态调用，你应该能省下10KB。

完全避免动态语言调用可能会非常困难。但是删除调用却在某些情况下很简单，在这些情况下，可以使用[`wee_alloc`](https://github.com/rustwasm/wee_alloc)代替全局的调用器可以从10KB中节省很多。`we_alloc`是当你想要一些调用器时的一个选择，并能同时减少代码大小。

#### 使用trait来替代泛型

当你创建一些泛型函数。

```Rust
fn whatever<T: MyTrait>(t: T) { ... }
```

`rustc`和LLVM会为不同类型生成新的函数拷贝。这为编译器提供了各种类型使用这个函数的机会。但会增加代码大小。

如果你为对象提供trait，如下：

```Rust
fn whatever(t: Box<MyTrait>) { ... }
// or
fn whatever(t: &MyTrait) { ... }
// etc...
```

这样经过虚调用动态派遣（dynamic dispatch）的方法就被使用了，如此只会用一个函数会放在`.wasm`。这样的缺点是丢失了编译器自定义的机会，并且增加了不直接的，动态的语言调用。

#### 使用wasm-snip工具

[`wasm-snip`](https://github.com/fitzgen/wasm-snip)使用`unreachable`方法代替了WebAssembly的函数。这是一个又沉又钝的锤子，更像是徒手。

也许你知道有些函数可能永远不会在运行时被调用，但是编译器不能保证？掐了他！执行`wasm-opt`加上`--dce`参数，所有无关函数就会被剪掉。

这个工具对删除崩溃及其有用。

### 我们能把生命游戏缩到多小？

默认的配置下，WebAssembly二进制大小为29410字节。

```shell
$ wc -c pkg/wasm_game_of_life_bg.wasm
29410 pkg/wasm_game_of_life_bg.wasm
```

打开LTO之后设置`opt-level="z"`执行`wasm-opt -Oz`，结果是17317字节。

```shell
$ wc -c pkg/wasm_game_of_life_bg.wasm
17317 pkg/wasm_game_of_life_bg.wasm
```

如果使用gzip压缩，你能搞到9045字节！

```shell
$ gzip -9 < pkg/wasm_game_of_life_bg.wasm | wc -c
9045
```

### 练习

+ 使用`wasm-snp`工具删掉会有崩溃的函数，它能减少多少字节？
+ 使用`wee_alloc`作为全局调用器，，修改`Cargo.toml`：

```
[features]
default = ["wee_alloc"]
```

能够减少多少大小呢？

+ 我们只实现了一个Universe，所以相比使用构造器，我们可以导出一个`static mut`实例，如果这个实例使用的是双向缓存，我们也可以让这些缓存也是全局`staic mut`。这样就移除了所有的动态调用，我们可以增加`#![no_std]`包取消掉调用器。这回能缩小多少大小？

## 发布到NPM

首先，确保你登入了npm。

接着，使用`wasm-pack login`登入。

### 发布

确保已经执行`wasm-pack build`并且pkg文件已经编译好。

已经准备好之后，跑`wasm-pack publish`上传包到npm。

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

