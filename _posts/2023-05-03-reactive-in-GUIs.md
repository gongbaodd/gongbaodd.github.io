---
type: post
category: tech
---

# Reactive in GUIs

[Jetpack Compose](https://developer.android.com/jetpack/compose/documentation)

```kotlin
val mutableStateOf = remember { mutableStateOf(default) }
var value by remember { mutableStateOf(default) }
val (value, setValue) = remember { mutableStateOf(default) }
```

Can use Kotlin's [Flow](https://developer.android.com/kotlin/flow) to build reactive UI.

BTW, there is a [material theme builder](https://m3.material.io/theme-builder#/custom) to build UI theme.

[Flutter](https://docs.flutter.dev/)

```dart
// in a widget
class Home extends StatefulWidget {
    @override
    State<Home> createState() => _HomeState();
}
class _HomeState extends State<Home> {
    int _counter = 0;
    @override
    Widget build(BuildContext context) {
        return Button(
            onPressed: () => setState(() => _counter++),
            child: Text('$_counter'),
    }
}
```

```dart
// communication between widgets
void main() {
  runApp(
    ChangeNotifierProvider( // Provider
      create: (context) => CartModel(),
      child: const MyApp(),
    ),
  );
}

class CartModel extends ChangeNotifier {
  var current = WordPair.random();
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<CartModel>(); // Consumer

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Provider demo')),
        body: const MyCart(),
      ),
    );
  }
}

return Consumer<CartModel>( // Consumer
  builder: (context, cart, child) {
    return Text('Total price: ${cart.totalPrice}');
  },
);
```

[SwiftUI](https://developer.apple.com/documentation/swiftui)

```swift
@State private var username = ""
```

share data between views

```swift
// Our observable object class
class GameSettings: ObservableObject {
    @Published var score = 0
}

// A view that expects to find a GameSettings object
// in the environment, and shows its score.
struct ScoreView: View {
    @EnvironmentObject var settings: GameSettings

    var body: some View {
        Text("Score: \(settings.score)")
    }
}

// A view that creates the GameSettings object,
// and places it into the environment for the
// navigation stack.
struct ContentView: View {
    @StateObject var settings = GameSettings()

    var body: some View {
        NavigationStack {
            VStack {
                // A button that writes to the environment settings
                Button("Increase Score") {
                    settings.score += 1
                }

                NavigationLink {
                    ScoreView()
                } label: {
                    Text("Show Detail View")
                }
            }
            .frame(height: 200)
        }
        .environmentObject(settings)
    }
}
```

```swift
@ObservedObject var user: User
```

[Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/?view=aspnetcore-7.0)

using Blazor in MAUI is available now, though it is not stable yet.

```shell
dotnet new install BlazorBindings.Maui.Templates
```

```razor
@page "/bind"

<p>
    <input @bind="inputValue" />
</p>

<p>
    <input @bind="InputValue" />
</p>

<ul>
    <li><code>inputValue</code>: @inputValue</li>
    <li><code>InputValue</code>: @InputValue</li>
</ul>

@code {
    private string? inputValue;

    private string? InputValue { get; set; }
}
```

Since it is not stable yet, I did not dig into it.
