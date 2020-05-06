---
type: post
category: fe
tag:
  - react-native
  - flutter
  - dart
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
