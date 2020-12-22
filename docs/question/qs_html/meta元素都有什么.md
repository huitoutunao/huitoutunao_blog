# meta 元素都有什么?

> 这个 \<meta\> 元素，可提供页面有关的元信息，比如针对搜索引擎和更新频度的描述和关键词。\<meta\> 标签位于文档的头部，不包含任何内容。\<meta\> 标签的属性定义了与文档相关联的名称/值对。

## 元数据

这里就不得不提到元数据了，什么是元数据呢？它是用来构建 HTML 文档的基本结构，以及就如何处理文档向浏览器提供信息和指示，它们本身不是文档内容，但提供了关于后面文档内容的信息。例如：姓名、性别、身高、民族、性格等等这些描述词语就是具体个人的元数据。  
HTML 文档的 title、base、meta 等都是元数据。

## meta 元素

meta 元素可以定义文档的各种元数据，提供各种文档信息，通俗点说就是可以理解为提供关于网站的各种信息。HTML 文档中可以包含多个 meta 元素，每个 meta 元素只能用于一种用途，如果想定义多个文档信息，则需要在 head 标签中添加多个 meta 元素。

meta 元素定义的元数据类型包含下面几种：
- 如果设置了 name 属性，meta 元素提供的是文档级别（document-level）的元数据，应用于整个页面。
- 如果设置了 http-equiv 属性，meta 元素则是编译指令，提供的信息与类似命名的HTTP头部相同。
- 如果设置了 charset 属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
- 如果设置了 itemprop 属性，meta 元素提供用户定义的元数据。

meta 元素的属性包括以下几个：  
1. charset：声明了页面的字符编码，常用的是 utf-8。
2. name：用于定义页面的元数据。
3. content：通常配合 name 或 http-equiv 使用，能够给这两个属性提供值。
4. http-equiv：可用做 HTTP 头部的某些作用，通过定义该属性可以改变服务器和用户代理的行为。  
**注意：在同一个 \<meta> 标签中，name, http-equiv 或者 charset 三者中任何一个属性存在时，itemprop 属性不能被使用。**

## 用途

name 属性与 content 属性结合使用，name 用来表示元数据的类型，表示当前 meta 标签的具体作用；content 属性用来提供值。

```html
    // 计算机只对英语的敏感性较高，对汉语的敏感性不高。
    <head>
        <meta charset="utf-8" />
        <meta name="keywords" content="描述网站内容的关键词，以英文逗号隔开，一般不超过 3 个，用于 SEO 搜索。" />
        <meta name="application-name" content="规定页面所代表的 Web 应用程序的名称。" />
        <meta name="description" content="规定页面的描述。搜索引擎会把这个描述显示在搜索结果中。" />
        <meta name="author" content="规定文档的作者的名字。" />
        <meta name="copyright" content="版权信息" />
        <meta name="renderer" content="renderer 是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染网页。一般是 webkit 内核，可选值 webkit|ie-comp|ie-stand 意义分别是：webkit、IE 兼容模式、IE 标准模式" />
        <meta name="viewport" content="它提供有关视口初始大小的提示，仅供移动设备使用。" />
        <title>示例</title>
    </head>
```

```html
    <head>
        <!-- content-Type 声明网页字符编码（旧版 HTML） -->
        <meta http-equiv="content-Type" content="text/html;charset=UTF-8" />
        <!-- refresh 指定一个时间间隔（以秒为单位），在此时间过后跳转到指定链接 -->
        <meta http-equiv="refresh" content="2;URL=https://www.baidu.com" />
        <!-- X-UA-Compatible 浏览器采取何种版本渲染当前页面 -->
        <!-- 指定 IE 和 Chrome 使用最新版本渲染当前页面 -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <!-- Cache-control 用于指定缓存机制在整个请求/响应链中必须服从的指令 -->
        <meta http-equiv="Cache-control" content="no-cache" />
    </head>
```

