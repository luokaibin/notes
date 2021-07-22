---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
  - typescript
title: TypeScript入门
comments: 
description: TypeScript入门基本类型声明关于null和undefinedunll和undefined是string|number|boolean的子类型Any 任意类型声明一个any类型的变量,此变量可以被任意赋值变量在声明的时候没有指定类型,此时就默认为any类型类型推论当给一个变量赋值初始化时,如果没有指定类型,会根据初始值倒推类型
---
# TypeScript入门

## 基本类型声明

```ts
let str:string = '1'; // 声明字符串
let num:number = 1; // 声明number
let bol:boolean = true; // 声明number
```

* 关于null和undefined

```ts
// 声明变量类型为null 
// 给一个变量声明类型为null之后,那么此变量的值只可以为null,给与其他任何类型的值都会报编译错误
let nul:null = null; 
nul = 1 // 报编译错误
```

```tsx
// 声明变量类型为undefined
// 给一个变量声明类型为undefined之后,那么此变量的值只可以为undefined,给与其他任何类型的值都会报编译错误
let un:undefined = undefined;
un = null; // 哪怕给它赋值为null,同样会报编译错误
```

**unll和undefined**是string|number|boolean的**子类型**

```tsx
// 也就是说可以给已经声明了string|number|boolean类型的变量赋值为undefined和null,而不会报错

str = null;
num = undefined;
bol = null;
```

## Any 任意类型

声明一个any类型的变量,此变量可以被任意赋值

```tsx
let a:any;
a = 1;
a = true;
a = 'a';
```

变量在声明的时候没有指定类型,此时就默认为any类型

```tsx
let a;
a = 1;
a = true;
a = 'a';
```

## 类型推论

当给一个变量赋值初始化时,如果没有指定类型,会根据初始值倒推类型

```tsx
let b = '1';
b = 2; // 编译错误 b初始化的值为string,虽没有显式指定类型,但类型推导为string

/****************************** 注意 ****************************/
let c = 1; // 初始化赋值 推导number
let d; // 声明 已初始化 未赋值 any
```

## 联合类型

* 可以取多种类型中的一种

```tsx
let muchtype:string|number = '1';
muchtype = 2;
muchtype = true; // 编译错误 只能是string或number
```

* 只能访问联合类型里所有类型共有的属性或方法

```tsx
console.log(muchtype.toString());
console.log(muchtype.length); // number不具有length属性
```

## 对象属性

```tsx
// 用接口描述对象
interface IState {
    name: string,
}
let obj:IState;
obj={name: '李白', age: 62}; // name正确 age编译错误 没有指定声明age
```

```ts
// 用接口描述对象
interface IState {
    name: string,
    age: number,
}
let obj:IState;
obj={age: 62}; // age正确 name编译错误 指定声明name,对象中却没有name属性
```

```tsx
// 用接口描述对象
interface IState {
    name: string,
    age?: number, // ?表示存疑 此值可有可无
}
let obj:IState;
obj={name: '李白'}; // 正确
```

* 属性个数不确定

```tsx
// 用接口描述对象
interface IState {
    name: string,
    age?: number|string, // ?表示存疑 此值可有可无
    [propName:string]:any // key必须为string  value为any类型
}
let obj:IState;
obj={name: '李白', age: '62岁', gender: '男', friend: ['王伦', '孟浩然']}; // 正确
```

* 只读属性----初始值之后不可再赋值

```tsx
// 用接口描述对象
interface IState {
    readonly name: string, // readonly声明只读属性
    age?: number|string, // ?表示存疑 此值可有可无
}
let obj:IState = {name: '李白', age: '62岁'};
obj.age = 63; // 正确
obj.name = '张广陵' // error 初始值之后不可修改
```

## 数组

* 类型 + 方括号

```tsx
let arr:number [] = [1,2,3]; // number类型的数组
let arrTwo:string [] = ['a', 'b', 'c']; // string类型的数组
let arrThree:any [] = [1, 'a', true]; // 任意类型的数组
```

* 数组泛型 Array<元素类型>

```tsx
let arr:Array<number> = [1,2,3]; // number类型的数组
let arrTwo:Array<string> = ['a', 'b', 'c']; // string类型的数组
let arrThree:Array<any> = [1, 'a', true]; // 任意类型的数组
```

* 接口表示法

```tsx
interface IArr {
    [index:number]: string,
}
let arr:IArr = ['a', 'b', 'c'];
/***************************** 结合对象使用 **************************/
interface IState {
    name: string,
    age: number,
}
interface IArrTwo {
    [index:number]: IState,
}
let arrTwo:IArrTwo = [{name: '李白', age: 64}, {name: '杜甫', age: 63}];
/********************************** OR *******************************/
let arrThree:Array<IState> = [{name: '李白', age: 64}, {name: '杜甫', age: 63}];
let arrFour:IState [] = [{name: '李白', age: 64}, {name: '杜甫', age: 63}];
```

## 函数

```tsx
// 声明 参数 name必须是string age必须是number 返回值必须是number
function fn(name:string, age:number):number {
    return age;
}
const ageNumber:number = fn('李白', 18);
```

* 可选的参数

```tsx
function fn(name:string, age:number, sex?:string):number {
    return age;
}
fn('李白', 18); // sex参数可选
```

* 有默认值的参数

```tsx
function fn(name:string = '李白', age: number = 18):number {
    return age;
}
```

* 表达式类型的函数

```tsx
// 表达式限定类型
const fn: (name:string, age: number) => number = (name:string,age:number):number => {
  return age
}
```

```tsx
// 通过接口限定类型
interface fnType {
  (name:string,age:number):number
}

const fn:fnType = (name:string,age:number):number => {
  return age
}
```

```tsx
// 联合类型 重载

// 输入number 输出number
// 输入string 输出string
function fn(value:string):string; // 限定输入类型 输出类型
function fn(value:number):number;
function fn(value:number|string):number|string {
  return value
}
```

## 类型断言

```js
// 联合类型只能访问共有的属性和方法 number并没有length属性
// (<string>name)就当是将值转成了string
// 括号 尖括号 都不能少
const fn:(name:number|string) => number = (name:number|string):number => {
  return (<string>name).length
}
```

```tsx
// 联合类型只能访问共有的属性和方法 number并没有length属性
// (name as string)就当是将值转成了string
// 括号 as 都不能少
const fn:(name:number|string) => number = (name:number|string):number => {
  return (name as string).length
}
```

> 类型断言并不是类型转换，断言成一个联合类型中不存在的类型是不允许的

## 类型别名（自定义类型）

**类型别名要用`type`关键字**

```tsx
type strType = string;
const str = '1';
```

```tsx
type muchType = string|number|boolean;
let much = '1';
much = 2;
much = true;
```

```tsx
interface muchType {
  name:string,
  str:number,
}
interface muchType2 {
  age:number,
  sex:string,
}
type muchTypeValue = muchType | muchType2;

let obj:muchTypeValue = {name: '李白', str: 18};
obj = {age: 18,sex: '男'};
```

```tsx
// 限定字符串选择
type sexStr = '男'|'女'|'未知';
const getSex:(sex:sexStr) => sexStr = (sex:sexStr) => sex;
getSex('未知')
```

## 枚举

**枚举要使用`enum`关键字定义**

* 枚举（Enum）类型用于取值被限定在一定范围内的场景
* 枚举成员会被赋值为从零开始递增的数字，同时也会对枚举值到枚举名进行反向映射

```tsx
enum Days {sub,mon,tue,web,tuh,fri,stt};
Days[2] === 'tue';
Days[5] === 'fri';
Days.tue === '';
```

