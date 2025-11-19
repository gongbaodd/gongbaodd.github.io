---
type: post
category: fe
tag:
    - entity-db
    - vector-db
    - rag
    - LLM
    - gemini
    - transformer
    - streamdown
    - portfolio
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1763559265/entity_csmuox.png
    alt: entity-db
---

# Build a Browser-Based RAG (No Server Required!) 🤯

Two years ago, I was tinkering with Chrome's built-in AI. Back then, it used the `window.ai` API. Naturally, in true tech fashion, that API has already been deprecated and sent to the graveyard. 🪦

Fast forward to last year: I noticed Google's [MediaPipe](/plan/2024/06/29/week-26-adb-over-wifi) was starting to integrate cool features like text embedding directly into Gemini.

Then, in the middle of this year, I dipped my toes into building a RAG (Retrieval-Augmented Generation) system using Supabase during the [Tallinn Valencia hackathon](/plan/2025/05/23/week-22-tallinn-valencia-hack). After that, I played around with Hugging Face's [transformer.js](/fe/2025/06/11/huggingface-transformer). Later still, I used [miniSearch](/fe/2025/08/12/minisearch) to build a tiny search engine for this blog and created an API to export my entire site's text content.

Basically, I've been collecting the Infinity Stones of browser AI. 💎

Recently, I stumbled upon a browser-based vector DB implementation called [EntityDB](https://github.com/babycommando/entity-db). That was the final piece of the puzzle.

Now, I have:
1.  A browser built-in LLM 🧠
2.  A browser built-in vector DB 🗄️
3.  An API that exports all my site's data 📄

Everything is ready to build a **fully browser-based RAG system**. Let's cook! 👨‍🍳

### The Master Plan 📝

- [x] Segment the text data into lines
- [x] Embed the text into tensors
- [x] Serialize the tensors into one big file
- [x] Install Chrome Canary and prep the LLM
- [x] Load the browser-based embedding model
- [x] Load the serialized data
- [x] Polish the LLM prompt
- [x] Implement Function Calling (Tool use)

---

## 1. Text Segmenting ✂️

At first, I tried to be a pure JS purist. I found a module called [@llm-tools/embedjs](https://github.com/llm-tools/embedJs) that seemed perfect.

But then... reality hit. 💥 The local LLM dev environment in JS just isn't as mature as Python's yet. I'm building this system as a monorepo in my blog (an Astro site). To cut a long story short: the package `sharp` (used by Transformer.js for images) started fighting with Astro's config (which *also* uses `sharp`). Dependency hell is real.

Also, the current version of EntityDB seems to only like Webpack bundlers. 🙄

Eventually, I swallowed my pride and moved the backend logic to **Python**. It just works. I used the standard splitter from LangChain:

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    separators=["\n\n", "\n", " ", ""],
    chunk_size=100,
    chunk_overlap=20,
    length_function=len,
    is_separator_regex=False,
)
```

## 2. Embedding Blog Text into Tensors 🔢

For the embedder, I initially tried [MediaPipe's text embedder](https://ai.google.dev/edge/mediapipe/solutions/text/text_embedder). It's super easy to use and Google has great [examples](https://mediapipe-studio.webapps.google.com/studio/demo/text_embedder). It spits out a 100-length 1-dimension Tensor.

**Plot twist:** I couldn't integrate it with EntityDB. The package only provides an interface for `transformer.js`. So, I had to use a Hugging Face model. The default is [`all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2), which is arguably better anyway (384-length tensor).

After exporting the `ndjson` file, I realized I had created a monster: the file was over **100MB**. 😱 That's because I was serializing tensors as plain text.

I put the file on a diet by serializing them as **Base64 binary text**. The result? A sleek **36MB**. Much better.

