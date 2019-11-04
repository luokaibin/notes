# ES2015 + 常用API

<p style="text-align: right">----胖大人本胖&emsp;&emsp;&emsp;&emsp;&emsp;</p>

## 变量

### var和let与const

#### 相同点

* 声明变量

#### 区别

1. var声明的变量存在变量提升（变量被声明前可用）；let和const不存在变量提升（变量声明前使用会抛出错误）

   * 示例 1

   ```js
   console.log(a) // 输出 undefined
   var a = 10;
   /***********以上代码在被执行时完全等于以下代码***********/
   var a;
   console.log(a);
   a = 10;
   ```

   * 示例二

   ```js
   console.log(a); // 输出 undefined
   var b = 2;
   if (b === 2) {
     var a = 10;
   }
   /***********以上代码在被执行时完全等于以下代码***********/
   var a,b = 2;
   console.log(a);
   if (b === 2) {
     a = 10;
   }
   ```

   * 示例 3

   ```js
   console.log(a); // 报错 不再往下执行；注掉此行
   fn1();
   function fn1() {
     console.log(a); // 注掉第一行代码后，输入 undefined
     var a = 10;
   }
   /**********以上代码在被执行时完全等于以下代码(注释第一行console.log后)*********/
   fn1();
   function fn1() {
     var a;
     console.log(a); // 注掉第一行代码后，输入 undefined
     a = 10;
   }
   ```

   * 示例 4

   ```html
   <body>
     <script src="./index.js"></script>
     <script src="./index2.js"></script>
   </body>
   ```

   ```js
   // index.js
   console.log(a); // 报错
   // index2.js
   var a = 10
   ```

   **总结：** 1. var声明的变量的变量提升不是直接提到最顶层，而是提升到当前变量执行作用域的顶层；			2. 除var存在变量提升外，function同样存在变量提升

   ​			3. var的变量提升在独立的js文件内提升，不会跨文件提升;

2. var的作用域是它当前执行的上下文；let和const存在块级作用域，即距离变量最近的花括号内

   * 示例 1

   ```html
   <body>
     <script src="./index.js"></script>
     <script src="./index2.js"></script>
   </body>
   ```

   ```js
   // index.js
   {
     var a = 10; // var 换成const/let后报错
   }
   // index2.js
   console.log(a); // 输出10
   ```

   * 示例 2 是关于函数/if判断/for循环内的作用域，实际效果和**第一点示例3**一致

3. var在相同作用域内可以重复声明变量；let和const重复声明会抛出错误

   * 示例

   ```js
   var a = 10;
   var a = 20;
   console.log(a); // 输出20
   
   /**************** or ******************/
   let a = 10;
   let a = 20;
   console.log(a); // 报错，不会继续执行
   ```

4. let与var声明的变量所指向的内存地址可变（表现为定义的变量的可以被修改）；const声明的变量所指向的内存地址不可改变（表现为不可以重新赋值）

   * 示例

   ```js
   var a = 10; // 假设 10的内存地址 102091092091，a指向就是102091092091 下面同理
   let b = 15; // 假设内存地址为 102091092092
   const c = { a: a, b: b }; // 假设内存地址为 102091092093 内部是 拷贝a赋值a 拷贝 b 赋值给b
   const e = [10, b]; // 假设内存地址为 102091092094
   
   a = 20; // 假设 20的内存地址 102091092095，此时a的指向已经改变了，重新指向了102091092095，102091092091（也就是10）已经没有被引用，此时就被垃圾回收了；
   b = 25; // 同上
   // var/let声明的变量可以修改指向的内存地址
   console.log(a, b, c, e); // 输出 20 25 {a: 10, b: 15} [10, 15]
   c.d = 30; // 此时会在c所指向的内存地址中添加内容，而不会扩展
   e.push(c); // 同上
   console.log(c,e); // 输出 {a: 10, b: 15, d: 30} [10, 15, {a: 10, b: 15, d: 30}]
   c = { a: a, c: c, d: c.d }; // 此时相当于新建对象新建内存，但const声明的变量内存指向不允许更改，所以报错不在执行
   e = [10, 15, 20]; // 同上 但前一行报错之后的内容也不会执行
   console.log(c, e); // 同上
   ```

