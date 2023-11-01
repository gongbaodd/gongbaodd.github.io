---
type: post
category: tech
tag:
  - algorithm
  - zig
---

# KMP 匹配算法

要从一个字符串 ababcabcacbababcac 中查中一个片段如 abcac 可以使用 KMP 算法。

KMP 算法，简单来说就是先从要匹配的字符串中找到重复的字缀，并将这些字缀标记跳过的字数以做到匹配时剪掉不许匹配的次数。

- a，首位和末尾没有重复即为 0
- ab，首位和末尾没有重复即为 0
- abc，首位和末尾没有重复即为 0
- abca，首位和末尾有一位重复 a，记为 1
- abcac，首位和末尾没有重复即为 0

```js
var next = ArrayList(usize).init(allocator);
defer next.deinit();

for (word) |_, inext| {
     if (inext == 0) {
         try next.append(0);
         continue;
    }

     var imatched = next.items[inext - 1];
     while (imatched > 0 and word[imatched] != word[inext]) {
            imatched = next.items[imatched - 1];
     }

     if (word[imatched] == word[inext]) {
        try next.append(imatched + 1);
     } else {
         try next.append(imatched);
     }
}
```

得到匹配列表为 00010，这里的数字对应每个字母的序号 01234，假设匹配长字符串的时候刚好匹配到 abcac 的时候（第五位）没有匹配上，就看`c`前面的字符`a`对应的匹配值，这里是 1，指的可以从字符串中序号为 1 的字符，这里是`b`，继续匹配。

```js
    var iword: usize = 0;
    for (str) |c, istr| {
        while (c != word[iword] and iword > 0) {
            iword = next.items[iword - 1];
        }

        if (c == word[iword]) {
            iword += 1;
        }

        if (iword == word.len) {
            try res.append(istr - iword + 1);
            iword = next.items[iword - 1];
        }
    }
```
