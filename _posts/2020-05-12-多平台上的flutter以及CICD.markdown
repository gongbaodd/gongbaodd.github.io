---
type: post
category: fe
tag:
  - flutter
  - CICD
  - rust
  - golang
  - wsl2
  - hover
  - github-action
  - vcXsrv
  - MSYS
---

# 多平台上的 flutter 以及 CICD

Flutter 是一个号称面向全平台的框架，既然立了 flag，早晚要去摘的。除了 iOS 和 Android，beta 版本的 flutter 还支持 web 网页以及 mac 桌面端，alpha（master 分支）版本还提供 Windows 和 Linux 桌面端的支持，本篇除了介绍 flutter 在各端如何开发发布还会提及如何通过 CICD 发布安卓 apk，以及这段时间使用 Flutter 的感想。

## Web 支持

Web 应该是 dart 语言一直想抢的蛋糕，在早期 chrome 上面就有 dart VM，甚至提供了 dart2js 这样的工具，所以 Flutter 在一炮走红之后立刻提供 web 支持是不意外的。

创建 Web 端的 Flutter 应用，以下几项是必须的：

- 安装 Flutter SDK
- Chrome 浏览器
- 一个支持开发 Flutter 的编辑器

确定以上几项后执行下面命令切换 Flutter 到 beta 版本，并打开 Web 端支持。

```shell
 flutter channel beta
 flutter upgrade
 flutter config --enable-web
```

以上命令执行成功后执行`flutter devices`应该能看到 Chrome 浏览器和 Web 伺服器的支持。

打开任何一个 Flutter 项目的根目录，执行`flutter run -d chrome`，稍等片刻 chrome 会被自动打开并渲染项目（这个体验很割裂，真的，这个片刻其实比较久，而且你的终端会不会显示任何东西）。

执行`flutter build web`就会编译项目至`/build/web`文件夹下。

### Web 支持总结

编译 web 应用已经相对稳定，基本上你老姑（谷歌）想要的功能也都有（比如 service-worker 什么的），但因为是 js 渲染，SEO 什么的可能没 SSR 项目号，再一个，我在使用的时候没发现有 sourcemap，估计 debug 的方法也会和普遍 web 应用不太一致。

## Windows 桌面支持

到 Flutter 的目录下，将它 checkout 到 master 分支，此时执行`flutter doctor`，它会检查你是否安装`Visual Studio`、`MSVC`以及`Windows10 SDK`（当然了，这是在 Windows 下面执行才有），没错，alpha 版本的 flutter 已经可以编译 Windows 桌面应用了，只需安装社区版的`Visual Studio`，在安装项里面添加`Clang`、`MSVC`和`Windows10 SDK`即可。

