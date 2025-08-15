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
cover:
    url: ./gamepad.jpg
    alt: gamepad
---

# Week 24: Gamepad 🎮

## EasySMX X15 🕹️

To support my game studies, I bought an EasySMX X15 gamepad from TEMU. I was worried about the quality at first 🤔, but after checking Linus Tech Tips' video on the X10, it turns out it’s really solid! 💪  
It cost only 25€ compared to 50€ locally in Estonia. Sure, local ones have longer warranties and higher quality, but I don’t need that right now.

## Unreal Engine Study 🖥️

Studying Unreal Engine can be tough, especially on limited hardware. 😅  
Last week, UE 5.6 was released, but my computer struggled. I went back to UE 4.23 for web builds, which ran fine, but the marketplace isn’t available there. So for now, I’m using **UE 5.0** on low settings. Later, I’ll upgrade to 5.5 for machine learning features.  

Courses I explored:  
- [Programming Tutorials: Community Highlight](https://dev.epicgames.com/community/learning/courses/wNm/unreal-engine-community-highlight-programming-tutorials/Jp8J/unreal-engine-learning-blueprints-through-creating-a-super-mario-type-of-collectibles-part-1) – beginner-friendly, but some instructions unclear 🤷‍♂️  
- [Code a First-Person Adventure Game](https://dev.epicgames.com/documentation/en-us/unreal-engine/code-a-firstperson-adventure-game-in-unreal-engine) – still rusty on some parts, even after [Tom Looman's C++ Guide](https://www.tomlooman.com/unreal-engine-cpp-guide/)  
- [Your First Hour in UE 5.2](https://dev.epicgames.com/community/learning/courses/3ke/your-first-hour-in-unreal-engine-5-2/vvdk/) – a better starting point, I’ll continue here  
- Later: [Stack-O-Bot](https://dev.epicgames.com/community/learning/paths/yG/stack-o-bot) to explore more tools 🤖

## Bevy Study 🌱

Bevy is a rising star in the game world, but adoption isn’t trivial. 🚀  
Current version is 0.xx, so APIs change frequently. Tutorials often break.  
I tried the [Bevy 3D Third Person Tutorial](https://youtu.be/qW0l_aEJfvc?si=M6hLAxoTWOlTImVv), but many APIs weren’t available in 0.16, even after downgrading to 0.10.  
Still fascinated by [bevy_ecs](https://docs.rs/bevy_ecs/latest/bevy_ecs/) and its [archetype memory layout](https://taintedcoders.com/bevy/archetypes) – maybe I’ll build a WASM package for web game dev someday.

## bitECS ⚡

[bitECS](https://github.com/NateTheGreatt/bitECS) is an ECS framework for JavaScript. Found it while researching Bevy ECS. Looks like a solid implementation for some JS projects.

## LLM Study 🤖

I’ve been exploring **LangChain.js** + [HuggingFace transformer.js](https://huggingface.co/docs/transformers/v4.17.0/en/index). LangChain handles workflows, HuggingFace handles models – a perfect combo! ✨  

Also discovered [LanceDB](https://lancedb.github.io/lancedb/) – a vector database that runs in both Docker and browser. 🗃️

## Game AI 🕹️🤖

As I mentioned in [Week 17](/plan/2025/04/26/week-17-behavior-graph), behavior trees are widely used in Unity and UE. FSMs and AI tools from games often influence front-end dev.  
I found [yuka](https://github.com/Mugen87/yuka) – a JS behavior tree framework I can use.  

Recommended books for deeper study:  
- [Programming Game AI by Example](https://www.amazon.com/Programming-Example-Wordware-Developers-Library/dp/1556220782) 📚  
- [3D Math Primer for Graphics and Game Development](https://www.amazon.com/Math-Primer-Graphics-Game-Development/dp/1568817231) 📐  

These remind me of Unity's [Artificial Intelligence for Beginners](https://learn.unity.com/course/artificial-intelligence-for-beginners) and UE's [Learning Agents (5.5)](https://dev.epicgames.com/community/learning/courses/GAR/unreal-engine-learning-agents-5-5/bZnJ/unreal-engine-learning-agents-5-5) courses I still want to finish. 🚀
