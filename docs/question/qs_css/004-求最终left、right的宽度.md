# 004-求最终 left、right 的宽度

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

## flex 计算方式

## 参考文献

- [flex 基础](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)
- [探索 Flexbox](https://www.w3cplus.com/css3/flexbox-adventures.html)
- [深入理解 flex 布局以及计算](https://www.w3cplus.com/css3/flexbox-layout-and-calculation.html)