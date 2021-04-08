# 模拟实现 instanceof

## 介绍

一句话介绍 instanceof：
> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```js
function People (name, age) {
    this.name = name
    this.age = age
}

var student = new People('huitoutunao', 18)

console.log(student instanceof People) // true
```

分析：
1. student 必须是对象，所以排除基本类型
2. student 可能是继承而来的，所以沿着原型链向上查找，直到结果是 `null` 或者 `student.__proto__ === People.prototype`

## 实现

```js
function myInstanceof (target, origin) {
    if (typeof target !== 'object' || target === null) {
        return false
    }

    // Object.getPrototypeOf() 获取对象的原型，即内部的 [[prototype]] 属性（__proto__）
    var proto = Object.getPrototypeOf(target)

    while (true) {
        // 查找到原型链的尽头
        if (proto === null) {
            return false
        }

        // 查找到相同的原型对象
        if (proto === origin.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
}

myInstanceof(student, People) // true
```