---
type: post
category: fe
tag:
    - rspack
cover:
  url: https://assets.rspack.rs/rspack/assets/rspack-v1-0-homepage.png
  alt: rspack log
---

# ⚡ Rebuilding a Project with Rspack

In [Babylon Editor & Babylon Toolkit](/fe/2025/06/17/babylon-toolkit), I mentioned that the old project template was using **Webpack**, which was painfully slow. Migrating to **Vite** was tricky because of all the legacy tech involved.  

I heard that [Rspack](https://rspack.rs/) has **great Webpack compatibility**, so I decided to give it a try — and wow, it was **super easy**.

### Install Rspack

```bash
yarn add @rsbuild/core @rsbuild/plugin-react
```

Add scripts in package.json

```json
{
  "scripts": {
    "build": "rsbuild build",
    "dev": "rsbuild dev --open",
    "preview": "rsbuild preview"
  }
}
```

Add rsbuild.config.ts

```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
});
```

That’s it! Everything just works — you don’t even need an index.html file. 🚀

Rspack feels like a lightning-fast, Webpack-compatible alternative that’s perfect for legacy projects.