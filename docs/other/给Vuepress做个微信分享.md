---
title: 给Vuepress加个微信分享
description: 用 Vuepress 做个人博客，好不容易写了篇文章想分享到朋友圈装个X，结果连个头图都没有，也太丑了
lang: zh-CN
---

## 前言

用 Vuepress 做个人博客，好不容易写了篇文章想分享到朋友圈装个X，结果却是这个样子

![]()

Low暴了，连个头图都没有，太丑了，所以本文的目标就是给 Vuepress 加个微信分享功能。

## 准备工作

1. 需要有一个微信公众号
2. 需要会 node 或者看得懂 node 代码，本文服务端基于 node eggjs 框架

## 客户端部分

做微信分享需要用到 wx js-SDK，官方文档：[https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html) 。首先我们想要实现的功能一个是分享给朋友一个是分享到朋友圈，也就是我们需要调用文档中说的 `wx.updateAppMessageShareData()` 、`wx.updateTimelineShareData()` 、`wx.onMenuShareTimeline()` 、`wx.onMenuShareAppMessage()` ，后两个 API 官方文档说即将分期，但我之前使用的时候，发现前两个 API 不起作用，即将废弃的 API 才是起作用实现分享的 :new_moon_with_face::new_moon_with_face: 。

根据官方文档说明，要实现微信分享我们总共需要做这些工作

1. 在微信公众号后台配置 JS 安全域名和IP白名单
2. 引入 JS-SDK 文件
3. 调用后端接口拿到 `wx.config` API 所需要的权限验证配置信息
4. 将配置信息注入 `wx.config` ，然后就可以调用微信的分享接口了

### 公众号配置

[微信公众平台](https://mp.weixin.qq.com/) 登录你的微信公众号，在左侧菜单栏找到【公众号设置】然后选择【功能设置】，设置【JS接口安全域名】

![image-20200410145407798](/Users/mac/Library/Application Support/typora-user-images/image-20200410145407798.png)

JS接口安全域名就是你所要分享的页面的域名，设置安全域名需要把对应的校验文件下载下来放到域名的根目录下，通过域名校验。

JS安全域名设置成功之后，我们就需要再配置IP白名单，获取微信 config 所需要的配置信息需要服务端调用微信的几个接口，需要把服务器的IP配置进去，否则服务端调用微信接口是调用不成功的，这里我们需要配置两个，一个是服务器的，一个是我们本地的IP，本地IP在开发的时候用。

依旧是左侧菜单栏，找到【基本配置】，配置IP白名单，同时把 AppID 和 AppSecret 记录下来，之后服务端开发会用到。

![image-20200410150516301](/Users/mac/Library/Application Support/typora-user-images/image-20200410150516301.png)

### 引入 SDK 调用相应API

在 Vuepress 的配置文件中引入 SDK，同时再引入我们自己处理分享的JS文件，我的文件在 `public/share.js` 

```js
// config.js
module.exports = {
  head: [
    ['script', { src: 'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js', defer: 'defer'}],
    ['script', { src: '/share.js?2gu6df', defer: 'defer'}],
  ],
}
```

