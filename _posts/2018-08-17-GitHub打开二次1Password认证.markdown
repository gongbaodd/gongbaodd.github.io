---
type: post
category: tech
---
# GitHub 打开二次 1Password 认证

这个安卓没有这功能，但是 mac 和 windows 都可以。

* 在 Github 的 Security 选项，打开 2 Factor authentication

* 保存下一步的还原码

* 点开 1Password 的 Github 项目，点击编辑，找到 label，点击右面的三个点，选择 "one-time password"

* 用三个点旁边的二维码扫描器扫描 Github 页面上的二维码。

然后你就发现你的代码不能再 commandline push 了。。。

* 参照 https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/ 新建一个 token， 以后用这个token作为密码即可。
