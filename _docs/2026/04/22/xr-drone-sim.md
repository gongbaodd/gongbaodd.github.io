---
type: post
category: tech
tag:
    - xr
series:
    name: Master Thesis
    slug: master
    number: 9
---
# Some OpenXR specs

> 「大事なのは技術ではなく、体験です。」“What matters is not the technology, but the experience.” --Shigeru Miyamoto

That is why we use paper prototype as the low fedility design. While goes to high fedility, we are usually got tied by the current technology. That's why 20 years ago, software needs a keyboard and mouse. 10 years ago, designed for touchables.

But we are in a new era. An era that we can extend our experience in reality. Furthermore, we can build a reality. 

So why not start a Funneling Approach, we use XR to build a reality to test what exactly element that is needed for progressive training.

## How to extend the reality

XR Environment Blend Mode, an OpenXR standard, 

- OPAQUE:  no view of the physical world
- ADDITIVE: video passthrough
- ALPHA_BLEND: 

using additive or alpha blend can make uninvasive experience for the players. As learners usually resist a totaly new environemt. We can make the user learn progressively.

## Research Objects

- Find a way to simulate FPV quadquoter physics. 
- Find a solution to make a co-training game AI for FPV quadquoter piloting.
- Find a set of instruments for prototyping high fedility enviroment in extended reality.

## XRUIs

Three prebuild UIs for XR will be mentioned here

1. Unity XR Interaction Toolkit (XRI) 📦
The most widely used framework. It is designed to support OpenXR standards using native Unity components, making it a versatile choice for cross-platform development.

2. Meta Interaction SDK (ISDK) 👓
Meta provides the ISDK specifically for its hardware ecosystem.
Compatibility Note: Although Meta is a major stakeholder in OpenXR, Meta XR SDKs are generally not compatible with non-Meta OpenXR devices.

3. Mixed Reality Toolkit (MRTK) 🌐
Originally by Microsoft, MRTK was open-sourced after their exit from the XR market. Modern Architecture: In its third version (MRTK3), it underwent a massive rebuild and is now fully built on top of XRI.

## Reference Spaces

- VIEW Reference Space: This space tracks the view origin used for rendering, typically following the user's head position. It is primarily used for "head-locked" content, such as a targeting reticle or a heads-up display (HUD)
- LOCAL Reference Space: This establishes a world-locked origin that is gravity-aligned to exclude pitch and roll. It locks in both its initial position and orientation at application launch or a calibrated zero position, providing a stable reference for standing-scale experiences where the user stays mostly in one spot.
- STAGE Reference Space: This is an optional, runtime-defined flat rectangular area that the user can walk around in. The origin is at the center of the rectangle on the floor, with the axes aligned to the rectangle's edges, making it ideal for room-scale content.
- LOCAL_FLOOR Reference Space: Introduced in OpenXR 1.1, this is closely related to the LOCAL space but places its Y-axis origin at the runtime’s best estimate of the floor level. It aligns with the LOCAL space's orientation and horizontal (X/Z) position but provides a floor-relative reference without requiring a full STAGE setup.

This is the origin of rendering and defines the player’s position in the virtual world. 📍

- XRI: Implemented as XR Origin.
- ISDK: Implemented as the OVRCameraRig.
To simplify configuration, these SDKs bundle User Interactions inside these objects, including:

- 🎥 Camera
- 👁️ Gaze Interactor
- 🎮 Controller Objects (Left/Right): Including Poke, Near-Far, Teleport Interactors, and Visuals.
- 🛤️ Locomotion Setup: Turn, Move, Grab Move, Teleportation, and Climb.
- ⚖️ Teleport Stabilizer

## XR iputs

- XR_ACTION_TYPE_BOOLEAN_INPUT: Used for digital inputs, such as button presses
- XR_ACTION_TYPE_FLOAT_INPUT: Used for 1D scalar analog inputs, like a trigger's pull amount
- XR_ACTION_TYPE_POSE_INPUT: Used for 2D analog inputs, such as thumbsticks or trackpads

Input subpaths,

Standard identifiers
- trackpad - A 2D input source that usually includes click and touch component.
- thumbstick - A small 2D joystick that is meant to be used with the user’s thumb. These sometimes include click and/or touch components.
- joystick - A 2D joystick that is meant to be used with the user’s entire hand, such as a flight stick. These generally do not have click component, but might have touch components.
- trigger - A 1D analog input component that returns to a rest state when the user stops interacting with it. These sometime include touch and/or click components.
- throttle - A 1D analog input component that remains in position when the user stops interacting with it.
- trackball - A 2D relative input source. These sometimes include click components.
- pedal - A 1D analog input component that is similar to a trigger but meant to be operated by a foot
- system - A button with the specialised meaning that it enables the user to access system-level

`XR_ACTION_TYPE_POSE_INPUT`

- grip: A pose that allows applications to reliably render a virtual object held in the user’s hand, whether it is tracked directly or by a motion controller. 
- aim - A pose that allows applications to point in the world using the input source, according to the
platform’s conventions for aiming with that kind of source.
- grip_surface - (Provided by XR_VERSION_1_1) A pose that allows applications to reliably anchor visual
content relative to the user’s physical hand, whether the user’s hand is tracked directly or its
position and orientation is inferred by a physical controller.

Extension interactions

XR_EXT_hand_interaction, XR_ANDROID_mouse_interaction

- pinch_ext: a 1D analog input component indicating the extent which the user is bringing their finger and thumb together to perform a "pinch" gesture. an be used as either a boolean or float action type
- aim_activate_ext
- grasp_ext

Unity XR Interaction Toolkit(XRI)

The most widely used framework. It is designed to support OpenXR standards using native Unity components, making it a versatile choice for cross-platform development.
