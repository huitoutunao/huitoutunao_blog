# Git 实战技巧

在日常开发中，Git 对我们的代码管理起到重要作用。因此作为开发人员都要掌握使用它的技巧。

## Git 的工作区域和流程

见下图：

![git1](../../assets/essays/git_1.jpg)

workspace：工作区，就是平时进行开发改动的地方，是当前看到最新的内容，在开发的过程也就是对工作区的操作。

Index：暂存区，当执行 `git add` 的命令后，工作区的文件就会被移入暂存区，暂存区标记了当前工作区中那些内容是被 Git 管理的，当完成某个需求或者功能后需要提交代码，第一步就是通过 `git add` 先提交到暂存区。

Repository：本地仓库，位于自己的电脑上，通过 `git commit` 提交暂存区的内容，会进入本地仓库。

Remote：远程仓库，用来托管代码的服务器，远程仓库的内容能够被分布在多个地点的处于协作关系的本地仓库修改，本地仓库修改完代码后通过 `git push` 命令同步代码到远程仓库。

Git 的常规操作：

1. 在工作区开发，修改和添加文件；
2. 将修改后的文件放入暂存区；
3. 将暂存区的文件提交到本地仓库；
4. 将本地仓库的修改推送到远程仓库；

## Git 基本技巧

1. `git add` 将文件放入暂存区
```sh
# 添加当前所有修改文件至暂存区
$ git add .
```

2. `git commit` 将暂存区的更改文件提交至本地仓库
```sh
# 等价于 git add . 和 git commit -m。注意：对新文件不受影响
$ git commit -am '提交至本地仓库'
```

3. `git pull` 将远程仓库代码拉取合并到本地仓库，等同于 `git fetch + git merge`
```sh
# 等同于 git fetch + git rebase(变基)
$ git pull --rebase
```

4. `git fetch` 与 `git pull` 不同的是 `git fetch` 操作仅仅只会拉取远程的更改，不会自动进行 `merge` 操作。对你当前的代码没有影响
```sh
# 拉取特定分支
$ git fetch <远程主机名> <分支名>

# 拉取远程主机所有分支
$ git fetch --all
```

5. `git branch` 分支
```sh
# 新建本地分支，但不切换
git branch <branch-name>

# 查看本地分支
git branch

# 查看远程分支
git branch -r

# 查看本地和远程分支
git branch -a

# 删除本地分支
git branch -D <branch-nane>

# 重新命名分支
git branch -m <old-branch-name> <new-branch-name>
```

## Git 工作使用

### git rebase

rebase 译作为变基，作用和 merge 类似，用于把分支修改合并到当前分支上。

举个例子：

现在有 2 个分支，分别是 master 和 test 分支，它们都是基于 test1 提交检出的分支。在 master 分支上分别提交两个文件 `3.js` 和 `4.js`，test 分支上分别提交两个文件 `1.js` 和 `2.js`。它们的提交记录截图如下：

![git2](../../assets/essays/git_2.png)


在 test 分支上执行 `git rebase master` 命令，可以看到先是逐个应用了 master 分支的更改，然后以 master 分支最后的提交作为基点，再逐个应用 test 的每个更改。最后切换到 master 分支上，执行合并后得到下面记录截图：

![git3](../../assets/essays/git_3.png)

上面的例子还是比较简单的，如果在变基时遇到代码冲突，我们需要依次使用 `git add`、`git rebase --continue` 的方式来处理冲突，完成 rebase 的过程，如果不想要某次 rebase 的结果，那么需要使用 `git rebase --skip` 来跳过这次 rebase 操作。

解决冲突后，运行 `git rebase --continue` 会出现下面的 `vim` 界面：

![git4](../../assets/essays/git_4.png)

然后键入 `:E` 进入编辑模式，如果需要修改提交文案，可以键入 `i`，`delete` 是删除文案键，更新文案完成后，键入 `esc` 退出编辑模式，最后键入 `:wq` 保存并退出。

