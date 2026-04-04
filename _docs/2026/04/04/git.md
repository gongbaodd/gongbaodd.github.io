---
type: post
category: tech
tag:
    - git
---

# Git pull Remote Branches

Today when I pull my code from git. I realized that some new branches are not fetched. Because it only pulls from the main.

```bash
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin
```

 This is only happened on my Mac mini. It may happen again, so I make a note here.