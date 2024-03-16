---
type: post
category: plan
tag:
    - VR
    - Galaxy Watch 6
    - WebXR
    - WSL
    - CoconutXR
    - PortProxyGUI
    - netsh
    - koestlich
    - natuerlich
    - Wonderland-Engine
    - merge-watch
---
# Week 11: VR and Galaxy Watch 6 Classic

After 2 weeks' waiting, I finally received my Galaxy Watch 6 Classic on Thursday. I tried it for some days. There are pros and cons. 

## Galaxy Watch 6 Classic

I always want a galaxy watch, I like the round bezel. But galaxy watch sold in mainland China can not use many Google function. Since I am in Thailand, I can have a universal version.

To use a universal galaxy watch, I need to flash my Android phone (mine is XiaoMi) to an universal ROM. Mainland China phone can not connect the watch even you have installed play store. I also have an Samsung tablet, but sadly it can not connect the watch, guess the version is too old.

After installed Galaxy Wearable App, I can connect the watch. During the activation routine, it need me to login samsung account, remember to use a normal browser (not like mi browser, it's not supported).

To connect iPhone, the watch need to install [merge watch](https://www.merge.watch/). This App connects the watch with iPhone through bluetooth.

The experience of the Watch is different to Apple Watch. It's heavier. The bixby assistant is slower than siri. Google Assistant is great in English, but it's not correctly support the speaker. Wear OS has more apps than Watch OS. But there is not a centralized App to collect all fit information. There are more watch faces. I didn't find the watch life is better. Guess I just used it a lot.

## Learn VR Games

Another thing, I tried to follow [Valem's tutorial](https://www.youtube.com/watch?v=YBQ_ps6e71k&t=73s&ab_channel=ValemTutorials) to make a VR app. I have not finished it yet. I will continue to learn it next week.

Also, Valem has another [Wonderland tutorial](https://www.youtube.com/watch?v=97rtpteFYco&pp=ygURd29uZGVybGFuZCBlbmdpbmU%3D). And I found an [official wonderland tutorial](https://www.youtube.com/watch?v=zmuJWAW8NeM&ab_channel=WonderlandEngine). I will check it out later.

## To make Unity run on WebXR

I found this [blog](https://medium.com/@depanther/how-to-use-unity-xr-hands-with-webxr-3b8fba346da3) about export a Unity project to WebXR. The bundle is about 20MB. The author, Oren De-Panther Weizman, made a WebXR exporter. This is his [youtube](https://www.youtube.com/@De-Panther). 

## Export WSL to LAN

Working in the WSL is not so convenient, cause you can not export the port to the outer network. I found this tool, [PortProxyGUI](https://github.com/zmjack/PortProxyGUI), which uses `netsh` as core to proxy WSL to LAN.

## Coconut XR

Remember `@pmndrs/uikit` last week? I tried this framework. There is still a lot to fix. It is better to use [koestlich](https://github.com/coconut-xr/koestlich) as UI and [natuerlich](https://github.com/coconut-xr/natuerlich) as interaction now. I compile a simple demo. The bundle size is around 1MB. This is a [music player demo](https://github.com/coconut-xr/spatial-ui-example).