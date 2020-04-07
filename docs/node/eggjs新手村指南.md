---
title: eggjs新手村指南
description: 
lang: zh-CN
---

## 前言

公司最近准备建 node 中间层，可考虑的方案就 **express** **koa** **nest** **egg** ，express 和 koa 都太轻了，给企业用不合适，nest 中文文档太少，开发中如果出现问题，查找相关解决方案并不容易，所以最后可选的也就 **eggJs** 了。eggjs 是阿里出品的企业级 node 框架，奉行 **约定优于配置** ，一切基于约定开发，减少团队沟通成本，另一个比较重要的点是 egg 拥有完善的日志系统，对于 bug 定位等及其方便。本文就记录下采用 eggjs 开发中遇到的一些问题。

## 怎么获取前端传入的参数

根据官方文档，`npm init egg --type=simple` 后，项目内会有个 `app` 文件夹，内容如下：

```js
├── app
│   ├── controller
│   │   └── home.js
│   └── router.js
```

打开 `router.js` 代码如下：

```js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
```

很容猜到，访问 `/` 接口时，去执行 `controller` 文件夹下 `home.js` 文件的 `index` 方法了，并且`/` 接口是个 `GET` 请求。

打开 `home.js` 文件，代码如下：

```js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
```

可以看到 `index` 方法从 `this` 中解构出了一个 `ctx` ，`ctx` 就是这次请求的上下文，给 `ctx.body` 赋值了一个 `hi, egg` ，把项目 `npm run dev` 跑起来，访问 `http://localhost:7001` 可以看到页面显示 `he, egg` ，所以可知 `ctx.body` 即是给客户端返回的信息。那么前端传入的参数肯定也在这个请求上下文上，请求方式我们常用的有 `GET` 和 `POST` ，`GET` 请求的参数我们可以通过 `ctx.query` 获取到，`POST` 请求需要做些其他操作，稍后再讲；同时还有个路径参数，例如 `/1` 取这个 `1` 的路径参数可以使用 `ctx.params` 。

### get请求

**使用API** : **`ctx.query`**

当我们访问 `http://localhost:7001?id=101` ，我们可以把参数在 `Controller` 打印出来

官方文档: [https://eggjs.org/zh-cn/basics/controller.html#query](https://eggjs.org/zh-cn/basics/controller.html#query)

```js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const {query} = ctx;
    console.log(query);
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
```

在控制台我们可以看待输出了一个对象，`id` 是 `123`

```
# 控制台输出
```

### 获取路径参数

**使用API** : **`ctx.params`**

对于路径参数我们需要在定义路由的时候添加上对应的定义

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/:id', controller.home.index);
};
```

然后当我们访问 `http://localhost:7001/123` 的时候，可以通过 `ctx.params` 将入参打印出来。

