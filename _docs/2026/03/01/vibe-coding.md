---
type: post
category: fe
tag:
    - vibe-coding
    - LLM
cover:
    url: https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/40922820/40922820-1754219676687-e0d3d11be8014.jpg
    alt: podcast
series:
    name: Vibe Coding
    slug: vibe-coding
---

# The Podcast Page

After [last week’s](/tech/2026/02/25/ai-agents) struggle with local vibe coding, I shifted my focus to remote models. The result? You can now see a live [podcast page](/podcast) on this site. Here is how it went down.

### From "Hard Work" to "Skills"
As an avid podcast listener, I often struggle with episodes in Russian or German. My goal was simple: send a Pocket Casts link to an LLM, have it find the episode on Apple Podcasts (which provides transcriptions), and generate a summary.

Initially, this was a heavy lift for **OpenClaw**. Running the sequence through **Claude 4.6 Opus** cost roughly $0.30 per summary. However, we are now in the "Skill Era." I instructed OpenClaw to save those logic steps into a reusable **Skill**. Now, the heavy lifting is handled by **Gemini 2.5 Flash Lite**. It’s incredibly efficient; even after multiple runs, the cost hasn't even hit half a cent.


### The "Unsupervised" Myth
Then came the true "vibe coding" test. I used **Claude 4.5 Haiku** with OpenCode, attempting to stay hands-off. You’ve likely seen videos of developers "unsupervised" while agents build entire projects. Honestly? **It’s fake.**

The biggest hurdle is the **Agentic Loop**. As a project grows, the context expands, and agents often lose their place and repeat tasks. Without supervision, an agent will happily burn through your credits while running in circles. My "hands-off" attempt cost 30 cents and didn't even deliver a basic player widget.

My dream was to set a plan at night and wake up to a finished product. We aren't there yet.

### The Good, The Bad, and The Messy
When I finally stepped in to supervise the creation of the podcast card you see on this blog, the code quality was... questionable.
* **The Ugly:** The agent used an excessive amount of `any` types and redundant `if-else` blocks. This bloats the context window—which, cynically, earns the LLM providers more money via token usage.
* **The Good (Skills):** Summarizing prompts into "Skills" is a game-changer for repetitive tasks. It keeps the context clean and the costs down.
* **The TUI Comeback:** Because LLMs are such resource hogs, running a heavy IDE alongside them is a struggle. Switching to **LunarVim** (TUI) was buttery smooth. As long as memory shortages exist, Terminal User Interfaces will remain king.
* **TDD (Test Driven Development):** I’m using LLMs to generate unit tests as snapshots.

The "vibe" is getting stronger, but for now, the developer still needs to keep one hand on the wheel.