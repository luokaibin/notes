---
updated: 2020/07/26 19:53:25
date: 2020/07/26 19:53:25
categories: 
title: README
comments: 
description: 胖大人笔记TODO树莓派科学上网换博客架构netdata 汉化nas切换nextcloud邮件服务器用docker部署扒取 https //youtube.iiilab.com/ 视频解析接口图库系统nps 配合 Nginx 代理nps 用 docker 部署pip 卸载 ssr邮局
---
# 胖大人笔记



**TODO**

- [x] 树莓派科学上网
- [x] 换博客架构
- [ ] netdata 汉化
- [ ] nas切换nextcloud
- [ ] 邮件服务器用docker部署
- [ ] 扒取 https://youtube.iiilab.com/ 视频解析接口
- [ ] 图库系统
- [x] nps 配合 Nginx 代理
- [x] nps 用 docker 部署
- [x] pip 卸载 ssr

----

## 邮局

- Zimbra
- IRedMail
- Mail-in-a-Box
- Modoboa

- Mailu


# 加密过程

```js
const getBytes = (str) => {
  // TextEncoder 接受代码点流作为输入，并提供 UTF-8 字节流作为输出。
  // encode 方法返回一个 Uint8Array (en-US) 对象。
  const encoder = new TextEncoder('utf8');
  return encoder.encode(str);
}
const byteToStr = (bytes) => {
  // 先对字节流按位非运算 再把字节转为字符串
  // 静态 String.fromCharCode() 方法返回由指定的 UTF-16 代码单元序列创建的字符串。
  return bytes.map(item => ~item).reduce((prev, curr) => `${prev}${String.fromCharCode(curr)}`, '')
}
// base64加密
const base64Encode = (str) => btoa(str)

const encrypt = (str) => {
  const bytes = getBytes(str);
  const newStr = byteToStr(bytes);
  return base64Encode(newStr);
}
```

# 解密过程

```js
// base64解密
const base64decode = (str) => atob(str);
const strToByte = (str) => {
  const bytes = [];
  for(let i = 0; i < str.length; i++) {
    // charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
    bytes.push(str.charCodeAt(i))
  }
  // 用创建出来的数组构造一个 Uint8Array 对象
  let bytesBuffer = new Uint8Array(bytes)
  // 对字节流按位非运算 还原
  return bytesBuffer.map(item => ~item)
}
const getStr = (bytes) => {
  // 和加密的第一步是相反的
  const decoder = new TextDecoder();
  return decoder.decode(bytes)
}

const decrypt = (str) => {
  const newStr = base64decode(str);
  const bytes = strToByte(newStr);
  return getStr(bytes)
}
```



