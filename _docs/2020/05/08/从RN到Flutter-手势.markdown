---
type: post
category: fe
tag:
  - React-Native
  - flutter
series:
  name: 从RN到Flutter
  slug: Flutter-for-RN-devs
  number: 7
---

# 从 RN 到 Flutter-手势

Flutter 支持点击、拖动和放大缩小手势。Flutter 中的手势系统有两个独立层。第一层包括指针事件，描述指针在屏幕中的的位置和运动（比如触摸、鼠标和笔操作）。第二层包括手势，描述一连串指针运动所表示的语义内容。

## 如何监听部件的点击事件

在 React Native，通过监听`Touchable`组件的`PanResponder`监听。

```jsx
// React Native
<TouchableOpacity
  onPress={() => {
    console.log("Press");
  }}
  onLongPress={() => {
    console.log("Long Press");
  }}
>
  <Text>Tap or Long Press</Text>
</TouchableOpacity>
```

[PanResponder](https://facebook.github.io/react-native/docs/panresponder.html)用于处理更复杂的手势。

```jsx
// React Native
class App extends Component {
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        !!getDirection(gestureState),
      onPanResponderMove: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        const drag = getDirection(gestureState);
      },
      onPanResponderTerminationRequest: (event, gestureState) => true,
    });
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <View style={styles.center}>
          <Text>Swipe Horizontally or Vertically</Text>
        </View>
      </View>
    );
  }
}
```

在 Flutter 中，为部件添加点击事件，则使用部件的`onPress`参数，或者通过使用[GestureDetector](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html)封装任意部件。

```dart
GestureDetector(
  child: Scaffold(
    appBar: AppBar(
      title: Text('Gestures'),
    ),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text('Tap, Long Press, Swipe Horizontally or Vertically '),
        ],
      )
    ),
  ),
  onTap: () {
    print('Tapped');
  },
  onLongPress: () {
    print('Long Pressed');
  },
  onVerticalDragEnd: (DragEndDetails value) {
    print('Swiped Vertically');
  },
  onHorizontalDragEnd: (DragEndDetails value) {
    print('Swiped Horizontally');
  },
);
```

想了解`GestureDetector`的更多回调，查看[GestureDetector 类](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html#instance-properties)。

| Android GestureDetector                                                                                                                                                      | iOS GestureDetector                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Andoid GestureDetector](https://flutter.dev/assets/get-started/android/react-native/flutter-gestures-b13848f4fe7f96b49f3dc482c39a6404d0b55a1551552acbecce8f9f82f8f7d5.gif) | ![iOS GestureDetector](https://flutter.dev/assets/get-started/ios/react-native/flutter-gestures-0e5609c5c5f7c14da61ac3167ff4ad613fa2dd478a5dd34caa86e6ce400995b2.gif) |
