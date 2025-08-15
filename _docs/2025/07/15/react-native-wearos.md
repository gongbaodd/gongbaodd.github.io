---
type: post
category: fe
tag:
    - react-native
    - wearos
    - expo
---

# ⌚ React Native on WearOS

Last year, I experimented with [building apps for wearables](/plan/2024/03/02/week-9-github-actions-wearos), but I didn’t continue. While cleaning up my todo list, I revisited the idea of making a **React Native app for WearOS**.

**Conclusion:** it’s still better to write **native apps** for WearOS.  

The best React Native experience comes through **Expo**, but unfortunately, there’s **no native WearOS support**. The Expo Go app can’t even be installed on WearOS.  

There’s a library called [React Native Wear Connectivity](https://github.com/fabOnReact/react-native-wear-connectivity.git) — it works, but you need to run React Native locally. That means juggling **lots of configurations** and multiple terminal windows. Honestly, the experience is not better than native development 😅.

If you still want to use Expo in a React Native project:  
1. Run `install-expo-modules@latest`  
2. Remember to set `NODE_ENV` to make the project run  

Personally, I prefer using `expo prebuild` to **reuse native code**, so I can avoid the headache of linking Android dependencies.
