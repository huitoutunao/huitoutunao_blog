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