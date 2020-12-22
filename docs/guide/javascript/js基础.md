# JavaScript基础知识

## 前言

在日常工作中，使用JavaScript敲代码时，有些东西还是记不住，所以我通过资料学习后，将这些问题记录在此博客，需要用上的时候找起来也比较方便。[参考资料](https://wangdoc.com/javascript/)

## 数据类型有哪些？

- number（数值）：整数和小数。
- string（字符串）：文本。
- boolean（布尔值）：<font color=#ff3860>true</font> 或 <font color=#ff3860>false</font>。
- undefined：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值。
- null：表示空值，即此处的值为空。
- object（对象）：各种值组成的集合。

通常数值、字符串、布尔值这三种为原始类型的值，是最基本的数据类型。对象则称为合成类型的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。至于null和undefined一般看作是特殊值。

对象是复杂的数据类型：狭义的对象（object）、数组（Array）、函数（function）。

## 字符串

### 转义

反斜杠（\）在字符串内有特殊含义，用来表示一些特殊字符，所以又称为转义符。  

需要用反斜杠转义的特殊字符，主要有下面这些。

- \0 ：null（\u0000）
- \b ：后退键（\u0008）
- \f ：换页符（\u000C）
- \n ：换行符（\u000A）
- \r ：回车键（\u000D）
- \t ：制表符（\u0009）
- \v ：垂直制表符（\u000B）
- \\' ：单引号（\u0027）
- \\" ：双引号（\u0022）
- \\\\ ：反斜杠（\u005C）

```javascript
console.log('1\n2')
// 1
// 2
```

如果要在单引号字符串的内部，使用单引号，就必须在内部的单引号前面加上反斜杠，用来转义。双引号字符串内部使用双引号，也是如此。

```javascript
'Did she say \'Hello\'?'
// "Did she say 'Hello'?"

"Did she say \"Hello\"?"
// "Did she say "Hello"?"
```
### base64编码

有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。  

所谓 Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。<font color=#ff3860>使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。</font>  

JavaScript 原生提供两个 Base64 相关的方法。

- <font color=#ff3860>btoa()</font>：任意值转为 Base64 编码
- <font color=#ff3860>atob()</font>：Base64 编码转为原来的值

```javascript
var string = 'Hello World!';
btoa(string)  // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh')  // "Hello World!"
```

注意，这两个方法不适合非 ASCII 码的字符，会报错。

```javascript
btoa('灰头涂脑')  // 报错
```

要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。

```javascript
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('灰头涂脑')  // "JUU3JTgxJUIwJUU1JUE0JUI0JUU2JUI2JTgyJUU4JTg0JTkx"
b64Decode('JUU3JTgxJUIwJUU1JUE0JUI0JUU2JUI2JTgyJUU4JTg0JTkx')  // "灰头涂脑"
```

## 对象

### 属性的读取

属性的读取有两种方法，一种是点运算符，另一种是方括号运算符。使用方括号运算符时，键命必须放在引号里面，否则会当做变量处理。

``` js
// 第一
var obja = {
  content: 'Hello World'
}

obja.content  // "Hello World"
obja['content']  // "Hello World"

// 第二
var foo = 'name'
var objb = {
  name: 'huitoutunao'
  age: 21
}

objb.age  // 21
objb[foo]  // "huitoutunao"

```

> <font color=#f66>注意：</font>数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。

## 函数

简单文档4
简单文档4
简单文档4
简单文档4
简单文档4
简单文档4
简单文档4
简单文档4
简单文档4