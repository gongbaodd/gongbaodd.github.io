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

## HTTP 请求

在 Flutter 中，使用`http`包获取互联网的数据。

### 如何发起请求

React Native 提供 Fetch API 发起网络请求，通过使用 fetch 获得远端的返回值。

```js
// React Native
_getIPAddress = () => {
  fetch("https://httpbin.org/ip")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ _ipAddress: responseJson.origin });
    })
    .catch((error) => {
      console.error(error);
    });
};
```

在 Flutter 中，需要安装`http`包，先修改`pubspec.yaml`文件。

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: <latest_version>
```

代码里引入[dart:io](https://api.flutter.dev/flutter/dart-io/dart-io-library.html)核心 HTTP 支持来创建 HTTP 终端。

```dart
import "dart:io";
```

终端支持 GET、POST、PUT 和 DELETE 四种 HTTP 请求。

```dart
final url = Uri.https('httpbin.org', 'ip');
final httpClient = HttpClient();
_getIPAddress() async {
  var request = await httpClient.getUrl(url);
  var response = await request.close();
  var responseBody = await response.transform(utf8.decoder).join();
  String ip = jsonDecode(responseBody)['origin'];
  setState(() {
    _ipAddress = ip;
  });
}
```

这个例子太原生了，可以参考使用[flutterchina](https://github.com/flutterchina)的[Dio](https://github.com/flutterchina/dio)（这名字略微恶趣味）。Dio 能顺便处理 Cookie 等问题。

```dart
import 'package:dio/dio.dart';
void getHttp() async {
  try {
    Response response = await Dio().get("http://www.google.com");
    print(response);
  } catch (e) {
    print(e);
  }
}
```

## 表单

用户可以和文本部件交互，这些部件可以用来做表单、消息应用，搜索交互等，Flutter 提供两种核心部件[TextField](https://api.flutter.dev/flutter/material/TextField-class.html)和[TextFormField](https://api.flutter.dev/flutter/material/TextFormField-class.html)。

### 如何处理文本部件

在 React Native 中，使用 `TextInput`部件处理输入框，并使用回调获取数据。

```jsx
<TextInput
  placeholder="Enter your Password"
  onChangeText={password => this.setState({ password })}
 />
<Button title="Submit" onPress={this.validate} />
```

在 Flutter 中，[TextEditingController](https://api.flutter.dev/flutter/widgets/TextEditingController-class.html)类被用于管理`TextField`。无论何时这个表单项被修改，他都会被通知到。

```dart
// Flutter
final TextEditingController _controller = TextEditingController();
      ...
TextField(
  controller: _controller,
  decoration: InputDecoration(
    hintText: 'Type something', labelText: 'Text Field '
  ),
),
RaisedButton(
  child: Text('Submit'),
  onPressed: () {
    showDialog(
      context: context,
        child: AlertDialog(
          title: Text('Alert'),
          content: Text('You typed ${_controller.text}'),
        ),
     );
   },
 ),
)
```

在这个例子中，用户点击提交按钮，对话框显示用户输入的内容，这实现了利用[AlertDialog](https://api.flutter.dev/flutter/material/AlertDialog-class.html)展示消息，并通过[TextEditingController](https://api.flutter.dev/flutter/widgets/TextEditingController-class.html)获取`TextField`的`text`属性。

### 如何使用表单部件

在 Flutter 中 [Form](https://api.flutter.dev/flutter/widgets/Form-class.html) 部件由 [TextFormField](https://api.flutter.dev/flutter/material/TextFormField-class.html) 和提交按钮作为子部件组成。`TextFormField`存在 [onSave](https://api.flutter.dev/flutter/widgets/FormField/onSaved.html) 参数接受表单保存时的回调。`FormState`对象是用来存储、重置和验证表单中的`FormField`值的。你可以通过`Form.of()`方法获得上下文中的`Form`来获取`FormState`对象，也可以通过在表单初始化时，传入`GlobalKey`到`Form`的构造器，并通过`GlobalKey.currentState()`获得。

```dart
final formKey = GlobalKey<FormState>();

...
Form(
  key:formKey,
  child: Column(
    children: <Widget>[
      TextFormField(
        validator: (value) => !value.contains('@') ? 'Not a valid email.' : null,
        onSaved: (val) => _email = val,
        decoration: const InputDecoration(
          hintText: 'Enter your email',
          labelText: 'Email',
        ),
      ),
      RaisedButton(
        onPressed: _submit,
        child: Text('Login'),
      ),
    ],
  ),
)
```

下面例子展示`Form.save()`和`formKey`（也就是`GlobalKey`）是如何在表单提交时使用的。

```dart
void _submit() {
  final form = formKey.currentState;
  if (form.validate()) {
    form.save();
    showDialog(
      context: context,
      child: AlertDialog(
        title: Text('Alert'),
        content: Text('Email: $_email, password: $_password'),
      )
    );
  }
}
```

| Android Form                                                                                                                                                   | iOS Form                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Android Form](https://flutter.dev/assets/get-started/android/react-native/input-fields-0ebf3d566d9cd0e9ce79200ff08ec5dfcb3954c476e011e20c0bba7bcc33cf86.gif) | ![iOS Form](https://flutter.dev/assets/get-started/ios/react-native/input-fields-67200333d1b28999ef956d0352962ea96f25a3c232f3aaa2fb90c735b244368a.gif) |

## 获取平台数据

编译跨平台应用时，有些代码并不能跨平台使用。有些情况是在不同的系统下实现不同的操作逻辑。

在 React Native 下面，需要使用如下代码：

```js
// React Native
if (Platform.OS === "ios") {
  return "iOS";
} else if (Platform.OS === "android") {
  return "android";
} else {
  return "not recognised";
}
```

在 Flutter 中，则使用下面代码

```dart
// Flutter
if (Theme.of(context).platform == TargetPlatform.iOS) {
  return 'iOS';
} else if (Theme.of(context).platform == TargetPlatform.android) {
  return 'android';
} else if (Theme.of(context).platform == TargetPlatform.fuchsia) {
  return 'fuchsia';
} else {
  return 'not recognised ';
}
```
