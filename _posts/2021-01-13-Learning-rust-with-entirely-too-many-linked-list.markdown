---
type: post
category: tech
tag:
    - rust
---

# Learning Rust with entirely too many linkd lists

## 序言

### 基础

- 指针

	- &
	- &mut
	- Box
	- Rc
	- Arc
	- *const
	- *mut

- 所有权
- 关键字

	- struct
	- enum
	- fn
	- pub
	- impl

- 模式匹配
- 测试
- 简单的unsafe模式

### 驳斥链表

- 性能不总是重点
- 链表的处理可以是O(1)的
- 无需复杂度均摊
- 节省空间
- 函数式开发一直使用链表
- 利于并行开发
- 内核开发、嵌入式开发使用链表
- 插入删除不会让迭代器失效
- 简单且易于教学


## 栈

### 一个糟糕的栈

- 布局

	- List a = Empty | Elem a (List a)
	- 布局一： 
enum List  {
    Empty, 
    Box<List> 
}

		- 必须用Box分配堆内存，否则编译器不知道如何分配栈内存
		- 可以发现链表最后多余一个Empty，则更改布局二

	- 布局二：： 
enum List { 
    Empty, 
    More(Box<Node>) 
}
struct Node {
    elem: i32,
    next: List
}

- 创建

	- impl List {
    pub fn new() -> Self {
        List{ head: Link::Empty }
   }
}

- 所有权入门

	- self - 值

		- 完全复制的值，函数值执行完会被销毁

	- &mut self 可变引用

		- 完全控制值所在地址
		- 不能给值增加引用

	- &self 不可变引用

		- 完全取得值所在地址，但不能更改

- push

	- 因为&mut self.head不能增加引用，必须先用mem::replace替换原来引用来释放引用

- pop

	- 未完成的函数可以使用unimplemented!宏来避免编译报错
	- match关键字也如函数一样存在值引用的问题

- 测试

	- assert_eq!宏来处理断言
	- #[cfg(test)]注释来表明模块仅用于测试环境
	- #[test]注释用于表明函数用于测试
	- 模块内需要引用外部的元素（use super::List;）

- Drop

	- Box的析构过程无法形尾递归调用，析构时会爆栈

### 一个不错的栈

- 使用Option代替Link

	- take方法替代mem::replace
	- map方法替代match

- 支持泛型

	- impl<T>

- peek

	- take方法会把数据取出并把原来的位置用None补充
	- as_ref会取得Option中的不可变引用
	- as_mut会取得所在内存的可变引用

- 迭代器

	- 简单迭代

		- pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}

	- 不可变迭代

		- 显式声明所有权

			- 一个函数引入两个以上引用时
			- 一个泛型结构体
			- 编译器会提醒添加

		- 解开Box可以使用*操作来deRef，如 *node

	- 可变迭代

## 列表

### Box只能实现单指针

### Rc实现引用计数

- use std::rc::Rc
- 使用clone方法
- Option

	- map： Option<T> -> Option<T>
	- and_then： Option<T> -> T.
	- as_ref: &Option<T> -> Option<&T>
	- as_mut: &mut Option<T> -> Option<&mut T>

### Arc线程安全的引用计数

- Send trait: 可以移动到别的线程
- Sync trait:可以被多个线程查看
- Rc实现是基于Cell的
- Arc基于Atomic

## 队列

### 一个不好但是Safe的队列

- RefCell需要动态借用

	- borrow(self) -> Ref<T>
	- borrow_mut(self) -> RefMut<T>
	- into_inner()可以取得包裹的值
	- 虽然Ref和RefMut表现和&和&mut相同，但不能由Ref转换到&

- Rc

	- 解开Rc需要使用try_unwrap()之后再unwrap()
	- Rc解决不了环形引用

### 一个可以但是unsafe的队列

- The Rustonomicon
https://doc.rust-lang.org/nightly/nomicon/
- *mut T
- std::ptr
- 具体unsafe的部分只靠这一个例子还搞不懂
主要先摆正姿态，Unsafe其实并不是不好，只是此时编译器不做检查

## 总结

这次是彻底了解了Rust的所有权生存期的内容，虽然最后unsafe相关内容还是不清楚，单已经有很大进步了。

