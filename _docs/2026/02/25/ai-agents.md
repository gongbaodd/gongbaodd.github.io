---
type: post
category: tech
tag:
  - openclaw
  - opencode
  - LLM
---

# 🤖 AI Agents

This isn’t a post about how *successful* AI is. It’s more about my hands‑on experience running local LLMs on my new Mac mini. 🖥️✨

## 🐾 Openclaw

The first thing I wanted to try on my new machine was **Openclaw**—it’s been everywhere lately. Installing and configuring it was surprisingly easy. Just follow the instructions on the [official website](https://docs.openclaw.ai/start/getting-started). 🚀

I’m using **Ollama** to run local models. Openclaw recommends `glm-4.7-flash:latest`, but that one doesn’t run on my device, so I switched to `qwen3:8b`.

Before using it, I had to increase the default context length, which was way too small. Here’s what I did:

1. **Create a Modelfile**

   ```shell
   echo "FROM qwen:8b" > Modelfile
   echo "PARAMETER num_ctx 32768" >> Modelfile
   ```

2. **Create the new model**

   ```shell
   ollama create qwen-claw -f Modelfile
   ```

3. **Run configuration**

   ```
   openclaw configure
   ```

However… one simple “hello” takes almost **2 minutes** to respond on telegram. 🐌💬  
A remote model is definitely needed for a smoother experience.

## 🧩 Opencode

My experience with **Opencode** was quite different. I tested two models:

- `qwen2.5-coder:7b`
- `qwen3:8b`

Results weren’t great:

- `qwen2.5-coder` hallucinated and got stuck in tool‑calling loops 🤯🔧  
- `qwen3` kept repeating itself endlessly 🔁😵

Not ideal for coding tasks at the moment.
