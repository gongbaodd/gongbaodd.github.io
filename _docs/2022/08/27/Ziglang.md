---
type: post
category: tech
tag:
  - zig
cover:
  url: https://bun.sh/logo.svg
  alt: bun logo
---

# 试用 Zig

最近 **Bun** 大火 🔥，带动一个语法看起来很像 JS 的语言 **Zig** 受到关注。听了 Devtools 播客里的推荐，我决定试试手 ✨。  

Zig 官网有两个超实用的学习资源 👉 [ziglearn](https://ziglearn.org/) 和 [ziglings](https://github.com/ratfactor/ziglings)。学习曲线相比 Rust 平缓很多 🪜，甚至比 C 还简单，可以说 **Zig 就是披着高级语言语法外衣的 C** 👀。官方文档也明确提到：Zig 编译器能直接编译 C！  

---

## 🛡️ 语言安全

提到语言安全，最常见的是 **类型安全** 和 **内存安全**。  
- Zig 的类型只在 **编译期** 使用 📦  
- 没有传统意义上的宏语言，但有 `comptime` 关键字，写法依然是 Zig 语法 ✅  
- 泛型也依靠编译时可编程实现 ✍️  

刚开始用可能会有点混淆 🤯，不过教程里说用习惯了就很自然。  

---

## 🗑️ 内存管理

对比：  
- Go → 垃圾回收 ♻️  
- Rust → 借用机制 🦀  
- Zig → **完全不管内存安全** 😅  

和 C 类似，操作堆内存需要新建 `allocator`。好在 `defer` 关键字能让资源回收看起来更清晰 🧹。  

---

## ⏳ 异步体验

Zig 的 **async** 和 JS 几乎一模一样 🪄：  
- 感觉像是 **generator + async** 的合体版  
- 但它并不是迭代器 🚫  

对 JS 用户来说几乎是 **无缝迁移**。  

---

## 🎯 总结

Zig 给我的感觉是：  
- 学习门槛低 ✅  
- 性能贴近 C 🚀  
- 写法对 JS 用户极度友好 👩‍💻  

个人很推荐 Zig —— **一门带着全新味道的语言** 🍵。
