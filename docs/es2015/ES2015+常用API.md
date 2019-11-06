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

## 字符串

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
const fn = () => '渡远荆门外'; // 表示直接返回内容
console.log(fn()); // 渡远荆门外

const fn1 = str => str;
console.log(fn1('渡远荆门外')); // 渡远荆门外

const fn3 = str => console.log(str); // 表示 直接打印参数
fn3('山随平野尽'); // 山随平野尽

const fn4 = () => fn1('月涌大荒流'); // 表示 返回fn1的执行结果
fn4(); // 月涌大荒流

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

### 箭头函数的解构

```js
const params = {
  name: '李白',
  isDie: true,
}
const getName = params => params;
const friends = [params, '小白', getName];

const fn = ([{name, isDie},,fn],fn2) => {
  console.log(name,fn(name), fn2(isDie))
}
fn(friends,getName); // 李白 李白 true
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
    console.log(this.name); // 这里的this就是看你在哪里调用的 在全局就指向window。
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

* 从数组中查找第一个符合匹配条件的元素；查找不到返回undefined

* 实用程度：<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" />

* **适用场景：** 从数组中找元素

* 语法`arr.find(callback[, thisArg])`
  
  * `callback`在数组每一项上执行的函数，接收 3 个参数
    * `element` 当前遍历到的元素
    * `index` 当前遍历到的元素下标/索引
    * `array` 数组本身
  
  * `thisArg` 执行回调用做`this`的对象

```vue
<template>
	<!-- element-ui的选择器组件 -->
	<el-select v-model="value" placeholder="请选择" @change="handleChange">
    <el-option
      v-for="item of hospitalList"
      :key="item.id"
      :label="item.hospitalName"
      :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import { Select, Option } from 'element-ui';
