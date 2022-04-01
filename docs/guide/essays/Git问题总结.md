# Git 问题总结

> 前言：这篇主要写自己在使用 git 过程中遇到的问题总结

## git 多个账号切换

这里我省略了如何配置多个账户的介绍，不过这个可以网上搜索到答案，这里贴一下我的[参考链接](https://www.jianshu.com/p/301afa16f471)。

最后，git 仓库关联
```sh
$ git remote add origin git@lhcxy: ~/Test.git

$ git remote add origin git@huitoutunao: ~/Test.git
```

## git 拉取远程某分支

假设你要拉取远程的 dev 分支到本地

步骤如下：
```sh
$ git fetch origin dev

$ git checkout -b dev origin/dev

$ git pull origin dev
```

## git 分支添加注释说明

```sh
# 添加
$ git config branch.{branch-name}.description 说明

# 查看
$ git config branch.{branch-name}.description
```

如果嫌麻烦，可以全局安装这个依赖 `npm i -g git-br`，使用命令 `git br` 查看所有分支注释。

## git push 每次都要输入账户密码解决方案

通过 https url，而非 ssh url 关联的远程仓库时，git push 会每次都要输入密码。在项目目录运行下面语句可以解决，[参考链接](https://git-scm.com/docs/gitcredentials)。
```sh
$ git config credential.helper store
```

## git 设置默认分支

例如：`main` 是你想要的默认分支
```sh
$ git branch --set-upstream-to=origin/main main
```

上面设置完后，第一次提交需要执行下面语句：
```sh
$ git push origin main:main // git push <远程主机名> <本地分支名>:<远程分支名>
```