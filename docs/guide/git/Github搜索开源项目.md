# Github 搜索开源项目技巧

> 下面语句可以并联使用

## 项目名称关键词

```json
in:name vue3
```

## 项目说明关键词

```json
in:readme vue3 商城
```

## 项目描述关键词

```json
in:description vue3
```

## 项目开发语言

```json
in:description 商城 language:vue
```

## 项目更新日期范围

```json
in:description 商城 language:vue pushed:>2021-02-01
```

## star 数在哪个范围

```json
in:name vue3 stars:>1000
```

## fork 数在哪个范围

```json
in:name vue3 forks:>500
```

## 如何判断开源项目是否活跃

- star 数是否大于 1000
- fork 数是否大于 500
- 项目代码最近有无更新
- issue 是否有人提问或解决问题频率
