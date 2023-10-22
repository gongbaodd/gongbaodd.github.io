---
type: post
category: fe
---
# webpack 前端热更新

Webpack仅仅实现前端热更新要比前后端同构简单得多, sourceMap 是必须加的, 用来判断哪些文件更新.

```typescript
// webpack.config.ts
import * as webpack from "webpack";
import * as path from "path";

const config: webpack.Configuration = {
    entry: [
        "./src/index.tsx",
    ],
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "index.js",
        publicPath: "/public/",
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        hot: true,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}

export default config;
```