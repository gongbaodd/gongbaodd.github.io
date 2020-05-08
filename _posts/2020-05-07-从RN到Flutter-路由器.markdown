---
type: post
category: fe
tag:
  - React-Native
  - flutter
series:
  name: 从RN到Flutter
  slug: Flutter-for-RN-devs
  number: 6
---

# 从 RN 到 Flutter-路由器

> 我要死了，这个系列怎么这么长。

许多应用都有多个页面来展示不同信息。比方说，你可能在页面展示一个产品的图片，当用户点击时打开这个产品的详情。

在 Android，新的页面叫做 Activities。在 iOS 新的页面叫 ViewControllers，在 Flutter，新的页面也是部件！包括导航至这些页面的导航器也是导航器部件。

## 如何在页面中导航

在 React Native 里面，有三个导航器`StackNavigator`，`TabNavigator`和`DrawerNavigator`。都提供了配置的接口。

```js
// React Native
const MyApp = TabNavigator(
  { Home: { screen: HomeScreen }, Notifications: { screen: tabNavScreen } },
  { tabBarOptions: { activeTintColor: "#e91e63" } }
);
const SimpleApp = StackNavigator({
  Home: { screen: MyApp },
  stackScreen: { screen: StackScreen },
});
export default MyApp1 = DrawerNavigator({
  Home: {
    screen: SimpleApp,
  },
  Screen2: {
    screen: drawerScreen,
  },
});
```

在 Flutter 中，有两个部件用于处理页面路由。

- `Route` 是页面的抽象。
- `Navigator` 是管理路由的部件。

