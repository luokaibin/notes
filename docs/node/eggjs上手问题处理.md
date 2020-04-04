---
title: eggjs上手问题处理
description: 
lang: zh_CN
---

## 怎么获取前端传入的参数

通过上下文对象 `ctx` 获取

### get请求

官方文档: [https://eggjs.org/zh-cn/basics/controller.html#query](https://eggjs.org/zh-cn/basics/controller.html#query)

```js
ctx.query
```

### 获取路径参数

官方文档: [https://eggjs.org/zh-cn/basics/controller.html#router-params](https://eggjs.org/zh-cn/basics/controller.html#router-params)

```js
// /projects/:projectId/app/:appId
ctx.params.projectId
ctx.params.appId
```

### post请求

官方文档: [https://eggjs.org/zh-cn/basics/controller.html#body](https://eggjs.org/zh-cn/basics/controller.html#body)

```js
ctx.request.body
```

## post 请求报 csrf 错误

官方文档: [为什么会有-csrf-报错](https://eggjs.org/zh-cn/faq.html#为什么会有-csrf-报错)

官方文档: [安全威胁-csrf-的防范](https://eggjs.org/zh-cn/core/security.html#安全威胁-csrf-的防范)

Egg 内置的 [egg-security](https://github.com/eggjs/egg-security/) 插件默认对所有『非安全』的方法，例如 `POST`，`PUT`，`DELETE` 都进行 CSRF 校验。

官方的 csrf 校验是通过下发 cookie 实现的, 对于非 web 环境不适用, 建议直接关闭官方的 csrf 校验, 自行使用 token 防范 csrf

**关闭方法**

```js
// config/config.default.js

module.exports = appInfo => {
  return {
    security: {
      csrf: {
        enable: false, // 关闭框架默认的csrf插件
      },
    }
  };
};

```

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

## 如何发送请求

官方文档： [https://eggjs.org/zh-cn/core/httpclient.html](https://eggjs.org/zh-cn/core/httpclient.html)

```js
this.ctx.curl(url, options);
```

### 常用options

| 参数        | 类型   | 说明                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| method      | String | 请求方法，默认 `GET` 支持 `GET、POST、PUT、DELETE、PATCH` 等 |
| data        | Object | 传参，`GET` `POST` 方法都通过这个字段传参                    |
| dataType    | String | 响应格式；默认直接返回 buffer ，支持 `text` 和 `json` 两种格式。 |
| contentType | String | 请求数据格式，默认是 `undefined`，HttpClient 会自动根据 `data` 和 `content` 参数自动设置。 `data` 是 object 的时候默认设置的是 `form`。支持 `json` 格式。 |
| headers     | Object | 自定义请求头                                                 |