```python
import numpy as np
import base64

records = []
for post in posts:
  content = post.get("content", "")
  id = post.get("id", "")
  if not content:
    continue

  chunks = text_splitter.split_text(content)
  serialized_records = []
  for idx, chunk in enumerate(chunks):
    embbedings = model.encode(chunk)
    # Converting to float16 to save space!
    embedding_payload = np.asarray(embbedings, dtype=np.float32)
    embedding_payload = embedding_payload.astype(np.float16)
    embedding_buffer = base64.b64encode(embedding_payload.tobytes()).decode("ascii")
    serialized_records.append(
        {
            "chunk_index": idx,
            "chunk": chunk,
            "embedding_result_float16": {
                    "dtype": "float16",
                    "shape": list(embbedings.shape),
                    "buffer_b64": embedding_buffer,
            },
        }
    )
  records.append(
      {
          "id": id,
          "serialized_records": serialized_records,
      }
  )
```

One serialized post looks something like this:

```js
{
    'id': '2025/10/19/lison-maru',
    'serialized_records': [
        {
            'chunk_index': 0, 
            'chunk': '# The Sinking of Lisbon Maru', 
            'embedding_result_float16': {
                'dtype': 'float16', 
                'shape': [384], 
                'buffer_b64': 'AiM1LOQkviz6mYkpIqIiJnKhA6sc...' // Magic data 🧙‍♂️
                }
        }
        ... 
    ]
}
```

