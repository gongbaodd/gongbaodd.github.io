---
type: post
category: tech
tag:
  - OpenGL
---

# OpenGL 画个三角

这是上个月打算看的教程[learnopengl-cn.github.io](https://learnopengl-cn.github.io/)，真的是非常良心，完全搬运的话感觉没意义，这里做一下笔记好了。

三个主要的对象

- 顶点数组对象 VAO
- 顶点缓冲对象 VBO
- 元素缓冲对象 EBO

这三个对象都是用来描述显存的，每一个 VAO 对应一个图形，VBO 是这个图形的点的数组，因为图形按照三角形拼接的，如果只使用 VBO 会多出许多重复的点，EBO 就是为这些重复的点做索引。

```cpp
// ..:: 初始化代码 :: ..
// 1. 绑定顶点数组对象
glBindVertexArray(VAO);
// 2. 把我们的顶点数组复制到一个顶点缓冲中，供OpenGL使用
glBindBuffer(GL_ARRAY_BUFFER, VBO);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
// 3. 复制我们的索引数组到一个索引缓冲中，供OpenGL使用
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);
// 4. 设定顶点属性指针
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);

[...]

// ..:: 绘制代码（渲染循环中） :: ..
glUseProgram(shaderProgram);
glBindVertexArray(VAO);
glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);
glBindVertexArray(0);
```
