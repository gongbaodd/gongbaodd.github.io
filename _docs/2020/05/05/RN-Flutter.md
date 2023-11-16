---
type: post
category: fe
tag:
  - react-native
  - flutter
  - dart
series:
  name: 从RN到Flutter
  slug: Flutter-for-RN-devs
  number: 2
---

# 从 RN 到 Flutter-简单说说

## 如何创建一个 Flutter 应用

创建一个 React Native，可以在终端中使用`create-react-native-typescript-app`，或者`expo-cli`。

```shell
create-react-native-typescript-app <projectname>
```

使用 Flutter 创建应用，可以采用以下两种方式。

- 使用 IDE 中的 Flutter 和 Dart 插件。
- 使用`flutter create`命令，请确保 Flutter SDK 已经在 PATH 中，[Windows 用户可以参考此文](/fe/2020/02/21/Windows安装flutter开发环境.html)。

```shell
flutter create <projectname>
```

更多内容，可以参考[快速入门](https://flutter.dev/docs/get-started)，入门是一个创建单按钮的计数项目，并能够部署在 Android 和 iOS 设备中的示例应用。

## 如何运行应用

在 React Native 中，你可以使用`npm run`或者`yarn run`。

在 Flutter 中，可以参考如下方式：

- 使用 IDE 中的"run"选项。
- 在项目根目录执行 `flutter run`。

你的应用会在连接好的设备上执行。

更多信息，请参考 Flutter 的[快速入门](https://flutter.dev/docs/get-started)。

## 如何引入部件

在 React Native 中，你需要引入组件。

```js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
```

在 Flutter 中，需要引入`material.dart`包来使用 Material Design 库中的部件。要使用 iOS 样式的部件则需要引入 Cupertino 库。想使用更多基础部件，需要引入他们的库，或者你也可以自己写一个部件库，并引入。

```dart
import "package:flutter/material.dart";
import "package:flutter/cupertino.dart";
import "package:flutter/widgets.dart";
import "package:flutter/my_widgets.dart";
```

无论你引入了什么包，Dart 只会使用你在应用中使用的部件。

## 写一个和 React Native 中一样的 Hello World 应用

在 React Native 中，`HelloWorldApp`是`React.Component`的一个实现，并返回如下 view 组件实现。

```tsx
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App: FC = () => (
  <View style={styles.container}>
    <Text>Hello world!</Text>
  </View>
);

export default App;
```

在 Flutter 中，创建一个 Hello World 应用需要使用`Center`和`Text`核心部件，`Center`部件在部件树的根部件，并拥有唯一子部件`Text`。

```dart
import "package:flutter/material.dart";

main() {
  runApp(
    Center(
      child: Text(
        "Hello World!",
        textDirection: TextDirection.ltr,
      )
    )
  );
}
```

（卧槽，写 Hello World 还挺简短的，怕不是错觉...）

| Android                                                                                                                                                                | iOS                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Android展示样式](https://flutter.dev/assets/get-started/android/react-native/hello-world-basic-ed1ed2698fc492892552a8d719b0e124b7a50e2f8e0327f1548e2834b0aa515a.png) | ![iOS展示样式](https://flutter.dev/assets/get-started/ios/react-native/hello-world-basic-1ba3dfcb9fcbee11f5307cde947ab29dd4f52683f311b049242a28fefb37412b.png) |

这就是 Flutter 中最基础的应用，下一个部分将会利用 Flutter 丰富的组件库创建现代应用。

## 如何使用在部件树中增加部件

在 Flutter 中，几乎一切都是部件。

部件是创建用户界面的基础块。部件组成的层级结构叫做部件树。每个部件接入它的父部件，并继承它们的属性。即使应用对象本身也是个部件。并没有分离的"application"对象，根部件就是它。

一个部件可以定义如下内容：

- 一个有结构的元素 —— 如一个按钮或菜单。
- 一个样式元素 —— 如字体或者颜色方案。
- 一个布局或视角 —— 如边距或者对齐。

如下的例子使用 Material Design 创建部件，在此例子中，部件树链接在`MaterialApp`跟部件下。

```dart
import "package:flutter/material.dart";

Widget MyApp() {
  return MaterialApp(
    title: "Welcome to Flutter",
    home: Scaffold(
      appBar: AppBar(
        title: Text("Welcome to Flutter"),
      ),
      body: Center(
        child: Text("Hello world"),
      ),
    ),
  );
}

main() => runApp(MyApp());
```

如下是使用 Material Design 部件创建的 “Hello world!” 应用。

| Android                                                                                                                                                                             | iOS                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Adroid Material Design Hello World](https://flutter.dev/assets/get-started/android/react-native/hello-world-198f4b19ca6d3dd72f6a17dd858814cc42cf2bc696f61d7f273be95818110777.png) | ![iOS Material Design Hello World](https://flutter.dev/assets/get-started/ios/react-native/hello-world-ed7cf47213953bfca5eaa74fba63a78538d782f2c63a7c575068f3c2f7298bde.png) |

写应用的时候，会使用到两种部件`StatelessWidget`和`StatefulWidget`（上面我写的就是`StatelessWidget`不过没有按照面向对象的写法去写）。一个`StatelessWidget`是一个没有状态的部件，它一旦被创建就不会改变。一个`StatefulWidget`会基于数据变化或者用户输入动态改变。

`StatelessWidget`和`StatefulWidget`二者的最大不同点，就是`StatefulWidget`拥有一个`State`对象来存储数据，以避免在部件树渲染的时候丢失。

在简单的项目中，写部件树是容易的，但是当代码变多之后，应用会越来越复杂，你应该将很深的部件封装成函数或者简单的类。创建封装好的函数和类有利于在复杂项目中实现复用。

## 如何创建可复用的组件

在 React Native 中，创建一个可复用的组件，并使用`props`向它传入属性和值。在如下的例子中，`CustomCard`就是个可复用组件。

```tsx
const CustomCard: FC<{ index?: number; onPress?: () => void }> = ({
  index,
  onPress,
}) => (
  <View>
    <Text>Card {index}</Text>
    <Button title="Press" onPress={() => onPress()} />
  </View>
);

// Usage
<CustomCard onPress={() => console.log(1)} index={1} />;
```

在 Flutter 中，可以通过创建一个后浪于（怎么样，这说法阳春不？）部件的类，并实现它的`build`函数，你也可以创建一个函数并复用它。

```dart
Widget CustomCard({int index, Function onPress}) {
  return Card(
    child: Column(
      children: <Widget>[
        Text('Card $index'),
        FlatButton(
          child: const Text('Press'),
          onPress: onPress,
        ),
      ],
    ),
  );
}

// Usage
CustomCard(index = 1, onPress = () { print('Card 1'); })
```

以上`CustomCard`参数的大括号是 Dart[可选参数](https://dart.dev/guides/language/language-tour#optional-parameters)。

在类的构造函数中，可以使用`@required`实现必要参数。

如下截图是`CustomCard`的展示效果。

| Android                                                                                                                                                              | iOS                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Android CustomCard](https://flutter.dev/assets/get-started/android/react-native/custom-cards-6bdba4664044a9e5328c0304a51c45fc2812bb37b3d0d57b0c93b98d5bab1f42.png) | ![iOS CustomCard](https://flutter.dev/assets/get-started/ios/react-native/custom-cards-47e3e1e3e73a0ce419eacbee11dc2f15b9acac9b5877c43cd1a783a792b519dc.png) |
