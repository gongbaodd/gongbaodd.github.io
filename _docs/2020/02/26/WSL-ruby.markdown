---
type: post
category: tech
tag:
  - ruby
---

# WSL 安装 ruby 环境

虽然我这个博客是基于 jekyll 的，但是因为国内整 ruby 的环境实在痛苦，但是最近不得不又重新搞起来了，只能在这里记录一下。

首先安装环境

```shell
sudo apt install ruby ruby-dev build-essential
```

然后修改 gem 的环境变量

```shell
export GEM_HOME=$HOME/gems
export PATH=$HOME/gems/bin:$PATH
```

修改 source 为 ruby-china

```shell
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
```

接着安装 jekyll 即可

```shell
gem install jekyll bundler
```
