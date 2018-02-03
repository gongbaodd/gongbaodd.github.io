---
type: post
category: fe
---
# Webpack + NestJS 全栈自动刷新

> 本来想写热启动, 算了, 其实就是刷新了, 实事求是点好.

去年我单位所有项目进入前后端同构的状态, 主要的工具是 NestJS 和 React,
但还没有做过热启动, 反正开始重写主页了, 顺带着做一下.

## NestJS 自动刷新

NestJS 本身就利用 Nodemon 实现了文件修改后自动重启.

```javascript
{
    "watch": [
        "src"
    ],
    "ext": "ts",
    "ignore": [
        "src/**/*.spec.ts"
    ],
    "exec": "node ./dev/index"
}
```

利用 ts-node 开发速度也比编译后再开发快很多

## NestJS 无缝使用 Express

NestJS 虽然基于 Express, 但是语法和 Express 区别很大, 好在可以直接把 Express 的实例作为子类使用

```typescript
async function bootstrap() {
    const instance = express();
    instance.use(morgan("short")); // 一个日志中间件
    const app = await NestFactory.create(
        ApplicationModule,
        instance,
    );
    await app.listen(8080);
}
```

## Webpack 自动刷新

webpack 自动更新, 简单地说就是用 webpackDevMiddleware 代替 express.static.

先给js里面加上webpack-hot-middleware/client, 这里偷下懒, 每次 index.tsx 更新后页面都会重启.

```javascript
// webpack.config.js
module.exports = {
    entry: [
        "./src/public/index.tsx",
        "./node_modules/webpack-hot-middleware/client.js?reload=true"
    ],
    output: {
        path: path.resolve(__dirname, "./dist/public/"),
        filename: "index.js",
        publicPath: "/public"
    },
}
```

server 部分, 要把 express.static 注释掉

```typescript
const webpackConfig: webpack.Configuration = webpackRawConfig as any;
const webpackCompiler = webpack(webpackConfig);
const webpackDevConfig: webpackDevMiddleware.Options = {
    publicPath: webpackConfig.output.publicPath,
};

instance.use(webpackDevMiddleware(webpackCompiler, webpackDevConfig));
instance.use(webpackHotMiddleware(webpackCompiler));
```

***nodemon 别加 tsx, 编译起来真的很慢***