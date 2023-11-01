---
type: post
category: fe
---
# 使用 Meteor 快速搭建TODO APP

代码在 https://github.com/gongbaodd/MeteorTodoAPP 这里做一下简单记录。

## 把冰箱门打开

```shell
meteor create app
```

打开 app 文件夹，可以看到 meteor 项目了，官网有各个文件夹的说明， 在此不赘述。

```shell
meteor
```

可以在 localhost:3000 看到初始项目了。

到```.meteor/package```下删除autopublish 和 insecure，添加 apollo 和 accounts-passwd

## 把大象放进去

下面记录一下踩到的坑。

### CSS

css很尴尬，我想用postcss，但貌似meteor的postcss包并不是很给力。自带的css的打包功能貌似不能用（起码我没整出来）。好在 ecmascript 包可以引用 css。

项目直接使用了bulmaCSS， 很方便。

### Apollo增加用户token

要用到Apollolink，在请求头里面添加meteor-login-token，在后面的 resolver 里面的 context 对象里面就有 userId 这个值了。

```JavaScript
const apolloLink = new ApolloLink(
    (operation, forward) => {
        const token = Accounts._storedLoginToken();
        operation.setContext(
            _ => ({
                headers: {
                    'meteor-login-token': token,
                }
            })
        );
        return forward(operation);
    }
);
```

### Graphql

graphql文件修改了并不能触发重启，而且有的时候甚至一直读缓存而不在乎文件有修改，要把 makeExecutableSchema 参数做修改之后才能正常运行。

## 总结

用 Meteor 做项目的确是目前我知道的最快速了，主要是不用考虑数据库的种种，要知道，即使是黑盒，对于前端工程师来说，数据库还是很少触碰的。

Graphql，最大的优势就是给接口做了个强制定义，以后不必去维护什么v1、v2的接口了。
