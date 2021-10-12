# 从零搭建一个简单的 Vue 脚手架

## 前言

编程中的脚手架，我理解是通过机器自动生成开发前的基础代码，像建筑工程开始时搭建的架子，然后工人不断砌砖，直到建筑完成。脚手架有助于我们专注于 code，使我们更快、更好的完成项目开发。

虽然市面上有 `vue-cli` 这样优秀的脚手架，但是它所提供的基础代码，还不能满足我日常开发需求，因此在此基础上自定义项目模板。

为了方便拉取项目模板，自己学习了如何搭建前端脚手架，所以这篇文章也是记录自己的学习过程。

## 开始

在开始之前，我们先看下使用到的 npm 依赖包有哪些？

- [commander.js](https://github.com/tj/commander.js)：是一款重量轻，表现力和强大的命令行框架，提供了用户命令行输入和参数解析强大功能。
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)：交互式命令行工具。
- [chalk](https://github.com/chalk/chalk)：是用于修改控制台字符串的样式，包括字体样式（加粗），颜色以及背景颜色等。
- [fs-extra](https://www.npmjs.com/package/fs-extra)：fs-extra 添加了未包含在本机 fs 模块中的文件系统方法，并为 fs 方法添加了 promise 支持。
- [semver](https://www.npmjs.com/package/semver)：npm 语义版本器。
- [ora](https://github.com/sindresorhus/ora)：加载动画
- [validate-npm-package-name](https://www.npmjs.com/package/validate-npm-package-name)：判断 npm 包名是否有效。
- [download-git-repo](https://www.npmjs.com/package/download-git-repo)：是用于 从 GitHub，GitLab，Bitbucket 下载一个 git 仓库。

## 新建项目

在空文件夹下面初始化：
```sh
npm init -y
```

在 `package.json` 文件中，加入 `bin` 字段：
```json
{
    // ...
    "bin": {
        "httn-vue": "bin/cli.js"
    },
    // ...
}
```

## 结语

## 参考文献