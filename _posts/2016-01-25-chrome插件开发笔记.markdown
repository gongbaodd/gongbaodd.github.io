---
layout: post
category: fe
---

# chrome 插件开发笔记

> [360 真是一个良心企业，这样不用翻墙就能看 API 了](http://open.chrome.360.cn/extension_dev/overview.html)

# manifest.json

```javascript
{
    "name": "qunar schema qrcode",
    "manifest_version": 2,
    "version": "0.0.1",
    "description": "generates qrcode",
    "background": {
        "scripts": [
            "background.js"
        ]
    },
    "page_action": {
        "default_icon": "icon.png",
        "default_title": "QunarQRCode",
        "default_popup": "index.html"
    },
    "permissions": [
        "http://*/",
        "https://*/",
        "tabs"
    ],
    "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
}
```

# background.js 判断 url 并添加 page action

```javascript
function getDomainFromUrl(url) {
  var a = document.createElement("a");
  a.href = url;
  var o = a.origin;
  setTimeout(function() {
    a.remove();
  }, 100);
  return o.replace(a.protocol + "//", "");
}

function checkForValidUrl(tabId, changeInfo, tab) {
  if (
    getDomainFromUrl(tab.url)
      .toLowerCase()
      .indexOf("qunar") > -1
  ) {
    chrome.pageAction.show(tabId);
  }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
```

# popup 里面获取本页 url

```javascript
chrome.tabs.getSelected(null, tab => {
  callback(tab.url);
});
```