```html
    // 常用 meta 属性
    <head>
        <!-- 声明文档使用的字符编码 -->
        <meta charset="utf-8" />
        <!-- 优先使用 IE/Chrome 最新版本 -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta name="description" content="规定页面的描述。搜索引擎会把这个描述显示在搜索结果中。" />
        <meta name="keywords" content="描述网站内容的关键词，以英文逗号隔开，一般不超过 3 个，用于 SEO 搜索。" />
        <meta name="author" content="规定文档的作者的名字。" />
        <!-- 搜素引擎抓取 -->
        <meta name="robots" content="all, index, follow" />
        <!-- 适用移动设备 -->
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <!-- IOS 设备 begin -->
        <!-- 添加到主屏幕后的标题（IOS 6 新增） -->
        <meta name="apple-mobile-web-app-title" content="标题" />
        <!-- 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 -->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <!-- 添加智能 App 广告条（iOS 6+ Safari ） -->
        <meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL" />
        <!-- 设置苹果工具栏颜色 -->
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <!-- 忽略页面中的数字识别为电话，忽略 email 识别 -->
        <meta name="format-detection" content="telephone=no" />
        <!-- 启用 360 浏览器的极速模式（webkit） -->
        <meta name="renderer" content="webkit">
        <!-- 不让百度转码 -->
        <meta http-equiv="Cache-control" content="no-siteapp" />
        <!-- 针对老设备不识别 viewport，例如：黑莓 -->
        <meta name="HandheldFriendly" content="true" />
        <!-- 微软的老式浏览器 -->
        <meta name="MobileOptimized" content="320" />
        <!-- UC 强制竖屏 -->
        <meta name="screen-orientation" content="portrait" />
        <!-- QQ 强制竖屏 -->
        <meta name="x5-orientation" content="portrait" />
        <!-- UC 强制全屏 -->
        <meta name="full-screen" content="yes" />
        <!-- QQ 强制全屏 -->
        <meta name="x5-fullscreen" content="true" />
        <!-- UC 应用模式 -->
        <meta name="browsermode" content="application" />
        <!-- QQ 应用模式 -->
        <meta name="x5-page-mode" content="app" />
        <!-- window phone 点击无高光 -->
        <meta name="msapplication-tap-highlight" content="no" />
        <!-- IOS 设备 end -->

        <!-- window 8 磁贴颜色 -->
        <meta name="msapplication-TileColor" content="#000" />
        <!-- window 8 磁贴图标 -->
        <meta name="msapplication-TileImage" content="icon.png" />

        <!-- 添加 RSS 订阅 -->
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
        <!-- 添加 favicon icon -->
        <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />

        <!-- sns 社交标签 begin -->
        <!-- 参考微博 API -->
        <meta property="og:type" content="类型" />
        <meta property="og:url" content="URL 地址" />
        <meta property="og:title" content="标题" />
        <meta property="og:image" content="图片" />
        <meta property="og:description" content="描述" />
        <!-- sns 社交标签 end -->
    </head>
```

## 扩展

\<meta http-equiv="Cache-control" content="no-cache" \/\> 它的 content 可选值如下：

| content | 说明 |
| --- | --- |
| public | 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存，即使是通常不可缓存的内容。（例如：1.该响应没有 max-age 指令或 Expires 消息头；2. 该响应对应的请求方法是 POST）|
| private | 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）。私有缓存可以缓存响应内容，比如：对应用户的本地浏览器。|
| no-cache | 在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证（协商缓存验证）。|
| no-store | 缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。|
| max-age=\<seconds\> | 设置缓存存储的最大周期，超过这个时间缓存被认为过期（单位秒）。与 Expires 相反，时间是相对于请求的时间。|
| s-maxage=\<seconds\> | 覆盖 max-age 或者 Expires 头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它。|
| max-stale\[=\<seconds\>\] | 表明客户端愿意接收一个已经过期的资源。可以设置一个可选的秒数，表示响应不能已经过时超过该给定的时间。|
| min-fresh=\<seconds\> | 表示客户端希望获取一个能在指定的秒数内保持其最新状态的响应。|
| must-revalidate | 一旦资源过期（比如已经超过 max-age），在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。|
| proxy-revalidate | 与 must-revalidate 作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略。|
| no-transform | 不得对资源进行转换或转变。Content-Encoding、Content-Range、Content-Type 等 HTTP 头不能由代理修改。例如，非透明代理或者如 Google's Light Mode 可能对图像格式进行转换，以便节省缓存空间或者减少缓慢链路上的流量。no-transform指令不允许这样做。|
| only-if-cached | 表明客户端只接受已缓存的响应，并且不要向原始服务器检查是否有更新的拷贝。|

*部分答案整理自网络资源*