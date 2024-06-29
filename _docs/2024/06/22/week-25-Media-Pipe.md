---
type: post
category: plan
tags:
    - Media Pipe
    - getUserMedia
---

# Week 25: Media Pipe

Earlier this year, I bought a galaxy watch with a lot workout tracker. However, there is one not included in them. A tracker for dumbbell curls. After some researches, I got two plans, one is write an app for wearables, the other is write a mirror app on phones.

Writing a workout mirror is simpler, because I can just use web stack which is the stack I am most familiar with. Luckily, Google's Media Pipe supports web stack.

I tried two implementations of `@mediapipe/tasks-vision`.

- [gesture recognizer](https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer)
- [pose landmarker detection](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker)

## How the App works

The page will firstly ask permission on camera.

Then it will use the gesture task to recognize the hand gestures.

After receiving the thumb up gesture, the app will start count down for 3 seconds.

Then start counting dumbbell curls, the maximal curl angle is 120 degree, the minimal is 110 degree.

The App will add one when the arm angle is smaller than 110 degree and go into pending state until the arm angle is larger than 120 degree

## Problems

### Web camera resolutions

using [`navigator.mediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) API to access the camera. But the [constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) about the video parameter is very raw. You can not specify landscape state or portrait state. Finally, I'd go with the default mode. But I was not satisfied with that.

### multiple people problem

The camera can catch more than one person. `result.landmarks` is an array. That cause another problem, I am not sure media pipe always keep the orders in the camera.

### Calculate arm angle

A shallow though of the arm angle of a dumbbell curl, is that it will be 180 degree at the maximum and 90 degree at the minimum. But actually it was not. I have to record a series angles with timestamps, pasting them in google sheet to draw a cycle curve. And finally get the results, 110 - 120. The values were not as expected. I guess that's why dumbbell curls was not included in the Sumsung health app.