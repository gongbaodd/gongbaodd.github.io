---
type: post
category: plan
tag:
    - ionic
    - nuxt
    - vue
    - maui
    - icon
    - favicon
    - pasa-thai
    - graphql
---

# Week 8: Ionic Maui

This week is my second week of Thai language, majorly focusing on time and numbers. Need to remember a lot words. Instead of making Anki cards, I chose to make an App. Basically using nuxt and ionic. I found this [Thai notes](https://thai-notes.com/index.html) website, which is also a fan made website to lear Thai.

## Ionic

Different to expo, ionic is a framework that use a web page as view and use capacitor to bridge native functions and the page. So the platform difference is not a big problem as react native does. Ionic components were made with two UIs, iOS and Material Design, to make the app looks more native. And yes, I can't distinguish the difference between an ionic app and a native one.

## Nuxt

I use [Nuxt](https://ionic.nuxtjs.org/) as the web bundler to try Vue instead of React. I used Vue for about a year ago. Back then the typescript support is not so good. Now it's better, I mean I still met some problems in a monorepo project. like in the pages, I can't make typescript definition to read vue files.

I still don't like the vue file. I don't like svelte because of the svelte file. It forces you to make one component in one file. To make that you need a lot [hacks](https://codewithhugo.com/writing-multiple-vue-components-in-a-single-file/)

Wish that one day I can use vue like graphql, just strings with tools in the editor. Like this:

``` js
{
    template: ` #vue
        <div></div>
    `
}
```

## MAUI

MAUI is the next version of Xamarin.Forms, which is kinda like react native, it uses .Net to bridge native components and logic. I've use MAUI once, honestly it looks like an obsolete framework. Too many template codes and the UI is written using XML. You can use blazor, which is a web framework for .Net. But that will fall back to a wasm web page.

Why do I tried MAUI? I heard that Xamarin can develop wearables and I heard that MAUI can develop iOS on Windows. So let's see: 

- Firstly, Xamarin supports wearables, but [not MAUI](https://learn.microsoft.com/en-us/dotnet/maui/migration/?view=net-maui-8.0). After upgraded to MAUI, watch OS is not supported. And the old xamarin project only supports Watch OS versions lower than 9.4. And the official support ends at this April. 
- You can develop MAUI on Windows, which is true. But you still need a Mac in your network. Visual Studio will connect the Mac through ssh and build this app on it.

Tips about VMs. I built a Mac(Sonoma) on vmware. It was laggy. Turns out I gave too many resources on the VM, cutting the main system short. Just to release some resources and it works fine.

## Icon design

With a free copilot, making an icon is easier than ever. With the help of sora, maybe making a loading page is also possible. But to make that icon work on web, iOS and Android, needs a lot work. I found this [IconKitchen](https://icon.kitchen/) can help a lot, but not enough, [last november](../../../2023/11/11/45th-week-double-11s) I found this [real favicon generator](https://realfavicongenerator.net/), it can make website icons. I really want some tools can be more like a combine of these two.

## gql.tada

[gql.tada](https://github.com/0no-co/gql.tada) is a graphql type definition support tool made by [0no-co](https://github.com/0no-co), who was supported by urql. I definitely will try that in the future.

## conclusion

Next week, I will try to make github actions to automate my two apps, cost-count and pasa-thai. I will then try to make a todo list in android wear, maybe one on watch os.