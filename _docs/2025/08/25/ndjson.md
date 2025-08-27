---
type: post
category: fe
series:
    name: "website-rebuild"
    slug: "website-rebuild"
tag:
    - SSE
    - NDJSON
    - Streaming
---

# 🌊 SSE & NDJSON: Streaming Data Like It's 2014

About 10 years ago, during my internship at Qunar.com, I watched a colleague work on this cool project to tail log files in real-time 📄. They were streaming log data to the frontend using SSE (Server-Sent Events) - that's when I first discovered SSE and NDJSON (Newline Delimited JSON) ✨.

Back then, streaming data felt like the future of frontend development! 🚀 WebSocket was just gaining traction, everyone was buzzing about using RxJS to handle stream events, thinking it would become the next big thing. Fast forward to today though... WebSockets are mostly limited to chat rooms, and SSE? Well, it's kind of fallen into obscurity 😅.

## 📡 SSE is Back (Thanks, ChatGPT!)

Funny how things come full circle! With the ChatGPT boom, SSE is having its moment again 🎯. 

Here's the deal with SSE on the backend: it's basically a keep-alive GET request where you set the content header to `Content-Type: text/event-stream`. Every message follows the simple format of `data: <message>\n\n` 📝.

```js
app.use(async (ctx) => {
  if (ctx.path === "/events") {
    ctx.req.setTimeout(0); // prevent Node from auto-killing the connection
    ctx.type = "text/event-stream";
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");

    let count = 0;
    const stream = ctx.res;
    const interval = setInterval(() => {
      stream.write(`data: ${count++}\n\n`);
    }, 1000);

    ctx.req.on("close", () => clearInterval(interval));
  }
});
```

On the frontend, the `EventSource` API makes it super easy to catch these messages 🎣. When a message arrives, it automatically strips the `data:` prefix for you:

```js
const evtSource = new EventSource("/events");

evtSource.onmessage = (e) => {
  console.log(e.data); // logs: 0 (just the string, no "data:")
};
```

Pretty neat, right? 😎

## 📄 NDJSON: Line by Line JSON Magic

NDJSON is a bit different from SSE - it's a file format (`application/x-ndjson`) where each line contains a valid JSON object, separated by newlines `\n` 📋. I actually implemented this on my [blog list page](/all) - when you hit "load more," the posts stream in block by block!

The tricky part? Browsers don't have built-in NDJSON parsers 🤷‍♂️, but hey, we can roll our own with generators! However, it's definitely more complex than regular requests:

- 🧩 The last line might be incomplete, so you need to buffer it until the next chunk arrives
- ⚡ Chunks can load super fast, so you'll want to add some debouncing to avoid crazy re-rendering

```js
async function streamPosts() {
    $loading.set(true)
    for await (const post of stream()) {
        const _posts = $posts.get()
        
        await delay(100) // Give it a breather 😅
        
        $posts.set([..._posts, post])
    }
    $loading.set(false)
}

function* stream() {
    const response = await fetch(url)
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        let lines = buffer.split('\n');
        buffer = lines.pop()!; // Keep that incomplete line safe!
        
        for (const line of lines) {
            if (line.trim() === '') continue;
            try {
                const obj = JSON.parse(line);
                yield obj
            } catch (err) {
                console.error('Invalid JSON line:', line);
            }
        }
    }
    
    // Don't forget the last line! 🎯
    if (buffer.trim()) {
        try {
            const obj = JSON.parse(buffer);
            yield obj
        } catch (err) {
            console.error('Invalid JSON line:', buffer);
        }
    }
}
```

## 🎭 Final Thoughts

Streaming data still looks pretty cool even today! ✨ But let's be real - compared to just loading everything at once, it adds quite a bit of complexity during loading states. And don't even get me started on error handling and retries 😬.

That said, there are still some niche scenarios where it shines 🌟. Plus, with React Server Components on the horizon, we might see streaming tech make another comeback - though it's still too early to tell what that'll look like!

Sometimes the old becomes new again 🔄.