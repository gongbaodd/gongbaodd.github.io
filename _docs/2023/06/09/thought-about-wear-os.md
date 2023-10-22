---
type: post
category: tech
---
# Thought about Wear OS

Recently I watched [a Youtube video](https://www.youtube.com/watch?v=BUWZJuIqC2I&t=67s) about making a training tracker using Edge Impulse. Surprisingly an ESP32 can do so many ML things. That made me think why not implement it on Wear OS?

I used to wear pebble in 2015, Gz it's been almost 10 years. After pebble ended its service, I stried serveral Chinese smart watches, no app stores. I like round watch, like moto 360. But it was too expensive. Three years ago, I bought it in only 200 yuan. Tried to develop flutter on it. Sadly I the power button was broken, so it's been useless for a long time.

Today, I tried to wake it and using adb to trigger power button, it works!

```shell
adb shell input keyevent 4
```

I installed [Hankmi Appstore](https://hankmi.com/), found an APP to use float button as physical power button. Now I can develope a Wear APP on Android 7. Hooray!

Some sad thoughts, Google didn't drop the wearOS support in China. A Chinese company is maintaining. And it is horrible. Most developer are middle school students, and they earn money by donations.

Since I'm using an iPhone, an Apple Watch is the first choice. But I still want a round watch. Like Samsung Galaxy Watch 5. Luckily I have a Samsung tablet. What if I want to connect iPhone to my watch? Maybe adb can help, ha, a great idea!