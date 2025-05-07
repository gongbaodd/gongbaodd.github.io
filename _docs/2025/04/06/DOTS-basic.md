---
type: post
category: tech
tag: 
  - ECS
---

# DOTS: Basic

This article is a summary on studying [Basics of DOTS: Jobs and Entities](https://learn.unity.com/project/basics-dots-jobs-entities). This also can be a follow up on the article [](/plan/2024/12/06/week-48-ecs).

Unity DOTS (Data-Oriented Technology Stack) is a set of technologies that allows developers to write high-performance, multithreaded code in Unity. It consists of three main components: the Entity Component System (ECS), the C# Job System, and the Burst Compiler. Currently it does not support WebGL. It can be built but you will get errors when running.

So let's go back to the ECS. As I mentioned in the previous article, I found it weird to cut data into small pieces in components. But it is actually a good practice as it will allow multiple threads to work without many locks. When putting all the pieces together in components, in unity they use structs, which is a consist memory layout, it will improve the CPU hit rate. However, the code looks hard to understand. Maybe because I see it in an OOP way.

So, on web, if we are using ECS, the benefits that are based on multithreading and shared memory are currently not available. So using ECS on web is just a way to organize the code. 