---
type: post
category: tech
---
# 起因

今年我开始在生产环境里试用node（貌似比很多人慢了一年......）。
由于公司node环境较低，我只能使用一款修改过的express，
为了解决兼容问题我还用typescript进行编译（事实证明typescript简直awesome）。

随着公司更新了新版的node（也不高，6.1.2）。我也有了更多选择，
有一天我在cnode上面看到了egg的发布，打算自己试一下。

## 废话少说，从快速入门开始

egg有一个详细的快速入门[https://eggjs.org/zh-cn/intro/quickstart.html]()，
但是时间紧张，我直接用脚手架建项目了。

    egg-init egg-example --type=simple

## 目录结构

我曾一度认为一个较好的框架其实不需要什么目录结构，自打我和其他人合作之后我就彻底打消这个念头了。

```shell
egg-project
├── tsconfig.json
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── ts
|   ├── router.ts
│   ├── controller
│   |   └── home.ts
│   ├── service (可选)
│   |   └── user.ts
│   ├── middleware (可选)
│   |   └── response_time.ts
│   ├── schedule (可选)
│   |   └── my_task.ts
│   ├── public (可选)
│   |   └── reset.css
│   └── extend (可选)
│       ├── helper.ts (可选)
│       ├── request.ts (可选)
│       ├── response.ts (可选)
│       ├── context.ts (可选)
│       ├── application.ts (可选)
│       └── agent.ts (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

删了项目里的app文件夹，并把app文件夹加到.gitignore里面。
修改tsconfig.json，css可以用别的工具解决，不在本次话题里面。

```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "commonjs",
    "outDir": "./app",
    "rootDir": "./src"
  }
}
```

另外，我把view文件夹给删掉了，理由是我一直比较推崇前后端同构，所以既然有view层，前后端的模板应该一致，
目前前端忙于组件化，基于vue和jsx的模板语言也很多（虽然性能不高，但可预见性能问题会很快解决），所以本文暂时不谈view。

## OK，可以愉快地写代码了

因为官网没有TS的相关文档，这里记录一下。

### 新建一个Controller

    // src/controller/home.ts
    import { Controller } from "egg";
    import { prefix, suffix } from "../frags";

    export default class HomeController extends Controller {
        async index() {
            this.ctx.body = `${prefix}<h1>Hello World</h1>${suffix}`;
        }
    }

### Router的引用

    import { Application } from "egg";

    export default (app: Application) => {
        app.get('/', "home.index");
    }

## 结论

egg其实不错，能换自然是最好了。但是不换的话，如果项目已经跑起来了，
说明egg该趟的坑都被你自己趟过了，而且已经用了typescript，async和await自然都用上了，
所以（在我看来）generator就没更多优势了。

但是如果你还没用上typescript...真的，动态一时爽，重构火葬场啊。

以上。