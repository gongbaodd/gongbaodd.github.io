---
type: post
category: fe
series:
  name: "website-rebuild"
  slug: "website-rebuild"
---

# Page View Transitions Are Surprisingly Hard...

Back in [2023](/plan/2023/08/20/33rd-viewtransition), I stumbled upon Astro's absolutely gorgeous view transition effects and thought "I NEED this on my site!" 🤩 So naturally, I decided to completely refactor my website from Gatsby SPA to Astro MPA. 

Spoiler alert: I got completely burned out halfway through. 🔥

The differences between these two stacks were like comparing apples to... well, rockets. Plus, page view transitions were just an experimental Chrome feature back then - testing it was like trying to catch smoke with your bare hands. Eventually, I threw in the towel. 🏳️

But here's the thing - this unfinished project became my white whale 🐋. For years, I'd compulsively check for updates, hoping someone would make it easier. Well, guess what? They finally did!

## What Even Are Page View Transitions? 🤔

It all started with the browser's [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API). Remember the late 2010s SPA craze? Everyone was turning their websites into "apps" because PWAs were suddenly supported everywhere. 📱

But then developers realized something painful: JavaScript animations are performance nightmares. 😱 So they pivoted to CSS animations instead. The View Transition API basically said "Hey, we've learned from all your SPA struggles" and gave us a browser-level solution where you don't have to calculate tween animations manually anymore.

The coolest part? It works across document reloads! Even if your page refreshes, the animation won't break because it's handled by the browser itself. Magic! ✨

## Why I'm Not Here for SPAs 🙄

Hot take: I really don't like SPAs. Here's why they drive me crazy:

SPAs are basically websites cosplaying as native apps, but native apps actually give developers proper control. When a native app's UI thread crashes, it just restarts. But on a webpage? Everything runs on one thread, so when something breaks, your entire page freezes. Not fun. 🧊

Plus, SPAs need a "home view" for everything, which means you're sacrificing that crucial first render. Every route has to render the home view THEN the actual content. And don't get me started on bundle sizes - users have to download your entire site just to read one page! 📦

But the biggest issue? SPAs turn your stateless web pages into one giant, shared state tree. It's an architectural nightmare that requires way too much mental overhead to maintain properly. 🤯

## My MPA Transition Journey 🛤️

First rookie mistake: I forgot to turn off my system's "reduce motion" setting, so I couldn't see any animations! 🤦‍♀️ Thankfully, Astro is smart enough to warn you about this, but I still went down some pretty deep rabbit holes.

## Astro's Documentation Dilemma 📚

I love that Astro caught my attention because it's NOT trying to be another SPA framework. But here's the weird part - even their own docs suggest using [ClientRouter](https://docs.astro.build/en/guides/view-transitions/#:~:text=For%20enhanced%20client-side%20routing%20and%20view%20transition%20features,a%20single-page%20app%20with%20smooth%20animations%20on%20navigation.) to turn your site into... an SPA. 😕

This completely misses the point! MPAs and SPAs are fundamentally different architectures. Adding ClientRouter makes every page stateful and keeps singletons alive the entire time. Plus, Astro's auto-prefetch means you might have to wait for pages to download before they show up - totally different from native page transitions where the page appears instantly because it's already cached.

## When AI Gets It Wrong 🤖

I tried asking ChatGPT, Claude, and Gemini for help. Big mistake! First, none of them really understand Astro well enough to give accurate advice. Even when I provided documentation links, they kept steering me toward SPA solutions - exactly what I was trying to avoid! 

Pro tip: Sometimes the AIs are just making stuff up and won't admit when they don't know something. 🤷‍♀️

## Finally Finding Real Solutions 🕵️‍♀️

The View Transition API support is still pretty limited. According to [caniuse](https://caniuse.com/view-transitions), only Chromium-based browsers support it. In my testing, Chrome handles most transitions smoothly, while Edge drops some occasionally.

I was starting to think maybe I was the one hallucinating about this API until I found [Dave Rupert's blog post](https://daverupert.com/2023/05/getting-started-view-transitions/). Total lifesaver! 🙌 It confirmed that the AIs were the ones hallucinating, not me.

## The Actually Simple Solution ✨

Want to know the secret? It's ridiculously simple:

```css
@view-transition {
  navigation: auto;
}
```

That's it! If you just want a fade effect, you're done. 

But wait, there's more! The `view-transition-name` property is where things get really cool. If you've ever worked with Android's [Shared Element Transitions](https://developer.android.com/develop/ui/compose/animation/shared-elements), it's the same concept. You can have the same element appear on two different pages, and the browser automatically animates between them. Just keep the names unique across both pages and watch the magic happen! 🎭

You can even use pseudo-elements like `::view-transition-group($viewTransitionName)` to create custom transitions, though this will override the default tween animation.

## The Vite Gotcha 🪤

Here's one annoying issue with Vite: in dev mode, it bundles pages differently, which can cause `view-transition-name` conflicts. When names aren't unique, the animation falls back to a basic crossfade. 

The solution? Build your site first and use the preview mode for debugging. Not ideal, but it works! 🔧

## The Final Result 🎉

Check out what all this effort produced:

<video class="max-w-md" style="self-align: center;" src="https://res.cloudinary.com/dmq8ipket/video/upload/v1756901547/page_view_transition_uggncy.mp4" controls />

Was it worth the years of obsessing over this feature? Absolutely! Sometimes the simplest solutions hide behind the most complex journeys. 🌟