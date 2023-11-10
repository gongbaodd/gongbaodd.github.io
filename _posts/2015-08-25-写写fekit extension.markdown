---
type: post
category: fe
---

> 这几天公司里面的 QA 资源紧张，手上压了 4 个分支还没有发布，
> 干脆腾出时间研究研究 fekit 的 extension，最好能贡献点代码。

> Fekit 是去哪儿网的前端部署及开发工具，相比于 gulp、grunt 等工具
> ，Fekit 需要用户的学习成本较低，上手比较快。

> [Fekit 的 github 地址](https://github.com/rinh/fekit)<br> >[FekitExtension 的模板地址](https://github.com/rinh/fekit-extension-template)<br> >[FekitExtension 的一个示例](https://github.com/rinh/fekit-extension-hf)

# 谈谈需求

我想写一个工具，在运行 fekit server 之前把项目中的每个 js 加入一个 DOM 的插入供作，
插入一个显示编译 ip 地址的 div，在 server 结束之后将这句 js 删掉。

# 怎么写？

单独按照 Extension 模板里面写，没办法调试啊！！！怎么办？我干脆在
`/usr/local/lib/node_modules/fekit/lib/commands/`
下面开刀，在里面新建一个 msg.js,它大概是这个样子的

    (function(){
        exports.usage = "在js里面插一个插入DOM的脚本";
        exports.set_options = function(optimist) {
            optimist.alias('p','pack');
            optimist.describe('p','插入');
            optimist.alias('u','unpack');
            optimist.describe('u','删除');
            return optimist;
        }
        exports.run = function(options) {

        }
    }).call(this);

可以运行`fekit msg`试试了

# 都是些什么玩意儿

## optimist

看了许多现成的示例，optimist 就是给命令添加参数

## options

    {
         _: [ 'msg' ],
         '$0': 'fekit',
         p:true,
         cwd: '~'
     }

## module

> 全局对象

    {
        id: '/usr/local/lib/node_modules/fekit/lib/commands/msg.js',
        exports:{
            usage: '在js里面插一个插入DOM的脚本',
            set_options: [Function],
            run: [Function]
            },
            parent:{
                id: '/usr/local/lib/node_modules/fekit/lib/cli.js',
                exports: {
                     help: [Function],
                     run: [Function]
            },
            parent:{
                 id: '.',
                 exports: {},
                 parent: null,
                 filename: '/usr/local/lib/node_modules/fekit/bin/fekit',
                 loaded: false,
                 children: [Object],
                 paths: [Object] },
                 filename: '/usr/local/lib/node_modules/fekit/lib/cli.js',
                 loaded: true,
                 children: [ [Object], [Object], [Object], [Circular] ],
                 paths:[
                  '/usr/local/lib/node_modules/fekit/lib/node_modules',
                  '/usr/local/lib/node_modules/fekit/node_modules',
                  '/usr/local/lib/node_modules',
                  '/usr/local/node_modules',
                  '/usr/node_modules',
                  '/node_modules'
                  ]
            },
            filename: '/usr/local/lib/node_modules/fekit/lib/commands/msg.js',
            loaded: true,
            children: [],
            paths:[
             '/usr/local/lib/node_modules/fekit/lib/commands/node_modules',
             '/usr/local/lib/node_modules/fekit/lib/node_modules',
             '/usr/local/lib/node_modules/fekit/node_modules',
             '/usr/local/lib/node_modules',
             '/usr/local/node_modules',
             '/usr/node_modules',
             '/node_modules'
             ]
        }

# 开始大干一场吧

通过判断 options 里面是否有 p 和 u 来判断是否打包，读 option 得 cwd 判断项目根目录，这样就能读取
fekit.config 了，将 fekit.config 里面的每个 js 插一段脚本，在 u 里面将这段脚本删除，大功告成。
