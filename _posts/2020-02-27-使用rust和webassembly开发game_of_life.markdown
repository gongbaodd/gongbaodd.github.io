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


### 练习

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

***答案***

![下一刻宇宙](https://rustwasm.github.io/book/images/game-of-life/initial-universe.png)

你能找到一个稳定的没有变化的宇宙吗？

***答案***

这个答案其实有无数个，最平凡的答案就是它是一个空宇宙。如果是一个2×2的方格，也可以形成一个稳定的宇宙。

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

我们有很多方法来给JavaScript暴露宇宙中的细胞。开始我们要为宇宙实现一个```std::fmt::Display```。我们可以使用一个Rust的String，每个字符代表一个细胞。这个Rust的string将会从WebAssembly的内存中复制到JavaScript的内存里，并接下来作为textContent展示到HTML里面。本节的后面，将会讲到如何把细胞展示到canvas中。

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

```#[repr(u8)]```很重要，这样每个细胞都会以一个字节存储，另外Alive为1，Dead为0也很重要，这样我们就可以使用加法计算邻居数目。

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

这个函数使用取余处理边界问题。现在我们已经有所有的必须函数了，最后只需要生成下一刻的状态即可（记住，每个函数必须在```#[wasm_bindgen]```宏之下，这样JavaScript才能接到暴露的函数）。

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

通过实现Rust标准库中的```Display```trait，我们可以将数据结构以一种用户交互方式输出，它也提供了一个```to_string```方法。

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