#### 使用var可能导致的问题

```html
<body>
  <script src="./index.js"></script>
  <script src="./index2.js"></script>
</body>
```

```js
// index.js 假设此文件是一个第三方库
var a = 10;
function fn1() {
  return a + 20;
}
// index2.js 假设此文件是我们自己的业务js
var a = 60;
console.log(fn1()); // 输出 80
```

变量覆盖，变量被修改。假设我们在Vue项目没有使用第三方库，仅我们自己的业务js。如果在项目中全部使用var，虽然js写在不同的文件中，但webPack打包后会进行文件整合，假设对于状态的变量都使用了state/status，由于var的变量提升，变量被复写的可能性降大幅提高，对于let也会可能增加变量被修改的可能行，基于此如果引入第三方库对于常用的储存格式化等很基础的语义化单词，被复写修改可能性会更高

#### 推荐

基于以上内容，推荐变量使用`const > let > var`

### 解构赋值

#### 数组解构赋值

```js
const list = [1, 2, 3, 4, 8, 9, 10];
const [first,second,,,fifth] = list; // 解构取数组前两个元素和第五个元素
console.log(first, second, fifth); // 1 2 8
```

#### 对象的解构赋值

```js
const obj = {name: '张三', sex: 1, sexDecs: '男', age: 12 };
const { name, sexDecs } = obj;
console.log(name, sexDecs); // 张三 男
```

#### 函数的结构赋值

```js
function fn1 ({userName, userId }) {
  console.log(userName, userId);
}
const user = {userName: '杜少陵', userId: 'dsl'};
fn1(user);
```

#### 深层次混合嵌套的结构赋值

```js
const user = {
  name: '杜甫',
  anotherName: '杜少陵',
  birthplace: '河南巩县',
  friends: [
    {
      name: '李白',
      dynasty: '唐',
      getOtherInfo: function() {
        return {
          father: '未知',
          mother: '不知',
        }
      },
    },
    {
      {
      name: '元稹',
      dynasty: '唐',
      getOtherInfo: function() {
        return {
          father: '元宽',
          mother: '郑氏',
        }
      },
    }
  ],
  getRelativesInfo: function() {
    return {
      grandfather: '杜审言',
      father: '杜闲',
      mother: '卢氏',
      wife: '司农少卿杨怡之女',
      child: ['宗文', '宗武', '凤儿'],
    }
  }
}
const { name, anotherName, birthplace, getRelativesInfo, friends: [, {dynasty, getOtherInfo}] } = user;
console.log(name, anotherName, birthplace, getRelativesInfo, dynasty, getOtherInfo); // 杜甫 杜少陵 河南巩县 输出函数 唐 输出函数
const {grandfather, father, mother, wife, child: [,,childrenName]} = getRelativesInfo();
console.log(grandfather, father, mother, wife, childrenName); // 杜审言 杜闲 卢氏 司农少卿杨怡之女 凤儿
```

#### 解构赋值后重命名

```js
const name = '李白';
const user = {name: '白居易', job: '诗人'};
// 对user进行解构赋值取name，会造成重复声明，此时可以解构后重新指定变量名
const {name: baiName} = user;
console.log(baiName); // 白居易
```

#### 解构赋值的默认值

有时候进行解构赋值的时候我们并不知道我们所要解构的对象中是否有我们所要的对象，此时就可以指定默认值

* 对象的默认值

```js
const ChiZhiYang = { name: '柴止痒', age: 26 };
const {name = '未命名', gender = '未知', age = 0, bodyWeight = '0KG', other: {formerResidence} = {formerResidence: '中国'}} = ChiZhiYang;
console.log(name, gender, age, bodyWeight, formerResidence); // 柴止痒 未知 26 0KG 中国
```

* 数组的默认值

```js
const programmer = [];
const [firstPeople = '第一个程序猿', secondPeople = '第二个程序猿'] = programmer;
console.log(firstPeople, secondPeople); // 第一个程序猿 第二个程序猿
```

##字符串

### 模版字符串

* **ES6新增内容**

