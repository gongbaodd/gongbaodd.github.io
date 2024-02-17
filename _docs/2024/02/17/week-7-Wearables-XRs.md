---
type: post
category: plan
tags:
    - XR
    - Watch OS
    - Wear OS
    - iBus x-tool
    - flutter
    - Xamarin
    - Biome
    - prettier
    - Bruno
    - postman
    - hopposcotch
    - tremor
    - chart
    - dashboard
    - expo modules
    - siri
    - app intents
    - MRTK
    - Unity XR toolkit
    - Oculus interaction SDK
---

# Week 7: Wearables and XRs

## Overview

This week I extended my VISA, went to a Thai language class. I fixed some bugs in Cost Count App and updated this website. Did some research on Siri-kit. Furthermore, I tried some open source XR projects and did some research on wearables.

## Wearables

### No go for Watch OS

This week I did some research on wearables. I was intended to make an Apple Watch App, to train some machine learning as a gym helper. And this is why I started to make iOS Apps. But sadly, to make a Watch OS App is not as simple as it is in iOS. 

- It is not possible to side-load an ipa file to Watch OS. Yes, you can bundle an ipa file. But you can not install it, there are only two ways, by test flight, with a developer account which I cannot have, or just using xcode.
- Connecting Apple Watch to XCode needs an iPhone and a Mac. It seems that [bluetooth connection is needed](https://forums.developer.apple.com/forums/thread/5317?answerId=770834022#770834022). Not just the same internet.

But I sill read some [documents](https://steemit.com/xcode/@ktsteemit/xcode-free-provisioning) about free provisioning in XCode. Maybe one day I will have a mac mini. This post lists some [capabilities](https://developer.apple.com/help/account/reference/supported-capabilities-ios#//apple_ref/doc/uid/TP40012582-CH38-SW1) of free provisioning in iOS.

There is [an open source Pokemon app](https://github.com/IdreesInc/Apple-Watch-Poketch) which bundled an ipa file. Sadly, the author do not know how to side load it.

However, there is a trick to connect Apple Watch to computer with a line. The [iBus x-tool](https://www.mfcbox.com/shop/category/ibus-tools/) is a tool to restore Apple Watch. But it is expensive, you can buy an android watch with that money.

### Wear OS, Maybe?

Then, I did some research on Wear OS. Last year, when I tried to buy a smart watch, I realized that Wear OS is not compatible with iOS. And not only that, the wear OS in mainland China, is not compatible with androids out of mainland China. So finally, I bought an Apple Watch. However, with the great power of the community, wear OS can connect to iPhone with an App called [merge](https://www.merge.watch/).

### Cross Platform in wearables

Another problem, is there a cross platform in wearables? Sadly not many. 

- React Native? no, you need to bind the native components by yourself.
- Flutter? works on Wear OS, Here is a [tutorial](https://verygood.ventures/blog/building-wear-os-apps-with-flutter-a-very-good-guide). Good thing for Flutter, it does not use native components, if it runs on Apple Watch, then it works. Bad thing is, it seems no one has tried it yet. And it is said, flutter is slow on iOS devices.
- Xamarin? Yes, There are documents about [building watch OS app](https://learn.microsoft.com/en-us/xamarin/ios/watchos/) and [building wear OS app](https://learn.microsoft.com/en-us/xamarin/android/wear/). But it has been a long time, Xamarin is now MAUI, but there is no example in MAUI. In the community, rumour says that .Net 8 supports wearables.

### Connection

[react-native-watch-connectivity](https://www.npmjs.com/package/react-native-watch-connectivity) is a Library to connect Apple Watch to React Native.

## Siri Development

[This](https://support.apple.com/zh-cn/guide/shortcuts/welcome/ios) is the official document about Siri shortcuts. In the code, it is called [intents](https://developer.apple.com/documentation/appintents). [This](https://www.youtube.com/watch?v=WP3QlrBQC80&ab_channel=wm6h) is a demo video to show how it works. And this is [a blog](https://medium.com/@sudoplz/ios-app-shortcuts-intents-on-a-react-native-project-to-enable-voice-commands-with-siri-and-95fa9fc29a34), I can't say it's good to read, but there are not so many on the web.

Since there are not so many people develop Siri shortcuts, there is few to make expo or react native modules. So I have to learn to make one by myself. So, I think I will need to build a step tracker to learn [expo modules](https://docs.expo.dev/modules/overview/).

## Open Source XR Projects

More, this week, I did more research on XR projects. I always want to build [MRTK3](https://github.com/microsoft/MixedRealityToolkit-Unity) in web. There are more XR components like [Unity XR toolkit](https://docs.unity3d.com/Manual/com.unity.xr.interaction.toolkit.html) and [Oculus interaction SDK](https://developer.oculus.com/documentation/unity/unity-isdk-interaction-sdk-overview/). Here is [a starter example](https://developer.oculus.com/documentation/unity/unity-starter-samples/).

This week I watched [Valem Tutorials' video](https://www.youtube.com/watch?v=bUKY6H7_MHw&ab_channel=ValemTutorials), which provides many cool XR projects. The following are workable and tested by me.

- [First Hand](https://github.com/oculus-samples/Unity-FirstHand), made by meta, an example of hand tracking.
- [Move Fast](https://github.com/Unity-Technologies/mr-example-meta-openxr), made by meta, also an example of hand tracking
- [The World beyond](https://github.com/oculus-samples/Unity-TheWorldBeyond), made by meta, an example of XR scene API.
- [Phanto](https://github.com/oculus-samples/Unity-Phanto), made by meta, also an example of XR scene API.
- [Tilt brush](https://github.com/googlevr/tilt-brush), made by google, a steam VR painter app.

To run it in a fast way, using [the Oculus App](https://www.meta.com/quest/setup/). It will build a rift home preview scenes to your quest with a thunderbolt cable. And you can also build it to apk and install it in your quest.

## Some cool projects

[Biome](https://biomejs.dev/), a replacement of prettier. 

[Bruno](https://www.usebruno.com/), an alternative for postman, recently I used Hoppscotch which is a hard one. I hope this can be simpler.

[tremor](https://www.tremor.so/), a chart and dashboard react components.

I read Nx's monorepo book, I don't think it's a lot help. I will try to read call stack's react native book.

## Study Thai

I finally went to a Thai class. Only speaking now. I learnt consonants and vowels. Some simple grammars. like in Thai, the adjectives are put after the noun.

Remembering the phrases is hard, I may need anki or write an App to remember it.

## Conclusion

Firstly, conclude the vocabulary learnt these day. If I need to make an App, I will try vue in ionic.

Using XCode in VM is painful. But to make a Watch OS App is not so unbearable. I will firstly try to make [a Watch OS App](https://developer.apple.com/tutorials/swiftui/creating-a-watchos-app) and [a Wear OS App](https://developer.android.com/courses/pathways/wear). Then I will try Xamarin and Flutter. To make a comparison. After all this, I will reconsider whether to get a Galaxy Watch or a Mac mini.

Make a step tracker to learn expo modules. Try to build siri commands for Cost Count App. Maybe making a React Native module for Siri.

Try Valem's tutorial in XR. Learn WTF Web3 lesson. To learn call stack's native book. And update the Cost Count App to react native paper.