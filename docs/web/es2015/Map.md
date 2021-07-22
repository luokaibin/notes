---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
  - es2015
title: Map
comments: 
description: Map和Object引用自MDN 和  类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成  使用。不过  和  有一些重要的区别，在下列情况里使用  会是更好的选择：一个的键只能是或者 ，但一个  的键可以是
---

<p style="font-size: 1.65rem;padding-bottom: 0.3rem;border-bottom: 1px solid #eaecef;font-weight:700;"> Map </p>
`Map` 对象是ES6新出的数据结构，类似于对象，同样是键值对的集合，但是它的键（key）不再局限于字符串，任何对象（数组，对象，函数）或者原始值（number、string、boolean、null、undefined）都可以作为键（key）

## Map和Object

引用自MDN

> `Objects` 和 `Maps` 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 `Maps` 使用。不过 `Maps` 和 `Objects` 有一些重要的区别，在下列情况里使用 `Map` 会是更好的选择：
>
> * 一个`Object`的键只能是[`字符串`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)或者 `Symbols`，但一个 `Map` 的键可以是**任意值**，包括函数、对象、基本类型
> * Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。
> * 你可以通过 `size` 属性直接获取一个 `Map` 的键值对个数，而 `Object` 的键值对个数只能手动计算。
> * `Map` 可直接进行迭代，而 `Object` 的迭代需要先获取它的键数组，然后再进行迭代。
> * `Object` 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 `map = Object.create(null)` 来创建一个没有原型的对象，但是这种用法不太常见。
> * `Map` 在涉及频繁增删键值对的场景下会有些性能优势。

## 最佳实践

最佳实践是我在实际项目中所感受到的最适合于使用它的场景，带有强烈的主观视觉

* **场景一：** 当后端给我们返回的是某一状态的code码而不是具体状态Name的时候，一般情况可能我们会使用`if` 判断，**比如Code等于1就是待付款**，或者使用 **switch** 去比对，但实际我们这个时候使用`Map`会非常方便
* **场景二：** 文章列表--文章详情互相跳转，列表和详情可能会频繁的切换跳转，此时就可以把内容详情数据储存到map中，当用户进入过已静查看过的文章，我们就可以从map中取我们储存的值，不需要再次请求接口
* **场景三：** 策略模式
* **其他更适合的场景项目中自行探索，但这个API真的非常好用**

## 创建

* **重要程度：** <Rate />

* 语法：`new Map([iterable])`
  * `iterable` Iterable 可以是一个数组或者其他 iterable 对象，其元素为键值对(两个元素的数组，例如: [[ 1, 'one' ],[ 2, 'two' ]])。 每个键值对都会添加到新的 Map。`null` 会被当做 `undefined。`

```js
// orderStatus 1  2 待发货 3 运输中 4 已收货 5 已评价
// logisticsState 110 已接单 220 运输中 140 已揽收 260 配送中 250 已签收
const stateMap = new Map(); // 创建一个空的Map对象
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]); // 创建有初始值的Map对象

const newStateMap = new Map([
  ['orderStatus', statusMap],
  ['logisticsState', new Map([
    [110, '已接单'],
    [220, '运输中'],
    [140, '已揽收'],
    [260, '配送中'],
    [250, '已签收']
  ])]
]) // map对象的值可以还是map对象
const getStatusDesc = new Map([
  ['getOrderStatusDesc', (code) => {
    return statusMap.get(code);
  }],
  ['getLogisticsStateDesc', code => {
    const logisticsState = newStateMap.get('logisticsState');
    return logisticsState.get(code);
  }]
]) // map对象的值还可以是函数
```

## .set

* 为 `Map` 对象**添加或更新**一个指定了键（`key`）和值（`value`）的（新）键值对
* `set()` 方法支持链式调用
* 语法：`myMap.set(key, value);`
  * `key` 要添加至相应 `Map` 对象的元素的键
  * `value` 要添加至相应 `Map` 对象的元素的值
  * 返回值修改后的`Map` 对象

```js
const stateMap = new Map(); // 创建一个空的Map对象
stateMap.set(1, '未付款'); // 添加一个
stateMap.set(2, '待发货').set(3, '运输中').set(4, '已收货'); // 链式调用
stateMap.set(3, '已评价'); // 更新
```

## .delete

* 删除`Map` 对象中指定的元素
* 语法：`myMap.delete(key);`
  * `key` 必须。从 `Map` 对象中移除的元素的键。
  * 如果 `Map` 对象中存在该元素，则移除它并返回 `true`；否则如果该元素不存在则返回 `false`。 

```js
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]);
statusMap.delete(1); // 删除
```

## .get

* 根据`key` 获取值
* **重要程度：** <Rate />

