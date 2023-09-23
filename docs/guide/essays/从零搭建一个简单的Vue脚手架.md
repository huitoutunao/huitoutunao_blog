# 从零搭建一个简单的 Vue 脚手架

![脚手架预览图](/images/essays/httn_cli1.gif)

## 前言

编程中的脚手架，我理解是通过机器自动生成开发前的基础代码，像建筑工程开始时搭建的架子，然后工人不断砌砖，直到建筑完成。脚手架有助于我们专注于 code，使我们更快、更好的完成项目开发。

虽然市面上有 `vue-cli` 这样优秀的脚手架，但是它所提供的基础代码，还不能满足我日常开发需求，因此在此基础上自定义项目模板。

为了方便拉取项目模板，自己学习了如何搭建前端脚手架，所以这篇文章也是记录自己的学习过程。

项目地址：[Github](https://github.com/huitoutunao/simple-vue-cli)

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

1. 在空文件夹下面初始化：
```sh
$ npm init -y
```

文件目录大概如下：
```
project
│  .npmignore
│  package.json
│  README.md
│
├─bin
│     cli.js
└─util
      checkVersion.js
      checkVersion.txt
      clearConsole.js
```

2. 在 `package.json` 文件中，加入 `bin` 字段：
```json
{
    // ...
    "bin": {
        "httn-vue": "bin/cli.js"
    },
    // ...
}
```

bin 的作用是指定各个内部命令对应的可执行文件的位置。关于 bin 的更多解释[戳这里](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin)。

3. 新建对应的脚本命令文件 `cli.js`
```js
#!/usr/bin/env node

console.log('hello world')
```

文件开头必须是 `#!/usr/bin/env node`。`usr/bin/env` 表示可以去 `PATH` 目录中查找脚本解释器，同时指定使用 `node` 去执行该文件。

在当前文件夹下执行如下命令：
```sh
$ npm link
```
```sh
$ httn-vue
```

npm link 的作用是将 npm 模块链接到对应的运行项目中去，方便对模块进行调试和测试。更多解释[戳这里](https://docs.npmjs.com/cli/v7/commands/npm-link)。

终端输出结果：hello world。

## 核心文件

### `cli.js` 引入相关依赖和文件
```js
#!/usr/bin/env node

const path = require('path')
const pkg = require('../package.json')
const fs = require('fs-extra') // 操作系统文件
const { program } = require('commander') // 命令行
const inquirer = require('inquirer') // 询问交互
const semver = require('semver') // 判断 node 版本是否在某个范围
const chalk = require('chalk') // 彩色日志
const ora = require('ora') // 加载动画
const download = require('download-git-repo') // 拉取模板
const validateProjectName = require('validate-npm-package-name') // 验证包名合法性
const { checkVersion } = require('../util/checkVersion') // 检查脚手架版本
const { clearConsole } = require('../util/clearConsole') // 清空日志

const requiredVersion = pkg.engines.node
const log = console.log
const loading = ora({
  color: 'green',
  text: '加载中'
})
// ...
```

### 检查 node 版本
```js
// ...
const checkNodeVersion = (wanted, id) => {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, 'httn-cli')
// ...
```

`semver.satisfies(version, range, option)`：判断 version 是否在 range 这个范围，结果返回 Boolean 值。
`{ includePrerelease: true }`：禁止从范围中排除预发布标记版本的默认行为，除非它们明确选择加入。

### a命令行操作
```js
// ...
program
  .name('httn-cli')
  .version(`httn-cli ${pkg.version}`, '-v --version')
  .usage('<command> [options]')
// ...
```

`.usage` 和 `.name`：通过这两个选项可以修改帮助信息的首行提示，name 属性也可以从参数中推导出来。
```sh
$ httn-vue
Usage: httn-cli <command> [options]
```

`.version()` 其默认选项为 `-V` 和 `--version`，设置了版本后，命令行会输出当前的版本号。
```js
program.version(`httn-cli ${pkg.version}`)
```
```sh
$ httn-vue --version
1.0.0
```

版本选项也支持自定义设置选项名称，可以在 `.version()` 方法里再传递一些参数（长选项名称、描述信息）
```js
program.version(`httn-cli ${pkg.version}`, '-v --version')
```
```sh
$ httn-vue -v
1.0.0
```

### b命令行操作
```js
program
  .command('create <app-name>')
  .description('创建项目')
  .action(projectName => {
      console.log(`你要创建的项目名称：${projectName}`)
  })
```

```sh
$ httnn-vue create my-project
你要创建的项目名称：my-project
```

`.command()` 的第一个参数为命令名称。命令参数可以跟在名称后面，也可以用 `.argument()` 单独指定。参数可为必选的（尖括号表示）、可选的（方括号表示）或变长参数（点号表示，如果使用，只能是最后一个参数）。

### 执行构建项目
```sh
$ httnn-vue create my-project
```

1. 检查脚手架版本是否需要更新。
```js
// ...
const latest = checkVersion() // 获取线上的脚手架版本
if (latest && semver.gt(latest, pkg.version)) {
    log(chalk.red(`当前版本过低，请及时更新版本至${latest}`))
    process.exit(1)
}
// ...
```

`semver.gt(v1, v2)：v1 > v2` 成立的话返回 true。
`chalk.red()` 终端输出彩色的日志。

2. 获取项目路径和检验文件名
```js
// ...
const inCurrent = projectName === '.'
const cwd = process.cwd() // 当前目录
const newName = inCurrent ? path.relative('../', cwd) : projectName // 项目文件夹名称
const targetDir = path.resolve(cwd, projectName) // 获取项目文件夹绝对路径
const validateResult = validateProjectName(newName) // 检验文件名

if (!validateResult.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${projectName}"`))
    validateResult.errors && validateResult.errors.forEach(err => {
        console.error(chalk.red.dim(`Error: ${err}`))
    })
    validateResult.warnings && validateResult.warnings.forEach(warn => {
        console.error(chalk.red.dim(`Warning: ${warn}`))
    })
    process.exit(1)
}
// ...
```

3. 交互命令
```js
// ...
clearConsole() // 清空日志
const answer = await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: '请输入项目名称',
    },
    {
        type: 'input',
        name: 'author',
        message: '请输入项目作者名',
    },
    {
        type: 'input',
        name: 'description',
        message: '请输入项目简介',
    },
    {
        type: 'list',
        message: '使用哪种模板开发',
        name: 'tmp',
        choices: ['VueBase', 'VueMobile'],
    }
])
// ...
```

4. 拉取模板
```js
// ...
download(downloadAdress(answer.tmp), targetDir, downloadCallBack.bind(null, answer, targetDir))

