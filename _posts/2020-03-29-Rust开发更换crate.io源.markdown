---
type: post
category: fe
tag: rust crate.io ustc cargo
---

# Rust 开发更换 crate.io 源

使用 VSCode 开发 Rust 的我，最难过的一刻就是打开编辑器时的 RLS 检查，可以看做它是一个用来检查代码语法的后台程序，在 RLS 的 issue 里面有很多人吐槽他初始化的速度实在是太慢了，然而大佬的回复都是说他们不需要使用这种辅助工具。作为使用 JavaScript 都一定要 TypeScript 编译，打字都是通过语音输入来打字的我来说（没错，这篇博文是语音转换过来的），臣妾做不到啊。

RLS 检查有一个步骤是`cargo check`，这里会链接`crate.io`检查包的完整性。由于`crate.io`的包大多托管在 GitHub，所以外网的宝宝们吐槽的慢只是秒级别的，而中国的宝宝是小时级的 😭。

但是尚有修补的余地，中科大爸爸给国内开发者提供国内的镜像了。修改`~/.cargo/config`增加中科大的源。

```ini
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

中科大就是我的神啊！开发 Rust 终于可以和国外一样慢了 😂！
