---
type: post
category: fe
series:
    name: "website-rebuild"
    slug: "website-rebuild"
tag:
    - PV
---

# 😔 Failed to add PV to My Website  

Believe it or not, the very *first* feature on my old Jekyll site in 2015 was a PV (page view) counter 👀.  
But when I rebuilt the site with Gatsby, I thought “eh, too easy, I’ll add it later...” — and then... I just never did 😂.  

A lot of sites use [不蒜子](https://ibruce.info/2015/04/04/busuanzi/) for PV counts, but I figured: why not build my own? 🤓  
Turns out, it’s super simple — just **two GET requests**:  
- one returns an image 🖼️  
- the other returns a JSON with the count 📊  

Now it’s running on **Cloudflare Workers + KV**, and you can spot the little 👁️ with a number on this site showing the PV count.  

If you’re curious, here’s the [health check link](https://pv.growgen.xyz/healthcheck) ✅  

---

However, this is me from 20th. As I mentioned, using KV turns out to be a terrible idea 🫨. Only in two days, I used up all my quota 🫠. Now, I have changed the PV service to [goatcounter](https://www.goatcounter.com/).