---
updated: 2021/03/26 19:53:26
date: 2021/03/26 19:53:26
categories: 
  - web
  - es2015
title: FileReader前端文件读取
post_title: FileReader前端文件读取
comments: 
description: 读取图片宽高
---



## 读取图片宽高

```js
/**
 * 读取网络图片的宽高
 *
 * @param {string} src - 图片url
 */
const getImgWH = src => {
  const img = new Image();
  img.src = src;
  img.onload = function() {
    console.log(this.width);
    console.log(this.height);
  }
}
```

