---
type: post
category: fe
tag:
    - Unity
    - XR
---
# XRUIs in Unity

Exploring the top three UI frameworks for XR development in Unity. Whether you are building for OpenXR or specific hardware like Meta Quest, choosing the right toolkit is essential. 🛠️

---

## 🛠️ The Big Three Toolkits

### 1. Unity XR Interaction Toolkit (XRI) 📦

The most widely used framework. It is designed to support **OpenXR standards** using native Unity components, making it a versatile choice for cross-platform development.

### 2. Meta Interaction SDK (ISDK) 👓

Meta provides the **ISDK** specifically for its hardware ecosystem.

* **Compatibility Note:** Although Meta is a major stakeholder in OpenXR, Meta XR SDKs are generally **not compatible** with non-Meta OpenXR devices.

### 3. Mixed Reality Toolkit (MRTK) 🌐

Originally by Microsoft, MRTK was open-sourced after their exit from the XR market.

* **Modern Architecture:** In its third version (MRTK3), it underwent a massive rebuild and is now fully built on top of **XRI**.

---

## 🏗️ Core Components of XRUIs

### Reference Spaces

This is the origin of rendering and defines the player's position in the virtual world. 📍

* **XRI:** Implemented as `XR Origin`.
* **ISDK:** Implemented as the `OVRCameraRig`.

To simplify configuration, these SDKs bundle **User Interactions** inside these objects, including:

* 🎥 **Camera**
* 👁️ **Gaze Interactor**
* 🎮 **Controller Objects (Left/Right):** Including Poke, Near-Far, Teleport Interactors, and Visuals.
* 🛤️ **Locomotion Setup:** Turn, Move, Grab Move, Teleportation, and Climb.
* ⚖️ **Teleport Stabilizer**

### The Comprehensive Interaction Rig

In the Meta Interaction SDK, the rig is a predefined collection of GameObjects. The **UnityXRInteractionComprehensive** prefab enables environment visibility and actions like grabbing or poking. It requires a working camera rig and adds support for hands, controllers, and controller-driven hands. 🖐️

---

## 🔄 Migration & Compatibility

### From Meta (ISDK) to Unity (XRI) ⬅️

Meta provides a [migration solution](https://developers.meta.com/horizon/documentation/unity/unity-isdk-getting-started-unityxr/) to move Meta projects to XRI (using XR Origin).

* **⚠️ Warning:** This is not a "solid" solution. You may encounter issues like **hand misplacement** during the transition.

### From Unity (XRI) to Meta (ISDK) ➡️

This is more difficult than it appears. Even if you place an `OVRCameraRig` in the scene, components won't interact because they are hardcoded to look for the `XR Origin`.

* **Workaround:** You can attempt to make the `XR Origin` invisible and align the `OVRCameraRig` to the same position. However, differences in **locomotion pace** often reveal that the player is controlling a different system.

---

## 🧩 Deep Dive into MRTK

### Unity 6 Compatibility Fix 🛠️

If you encounter `CS0234: The type or namespace name 'Universal' does not exist` in Unity 6, update your `Packages/manifest.json`:

```json
"com.unity.render-pipelines.universal": "17.2.0"
```

### Controller Mapping 🕹️

In the `XR Origin` "Near Far interactor," you must manually alter the **Select** and **Activate** actions. Since Microsoft MR controllers use a single trigger (rather than a grip + trigger combo), the default MRTK logic maps the old trigger logic to the grip.

### Essential MRTK Features:

* 📦 **BoundingBox:** Container for grabbable/scalable items.
* 💬 **Canvas:** Dialogue containers.
* 🔪 **ClippingBox:** Used for slicing 3D models.
* 🔡 **Font Icons & Pressable Buttons**
* 🗣️ **Spatial Scan & Speech Components**

> [!CAUTION]
> **Performance Note:** While MRTK is excellent for feature-rich environments, there are noticeable **performance concerns**. You may find some **lagging in the final build**, though it remains perfectly fine for prototyping. ⏳
