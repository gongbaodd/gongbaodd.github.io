---
type: post
category: fe
tag:
  - React-Native
  - flutter
series:
  name: 从RN到Flutter
  slug: Flutter-for-RN-devs
  number: 8
---

# 从 RN 到 Flutter-动画

好的动画会使 UI 更加直观，是应用更加精致，并提高用户体验。Flutter 的动画使简单动画和复杂动画的实现变得容易。Flutter SDK 所遵守的 Material 设计语言包含了标准的动态效果，你可以简单地自定义它们并应用于你的应用。

在 React Native 中，Animated API 被应用于创建动画。

在 Flutter 中，使用[Animation](https://api.flutter.dev/flutter/animation/Animation-class.html)类和[AnimationController](https://api.flutter.dev/flutter/animation/AnimationController-class.html)类。`Animation`是包括一个动画初始状态到它终态（完成或者取消）状态的抽象类。`AnimationController`类控制动画的执行、反转或者停止动画，乃至于设置动画为某一个值以做到自定义的目的。

## 实现一个淡入动画

下面的 React Native 例子是利用 Animated API 创建的`FadeInView`组件。初始状态、终止状态已经过程都需要定义。该组件包裹需要动画的组件，透明值`fadeAnim`向下继承到`Text`组件中，使得执行`start()`后，动画就开始了。

```js
// React Native
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  };
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 10000
    }).start();
  }
  render() {
    return (
      <Animated.View style={{...this.props.style, opacity: this.state.fadeAnim }} >
        {this.props.children}
      </Animated.View>
    );
  }
}
    ...
<FadeInView>
  <Text> Fading in </Text>
</FadeInView>
    ...
```

想在 Flutter 中实现相应效果，需要创建一个 [AnimationController](https://api.flutter.dev/flutter/animation/AnimationController-class.html) 对象，命名为`controller`并指明持续时间。默认`AnimationController`会在持续时间内线性执行动画。这个动画控制器在每一帧都会返回一个新值，默认是每秒 60 个值。

使用`AnimationController`时，必须传入`vsync`对象。引入`vsync`的目的是避免不在屏幕上的动画浪费资源。你可以使用你的状态机作为`vsync`，只要在类定义的时候混入`TickerProviderStateMixin`。一个`AnimationController`构造时需要一个 TickerProvider 作为`vsync`参数。

[Tween](https://api.flutter.dev/flutter/animation/Tween-class.html)描述初始值和结束值之间的插值。动画中使用`Tween`对象，可以将`Tween`的`animate()`返回值传给要修改的`Animation`对象。

使用`controller.forward()`开始动画。其他操作如`fling()`和`repeat()`也可以开始动画。比如下面的例子，将[FlutterLogo](https://api.flutter.dev/flutter/material/FlutterLogo-class.html)部件放在`FadeTransition`部件中。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(Center(child: LogoFade()));
}

class LogoFade extends StatefulWidget {
  _LogoFadeState createState() => _LogoFadeState();
}

class _LogoFadeState extends State<LogoFade> with TickerProviderStateMixin {
  Animation animation;
  AnimationController controller;

  initState() {
    super.initState();
    controller = AnimationController(
        duration: const Duration(milliseconds: 3000), vsync: this);
    final CurvedAnimation curve =
    CurvedAnimation(parent: controller, curve: Curves.easeIn);
    animation = Tween(begin: 0.0, end: 1.0).animate(curve);
    controller.forward();
  }

  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: animation,
      child: Container(
        height: 300.0,
        width: 300.0,
        child: FlutterLogo(),
      ),
    );
  }

  dispose() {
    controller.dispose();
    super.dispose();
  }
}
```

也可以把动画的实现封装成 hook。

```dart
Animation useFadeIn() {
  final ticker = useSingleTickerProvider();
  final controller = useMemoized(() => AnimationController(
      duration: const Duration(milliseconds: 3000), vsync: ticker));
  final animation = useMemoized(() => Tween(begin: 0.0, end: 1.0)
      .animate(CurvedAnimation(parent: controller, curve: Curves.easeIn)));

  useEffect(() {
    controller.forward();
    return () => controller.dispose();
  });

  return animation;
}
```

| Android fadeIn                                                                                                                                                   | iOS fadeIn                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Android fadeIn](https://flutter.dev/assets/get-started/android/react-native/flutter-fade-241787290a9da1d7406516a96845a65c42c97b5a8219f4ff29f0c3412ab281ba.gif) | ![iOS fadeIn](https://flutter.dev/assets/get-started/ios/react-native/flutter-fade-2596d382757ecf7c4a2db020871d715da585db9fabed9956cbff6ef011b2786b.gif) |

## 为卡片增加滑动关闭动画

在 React Native 里，可以使用如`PanResponder`或者第三方库实现华东关闭。

在 Flutter 中，为部件增加滑动动画可以使用[Dismissible](https://api.flutter.dev/flutter/widgets/Dismissible-class.html)部件。

```dart
child: Dismissible(
  key: key,
  onDismissed: (DismissDirection dir) {
    cards.removeLast();
  },
  child: Container(
    ...
  ),
),
```

| Android Dismissable                                                                                                                                                 | iOS dismissable                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Android Dissmisable](https://flutter.dev/assets/get-started/android/react-native/card-swipe-20a57fe25c2e274bfbe0e9f3d4d1aebd5443fc9d2ce81bd6e9d2588e94e28b16.gif) | ![iOS Dismissible](https://flutter.dev/assets/get-started/ios/react-native/card-swipe-ed0bd70d7698b81793f2a44bea69ddf51be44ac486e8410961aabff16176e3ce.gif) |

啊啊啊啊，这个系列翻译完了！！！后面还有一个 Flutter 和 React Native 组件的[对照表格](https://flutter.dev/docs/get-started/flutter-for/react-native-devs#react-native-and-flutter-widget-equivalent-components)，我就不贴上来了。
