---
type: post
category: fe
cover: 
    url: "./snapshot.png"
    alt: "snapshot on the old build"
tag:
    - mantine
    - astro
    - react
series:
    name: "website-rebuild"
    slug: "website-rebuild"
---

# 🔨 Website Rebuild

Yep… I’m rebuilding my website **again** 😅.

## 📖 Story of the Website

Originally, this site was just for me to document [my graduation trip](/travel/2015/03/28/Bohai-Rim). Back then, I used **Jekyll** with a jQuery template. I never finished it because I couldn’t find a proper image hosting solution. Still, I kept posting tech articles along the way.  

In 2020, I migrated to [Gatsby](/fe/2020/03/05/Jekyll-Gatsby). I wanted **GraphQL** and a date-based folder structure. Looking back at my blog from 5 years ago… yeah, switching to Gatsby probably wasn’t the best idea 🤷. GraphQL was kind of disappointing, and I always wanted a better alternative.  

Fast forward to 2023, I saw Astro start supporting [View Transition](/plan/2023/08/20/33rd-ViewTransition) and thought it was the perfect time to switch. But migrating burned me out. Gatsby might have been complicated, but it handled markdown and images better than Astro at the time.  

On top of that, too many legacy files meant I had to consider **monorepo solutions**. I wasted a ton of time building a dark mode switch and infinite scroll. View Transition had lots of limitations too — it couldn’t be applied to any DOM element easily. Eventually, the UI ended up just using the original **shadcn** setup.

Recently, I had to rebuild again because every build was taking **over 44 minutes per commit** ⏱️. So here we go…  

## ⚡ This Rebuild

At first, I just wanted **incremental builds**, a feature introduced in Astro v4 but revoked in v5. I also considered switching stacks to [11ty](https://www.11ty.dev/) or [Hugo](https://gohugo.io/). But after the Gatsby migration experience, I realized transferring a content-heavy site is a nightmare — file structures, markdown, images, LaTeX… everything matters.  

So I decided to **stay on Astro**. The upside? Astro supports multiple frameworks for components. Personally, I like the **island architecture** more than RSC — it gives more flexibility than other frameworks.  

For UI, I switched from **shadcn** to [Mantine](https://mantine.dev/). Honestly, Mantine is way more equipped than shadcn (even with [Radix UI](https://www.radix-ui.com/)). I’m not a fan of big CSS resets, so this suits me better — although I’m still using Tailwind in parts.  

Some highlights:  
- Blog list page uses MUI’s [Masonry](https://mui.com/material-ui/react-masonry/) — I wanted masonry layout since the last build, and this one is much better, though still not perfect.  
- Mantine doesn’t officially support Astro, so a little tweaking was needed.  

This rebuild is not just cosmetic. The goal is to:  
1. Build an **in-browser AI** 🤖  
2. Support more **social content**  
3. Showcase my **portfolio**  

Right now, I’m still refining the UI, but I’m hopeful these goals will be met 🚀.
