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

## 类型推论

举个例子：
```ts
let myNumber = 'seven'
myNumber = 7 // 报错
```
等价于
```ts
let myNumber: string = 'seven'
myNumber = 7
```
**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。**

## 联合类型

举个例子：
```ts
let myNumber: string | number
myNumber = 'seven'
myNumber = 7

myNumber = true // 报错
```
允许 `myNumber` 的类型是 `string` 或 `number`, 但不能是其他类型。

### 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法：
```ts
function getArrLength(data: string | number): number {
    return data.length
}
// 运行上面代码报错
```

`length` 不是 `string` 和 `number` 的共有属性，所以会报错，修改如下：
```ts
function getArrLength(data: string | number): number {
    return data.toSting()
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
```ts
let myNumber: string | number
myNumber = 'seven'
console.log(myNumber.length) // 5

myNumber = 7
console.log(myNumber.length) // 报错，此时 myNumber 被推论为 number 类型，而这个类型没有 length 属性
```

## 对象类型接口

举个简单例子：
```ts
interface Person {
    name: string;
    age: number;
}

let huitoutunao: Person = {
    name: 'huitoutunao',
    age: 25
}
```

上面的例子中，定义了一个接口 `Person`，接着定义了一个变量 `huitoutunao`，它的类型是 `Person`。这样，我们就约束了 `huitoutunao` 的形状必须和接口 `Person` 一致。**接口一般首字母大写。**

定义的变量必须和接口的属性一致。

### 可选属性

可选属性的含义是该属性可以不存在，但仍然不允许添加未定义的属性：
```ts
interface Person {
    name: string;
    age?: number;
}

// 正确
let huitoutunao: Person = {
    name: 'huitoutunao'
}

// 错误
let huitoutunao: Person = {
    name: 'huitoutunao',
    job: 'frontend'
}
```

### 任意属性

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let huitoutunao: Person = {
    name: 'huitoutunao',
    gender: 'male'
}
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：**
```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

// 报错
let huitoutunao: Person = {
    name: 'huitoutunao',
    age: 25,
    gender: 'male'
}
```

因为定义任意属性（字符串类型）的返回值必须是字符串类型或者是它的子集，但是 age（字符串类型）返回值是 `number` 类型，所以会报错。

也可以在任意属性中使用联合类型：
```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

// 正确
let huitoutunao: Person = {
    name: 'huitoutunao',
    age: 25,
    gender: 'male'
}
```

### 只读属性

`readonly` 定义只读属性：
```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let huitoutunao: Person = {
    id: 89757,
    name: 'huitoutunao',
    gender: 'male'
}

huitoutunao.id = 9527 // 报错
```

注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let huitoutunao: Person = {
    name: 'huitoutunao',
    gender: 'male'
}

// 在对 huitoutunao 进行赋值的时候，没有给 id 赋值，所以报错了。
// 给 huitoutunao.id 赋值的时候，由于它是只读属性，所以报错了。
huitoutunao.id = 89757
```

## 数组的类型

## 参考文献

- [TypeScript](https://www.tslang.cn/)
- [TypeScript 入门教程](https://ts.xcatliu.com/)
- [TypeScript Handbook](https://zhongsp.gitbooks.io/typescript-handbook/content/)