`git merge` 在不是 `fast-forward`（快速合并）的情况下，会产生一条额外的合并记录，类似 `Merge branch 'xxx' into 'xxx'` 的一条提交信息。另外，在解决冲突的时候，用 merge 只需要解决一次冲突即可，简单粗暴，而用 rebase 的时候 ，需要依次解决每次的冲突，才可以提交。

### `git rebase -i`

在开发中，如果遇到多个无效提交想将它们压缩成一次提交，需要使用命令 `git rebase -i <base-commit>`，其中 `<base-commit>` 是提交的 hash 值，以它作为起点，把后面的提交压缩（不包含起点），然后会进入 vim 的交互式界面：

![git5](../../assets/essays/git_5.png)

我们要使用 Squash 策略进行合并，但至少保留一个 pick，否则命令会执行失败。

![git6](../../assets/essays/git_6.png)

退出编辑模式，然后键入 `:wq` 保存并推出，此时又会出现另一个界面。

![git7](../../assets/essays/git_7.png)

键入 `:E` 进入编辑模式，将更改合并提交的文案，最后再 `:wq` 保存并退出。

::: warning 注意
特别注意，只能在自己使用的 test 分支上进行 rebase 操作，不允许在集成分支上进行 rebase，因为这种操作会修改集成分支的历史记录。
:::

### `git cherry-pick` 获取指定的 commit

例如 master 分支上只要 test 分支上新增功能的提交，那么就可以使用 `git cherry-pick [commit-hash]`

如果合并发生冲突，解决冲突后执行 `git add .`，然后执行 `git cherry-pick --continue`。

如果需要多个 `cherry-pick` 需要同步到目标分支，可以简写为 `git cherry-pick <first-commit-id>...<last-commit-id>`，这是一个左开右闭的区间，也就时说 `first-commit-id` 提交带来的代码的改动不会被合并过去，如果需要合并过去，可以使用 `git cherry-pick <first-commit-id>^...<last-commit-id>`，它表示包含 `first-commit-id` 到 `last-commit-id` 在内的提交都会被合并过去。

### git revert 回滚某次的提交

git revert 撤销某次操作，此操作不会修改原本的提交记录，而是会新增一条提交记录来抵消某次操作。

- `git revert <commit-id>` 针对普通 commit
- `git revert <commit-id> -m` 针对 merge 的 commit

git revert 会自动生成一条提交记录。

![git8](../../assets/essays/git_8.png)

git reset 会直接将提交记录退回到指定的 commit 上，如果是在自己开发分支上，可以使用这种方式撤销提交记录，之后使用 `git push --force` 进行推送到远程。多人协作的集成分支上推荐使用 git revert 命令进行撤消提交。这样，提交的历史记录不会被抹去，可以安全的进行撤回。

### 不同的工作区域撤销更改

如果提交了 `1.js` 的文件修改，想将它恢复，那就使用 `git checkout -- <filename>`，filename 这里是 `1.js`。

### git stash 来暂存文件

现在你正在用你的 feature 分支上开发新功能。这时，生产环境上出现了一个 bug 需要紧急修复，但是你这部分代码还没开发完，不想提交，怎么办？这个时候可以用 `git stash` 命令先把工作区已经修改的文件暂存起来，然后切换到 hotfix 分支上进行 bug 的修复，修复完成后，切换回 feature 分支，从堆栈中恢复刚刚保存的内容。

基础命令如下：
```sh
# 把本地的改动暂存起来
$ git stash

# 执行存储时，添加备注，方便查找
$ git stash save "message"

# 查看 stash 列表
$ git stash list

# 应用最近一次暂存的修改，并删除暂存的记录
$ git stash pop

# 应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即 stash@{0}，如果要使用其他个
$ git stash apply

# 应用某个储藏 stash@{$num}
git stash apply stash@{$num}

# 删除所有缓存的 stash
$ git stash clear
```

## 结语

工作中使用 git 比较频繁，除了 `git add`、`git commit`、`git merge`、`git pull` 和 `git push` 基础命令之外。今天还扩展了些比较灵活的命令，希望能在日后工作中解决代码管理问题。

## 参考文献

- [git 官方文档](https://www.git-scm.com/docs)
- [我在工作中是如何使用 git 的](https://juejin.cn/post/6974184935804534815)