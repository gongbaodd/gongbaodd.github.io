---
type: post
category: fe
tag:
    - wearos
    - kotlin
    - portfolio
---

# 🎲 WearOS Dice App

It’s been a while since I last tried making a **WearOS app**. [Last time](/plan/2024/06/29/week-26-adb-over-wifi) I checked, the build process was painfully slow, and Android development itself is a bit of a headache 😅.

This time, I decided to make a **simple dice app** using **ViewModel**. Some dependencies need to be added in the `build.gradle` file — the editor won’t always remind you, but tools like **Gemini** can help find the right packages.

```kotlin
// Dice.kt
class Dice {
    fun roll(): Int {
        return (1..6).random()
    }
}
```

```kotlin
// DiceViewModel.kt
class DiceViewModel: ViewModel() {
    private val dice = Dice()
    private val _currentRoll = MutableStateFlow(1)
    val currentRoll: StateFlow<Int> = _currentRoll

    fun rollDice() {
        viewModelScope.launch {
            val result = dice.roll()
            _currentRoll.value = result
        }
    }
}
```

```kotlin
// MainActivity.kt

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()

        super.onCreate(savedInstanceState)

        setTheme(android.R.style.Theme_DeviceDefault)

        setContent {
            WearApp()
        }
    }
}

@Composable
fun WearApp(diceViewModel: DiceViewModel = DiceViewModel()) {
    DiceTheme {
        val currentRoll by diceViewModel.currentRoll.collectAsState()

        Scaffold(
            timeText = { TimeText() },
            vignette = { Vignette(vignettePosition = VignettePosition.TopAndBottom) },
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = currentRoll.toString(),
                    fontSize = 80.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 24.dp)
                )

                Button(
                    onClick = {diceViewModel.rollDice()},
                    modifier = Modifier.size(24.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Casino,
                        contentDescription = "Roll Dice",
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                }
            }
        }
    }
}

@Preview(device = WearDevices.SMALL_ROUND, showSystemUi = true)
@Composable
fun DefaultPreview() {
    WearApp()
}
```

Sending the app to the watch is still a bit painful 😅. Right now I’m using [wearos toolbox](https://wearosbox.com/) to install the APK, which makes life a little easier.