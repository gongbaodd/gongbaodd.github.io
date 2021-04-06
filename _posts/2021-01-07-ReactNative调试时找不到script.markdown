---
type: post
category: fe
tag:
  - react-native
---

# ReactNative 调试时提示找不到 script

执行以下命令

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

另外，如果不成功，可以尝试重新安装 react-native-cli 并重复上面命令。