`Navigator`通过将一列页面以堆的方式覆盖，并提供方法管理这个堆，像是[Navigator.push](https://api.flutter.dev/flutter/widgets/Navigator/push.html)和[Navigator.pop](https://api.flutter.dev/flutter/widgets/Navigator/pop.html)。[MaterialApp](https://api.flutter.dev/flutter/material/MaterialApp-class.html) 部件提供 routes 参数接受这些路由，这些路由可能会明确指出或者动态生成，比如标题动画。下面是一个指明路由的例子。

```dart
class App extends StatelessWidget{
    Widget build(BuildContext: context) {
        return MaterialApp(
           routes: <String, WidgetBuilder> {
                '/a': (BuildContext: context) => usualNavscreen(),
                '/b': (BuildContext: context) => drawerNavscreen(),
          },
       ),
    }
}
```

使用`Navigator.of()`并指定一个`BuildContext`来处理导航，比如前往某个特定页面，可以使用`pushNamed`。

```dart
Navigator.of(context).pushNamed('/a');
```

你可以使用`push`方法调用已存在的[Route](https://api.flutter.dev/flutter/widgets/Route-class.html)，这样会动画打开 Route。下面的例子中[MaterialPageRoute](https://api.flutter.dev/flutter/material/MaterialPageRoute-class.html)提供一个模态的页面，并适配系统动画。

```dart
Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)
 => UsualNavscreen()));
```

## 如何使用选项卡和抽屉导航

在 Material 设计语言中，为 Flutter 提供了两种导航选项，tab 和 drawer。如果空间使用 tab 很紧张，则 drawer 是个不错的替代。

### 选项卡导航

在 React Native 中，`createBottomTabNavigator`和`TabNavigation`被用来处理选项卡和导航。

```js
import { createBottomTabNavigator } from "react-navigation";

const MyApp = TabNavigator(
  { Home: { screen: HomeScreen }, Notifications: { screen: tabNavScreen } },
  { tabBarOptions: { activeTintColor: "#e91e63" } }
);
```

Flutter 提供特别的部件处理抽屉和选项卡导航。

- [TabController](https://api.flutter.dev/flutter/material/TabController-class.html)

  提供`TabBar`和`TabBarView`的控制器

- [TabBar](https://api.flutter.dev/flutter/material/TabBar-class.html)

  展示横向的选项卡

- [Tab](https://api.flutter.dev/flutter/material/Tab-class.html)

  展示 Material 设计语言的单一选项

- [TabBarView](https://api.flutter.dev/flutter/material/TabBarView-class.html)

  展示选中的选项卡

```dart
TabController controller = TabController(length: 2, vsync: this);

TabBar(
    tabs: <Tab>[
        Tab(icon: Icon(Icons.person),),
        Tab(icon: Icon(Icons.email),),
    ],
    controller: controller,
),
```

一个`TabController`用于协调`TabBar`和`TabBarView`。构造参数中的`length`属性，提供选项卡的个数。一个`TickerProvider`被用来处理框架状态变化的消息的，通过`vsync`传入。`vsync:this`参数是创建`TabController`必要的。

[TickerProvider](https://api.flutter.dev/flutter/scheduler/TickerProvider-class.html)是可以产生[Ticker](https://api.flutter.dev/flutter/scheduler/Ticker-class.html)对象的类的接口。Ticker 是可以用来接收框架消息的对象，但是他们基本上都是间接通过[AnimationController](https://api.flutter.dev/flutter/animation/AnimationController-class.html)。`AnimationController`需要`TickerProvider`来获取`Ticker`对象。如果你正在从 State 里面创建一个 AnimationController，你可以使用[TickerProviderStateMixin](https://api.flutter.dev/flutter/widgets/TickerProviderStateMixin-mixin.html)或者[SingleTickerProviderStateMixin](https://api.flutter.dev/flutter/widgets/SingleTickerProviderStateMixin-mixin.html)对象以得到`TrickerProvider`。如果你用的是`flutter-hooks`你可以使用`useSingleTickerProvider`获取`Ticker`对象。

[Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html)部件封装了一个新的`TabBar`部件并创建两个选项卡。`TabBarView`部件通过`body`参数传入。所有页面的`TabBar`都是`TabBarView`部件的子部件。

```dart
class Home extends StatefulWidget {
  Home() : super();
  @override
  State<StatefulWidget> createState() {
    return _Home();
  }
}

class _Home extends State<Home> with SingleTickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    TabController controller = TabController(length: 2, vsync: this);
    return Scaffold(
        appBar: AppBar(
          title: Text('home'),
        ),
        bottomNavigationBar: Material(
          color: Colors.blue,
          child: TabBar(
            controller: controller,
            tabs: <Tab>[
              Tab(
                icon: Icon(Icons.person),
              ),
              Tab(
                icon: Icon(Icons.email),
              )
            ],
          ),
        ),
        body: TabBarView(
          children: <Widget>[
            Center(
              child: Text('person'),
            ),
            Center(
              child: Text('email'),
            )
          ],
          controller: controller,
        ));
  }
}

```

当然也可以使用`flutter-hooks`，其实如果收拾一下的话都要写两个类，就看你爱怎么写了。

```dart
class Home extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final vsync = useSingleTickerProvider();
    final controller = useMemoized(() {
      return TabController(length: 2, vsync: vsync);
    });

    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      bottomNavigationBar: Material(
        color: Colors.blue,
        child: TabBar(
          controller: controller,
          tabs: <Widget>[
            Tab(icon: Icon(Icons.person)),
            Tab(icon: Icon(Icons.email))
          ],
        ),
      ),
      body: TabBarView(
        controller: controller,
        children: <Widget>[
          Center(child: Text("person")),
          Center(
            child: Text("email"),
          )
        ],
      ),
    );
  }
}

```

## 抽屉导航

在 React Native 中，需要引入`react-navigation`包，并使用`createDrawerNavigator`和`DrawerNavigation`。

```js
export default MyApp = DrawerNavigator({
  Home: {
    screen: SimpleApp,
  },
  Screen2: {
    screen: drawScreen,
  },
});
```

在 Flutter 中，我们可以使用`Drawer`部件结合`Scaffold`部件创建 Material 设计语言的抽屉。想要创建一个带有抽屉的应用，需要将`Drawer`封装至`Scaffold`中。`Scaffold`部件提供一套基于[Material 设计标准](https://material.io/design)的样式结构，并且还支持许多特殊的 Material 设计组件，比如`Drawer`、`AppBar`和`SnackBar`。

`Drawer`部件是一个基于 Material 设计的控制台，它在`Scaffold`水平方向的边缘，展示应用的导航链接。你可以在这个部件中使用[RaisedButton](https://api.flutter.dev/flutter/material/RaisedButton-class.html)和[Text](https://api.flutter.dev/flutter/widgets/Text-class.html)组件，或者一个列表。在下面的例子中[ListTile](https://api.flutter.dev/flutter/material/ListTile-class.html)就提供了点击导航的功能。

```dart
// Flutter
Drawer(
  child:ListTile(
    leading: Icon(Icons.change_history),
    title: Text('Screen2'),
    onTap: () {
      Navigator.of(context).pushNamed('/b');
    },
  ),
  elevation: 20.0,
),
```

在`Scaffold`部件的`AppBar`会自动适配给`Drawer`一个图标，并且`Scaffold`能够自动处理`Drawer`的左滑手势。

```dart
// Flutter
@override
Widget build(BuildContext context) {
  return Scaffold(
    drawer: Drawer(
      child: ListTile(
        leading: Icon(Icons.change_history),
        title: Text('Screen2'),
        onTap: () {
          Navigator.of(context).pushNamed('/b');
        },
      ),
      elevation: 20.0,
    ),
    appBar: AppBar(
      title: Text('Home'),
    ),
    body: Container(),
  );
}
```

另外，如果不爽页面转场动画单一，然后自己又懒得写动画，可以直接用[page_transition](https://pub.dev/packages/page_transition)包。

| Android Drawer                                                                                                                                                 | iOS Drawer                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Android Drawer](https://flutter.dev/assets/get-started/android/react-native/navigation-98906732ed22d9aa8e0ce0eb846dbcc7d24c123ad026c359f9f7fcc44ba99230.gif) | ![iOS Drawer](https://flutter.dev/assets/get-started/ios/react-native/navigation-1939f60628bec820bad0fe88d58c562984c1c00d8cfd755a4135f4321a37417e.gif) |
