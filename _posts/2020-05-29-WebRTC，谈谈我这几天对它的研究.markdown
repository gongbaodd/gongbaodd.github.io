---
type: post
category: fe
tag:
  - webRTC
  - p2p
  - codesandbox
  - firebase
---

# WebRTC，谈谈我这几天对它的研究

WebRTC 是一个我在大学时期就关注的技术了，然而由于时间过早，很多技术细节都还在草案上就暂时罢休。今年年初，全世界都进入在家办公状态，视频会议工具被推到风口浪尖，webRTC 技术又一次被推到小高潮，于是便有了[这个实现](https://github.com/gongbaodd/ReactRTC)以及这篇文章。

## WebRTC 是什么

WebRTC 是实现网络端视频会议的技术，包括实现获取客户端的媒体 API，如获取摄像头以及麦克风的 `navigator.mediaDevices.getUserMedia()` 以及录制屏幕的 `navigator.mediaDevices.getDisplayMedia()`；还有实现双端数据传输的 `RTCPeerConnection` 类。

目前主流的实现方式是将用户本地视频上传到后台服务器，由服务器转发视频数据到客户端。很恐怖是吧，没错，这就是为什么疫情刚刚开始大部分视频服务都因为访问过多而宕机，但是因为技术架构相对简单，容易实现并可以迁移到多个平台上面。

WebRTC 依赖的是 P2P 技术，一旦两台机器实现连接，双方直接进行数据传输而不需要第三方转发，所以相对安全，但是实现细节比较困难，强烈推荐看一下 MDN 的[介绍](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)。

## 两台机器如何连接

P2P 说起来简单，实现起来并不容易，目前互联网主流使用 IPv4 协议，这意味着在网络环境中，真正暴漏的单一 IP 对应的是后台基于 NAT（Network Address Transition）技术连接的一簇终端设备。当我们使用网络传输数据时，是有一台暴露在外网的路由将收到的数据转发给自己的端口上面，但这一层转发，很多实现是广播的，意味着端口上面的每一台设备都能收到传输数据，如果要指定某台机器接收，需要在数据包里包含设备的描述，就好像 90 年代打电话往往要胡同门口小卖铺的王大爷叫一下。实现多设备链接就需要使用 ICE 技术（你的地址描述）的 TURN 或者 STUN 服务（提供地址描述的服务）。

### ICE 技术

ICE（Interactive Connectivity Establishment）技术，我称之为「破冰」技术，它提供一个通过 TURN 或者 STUN 服务获取的一堆关于本地地址的描述，在 webRTC 中可以[获得本地描述](https://codesandbox.io/s/reactrtc-f365m?file=/src/components/PeerConnection.tsx:2363-2403)和[添加远端描述](https://codesandbox.io/s/reactrtc-f365m?file=/src/components/PeerConnection.tsx:3078-3139)。

```typescript
useEffect(() => {
  // 获取本地地址
  connection.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      // TODO: 保存 `event.candidate.toJSON()` 到服务器
      // ...
    }
  });
}, [connection]);

const onGetRemoteCandidate = useCallback(async () => {
  // 添加远端地址
  await connection.addIceCandidate(new RTCIceCandidate(data));
}, [connection]);
```

### STUN 服务和 TURN 服务

STUN（Session Traversal Utilities for NAT）是一个能够帮助获取到客户端地址描述的协议。

![STUN 服务](https://mdn.mozillademos.org/files/6115/webrtc-stun.png)

在 RTCPeerConnection 中可以使用 google 的 STUN 服务。

```ts
const [connection] = useState(() => {
  return new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  });
});
```

而 TURN（Traversal Using Relays around NAT）则针对于只能接受对称 NAT（Symmetric NAT） 的路由器，设备对应的端口可变，相对于传统的锥形 NAT（Cone NAT），需要在 STUN 协议的基础上增加 Relay 转发。

![TURN 协议](https://mdn.mozillademos.org/files/6117/webrtc-turn.png)

如果心情好的话，你可以使用[COTURN](https://github.com/coturn/coturn)自己搭建一个 TURN 服务，更多关于 P2P 协议的描述可以参考[这篇博文](https://www.cnblogs.com/pannengzhi/p/5048965.html)。

### SDP 会话描述

如果你写过 HTTP 服务的话，一定会知道，要实现一个有状态的 HTTP 请求的实现基于会话，服务器和客户端通过一个会话 ID 实现双方的认证。会话在 P2P 下一样成立，这个会话 ID 则称为 SDP（Session Description Protocol）。

一个 SDP 的结构如下，m 表示会话中的媒体描述。

```ini
v=0
o=mozilla...THIS_IS_SDPARTA-76.0.1 8725109466872836540 0 IN IP4 0.0.0.0
s=-
t=0 0
a=fingerprint:sha-256 A9:89:58:E6:B5:E3:23:F8:F4:4C:15:13:58:F5:7B
a=group:BUNDLE 0 1
a=ice-options:trickle
a=msid-semantic:WMS *
m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8 101
c=IN IP4 0.0.0.0
a=sendrecv
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:2/recvonly urn:ietf:params:rtp-hdrext:csrc-audio-level
m=video 9 UDP/TLS/RTP/SAVPF 120 121 126 97
c=IN IP4 0.0.0.0
a=sendrecv
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:5 urn:ietf:params:rtp-hdrext:toffset
```

当然生成二进制 SDP 的过程是不需要人工字符串拼接的，可以使用`connection.createOffer`和`connection.createAnswer`生 SDP，并使用`connection.setLocalDescription`和`connection.setRemoteDescription`建立会话。

```ts
// 发起端生成SDP
const createOffer = useCallback(async () => {
  const offer = await connection.createOffer();
  await conn.setLocalDescription(offer);
  // TODO: 保存发起端的SDP到服务器
  // ...
}, [connection]);
```

## P2P 会议室的流程

### 事前准备

了解了上面的部分，我们需要如下内容以完成一次 P2P 连接

- 一个 STUN 服务或者一个 TURN 服务来获取地址描述
- 一台服务器，能够实现存储一端 ICECandidate（地址描述） 和 SDP（会话描述），并使另一端通过无论是 websocket 实现还是像 firebase 一样做轮询（polling）的技术获取数据。
- 两台终端设备，其实要的就是两个`RTCPeerConnection`，但如果需要视频会议的话，还需要两个以上摄像头（反正我有 3 台 PC~）。

### 1. 设置 RTCPeerConnection

注意，网上很多示例会创建一个`localConnection`和一个`remoteConnection`，因为他们是在一台终端上做演示，所以理论上如果只要两台设备联络，代码里面创建一个`RTCPeerConnection`就可以实现两台设备连接了。

[这里](https://codesandbox.io/s/github/gongbaodd/ReactRTC?file=/src/components/PeerConnection.tsx:618-663)因为项目用的是 React，我把实现封装成了一个`PeerConnection`组件。

```ts
const config = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const CTX = createContext<RTCPeerConnection | null>(null);

export const PeerConnection: FC = ({ children }) => {
  const [connection] = useState(() => {
    return new RTCPeerConnection(config);
  });

  return <CTX.Provider value={connection} children={children} />;
};
```

### 2. 处理本地 IceCandidate

建立好 RTCPeerConnection 对象后，需要收集本地的 IceCandidate 并上传至服务器。

```ts
useEffect(() => {
  // 获取本地地址
  // 假设这段代码是发起端，存储数据到callerAddress
  // 如果是接收端，则存储到calleeAddress
  connection.addEventListener("icecandidate", async (event) => {
    if (event.candidate) {
      const db = await firebase.firestore();
      const caller = await db.collection("callerAddress");
      caller.add(event.candidate);
    }
  });
}, [connection]);
```

### 3. 获得远端 IceCandidate

从数据库中中找到远端的地址（根据黑暗森林法则，如果知道对方地址，就可以杀死对方了），知道对方地址就可以建立会话了。

```ts
// 获得远端地址
// 同样假设这段代码是发起端
// 如果是接收端，则需要监视callerAddress
const db = await firebase.firestore();
const caller = await db.collection("calleeAddress");
caller.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    if (change.type === "added") {
      const address = change.doc.data();
      await connection.addIceCandidate(new RTCIceCandidate(address));
    }
  });
});
```

至此两边已经了解对方地址，可以进行会话了。

### 4. 发起方获得本地媒体数据

通过`navigator.mediaDevices.getUserMedia`获得媒体数据后，可以用`addTracks`函数把数据流添加到连接里面。

```ts
const getUserMedia = useCallback(async () => {
  const userStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  userStream.getTracks().forEach((t) => {
    connection.addTrack(t, localStream);
    console.log("[P2P] stream to peer", localStream);
  });
}, [connection]);
```

### 5. 发起方发送 offer SDP

了解对方地址之后，发起方就可以发送 SDP 来建立会话了。

```ts
const createOffer = useCallback(async () => {
  const offer = await connection.createOffer();
  await connection.setLocalDescription(offer);

  const db = await firebase.firestore();
  const offer = await db.collection("offer");
  offer.add({ type: offer.type, sdp: offer.sdp });

  return offer;
}, [connection]);
```

### 6. 接收方收到 offer，并返回 answer SDP

接收方通过轮询服务器得到 offer，为连接添加远端会话描述，生成自己的会话描述（answer SDP），并存储到服务器，注意，这些步骤是不能更换的。

```ts
const db = await firebase.firestore();
const offerRef = await db.collection("offer");
const answerRef = await db.collection("answer");

offerRef.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    if (change.type === "added") {
      const offer = change.doc.data();
      await connection.setRemoteDescription(offer); // 设置远端会话描述
      const answer = await conn.createAnswer(); // 生成本地会话描述
      await conn.setLocalDescription(answer); // 设置本地会话描述
      await answerRef.add(answer); // 存储本地会话到云端
    }
  });
});
```

### 7. 发起方收到 answer，会话建立

和接收方类似，发送方也需要从服务器收到会话的应答，设置好远端会话描述后，会话开始。

```ts
const db = await firebase.firestore();
const answerRef = await db.collection("answer");

answerRef.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    if (change.type === "added") {
      const answer = change.doc.data();
      await connection.setRemoteDescription(answer); // 设置远端会话描述
    }
  });
});
```

### 8. 收到远端媒体流

通过监听 track 事件，就可以获取远端媒体流了。注意，track 事件返回的是多个媒体流（因为 RTCPeerConnection 的`addTrack`可以使用多个媒体流），每个媒体流包括音轨和画轨。

```ts
const video = useRef<HTMLVideoElement>(null);

useEffect(() => {
  connection.addEventListener("track", ({ streams: [remoteStream] }) => {
    const stream = new MediaStream();
    remoteStream.getTracks().forEach((t) => stream.addTrack(t));
    video.current && video.current.srcObj = stream; // 设置HTML元素使用远端媒体流
  });
}, [connection]);
```

### 9. 会话结束

停止一个媒体流，要关闭它的轨道。

```ts
stream.getTracks().forEach((t) => t.stop());
```

关闭连接则需要调用`close`函数。

```ts
await connection.close();
```

## 传输文字信息

RTCPeerConnection 不仅仅可以传输媒体流，使用[RTCDataChannel](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Simple_RTCDataChannel_sample)可以传递文字信息。

每一个 RTCPeerConnection 建立之后会有一个"datachannel"事件，这个事件会返回一个 chennel 对象，用来接收发送方传来的数据。

```ts
connection.addEventListener("datachannel", ({ channel }) => {
  channel.addEventListener("open", () => {
    console.log("[P2P receiver] open");
  });
  channel.addEventListener("message", ({ data }) => {
    console.error("[P2P receiver] message", data);
  });
  channel.addEventListener("close", () => {
    console.log("[P2P receiver] closed");
  });
});
```

在发起端创建一个 datachannel 向远端发送数据了。

```ts
const sender = connection.createDataChannel("xxx");
// ... 发送信息必须在sender收到open事件后
sender.send("hello"); // 向接收端发送"hello"字符串
```

## 附录

### 实现多端链接

目前为止，RTCPeerConnection 只能做一对一连接。不过，要想实现多端连接，可以创建多个 RTCPeerConnection。那么一个浏览器最多能使用多少个 RTCPeerConnection 呢？根据[这篇文章](https://bloggeek.me/webrtc-rtcpeerconnection-one-per-stream/)，显然这个问题比较复杂，这个文章里面提过大概是 200 个，但由于网络等原因，可能并不能顺利建立这么多连接。

### 调试方法

我不太清楚出了什么状况，我的 demo 只能在火狐里面跑起来，但是调试起来类似，可以参考[这篇](https://testrtc.com/webrtc-internals-parameters/)。

### PWA 里面能用 P2P 吗

既然 DataChannel 能够实现端对端传输文字信息，那么结合 ServiceWorker 我们是不是可以创建一个完全去中心化的网页呢？答案是目前不可以，但是方案已经写进 webtorrent，具体内容可以在[此链接](https://github.com/webtorrent/webtorrent/issues/1721)跟进。

### CodeSandbox 的使用体验

CodeSandbox 可以理解为一个线上 Web 前端开发编辑器。

因为现在是五月末六月初，在大陆依赖于 npm 的开发到了无比艰难的一段时间，导致我开始不得不考虑在[CodeSandbox](https://codesandbox.io/)进行开发。开发体验还是很可观的，虽然写代码会出现不跟手的情况，偶尔代码会出现因为远端没同步导致丢失（好在可以通过 github 同步）。

我推荐以下情况可以考虑使用 codeSandbox：

- 一个全新的项目
- 项目比较简单，浏览器不至于卡死
