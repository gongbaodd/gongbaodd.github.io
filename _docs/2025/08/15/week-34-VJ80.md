---
type: post
category: plan
cover:
    url: https://upload.wikimedia.org/wikipedia/en/9/95/Legendary_kiss_V%E2%80%93J_day_in_Times_Square_Alfred_Eisenstaedt.jpg
    alt: VJ Day from wikipedia
tag:
    - react
    - mantine
    - vibe-coding
series:
    name: "website-rebuild"
    slug: "website-rebuild"
---

# WEEK 34: VJ80

## 📅 About Today

Today marks **80 years since Victory over Japan (VJ Day)** in World War II.  
Back home, my school used to host movie events about peace every year. Many cities in my province commemorate **9/18** — the day Japan occupied the whole province. My city’s story was different: it was first a colony of Russia, then Japan, so by 9/18 it was already under Japanese rule.  

As China plays a bigger role on the global stage, some people now question why we still celebrate VJ Day.  
Their arguments?  
- The current Chinese government didn’t play a key role in that war.  
- Today, VJ Day is used more for propaganda, sometimes fueling hate toward Japan.  

When I was younger, VJ Day felt more like a **reminder of history and a hope for peace** — maybe I was just naive.  
Recently, I watched [a video by 柴静](https://youtu.be/Db17u8E1t0g?si=wxd1ntDHGbH67TuE) about the Chinese Civil War. One man who fled from northern China to Taiwan described both sides as *“too stupid to make such a pointless war.”*

It made me wonder — do adults ever have a “reset button” moment?  
Kids, when things go wrong, will cry or just throw everything away to start fresh. Adults restart too, but sometimes with far bigger consequences. In Chinese history, every 200–300 years there’s a “restart,” often halving the population. It’s like the system itself could only sustain so long before collapsing.  

But should a **system or methodology** ever matter more than human life?  
As an engineer, if a method doesn’t work, I try another — I don’t just rebuild from scratch unless I have to.  

Look at Japan’s invasion:  
- At first, they didn’t think they could defeat the Qing government — but they did.  
- Then they beat Russia.  
- Then came the global economic crisis — the resources from their conquests became economic support.  
Over time, **war became their “methodology”**, and even when it no longer worked, they stuck to it.  

So yes — I think we should remember this day. Not just the victory, but also the **cost of greed**.

---

## 💻 Website Rebuild

Last week, I turned the blog list into a **masonry layout**. Still a lot to do, but this week I:  
- Rebuilt the blog content page  
- Added a [spotlight search](/fe/2025/08/12/minisearch)  
- Added **two carousels** to the index page  
- Added **cover image support** to blog posts  
- And yes — finally made a **custom 404 page** (thanks to Kiro 🛠️)

### 🎨 Mantine

I have to say, [Mantine UI](https://mantine.dev/) helped a lot.  
It has tons of components, including **Spotlight** and **Spoiler**, which I ended up using instead of my custom versions. I did have to refactor quite a bit, but it’s worth it for maintainability.  

Some tweaks were needed to make them fit my requirements — especially since I’m mixing Mantine with Astro, which isn’t officially supported.

### 🤖 Kiro

I finally got invited to try [Kiro editor](https://kiro.dev). It’s an AI coding agent that plans first, then codes.  
I used it to make my 404 page — well-structured, but it had rendering bugs (partly my fault).  

Mixing Mantine + Astro for certain functions was… let’s say “adventurous” 😅.  
I also used [Cursor](https://cursor.com/) to build the history carousel on my index page. This time, I planned it out and let Cursor code — it worked fine, though it doesn’t say “no” even to bad requests.  

Right now, Cursor and [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) feel more useful to me than Kiro. But I’ll keep experimenting.
