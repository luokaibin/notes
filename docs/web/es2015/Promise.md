---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
  - es2015
title: Promise
comments: 
description:  描述请看MDN创建也许经常在项目中看到的是在函数内作为 返回值返回的，其实都是一样的。不要被局限.then 接收 成功（官方描述：接收）或失败（官方描述：拒绝）状态（或者就理解 成功或失败状态的时候会执行） 支持链式调用语法： 当 Promise 变成成功状态时调用的函数。该函数有一个参数，即接受的最终结果（result）。如果该参数不是函数，则会在内部被替换为 
---

<p style="font-size: 1.65rem;padding-bottom: 0.3rem;border-bottom: 1px solid #eaecef;font-weight:700;"> Promise </p>


`Promise` 描述请看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 创建

```js
const promise = new Promise((reslove,reject) => {
  // 在这里去写异步操作，完成之后，修改promise状态。这里随便写写
  const num = parseInt(Math.random()*2); // 取个0或者1的随机数
  if(num) {
    reslove(num); // 取的随机数是0或者1，1 的时候是true，调用resolve()将promise修改为成功状态
  } else {
    reject(num); // 取的随机数是0或者1，0 的时候是false，调用reject()将promise修改为失败状态
  }
})
```

> 也许经常在项目中看到的是在函数内`Promise`作为 返回值返回的，其实都是一样的。不要被局限

## .then

* `then()` 接收`Promise` 成功（官方描述：接收）或失败（官方描述：拒绝）状态（或者就理解`promise` 成功或失败状态的时候会执行）
* `then()` 支持链式调用
* 语法：`promise.then(onFulfilled(result)[, onRejected(result)]);`
  * `onFulfilled` 当 Promise 变成成功状态时调用的函数。该函数有一个参数，即接受的最终结果（result）。如果该参数不是函数，则会在内部被替换为 `(x) => x`，即原样返回 promise 最终结果的函数
  * `onRejected` 当 Promise 变成失败状态（rejected）时调用的函数。该函数有一个参数，即拒绝的原因。 如果该参数不是函数，则会在内部被替换为一个 "Thrower" 函数

```js
const promise = new Promise((reslove,reject) => {
  // 在这里去写异步操作，完成之后，修改promise状态。这里随便写写
  const num = parseInt(Math.random()*2); // 取个0或者1的随机数
  if(num) {
    reslove({'success': num}); // 取的随机数是0或者1，1 的时候是true，调用resolve()将promise修改为成功状态
  } else {
    reject({'fail': num}); // 取的随机数是0或者1，0 的时候是false，调用reject()将promise修改为失败状态
  }
});
promise.then(res => {
  console.log('成功', res); // 当Promise变成成功状态执行，也就是随机数是1，走if，reslove()执行
}, ({fail}) => {
	console.log('失败', fail); // 当Promise变成失败状态执行，也就是随机数是0，走else，reject()执行
})
```

```js
// 链式调用
const promise = new Promise((reslove,reject) => {
  // 在这里去写异步操作，完成之后，修改promise状态。这里随便写写
  const num = parseInt(Math.random()*2); // 取个0或者1的随机数
  if(num) {
    reslove({'success': num}); // 取的随机数是0或者1，1 的时候是true，调用resolve()将promise修改为成功状态
  } else {
    reject({'fail': num}); // 取的随机数是0或者1，0 的时候是false，调用reject()将promise修改为失败状态
  }
});
promise.then(res => {
  console.log('成功', res); // 当Promise变成成功状态执行，也就是随机数是1，走if，reslove()执行
  return res;
}, ({fail}) => {
  console.log('失败', fail); // 当Promise变成失败状态执行，也就是随机数是0，走else，reject()执行
  return Promise.reject(fail)
}).then(res => {
  console.log('第二次链式调用的结果', res)
}, () => {
	console.log('第二次链式调用失败结果,我不接其值')
})
```

## .catch