loading.color = 'green'
loading.text = '正在拉取模板'
loading.start()
// ...
```

5. 修改 `package.json` 文件
```js
// ...
const filename = path.join(targetDir, 'package.json') // 修改的文件路径
if (fs.existsSync(filename)) {
    let newPkgJson = fs.readFileSync(filename).toString()

    newPkgJson = JSON.parse(newPkgJson)

    newPkgJson.name = answer.name
    newPkgJson.author = answer.author
    newPkgJson.description = answer.description

    newPkgJson = JSON.stringify(newPkgJson, null, '\t')

    fs.writeFileSync(filename, newPkgJson)

    log('拉取模板成功！')
    log(`\n`)
    log(chalk.green(`第一步：$ cd ${answer.name}`))
    log(chalk.green(`第二步：$ yarn install or npm install`))
    log(chalk.green(`第三步：$ npm run serve`))
}
// ...
```

## 发布脚手架

参考之前写的[文章](./NPM发包、更新和撤销)

## 结语

脚手架搭建到这里就结束了。其实整体看下来还是比较基础的，之后脚手架有完善也会在这里更新，希望本篇文章可以帮助到你。[npm 地址](https://www.npmjs.com/package/httn-cli)

## 参考文献

[如何搭建一个属于自己的脚手架](https://juejin.cn/post/6866435508487225358#heading-5)
