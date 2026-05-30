---
type: post
category: fe
---

# Google I/O '26: What's New in Chrome

Google I/O 2026 brought massive updates to the web platform, focusing heavily on built-in AI, the Agentic Era, next-gen UI/UX APIs, and modern developer tooling. Here is a comprehensive roundup of the key announcements.

---

## 🤖 Built-in AI & Developer Tooling

Google is bringing Gemini capabilities directly into the browser to enable local, low-latency AI experiences.

* **Gemini in Chrome**: Run AI models locally via On-Device Intelligence.
* **Early Preview Program**: Explore built-in AI capabilities at [goo.gle/chrome-ai-preview](https://goo.gle/chrome-ai-preview) and check documentation at [goo.gle/built-in-ai-docs](https://goo.gle/built-in-ai-docs).
* **Prompt API**: Use `api.LanguageModel` to interact with local models. Features include Summarizer, Rewriter, and structured outputs. 🛑 *Note: Chinese language support is currently unavailable.*
* **Chrome DevTools for Agents**: A new tool set to support multi-agent workflows, featuring an MCP (Model Context Protocol) server. Installable via NPM (`DevTools for agents`), it includes a dedicated rendering tab to help agents fix runtime errors. More details at [goo.gle/devtools-for-agents](https://www.google.com/search?q=https://goo.gle/devtools-for-agents).
* **AI-Assisted Tooling**: Join the trailblazers group at [goo.gle/trailblazers](https://www.google.com/search?q=https://goo.gle/trailblazers).

---

## 🌐 WebMCP & The Agentic Era

WebMCP prepares websites to interact seamlessly with AI agents using specialized APIs. Learn more at [goo.gle/webmcp-docs](https://goo.gle/webmcp-docs).

### How Agents Interact with the Web

Agents understand web pages by analyzing:

* 📸 Screenshots
* 🌳 DOM Structure
* ♿ Accessibility Tree

### Implementation Methods

* **Imperative**:
```javascript
navigator.modelContext.registerTool(...);
```


* **Declarative**:
```html
<form toolname="weather" tooldescription="Get current weather">
    <input toolparamdescription="City name"/>
</form>

```


### Ecosystem, Testing & Debugging

* 🔍 **WebMCP Model Context Tool Inspector**: Dedicated extension for debugging.
* 📊 **Evaluations**: Benchmark your agent-friendly sites using [goo.gle/lighthouse-github](https://goo.gle/lighthouse-github), [goo.gle/evals](https://goo.gle/evals), and [goo.gle/webmcp-evals-cli](https://goo.gle/webmcp-evals-cli).
* 🤖 **Automation**: Integrate agent testing with Puppeteer via [goo.gle/puppeteer-webmcp](https://goo.gle/puppeteer-webmcp).

---

## 🎨 Advanced UI & Next-Gen UX

### HTML in Canvas API

Render standard HTML content directly inside a Canvas element using APIs like `layoutsubtree`, `drawElementImage`, and `texElementImage2D`.

* Read the origin trial details: [developer.chrome.com/blog/html-in-canvas-origin-trial](https://developer.chrome.com/blog/html-in-canvas-origin-trial?hl=en)
* Three.js Example: [goo.gle/HIC-threejs-example](https://goo.gle/HIC-threejs-example)
* Resource Collection: [goo.gle/awesome-HIC](https://goo.gle/awesome-HIC) & [goo.gle/html-in-canvas-demos](https://goo.gle/html-in-canvas-demos)

### Modern CSS & Layout Enhancements

* **Color & Style**: `contrast-color()`, Style Queries, CSS `@if`, and `@supports at-rule()`.
* **Theming**: Experimental `light-dark()` support and custom functions like `@function --light-dark(--light, --dark)`.
* **Typography**: `meta name=text-scale`, `fit-width text`, and `text-box`.
* **Layout**: `gap decorations`, `scrollbar-aware viewport units`, and :
* **DOM Manipulation**: New native methods `insertBefore` improvements and `moveBefore` for preserving state during reordering.

### Animations & Transitions

* **Easings**: `linear()` generator at [goo.gle/spring-to-linear-generator](https://goo.gle/spring-to-linear-generator) and [goo.gle/natural-easings-dialog](https://goo.gle/natural-easings-dialog).
* **View Transitions**: Toolkit available at [goo.gle/view-transitions-toolkit](https://goo.gle/view-transitions-toolkit). Supports element-scoped view transitions ([goo.gle/element-scoped-view-transitions](https://goo.gle/element-scoped-view-transitions)) and two-phase layouts ([goo.gle/two-phase-view-transitions-explainer](https://goo.gle/two-phase-view-transitions-explainer)).
* **Entry Animations**: `@starting-style` for discrete property transitions. Read more at [goo.gle/web-animations-today-and-tomorrow](https://goo.gle/web-animations-today-and-tomorrow).

### Scroll-Driven Features & Gestures

* **Scroll Animations**: Resources at [goo.gle/scroll-driven-animations](https://goo.gle/scroll-driven-animations) and [goo.gle/scroll-triggered-animations](https://goo.gle/scroll-triggered-animations).
* **Native Scrollspy**: `css-scrollspy` and `scroll-target-group: auto`.
* **Scroll Control**: `scrollintoview-container` ([goo.gle/scrollintoview-container](https://goo.gle/scrollintoview-container)) and asynchronous awaiting ([goo.gle/scrollintoview-await](https://goo.gle/scrollintoview-await)).
* **State & Gestures**: `@scroll-state-scrolled`, hidey-bars ([goo.gle/hidey-bar](https://goo.gle/hidey-bar)), `sticky-per-axis` ([goo.gle/sticky-per-axis](https://goo.gle/sticky-per-axis)), and overscroll gestures, need to remember a strange overflow setup.

```css
.container {
  overflow-x: scroll;
  overflow-y: clip;
}
```

### Components & Shorthand

* **Dialog**: `dialog closedby="any"` for easier dismissals.
* **Shape**: `corner-shape` for advanced border styling.
* **Select**: `sibling-count()` and `sibling-index()` functions, alongside pseudos in JS.
* **Vibe Design**: Build modern web interfaces using **Stitch** and **Design.md**. Track soft navigations at [goo.gl/soft-navs](https://goo.gl/soft-navs).
* **Declarative Partial Updates**: Uses the **Stream HTML API** to stream partial page updates. Details at [goo.gl/declarative-partial-updates](https://goo.gl/declarative-partial-updates).

---

## 📈 Web Platform Progress & Security

* **Modern Web Guidance**: Learn modern web practices with the skill package at [goo.gle/mwg](https://goo.gle/mwg).
* **Baseline Checker**: Monitor platform feature readiness. View updates on [webstatus.dev](https://webstatus.dev).
* **Baseline Features Implemented**:
* ✨ View Transition
* 🗺️ Navigation API
* 🖼️ Largest Contentful Paint (LCP)
* ⚡ Interaction to Next Paint (INP)


* **Authentication**: Modernized workflows utilizing the **Digital Credentials API**, passkeys, and advanced digital credentials.
* **AI Coding Workflows**: Integration guide available at [goo.gle/bo3i0FzDUYo](https://youtu.be/bo3i0FzDUYo?si=EE2dMr6dc_oEiwni).

---

## 🧩 Extensions & Framework Ecosystem

* **Chrome Extensions DX**: Standardizing the `browser` namespace with APIs like `browser.tab.create()` and `browser.runtime.onMessage`. Learn more via [goo.gle/extentions-browser-namespace](https://goo.gle/extentions-browser-namespace) and boost skills at [goo.gle/extensions-skill](https://goo.gle/extensions-skill).
* **Angular**: Introduced new grammatical syntax sugar and the Angular Agent Skill framework.

---

### 📺 Source Videos

* 🎥 [What's new in Chrome](https://youtu.be/YuMdsHIXatY?si=h54LPgHg16tgcONj)
* 🎥 [Vibe design to build incredible web UI](https://www.google.com/search?q=https://youtu.be/nC7TrzUYvig%3Fsi%3DjL_hwUezjToggleA)
* 🎥 [Build your website for the agentic era](https://youtu.be/HdCc-KezQPk?si=Ia-zOKwGaAfp1gMJ)
* 🎥 [Elevate the Chrome Extensions developer experience](https://youtu.be/g2qrMnvvL6E?si=uChd0MiCePyGaJOq)
* 🎥 [Modernize authentication with passkeys, digital credentials, and more](https://youtu.be/xzMx2khmGJ4?si=1FxjVhG71_G-V0Am)
* 🎥 [Build next-generation UIs with the HTML-in-Canvas API](https://youtu.be/TUtKGTeFWjQ?si=pB8pgZohKgShaA2l)
* 🎥 [Unlock modern web capabilities in your AI coding workflows](https://youtu.be/bo3i0FzDUYo?si=EE2dMr6dc_oEiwni)
* 🎥 [What's new in Angular](https://youtu.be/MbkjTNg2rcg?si=tfolJu56LLFjFdwq)
* 🎥 [Build new features using built-in AI in Chrome](https://youtu.be/ddBxvuH35tI?si=Ciracyr0fEXS8DFB)
* 🎥 [Chrome DevTool for agents](https://youtu.be/1AD81ZselPk?si=WVleM3c1qsWadR7H)
* 🎥 [What's new in Web UI](https://youtu.be/uT7MVcCQ4rw?si=GFMKUVz494o2laC9)