* 模版字符串保持字符串格式不变

  * 普通字符串

  ```js
  const str = '渡荆门送别\n李白\n渡远荆门外，来从楚国游。\n山随平野尽，江入大荒流。\n月下飞天镜，云生结海楼。\n仍怜故乡水，万里送行舟。';
  console.log(str); // 输出见下图
  ```

  ![image-20191101150247150](/Users/mac/Library/Application Support/typora-user-images/image-20191101150247150.png)

  * 模版字符串

  ```js
  // 普通字符串无法换行定义
  const str = `
        渡荆门送别
                李白
  
  渡远荆门外，来从楚国游。
  山随平野尽，江入大荒流。
  月下飞天镜，云生结海楼。
  仍怜故乡水，万里送行舟。
  `;
  console.log(str); // 输出见下图
  ```

  ![image-20191101150401268](/Users/mac/Library/Application Support/typora-user-images/image-20191101150401268.png)

* 模版字符串中可以使用变量

  关于`reduce`API会在之后讲解

  * 普通字符串模版拼接

  ```js
  const prace = {title: '渡荆门送别', autor: '李白', content: ['渡远荆门外，来从楚国游。', '山随平野尽，江入大荒流。', '月下飞天镜，云生结海楼。', '仍怜故乡水，万里送行舟。']}
  
  const render = function (accumulator, currentValue, index) {
    return index === 1 ? '<p>' + accumulator + '</p>' + '<p>' + currentValue + '</p>' : accumulator + '<p>' + currentValue + '</p>';
  }
  
  const nodes = '<article><h3>' + prace.title + '</h3><address>' + prace.autor + '</address>' + prace.content.reduce(render) + '</article>';
  
  document.write(nodes); // 输出看下图
  ```

  ![image-20191101160644004](/Users/mac/Library/Application Support/typora-user-images/image-20191101160644004.png)

  * 在模版字符串中使用变量拼接

  ```js
  const prace = {title: '渡荆门送别', autor: '李白', content: ['渡远荆门外，来从楚国游。', '山随平野尽，江入大荒流。', '月下飞天镜，云生结海楼。', '仍怜故乡水，万里送行舟。']}
  
  const render = function (accumulator, currentValue, index) {
    return index === 1 ? `<p>${accumulator}</p><p>${currentValue}</p>` : `${accumulator} <p>${currentValue}</p>`;
  }
  
  const nodes = `
  <article>
  	<h3>${prace.title}</h3>
  	<address>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;${prace.autor}</address>
  	${prace.content.reduce(render)}
  </article>
  `;
  
  document.write(nodes); // 输出看下图
  ```

  ![image-20191101161453357](/Users/mac/Library/Application Support/typora-user-images/image-20191101161453357.png)

### .includes

* ES6新增API

* 判断一个字符串是否包含在另一个字符串中，返回`true`或`false`

* 语法`str.includes(searchString[, position])`

  * **searchString** 要搜索的字符串
  * **position** 从指定位置开始检索

  ```js
  const str = `
        渡荆门送别
                李白
  
  渡远荆门外，来从楚国游。
  山随平野尽，江入大荒流。
  月下飞天镜，云生结海楼。
  仍怜故乡水，万里送行舟。
  `;
  console.log(str.includes('李白')); // true
  console.log(str.includes('李白', 40)); // false 从40开始搜索，40之前的字符串会被忽略 检索不到
  // 注意字符串的定义是使用模版字符串，顾下标为0的元素是空格而不是”渡“
  ```

### .startsWith

* ES6新增API

* 判断一个字符串是否在另一个字符串的开始位置（准确说：判断当前字符串是否以一个给定的字符串开始的），返回`true`或`false`

* 语法`str.startsWith(searchString[, position])`

  * **searchString** 要搜索的字符串
  * **position** 从指定位置开始检索

  ```js
  const str = '渡荆门送别李白渡远荆门外，来从楚国游。山随平野尽，江入大荒流。月下飞天镜，云生结海楼。仍怜故乡水，万里送行舟。';
  console.log(str.startsWith('渡荆门送别')); // true
  console.log(str.startsWith('渡荆门送别', 3)); // false
  ```

### .endsWith

* ES6新增API

* 判断一个字符串是否在另一个字符串的结束位置（准确说：判断当前字符串是否以一个给定的字符串结束的），返回`true`或`false`