另外还需要在项目中增加[flutter desktop embedding](https://github.com/google/flutter-desktop-embedding)，尝试到这里我有点失望，看了这个项目的 issue，目前 Windows 的桌面支持还是用 Win32 的 API，项目正在计划使用 UWP 来替换。同样 Linux 桌面也在纠结于到底使用 QT 还是 GTK 做框架，因此这两个桌面端的支持相较于 Mac 延后。

## flutter-rs

这是我的另一个 Flag，几个月前我在尝试用 rust 写桌面应用，几个平台都不理想，于是尝试了这个包。然而[flutter-rs](https://github.com/flutter-rs/flutter-rs)依然不太理想，不过更多原因可能是因为这个项目还在 WIP 阶段。

目前 rust 推荐在 WSL 上面开发，考虑到 WSL1 对图形的支持不太好，我更新了[WSL2](https://aka.ms/wsl2kernel)的内核，并使用 Ubuntu 20.04 开发。

这里注意下，WSL2 是完整的 Linux 内核，所以代理什么的都不能使用 WSL1 里面的`localhost`。

```shell
export WSL_VERSION=$(wsl.exe -l -v | grep -a '[*]' | sed 's/[^0-9]*//g')
export WSL_HOST=$(tail -1 /etc/resolv.conf | cut -d' ' -f2)
export DISPLAY=$WSL_HOST:0

export HTTP_PROXY=http://$WSL_HOST:1080
export HTTPS_PROXY=http://$WSL_HOST:1080
export NO_PROXY=127.0.0.1,localhost,$WSL_HOST
```

同样在运行`vcXsrv`时也要加上`-ac`参数已打开远端支持。

安装编译`flutter-rs`需要很多依赖，

```shell
sudo apt install build-essential libssl-dev pkg-config libxcb-util-dev libxcb-render-util0-dev libxcb-shape0-dev libxcb-xfixes0-dev libclang-dev libglfw3

cargo install flutter-rs
```

尴尬的来了，执行`cargo flutter run`，打开的 flutter 窗口闪了一下就崩溃了...查了下，好像是 Skia 在 rust 上面链接的问题，哎，不跟进了。

## hover

那么就没有一个能稳定点的桌面端方案了么？有！go 提供了一套 API 接口[hover](https://hover.build/)也叫[go-flutter](https://github.com/go-flutter-desktop/go-flutter)，框架是 GLFW。

在 MSYS 里面就可以安装 golang（太好了，WSL 下面编译 GUI 不敢恭维啊）。

```shell
pacman -S mingw-w64-x86_64-go
```

初次运行提示找不到 go 命令，貌似`mingw-w64`不在 PATH 上，查了好多都没找到原因，干脆直接添加上好了。

```shell
export PATH=/c/tools/msys64/mingw64/bin:$PATH
```

下面安装 hover

```shell
GO111MODULE=on go get -u -a github.com/go-flutter-desktop/hover
```

随便找个已有的 flutter 项目，执行`hover run`，它会询问你是否增加一段 fushia 的代码`lib/main_desktop.dart`，没错，所有的 desktop 端都叫 fushia，它也是桌面端的入口文件，直接回复 Y 即可。

和 flutter 的命令类似，执行`hover build windows`就会在`/build/output/windows`下生成编译好的可执行文件。

hover 相对来说是目前唯一比较成熟的 Flutter 桌面运行时了，更多内容可以查看它的[文档](https://github.com/go-flutter-desktop/hover)。但是运行结果不能说如意，比如在处理改变窗口大小时，界面不会跟着鼠标变化，直到释放之后才会改变，这对于 2020 年的人类来说，体验真是不够好，但是运行起来确实是比 electron 好些，起码笔记本风扇没有疯狂打转。

### Windows 桌面支持总结

在官方支持遥遥无期的情况下，桌面支持真是百花齐放，不过另一方面微软爸爸直接提供亲生的[React Native Windows](https://github.com/Microsoft/react-native-windows)可是支持 UWP 下面的 Fluent Design 哦，所以在多段支持上，起码 Windows 这里，React Native 略胜一筹。

## CICD

本来想写一下测试的，结果发现没啥新东西。干脆提一下利用 Github action 做 CICD 好了。（其实基本上就复制[别人](https://github.com/nabilnalakath/flutter-githubaction)的`/.github/workflows`文件夹就好，白嫖很开心）。

```yaml
on: push
name: Test, Build and Release apk
jobs:
  build:
    name: Build APK
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-java@v1
        with:
          java-version: "12.x"
      - uses: subosito/flutter-action@v1
        with:
          flutter-version: "1.7.8+hotfix.4"
      - run: flutter pub get
      - run: flutter test
      - run: flutter build apk --debug --split-per-abi
      - name: Push APK to Releases
        uses: ncipollo/release-action@v1
        with:
          artifacts: "build/app/outputs/apk/debug/*.apk"
          token: ${{ secrets.TOKEN }}
```

## 总结

Flutter 相对于 React Native 的确有性能上的优势，毕竟跳过了 js 和原生环境交互的沟壑，但是对比开发环境还是没有 RN 全面。

- 如果只是移动端应用，两者皆可，Flutter 有对 Material Design 更原生的支持，所以如果设计上是 Material Design，开发效率会更高；但是 RN 则在可定制上更高一筹。
- 如果是 Wear OS，必然 Flutter。
- 如果是桌面应用，目前我站 RN，除了工具链全面，它对比 Electron 已经很好了，而 Flutter 即使理论上性能更高，但其 alpha 的不稳定也要考虑在内。
- 如果是 Web 端，感觉 Flutter 根本打不过现有的框架，不过仅仅对比 RN 的话，Flutter 可以不做配置就直接编译 Web，也就是说如果你有一个移动应用，又不想关心 Web 是怎么回事儿，用它还是可以的。
