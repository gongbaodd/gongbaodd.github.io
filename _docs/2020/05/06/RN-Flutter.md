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
  number: 4
---

# 从 RN 到 Flutter-部件

在 Flutter 中，你应该使用部件去描述针对于现有状态和配置的界面。

部件是由许多很小或者单一目的的部件组成。比如`Container`部件就包括几个相关布局、绘制、定位和定型组件，像是`LimitedBox`、`ConstrainedBox`、`Align`、`Padding`、`DecoratedBox`以及`Transform`部件。除了使用`Container`来实现效果，你也可以用几个组件来实现它。

`Center`部件是另一个控制布局的例子。想要剧中部件，就用`Center`包住它。这些部件没有自己的展示，他们的目标就是控制内部部件的布局。想要理解部件是如何渲染，可以去查看他们的相邻部件。

了解更多信息，可以查看[Flutter 技术概览](https://flutter.dev/docs/resources/technical-overview)。

想要了解更多部件信息，可以查看[Flutter 基础部件](https://flutter.dev/docs/development/ui/widgets/basics)，[Flutter 部件目录](https://flutter.dev/docs/development/ui/widgets) 或者 [Flutter 部件索引](https://flutter.dev/docs/reference/widgets)。

## 界面

### Flutter 中的 `View` 组件

在 React Native 中，`View`是支持`Flexbox`布局、样式处理、触摸处理和无障碍化的组件。

在 Flutter 中，你可以使用诸如`Container`、`Column Row`和`Center`的核心布局部件。更多信息可以参考[布局部件](https://flutter.dev/docs/development/ui/widgets/layout)目录。

### Flutter 中的 `FlatList` 和 `SectionList` 组件

一个`List`是垂直排布的可滚动列表。

在 React Native 中，`FlatList`和`SectionList`可以用来渲染简单的或者复杂内容的列表。

```tsx
<FlatList data={[]} renderItem={({ item }) => <Text>{item.key}</Text>} />
```

`ListView`是 Flutter 中最常被使用的滚动部件。默认的构造器接受一列准确定义的数据。`ListView`适合少量个数部件渲染。对于无限滚动，需要使用`ListView.builder`，它会按需渲染，并之渲染能展示出来的数据。

```dart
var data = [];
ListView.builder(
    itemCount: data.length,
    itemBuilder: (context, int index) {
        return Text(data[index]);
    },
);
```

| Adroid ListVIew                                                                                                                                                | iOS ListView                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Android ListView](https://flutter.dev/assets/get-started/android/react-native/flatlist-91d7c8beaadff16f52d663e94aae7b4c9959d1d811dd7f12ea2005a10e166d34.gif) | ![iOS ListView](https://flutter.dev/assets/get-started/ios/react-native/flatlist-2a18c0173248dd8bf250b29fab7e4cdbc917c27d90ac33c1c791ecb73463f3a5.gif) |

阅读[你的第一个 Flutter 应用，第一部分](https://codelabs.developers.google.com/codelabs/first-flutter-app-pt1)更多了解如何实现无限滚动。

### 如何使用画布

在 React Native 中是没有相关组件的，需要引入类似于`react-native-canvas`的第三方组件。

```tsx
const App = () => {
  return (
    <View>
      <Canvas
        ref={(canvas) => {
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "skyblue";
          ctx.beginPath();
          ctx.arc(75, 75, 50, 0, 2 * Math.PI);
          ctx.fillRect(150, 100, 300, 300);
          ctx.stroke();
        }}
      />
    </View>
  );
};
```

在 Flutter 中，你可以使用`CustomPaint`和`CustomPainter`类去绘制画布。

下面的例子展示的是如何使用`CustomPaint`部件绘制。它实现了虚类 `CustomPainter`，并传递了 `CustomPaint` 的属性。`CustomPaint` 的子类必须实现 `paint()` 和 `shouldRepaint()` 方法。

```dart
class MyCanvasPainter extends CustomPainter {
    paint(Canvas anvas, Size size) {
        {
            Paint paint = Paint();
            paint.color = Colors.amber;
            canvas.drawCircle(Offset(100.0, 200.0), 40.0, paint);
        }
        {
            Paint paint = Paint();
            paint.color = Colors.lightBlue;
            Rect rect = Rect.fromPoints(Offset(150.0, 300.0), Offset(300.0, 400.0));
            canvas.drawRect(rect, paintRect);
        }
    }
    shouldRepaint() => false;
}

Widget getCanvas() {
    return Scaffold(
        body: CustomPaint(
            paint: MyCanvasPainter(),
        ),
    );
}
```

| Android CustomPaint                                                                                                                                             | iOS CustomPaint                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Android CustomPaint](https://flutter.dev/assets/get-started/android/react-native/canvas-cf039fc10bae17fb60b21adb4228eb928b2bf284f95fee71c5a20033c217e333.png) | ![iOS CustomPaint](https://flutter.dev/assets/get-started/ios/react-native/canvas-2cc207759f6ab912bf73e1c3298dc2183618ef207ed989f4d83f6c08fd3a3279.png) |

## 布局

### 如何使用布局部件

在 React Native，许多布局可以通过 props 传入。比如，你可以使用`View`的`style`属性去指定 flexbox 布局。想要让组件成列排列，可以指定样式为`flexDirection: "column"`。

```js
<View
    style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    }}
/>
```

在 Flutter 中，布局主要是由既定的布局部件和他们的参数实现。

举个例子，`Column`和`Row`组件接受一个数组作为参数来以列或者以行排列。一个`Container`部件既能处理样式也能处理布局，一个`Center`部件可以将组件居中。

```dart
Center(
    child: Column(
        children: <Widget> [
            Container(
                color: Colors.red,
                width: 100.0,
                height: 100.0,
            ),
            Container(
                color: Colors.blue,
                width: 100.0,
                height: 100.0
            ),
            Container(
                color: Colors.green,
                width: 100.0,
                height: 100.0,
            ),
        ],
    ),
)
```

Flutter 提供一堆布局部件，比方说，`Padding`、`Align`和`Stack`。

了解全部的布局部件，可以查看[布局部件](https://flutter.dev/docs/development/ui/widgets/layout)。

| Adroid Layout                                                                                                                                                    | iOS Layout                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Adroid Layout ](https://flutter.dev/assets/get-started/android/react-native/basic-layout-2490ba3bed87bbf579b422977dcaa34f51a5b77dab53abbd460028acda33a000.gif) | ![iOS Layout](https://flutter.dev/assets/get-started/ios/react-native/basic-layout-bb720a0054daf418b7bafb40619c490933b730f9e45bd9003254ea9d80d6c163.gif) |

### 如何堆叠部件

在 React Native，可以使用绝对定位`absolute`来堆叠组件。

Flutter 使用`Stack`部件让部件按照图层分布。部件会部分覆盖于下面的部件。

```dart
Stack(
    alignment: cont Alignment(0.6, 0.6),
    children: <Widget>[
        CircleAvatar(
            backgroundImage: NetworkImage(
                'https://avatars3.githubusercontent.com/u/14101776?v=4'
            )
        ),
        Container(
            decoration: BoxDecoration(
                color: Colors.black45,
            ),
            child: Text("Flutter"),
        ),
    ],
)
```

上面的例子使用`Stack`来布局一个`Container`并展示一个拥有黑色半透明背景的`Text`部件覆盖于`CircleAvatar`部件。这个部件通过对齐参数来规定文字位置。

| Android Stack                                                                                                                                            | iOS Stack                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Android Stack](https://flutter.dev/assets/get-started/android/react-native/stack-65e0c9e7fc3db73d80d3943f6e88fc788819b1ab4c1354c11e4711298e26ecd0.png) | ![iOS Stack](https://flutter.dev/assets/get-started/ios/react-native/stack-04b7bf2727e1eb71f5dfea8430ee833f24be1ced1893ae86270795b2ab76c5b9.png) |

更多信息可以查看`Stack`对象[文档](https://api.flutter.dev/flutter/widgets/Stack-class.html)。

## 样式

### 如何处理组件样式

在 React Native 中，内联样式和`stylesheets.create`是用来处理组件样式的。

```tsx
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

<View style={styles.container}>
  <Text style={{ fontSize: 32, color: "cyan", fontWeight: "600" }}>
    This is a simple text
  </Text>
</View>;
```

在 Flutter 中，`Text`部件可以使用`TextStyle`类，这个类的对象也可以给多个部件复用。

```dart
var textStyle = TextStyle(
    fontSize: 32.0,
    color: Colors.cyan,
    fontWeight: FontWeight.w600,
);

Center(
    child: Column(
        children: <Widget>[
            Text(
                'sample text',
                style: textStyle,
            ),
            Padding(
                padding: EdgeInsets.all(20.0),
                child: Icon(
                    Icons.lightbulb_outline,
                    size: 48.0,
                    color: Colors.redAccent,
                ),
            ),
        ],
    ),
)
```

| Android Style                                                                                                                                                     | iOS Style                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Android Style](https://flutter.dev/assets/get-started/android/react-native/flutterstyling-10cfb607a02859b2a1e9767237029b3cc47891fd017bd70d84536de26383b39c.gif) | ![iOS Style](https://flutter.dev/assets/get-started/ios/react-native/flutterstyling-8b812e5226435b0db6f72b4f2f03a7c72b45bf0794965a0bee882fea909fc7b8.gif) |

### 如何使用图标和颜色

React Native 没有支持图标的库（这点我不是很同意）。

在 Flutter 中，引入 Material 库包含一堆[Material 图标](https://api.flutter.dev/flutter/material/Icons-class.html)和[颜色](https://api.flutter.dev/flutter/material/Colors-class.html)。

```dart
Icon(Icons.lightbulb_outline, color: COlors.redAccent)
```

使用`Icons`类时，记住要把`uses-material-design: true`设置在`pubspec.yaml`中。这保证`MaterialIcons`字体会被包括在应用中。

```yaml
name: my_awesome_application
flutter:
  uses-material-design: true
```

Flutter 的[Cupertino](https://flutter.dev/docs/development/ui/widgets/cupertino)包，完全遵守 iOS 设计语言。要使用`CupertinoIcons`字体，在项目中增加`cupertino_icons`依赖。

```yaml
name: my_awesome_application
dependencies:
  cupertino_icons: ^0.1.0
```

要完全的自定义组件的色彩和样式，使用`ThemeData`来定义主题。设置`MaterialApp`的`ThemeData`对象。`Colors`类提供遵守 Material 设计语言的调色盘。

```dart
Widget build() {
    return MaterialApp(
        title: "Sample App",
        theme: ThemeData(
            primarySwatch: Colors.blue,
            textSelectionColor: Colors.red,
        ),
        home: SampleAppPage()
    );
}
```

### 如何增加主题样式

在 Ract Native，主题是组件定义好的。

在 Flutter 中，使用`ThemeData`类为整个`MaterialApp`部件提供主题。

```dart
Widget build() {
    return MaterialApp(
        title: "Sample App",
        theme: ThemeData(
            primarySwatch: Colors.blue,
            textSelectionColor: Colors.red,
        ),
        home: SampleAppPage()
    );
}
```

一个`Theme`甚至可以不依赖于`MaterialApp`部件。[Theme](https://api.flutter.dev/flutter/material/Theme-class.html)部件需要一个`ThemeData`传入它的`data`参数中，以适配它的所有子部件。

```dart
class SampleTheme extends StatelessWidget {
    Widget build(BuildContext context) {
      return Theme(
           data: ThemeData(
               primaryColor: Colors.cyan,
               brightness: brightness,
           ),
           child: Scaffold(
               backgroundColor: Theme.of(context).primaryColor,
           )
       )
    }
}
```
