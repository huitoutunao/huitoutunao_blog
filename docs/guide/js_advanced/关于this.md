# 关于 this

## this 是什么

举个例子：
```js
function foo (num) {
    console.log('foo：' + num)
    this.count++
}
foo.count = 0

for (var i = 0; i < 10; i++) {
    if (i > 5) {
        foo(i)
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

console.log(foo.count) // 0
```