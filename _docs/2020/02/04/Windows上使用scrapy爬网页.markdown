---
type: post
category: tech
tag:
  - scrapy
  - python
---

# Windows 上使用 scrapy 抓取网页

过去一周，我在尝试在 Windows 上面使用 python，我会在这一篇文章中总结一下这一次体验的经验，代码已经发布到[GitHub](https://github.com/gongbaodd/webScrapingStudy)上面。

## 安装 python

本身 python 的版本就比较混乱，Windows 又提供了商店版，而且 WSL 下面也可以安装 Linux 的 python，我都体验了一下。

- Windows 商店版，这个貌似就是为了教学使用，因为 Windows 目前比较尴尬，全局安装的包可能会有兼容性问题，但是因为商店版都运行在沙盒之下，基本上就没多少修改的可能了。
- WSL 版本，这个版本体验的是纯正的 Linux，但是一定要注意，如果没安装 Xserver 就相当于没有图形界面。
- x64 版本，这个问题在于安装文件的地址都跟了个 x64。
- win32 版本，这个版本的问题比较小，除了 pyenv 需要单独下载 Windows 版和[jupyter 报错](https://gongbaodd.github.io/tech/2020/01/06/%E4%BF%AE%E5%A4%8DWindows%E4%B8%8B%E6%89%93%E5%BC%80Jupyter%E6%97%B6%E6%8A%A5NotImplementError.html)，还没碰到其他问题。

## pyenv

介于 python 大版本兼容性，个人认为要安装一个版本管理器。因为习惯于 JavaScript 工作环境，我肯定会寻找类似于 nvm 的映射就是 pyenv，在 Windows 下面可以通过 chocolatey 安装。

```shell
sudo choco install pyenv-win
```

下面几个命令是最常用的。

- `pyenv install -l`查看可以安装的 python 版本号。
- `pyenv local install 3.8.0`在项目中安装 3.8.0 版本（会在项目目录增加.python-version 文件）。
- `pyenv version`查看现在的 python 版本。
- `pyenv versions`查看安装过的 python 版本。

win10 上了一个新功能，控制台会引导 python 到应用商店，在“设置>应用和功能>应用执行名”中可以勾掉这个功能

## virtualenv

python 的包管理其实很差，都是放到 global 下面，这就导致多个项目可能都用同一个依赖。那么如何实现每个项目都有自己的依赖呢？这就靠 virtualenv。

```shell
pip install virtualenv
```

如下命令最常用

- `virtualenv [venv folder name]`新建虚拟环境文件夹。
- `source [venv folder name]/Scripts/activate`启动虚拟环境（在 Linux 下面是 bin/activate）。
- `deactivate`关闭虚拟环境（这个在 Linux 会比较常用）。

## scrapy

scrapy 是一个 python 的爬虫框架，使用 pip 可以安装 scrapy。

```shell
pip install scrapy
```

下面是 scrapy 用的比较多的几个命令

- `scrapy startproject [project name]`新建项目。
- `scrapy crawl [spider name] -o [output file]`爬取页面并输出结果到文件。

scrapy 的概念比较多，包括 spider、pipeline、middleware 等等，但个人看来基本上看完[tutorial](https://docs.scrapy.org/en/latest/intro/tutorial.html#our-first-spider)就可以上手了。

### scrapy shell

执行`scrapy shell [url]`可以以命令形式使用 scrapy。

- `fetch('http://xxx.com')`爬取页面
- `view(response)`浏览爬取的页面
- `response.css('a::text').extract()`析取页面中链接的文字列表
- `response.css('a::attr(href)')`析取页面中链接列表

### 发起 Xmlhttp 请求

使用[Scrapy.FormRequest](https://docs.scrapy.org/en/latest/topics/request-response.html#scrapy.http.FormRequest)发起请求，接收到结果可以使用[response.body_as_unicode()]解析 JSON 为字典。

### splash

截至目前，scrapy 都只能渲染非 JavaScript 运行的页面，但是借助 splash 就可以解析 JavaScript 了。我们使用 docker 可以尝试一下 splash。

```shell
docker pull scrapinghub/splash
docker run -p 8050:8050 scrapinghub/splash
```

访问 localhost:8050 即可访问 splash。通过安装`scrapy-splash`可以在 scrapy 中使用 splash，具体安装步骤[官网](https://github.com/scrapy-plugins/scrapy-splash)已经很详细在此不做赘述。

## Scrapinghub

Scrapinghub 是一个基于 scrapy 的云服务，可以将自己的爬虫部署到该平台。[这里](https://support.scrapinghub.com/support/solutions/articles/22000200667-running-a-scrapy-spider)有个工具可以帮助部署（当然通过链接 GitHub 可以做到 master 部署）。

```shell
pip install shub
```

### 解决依赖

爬虫上传到 Scrapinghub 之后，会部署失败，可能源于以下两点。

- scrapinghub 使用的是 python2
- 部份依赖没有安装

以上两点可以通过修改 scrapinghub.yml 完成

```yaml
projects:
  default: 427692
stacks:
  default: scrapy:1.8-py3
requirements:
  file: requirements.txt
```

通过`pip freeze`能够列举出目前环境下的所有包，需要挑出可能缺少的依赖写在 requirements.txt 里面（没错这一步只能人工完成，不要妄想把所有包都写进去）。

```
beautifulsoup4==4.8.2
feedparser===5.2.1
scrapy-splash==0.7.2
```

## 单元测试

使用 python 自带的 unittest 模块以及 pytest 可以对代码进行单元测试。可以参考我代码中的[测试](https://github.com/gongbaodd/webScrapingStudy/tree/master/test/test_spider)。

执行 pytest 的时候会出现找不到模块的问题，可以按照如下方式重置根地址位置。

```
python -m pytest [file path]
```

## 代码优化和格式化

这里比较爽了，如果用的是 vscode，在第一次格式化代码的时候，vscode 就会安装格式化工具。

## pre-commit

pre-commit 是一个 git 钩子工具，简单说，当本地代码不满足要求的时候，利用这个工具自动格式化代码或者阻止用户提交代码。可以参考[官网配置](https://pre-commit.com/)。

## 包健康检查

目前没在 python 找到一个类似于 yarn audit 的东西，到那时找到了一个[SNYK](https://snyk.io)是一个跨语言的包健康检查工具，但是貌似还有 bug，暂时先裸奔好了。

## 持续集成

目前我是用 Travis 做集成，配置文件可参考[此文件](https://github.com/gongbaodd/webScrapingStudy/blob/master/.travis.yml)。

## 兼容性处理

另外还找到一个 python 版本兼容测试工具，考虑到使用 python 命令的人自己的 python 版本并不确定，[tox](https://pypi.org/project/tox/)则是用来测试 py 是否兼容某些 python 的版本。
