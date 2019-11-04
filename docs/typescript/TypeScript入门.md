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

