# VS Code 调试 lodash 源码

## 前言

最近因为在学习 lodash 源码，所以想到了使用 VS Code 的 Node 环境进行调试。虽然 Node.js 几乎支持所有 ES6 语法，但是 ES6 的模块化机制一直未支持。支持的语法目录可以[查看网站](https://node.green/)，或者使用 [ES-Checker](http://www.ruanyifeng.com/blog/2015/06/es-checker.html) 的侦测库。

下面是我在本地使用 ES-Checker 的结果：
```sh
# 项目目录安装 es-checker
npm install --save-dev es-checker

# 执行检测
npx es-checker
```
![图1](/images/essays/1.png)

从结果图可以看到，我这里是不支持 ES6 的 import/export 模块化机制语法。

然而 lodash 源码文件涉及到模块化机制语法，为了能够在 Node 环境顺利运行，我们需要将它转换成 Node.js 支持的语法，解决方案如下：
1. Babel。
2. 在 package.json 文件添加如下语句，或者使用 `.mjs` 的文件后缀。具体[参考网站](http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)。
```json
"type": "module"
```

本文使用第一种方案处理。第二种方案我没有尝试过，有兴趣的同学可以试一试。

## 配置

1. 克隆代码且安装预设依赖。

```sh
git clone https://github.com/lodash/lodash.git
```
```sh
npm install
```

2. 安装调试环境所需依赖。

```sh
npm install -D @babel/core @babel/node @babel/preset-env
```

在项目根目录创建 .babelrc 文件，做如下配置，其中 `"debug"` 对应 launch.json 中的 `"BABEL_ENV": "debug"`。
```json
// .babelrc

{
  "presets": ["@babel/preset-env"],
  "env": {
    "debug": {
      "sourceMaps": "inline",
      "retainLines": true
    }
  }
}
```

3. 配置 launch.json 文件。参考[官方文档](https://go.microsoft.com/fwlink/?linkid=830387)

```json
// launch.json

{
    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Node",

            // 调试时忽略文件 node_module
            "skipFiles": [
              "${workspaceFolder}/node_modules/**/*.js",
              "<node_internals>/**/*.js"
            ],

            // 程序的绝对路径，启动调试的入口文件 app.js
            "program": "${workspaceFolder}\\app.js",

            // 使用 babel-node 作为调试环境
            "runtimeExecutable": "${workspaceRoot}\\node_modules\\.bin\\babel-node",
            "sourceMaps": true,
            "env": {
              "BABEL_ENV": "debug"
            }
        }
    ]
}
```

4. 断点调试

配置完成后，我们在项目根目录创建 app.js 文件，引入 add.js 模块，然后在 add.js 的代码中打个断点，最后运行调试。
```js
// app.js

import add from './add'

console.log(add(1, 2))
```

断点和调试效果图如下：

![图2](/images/essays/2.png)
![图3](/images/essays/3.png)

## 结语

通过 VS Code 调试源码，可以高效学习优秀前端库，使你理清楚它的实现逻辑和代码细节。好了，文章到这里就结束了，希望本文能够帮助到你。
