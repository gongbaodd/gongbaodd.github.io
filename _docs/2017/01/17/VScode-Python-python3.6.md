---
type: post
category: tech
---

本来想写一篇pyqt+qml的文章，结果今天打开VScode发现Python不语法提示了。打开开发者模式，发现一直在报错，gramar3.6 not found。

打开```~/.vscode/extensions/donjayamanne.python-0.5.5/pythonFiles/preview/jedi/parser```找到里面的```grammar3.5.txt```复制为```grammar3.6.txt```

重启VScode就好了。