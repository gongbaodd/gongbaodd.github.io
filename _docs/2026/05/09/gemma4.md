---
type: post
category: tech
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1778313496/Screenshot_20260509_104540_csjvof.png
    alt: slot machine
---

# Gemma 4 is Good 🤖

<iframe width="315" height="560" 
  src="https://www.youtube.com/embed/6kRUd-qDS4s" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>

Last month, I talked about [Bolt.diy](/tech/2026/04/06/bolt-diy) where I used **Qwen2.5-code** to make local AI vibe coding. 💻

There is a website, [canirun](https://www.canirun.ai), where I can find the models that I can run on my hardware. 🔍

Recently, my YouTube timeline was booming with news about how good **Gemma 4** is. 📈 I thought it was just hype at first. But as I changed to **Linux**, I have more resources to access. I decided to try it. 🐧

I downloaded `gemma-4-e4b`. It has 7.5B parameters (4 experts) and is only 6.3GB. 📦 I changed the load into max, context length to 131,072, and GPU Offload to 42. These parameters allow it to perform tool-use, such as creating files. 🛠️

Then, in **VS Code**, I installed the [Continue](https://www.continue.dev) extension. It can connect to a local model. Change the `config.yaml` as follows: ⚙️

```yaml
name: Local Config
version: 1.0.0
schema: v1
models:
  - name: LM Studio
    provider: openai
    apiBase: http://localhost:1234/v1
    model: lmstudio
    roles:
      - chat
      - edit

```