👉 *The full Python code is available [here](https://colab.research.google.com/drive/1wyBd9oV-tB2c0jVXjWUkz0oNxwQ4HL2T?usp=sharing).*

## 3. Install Chrome Canary & Prep the LLM 🐦

This part is easy. Just install the latest **Chrome Canary**, then follow the [instructions here](https://developer.chrome.com/docs/ai/get-started) to enable the AI flags.

Right now, you can play with the Prompt API [examples](https://github.com/webmachinelearning/prompt-api). The W3C proposal was just drafted [last month](https://webmachinelearning.github.io/prompt-api/). Fresh off the press!

I really wanted to use the [Writer API](https://developer.chrome.com/docs/ai/writer-api), but it seems my browser decided to hide it from me. No worries, the Prompt API will do the job.

## 4. Load the Embedding Model 📥

EntityDB makes this surprisingly simple:

```ts
export async function createDB() {
    const db = new EntityDB({
        vectorPath: "embedding",
        model: "Xenova/all-MiniLM-L6-v2", // HuggingFace model go brrr
    });
}
```

## 5. Load the Serialized Data 💾

In my [ndjson blog post](/fe/2025/08/25/ndjson), I used RxJS to stream the file. Here, I kept it simple.

EntityDB provides `insertManualVectors`, allowing me to inject text directly with its pre-calculated vector. This saves the browser from doing the heavy lifting of embedding everything again!

```ts
async function loadPostsRecords() {
    const db = $db.get()
    if (!db) throw new Error("Database not initialized. Call createDB() first.")

    try {
        const response = await fetch('/posts_records.ndjson')
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

        const text = await response.text()
        const lines = text.trim().split('\n').filter(line => line.trim())

        let totalInserted = 0
        let embedding: number[] = []

        for (const line of lines) {
            const post = JSON.parse(line)
            const { id, serialized_records: records } = post

            for (const record of records) {
                const { chunk, embedding_result_float16, chunk_id } = record

                // Decode base64 buffer
                const bufferBase64 = embedding_result_float16.buffer_b64
                const buffer = Uint8Array.from(atob(bufferBase64), c => c.charCodeAt(0))

                // Convert float16 back to float32 because JS likes it big
                embedding = float16ToFloat32(buffer)

                if(embedding.length < 384) {
                    console.log("Too short... that's what she said")   
                    continue
                }

                await db.insertManualVectors({
                    text: chunk,
                    embedding: embedding,
                    metadata: { id: id, chunk_id: chunk_id }
                })

                totalInserted++
            }
            console.log(`${id} inserted. Total: ${totalInserted}`)
        }
        return { success: true, totalInserted }
    } catch (error) {
        console.error('Error loading posts:', error)
        throw error
    }
}
```

And of course, we need a utility to decode that binary data back to a `float32` array. Dealing with binary data in JS is always a party. 🎉

```js
function float16ToFloat32(buffer: Uint8Array): number[] {
    const result: number[] = []
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    
    for (let i = 0; i < buffer.length; i += 2) {
        const uint16 = view.getUint16(i, true) // little-endian
        
        // Bitwise magic to convert float16 to float32 🪄
        const sign = (uint16 >> 15) & 0x1
        const exponent = (uint16 >> 10) & 0x1f
        const mantissa = uint16 & 0x3ff
        
        let float32: number
        
        if (exponent === 0) {
            float32 = (sign ? -1 : 1) * (mantissa / 1024) * Math.pow(2, -14)
        } else if (exponent === 31) {
            float32 = mantissa === 0 ? (sign ? -Infinity : Infinity) : NaN
        } else {
            const exp = exponent - 15 + 127
            const float32Bits = (sign << 31) | (exp << 23) | (mantissa << 13)
            const float32View = new DataView(new ArrayBuffer(4))
            float32View.setUint32(0, float32Bits, true)
            float32 = float32View.getFloat32(0, true)
        }
        result.push(float32)
    }
    return result
}
```

## 6. Polish the LLM Prompt 💅

I decided to use a "Two-Brain System".

**Brain 1: The Assistant.** It understands the user.
```ts
const session = await LanguageModel.create({
    initialPrompts: [
        {
            role: "system",
            content: `
            You are a helpful website guide for growgen.xyz.

            If you need called the "search" tool, you just return the JSON { "type": "search", query } on the first line with no extra content.
            Otherwise continue your answer.

            You have access to a "search" tool. Use it.`
        }
    ],
})
```

**Brain 2: The Writer.** It takes the raw search results and makes them sound smart.
```ts
const session = await LanguageModel.create({
    initialPrompts: [
        {
            role: "system",
            content: `You are answering a query request. You will get a list of post IDs. Polish the answer and make it look professional.`
        }
    ]
})
```

## 7. Implement Function Calling (Tool Use) 🛠️

Ah, Murphy's Law. Unexpected things are always expected.

Even though Chrome's blog keeps hyping up Function Calling (Tool Use), it's not *quite* fully baked yet. There is a [Structured Output API](https://developer.chrome.com/docs/ai/structured-output-for-prompt-api) which helps, but I it still better if the Tool use works fine.

I define the tool so the model knows it exists:

```ts
tools: [
    {
        name: "search",
        description: "Retrieves a list of blog posts matching the search query.",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "The keyword to search for" },
            },
            required: ["query"]
        },
        // This doesn't magically execute yet, but we can dream
        async execute({ query }: { query: string }) {
            // Logic here...
        }
    },
]
```

Since the automated execution isn't reliable, I handle it manually. When the LLM spits out that specific JSON format, I intercept it like a ninja 🥷, run the search against the DB, and then feed the results to the "Writer" brain.

I also used Vercel's [streamdown](https://github.com/vercel/streamdown) to make the response look pretty.

```ts
// Inside the stream loop...
if (trimmedLine === '```json') {
  expectingJsonLine = true;
  continue;
} else if (expectingJsonLine) {
    const parsed = JSON.parse(line.trim());
    console.log('Tool call detected:', parsed); // Gotcha!

    if (parsed.type === 'search') {
        const results = await search(parsed.query);
        const polishStream = await polish(results);
        
        // ... stream the polished results to the UI ...
    }
}
```

## Caveats of EntityDB ⚠️

It's not all sunshine and rainbows.
1.  **Single Table Only:** It seems like a bug, but EntityDB struggles with multiple tables even if you assign different names. One table to rule them all.
2.  **Duplicates:** If you insert the same data twice, you get duplicates. You have to handle deduplication logic manually.

## The Result 🎉

It actually works! A fully browser-based RAG system. No API keys, no cloud bills, just pure local compute power.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fTAmndZi1Wg?si=ucsvfQs8bj678zew" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