* 语法`str.endsWith(searchString[, position])`

  * **searchString** 要搜索的字符串
  * **position** 从指定位置开始检索 默认为str.length

  ```js
  const str = '渡荆门送别李白渡远荆门外，来从楚国游。山随平野尽，江入大荒流。月下飞天镜，云生结海楼。仍怜故乡水，万里送行舟。';
  console.log(str.endsWith('万里送行舟。')); // true
  console.log(str.endsWith('万里送行舟。', 54)); // false
  ```

### .padStart

* ES8新增API

* 用一个字符串填充当前字符串到指定长度。从字符串左侧开始填充

* **适用场景：** 月份补0，倒计时时分秒补0

* 语法`str.padStart(targetLength [, padString])`

  * **targetLength** 目标长度。如果目标长度小于当前字符串长度，会返回字符串本身
  * **padString** 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "

  ```js
  const date = new Date();
  const minutes = date.getMinutes();
console.log(`${minutes}`.padStart(2, '0')); // 如果你获取到的分钟数是一位，那么你此时可以看到会在开始位置补0
  ```
  

### .padEnd

* ES8新增API

* 用一个字符串填充当前字符串到指定长度。从字符串右侧开始填充

* 语法`str.padEnd(targetLength [, padString])`

  * **targetLength** 目标长度。如果目标长度小于当前字符串长度，会返回字符串本身
  * **padString** 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "

```js
const str = '渡远荆门外，';
console.log(str.padEnd(18, '来从楚国游。')); // 渡远荆门外，来从楚国游。来从楚国游。
```

### .trim

* 删除字符串两端的空白；空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）
* **适用场景：** input表单验证表单提交
* 语法`str.trim()`

```vue
<template>
	<div class="container">
    <input type="text" v-model="value" />
    <button @click="handleSubmit">
      提交
  	</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    handleSubmit() {
      const value = this.value.trim(); // 去除字符串两端空白
      // ........ 业务逻辑
    }
  },
}
</script>
```

### .trimStart

* ES10 新增API
* 去除字符串开始位置（左侧）空白
* 语法`str.trimStart()`

```js
const str =  `
渡远荆门外

		`;
console.log(str.trimStart());
```

### .trimEnd

* ES10 新增API
* 去除字符串结束位置（右侧）空白
* 语法`str.trimEnd()`

```js
const str =  `
渡远荆门外

		`;
console.log(str.trimEnd());
```

### .repeat

* ES6 新增API
* 将一个字符串重复N次，并返回一个新的字符串
* 语法`const resultString = str.repeat(count);`
  * `count`要重复的次数 **Number类型，不能为负数，如果传入的是String会先转换成Number，如果是小数会向下取整**

```js
const str = '渡远荆门外';
console.log(str.repeat(2)); // 渡远荆门外渡远荆门外
```

### .split

* 根据指定字符将字符串分割成数组
* 语法`str.split([separator[, limit]])`
  * `separator`指定分割的字符，可以为正则表达式 可选 如果不传返回 `[str]`
  * `limit` 限制分割数组长度 如果长度超过本身可分割后的长度或为负数 都会返回本身可分割的数组

```js
const str = ' 渡 远 荆 门 外 ';
console.log(str.split()); // [" 渡 远 荆 门 外 "]
console.log(str.split('')); // (11) [" ", "渡", " ", "远", " ", "荆", " ", "门", " ", "外", " "]
console.log(str.split('', -1)); // (11) [" ", "渡", " ", "远", " ", "荆", " ", "门", " ", "外", " "]
console.log(str.split('', 3)); // [" ", "渡", " "]
console.log(str.split('', 20)); // (11) [" ", "渡", " ", "远", " ", "荆", " ", "门", " ", "外", " "]
```

## 箭头函数

### 定义

```js
// 无参数定义
const fn = () => {
  return '渡远荆门外';
};
console.log(fn()); // 渡远荆门外

// 一个参数定义
const fn1 = str => {
  return str;
};
console.log(fn1('渡远荆门外')); // 渡远荆门外

// 多个参数
const fn2 = (str1, str2, str3) => {
  return `${str1}
${str2}
${str3}`;
}
console.log(fn2('渡远荆门外','来从楚国游','山随平野尽'));
// 渡远荆门外
// 来从楚国游
// 山随平野尽
```

