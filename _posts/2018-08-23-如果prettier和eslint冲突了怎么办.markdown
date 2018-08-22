---
type: post 
category: fe
---
# 如果prettier和eslint冲突了怎么办

最近工作发现小伙伴都不喜欢用prettier，原因是格式化后的代码其实和之前约定的eslint有出入。

其实安装prettier-eslint之后，你的prettier就不会将代码改成违反eslint规则的样子，在vscode配置中，打开prettier.eslintIntegration。这样自动保存也会避开eslint。