---
title: 从零搭建Koa项目
description: 
lang: zh-CN
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

官方文档： [https://github.com/ZijianHe/koa-router](https://github.com/ZijianHe/koa-router)

## 使用 koa-body 解析请求参数

官方文档：[https://github.com/dlau/koa-body](https://github.com/dlau/koa-body)

文件上传的时候需要配置允许上传的文件大小

```js
app.use(koaBody({
  multipart: true,
  formidable:{
    keepExtensions: true,    // 保持文件的后缀
    maxFileSize: 500*1024*1024, // 文件上传大小5mb
  }
}));
```

## 使用 koa-logger 查看请求日志

官方文档：[https://github.com/koajs/logger](https://github.com/koajs/logger#readme)

## 手动实现一个 CORS 跨域中间件

Koa 的中间件本质就是一个函数，当使用 `app.use()` 去加载这个函数的时候，Koa 会给这个函数传递两个参数 `ctx` 和 `next` ，中间件逻辑处理完成后调用 `next()` 即可。

因为 CORS 是我们给客户端返回的时候添加的内容，所以我们可以先执行 `next()` 再进行逻辑处理

```js
const cors = (ctx, next) => {
  next()
  //指定服务器端允许进行跨域资源访问的来源域。可以用通配符*表示允许任何域的JavaScript访问资源，但是在响应一个携带身份信息(Credential)的HTTP请求时，必需指定具体的域，不能用通配符
  ctx.set("Access-Control-Allow-Origin", "*");
 
  //指定服务器允许进行跨域资源访问的请求方法列表，一般用在响应预检请求上
  ctx.set("Access-Control-Allow-Methods", "OPTIONS,POST,GET,HEAD,DELETE,PUT");
  
  //必需。指定服务器允许进行跨域资源访问的请求头列表，一般用在响应预检请求上 因为客户端请求接口的时候需要在header中携带token，所以也需要设置为允许
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type, token");
  
  //告诉客户端返回数据的MIME的类型，这只是一个标识信息,并不是真正的数据文件的一部分
  ctx.set("Content-Type", "application/json;charset=utf-8");
  
  //可选，单位为秒，指定浏览器在本次预检请求的有效期内，无需再发送预检请求进行协商，直接用本次协商结果即可。当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  ctx.set("Access-Control-Max-Age", 300);

  //可选。它的值是一个布尔值，表示是否允许客户端跨域请求时携带身份信息(Cookie或者HTTP认证信息)。默认情况下，Cookie不包括在CORS请求之中。当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";如果没有设置这个值，浏览器会忽略此次响应。
  ctx.set("Access-Control-Allow-Credentials", true);

  //可选。跨域请求时，客户端xhr对象的getResponseHeader()方法只能拿到6个基本字段，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。要获取其他字段时，使用Access-Control-Expose-Headers，xhr.getResponseHeader('myData')可以返回我们所需的值
  ctx.set("Access-Control-Expose-Headers", "myData");
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204
  }
}
```

中间件写完了，然后使用 `app.use` 挂载即可

```js
app.use(cors);
```

