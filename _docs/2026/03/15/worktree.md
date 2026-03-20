---
type: post
category: tech
tag:
    - git
---
# Week 11: Git Worktree

This is a very cool command in Git.

Nowadays, because of **vibe coding**, I may use several AIs to work on different features. Sometimes I also need to checkout other branches to check code changes.

Before, I usually solved this by:

* cloning the same project into different folders, or
* committing/stashing my current work before switching branches.

But with **`git worktree`**, things become much easier. 🚀

Inside one project repository, you can create **multiple folders for different branches**.

## Expected Folder Structure

For example, your folder structure can look like this:

```shell
/project
/project/.git
/project/main
/project/feature-1
```

## Step 1 — Clone as a Bare Repository

First create your project folder, then clone the repository as a **bare repo** into `.git`.

```shell
git clone --bare ${project} .git
```

## Step 2 — Create the Main Worktree

Create the `main` folder and add a worktree for the `main` branch.

```shell
git worktree add ./main main
```

This folder will be used to **pull and update the main branch**.

## Step 3 — Create Feature Branch Worktrees

When you want to work on a new feature, create another folder and add a worktree.

From inside `main` (or any branch you want to branch from):

```shell
git worktree add ../feature-1 feature-1
```

Now you can work on **multiple branches at the same time**, each in its own folder.

## Step 4 — Update Submodules (If Needed)

If your project uses submodules like mine, remember to update them.

```shell
git submodule update --init --recursive
```

## Why This Is Useful

With `git worktree` you can:

* work on multiple branches at the same time
* avoid cloning the repo many times
* quickly switch between features
* let different AI agents work in different folders 🤖

For **AI-assisted development**, this workflow is extremely convenient.

