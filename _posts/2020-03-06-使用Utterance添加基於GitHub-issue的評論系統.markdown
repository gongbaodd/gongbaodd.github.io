---
type: post
category: fe
---

# 使用 Utterance 为博客添加基于 Github-issue 的评论系统

最近在重构我部署在 GitHub pages 的博客，本来不想添加评论系统的，但是手贱，非想要加一个。

尝试了 disqus（一个在国内无法使用的评论系统），貌似`page.url`中不能使用中文字符...这就尴尬了，突然想起来以前看 hackernews 的时候有人提起过使用 GitHub issue 搭建博客的想法。如果你是直接使用静态页面做网站，只需要去[Utterance](https://utteranc.es/)授权 GitHub 账号，复制对应的代码粘贴到网站即可。

因为我新重构的网站是基于 Gatsby 的，Utterance 也提供了[react 高阶组件](https://www.npmjs.com/package/with-utterances)可以使用。