官方文档: [https://eggjs.org/zh-cn/basics/controller.html#router-params](https://eggjs.org/zh-cn/basics/controller.html#router-params)

```js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const {params} = ctx;
    console.log(params);
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
```

当访问的时候可以在控制台看到输出，不贴图了

## POST 请求报错

使用 `GET` 请求的时候一切正常，但是当我们定义一个 `POST` 请求后，会发现控制台报了个 `CSRF` 的错，错误内容如下：

```
# 控制台错误内容
2020-04-07 17:31:24,844 WARN 10854 [-/::1/-/48ms POST /post] missing csrf token. See https://eggjs.org/zh-cn/core/security.html#安全威胁csrf的防范
2020-04-07 17:31:24,855 WARN 10854 [-/::1/-/55ms POST /post] nodejs.ForbiddenError: missing csrf token
    at Object.throw (/Users/mac/Documents/newWork/node-Middleware/node_modules/koa/lib/context.js:97:11)
    at Object.assertCsrf (/Users/mac/Documents/newWork/node-Middleware/node_modules/egg-security/app/extend/context.js:153:19)
    at csrf (/Users/mac/Documents/newWork/node-Middleware/node_modules/egg-security/lib/middlewares/csrf.js:33:9)
    at dispatch (/Users/mac/Documents/newWork/node-Middleware/node_modules/egg-security/node_modules/koa-compose/index.js:42:32)
    at /Users/mac/Documents/newWork/node-Middleware/node_modules/egg-security/node_modules/koa-compose/index.js:34:12
    at dispatch (/Users/mac/Documents/newWork/node-Middleware/node_modules/koa/node_modules/koa-compose/index.js:42:32)
    at session (/Users/mac/Documents/newWork/node-Middleware/node_modules/koa-session/index.js:41:13)
    at dispatch (/Users/mac/Documents/newWork/node-Middleware/node_modules/koa/node_modules/koa-compose/index.js:42:32)
    at overrideMethod (/Users/mac/Documents/newWork/node-Middleware/node_modules/koa-override/index.js:38:12)
    at dispatch (/Users/mac/Documents/newWork/node-Middleware/node_modules/koa/node_modules/koa-compose/index.js:42:32)
message: "missing csrf token"
pid: 10854
```

这个报错是因为官方内置的 [egg-security](https://github.com/eggjs/egg-security/) 插件默认对所有『非安全』的方法，例如 `POST`，`PUT`，`DELETE` 都进行 CSRF 校验，当我们请求时，服务器会通过 `Cookie` 下发一个 `token` ，要求我们发起请求的时候，将这个 `token` 放置到 query、body 或者 header 中发送给服务端。

但实际开发中我们这个接口并不一定是只给 Web 用，对于非浏览器客户端，`Cookie` 是下发不成功的，另外对于 `token` 更希望由我们自己实现，而不是由框架处理，**所以，我们需要关闭 `egg-security` 的 CSRF 验证** 

项目创建后，项目下会有个 `config` 文件夹，文件夹内文件如下：

```
├── config
│   ├── config.default.js
│   └── plugin.js
```

`config.default.js` 是应用配置文件，`plugin.js` 是插件的配置文件，我们要关闭的 `egg-security` 就需要在 `config.default.js` 中进行，打开 `config.default.js` 文件，内容如下（去掉注释后）：

```js
'use strict';
module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1586250824909_3576';

  config.middleware = [];

  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};

```

可以看到这个文件导出了一个函数，而这个函数返回了一个对象，关闭 `egg-security` 在这个对象中配置配置即可，添加如下内容：

```js
'use strict';
module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1586250824909_3576';

  config.middleware = [];

  const userConfig = {};

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false, // 关闭框架默认得csrf插件
      },
    },
  };
};
```

关闭之后重启项目，即可；

**参考文档：**

官方文档: [为什么会有-csrf-报错](https://eggjs.org/zh-cn/faq.html#为什么会有-csrf-报错)

官方文档: [安全威胁-csrf-的防范](https://eggjs.org/zh-cn/core/security.html#安全威胁-csrf-的防范)

## 怎么获取 POST 请求的参数

**使用API** : **`ctx.request.body`**

`POST` 请求的参数同样可以在 `controller` 中打印，接收用的是 `ctx.request.body`

我们先在 `router.js` 中定义一个 `POST` 请求接口

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.post('/post', controller.home.post);
};
```

然后在 `home` 中再加一个 `post` 方法

```js
// app/controller/home
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const {params} = ctx;
    console.log(params);
    ctx.body = 'hi, egg';
  }
  async post() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    console.log(body);
    ctx.body = 'hi, post';
  }
}

