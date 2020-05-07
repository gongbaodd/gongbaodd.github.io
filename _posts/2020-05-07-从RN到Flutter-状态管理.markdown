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

`AboutDialog`、`CircleAvater`和`Text`都是`StatelessWidget`的子类。

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
- 当它继承的部件变化

## StatefulWidget
