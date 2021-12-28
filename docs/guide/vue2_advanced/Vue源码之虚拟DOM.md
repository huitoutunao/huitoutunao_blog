# Vue 源码之虚拟 DOM

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

## VNode

### VNode 是什么

VNode 可以理解成节点描述对象，它描述了应该怎样去创建真实的 DOM，即 JavaScript 对象版本的 DOM 元素。

VNode 创建 DOM 并插入视图。
```
vnode => DOM => 视图
```

### VNode 的作用

最重要的的一个作用是 VNode 更新前后的对比，这样只更新差异的节点，减少性能浪费。

### VNode 的类型

- 注释节点
- 文本节点
- 元素节点
- 组件节点
- 函数式节点
- 克隆节点