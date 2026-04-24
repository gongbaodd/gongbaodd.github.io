---
type: post
category: tech
tag:
  - XR
series:
    name: Master Thesis
    slug: master
    number: 4
cover:
  url: https://res.cloudinary.com/dmq8ipket/image/upload/v1774953924/www.meta.com_quest_quest-3__srsltid_AfmBOoqs1QjxuoVjeYycRNUe7_-7SAFY9-LlMpUCgiTFVnVYA_R-Wv4p_jqaqxy.png
  alt: meta quest 3
---

# Comparison of Current XR Development Platforms

## 1. Overview

XR development is heavily dictated by the choice of game engine. Before initiating a project, it is critical to determine the target hardware and environmental requirements, as these factors define the development constraints. 

Due to hardware availability, this paper focuses exclusively on development for the Meta Quest 3.

### 1.1 Hardware Architectures: PC VR vs. Standalone

For Head-Mounted Devices (HMDs) like the Meta Quest, two primary architectural configurations exist:

1.  PC VR (Tethered): The headset acts as a peripheral. Assets are rendered on a high-end PC and streamed to the device via a wired (Link) or wireless (Air Link) connection. This allows developers to utilize the full power of engines like Unreal Engine, enabling high-fidelity features such as Lumen and Nanite. PC VR also supports specialized peripherals like haptic suits or omnidirectional treadmills, as seen in industry-standard titles like Half-Life: Alyx.

