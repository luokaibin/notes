---
title: Set
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

### .entries

### .forEach

### .values