module.exports = HomeController;
```

然后使用 **postman** 进行测试下：

<img src="https://static.jindll.com/notes/WX20200407-173649.png" style="zoom:67%;" />

接口成功返回了 “hi, post” ，控制台也成功打印了入参，控制台我就不贴图了。

## 如何发送请求

**使用API：** `ctx.curl`

做中间层肯定要向真实的业务服务去发起请求，拿到数据后进行重组然后返回给客户端。根据 [egg 的目录约定](https://eggjs.org/zh-cn/basics/structure.html) `app` 目录下还可以存在 `service` 层，那我们的业务内容就写在 `service` 中，在 `app` 下新建一个 `service` 文件夹，在 `service` 下再新建一个 `home.js` 文件，此时 `app` 下文件结构如下：

```
├── app
│   ├── controller
│   │   └── home.js
│   ├── service
│   │   └── home.js
│   └── router.js
```

`home.js` 内代码如下：

```js
const Service = require('egg').Service;

class HomeService extends Service {
  async post() {
    return 'service 成功返回'
  }
}
module.exports = HomeService;
```

然后在 `controller` 内的进行调用 `service` :

```js
// app/controller/home
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async post() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    console.log(body);
    const res = await ctx.service.home.post(); // 调用 service
    console.log(res);
    ctx.body = 'hi, post';
  }
}

module.exports = HomeController;
```

访问之后控制台成功输出 `service 成功返回` 说明 service 调用成功了，之后我们就可以在 service 中请求接口了

```js
const Service = require('egg').Service;

class HomeService extends Service {
  async post() {
    const {data} = await this.ctx.curl('https://api.weixin.qq.com/cgi-bin/ticket/getticket', {data: {'随便输的',type: 'jsapi'}, dataType: 'json'});
    return Promise.resolve(data);
  }
}
module.exports = HomeService;
```

上面的代码我们请求了一个腾讯的接口，参数是随便传的。由上方的接口可以看到发送请求我们用的是 `ctx.curl` API，给这个API 传了两个参数，第一个是请求地址，第二个里面有传递的参数等，我们要熟悉的也就是第二个参数都可以传什么，这里我给出常用的参数，完整参数可以看 [官方文档]([https://eggjs.org/zh-cn/core/httpclient.html#options-%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3](https://eggjs.org/zh-cn/core/httpclient.html#options-参数详解))

| 参数        | 类型   | 说明                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| method      | String | 请求方法，默认 `GET` 支持 `GET、POST、PUT、DELETE、PATCH` 等 |
| data        | Object | 传参，`GET` `POST` 方法都通过这个字段传参                    |
| dataType    | String | 响应格式；默认直接返回 buffer ，支持 `text` 和 `json` 两种格式。 |
| contentType | String | 请求数据格式，默认是 `undefined`，HttpClient 会自动根据 `data` 和 `content` 参数自动设置。 `data` 是 object 的时候默认设置的是 `form`。支持 `json` 格式。 |
| headers     | Object | 自定义请求头                                                 |

**参考文档：**

官方文档: [HttpClient](https://eggjs.org/zh-cn/core/httpclient.html)

## 如何解决跨域（中间件方案）

给 Web 来用，肯定要涉及到跨域，同时 egg 也支持中间件，所以这里我们就写一个中间件，学习下 egg 的中间件，再解决个跨域。

## 如何获取上传的文件

官方文档: [获取上传的文件](https://eggjs.org/zh-cn/basics/controller.html#获取上传的文件)

获取上传的文件

```js
ctx.request.files
```

文件上传需要进行配置，框架默认文件大小不能超过 10M

```js
// config/config.default.js

module.exports = appInfo => {
  return {
    multipart: {
      mode: 'file',
      fileSize: '1024mb',
      fileExtensions: [ '.exe', '.zip' ] // 增加对 其他类型文件的支持
    },
  };
};

```

框架默认的上传文件类型只支持以下类型

```
// images
'.jpg', '.jpeg', // image/jpeg
'.png', // image/png, image/x-png
'.gif', // image/gif
'.bmp', // image/bmp
'.wbmp', // image/vnd.wap.wbmp
'.webp',
'.tif',
'.psd',
// text
'.svg',
'.js', '.jsx',
'.json',
'.css', '.less',
'.html', '.htm',
'.xml',
// tar
'.zip',
'.gz', '.tgz', '.gzip',
// video
'.mp3',
'.mp4',
'.avi',
```



