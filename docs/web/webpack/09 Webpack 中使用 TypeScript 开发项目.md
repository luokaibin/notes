---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
  - webpack
title: 09 Webpack 中使用 TypeScript 开发项目
comments: 
description: 上天赋予的生命，就是要为人类的繁荣和平和幸福而奉献。&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——松下幸之助TypeScript 是微软公司提出来的一个 JavaScript 的超集语言，主要作用是为 JavaScript 增加静态类型检测系统和 ECMAScript 语法的扩展。TypeScript 代码可以编译为普通 JavaScript 代码在浏览器或者 Node.js 环境执行。本小节主要讨论在 Webpack 中集成 TypeScript 开发环境，不再做 TypeScript 的优劣比较和语法讲解，日常项目不涉及到 TypeScript 开发，则可以直接跳过本小节内容。
lang: zh-CN
---

![](https://img4.mukewang.com/5cd9634e0001c59e06400359.jpg)

> 上天赋予的生命，就是要为人类的繁荣和平和幸福而奉献。
>
> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——松下幸之助

[TypeScript](https://www.typescriptlang.org/) 是微软公司提出来的一个 JavaScript 的超集语言，主要作用是为 JavaScript 增加静态类型检测系统和 ECMAScript 语法的扩展。TypeScript 代码可以编译为普通 JavaScript 代码在浏览器或者 Node.js 环境执行。本小节主要讨论在 Webpack 中集成 TypeScript 开发环境，不再做 TypeScript 的优劣比较和语法讲解，日常项目不涉及到 TypeScript 开发，则可以直接跳过本小节内容。

## TypeScript 编译器和 tsconfig.json
TypeScript 代码不能直接在浏览器执行，所以需要编译器将 TypeScript 文件转换成可以在浏览器执行的 JavaScript。NPM 安装编译器方法：

```shell
npm i -g typescript
```

这时候我们新建一个 ts 文件（TypeScript 文件扩展名是ts）：

```typescript
// hello.ts
function sayHello(name: string) {
    return 'Hello, ' + name;
}

let webpack = 'Webpack';

console.log(sayHello(webpack));
```

然后使用 tsc hello.tc，执行编译后hello.ts被编译成了hello.js：

```javascript
function sayHello(name) {
    return 'Hello, ' + name;
}
var webpack = 'Webpack';
console.log(sayHello(webpack));
```

为了方便编译器和编辑器识别 TypeScript 项目，TypeScript 约定了tsconfig.json文件来存储项目配置，如果运行 tsc 时不指定输入文件，编译器则会查找项目目录中的这个文件，如果找不到则会依次向父级目录查找。比如这样：

```json
{
    "compilerOptions": {
        "outFile": "dist/main.js",
        "sourceMap": true
    },
    "files": ["src/index.ts", "src/source.ts"]
}
```

关于tsconfig.json更多配置，可以继续浏览[官方文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)。

## Webpack 集成 TypeScript
如果要让 Webpack 来识别ts文件，需要配合 TypeScript 的 loader，使用ts-loader可以方便地构建浏览器可以运行的 JS 代码。

安装ts-loader的命令为：`npm i ts-loader --save-dev`

然后配置项目目录中的 webpack.config.js:

```javascript
module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'app.js',
        path: './dist'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [{test: /\.ts$/, loader: 'ts-loader'}]
    }
};
```
为了方便配置 TypeScript 项目，还可以在 Webpack 的项目根目录创建一个tsconfig.json文件。

## 小结
本小节主要介绍 TypeScript 的简单概念和tsconfig.json，最后通过配置webpack.config.js来让 webpack 集成 TypeScript 编译功能。
