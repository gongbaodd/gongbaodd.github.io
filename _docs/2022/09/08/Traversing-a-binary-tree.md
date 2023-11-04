---
type: post
category: tech
tag:
  - algorithm
  - Rust
---

# 遍历二叉树

遍历二叉树其实也不难，就是利用栈的思维实现遍历挺有意思的，另外在写迭代器的时候还会用的 Rust 的生命周期，刚好能够对 Rust 的生命周期有更多的理解。

## 遍历方法

- 先序遍历，根左右
- 中序遍历，左根右
- 后序遍历，左右根
- 按层遍历

先序遍历，先把跟压入栈，执行 next 出栈取值，并将右子树和左子树压入栈，直到栈空，返回 None。

```Rust
struct TreeIter<'tree> {
    order: Order,
    stack: Vec<&'tree Tree>,
}

impl<'tree> TreeIter<'tree> {
    pub fn new(tree: &Tree) -> TreeIter {
            TreeIter {
                stack: vec![tree],
                order,
            }
    }
}

impl<'tree> Iterator for TreeIter<'tree> {
    type Item = String;
    fn next(&mut self) -> Option<Self::Item> {
        if self.stack.is_empty() {
            return None;
        }

        let item = self.stack.pop().unwrap();

        if item.right.is_some() {
            self.stack.push(item.right.as_ref().unwrap());
        }

        if item.left.is_some() {
            self.stack.push(item.left.as_ref().unwrap());
        }

        Some(item.value.to_owned())
    }
}
```

中序遍历，先把根的左手边按节点拆成几棵没有左子树的树压入栈，执行 next 的时候逐一弹出，如果弹出的子树有右子树，把右子树也拆成没有左子树的子树压入栈。

```Rust
struct TreeIter<'tree> {
    order: Order,
    stack: Vec<&'tree Tree>,
}

impl<'tree> TreeIter<'tree> {
    pub fn new(tree: &Tree) -> TreeIter {
        let mut iter = TreeIter {
            stack: vec![tree],
            order,
        };

        while let Some(node) = &iter.stack.last().unwrap().left {
            iter.stack.push(node);
        }

        iter
    }
}

impl<'tree> Iterator for TreeIter<'tree> {
    type Item = String;
    fn next(&mut self) -> Option<Self::Item> {
        if self.stack.is_empty() {
            return None;
        }
        let item = self.stack.pop().unwrap();
        if item.right.is_some() {
           self.stack.push(item.right.as_ref().unwrap());
              while let Some(node) = &self.stack.last().unwrap().left {
                  self.stack.push(node);
              }
        }

        Some(item.value.to_owned())
    }
}
```

后序遍历，相比于前两个准备工作多一些，需要两个栈，第一个栈按照先序遍历一样压栈，不同的是，先序遍历为了先出栈左子树（根左右）而先压栈右子树，这里要先压栈左子树。第一个栈的出栈元素直接压入第二个栈。执行 next 时，直接从第二个栈出栈即可。

```Rust
struct TreeIter<'tree> {
    order: Order,
    stack: Vec<&'tree Tree>,
}

impl<'tree> TreeIter<'tree> {
    pub fn new(tree: &Tree) -> TreeIter {
            let mut iter = TreeIter {
                stack: vec![],
                order,
            };
            let mut stack = vec![tree];
            while !stack.is_empty() {
                let node = stack.pop().unwrap();
                iter.stack.push(node);
                if node.left.is_some() {
                    stack.push(node.left.as_ref().unwrap());
                }
                if node.right.is_some() {
                    stack.push(node.right.as_ref().unwrap());
                }
            }
            iter
    }
}

impl<'tree> Iterator for TreeIter<'tree> {
    type Item = String;
    fn next(&mut self) -> Option<Self::Item> {
        if self.stack.is_empty() {
            return None;
        }

        let item = self.stack.pop().unwrap();
        Some(item.value.to_owned())
    }
}
```

按层遍历，就是把每一层的节点按层压入栈

```Rust
struct LevelIter<'tree> {
    stack: Vec<Vec<&'tree Tree>>,
}
impl<'tree> LevelIter<'tree> {
    pub fn new(tree: &'tree Tree) -> LevelIter {
        let mut iter = LevelIter {
            stack: vec![vec![tree]],
        };

        loop {
            let last_row = iter.stack.last().unwrap();
            let mut row: Vec<&'tree Tree> = vec![];
            last_row.iter().for_each(|&node| {
                if node.left.is_some() {
                    row.push(node.left.as_ref().unwrap());
                }

                if node.right.is_some() {
                    row.push(node.right.as_ref().unwrap());
                }
            });

            if row.is_empty() {
                break;
            }

            iter.stack.push(row);
        }

        iter.stack.reverse();

        iter
    }
}

impl<'tree> Iterator for LevelIter<'tree> {
    type Item = Vec<String>;
    fn next(&mut self) -> Option<Self::Item> {
        self.stack
            .pop()
            .map(|row| row.iter().map(|&tree| tree.value.to_owned()).collect())
    }
}
```

所有的迭代器语法里面都有个类似于泛型的`<'tree>`，这里就是 Rust 的生命周期，每一个迭代器都有一个自身的生命周期和对应的二叉树的生命周期，这里需要向编译器指明这个对象有两个生命周期，以及哪些变量的生命周期不同。
