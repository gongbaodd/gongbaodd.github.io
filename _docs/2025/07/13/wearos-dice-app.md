---
type: post
category: fe
tags:
    - wearos
    - kotlin
---

# WearOS Dice App

It is been so long for me to try to make a wearOS app. [Last time](/plan/2024/06/29/week-26-adb-over-wifi) I check, the building experience is too slow. And Android development is preference is also a pain.

This time I tried to make a simple dice app. Using ViewModel. There are some packages needed to be added in the `build.gradle` file. The editor still not remind you, but you can ask Gemini to find the packages.

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

Send the app to the watch is still a pain. Now I am using [wearos toolbox](https://wearosbox.com/) to install the apk.