* 如果`.then()` 方法没有提供第二个参数，且`Promise` 是失败状态，`.catch()` 的内容会被执行（官方描述： **catch()** 方法返回一个`Promise`，并且处理拒绝的情况。它的行为与调用[`Promise.prototype.then(undefined, onRejected)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 相同。 (事实上, calling `obj.catch(onRejected)` 内部calls `obj.then(undefined, onRejected)`)）

* 语法`Promise.catch(onRejected);`

  * 当Promise 被rejected时,被调用的一个Function。 该函数拥有一个参数：

    `reason`  rejection 的原因。

     如果 `onRejected` 抛出一个错误或返回一个本身失败的 Promise ，  通过 `catch()` 返回的Promise 被rejected；否则，它将显示为成功（resolved）

```js
const promise = new Promise((reslove,reject) => {
  // 在这里去写异步操作，完成之后，修改promise状态。这里随便写写
  const num = parseInt(Math.random()*2); // 取个0或者1的随机数
  if(num) {
    reslove({'success': num}); // 取的随机数是0或者1，1 的时候是true，调用resolve()将promise修改为成功状态
  } else {
    reject({'fail': num}); // 取的随机数是0或者1，0 的时候是false，调用reject()将promise修改为失败状态
  }
});
promise.catch(res => {
  console.log('失败', res); // 接受Promise失败状态，但是一般不会这么用
})
// 这么使用是有可能的
promise.then(res => {
  console.log('成功', res); // 当Promise变成成功状态执行，也就是随机数是1，走if，reslove()执行
  return res; // 原先是成功状态,我返回了新的Promise并且是失败状态
}).catch(res => {
  console.log('失败', res)
})
```

> 一般来说，如果我们给`.then()` 提供了第二个参数，也就是处理失败状态的函数，那么就完全没有必要调用`.catch()` 方法；如果没有给`.then()` 提供第二个参数，此时我们可以用`.catch()` 处理失败；
>
> 如果，既给`.then()` 提供了第二个参数，还写了`.catch()` 那么，`.catch()` 永远不会执行

## .all

* 官方描述： `Promise.all(iterable)` 方法返回一个 `Promise`实例，此实例在 `iterable` 参数内所有的 `promise` 都“完成（resolved）”或参数中不包含 `promise` 时回调完成（resolve）；如果参数中 `promise` 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 `promise` 的结果

* `.all()` 接收一个数组或者一个字符串，反正是一个可迭代的对象，数组中一般而言我们都会放`Promise` ,这些`Promise` 都是成功状态的时候`.all()` 就返回成功状态的`Promise` ,这些`Promise` 只要有一个失败了，就会返回失败状态，并且失败之后的内容不会再执行。这些`Promise` 的成功结果会汇聚成数组在成功状态中返回，失败的仅会返回失败的结果；如果是字符串，你得到的就是这些字符串迭代的数组，例如传入`asdfghjkl` 得到的就是`['a','s','d','f','g','h','j','k','l']`

* 实用程度：<Rate />
* 适用场景：再带有条件查询的列表中，我们可能既要查询列表又要查询条件，此时就可以使用`Promise.all()` 同时并发两个请求，而不用一个一个的发送
* 语法：`Promise.all(iterable);`
  * `iterable` 一个可迭代对象，如 `Array`或 `String`。
  * 返回值
    * 如果传入的参数是一个空的可迭代对象，则返回一个**已完成（already resolved）**状态的 `Promise`。
    * 如果传入的参数不包含任何 `promise`，则返回一个**异步完成（asynchronously resolved）** `Promise`。注意：Google Chrome 58 在这种情况下返回一个**已完成（already resolved）**状态的 `Promise`。
    * 其它情况下返回一个**处理中（pending）**的`Promise`。这个返回的 `promise` 之后会在所有的 `promise` 都完成或有一个 `promise` 失败时**异步**地变为完成或失败。 见下方关于“Promise.all 的异步或同步”示例。返回值将会按照参数内的 `promise` 顺序排列，而不是由调用 `promise` 的完成顺序决定。

```js
const createPromise = () => {
  return new Promise((reslove,reject) => {
    // 在这里去写异步操作，完成之后，修改promise状态。这里随便写写
    const num = parseInt(Math.random()*2); // 取个0或者1的随机数
    if(num) {
      reslove({'success': num}); // 取的随机数是0或者1，1 的时候是true，调用resolve()将promise修改为成功状态
    } else {
      reject({'fail': num}); // 取的随机数是0或者1，0 的时候是false，调用reject()将promise修改为失败状态
    }
  });
}
const resList = Promise.all([createPromise(),createPromise(),createPromise()]);
resList.then(resultList => {
	console.log('三个promise都成功', resultList); // [{ success: 1}, { success: 1}, { success: 1}]
},resultList => {
	console.log('三个promise有失败的', resultList); // { fail: 0, sort: 2 }
})
```

## .race

* `.race()` 和`.all()` 有一定相似性，`.race()` 同样接收数组（可迭代对象），不同的是传入的所有`Promise` 哪一个先执行完成就采用哪一个结果，第一个执行完成的是成功状态那么就返回成功状态，第一个执行完成的是失败状态那么就返回失败状态；（官方描述：`Promise.race(iterable)` 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。）
* 适用场景：假设我们需要查询一个列表，有两个接口都可以返回我们需要的数据，此时就可以使用`.race()` 哪一个先返回我们就采用哪一个结果，减少用户的等待时间
* 语法：`Promise.race(iterable);`
  * `iterable` 一个可迭代对象，如 `Array`或 `String`。
  * 返回值
    * 一个**待定的** `Promise`只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的值，从而**异步**地解析或拒绝（一旦堆栈为空）。

```js
const createPromise = () => {
  return new Promise((reslove,reject) => {
    // 在这里去写异步操作，完成之后，修改promise状态。这里随便写写
    const num = parseInt(Math.random()*2); // 取个0或者1的随机数
    if(num) {
      reslove({'success': num}); // 取的随机数是0或者1，1 的时候是true，调用resolve()将promise修改为成功状态
    } else {
      reject({'fail': num}); // 取的随机数是0或者1，0 的时候是false，调用reject()将promise修改为失败状态
    }
  });
}
const resList = Promise.race([createPromise(),createPromise(),createPromise()]);
resList.then(resultList => {
	console.log('成功结果', resultList); 
},resultList => {
	console.log('失败结果', resultList); 
})
```

## .resolve

* 返回一个成功状态的`Promise`(官方描述：`Promise.resolve(value)`方法返回一个以给定值解析后的`Promise`对象。如果该值为promise，返回这个promise；如果这个值是thenable（即带有`"then" 方法`，返回的promise会“跟随”这个thenable的对象，采用它的最终状态；否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平。)
* 实用程度：<Rate />
* 语法`Promise.resolve(value);`
  * `value` 将被`Promise`对象解析的参数。也可以是一个`Promise`对象，或者是一个thenable。
  * 返回值
    * 返回一个解析过带着给定值的`Promise`对象，如果参数是一个`Promise`对象，则直接返回这个`Promise`对象。

```js
const createPromise = () => {
  return Promise.resolve({name: '成功'});
}
createPromise().then(res => {
  console.log(res);
})
```

## .reject

* 返回一个失败状态的`Promise`(官方描述：`Promise.reject(reason)`方法返回一个带有拒绝原因reason参数的Promise对象)
* 实用程度：<Rate />
* 语法`Promise.reject(reason);`
  * `reason` 表示`Promise`被拒绝的原因。
  * 返回值
    * 一个给定原因了的被拒绝的 `Promise`。

```js
const createPromise = () => {
  return Promise.reject({name: '成功'});
}
createPromise().catch(res => {
  console.log(res);
})
```

> 需要注意如果使用了`Promise.resolve()` 那么只能在`Promise.then()` 中进行接收结果，`.then()` 的第二个参数不会起作用，`.catch()` 也不会起作用；
>
> 同理，使用了`Promise.reject()` 那么也只能在`.then()` 的第二个参数中接收结果或者`.catch()` 中接收结果。

## 其他（不常用）

### .finally

- 阮一峰老师的ES6文档中说此API是ES2018也就是ES9引入标准的，然而我在MDN上看到的此API依旧是草案
- `finally()` 方法返回一个`Promise`。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在`Promise`是否成功完成后都需要执行的代码提供了一种方式。

- `finally()` 方法避免了同样的语句需要在`then()`和`catch()`中各写一次的情况。
- 如果你熟悉微信小程序开发或者公众号开发的话，你会发现微信官方的提供的很多API都会提供三个勾子，一个成功时执行，一个错误时执行，一个无论成功还是失败都会执行。`finally()` 就可以理解成`Promise` 的一个勾子，这个勾子在 **`Promise`** 无论是成功还是失败都会执行
- 语法： `p.finally(onFinally)`
  - `p` Promise
  - `onFinally` Promise结束后调用的函数
  - 返回值 一个Promise对象 返回的Promise状态就是调用`onFinally` 函数时的状态

```js
const promise = new Promise((reslove,reject) => {
  // 在这里去写异步操作，完成之后，修改promise状态。这里随便写写
  const num = parseInt(Math.random()*2); // 取个0或者1的随机数
  if(num) {
    reslove({'success': num}); // 取的随机数是0或者1，1 的时候是true，调用resolve()将promise修改为成功状态
  } else {
    reject({'fail': num}); // 取的随机数是0或者1，0 的时候是false，调用reject()将promise修改为失败状态
  }
});
promise.then(res => {
  console.log('成功', res); // 当Promise变成成功状态执行，也就是随机数是1，走if，reslove()执行
  return res
}, ({fail}) => {
	console.log('失败', fail); // 当Promise变成失败状态执行，也就是随机数是0，走else，reject()执行
  return fail;
}).finally(res => {
  console.log('无论Promise最后状态是成功还是失败，这个函数都会被调用', res)
  return res;
})
```

### .allSettled

- 此API目前一个草案，尚未写入js标准

- 该`Promise.allSettled()`方法返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果。

- 每一个Promise执行结束之后，它的状态都是确定了的，不可修改。`Promise.allSettled()` 可以简单理解为它接收一个数组（可迭代对象），数组的元素都是确定状态的Promise，它返回一个Promise，用`.then()` 方法可以拿到数组中所有Promise的状态和结果

- 语法：`Promise.allSettled(iterable);`

  - `iterable` 一个可迭代的对象，例如`Array`，其中每个成员都是`Promise`。

  - 返回值 一个**未决议的** `Promise`将被**异步**完成一次promise 的指定集合在每一个promise 已经完成，无论是成功的达成或通过被拒绝。那时，返回的promise的处理程序作为输入传递一个数组，该数组包含原始promises集中每个promise的结果。

    对于每个结果对象，都有一个`status` 字符串。如果状态为`fulfilled`，则存在一个`value` 。如果状态为`rejected`，则说明原因 。值（或原因）反映了每个promise 决议（或拒绝）的值。

```js
const createPromise = () => {
  return new Promise((reslove,reject) => {
    // 在这里去写异步操作，完成之后，修改promise状态。这里随便写写
    const num = parseInt(Math.random()*2); // 取个0或者1的随机数
    if(num) {
      reslove({'success': num}); // 取的随机数是0或者1，1 的时候是true，调用resolve()将promise修改为成功状态
    } else {
      reject({'fail': num}); // 取的随机数是0或者1，0 的时候是false，调用reject()将promise修改为失败状态
    }
  });
}
const resList = Promise.allSettled([createPromise(),createPromise(),createPromise()]);
resList.then(resultList => {
	console.log('结果', resultList); // [{status: '状态', value: '结果'}]
})
```

> `Promise`的最佳实践应该是配合`async/await`来使用，可以非常明显的简化我们的代码

> `Promise` 还有一些其他的方法如`.any()` 、`.try()` ，但目前都是草案，尚未写入js标准