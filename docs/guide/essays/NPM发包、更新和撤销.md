# NPM 发包、更新和撤销

## npm 是什么？
npm 是世界上最大的软件注册表。来自世界各地的开发人员都使用 npm 共享软件包，许多组织也使用 npm 来管理私人包。

## npm 发布包
在你即将要发布的项目根目录打开终端。

### 注意
1. npm 包名命名限制：不能有大写字母和空格。
2. npm 的包名不能和已发布的包名重复，可以在搜素引擎或者 npm 官网查询是否有这个包名。
3. 如果你要发布的包里有私密代码，可以写入文件 .npmignore 中，这样上传就会忽略。

### 注册账号
前往官网：[https://www.npmjs.com/](https://www.npmjs.com/)

### 首次发布
首先 npm adduser 添加你的账号，在终端输入密码时，不会有显示，按照你正确密码输入按回车即可，然后 npm publish 即可发布。

### 非首次发布
首先 npm login 登录你的账号，然后 npm publish 即可发布。

## npm 更新包
首先是 npm version patch 更新包版本号（[详见](#版本号说明)），或者手动去修改 package.json 文件里面的 version 字段，然后 npm publish 即可发布更新。

### 版本号说明

- patch：表示修改 bug 版本，一般是 1.0.x。
- Minor：表示更新新特性版本，一般是 1.x.1。
- Major：表示改动特别大版本，一般是 2.0.0。

## npm 撤销包
npm unpublish。按照官网规范，在 24 小时内发布的包是允许撤销的，但是如果你的包已经在社区有一定影响力了，就不要撤销了，因为那些依赖于这个包的开发人员会崩溃的:joy:。如果你实在是要撤销包，那么这里建议使用这条命令：npm deprecate \<pkg>\[@\<version>] \<message>，如：npm deprecate npmdemo "这个包已经不再更新维护了，请谨慎使用！"。

### 注意
- 如果你撤销了再发布，命名和版本号都不能使用撤销前的，所以操作需要谨慎。

## npm 卸载包

[查看文档](https://www.npmjs.cn/getting-started/uninstalling-local-packages/)