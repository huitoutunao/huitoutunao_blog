# 004-求最终 left、right 的宽度

题目代码如下：
```html
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    .container {
        width: 600px;
        height: 300px;
        display: flex;
    }
    .left {
        flex: 1 2 500px;
        background: red;
    }
    .right {
        flex: 2 1 400px;
        background: blue;
    }
</style>
```

## flex 扩展计算方式

举个简单例子：
```html
<div class="container">
    <ul class="list">
        <li class="flex-base item">1</li>
        <li class="flex-base item">2</li>
        <li class="flex-base item">3</li>
    </ul>
</div>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    li {
        list-style: none;
    }
    .flex-base {
        font-size: 18px;
        color: #333;
        background-color: wheat;
        border: 1px solid rebeccapurple;
        box-sizing: border-box;
    }
    .list {
        display: flex;
        width: 600px;
    }
    .item:nth-child(1) {
        flex: 2 0 100px;
    }
    .item:nth-child(2) {
        flex: 0 0 150px;
    }
    .item:nth-child(3) {
        flex: 2 0 50px;
    }
</style>
```

1. 可用空间是 Flexbox 可用来分配的空间
```
可用空间 = Flex 容器大小 - 所有相邻 Flex 项目 flex-basic 的总和
```

使用上面的公式计算例子中可用空间：`600 - (100 + 150 + 50) = 300`。结果值是个正数，所以有可用空间进行扩展。

2. 可扩展空间
```
可扩展空间 = 可用空间/所有相邻 Flex 项目 flex-grow 的总和
```
接着计算上面例子：`300/(2 + 0 + 2) = 75`。

3. 每项伸缩大小
```
每项伸缩大小 = 伸缩基准值 + (可扩展空间 * flex-grow 的值)
```
接着计算上面例子：第一项是 `100 + (75 * 2) = 250`；第二项是 `150 + (75 * 0) = 150`；第三项是 `50 + (75 * 2) = 200`。

## flex 收缩计算方式

举个简单例子：
```html
<div class="container">
    <ul class="list">
        <li class="flex-base item">1</li>
        <li class="flex-base item">2</li>
        <li class="flex-base item">3</li>
    </ul>
</div>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    li {
        list-style: none;
    }
    .flex-base {
        font-size: 18px;
        color: #333;
        background-color: wheat;
        border: 1px solid rebeccapurple;
        box-sizing: border-box;
    }
    .list {
        display: flex;
        width: 600px;
    }
    .item:nth-child(1) {
        flex: 1 1 200px;
    }
    .item:nth-child(2) {
        flex: 3 2 200px;
    }
    .item:nth-child(3) {
        flex: 2 3 400px;
    }
</style>
```

1. 可用空间是 Flexbox 可用来分配的空间
```
可用空间 = Flex 容器大小 - 所有相邻 Flex 项目 flex-basic 的总和
```

使用上面的公式计算例子中可用空间：`600 - (200 + 200 + 400) = -200`。结果值是个负数，所以采取缩放每项宽度。

2. 获取所有相邻 Flex 项目总和
```
所有项目总和 = (缩放比例 * flex-basic 值) 累加每项的值
```

计算上面例子可得：`(1 * 200) + (2 * 200) + (3 * 400) = 1800`

3. 每一项除以所有项目之和
```
第一项收缩因数 = 第一项(1 * 200) / 所有项目总和(1800)
```

计算上面例子第一项可得：`(1 * 200) / 1800 = 0.111`

4. 每项的收缩因数乘以负可用空间的绝对值
```
第一项收缩空间 = 第一项收缩因数 * 负可用空间的绝对值
```

计算上面例子第一项可得：`0.111 * 200 = 22.222`

## 解答

回归到题目，这题明显是要使用收缩公式进行计算：
```
总溢出空间：600 - (500 + 400) = -300
所以项目总和：(2 * 500) + (1 * 400) = 1400

left 收缩因数：(2 * 500) / 1400 = 0.714
right 收缩因数：(1 * 400) / 1400 = 0.285

left 收缩宽度：0.714 * 300 = 214.285
right 收缩宽度：0.285 * 300 = 85.714

left 的宽度为 500 - 214.285 = 285.715
right 的宽度为 400 - 85.714 = 314.286
```

## 参考文献

- [flex 基础](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)
- [探索 Flexbox](https://www.w3cplus.com/css3/flexbox-adventures.html)
- [深入理解 flex 布局以及计算](https://www.w3cplus.com/css3/flexbox-layout-and-calculation.html)