### 函数内部无逻辑,直接返回的，省略大括号

```js
const fn = () => '渡远荆门外';
console.log(fn()); // 渡远荆门外

const fn1 = str => str;
console.log(fn1('渡远荆门外')); // 渡远荆门外

const fn2 = (str1, str2, str3) => `${str1}
${str2}
${str3}`;
console.log(fn2('渡远荆门外','来从楚国游','山随平野尽'));
// 渡远荆门外
// 来从楚国游
// 山随平野尽
```

### 关于this指向

* funtion 定义函数时this指向是运行时决定的；箭头函数的指向时编译时决定的

```vue
<template>
	<div class="container">
    <button @click="handleClick">
      {{btnText}}
  	</button>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui';
export default {
  data() {
    return {
      btnText: '提交',
    };
  },
  methods: {
    handleClick() {
      MessageBox({
        title: '弹窗标题',
        message: '弹窗消息祝内容',
        type: 'success',
        callback: (action, instance) => {
          this.btnText = '提交中'; // 箭头函数的this是继承下来的指向的是组件实例
        }
      })
    },
    handleClickFn() {
      const self = this;
    	MessageBox({
        title: '弹窗标题',
        message: '弹窗消息祝内容',
        type: 'success',
        callback: function(action, instance) {
          self.btnText = '提交中'; // 如果使用的是function定义函数，必须提前定义this
        }
      })
  	}
  },
}
</script>
```

### 对象属性是函数

```js
const people = {
  name: '李白',
  getAge() {
    console.log(this.name); // 李白
    return 18;
  }
}
// 这里getAge用了简写 实质是function定义的，并不是箭头函数；在这里使用this指向的是对这个对象，如果用的是箭头函数定义的，指向取决于对象所处环境，this指向就是上下文

// 上面代码完全等于以下代码
const people = {
  name: '李白',
  getAge: function () {
    console.log(this.name); // 李白
    return 18;
  }
}

// 如果是用箭头函数定义的
const people = {
  name: '李白',
  getAge: () => {
    console.log(this.name); // 这里的this就是看你在哪里调用的
    return 18;
  }
}
```

## 数组

### isArray

* 检测一个值是否为`Array` 返回`true/false`
* **适用场景：** 判断一个值是数组且长度存在
* 语法`Array.isArray(obj)`
  * obj 需要检测的值。

```vue
<template>
	<!-- 当list为数组且长度存在的时候在进行渲染 -->
	<div class="container" v-if="Array.isArray(list) && list.length">
    <p v-for="list" :key="item">
      {{item}}
  	</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ['渡远荆门外，来从楚国游。', '山随平野尽，江入大荒流。', '月下飞天镜，云生结海楼。', '仍怜故乡水，万里送行舟。'],
    };
  },
}
</script>
```

### .find

* ES6 新增API
* 从数组中查找第一个符合匹配条件的元素
* 语法`const resultString = str.repeat(count);`
  * `count`要重复的次数 **Number类型，不能为负数，如果传入的是String会先转换成Number，如果是小数会向下取整**

### .findIndex

### .includes

### .flat

### .sort

### .concat

### .filter

### .map和.forEach

### .indexOf和findIndex

### .lastIndexOf

### .join

### .reduce和.reduceRight

### .shift和.pop

### .unshift和.push

### .some和.every

### .slice

### .splice

### 其他（不常用）

#### from

#### of

#### .copyWithin

#### .fill

#### .entries

#### .keys

#### .values

#### .flatMap

#### .reverse

## 对象

### is

### assign

### keys

### values

### entries

### 属性简洁表示法

### 属性名表达式

### 其他（不常用）

#### super

#### fromEntries

#### freeze

#### isFrozen

## Map

### 创建

### .set

### .delete

### .get

### .has

### .clear

### 其他（不常用）

#### .keys

#### .values

#### .forEach

#### .entries

## Set

### 创建

### .add

### .clear

### .delete

### .has

### 其他（不常用）

#### .entries

#### .forEach

#### .values

## Promise

### .then

### .catch

### .all

### .race

### .resolve

### .reject

### 其他（不常用）

#### .finally

#### .allSettled

#### .any

#### .try

## 语句和声明

### try...catch

### async/await

### 扩展运算符

