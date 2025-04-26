---
type: post
category: plan
tags:
    - Unity
    - media pipe
    - NuGet
---

# Week 17: Behavior Graph

## Media pipe

This week I was trying to use MediaPipe as gesture recognition tool to control a WebGL Unity game. I found the plugin, but it doesn't support WebGL. I only want a prototype, so I tried to make a simple socket server from unity, and use MediaPipe from web to send the camera data. In the future, I will try to bridge the JS to C#, then the socket server will be only for the editor.

During prototyping, I found this [openUPM](https://openupm.com/) which is an open source Unity asset store. I use this one to install the [NuGet plugin for unity](https://github.com/GlitchEnzo/NuGetForUnity). And use NuGet to install [WebSocketSharp](https://github.com/sta/websocket-sharp).

## Behavior Graph

Another thing in this week, I tried to use [Behavior Graph](https://docs.unity3d.com/Packages/com.unity.behavior@1.0/manual/behavior-graph.html) in Unity. It was mentioned in the FSM class. It is in between of a finite state machine and visual coding. I learnt many from [Sunny Valley Studio](https://youtu.be/VWxgTeCtDAs?si=kgz8AB0H2hLTjrpB). Unity is combing this with its Muse AI, so that a line of description will be transformed into nodes and work as game AI logic.