* 语法：`myMap.get(key);`
  * `key` 必须参数，也是它唯一的参数，要从目标 `Map` 对象中获取的元素的键。
  * 返回 `Map` 对象中与指定键相关联的值，如果找不到这个键则返回 `undefined`。

```js
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]); // 创建有初始值的Map对象

const newStateMap = new Map([
  ['orderStatus', statusMap],
  ['logisticsState', new Map([
    [110, '已接单'],
    [220, '运输中'],
    [140, '已揽收'],
    [260, '配送中'],
    [250, '已签收']
  ])]
]) // map对象的值可以还是map对象
const statusDesc = new Map([
  ['getOrderStatusDesc', (code) => {
    return statusMap.get(code); // 查询
  }],
  ['getLogisticsStateDesc', code => {
    const logisticsState = newStateMap.get('logisticsState');
    return logisticsState.get(code); // 查询
  }]
]) 

const getStatusDesc = statusDesc.get('getLogisticsStateDesc'); // 查询后拿到一个函数
console.log(getStatusDesc(140)); // 传入状态code码，输出 已揽收
console.log(getStatusDesc(5)); // undefined
```

> 如果要使用`Map` 对象，`get()` API是一个必须掌握的API，它是我们从来查询数据的；同样创建`Map` 对象也是必须要掌握的。你可以说我之后不在添加和更新`Map` 对象了，那`set()` API可以略放过，但创建必须会。

## .has

* 检测`Map` 对象中是否含有指定的元素，返回Boolean
* 语法`myMap.has(key);`
  * `key` 必填. 用来检测是否存在指定元素的键值.
  * 如果指定元素存在于Map中，则返回true。**其他情况返回false**

```js
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]);
status.has(3); // true
```

## .clear

* 删除`Map` 对象中所有元素。（删库跑路）
* 语法：`myMap.clear();`

```js
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]);
statusMap.clear();
```

## 其他（不常用）

### .keys

- 此API是ES6新加的
- `keys()` 返回一个新的 `Iterator`（迭代器） 对象。它包含按照顺序插入 `Map` 对象中每个元素的key值。
- 注意区分`Object.keys()` 的区别
- 语法：`myMap.keys()`
  - `myMap` 需要返回迭代器的源对象
  - 返回值 一个新的 Map 迭代器对象

```js
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]);
const iterator = statusMap.keys();
console.log(iterator.next()); // { value: 1, done: false } value 对应key，done是否迭代结束
console.log(iterator.next()); // { value: 2, done: false }
```

> `.keys()` 和 `values()` 以及 `entries()` 可以参考数组的同方法

### .values

- 此API是ES6新加的
- `values()` 返回一个新的 `Iterator`（迭代器） 对象。它包含按照顺序插入 `Map` 对象中每个元素的value值。
- `.keys()` 和 `values()` 以及 `entries()` 是一组，不同的是一个返回key，一个返回value，一个key和value一起返回
- 语法：`myMap.values()`
  - `myMap` 需要返回迭代器的源对象
  - 返回值 一个新的 Map 迭代器对象

```js
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]);
const iterator = statusMap.values();
console.log(iterator.next()); // { value: '未付款', done: false } done是否迭代结束
console.log(iterator.next()); // { value: '待发货', done: false }
```

### .entries

- 此API是ES6新加的
- `entries()` 方法返回一个新的包含 `[key, value]` 对的 `Iterator` 对象，返回的迭代器的迭代顺序与 `Map` 对象的插入顺序相同。
- 语法：`myMap.entries()`
  - `myMap` 需要返回迭代器的源对象
  - 返回值 一个新的 Map 迭代器对象

```js
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]);
const iterator = statusMap.entries();
console.log(iterator.next()); // { value: [1, "未付款"], done: false } done是否迭代结束
console.log(iterator.next()); // { value: [2, "待发货"], done: false }
```

### .forEach

- `forEach()` 方法将会以插入顺序对 Map 对象中的每一个键值对执行一次参数中提供的回调函数。(类似数组的forEach)
- 语法：`myMap.forEach(callback([value[,key[,Map]]])[, thisArg])`
  - `callback` 必要，每个元素所要执行的函数，接收三个参数
    - `value` 元素的值
    - `key` 元素的键
    - `Map` 当前正在被遍历的对象
  - `thisArg` 可选，`callback` 执行时其 `this` 的值。

```js
const statusMap = new Map([
  [1, '未付款'],
  [2, '待发货'],
  [3, '运输中'],
  [4, '已收货'],
  [5, '已评价'],
]);
// forEach使用箭头函数做回调的this指向请查看数组的forEach方法
statusMap.forEach((value,key,Map) => {
  console.log(value,key,Map)
})

// 输出 
// > "未付款" 1 [object Map]
// > "待发货" 2 [object Map]
// > "运输中" 3 [object Map]
// > "已收货" 4 [object Map]
// > "已评价" 5 [object Map]
```

