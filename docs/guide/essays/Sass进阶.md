# Sass 进阶

## 前言

日常开发主要使用 Sass 语法编写样式，所以这里记录 Sass 几个好用的技巧。

## 控制指令

在编写 `@mixin` 和 `@function` 时提供逻辑判断。

### @if
```scss
$boolean: true !default;

@mixin simple-mixin {
    // #{} 类似 ES6 字符串模板的变量(${})
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

### @for
```
语法1：从 start 遍历到 end，包含 end 的值。
@for $var from <start> through <end>

语法2：从 start 遍历到 end，不包含 end 的值。
@for $var from <start> to <end>
```
```scss
$class-name: for !default;

@for $i from 0 through 4 {
    .#{$class-name}-#{$i} {
        font-size: 32px + $i;
        color: red;
    }
}

@for $i from 0 to 4 {
    .#{$class-name}-#{$i} {
        font-size: 32px + $i;
        color: red;
    }
}
```

### @each

基础：
```scss
$list: red green yellow black orange;
@mixin list-color {
    @each $var in $list {
        .#{$var} {
            color: $var;
        }
    }
}

.item {
    @include list-color;
}
```
编译后：
```css
.item .red { color: red; }
.item .green { color: green; }
/* ...省略 */
```

结合上面的 `@for` 的写法：
```scss
.item {
    @for $var from 0 through 4 {
        &.#{$class-name}-#{$var} {
            font-size: 32px + $var;
        }
    }
    @include list-color;
}
```
编译后：
```css
.item.for-0 {}
.item .red {}

.item.for-1 {}
.item .green {}
/* ...省略 */
```

### @while