# 认识 JSBridge

## 什么是 JSBridge

JSBridge 是以 JavaScript 实现的方法，它的作用是连接着 Native 和 H5 两端，建立双向通信的桥梁。即 APP 内有利于 H5 调用 Native 的能力，例如：扫码、拍照、查看相册等等。也方便了 Native 调用 H5 中的 JavaScript 方法。

### Native 与 H5 的比较

| 属性 | Native | H5 |
| -- | -- | -- |
| 稳定性 | 使用原生内核，更加稳定 | 调用系统浏览器内核，稳定性较差 |
| 灵活性 | 每次迭代都要平台审核，上线速度受限 | 上线灵活 |
| 流畅度 | 加载速度快且流畅 | 偶尔加载慢，有卡顿的效果 |
| 网速 | 较小 | 较大 |
| 用户体验 | 原生系统 api 丰富，能实现的功能较多，体验较好 | 功能受浏览器限制，体验有时较差 |
| 可移植性 | 对于 iOS 和 Android 需要维护两套代码 | 兼容跨平台跨系统，如 PC 与 移动端，iOS 与 Android |

## JSBridge 的通信原理简介

### JavaScript 调用 Native

#### 拦截 `URL Scheme`

Android 和 iOS 内置方法支持拦截 `URL Scheme` 并解析 scheme 来决定是否进行对应的原生代码逻辑处理。

优点是不存在漏洞问题、使用灵活，可以实现 H5 和 Native 页面的无缝切换。

缺点是使用 `iframe.src` 来发送 `URL Scheme` 需要对 URL 的长度作控制，使用复杂，速度较慢。

#### 重写 prompt

一般会通过修改浏览器的部分 Window 对象的方法来完成操作。主要是拦截 `alert`、`confirm`、`prompt`、`console.log` 四个方法，分别被 Webview 的 `onJsAlert`、`onJsConfirm`、`onConsoleMessage`、`onJsPrompt` 监听。

使用该方式时，可以与 Android 和 iOS 约定好使用传参的格式，这样 H5 可以无需识别客户端，传入不同参数直接调用 Native 即可。剩下的交给客户端自己去拦截相同的方法，识别相同的参数，进行自己的处理逻辑即可实现多端表现一致。
```js
alert('qrcode', callback())
```

#### 注入 API

基于 Webview 提供的能力，我们可以向 Window 上注入对象或方法。JS 通过这个对象或方法进行调用时，执行对应的逻辑操作，可以直接调用 Native 的方法。使用该方式时，JS 需要等到 Native 执行完对应的逻辑后才能进行回调里面的操作。

例如：
```js
window.NativeApi.share(xxx)
```

## 参考文献

[小白必看，JSBridge 初探](https://www.zoo.team/article/jsbridge)

