---
type: post
category: fe
tag:
  - React-Native
  - flutter
series:
  name: 从RN到Flutter
  slug: Flutter-for-RN-devs
  number: 5
---

# 从 RN 到 Flutter-数据

## Props

在 React Native 中，大多组件可以由不同的参数和属性自定义，这些配置叫做`props`。这些参数可以使用`this.props`访问。

```jsx
// React Native
class CustomCard extends React.Component {
  render() {
    return (
      <View>
        <Text> Card {this.props.index} </Text>
        <Button
          title='Press'
          onPress={() => this.props.onPress(this.props.index)}
        />
      </View>
    );
  }
}
class App extends React.Component {

  onPress = index => {
    console.log('Card ', index);
  };

  render() {
    return (
      <View>
        <FlatList
          data={[ ... ]}
          renderItem={({ item }) => (
            <CustomCard onPress={this.onPress} index={item.key} />
          )}
        />
      </View>
    );
  }
}
```

在 Flutter 中，你可以定义一个`final`标注的本地变量，并作为构造器的参数使用。

```dart
// Flutter
class CustomCard extends StatelessWidget {

  CustomCard({@required this.index, @required this.onPress});
  final index;
  final Function onPress;

  @override
  Widget build(BuildContext context) {
  return Card(
    child: Column(
      children: <Widget>[
        Text('Card $index'),
        FlatButton(
          child: const Text('Press'),
          onPressed: this.onPress,
        ),
      ],
    ));
  }
}
    ...
//用法
CustomCard(
  index: index,
  onPress: () {
    print('Card $index');
  },
)
```

| Android Props                                                                                                                                              | iOS Props                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Android Props](https://flutter.dev/assets/get-started/android/react-native/modular-6bdba4664044a9e5328c0304a51c45fc2812bb37b3d0d57b0c93b98d5bab1f42.png) | ![iOS Props](https://flutter.dev/assets/get-started/ios/react-native/modular-47e3e1e3e73a0ce419eacbee11dc2f15b9acac9b5877c43cd1a783a792b519dc.png) |

## 本地存储

如果你不需要存储很多数据那么也不必需要数据结构，你可以使用`shared_preferences`，它允许你以键值对的形式存储基础数据，诸如：布尔值，浮点型，整型，长浮点型和字符串。

### 如何存储键值对

在 React Native 中，需要使用`setItem`和`getItem`函数并使用`AsyncStorage`类存储和取出数据。

```jsx
await AsyncStorage.setItem("counterKey", json.stringify(++this.state.counter));
const counter = await AsyncStorage.getItem("counterKey");
if (counterKey) {
  this.setState({ counter });
}
```

在 Flutter 中，`shared_preferences`插件是用来存储和取出数据的。它封装了 iOS 的`NSUserDefault`和 Android 的`SharedPreference`，提供了简单数据的存储功能。需要在`pubspec.yaml`中增加`shared_preference`依赖以使用。

```yaml
dependencies:
  flutter:
    sdk: flutter
  shared_preferences: ^0.4.3
```

```dart
import 'package:shared_preferences/shared_preferences.dart';
```

使用`SharedPreferences`类来实现数据存储。基础类型存在特有的设置访问器如`setInt`，`setBool`和`setString`。读取数据也有对应的访问器如`getInt`，`getBool`和`getString`。

```dart
SharedPreferences prefs = await SharedPreferences.getInstance();
_counter = prefs.getInt('counter');
prefs.setInt('counter', ++_counter);
setState(() {
  _counter = _counter;
});
```
