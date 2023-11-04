---
type: post
category: fe
tag:
  - rust
  - actix_web
---

# 利用 actix_web 使用 rust 编写 web 应用

最近我一直在实践 rust 相关的内容，本来想写一篇类似于[scrapy 的文章](http://gongbaodd.github.io/tech/2020/02/04/Windows%E4%B8%8A%E4%BD%BF%E7%94%A8scrapy%E7%88%AC%E7%BD%91%E9%A1%B5.html)，后来发现内容有点多，仅仅一篇文章兜不住，干脆写一个系列好了。

## 使用 Rust 的工具

### rustup

使用 chocolatey 安装，安装好以后只是处理好了 rustup，后面的工具链还要用再次处理。

```shell
choco install rust
```

关于 rustup 的使用，可以查看[文档](https://github.com/rust-lang/rustup/blob/master/README.md)，包括如何做交叉编译都可以使用这个工具完成。

```shell
rustup toolchain install stable-msvc
```

### crates.io

[crates.io](https://crates.io/) 是 rust 的模块库，没啥可说的。

### cargo

cargo 是 rust 的包管理工具。以下是几个 cargo 经常使用的命令。

- `cargo new [project name]`，新建一个项目。
- `cargo init`，初始化一个项目。
- `cargo clean`，清理编译文件（相信我，这个会经常用）。
- `cargo run`，编译并运行 main 文件。
- `cargo run --bin [helper file name]`，直接执行 bin 文件夹下的文件。
- `cargo build`，编译文件。
- `cargo install [tools name]`，安装工具。

### cargo-edit

执行`cargo init`之后，项目根目录会生成一个`Cargo.toml`文件本项目的依赖模块都会放到这里，然而手动编写这个文件对于像我这样的懒人显然是无法接受的。因此可以借助`cargo-edit`完成。

```shell
cargo install cargo-edit
```

记住`cargo-edit`如下命令即可。

- `cargo add [module name]` 安装一个模块。
- `cargo rm [module name]` 删除一个模块。

## rust 项目结构

```shell
- Cargo.toml
- Cargo.lock
- src
-- main.rs # 项目入口文件
-- lib.rs # 如果作为封装成一个crate，这里配置可以暴露的模块
-- bin/ # 项目工具文件
--- helper.rs
```

## 语法速记

### 函数

rust 的函数还比较有趣，它的`return`关键字是默认省略的，如果这个函数没有中断，这个函数的最后一行就是返回值，且这一行不带分号。

```rust
pub async fn index() -> impl Responder {
    format!("hello")
}
```

如果这个函数没写返回值，其实编译器还会让这个函数返回一个`()`。

```rust
fn main() {
    println!("hello world");
    () // 此处不加()编译器还是会默认理解为返回()。
}
```

这么做确实比较符合函数编程的概念，但是一般 rust 库里面的函数都会返回 Result 或者 Option 类型，就用 Result 类型做例子，一般会有四种处理方式。

```rust
let bar = foo().expect("Panic!"); // 直接中断程序
let bar = match foo() {
    Ok(value) => Some(value),
    Err(_) => Some(someError)
}; // 通过match判断处理错误， 类似于其他语言的switch-case
let bar = foo()?; // 把错误处理交给bar
let bar = foo().unwrap_or(); // 成功返回成功值，失败返回unwrap_or的值
```

### 模块

通常想要使用一个模块，只需要使用`use`关键字。

```rust
use std::env;

fn main() {
    let db_url = match env::var("DB_URL") {
        Ok(_) => { "OK".to_owned() }
        Err(_) => { "Err".to_owned() }
    };

    println!("{}", db_url);
}
```

如果引用的这个包是个非 rust 标准包（一个 crate，这里说的是我的理解，如果有个官方中文说法，以它为准），需要在添加`extern crate`关键字，如果还引用了宏，还要加上`#[macro_use]`（这就比较坑了，我哪知道到底用没用上宏，所以一般我都靠编辑器帮我编译一下...）。

```rust
#[macro_use]
extern crate log;

fn main() {
    info!("debug")
}
```

如果只是引用本项目相对地址的文件，使用`mod`关键字就好，可以看我的[actix_log](https://github.com/gongbaodd/rust_webAssembly_study/tree/master/actix_log)。

#### 为啥 rust 的模块这么复杂

我猜测毕竟 rust 是对标 C 语言的，相比于很多高级语言的链接工作是在虚拟机里面做的，rust 则全部下放到语言里面，所以一起用起来就会比较复杂。

## trait

trait 是 rust 上面的一个新概念，类似于 JS 的 mixin 和 Java 的接口，后面我会按例子来讲。

很多库的 trait 需要单独引用，否则会编译失败，这些库往往会封装成一个 prelude 使用。

```rust
use gtk::prelude::*;
```

## rust command

rust 是个系统级语言，可以互相访问其他程序语言分享的堆内存空间，FFI 依靠的是 Box，但是本篇暂时不提及，这个[代码](https://github.com/gongbaodd/rust_webAssembly_study/tree/master/command)实现的是读取并处理其它语言的 std 输出。

## Actix_web

[actix-web](https://actix.rs/)是 Rust 的 web 框架之一，试用了一下，很好上手，有一点 Express 的味道。

```shell
cargo add actix-web
cargo add actix_rt
```

官网首页的例子即是一个简单的应用。

```rust
use actix::{
    web,
    App,
    HttpServer,
    Responder,
    HttpRequest,
};

async fn greet(req: HttpRequest) -> impl Responder {
    let name = req.match_info()
        .get("name")
        .unwrap_or("World");

    format!("Hello {}!", name)
}

#[actix_rt]
async fn main() -> std::io::Result<()> {
    HttpServer::new(
        || {
            App::new()
                .route("/", web::get().to(greet))
                .route("/{name}", web::get().to(greet))
        }
    )
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

```

当然，如果觉得路由的部分比较难写，还可以使用宏来修改。

```rust
#[get("/")]
async fn greet(req: HttpRequest) -> impl Responder {
    let name = req.match_info()
        .get("name")
        .unwrap_or("World");

    format!("Hello {}!", name)
}

App::new().route(greet);
```

### 利用中间件处理日志和错误

log 和 env_logger 是 rust 的日志工具，基本上都是宏。

```
cargo add log
cargo add env_logger
```

actix-web 使用 wrap 方法添加中间件，如添加 Logger 打出标准访问日志。

```rust
use actix_web::middleware::Logger;
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info,info");
    env_logger::init();

    let url = "127.0.0.1:8080";
    let app = || {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .wrap(middleware::DefaultHeaders::new().header("X-Version", "0.2"))
            .wrap(ErrorHandlers::new().handler(http::StatusCode::INTERNAL_SERVER_ERROR, render_500))
            .service(routes::index::index)
    };

    let server = HttpServer::new(app).bind(url);
    let wait_server = server?.run();

    info!("Running Server on {}", url);
    wait_server.await
}
```

错误处理，详细代码可以查看[actix-log](https://github.com/gongbaodd/rust_webAssembly_study/tree/master/actix_log)。

```rust
fn render_500<B>(mut res: dev::ServiceResponse<B>) -> Result<ErrorHandlerResponse<B>> {
    res.response_mut().headers_mut().insert(
        http::header::CONTENT_TYPE,
        http::HeaderValue::from_static("Error"),
    );
    Ok(ErrorHandlerResponse::Response(res))
}
```

### 使用 serde 返回 JSON

想要制作 Restful API，JSON 支持是少不了的。

```shell
cargo add serde
```

由于 actix-web 对路由回应格式的支持，一个 json 文件可以这么写。

```rust
use acrix_web:{
    HttpResponse,
    Responder,
    get,
};
use serde::{
    Serialize,
    Deserialize,
};

#[derive(Serialize, Deserialize)]
struct MyObj {
    message: String,
}

#[get("/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json(MyObj {
        message: "SUCCESS"
    })
}

```

更多详细的代码可以查看我的[github](https://github.com/gongbaodd/rust_webAssembly_study/tree/master/actixweb)。

## diesel 处理 ORM(sqlite)

强烈安利大家去看一下 diesel 的[Get Start](http://diesel.rs/guides/getting-started/)，确实是一种下一代 ORM 的感觉。

```shell
cargo add diesel
```

### diesel_cli

diesel_cli 是 diesel 的命令行工具，提供数据部署和 schema 生成的功能，如果不指定 feature 的话，安装时会同时编译 sqlite、postgreSQL 以及 MySQL。

```shell
cargo install diesel_cli --no-default-features --features sqlite
```

第一次编译的时候，在 Windows 下面失败了，翻了一下[issue](https://github.com/diesel-rs/diesel/issues/487)找到了解决方案。

首先安装 Visual Studio（反正现在免费安），使用 VS 的终端打开 sqlite 文件夹。

```batch
cd C:\ProgramData\chocolatey\lib\SQLite\tools
lib /def:sqlite3.def /out:sqlite3.lib
```

然后记得把`C:\ProgramData\chocolatey\lib\SQLite\tools`放到环境变量 PATH 里面。

再次编译即可，具体如何使用 diesel 的 get start 已经足够了，在此不做赘述，可以查看[源码](https://github.com/gongbaodd/rust_webAssembly_study/tree/master/diesel_demo)。

这里列举一下经常用的命令

- `diesel setup` 初始化。
- `diesel migration generate [step name]` 生成 down.sql 和 up.sql。
- `diesel migration run` 按照 SQL 文件部署数据库和 schema 文件（目前发现一个 bug，生成的 schema 不完全，没能完全复现）。
- `diesel migration revert` 撤回数据库操作。

### 补充一下 rust 语法里面的生命周期

demo 里面的 lib 文件 create_post 语法很奇怪。

```rust
pub fn create_post<'a>(conn: &SqliteConnection, title: &'a str, body: &'a str) -> usize {
    use schema::posts;

    let new_post = NewPost {
        title: title,
        body: body,
    };

    diesel::insert_into(posts::table)
        .values(&new_post)
        .execute(conn)
        .expect("Error saving new post")
}
```

`<'a>`的写法是指明函数的生命周期标注，因为 rust 没有垃圾回收机制，所有申请的堆内存在一个函数执行结束后就会回收。所以当一个函数的输入值是堆内存的变量，就发生「借用」，如这个函数里面的三个参数，借用都用`&`来标注。

假设一个变量借出给另一个函数，而在借用变量的函数执行阶段借出函数就结束并销毁变量，程序就会出错，因此生命周期就是用来确定一个借出的变量必须还回后才能被销毁。默认 rust 都会给一个生命周期，然而当出现两个以上生命周期时，如`create_post`则需要程序员指定参数必须在一个生命周期内。

## juniper 实现 graphql

写一个 Query 的方法

```rust
#[derive(juniper::GraphQLObject)]
struct MyObj {
    name: String,
}

struct QueryRoot;
#[derive(juniper::object)]
impl QueryRoot {
    fn myObj() -> juniper::FieldResult {
        Ok(MyObj {
            name: "World"
        })
    }
}
```

Mutation 也类似，基本很简单，可以查看[代码](https://github.com/gongbaodd/rust_webAssembly_study/blob/master/graphql_only)了解。

### rust 语法里面闭包里面 move 的使用

前面说过，如果一个函数想调用另一个函数的堆内存，可以借用。但是还有另一种函数，闭包，理论上闭包可以处理闭包所在词法作用域下的所有变量。在动态执行时如果闭包中依赖的一个变量已经销毁也是很危险的事儿，所以这里可以用 move 关键字将变量所有权交给闭包，在闭包外则无权再次处理已经 move 的变量。

```rust
async fn main() -> io::Result<()> {
    let schema = std::sync::Arc::new(create_schema());

    let app = move || {
        App::new()
            .data(schema.clone())
            .wrap(middleware::Logger::default())
            .service(graphql)
            .service(graphiql)
    };

    HttpServer::new(app)
        .bind("127.0.0.1:8080")?
        .run()
        .await
}
```

当然 graphql 的代码里面还有 RC 和 ARC 的概念，现在暂时了解他们时 Rust 下面的引用计数的一种实现，RC 用于单线程，ARC 用于多线程。
