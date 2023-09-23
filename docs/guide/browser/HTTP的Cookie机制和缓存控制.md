# HTTP 的 Cookie 机制和缓存控制

## 什么是 Cookie

因为 HTTP 是“无状态”的，所以无法支持需要记录状态的操作。如果新闻网站，视频网站或电商网站要对用户进行个性化定制怎么做呢，那么就需要引入外力 Cookie 了。Cookie 像是服务器给浏览器贴上的标签，当服务器看到它，就想起它是谁了。

## Cookie 工作流程

见下图：

![预览图](/images/browser/browser_8.png)

## Cookie 的属性

`Expires`：过期时间，用的是绝对时间点，可以理解为“截止日期”。

`Max-Age`：用的是相对时间，单位是秒，浏览器用收到报文的时间点再加上 `Max-Age`，就可以得到失效的绝对时间。

`Expires` 和 `Max-Age` 可以同时出现，两者的失效时间可以一致，也可以不一致，但浏览器会优先采用 `Max-Age` 计算失效期。

`Domain` 和 `Path` 指定了 Cookie 所属的域名和路径，浏览器在发送 Cookie 前会从 `URI` 中提取出 `host` 和 `path` 部分，对比 Cookie 的属性。如果不满足条件，就不会在请求头里发送 Cookie。

`HttpOnly` 会告诉浏览器，此 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 引擎就会禁用 `document.cookie` 等一切相关的 API，脚本攻击也就无从谈起了。

`SameSite` 可以避免跨站请求伪造（XSRF）。设置`SameSite=Strict`可以严格限定 Cookie 不能随着跳转链接跨站发送，而`SameSite=Lax`则略宽松一点，允许 `GET/HEAD` 等安全方法，但禁止 `POST` 跨站发送。

`Secure` 表示这个 Cookie 仅能用 HTTPS 协议加密传输，明文的 HTTP 协议会禁止发送。但是 Cookie 本身是明文的。

## Cookie 的应用

1. Cookie 最基本的一个用途就是身份识别，保存用户的登录信息，实现会话事务。
2. Cookie 的另一个常见用途是广告跟踪。

## 服务器的缓存控制

```
// 响应头字段
Cache-Control: max-age=30
```

- `max-age`：告诉浏览器可以缓存该文件多少秒。
- `no-store`：不允许缓存，用于某些变化非常频繁的数据，例如秒杀页面。
- `no-cache`：可以缓存，但在使用之前必须要去服务器验证是否过期，是否有最新的版本。
- `must-revalidate`：如果缓存不过期就可以继续使用，但过期了如果还想用就必须去服务器验证。

## 客户端的缓存控制

```
// 请求头字段
Cache-Control: max-age=0
```

`max-age=0` 这个意味着不会使用本地缓存，而是请求服务器的资源。

浏览器的 `Ctrl+F5` 强制刷新，其实是发送了 `Cache-Control: no-cache` 给服务器。

## 条件请求

HTTP 协议定义了一系列 `If` 开头的“条件请求”字段，专门用来检查验证资源是否过期，而且，验证的责任也交给服务器，浏览器只需“坐享其成”。

常用的有 `if-Modified-Since` 和 `If-None-Match` 两个。需要第一次的响应报文预先提供 `Last-modified` 和 `ETag` ，然后第二次请求时就可以带上缓存里的原值，验证资源是否是最新的。

`Last-modified` 指的是最后的修改时间。对应 `if-Modified-Since`。

`ETag` 指的是资源的一个唯一标识，可以精确地识别资源的变动情况，让浏览器能够更有效地利用缓存。对应 `If-None-Match`。

## 结语

本文到这里就结束了。这是学习[《透视HTTP协议》](https://time.geekbang.org/column/intro/100029001?tab=catalog)罗剑锋老师课程的笔记。希望可以帮到你。
