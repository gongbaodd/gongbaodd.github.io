---
type: post
category: plan
tag:
    - gamepad
    - unreal-engine
    - bevy
    - ECS
    - bitecs
    - vectordb
    - huggingface
    - langchain
    - LanceDB
    - behavior-tree
---

# Week 24: Gamepad

## EasySMX X15

To support my study on games, I bought an EasySMX X15 gamepad from TEMU. I was very worried about the quality. I checked Linus Tech Tips's video on the X10. It turns out very good. It is 25 eros, while if I want to buy one here in Estonia, a gamepad costs 50 eros. Although they are better qualities and long warranty, I don't need it.

## Unreal Engine Study

To study Unreal Engine is not very easy, especially when your hardware is limited. Last week Unreal 5.6 was released, when I installed it and opened the project, I can feel that my computer is not able to let me develop on that. Then I tried 4.23, which is the last version that supports a web build. My computer handles it well. However, the market place is not available for UE4 and I have to use Visual Studio 2017 with UE4. There is a third party [asset manager](https://assetmanager.studio/) for UE, but I do not think it works. So right now I am using UE5.0, I changed the scalability to low, and everything is fine. I can't find the option in 5.6. So I will continue using 5.0 for now. In the future I will upgrade for 5.5, because the machine learning feature.

Stumbling yet I still finished the beginner course of [The Community Highlight: Programming Tutorials](https://dev.epicgames.com/community/learning/courses/wNm/unreal-engine-community-highlight-programming-tutorials/Jp8J/unreal-engine-learning-blueprints-through-creating-a-super-mario-type-of-collectibles-part-1). Though, a lot of instructions are not clear to me.

The same feeling to another course [Code a First-Person Adventure Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/code-a-firstperson-adventure-game-in-unreal-engine). Even though I have read [Tom Looman's Unreal Engine C++ Complete Guide](https://www.tomlooman.com/unreal-engine-cpp-guide/), many things are still rusty to me.

Then I went to [Your First Hour in Unreal Engine 5.2](https://dev.epicgames.com/community/learning/courses/3ke/your-first-hour-in-unreal-engine-5-2/vvdk/your-first-hour-in-unreal-engine-5-2-overview). This one feels like a good start. I will try to start with it .

Then I will go to [Stack-O-Bot](https://dev.epicgames.com/community/learning/paths/yG/stack-o-bot) project to learn more tools.

## Bevy Study

Another funny one is Bevy. This is a rising star in game world. During last week's study, I still find it is not easy to adopt. Right now bevy is ar 0.XX version, meaning many APIs will change, a tutorial may be out date in a few months. I tried [Bevy 3d Third Person Tutorial](https://youtu.be/qW0l_aEJfvc?si=M6hLAxoTWOlTImVv), most APIs are not available in 0.16, even downgraded to 0.10, some third party plugins are still failing.

Well, I am still interested in [bevy_ecs](https://docs.rs/bevy_ecs/latest/bevy_ecs/) and its [archetype memory layout](https://taintedcoders.com/bevy/archetypes). In the future, I might use it to build a wasm package for web end game development.

## bitECS

[bitECS](https://github.com/NateTheGreatt/bitECS) is an ECS framework for JavaScript. I found it when researching bevy-ecs. It looks a nice implementation that I will use for some projects.

## LLM Study

This week I was also studying langchain.js. I made a little research on [hugginface's transformer.js](https://huggingface.co/docs/transformers/v4.17.0/en/index). I found they can be used together, as langchain for workflow and huggingface for model.

The [LanceDB](https://lancedb.github.io/lancedb/) is a good vector database that can run in both docker and browser. 

## Game AI

[Week 17](/plan/2025/04/26/week-17-behavior-graph) I mentioned behavior tree in Unity. It is also used widely in UE. I always think that what is thriving in game development will eventually affect front end development, Like FSM. I found [yuka](https://github.com/Mugen87/yuka) is a JS behavior tree framework I can use.

The author suggested two books that I can read. 

- [Programming Game AI by Example](https://www.amazon.com/Programming-Example-Wordware-Developers-Library/dp/1556220782)
- [3D Math Primer for Graphics and Game Development](https://www.amazon.com/Math-Primer-Graphics-Game-Development/dp/1568817231/)

The two books remind me of Unity's [Artificial Intelligence for Beginners](https://learn.unity.com/course/artificial-intelligence-for-beginners) course I haven't finished yet. And UE's [Learning Agents (5.5)](https://dev.epicgames.com/community/learning/courses/GAR/unreal-engine-learning-agents-5-5/bZnJ/unreal-engine-learning-agents-5-5).
