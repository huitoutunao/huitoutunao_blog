# Vue 源码之 Object 的变化侦测

## 前言

这是 `Vue.js` 的源码分析，记录自己在学习源码时的心得和收获。

`Vue.js` 的源码目录结构如下：
```
src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码
```

重点关注 `core` 文件夹下面的代码文件，因为这是 `Vue.js` 的核心代码。

## Object.defineProperty

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象，语法如下：
```js
Object.defineProperty(obj, prop, descriptor)
```

`obj` 要定义属性的对象；`prop` 要定义或修改的属性的名称；`descriptor` 要定义或修改的属性描述符。

## 参考文献

- 书籍《深入浅出 Vue.js》
- [learnVue](https://github.com/answershuto/learnVue)