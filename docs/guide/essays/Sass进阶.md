# Sass 进阶

## 前言

日常开发主要使用 Sass 语法编写样式，所以这里记录 Sass 几个好用的技巧。

## @if

```scss
$boolean: true !default;

@mixin simple-mixin {
    @if $boolean {
        @debug "$boolean is #{$boolean}";
        display: block;
    } @else {
        @debug "$boolean is #{$boolean}";
        display: none;
    }
}
.selector {
    @include simple-mixin;
}
```