# Git 问题总结

> 前言：这篇主要写自己在使用 git 过程中遇到的问题总结

## git 多个账号切换

这里我省略了如何配置多个账户的介绍，不过这个可以网上搜索到答案，这里贴一下我的[参考链接](https://www.jianshu.com/p/301afa16f471)。

最后，git 仓库关联
```sh
$ git remote add origin git@lhcxy:~/Test.git

$ git remote add origin git@huitoutunao:~/Test.git
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

由于 `2021-08-13` 之后不再支持密码输入，因此需要换成 token，这个 token 在 github 主页设置 `Developer settings`，我这里是生成一个永久期限的。

然后在当前项目目录运行如下命令设置远程仓库地址：
```sh
$ git remote set-url origin https://<token>@github.com/<username>/<repo>.git
```
[参考地址](https://blog.csdn.net/weixin_48505549/article/details/123173915)

## git 设置默认分支

例如：`main` 是你想要的默认分支
```sh
$ git branch --set-upstream-to=origin/main main
```

上面设置完后，第一次提交需要执行下面语句：
```sh
$ git push origin main:main // git push <远程主机名> <本地分支名>:<远程分支名>
```

## git 提交代码解决 lf 和 crlf 冲突

推荐全局设置
```sh
# 提交时转换为 lf，检出时不转换
$ git config --global core.autocrlf input

# 拒绝提交包含混合换行符的文件
$ git config --global core.safecrlf true
```

## git 提交代码超时

1. ssh: connect to host github.com port 22: Connection timed out.
解决方式：[参考链接1](https://blog.csdn.net/qq_41166135/article/details/81282572)、[参考链接2](https://segmentfault.com/a/1190000037797501)

下面内容复制到 `git安装目录\etc\ssh\ssh_config` 文件的末尾处：
```
Host github.com
User xxx // 自己的登录名或者邮箱
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```

2. Failed to connect to github.com port 443: Timed out.
解决方式：[参考链接](https://blog.csdn.net/weixin_45685193/article/details/120606369)

如果使用了科学上网，那么运行下面指令设置全局或局部代理，代理的 `ip` 和端口号以你的 `IE` 代理为准：

查看 IE 代理如下操作：`IE 浏览器 => 设置 => Internet 选项 => 连接 => 局域网设置`
```sh
# IE 代理 127.0.0.1:1080，下面二选一即可，我这里选择第一个
$ git config --global http.proxy http://127.0.0.1:1080
$ git config --global https.proxy https://127.0.0.1:1080
```

取消代理运行如下指令：
```sh
$ git config --global --unset http.proxy
$ git config --global --unset https.proxy
```