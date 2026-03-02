---
type: post
category: plan
tag:
    - cloudflare
series:
    name: Vibe Coding
    slug: vibe-coding
---

# Week 12: Vibe Coding P2P Project

I used almost whole week to make a [p2p message project](https://p2p.growgen.xyz/). The goal is to sent URLs from one device to another but without the help of a back end server. As a simple project like this, it is not supposed to be this hard. I think I just used too many time on choosing a proper design.

Firstly I tried to use web-ble. However, I failed and I mentioned the process in [FAILED - Reverse Proxy WSL for Web-BLE development](/tech/2025/03/14/reverse-proxy-wsl). 

Then I decide to use native webRTC. To build a webRTC signal service, which is used to exchange the peer connection information. It needs a web socket server. I happened to use a deno server. Then I found that the deno deploy platform does not support web socket.

Then I decide to use render.com to make the server, and a supabase database tp store peer room information. During making it, I started to think it is too complex for a simple project. So I decided to use [peer.js](https://peerjs.com/) to make the peer connection. Good thing, peer.js has its own server to exchange the peer connection information. So I all I need to do is to use cloudflare workers to make a simple server.

As I was building the server, I found [itty-router](https://itty.dev/) to write cloudflare workers in express style. There are some bugs in the typescript definitions. But it works well. Validator I used [arktype](https://arktype.io/) something like zod but smaller.

I tried to use event source to subscribe the connection number, however cloudflare workers will cut down the connection after 30 seconds. But since peer.js will give the connection event. I can use it to update the connection number.

I didn't code all the projects. I used [bolt](http://bolt.new/) to test all the prototypes. Although many people said vibe coding is cool, I found that finally I modified 80% ~ 90% of the code. But yes, with AI to make project, it can fasten the prototype process, I do not need to stuck in trying.

As for the p2p project, I found that in some network, the peer connection will not be established. But under the same network, it works well. I guess this is a valuable project for VR. I will keep updating it. Maybe I will use astro to refactor it and use supabase to build a real database.