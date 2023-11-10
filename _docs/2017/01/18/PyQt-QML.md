---
layout: post
category: tech
---

> 翻了翻以前保存的书签，发现了一个pyQt和QML的开发总结，代码跑起来还是有点错误，但是还是比官网的tutorial更简单直观一点。还能从里面找一点hybrid开发的idea（因为QML其实也是一种ECMAScript引擎实现）。

# 在QML上下文插入变量

在```view.setSource```之前将变量插入上下文之中。

```python
from PyQt4.QtDeclarative import QDeclarativeView
from PyQt4.QtGui import QApplication
from PyQt4.QtCore import QUrl

app = QApplication([])

view = QDeclarativeView()

rootCtx = view.rootContext()
rootCtx.setContextProperty("textData", "hi")

view.setSource(QUrl('ctxProp.qml'))
view.show()

app.exec_()
```

```qml
import Qt 4.7

Rectangle {
    id: test

    width: 1000; height: 300

    Text {
        
        anchors.fill: parent;
        text: textData
    }
}
```

# PyQt修改QML中变量

这样可以先加载qml再修改内部的值，注意```property```后面是有类型的。

```python
from PyQt4.QtDeclarative import QDeclarativeView
from PyQt4.QtGui import QApplication
from PyQt4.QtCore import QUrl

app = QApplication([])

view = QDeclarativeView()
view.setSource(QUrl('./ownProp.qml'))

rootObj = view.rootObject()
rootObj.setProperty("textData", 'hi')

view.show()
app.exec_()
```

```qml
import Qt 4.7

Rectangle {
    width: 1000
    height: 300
    id: test
    
    property string textData;

    Text {
        
        anchors.fill: parent;
        text: textData;
    }
    
}
```

# 消息传递

QT最主要的就是它的信号槽机制，对我的影响也很很大，以至于我现在的组件开发也在用这一套思维。那么QT怎么和QML内部进行消息传递呢？

```python
from PyQt4.QtDeclarative import QDeclarativeView
from PyQt4.QtGui import QApplication
from PyQt4.QtCore import QUrl

app = QApplication([])

view = QDeclarativeView()
view.setSource(QUrl('./signal.qml'))

def on_click():
    print("hi")

rootQbj = view.rootObject()
rootQbj.mclicked.connect(on_click)
rootQbj.setProperty('name','hello')
view.show()
app.exec_()
```

```qml
import Qt 4.7

Rectangle {
    width: 1000
    height: 300
    id: test;
    signal mclicked;
    property string name;
    

    Text {
        anchors.fill: parent;
        text: name
    }

    MouseArea {        
        anchors.fill: parent

        onClicked: {
            mclicked();
        }
    }
    
}

```

# 调用QML内部函数

```python
from PyQt4.QtDeclarative import QDeclarativeView
from PyQt4.QtGui import QApplication
from PyQt4.QtCore import QUrl

app = QApplication([])

view = QDeclarativeView()
view.setSource(QUrl('./interface.qml'))

def on_click():
    rootObject.set_text('Clicked')

rootObject = view.rootObject()
rootObject.mclicked.connect(on_click)

view.show()
app.exec_()
```

```qml
import Qt 4.7

Rectangle {
    width: 1000
    height: 300
    color: "transparent"
    id: test
    signal mclicked
    Text {
        id: testText
        
        anchors.fill: parent
        
        text: "Click Me"
    }
    MouseArea {
        anchors.fill: parent
        onClicked: {
            mclicked();
        }
    }
    function set_text(text) {
        testText.text = text
    }   
}
```

就酱，后面再写一篇QML调用js的文章吧🤔。