export default {
  components: {
    ElSelect: Select,
    ElOption: Option,
  }
  data() {
    return {
      value: undefined,
      hospitalList: [
        {
          id: 203,
          hospitalName: '洛阳市中心医院',
          organCode: '661',
          provinceCode: '108'
          cityCode: '407'
          areaCode: '362'
        },
        {
          id: 211,
          hospitalName: '北京和协医院',
          organCode: '602',
          provinceCode: '101'
          cityCode: '236'
          areaCode: '675'
        },
      ],
      form: {
        id: undefined,
        hospitalName: undefined,
        organCode: undefined,
      }
    };
  },
  methods: {
    handleChange(value) {
      // 组件v-model绑定的只是Option的:value,也就是说我们只能拿到医院信息的ID，假设后端需要的数据是“医院ID，医院名，机构Code”，此时最适合find来处理
      
      // try/catch会在之后讲解
      // 配合解构赋值
      try {
        const {id, hospitalName, organCode} = this.hospitalList.find(item => item.id === value);
        this.form.id = id, this.form.hospitalName = hospitalName, this.organCode = organCode;
        // 这个场景非常适合使用find方法，基本一行代码可以搞定。如果不使用find也许你会字符串拼接到value，再截取，也许会用forEach/for循环便利查找等各种其他操作，但都没有find更方便
        // 这里用了try/catch当这里代码执行出错了，会被catch掉 不会阻塞代码运行
      } catch(err) {
        throw err;
      }
    }
  }
}
</script>
```

### .findIndex

* ES6 新增API

* 从数组中查找第一个符合匹配条件的元素的索引；查找不到返回 -1

* 实用程度：<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" />

* **适用场景：** 从数组中找元素索引（更多场景项目中实际发掘吧）

* **与 `find`API相比：`find`返回的是符合条件的元素，`findIndex`返回的是符合条件元素的索引**

* 语法`arr.findIndex(callback[, thisArg])`

  * `callback`在数组每一项上执行的函数，接收 3 个参数
    * `element` 当前遍历到的元素
    * `index` 当前遍历到的元素下标/索引
    * `array` 数组本身

  * `thisArg` 执行回调用做`this`的对象

```js
const hospitalList = [
  {
    id: 203,
    hospitalName: '洛阳市中心医院',
    organCode: '661',
    provinceCode: '108'
    cityCode: '407'
    areaCode: '362'
  },
  {
    id: 211,
    hospitalName: '北京和协医院',
    organCode: '602',
    provinceCode: '101'
    cityCode: '236'
    areaCode: '675'
  },
];
const idIndex = hospitalList.findIndex(item => item.id === 201); // -1
const organCodeIndex = hospitalList.findIndex(item => item.organCode === '601'); // 1
```

### .includes

* ES7 新增API

* 检测数组是否包含指定的元素，返回true/false

* 实用程度：<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" />

* **适用场景：** 订单列表符合条件的订单状态才显示操作按钮

* 语法`arr.includes(valueToFind[, fromIndex])`

  * `valueToFind`要查找的元素值

    > `includes` 对大小写敏感

  * `fromIndex` 从指定索引处开始查找；默认为0；若为负值，则取绝对值从后往前（从右往左）开始查找

```js
['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].includes('d'); // true
['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].includes('d', 2); // true 从索引为2开始查找
['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].includes('d', 3); // false 从索引为3开始查找，查找不到false
['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].includes('d', -3); // true 从右往左倒数索引为-3开始查找（从‘h’开始往左查）
['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].includes('d', 50); // false 从索引50开始查找，数组长度不够，根本找不到 false
```

```vue
<template>
	<!-- element-ui的选择器组件 -->
	<div class="container">
    <div class="order" v-for="item of orderList" :key="item.id">
      <!-- 在这里 -->
      <button v-if="[3,6,8].includes(item.status)">
        分配
  		</button>
  	</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: [
        {
          id: 101909286936,
          status: 5,
        },
        {
          id: 101909286976,
          status: 6,
        },
        {
          id: 101939286936,
          status: 3,
        },
        {
          id: 101909286536,
          status: 7,
        },
      ],
    };
  }
}
</script>
```

### .flat

* ES10 正式新增
* 将多维数组进行展开成一维数组
* 语法`const newArray = arr.flat([depth])`
  * `depth`要拉平的数组深度;默认为1

```js
const list = [{name: '李白'}, [{name: '李白'}, {name: '杜甫'}, [str => str, ['唐', '宋', '元', '明', '清']]]];
list.flat(); // [{name: '李白'}, {name: '李白'}, {name: '杜甫'}, [str => str, ['唐', '宋', '元', '明', '清']]];
list.flat(2); // [{name: '李白'}, {name: '李白'}, {name: '杜甫'}, str => str, ['唐', '宋', '元', '明', '清']];

// 如果超过数组本身的深度，那就能拉几层拉几层
list.flat(10); // [{name: '李白'}, {name: '李白'}, {name: '杜甫'}, str => str, '唐', '宋', '元', '明', '清'];

// 如果是负数，就返回数组本身
list.flat(-2); // [{name: '李白'}, [{name: '李白'}, {name: '杜甫'}, [str => str, ['唐', '宋', '元', '明', '清']]]];
```

### .sort

* 对数组进行排序（官方表述：`sort()` 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的）

* 会修改原数组

* 语法：`arr.sort([compareFunction])`

  * `compareFunction` 可选。用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
    * `firstEl` 第一个用于比较的元素
    * `secondEl` 第二个用于比较的元素

  * 返回值： 排序后的数组。请注意，数组已原地排序，并且不进行复制。

> 如果没有指明 `compareFunction` ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 `compareFunction`），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。
>
> 如果指明了 `compareFunction` ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：
>
> - 如果 `compareFunction(a, b)` 小于 0 ，那么 a 会被排列到 b 之前；
>
> - 如果 `compareFunction(a, b)` 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
>
> - 如果 `compareFunction(a, b)` 大于 0 ， b 会被排列到 a 之前。
> - `compareFunction(a, b)` 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

```js
const hiStory = ['秦','a','1','汉','b',2,'隋','c','3','唐','d',4,'宋',5,'e','元', '6','f','明','g','7',8,'h','清'];
hiStory.sort(); // ["1", 2, "3", 4, 5, "6", "7", 8, "a", "b", "c", "d", "e", "f", "g", "h", "元", "唐", "宋", "明", "汉", "清", "秦", "隋"]
```

```js
const orderList = [
  {createTime: 1572944297747, id: 1},
  {createTime: 1572944290747, id: 2},
  {createTime: 1572944390747, id: 3},
  {createTime: 1572944290747, id: 4},
  {createTime: 1572944290147, id: 5},
  {createTime: 1575944290747, id: 6},
  {createTime: 1572943290747, id: 7},
]
orderList.sort((first,second) => first.createTime - second.createTime) // 正序
orderList.sort((first,second) => second.createTime - first.createTime) // 倒序
// 正序
orderList.sort((first,second) => {
  if(first.createTime < second.createTime) {
     return -1; // a小于b，a排在b之前 返回负数 a排b之前
  }
  if(first.createTime > second.createTime) {
     return 1; // a大于b，b应该排在a之前 返回正数 b在a之前
  }
  return 0; // 相等，位置不变 返回0
})
// 倒序
// ............不写了
```

### .concat

* 将多个数组合并为一个
* 此API是对数组的深拷贝
* 语法`const new_array = old_array.concat(value1[, value2[, ...[, valueN]]])`
  * `valueN` 将数组和/或值连接成新数组。如果省略了valueN参数参数，则concat会返回一个它所调用的已存在的数组的浅拷贝

```js
const list1 = [{name: '李白'}],list2 = ['陶潜'],other = '窝窝头', school = () => '豫章书院';
const newList = list1.concat(list2,other,school); // [{name: '李白'}, '陶潜', '窝窝头', () => '豫章书院'];
```

### .filter

* 数组的过滤器；返回符合条件的所有元素

* 实用程度：<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" />

* **适用场景：** 条件查询

* 语法`const newArray = arr.filter(callback(element[, index[, array]])[, thisArg])`

  * `callback` 用来测试数组的每个元素的函数
    * `element` 数组中当前正在处理的元素。
    * `index` 可选。正在处理的元素在数组中的索引。
    * `array` 可选。调用了 `filter` 的数组本身。

  * `thisArg` 执行 `callback` 时，用于 `this` 的值。

```js
const orderList = [
  {id: 102, content: '数组1', status: 3},
  {id: 103, content: '数组2', status: 4},
  {id: 104, content: '数组3', status: 3},
  {id: 105, content: '数组4', status: 6},
  {id: 106, content: '数组5', status: 2},
  {id: 107, content: '数组6', status: 4},
  {id: 108, content: '数组7', status: 7},
  {id: 109, content: '数组8', status: 3},
  {id: 110, content: '数组9', status: 8},
  {id: 111, content: '数组10', status: 6},
]
const newList = orderList.filter(element => element.status === 3 || element.status === 6); // 查询订单状态是3或者是6的订单

// 输出结果自行CV大法到浏览器终端查看吧
```

### .map和.forEach

* `map()`和`forEach()`都是ES5就具有的方法
* `map()`和`forEach()`都可以实现对数组的遍历
* `map()`会对数组进行深拷贝（官方描述：`map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果），`forEach()`对数组的每一个元素执行一次提供的函数，会修改原数组，无返回值

* 实用程度：<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" />

* 语法：

  * `const new_array = arr.map(callback(currentValue[, index[, array]])[, thisArg])`

  * `const new_array = arr.forEach(callback(currentValue[, index[, array]])[, thisArg])`

    * `callback` 针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
      * `element` 数组中当前正在处理的元素。
      * `index` 可选。正在处理的元素在数组中的索引。
      * `array` 可选。调用了 此API 的数组本身。

    * `thisArg` 执行 `callback` 时，用于 `this` 的值。

  > `map`和`forEach`语法一样，没有写错

```js
const orderList = [{"contact":"李贺","price":4,"orderStatus":4,"logisticsState":260},{"contact":"袁天罡","price":23.7,"orderStatus":5,"logisticsState":220},{"contact":"袁天罡","price":219.5,"orderStatus":4,"logisticsState":220},{"contact":"苏轼","price":59,"orderStatus":4,"logisticsState":220},{"contact":"秦始皇","price":175.6,"orderStatus":2,"logisticsState":110},{"contact":"孟浩然","price":127.62,"orderStatus":3,"logisticsState":260},{"contact":"苏轼","price":108,"orderStatus":2,"logisticsState":250},{"contact":"李商隐","price":230.8,"orderStatus":4,"logisticsState":220},{"contact":"孟浩然","price":111.3,"orderStatus":4,"logisticsState":110},{"contact":"秦始皇","price":34.8,"orderStatus":3,"logisticsState":260}];

// orderStatus 1 未付款 2 待发货 3 运输中 4 已收货 5 已评价
// logisticsState 110 已接单 220 运输中 140 已揽收 260 配送中 250 已签收
const newOrderList = orderList.orderList(item => {
  item.priceDesc = `${item.price}元`;
  if(item.orderStatus === 1) {
    item.orderStatusDesc = '未付款';
  } else if(item.orderStatus === 2) {
    item.orderStatusDesc = '待发货';
  } else if(item.orderStatus === 3) {
    item.orderStatusDesc = '运输中';
  } else if(item.orderStatus === 4) {
    item.orderStatusDesc = '已收货';
  } else {
    item.orderStatusDesc = '已评价';
  }
  if(item.logisticsState === 110) {
    item.logisticsStateDesc = '已接单';
  } else if(item.logisticsState === 220) {
    item.logisticsStateDesc = '运输中';
  } else if(item.logisticsState === 140) {
    item.logisticsStateDesc = '已揽收';
  } else if(item.logisticsState === 260) {
    item.logisticsStateDesc = '配送中';
  } else {
    item.logisticsStateDesc = '已签收';
  }
  return item;
});

console.log(newOrderList,orderList); // 自行运行看打印结果，不粘结果了；  newOrderList是修改过后的新数组 orderList是原始数组，内容没有改变

orderList.forEach(item => {
  item.priceDesc = `${item.price}元`;
  if(item.orderStatus === 1) {
    item.orderStatusDesc = '未付款';
  } else if(item.orderStatus === 2) {
    item.orderStatusDesc = '待发货';
  } else if(item.orderStatus === 3) {
    item.orderStatusDesc = '运输中';
  } else if(item.orderStatus === 4) {
    item.orderStatusDesc = '已收货';
  } else {
    item.orderStatusDesc = '已评价';
  }
  if(item.logisticsState === 110) {
    item.logisticsStateDesc = '已接单';
  } else if(item.logisticsState === 220) {
    item.logisticsStateDesc = '运输中';
  } else if(item.logisticsState === 140) {
    item.logisticsStateDesc = '已揽收';
  } else if(item.logisticsState === 260) {
    item.logisticsStateDesc = '配送中';
  } else {
    item.logisticsStateDesc = '已签收';
  }
});
console.log(orderList); // 我们同样得到了我们想要的结果，但原始数组已经被改变了
var orderList = Mock.mock({
  'orderList|10-15': [
      {
        'contact|1': ['李白', '杜甫', '李商隐','陶渊明','李贺','孟浩然','苏轼','怀素','袁天罡','李淳风','秦始皇','李煜'],
		'price|1-230.0-2': 1,
		'orderStatus|1-5': 1,
     'logisticsState|1': [110,220,140,260,250],
      }
  ]
})
```

> 这段代码里的将状态码翻译成文字写的非常非常烂，之后我们会使用`Map`对象结合`扩展运算符`进行优化。

### .indexOf和.findIndex

* `indexOf`是ES5的API，`findIndex`是ES6的API

* `indexOf`和`findIndex` 都是从数组中找元素索引

* `indexOf` 在数组中查找**给定元素（值）**的第一个索引，并返回，找不到返回 -1；`findIndex` 在数组中查找**满足条件（函数）**的第一个元素索引，并返回。否则返回 -1；

* 实用程度：<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" />

* 语法：

  * `arr.indexOf(searchElement[, fromIndex])`
    * `searchElement` 要查找的元素
    * `fromIndex` 可选 开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-3表示从倒数第三个元素开始查找（从左往右）， 如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

  * `const index = arr.findIndex(callback(currentValue[, index[, array]])[, thisArg])`
    * `callback` 用来测试数组的每个元素的函数
      * `currentValue` 当前元素
      * `index` 当前元素的索引
      * `array` 执行`findIndex` API的数组本身

```js
['a','s','d','f','g','h'].indexOf('h',-2); // 5 从倒数第二个元素处往右开始查找
['a','s','d','f','g','h'].indexOf('f',-2); // -5 从倒数第二个元素处往右开始查找，找不到

const orderList = [{"contact":"李贺","price":4,"orderStatus":4,"logisticsState":260},{"contact":"袁天罡","price":23.7,"orderStatus":5,"logisticsState":220},{"contact":"袁天罡","price":219.5,"orderStatus":4,"logisticsState":220},{"contact":"苏轼","price":59,"orderStatus":4,"logisticsState":220},{"contact":"秦始皇","price":175.6,"orderStatus":2,"logisticsState":110},{"contact":"孟浩然","price":127.62,"orderStatus":3,"logisticsState":260},{"contact":"苏轼","price":108,"orderStatus":2,"logisticsState":250},{"contact":"李商隐","price":230.8,"orderStatus":4,"logisticsState":220},{"contact":"孟浩然","price":111.3,"orderStatus":4,"logisticsState":110},{"contact":"秦始皇","price":34.8,"orderStatus":3,"logisticsState":260}];
orderList.orderList.findIndex(item => item.orderStatus === 2); // 4
```

### .lastIndexOf

* 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找(从右向左)，从 `fromIndex` 处开始。
* 语法：`arr.lastIndexOf(searchElement[, fromIndex])`
  * `searchElement` 要查找的元素
  * `fromIndex` 可选 从此位置开始逆向查找。默认为数组的长度减 1(`arr.length - 1`)，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

> `lastIndexOf`和`indexOf`API是两个作用相同结果相反的API；相同点都是从数组中查找给定元素的索引，不同点是`indexOf`是从左往右查，`lastIndexOf`是从右往左查，`indexOf` 是查找元素在数组的第一个索引（同一元素，在数组中有多处，返回第一处索引），`lastIndexOf` 是查找元素在数组的最后一个索引（同一元素，在数组中有多处，返回最后一处索引）
>
> 代码和`indexOf` API相反，就不写了

### .join

* 这个API在js的第一个版本就有
* `join` 根据指定分隔符（默认分隔符为英文逗号）将数组所有元素拼成字符串返回。如果数组只有一个项目，那么将返回该项目而不使用分隔符

* 实用程度：<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" /><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyOTIzOTIzNTg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxNC4wODE2OSA5MTAuMzM2bC02LjE0NCA2Mi45NzYgMzIyLjU2LTE3OC4xNzYtNDcuNjE2LTQyLjQ5NnpNNzU1Ljc3NzY5IDYzNS45MDRsMjQ1LjI0OC0yMzkuMTA0LTMzOC45NDQtNDkuMTUyLTE1MS4wNC0zMDcuMi0zOC40IDc3LjgyNCAxMTUuMiAyMzQuNDk2TDkyNi43ODU2OSA0MDEuOTJsLTI0NS4yNDggMjM5LjEwNCA0OS42NjQgMjg4Ljc2OCA4Mi40MzIgNDMuNTJ6IiBmaWxsPSIjZjRlYTJhIiBwLWlkPSIyNTEyIj48L3BhdGg+PHBhdGggZD0iTTkyNi43ODU2OSA0MDEuOTJsLTMzOC45NDQtNDkuMTUyLTExNS4yLTIzNC40OTYtMTEzLjE1MiAyMjkuMzc2TDIwLjU0NTY5IDM5Ni44bDI0NS4yNDggMjM5LjEwNC01MS43MTIgMjc0LjQzMkw0NjIuNDAxNjkgNzczLjEybDYyLjk3NiAzMi4yNTYtMTQuMzM2LTE2Ljg5NiAyMjAuMTYgMTQxLjMxMi00OS42NjQtMjg4Ljc2OHoiIGZpbGw9IiNmNGVhMmEiIHAtaWQ9IjI1MTMiPjwvcGF0aD48cGF0aCBkPSJNODEzLjYzMzY5IDk5MS4yMzJjLTMuMDcyIDAtNi42NTYtMS4wMjQtOS43MjgtMi41Nkw1MTEuMDQxNjkgODM0LjU2bC0yOTMuMzc2IDE1NC4xMTJjLTYuNjU2IDMuNTg0LTE1LjM2IDMuMDcyLTIxLjUwNC0xLjUzNi02LjE0NC00LjYwOC05LjIxNi0xMi4yODgtOC4xOTItMTkuOTY4bDU1LjgwOC0zMjYuNjU2TDYuMjA5NjkgNDA5LjZjLTUuNjMyLTUuNjMyLTcuNjgtMTMuODI0LTUuMTItMjAuOTkyIDIuNTYtNy4xNjggOC43MDQtMTIuOCAxNi4zODQtMTMuODI0bDMyOC4xOTItNDcuNjE2IDE0Ni45NDQtMjk3LjQ3MmMzLjU4NC03LjE2OCAxMC43NTItMTEuMjY0IDE4LjQzMi0xMS4yNjRzMTQuODQ4IDQuNjA4IDE4LjQzMiAxMS4yNjRsMTQ2LjQzMiAyOTYuOTYgMzI4LjE5MiA0Ny42MTZjNy42OCAxLjAyNCAxNC4zMzYgNi42NTYgMTYuMzg0IDEzLjgyNCAyLjU2IDcuMTY4IDAuNTEyIDE1LjM2LTUuMTIgMjAuOTkyTDc3Ny43OTM2OSA2NDBsNTUuODA4IDMyNi42NTZjMS41MzYgNy42OC0yLjA0OCAxNS4zNi04LjE5MiAxOS45NjgtMy4wNzIgMy4wNzItNy42OCA0LjYwOC0xMS43NzYgNC42MDh6TTY0LjU3NzY5IDQwOS4wODhsMjE1LjU1MiAyMDkuNDA4YzQuNjA4IDQuNjA4IDcuMTY4IDExLjI2NCA2LjE0NCAxNy45MmwtNTAuNjg4IDI5Ni40NDggMjY2LjI0LTEzOS43NzZjNi4xNDQtMy4wNzIgMTMuMzEyLTMuMDcyIDE4Ljk0NCAwbDI2NS43MjggMTM5Ljc3Ni01MC42ODgtMjk2LjQ0OGMtMS4wMjQtNi42NTYgMS4wMjQtMTMuMzEyIDYuMTQ0LTE3LjkyTDk1Ny41MDU2OSA0MDkuMDg4bC0yOTcuOTg0LTQzLjAwOGMtNi42NTYtMS4wMjQtMTIuMjg4LTUuMTItMTUuMzYtMTEuMjY0bC0xMzIuNjA4LTI2OS44MjQtMTMzLjEyIDI2OS44MjRjLTMuMDcyIDYuMTQ0LTguNzA0IDEwLjI0LTE1LjM2IDExLjI2NEw2NC41Nzc2OSA0MDkuMDg4eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjcuOTA1NjkgNDQ2Ljk3NmMtNy42OCAwLTE0LjMzNi01LjYzMi0xNS4zNi0xMy4zMTItMS4wMjQtOC4xOTIgNC42MDgtMTYuMzg0IDEzLjMxMi0xNy40MDhsMTY2LjQtMjMuMDRjOC4xOTItMS4wMjQgMTYuMzg0IDQuNjA4IDE3LjQwOCAxMy4zMTIgMS4wMjQgOC4xOTItNC42MDggMTYuMzg0LTEzLjMxMiAxNy40MDhsLTE2Ni40IDIzLjA0Yy0wLjUxMi0wLjUxMi0xLjUzNiAwLTIuMDQ4IDB6TTE3Ni43MDU2OSA0NTAuNTZoLTEuMDI0Yy04LjcwNCAwLTE1LjM2LTYuNjU2LTE1LjM2LTE1LjM2czYuNjU2LTE1LjM2IDE1LjM2LTE1LjM2aDEuMDI0YzguNzA0IDAgMTUuMzYgNi42NTYgMTUuMzYgMTUuMzZzLTYuNjU2IDE1LjM2LTE1LjM2IDE1LjM2eiIgZmlsbD0iI2Y0ZWEyYSIgcC1pZD0iMjUxNSI+PC9wYXRoPjwvc3ZnPg==" />
* 语法：`arr.join([separator])`
  * `separator` 可选 指定一个字符串来分隔数组的每个元素，默认为英文逗号

```js
['a','f','d','f','g','h'].join('<-->'); // "a<-->f<-->d<-->f<-->g<-->h"

const orderList = [{"contact":"李贺","price":4,"orderStatus":4,"logisticsState":260},{"contact":"袁天罡","price":23.7,"orderStatus":5,"logisticsState":220},{"contact":"袁天罡","price":219.5,"orderStatus":4,"logisticsState":220},{"contact":"苏轼","price":59,"orderStatus":4,"logisticsState":220},{"contact":"秦始皇","price":175.6,"orderStatus":2,"logisticsState":110},{"contact":"孟浩然","price":127.62,"orderStatus":3,"logisticsState":260},{"contact":"苏轼","price":108,"orderStatus":2,"logisticsState":250},{"contact":"李商隐","price":230.8,"orderStatus":4,"logisticsState":220},{"contact":"孟浩然","price":111.3,"orderStatus":4,"logisticsState":110},{"contact":"秦始皇","price":34.8,"orderStatus":3,"logisticsState":260}];
orderList.orderList.join('<----->'); // "[object Object]<----->[object Object]<----->[object Object]<----->[object Object]<----->[object Object]<----->[object Object]<----->[object Object]<----->[object Object]<----->[object Object]<----->[object Object]" 如果是array<Object> 转字符串不会把对象成字符串后再拼接
```

### .reduce和.reduceRight

* `reduce` 和 `reduceRight` 都是ES5就有的方法

* 都是累加器；`reduce` 从左往右执行，`reduceRight` 从右往左执行

* **适用场景** 还记得讲模版字符串中可以使用变量的那个例子吗

* 语法：

  * `arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

  * `arr.reduceRight(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

    * `callback` 一个回调函数，用来操作数组中的每个元素，可接受四个参数
      * `accumulator` 上一次调用回调的返回值，或提供的 `initialValue`。如果没有提供`initialValue` , 第一次函数执行时`accumulator`就是数组的第0个元素，`currentValue`是数组的第一个元素
      * `currentValue` 当前被处理的元素
      * `index` 可选 数组中当前被处理的元素的索引
      * `array` 可选 调用 `reducet()` 的数组

    * `initialValue` 可选 值用作回调的第一次调用的累加器。如果未提供初始值，则将使用并跳过数组中的最后一个元素。在没有初始值的空数组上调用reduce或reduceRight就会创建一个TypeError。

```js
// 模版字符串中使用变量的例子是这么写的
const prace = {title: '渡荆门送别', autor: '李白', content: ['渡远荆门外，来从楚国游。', '山随平野尽，江入大荒流。', '月下飞天镜，云生结海楼。', '仍怜故乡水，万里送行舟。']}

const render = function (accumulator, currentValue, index) {
  return index === 1 ? '<p>' + accumulator + '</p>' + '<p>' + currentValue + '</p>' : accumulator + '<p>' + currentValue + '</p>';
}

const nodes = '<article><h3>' + prace.title + '</h3><address>' + prace.autor + '</address>' + prace.content.reduce(render) + '</article>';

// 可以看到上面例子由于我们没有提供 initialValue ，所以我们返回的时候做了判断
// 现在我们对上面例子做个简化和优化
['渡远荆门外，来从楚国游。', '山随平野尽，江入大荒流。', '月下飞天镜，云生结海楼。', '仍怜故乡水，万里送行舟。'].reduce((count,item) => {
	return count + `<span>${item}</span>`
}, '')
// 输出 <span>渡远荆门外，来从楚国游。</span><span>山随平野尽，江入大荒流。</span><span>月下飞天镜，云生结海楼。</span><span>仍怜故乡水，万里送行舟。</span>
// 我们提供了初始累计是空字符串，然后就可以省略掉判断了

// 使用reduceRight
['渡远荆门外，来从楚国游。', '山随平野尽，江入大荒流。', '月下飞天镜，云生结海楼。', '仍怜故乡水，万里送行舟。'].reduceRight((count,item) => {
	return count + `<span>${item}</span>`
},'')
// 输出 <span>仍怜故乡水，万里送行舟。</span><span>月下飞天镜，云生结海楼。</span><span>山随平野尽，江入大荒流。</span><span>渡远荆门外，来从楚国游。</span>
```

### .shift和.pop

* `shift` 和`pop` 都是用来从数组中删除元素

* `shift` 和`pop` 都会改变原数组

* `shift`删除数组的第一个元素，并返回该元素的值；`pop`删除数组的最后一个元素，并返回该元素的值

* 语法 

  * `arr.shift()`

  * `arr.pop()`
    * 当数组为空时返回undefined

> 这两个API很简单，也是较为常用的API，代码省略

### .unshift和.push

* `unshift`和`push`都是用来向数组添加元素的
* `unshift`和`push`都会返回数组的新长度
* `unshift`和`push`都会改变原数组
* `unshift`向数组的开头添加元素，`push`向数组的结尾添加元素
* 语法
  * `arr.unshift(element1, ..., elementN)`
  * `arr.push(element1, ..., elementN)`
    * `elementN` 被添加到数组开头或结尾的元素

```js
const list = [];
let length = list.unshift({name: '李白'}, str =>str, ['柴志阳']);
console.log(length,list) // 3 [{name: '李白'},str =>str, ['柴志阳']]

// push
length = list.push('a', 's', 909);
console.log(length,list) // 6 [{name: '李白'},str =>str, ['柴志阳'],'a', 's', 909]
```

> 这两个API也很简单，也很好理解，可以多用用，多感受下

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

