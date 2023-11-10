---
type: post
category: tech
---

前端做得久了，我的工程根目录下面就会多一个bash脚本，把每一个项目的启动脚本放在里面然后注释掉。这样做的好处是如果要启动一个项目的时候只需要运行脚本就好了。

可是问题随之出现了，项目越来越多，然后那个脚本就变成了下面这样。

![脚本库](http://ww4.sinaimg.cn/mw690/89d0a2e1gw1fbkbh1idg9j20gi046q4s.jpg)

因为用的都是fekit，所以各个工程就mock数据不一样。不久我发现一个问题，工作一天，老眼昏花之后，要想在项目之间切换，就是每次要数出第几行，把它解注释，那简直是件恐怖的事情。

于是我便希望有一个图形化的界面，能实时显示我目前处于什么环境，并且能够切环境（因为是触摸屏，所以图形化界面效率很高😏,同时因为我经常在archLinux和Mac下面切换，所以我对跨平台要求很高）。

# 需求

1. 图形化的界面，能够显示现在mock的是哪个项目。
2. 兼容ArchLinux(Gnome)和OSX。
3. 开发时间越短越好（根本没时间在工具上下功夫😢）。
4. 不要影响到我现有的开发习惯（生成的shell脚本格式不能变）。

# 分析

额，好吧，其实electron也行，可是宝宝就是觉得pyQt好久不用了，就是想用用。

# 编写

文件读写

```python
import sys
import os
import re

QMB_FILE_PATH = os.path.split(os.path.realpath(__file__))[0] + '/qmbrun.sh'# 我那个shell脚本叫qmbrun.sh
RUN_BASH_PREFIX = '#!/bin/bash\n'
FEKIT_SERVER = 'fekit server'
HASH_CHAR = '#'
PRD_REG = r'.*-m\s(.*)/.*'

def readFile():
    commands = {}
    file = open(QMB_FILE_PATH)
    line = file.readline()
    while line:
        if line.find(FEKIT_SERVER) > -1:
            command = line.replace(HASH_CHAR,'')
            match = re.match(PRD_REG, command)
            if match: 
                product = match.groups()[0]
            if product:
                commands[product] = {
                    'selected': line.find(HASH_CHAR) < 0,
                    'command': command
                }
        line = file.readline()
    file.close()
    return commands

def writeFile(str):
    file = open(QMB_FILE_PATH,'w')
    file.write(RUN_BASH_PREFIX + str)
    file.close()
```

对话框

```python
from PyQt5.QtWidgets import *

class QMBedit(QDialog):
    def __init__(self, parent = None):
        super(QMBedit, self).__init__(parent)

        self.btns = []
        self.commands = readFile()
        
        self.setWindowTitle('QMBedit')
        layout = QVBoxLayout()

        for cmd in self.commands.keys():
            btn = QRadioButton(cmd)
            btn.setChecked(self.commands[cmd]['selected'])
            btn.clicked.connect(self.btn_clicked)
            self.btns.append(btn)
            layout.addWidget(btn)

        self.setLayout(layout)
    
    def btn_clicked(self): 
        for btn in self.btns:
            self.commands[btn.text()]['selected'] = btn.isChecked()
        self.map2str()
    
    def map2str(self):
        str = ''
        for cmd in self.commands.keys():
            if self.commands[cmd]['selected']:
                str += self.commands[cmd]['command']
            else:
                str += HASH_CHAR + self.commands[cmd]['command']
        writeFile(str)
```

# 运行

![运行结果](http://ww1.sinaimg.cn/mw690/89d0a2e1gw1fbkbh2aju0j205s04xwex.jpg)

OK，用起来不错，拯救了老眼昏花的我。话说本文是本年度第一文啊！其实我挺用心的，写文章的时间远远超过了写这段代码的时间。。。真的😂。

PS：话说emojipedia真的很好用，可以考虑给vcode开发个插件🤔。