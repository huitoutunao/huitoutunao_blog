# 012-AJAX

## 定义

AJAX 全称是 Asynchronous JavaScript and XML，中文意思是用 JavaScript 执行异步网络请求。在不重载当前网页的情况下，与服务器交换数据，并且更新部分数据。

## 原理

AJAX 的原理简单来说通过 `XmlHttpRequest` 对象来向服务器发异步请求，从服务器获得数据，然后用 JavaScript 来操作 DOM 而更新页面。

### XmlHttpRequest 属性

+ `XMLHttpRequest.onreadystatechange`：它会在 `XMLHttpRequest.readyState` 的状态改变时触发。
+ `XMLHttpRequest.readyState`：返回一个 `XMLHttpRequest` 代理当前所处的状态。
  - 值：0；状态：`UNSENT`；描述：代理被创建，但尚未调用 `open()` 方法。
  - 值：1；状态：`OPENED`；描述：`open()` 方法已经被调用。
  - 值：2；状态：`HEADERS_RECEIVED`；描述：`send()` 方法已经被调用，并且头部和状态已经可获得。
  - 值：3；状态：`LOADING`；描述：下载中，`responseText` 属性已经包含部分数据。
  - 值：4；状态：`DONE`；描述：下载操作已完成。
+ `XMLHttpRequest.responseText`：在一个请求被发送后，从服务器端返回文本。

### XmlHttpRequest 方法

+ `XMLHttpRequest.open()`：初始化一个请求。
  - `method`：使用的 `HTTP` 方法，比如 `GET`、`POST`、`PUT`、`DELETE` 等。
  - `url`：要向其发送请求的 `URL`。
  - `async`：表示是否异步执行操作，默认为 `true`。
  - `user`：可选的用户名用于认证用途，默认 `null`。
  - `password`：可选的密码用于认证用途，默认 `null`。
+ `XMLHttpRequest.send()`：发送 `HTTP` 请求。
  - `body`：在 `XHR` 请求中要发送的数据体，如果不传递数据则为 `null`。

如果使用 `GET` 请求发送数据的时候，需要注意如下：
+ 将请求数据添加到 `open()` 方法中的 `url` 地址中。
+ 发送请求数据中的 `send()` 方法中参数设置为 `null`。

## 封装

在现代浏览器上写 AJAX 主要依靠 `XMLHttpRequest` 对象，下面简单封装：
```js
const ajax = function (options) {
  const xhr = new XMLHttpRequest()
  const option = options || {}
  const params = option.data

  option.type = (option.type || 'GET').toUpperCase()
  option.dataType = option.dataType || 'json'

  if (option.type === 'GET') {
    xhr.open('GET', `${option.url}?${params}`, true)
    xhr.send(null)
  } else if (option.type === 'POST') {
    xhr.open('POST', option.url, true)
    xhr.send(params)
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const { status } = xhr
      if (status >= 200 && status < 300) {
        option?.success(xhr.responseText, xhr.responseXML)
      } else {
        option?.fail(status)
      }
    }
  }
}

ajax({
  type: 'post',
  dataType: 'json',
  data: {},
  url: 'https://www.example.com',
  success(text, xml) {
    console.log(text, xml)
  },
  fail(status) {
    console.log(status)
  },
})
```
