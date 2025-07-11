---
type: post
category: fe
tags:
    - rspack
---

# Rebuild project using Rspack

In [Babylon Editor & Babylon Toolkit](/fe/2025/06/17/babylon-toolkit) I mentioned the old project template was using webpack and it was very slow, and because it uses many old techs, the vite migration is very hard.

I was told that [rspack](https://rspack.rs/) supports webpack well. So I tried to migrate the project to rspack. It was super easy.

Install rsbuild in the project

```shell
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

Then everything works, you do not event need an "index.html" file.