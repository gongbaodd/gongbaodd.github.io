---
layout: post
category: tech fe
---


>这几天公司里面的QA资源紧张，手上压了4个分支还没有发布，
干脆腾出时间研究研究fekit的extension，最好能贡献点代码。

>Fekit是去哪儿网的前端部署及开发工具，相比于gulp、grunt等工具
，Fekit需要用户的学习成本较低，上手比较快。

>[Fekit的github地址](https://github.com/rinh/fekit)<br>
>[FekitExtension的模板地址](https://github.com/rinh/fekit-extension-template)<br>
>[FekitExtension的一个示例](https://github.com/rinh/fekit-extension-hf)

# 谈谈需求
我想写一个工具，在运行fekit server之前把项目中的每个js加入一个DOM的插入供作，
插入一个显示编译ip地址的div，在server结束之后将这句js删掉。

# 怎么写？
单独按照Extension模板里面写，没办法调试啊！！！怎么办？我干脆在
```/usr/local/lib/node_modules/fekit/lib/commands/```
下面开刀，在里面新建一个msg.js,它大概是这个样子的

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

可以运行```fekit msg```试试了

# 都是些什么玩意儿
## optimist

看了许多现成的示例，optimist就是给命令添加参数

## options

    {
         _: [ 'msg' ],
         '$0': 'fekit',
         p:true,
         cwd: '~'
     }

## module

>全局对象

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

通过判断options里面是否有p和u来判断是否打包，读option得cwd判断项目根目录，这样就能读取
fekit.config了，将fekit.config里面的每个js插一段脚本，在u里面将这段脚本删除，大功告成。
