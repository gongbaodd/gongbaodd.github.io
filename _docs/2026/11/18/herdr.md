---
type: post
category: tech
tag:
    - AI
---

# Week 46: Herdr

I thought I would not follow the trend of changing terminals.
Last year, several terminals went viral on Twitter,
but none of their features satisfied me until I started using [Herdr](https://herdr.dev).

Earlier this year, I mentioned [git worktree](/tech/2026/03/15/worktree/).
I believed that git worktree would be widely used in this AI era.
However, as the number of projects I maintain grows exponentially,
terminal windows are everywhere on my desktop.
That is what Herdr solves.
It can group all the worktrees of a project under one tab,
which makes them super easy to maintain.

Herdr creates worktrees under the `.herdr` folder,
so there is no need to change the local git repo structure to what I described in [the old post](/tech/2026/03/15/worktree/).

What is more,
Herdr runs as a daemon, which means that
when you close the window,
your agents keep running under the daemon.
This saves me from the many times I accidentally closed the terminal window.

But be careful: this app is mostly vibecoded,
which means there are probably multiple bugs inside.
While using it, I met some harmless ones.
So if you are strict about software stability,
this might not be a good choice.
