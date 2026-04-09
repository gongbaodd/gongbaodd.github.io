---
type: post
category: plan
tag:
    - XR
---
# Week 14: Finding the "Zen" Workflow for XR Development

This week, I’ve been deep in the trenches trying to build a comfortable XR development environment for my thesis—an **XR Drone Simulator**.

Even though I’ve committed to **Unity**, the sheer number of configuration paths is overwhelming. My main goal? **Stop compiling every five minutes.** I need a real-time preview that actually works.

Here is the breakdown of the "battlefield" so far:

## ❌ The Contenders

* **Meta XR Simulator (v85):** Meta’s latest tool has a beautiful UI, but it’s incredibly unstable. 📉 It crashes constantly and takes the Unity Editor down with it. While [the old v70 version]((/plan/2024/07/13/week-28-Meta-XR-simulator)) was stable enough to use quest controllers for debugging, this new version is currently a "no-go" for me.
* **Unity XR Interaction Toolkit (XRI) Simulator:** This is a prefab-based simulator. It’s "okay" for basic testing, but mapping VR controllers to a keyboard and mouse feels like playing a piano with boxing gloves. ⌨️ Plus, it breaks the moment I try to use **Meta Building Blocks** or specific OVR features.
* **Meta Oculus Link:** This allows for full PCVR testing with hand tracking and passthrough. It’s the most feature-complete, but it’s a resource hog. 🔋 My CPU screams under the load, and I have to constantly take on and off the headset, which is a productivity killer.

## 🏆 The Winner: Virtual Desktop (VDXR)

Thank goodness I bought this! 💳 By using [**Virtual Desktop** (wired)](/tech/2026//01/09/week-1-PCVR), I can stay inside the headset, view my desktop on a streaming screen, and jump into the preview instantly.

* **The Good:** Using **AV1 10-bit** on an NVIDIA GPU makes the stream butter-smooth. 🧈
* **The Bad:** My PC fans sound like a jet engine, and it still doesn't play nice with Meta’s Passthrough or Building Blocks (which often result in a black screen).

---

### 🏗️ The SDK Dilemma: Unity XRI vs. Meta All-In-One

I never expected the gap between SDKs to be this wide. In web development, moving from React to Svelte or Vue feels like a slight shift in syntax, but the core interfaces remain recognizable. In XR, **Unity’s XR Interaction Toolkit (XRI)** and the **Meta All-In-One SDK** feel like two entirely different planets. 🪐

* **Zero Portability:** You can't just drop a Unity XR Rig into a Meta-focused project, and using Meta’s hand models in a pure Unity XRI project is a headache.
* **The Developer Trap:** I originally wanted to go "Full Meta" for the features, but the development experience is so unstable (Meta XR Simulator crashes, Link is heavy).
* **The Worry:** By choosing the "friendly" path (Unity XRI on my Mac), I fear I won't be able to easily adapt Meta’s advanced features (like their specific hand interactions or spatial anchors) later in the project. It’s a constant battle between **current productivity** and **future features.** ⚖️

---

## 🍏 Bonus: The Mac Mini Setup

To stay productive on my **Mac Mini**, I tried to turn my PC into a secondary screen. 🖥️

* **RustDesk:** Didn't work. The mouse focus inside the Unity Editor was broken, making it impossible to navigate the scene.
* **PigeonCast:** This was the winner! 🕊️ I’m actually using it to type this post right now. While I can feel a slight delay in the keyboard, it’s the most stable AirPlay solution I’ve found.

**Current Strategy:** A hybrid approach. Use the **XR Simulator** on the Mac for core logic and UI, use Unity MCP for development, then switch to the **PC + Virtual Desktop** for heavy-duty XR testing. Let's see if this workflow survives Week 15! 👨‍💻✨
