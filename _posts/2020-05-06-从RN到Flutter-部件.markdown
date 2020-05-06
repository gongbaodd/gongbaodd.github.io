---
type: post
category: fe
tag:
  - react-native
  - flutter
  - dart
---

# 从 RN 到 Flutter-部件

在 Flutter 中，你应该使用部件去描述针对于现有状态和配置的界面。

部件是由许多很小或者单一目的的部件组成。比如`Container`部件就包括几个相关布局、绘制、定位和定型组件，像是`LimitedBox`、`ConstrainedBox`、`Align`、`Padding`、`DecoratedBox`以及`Transform`部件。除了使用`Container`来实现效果，你也可以用几个组件来实现它。

`Center`部件是另一个控制布局的例子。想要剧中部件，就用`Center`包住它。这些部件没有自己的展示，他们的目标就是控制内部部件的布局。想要理解部件是如何渲染，可以去查看他们的相邻部件。

了解更多信息，可以查看[Flutter 技术概览](https://flutter.dev/docs/resources/technical-overview)。

想要了解更多部件信息，可以查看[Flutter 基础部件](https://flutter.dev/docs/development/ui/widgets/basics)，[Flutter 部件目录](https://flutter.dev/docs/development/ui/widgets) 或者 [Flutter 部件索引](https://flutter.dev/docs/reference/widgets)。
