---
type: post
category: fe
tags:
    - react-native
    - wearos
    - expo
---

# React Native WearOS

Last year, I was trying to [make Apps on wearables](/plan/2024/03/02/week-9-github-actions-wearos). But I didn't continue. As I am doing some clean up on my todo list. I found this trying to make react native app on WearOS idea.

The conclusion still, it is better to write native apps for WearOS.

The best experience for React Native is Expo. However, there is no native support for WearOS. The Expo Go App is not installable on WearOS. There is an implementation for React Native, [React Native Wear Connectivity](https://github.com/fabOnReact/react-native-wear-connectivity.git). You have to run react native locally, that means so many configurations and so many terminal windows to open. The coding experience is not better than native development.

When using React Native project, it is still an option to install expo SDKs. Just run `install-expo-modules@latest`, after that, remember to add NODE_ENV to make the project running.

Actually, I am afraid of linking Android dependencies. I prefer to use `expo prebuild` to reuse the native code.