![Player playing Half-Life: Alyx on a treadmills](https://res.cloudinary.com/dmq8ipket/image/upload/v1774950718/download_trymwz.jpg)

2.  Standalone VR (All-in-One): Standalone headsets are self-contained systems with internal mobile chipsets. These provide high mobility but require significant optimization. High-end features must often be disabled or simplified to maintain performance. However, lightweight engines like Unity or Godot excel in this space, offering a balance between visual quality and mobile performance. 

![meta quest 3](https://res.cloudinary.com/dmq8ipket/image/upload/v1774953924/www.meta.com_quest_quest-3__srsltid_AfmBOoqs1QjxuoVjeYycRNUe7_-7SAFY9-LlMpUCgiTFVnVYA_R-Wv4p_jqaqxy.png)

Rendevski et al. (2022) note that Standalone VR (SVR) applications offer significant advantages over PC VR. With proper optimization techniques, almost any PC VR scenario can be developed and deployed as SVR while still providing an acceptable user experience. 

Interestingly, a recent survey from the Game Developers Conference (GDC) shows that among developers interested in creating VR/AR/MR games, the SteamVR platform (PC VR) slightly surpassed the Meta Quest / Horizon Store (68% vs. 64%) as their platform of interest. These were followed by PlayStation VR/VR2 (34%) and Apple visionOS (15%). However, when filtering for developers who have actually worked on VR/AR/MR games, a strong preference remains for the Meta Quest (72%) over SteamVR (59%).

## 2. Passthrough (video see-through)

Mixed reality (MR) headsets create immersive experiences designed to spatially integrate virtual content into the physical world. The newest headsets rely on passthrough video. While using passthrough, a person does not see light from the real world but instead relies on stereoscopic, color, high resolution, low latency, real-time video of the world, which is displayed on small screens inside a headset.(Bailenson et al., 2024)

Waldow et al. (2025) investigates Pass-Through Embodiment (PTE), The study found that PTE significantly enhances the user’s sense of presence and embodiment compared to using a customizable digital avatar. The ability to see one’s own body strengthens the feeling of being physically "present" in the VR environment without negatively affecting performance or causing sickness.

Leveraging passthrough on modern XR devices can help developers build highly engaging mixed-reality environments, which is particularly beneficial for applications like prototyping drone simulations.

### 3. Software Standards and Frameworks

To ensure cross-platform compatibility, developers rely on unified industry standards. Currently, there are two major public standards:

* OpenXR
* WebXR

#### 3.1. OpenXR

OpenXR is the industry-standard API for XR applications. It is the interface between an application and an in-process or out-of-process “XR runtime system”. The runtime system handles functionality such as frame composition, peripheral management, and raw tracking information (Khronos OpenXR Working Group, 2024). Major game engines and the Meta Spatial SDK are built upon OpenXR to ensure hardware-agnostic development.

#### 3.1.1. Development Workflow Challenges

A primary bottleneck in XR development is the "deployment loop." Compiling a standalone APK and pushing it to a device can take 10–15 minutes per iteration. 

* Link Mode: Developers often use the Oculus Link App to preview scenes in PC VR, though this requires constantly putting on and taking off the headset.

* Simulators: The Meta XR Simulator is increasingly becoming the preferred method for rapid iteration, allowing developers to simulate head and controller movements directly on their PC without needing physical hardware.

### 3.2 WebXR

The WebXR Device API provides the interfaces necessary to enable developers to build compelling, comfortable, and safe immersive applications on the web across a wide variety of hardware form factors (World Wide Web Consortium, 2022).

WebXR serves as a higher-level abstraction that runs in the browser, combining older specifications from WebVR and WebAR. The WebXR standard shares core features with and can be viewed as a subset of OpenXR. 

#### 3.2.1. Development Workflow

While traditional game engines do offer WebXR export support, there are fewer dedicated development stacks built exclusively for it. This section focuses specifically on engines that directly call the browser API. 

For security reasons, WebXR APIs are restricted to HTTPS. Consequently, developers must use port-forwarding technologies during local development. Thanks to the efficiency of the web stack, a WebXR application typically only requires a few seconds to bundle. It is worth noting, however, that web rendering technology is currently transitioning from WebGL2 to WebGPU, which may introduce API changes in the WebXR ecosystem.

### 3.3. Engine Comparison

| Feature | Unreal Engine (5.7) | Unity (6.0) | Godot (4.6) | Wonderland Engine |
| :--- | :--- | :--- | :--- | ---|
| Primary Language | C++ / Blueprints | C# | GDScript / C# / C++ | JavaScript / TypeScript |
| Physics Engine | Chaos Physics | NVIDIA PhysX / DOTS | Jolt Physics (Integrated) | NVIDIA PhysX |
| Rendering Tech | Lumen (Dynamic GI) & Nanite (Virtual Geometry) | URP / HDRP | Forward+ / Mobile |  WebGL2  |
| Meta Support | Fork build | First-class Support | Community-driven (GDExtension) | no support |
| Machine Learning Support | Learning Agent | ML Agents | Godot RL Agents  | no support |
| Editor Size(XR plugin included) | ~50GB+ | ~20GB | < 1GB | 200MB |

#### 3.3.1. Unreal Engine

Known for photorealistic rendering, UE provides unparalleled visual fidelity. Its Chaos Physics engine is highly regarded for complex simulations, making it the foundation for projects like Microsoft’s AirSim. However, UE has a high barrier to entry: the editor is massive, and utilizing Meta’s private APIs often requires compiling a custom engine branch from source.

#### 3.3.2 Unity

Unity remains the most popular choice for Meta Quest development due to its mature SDK support and C# scripting. While it uses PhysX by default, its DOTS (Data-Oriented Technology Stack) provides high-performance physics for complex drone swarms. It offers the most streamlined "out-of-the-box" experience for Standalone VR.

#### 3.3.3 Godot

Godot 4.6 has emerged as a powerful, lightweight alternative. It is highly compatible with modern AI coding assistants due to its Python-like GDScript. The integration of Jolt Physics as the default 3D engine has resolved previous performance hurdles for VR. However, its XR ecosystem is largely community-maintained. While excellent for prototyping, the lack of official Meta API support and the potential instability of third-party GDExtensions require careful dependency management for production-grade projects.

#### 3.3.4 Wonderland Engine

Wonderland Engine is a specialized WebXR engine built in C++ and compiled to WebAssembly.  By leveraging WebGL2, it achieves the performance necessary to render thousands of objects at native frame rates directly within a browser. . The development workflow relies on JavaScript and TypeScript, providing a highly familiar and accessible environment for traditional web developers. A unique advantage is the ability to edit scenes directly on the headset, enabling instant feedback without removing the device.

---

Rendevski, N., Trajcevska, D., Dimovski, M., Veljanovski, K., Popov, A., Emini, N., & Veljanovski, D. (2022). PC VR vs Standalone VR Fully-Immersive Applications: History, Technical Aspects and Performance. 2022 57th International Scientific Conference on Information, Communication and Energy Systems and Technologies (ICEST), 1–4. https://doi.org/10.1109/ICEST55168.2022.9828656

Game Developers Conference. (2026). 2026 state of the game industry report. https://reg.gdconf.com/2026-SOTI

Vona, F., Schorlemmer, J., Stern, M., Ashrafi, N., Vergari, M., Kojic, T., & Voigt-Antons, J.-N. (2025). Comparing Pass-Through Quality of Mixed Reality Devices: A User Experience Study During Real-World Tasks (arXiv:2502.06382). arXiv. https://doi.org/10.48550/arXiv.2502.06382

Bailenson, J. N., Beams, B., Brown, J., DeVeaux, C., Han, E., Queiroz, A. C. M., Ratan, R., Santoso, M., Srirangarajan, T., Tao, Y., & Wang, P. (2024). Seeing the world through digital prisms: Psychological implications of passthrough video usage in mixed reality. Technology, Mind, and Behavior, 5(2), 43–58. https://doi.org/10.1037/tmb0000129

Bailenson, J. N., Beams, B., Brown, J., DeVeaux, C., Han, E., Queiroz, A. C. M., Ratan, R., Santoso, M., Srirangarajan, T., Tao, Y., & Wang, P. (2024). Seeing the world through digital prisms: Psychological implications of passthrough video usage in mixed reality. Technology, Mind, and Behavior, 5(2), 43–58. https://doi.org/10.1037/tmb0000129

Nasehi, M. (2025). A Comprehensive Review of FPV Technology: Applications, Advantages, and Future Trends. Machine Learning Research, 10(1), 25–31. https://doi.org/10.11648/j.mlr.20251001.13

World Wide Web Consortium. (2022, March 31). WebXR device API. https://www.w3.org/TR/webxr/

Khronos OpenXR Working Group. (2024). OpenXR 1.1 specification. Khronos Group. https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html
