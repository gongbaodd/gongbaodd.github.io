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
