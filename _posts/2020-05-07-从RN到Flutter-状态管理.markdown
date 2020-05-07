---
type: post
category: fe
tag:
  - React-Native
  - flutter
series:
  name: 从RN到Flutter
  slug: Flutter-for-RN-devs
  number: 4
---

# 从 RN 到 Flutter-状态管理

状态机是部件在生命期同步访问的信息。Flutter 使用`StatefulWidget`实现状态管理。

## StatelessWidget

Flutter 中，一个`StatelessWidget`不需要管理内部状态。

一个无状态部件对于不依赖于非默认设置和通过`BuildContext`传入的情况下的用户界面非常有用。

[AboutDialog](https://api.flutter.dev/flutter/material/AboutDialog-class.html)、[CircleAvater](https://api.flutter.dev/flutter/material/CircleAvatar-class.html)和[Text](https://api.flutter.dev/flutter/widgets/Text-class.html)都是[StatelessWidget](https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html)的子类。

```dart
import "package:flutter/material.dart";

main() => runApp(
    MyWidget(text: "Stateless Example"),
);

class MyWidget extends StatelessWidget {
    final String text;
    MyWidget({ Key key, @required this.text }) : super(key: key);
    Widget build(BuildContext context) {
        return Center(
            child: Text(
                text,
                textDirection: TextDirection.ltr,
            ),
        );
    }
}
```

上面的例子传入`text`到`MyWidget`类的构造器，并以`final`标注。这个类基于`StatelessWidget`——它包含不变数据。

`build`方法会在以下三种情况下执行：

- 当部件加入到一个树中
- 当部件的父部件变化
- 当依赖的[InheritedWidget](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html)变化

## StatefulWidget

一个`StatefulWidget`是会变化状态的部件，它使用`setState`方法来管理状态。通过调用`setState()`去通知 Flutter 状态发生改变，并触发应用执行`build()`方法来渲染变化。

*状态*是部件在生命空间里能同步获取到可变数据。部件的实现者有责任保证部件准确接收到状态的变化。当部件可以动态变化时需要使用`StatefuWidget`。比方说，填写一个表单、移动一格滑块或者会随着时间变化的事——如数据更新使 UI 变化。

[Checkbox](https://api.flutter.dev/flutter/material/Checkbox-class.html), [Radio](https://api.flutter.dev/flutter/material/Radio-class.html), [Slider](https://api.flutter.dev/flutter/material/Slider-class.html), [InkWell](https://api.flutter.dev/flutter/material/InkWell-class.html), [Form](https://api.flutter.dev/flutter/widgets/Form-class.html)和[TextField](https://api.flutter.dev/flutter/material/TextField-class.html)
都是[StatefulWidget](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html)的子类。

下面的例子是一个`StatefulWidget`，它需要使用`createState()`方法去实现一个它的状态机`_MyStatefulWidgetState`。

```dart
class MyStatefulWidget extends StatefulWidget {
  MyStatefulWidget({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}
```

下面的类，`_MyStatefulWidgetState`，为部件实现了一个`build()`方法。当状态变化时，比如说，用户点击了按钮，`setState()`会被调用修改变量。并触发框架重建 UI。

```dart
class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  bool showtext=true;
  bool toggleState=true;
  Timer t2;

  void toggleBlinkState(){
    setState((){
      toggleState=!toggleState;
    });
    var twenty = const Duration(milliseconds: 1000);
    if(toggleState==false) {
      t2 = Timer.periodic(twenty, (Timer t) {
        toggleShowText();
      });
    } else {
      t2.cancel();
    }
  }

  void toggleShowText(){
    setState((){
      showtext=!showtext;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            (showtext
              ?(Text('This execution will be done before you can blink.'))
              :(Container())
            ),
            Padding(
              padding: EdgeInsets.only(top: 70.0),
              child: RaisedButton(
                onPressed: toggleBlinkState,
                child: (toggleState
                  ?( Text('Blink'))
                  :(Text('Stop Blinking'))
                )
              )
            )
          ],
        ),
      ),
    );
  }
}
```

## 状态部件的最佳实践

设计部件时需要考虑一些事情。

1. 考虑是要用`StatefulWidget`还是用`StateleddWidget`。

   在 Flutter 中，部件或是有状态或是无状态主要依赖于它的状态是否改变。

   - 如果部件会变——用户会与它交互或者数据更新会修改 UI，那它就是有状态的。
   - 如果部件是确定的或者不变的那它就是无状态的。

2. 决定用哪个对象管理部件状态。

   - 部件管理自己的状态
   - 父部件管理子部件的状态
   - 以上两者都有

   当考虑时，需要遵守以下原则：

   - 如果状态是用户数据，如勾选框是否被勾选或者滑块的位置，那最好由父部件管理状态。
   - 如果状态是优化交互，如动画，则最好由自己管理状态。
   - 只要有疑问，放到父组件管理状态是更好的选择。

3. StatefulWidget 的子类和状态

   `MyStatefulWidget`类管理自己的状态——它继承自`StatefulWidget`，并重载`createState()`方法来创建状态，框架会调用`createState()`来建造部件。就像上面的例子，`createState()`创建一个`_MyStatefulWidgetState`实例。

   ```dart
   class MyStatefulWidget extends StatefulWidget {
      MyStatefulWidget({Key key, this.title}) : super(key: key);
      final String title;

      @override
      _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
    }

    class _MyStatefulWidgetState extends State<MyStatefulWidget> {

      @override
      Widget build(BuildContext context) {
          ...
      }
    }
   ```

4. 把部件应用于部件树

   ```dart
   class MyStatelessWidget extends StatelessWidget {
   // This widget is the root of your application.

   @override
   Widget build(BuildContext context) {
     return MaterialApp(
       title: 'Flutter Demo',
       theme: ThemeData(
         primarySwatch: Colors.blue,
       ),
       home: MyStatefulWidget(title: 'State Change Demo'),
     );
   }
   }
   ```

| Android StatedulWidget                                                                                                                                                    | iOS StatefulWidget                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Android StatedulWidget ](https://flutter.dev/assets/get-started/android/react-native/state-change-f7c0c14b9e1e2685b25c9e42f42a8d35ea9be544bbae3849579283bc631d9e26.gif) | ![iOS StatefulWidget](https://flutter.dev/assets/get-started/ios/react-native/state-change-f25a8c982e6cddbb81b069c8e2acb9de5cb62c66bba2be2ff79e08269d4e6add.gif) |

## flutter_hooks

[flutter_hooks](https://pub.dev/packages/flutter_hooks)是一个第三方库，参考 react-hooks 实现的`HookWidget`，最大的好处就是少写很多冗余代码和冗余的类。

就像上面的例子，可以写成如下类。

```dart
class Home extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final showText = useState<bool>(false);

    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            showText.value ? Text('Hello') : Container(),
            Padding(
              padding: EdgeInsets.only(top: 70.0),
              child: RaisedButton(
                onPressed: () {
                  print("clicked");
                  showText.value = !showText.value;
                },
                child: Text('show Text'),
              ),
            )
          ],
        ),
      ),
    );
  }
}
```
