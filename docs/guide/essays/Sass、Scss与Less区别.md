# Sass、Scss 与 Less 区别

## Sass、Scss 和 Less 是什么

Sass 和 Less 都是一种动态样式语言。

Sass 的缩排语法，对于写惯 css 前端的 web 开发者来说很不直观，也不能将 css 代码加入到 Sass 里面，因此 Sass 语法进行了改良，Sass3 就变成了 Scss(Sassy CSS)。SCSS(Sassy CSS) 是 CSS 语法的扩展。这意味着每一个有效的 CSS 也是一个有效的 SCSS 语句，与原来的语法兼容，只是用 `{}` 取代了原来的缩进。

## Sass 和 Less 的区别

1. 编译环境不一样。
2. 变量符不一样，Less 是 @，而 Scss 是 $。
3. 输出设置，Less 没有输出设置，Sass 提供 4 种输出选项：nested, compact, compressed 和 expanded。
4. Sass 支持条件语句，可以使用 `if{}else{}`，`for{}` 循环等等。而 `Less` 不支持。
5. 引用外部 CSS 文件。
6. Sass 和 Less 的工具库不同。

## 结语

不管是 Sass，还是 Less，都可以视为一种基于 CSS 之上的高级语言，其目的是使得 CSS 开发更灵活和更强大。

## 参考文献

- [Sass/Scss和Less的区别](https://www.cnblogs.com/wangpenghui522/p/5467560.html)