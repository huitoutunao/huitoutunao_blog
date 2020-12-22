# css 如何实现左侧固定 300px，右侧自适应的布局

**须要注意右边的内容过多，导致左边的元素被压缩**

```html
<div class="box">
    <div class="left"></div>
    <div class="right"></div>
</div>
```
## flex + overflow 方法

```scss
.box {
    display: flex;
    .left {
        width: 300px;
    }
    .right {
        flex: 1;
        width: 0;
        overflow: hidden;
    }
}
```

## flex 方法

```scss
.box {
    display: flex;
    .left {
        flex-basis: 300px;
        flex-shrink: 0;
    }
    .right {
        flex-grow: 1;
    }
}
```

*部分答案整理自网络资源*
