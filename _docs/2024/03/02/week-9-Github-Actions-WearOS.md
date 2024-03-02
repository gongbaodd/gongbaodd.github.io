---
type: post
category: plan
tag:
    - Aceternity-UI
    - babylon-react-native
    - viro-react
    - github-actions
    - wearos
    - CRUX
    - SwiftWebUI
    - rust
    - swift
    - zhou-chu
---
# Week 9: Github Actions and WearOS

## Github Actions to build ipa and apk files

My two project [cost-count](https://github.com/gongbaodd/cost-count) and [pasa-thai](https://github.com/gongbaodd/pasa-thai) supports android and iPhone. I used to build them on my local VM. But waiting for it to be built is a waste of time. So I tried to use github actions to build them. And leave the files as atifacts. This is my [workflow](https://github.com/gongbaodd/cost-count/blob/master/.github/workflows/build.yml).

It was easier than I thought. Editing the workflow was easy with the help of the [Github Actions for VSCode](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions). Github added an environment function on actions, I got caught up with it for a while. But it just a variable name problem. Easy to fix.

The expo apk file is extreme big. Turns out that Android packs all supported CPU architecture in one apk. I don't think it's a problem right now.

## WearOS Development

I finally bought a galaxy watch 6 classic. It is on the way. This week, as planed, I tried to make an app. This is a [tutorial video](https://www.youtube.com/watch?v=irIGZj1YON8&t=85s&ab_channel=PhilippLackner) from Philipp Lackner, about making a stop watch. It uses Jetpack compose and [viewModel](https://developer.android.com/codelabs/basic-android-kotlin-compose-viewmodel-and-state#11). No new story, Jetpack compose part is like swift UI, and viewModel part is just like any other MVVM framework. It just has too many template codes. Even rust code looks more simpler.

I mentioned that flutter supports wearOS. Yes, I can build flutter, and the apk is 50MB just the same to the native one. Sadly, the scaffold package, which has pre-build watch sizes was obsolete. I don't think digging too deep is a good idea. But I still read the [blog](https://verygood.ventures/blog/building-wear-os-apps-with-flutter-a-very-good-guide).

I also found this [watchOS tutorial](https://www.youtube.com/watch?v=DfWQV_NaS9I&ab_channel=CredoAcademy) from Credo Academy. Also I found this official [WatchOS Swift UI document](https://developer.apple.com/documentation/watchos-apps/creating-an-intuitive-and-effective-ui-in-watchos-10). I will try it next week.

## CRUX: cross-platform app using rust

[CRUX](https://redbadger.github.io/crux/) is like a traditional way to solve cross-platform problem. Pack the viewModel logic into a dynamic library and distribute to different platforms. The view part is still written in their native languages. 

Here is a [talk](https://www.youtube.com/watch?v=cWCZms92-1g&ab_channel=RustNationUK) in RustNationUK. 

## SwiftWebUI

Swift in universal development is not as active as many other languages. I used to try swift on linux [last year](../../../2023/07//22/29th-week-geospatial). But I still wonder if it has more updates. [This blog](https://www.infoq.cn/article/0h_gxyqzgbawockkyfsg) is about how to use SwiftWebUI. Surprisingly, the demo code, [Avocado Toast](https://github.com/SwiftWebUI/AvocadoToast) still works on swift 5.9 on Linux!

This means, I can write swiftUI on Linux, combine CRUX to make a cross-platform app. Only need a Mac as a build server.

## AceternityUI

[Aceternity](https://ui.aceternity.com/) UI is like shadcn UI, but only the cool components. Only need to copy paster into the project and it works.

## Babylon React Native

Last year, one of my major study is babylon.js. Since I have an iPhone now, I wanted to build [babylon react native](https://www.babylonjs.com/reactnative/) on my phone. Sadly, the project only supports iOS 12 (I'm using 17). I guess I gonna give up on this. Expo might be a better choice. And what's more. I found this [viro react](https://viro-community.readme.io/docs/overview) which also uses ARkit and ARCore to build AR apps. It has a project to support oculus, but It is obsolete now. I think I will try it some time later.

## Zhou Chu

Zhou Chu(周处除三害), The pidgen the pig and the snake. A nice taiwan movie. Very satisfying kind like hong kong movie. Must see in 2024.