---
type: post
category: plan
---

# 16th week: GUIs

last week, I tried using different GUI frameworks to build a vcode form.

[AntD](https://ant.design/) is a fully packed react component library. It is easy to use, and satisfies all the needs without picking.

[XState](https://xstate.js.org/) is a state machine/ One thing I like is that it can show the state into a graph. Compared to hooks or redux, this is a nice feature for refactoring.

[Vue](https://vuejs.org/), here are some [challenges](https://vuejs-challenges.netlify.app/) to learn vue. I used [Element+](https://element-plus.org/), which is a lot like AntD. Although many people think Vue is easier than React, I think it harder. to learn Vue you have to learn template syntax, an option style API and a composition API. Feels redundant.

[Svelte](https://svelte.dev/) with [SMUI](https://sveltematerialui.com/), I like material design a lot. Compared to React, Svelte is not so fully prepared. But the code is the simplest in all the frameworks I tried.

[Leptos](https://github.com/leptos-rs/leptos) a Rust GUI framework. With signal based reactive programming. It is like [SolidJs](https://www.solidjs.com/). It makes rust much easier to use. But WASM still a long way to go. The package is big, 2MB. The page needs to load for the whole file to run.

[Flutter](https://flutter.dev/) renders all element into canvas. But the framework is fully made. I might choose Flutter for my next project.
