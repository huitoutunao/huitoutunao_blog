# TypeScript 基础

## 前言

这里主要记录学习 TypeScript 过程中，易混淆知识点的总结笔记。

## 空值

使用 `void` 表示没有任何返回值的函数：
```ts
function alertName(): void {
    alert('My name is Tom')
}
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`（只在 --[strictNullChecks](https://www.tslang.cn/docs/handbook/tsconfig-json.html) 未指定时）：
```ts
let unusable: void = undefined
```

## Null 和 Undefined

它们两个是来定义原始数据类型：
```ts
let n: null = null
let u: undefined = undefined
```

与 `void` 的区别是，`undefined` 和 `null` 是**所有类型的子类型**。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：
```ts
// 这样不会报错
let num: number = undefined

// 这样也不会报错
let u: undefined
let num: number = u
```

而 `void` 类型的变量不能赋值给 `number` 类型的变量：
```ts
// 这样会报错
let vo: void
let num: number = vo
```

## 未声明类型的变量

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
```js
let name
name = 'huitoutunao'
name = 7
```
等价于
```ts
let name: any
name = 'huitoutunao'
name = 7
```

## 参考文献

- [TypeScript](https://www.tslang.cn/)
- [TypeScript 入门教程](https://ts.xcatliu.com/)
- [TypeScript Handbook](https://zhongsp.gitbooks.io/typescript-handbook/content/)