---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
  - es2015
title: Set
comments: 
description: 创建 本身是一个构造函数，所以我们使用 关键字创建 对象语法： 可选 的元素都是唯一的，所以多出的 &#39;a&#39;, &#39;s&#39;, undefined, NaN, null并没有添加进去, 但是两个对象和数组都添加进去了，说明同样的数组和对象并不等于他自身。但是如果数组和对象是引用的，那么它是相等的，不会被重复添加的，比如：
---

<p style="font-size: 1.65rem;padding-bottom: 0.3rem;border-bottom: 1px solid #eaecef;font-weight:700;"> Set </p>
`Set` 是**ES6**引入的一个新的数据结构，它是一个类数组对象，与数组不同的是`Set` 的元素都是唯一的。

## 创建

- `Set` 本身是一个构造函数，所以我们使用`new` 关键字创建`Set` 对象
- 语法：`new Set([iterable])`
  - `iterable` 可选

```js
const s1 = new Set(['a', 's', 'a', 's', undefined, undefined, NaN, NaN, null, null, ['f', 'g'], ['f', 'g'], {f: 'f'}, {f: 'f'},]);
console.log(s1); // 输出 'a', 's', undefined, NaN, null, ['f', 'g'], ['f', 'g'], {f: 'f'}, {f: 'f'}
```

> `Set` 的元素都是唯一的，所以多出的 'a', 's', undefined, NaN, null并没有添加进去, 但是两个对象和数组都添加进去了，说明同样的数组和对象并不等于他自身。
>
> 但是如果数组和对象是引用的，那么它是相等的，不会被重复添加的，比如：
>
> ```js
> const obj = {name: '李白'};
> const arr = [0,1]
> const s1 = new Set([obj, obj, arr, arr, 'a', 's', 'a', 's', undefined, undefined, NaN, NaN, null, null, ]);
> console.log(s1); // 输出 {name: '李白'}, [0,1], 'a', 's', undefined, NaN, null
> ```

## .add

- `.add()` 方法用于向`Set`对象的末尾添加新元素；（类似于数组的 `push()` 方法）
- 语法：`mySet.add(value);`
  - `value` 必需。需要添加到 `Set `对象的值。
  - 返回值 `Set` 对象本身

```js
const obj = {name: '李白'};
const arr = [0,1];
const s1 = new Set();
s1.add(obj);
s1.add(arr);
console.log(s1); // 输出 {name: '李白'}, [0,1]
```

## .clear

- 删除`Set` 对象的所有元素
- 语法：`mySet.clear()`

```js
const s1 = new Set(['a', 's', 'a', 's', undefined, undefined, NaN, NaN, null, null, ['f', 'g'], ['f', 'g'], {f: 'f'}, {f: 'f'},]);
s1.clear();
console.log(s1); // 输出 []
```

## .delete

- 从`Set` 对象中删除一个指定的元素；（如果你要删除的元素是一个对象，但不是来源于另一个对象的引用，会删除失败）
- 语法：`mySet.delete(value);`
  - `value` 将要删除的元素
  - 返回值 删除成功返回`true` 删除失败返回 `false`

```js
const arr = [0,1];
const s1 = new Set([{name: '李白'}, arr]);
s1.delete({name: '李白'});
s1.delete([0,1]);
console.log(s1); // 输出 {name: '李白'}, [0,1]; 没有一个被删除掉
```

```js
const arr = [0,1];
const s1 = new Set(['a', {name: '李白'}, arr]);
s1.delete({name: '李白'});
s1.delete(arr);
s1.delete('a');
console.log(s1); 
// 输出 {name: '李白'}
// 数组来自另一个数组的引用，删除也用的同样的引用所以成功删除了；
// ‘a’ 是字符串 原始类型 所以直接就删除成功
```

## .has

- 判断`Set` 对象的某个元素是否存在
- 语法：`mySet.has(value);`
  - `value` 必需 用以测试该值是否存在于 Set 对象中。
  - 返回值 Boolean，存在返回true，不存在返回false；（同样对于数组和对象有元素是否来源于另一个对象的引用的影响）

```js
const arr = [0,1];
const s1 = new Set([{name: '李白'}, arr]);
console.log(s1.has({name: '李白'})); // false
console.log(s1.has(arr)); // true
```

## 其他（不常用）

### .forEach

- `forEach` 方法会根据集合中元素的插入顺序，依次执行提供的回调函数。
- 语法：`mySet.forEach(callback([currentValue[,currentKey[,set]]])[, thisArg])`
  - `callback` 为集合中每个元素执行的回调函数，该函数接收三个参数：
    - `currentValue` , `currentKey` **currentValue** 是正在被操作的元素。并且由于集合没有索引，所以 **currentKey** 也表示这个正在被操作的元素。
    - `set` 可选 调用当前 `forEach` 方法的集合对象
  - `thisArg` 回调函数执行过程中的 `this` 值。

> **`Set`** 对象中没有索引(keys)，所以前两个参数都是`Set`中元素的值(**values**)，之所以这样设计回调函数是为了和[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/foreach) 以及`Array` 函数用法保持一致

```js
const arr = [0,1];
const s1 = new Set(['a', {name: '李白'}, arr]);
s1.forEach((currentValue,currentKey,set) => {
  console.log(currentValue,currentKey,set)
})
```

### .values

-  `values()` 方法返回一个 `Iterator` 对象，该对象按照原Set 对象元素的插入顺序返回其所有元素。
- **`keys()`** 方法是这个方法的别名 (与 `Map`对象相似); 它的行为与 value 方法完全一致，返回 Set 对象的元素。
- 语法：`mySet.values();`
  - 返回值 将返回一个新生成的可迭代对象，以插入 Set 对象的顺序返回其包含的每个元素的值。

```js
const arr = [0,1];
const s1 = new Set(['a', {name: '李白'}, arr]);
const setIter = s1.values();

console.log(setIter.next()); // 输出 {value: "a", done: false}; done 是否遍历结束
console.log(setIter.next()); // 输出 {value: {name: "李白"}, done: false};
```

### .entries

- `entries()` 方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。由于集合对象不像 Map 对象那样拥有 key，然而，**为了与 Map 对象的 API 形式保持一致**，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组
- 大胆猜测这个API可能最终会被删除，在`Set` 对象中，这个API的意义并不大
- 语法：`mySet.entries()`
  - 返回值   一个新的包含 [value, value] 形式的数组迭代器对象，value 是给定集合中的每个元素，迭代器 对象元素的顺序即集合对象中元素插入的顺序。

```js
const arr = [0,1];
const s1 = new Set(['a', {name: '李白'}, arr]);
const setIter = s1.entries();

console.log(setIter.next()); // 输出 {value: ["a", "a"], done: false}; done 是否遍历结束
console.log(setIter.next()); // 输出 {value: [{name: "李白"}, {name: "李白"}], done: false};
```



> `Set` 对象的API大多数都有参照`Map` 对象设计，学习过程中可以参考`Map` 对象