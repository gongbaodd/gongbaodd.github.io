---
type: post
category: fe
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1783169139/Capture_h0v4kw.jpg
    alt: captured
tag:
    - UE
---

# Pixel Streaming

After Unreal Engine 4.23, Unreal Engine stopped supporting web rendering. 
Instead they started to use webRTC to stream game to the web.

From Unreal Engine 5.6, pixel streaming is stable enough for public use. 
The screenshot shows [Your First Game in UE 5](https://dev.epicgames.com/community/learning/tutorials/e2V/your-first-game-in-unreal-engine-5) running in the browser.

![My First Game](https://res.cloudinary.com/dmq8ipket/image/upload/v1783169139/Capture_h0v4kw.jpg)

Here is [the manual](https://dev.epicgames.com/documentation/unreal-engine/getting-started-with-pixel-streaming-in-unreal-engine). 

The server side source code is hosted on [github(EpicGamesExt/PixelStreamingInfrastructure)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/).

The game should start with parameter `-PixelStreamingURL=ws://127.0.0.1:8888` to send game data to the server.

However, all the browser share one session, as it is just streaming.