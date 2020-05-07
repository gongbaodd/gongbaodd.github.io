---
type: post
category: fe
tag:
  - flutter
  - dart
  - react-native
series:
  name: 从RN到Flutter
  slug: Flutter-for-RN-devs
  number: 3
---

# 从 RN 到 Flutter-项目结构

## 从哪里开始写代码

进入`lib/main.dart`文件，如下是自动生成的代码。

```dart
main() {
    print('Hello, this is the main function.');
}
```

在 Flutter 里面，入口文件`<projectname>/lib/main.dart`会从`main`函数开始。

## 整体项目结构

创建好 flutter 项目后，目录结构已经创建好了。你也可以之后自定义它。

```properties
┬
└ projectname
  ┬
  ├ android      - Android相关文件
  ├ build        - Android和iOS生成文件
  ├ ios          - iOS相关文件
  ├ lib          - 外部可访问的Dart源文件
    ┬
    └ src        - 额外的源文件
    └ main.dart  - Flutter入口文件，这个文件是自动生成的
  ├ test         - 自动化测试文件
  └ pubspec.yaml - flutter的包依赖描述
```

## 资源文件

一个 Flutter 资源文件会被打包到应用中，并可以在运行时访问。Flutter 应用包括以下文件。

- 静态数据如 JSON 文件
- 配置文件
- 图标和图像（JPEG、PNG、GIF、动态 GIF、WebP、动态 WebP、BMP 和 WBMP）

Flutter 使用项目的根目录下的`pubspec.yml`文件，来确定需要的资源。

```yml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

`asset`部分描述应用中需要的资源。每个文件以其相对于`pubspec.yaml`的相对位置识别，顺序并不重要。实际的文件夹命名（本例为`asset`）也不重要。

编译时，Flutter 把资源放到一个叫做*asset bundle*的存档，应用会在执行时读这个存档。编译程序会查询对应的文件。包括一些特定的资源，Flutter 会使用 asset 变量处理不同分辨率的图片。

在 React Native 中，你可以使用资源地址来引用资源。

```tsx
<Image source={require("./my-icon.png")} />
```

在 Flutter，使用`AssetImage`类访问资源文件。

```dart
AssetImage('assets/background.png');
```

更多信息请参考[在 Flutter 中增加资源文件](https://flutter.dev/docs/development/ui/assets-and-images)。

## 如何加载网络图片

在 React Native 中，需要指定`Image`组件`source`props 中的`uri`，并提供对应大小。

在 Flutter 中，使用`Image.network`构造器来引入图片。

```Dart
Image.network('https://flutter.io/images/owl.jpg');
```

## 如何安装包

Flutter 支持使用不同开发者提供给 Dart 环境和 Flutter 环境的包。这允许你在不开发每一处的情况下开发应用。那些有指明平台的包叫做包插件。

在 React Native 中，你要在命令行使用 `yarn add <package-name>` 或者 `npm install --save <package-name>` 安装包。

在 Flutter 中，按照如下指示操作：

1. 在`pubspec.yaml`的依赖项中增加包名字和版本号。如下的例子是增加`google_sign_in`包到`pubspec.yaml`文件中。请处理好空白，因为对 YAML 文件来说，空白很重要。

   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     google_sign_in: ^3.0.3
   ```

2. 使用终端执行 `flutter pub get` 安装，如果使用的是 IDE，它往往会帮你执行。

3. 按如下方式引入包。

   ```dart
   import "package:flutter/cupertino.dart";
   ```

更多信息，查看[使用包](https://flutter.dev/docs/development/packages-and-plugins/using-packages)和[开发包和插件](https://flutter.dev/docs/development/packages-and-plugins/developing-packages)。

你可以查看开发者在[pub.dev](https://pub.dev/)分享的[Flutter 包](https://pub.dev/flutter/)。
