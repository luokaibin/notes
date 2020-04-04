---
title: 从零搭建Koa项目
description: 
lang: zh_CN
---

## 初始化项目

```
npm init
```

## 安装koa

```
npm i koa
```

## 创建入口文件

项目根目录下新建 `main.js` ，在 `main.js` 中写入以下代码

```js
// 导入 koa
const koa = require('koa');
// 对koa实例化
const app = new Koa();
// 设置返回 hello world
app.use(async (ctx, next) => {
  ctx.body = 'hello world';
})
// 监听10086端口
app.listen(10086, () => {console.log('启动完成, http://127.0.0.1:10086')});
```

## 配置 package.json 启动项目

在 package.json 中的 script 字段内添加 start 命令

```json
"scripts": {
  "start": "node main.js"
}
```

控制台运行 `npm start` 启动项目，浏览器打开 `http://127.0.0.1:10086` 可以看到输出 `hello world`

## 将 require 导入改成 import 导入

安装 `babel` ，控制台输入 `npm i @babel/core @babel/node @babel/preset-env`

修改 `start` 启动命令

```json
"scripts": {
  "start": "babel-node main.js"
}
```

在项目根目录下新建 `Babel` 配置文件 `babel.config.js` ，在配置文件内写入以下内容

```js
const presets = [
  [
    "@babel/env"
  ],
];

module.exports = { presets };
```

将 `main.js` 中的 `const koa = require('koa');` 改为 `import Koa from 'koa';`

重新运行 `npm start` 启动项目

## 安装 nodemon 进行热重载

```
npm i nodemon
```

修改 `start` 启动命令

```json
"scripts": {
  "start": "nodemon --exec babel-node main.js"
}
```

重新运行 `npm start` 启动项目; 之后只要进行文件保存就会重启项目

## 使用 Koa-router 进行路由分发

## 使用 koa-body 解析请求参数

## 使用 koa-logger 查看请求日志

