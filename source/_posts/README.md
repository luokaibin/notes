---
updated: 2020/07/26 19:53:25
date: 2020/07/26 19:53:25
categories: 
title: README
post_title: README
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

# 单个字符Base 64 编码过程

```js
/** base64 编码表 */
const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
```

1. 先查找字符的 ASCII 编码，得到一个10进制数
2. 将10进制数转为一个字节(一个字节为8比特，二进制数的每一位是一个比特)的2进制数
3. 如果这个二进制数不足8位(也就是不足一个字节8比特)，就往前补0
4. 将这个8位长度的2进制字符串(第三步得到的结果，呈现出来的就是一个8位长度的字符串)以每6位进行切割
5. 分割后如果每一项的长度为6往前补两个0；如果为4，往前补两个0，往后补两个0；如果长度为2，往前补两个0，往后补4个0
6. 将每组的2进制数转为10进制，然后查找 base64 编码表，然后查找对应字符
7. 字符以4位长度为1组，不足4为往后补=

```js
'M'.charCodeAt(0).toString(2).padStart(8,'0').replace(/(.{6})/g, '$1 ').trim().split(' ').map(item => {
    if(item.length === 6) return item.padStart(8,'0')
    if(item.length === 4) return `00${item}00`
    if(item.length === 2) return `00${item}0000`
    console.log('既不是6位也不是4位', item);
}).map(item => keyStr[parseInt(item,2)]).join('').padEnd(4, '=')
```

# 多个字符 Base64 编码过程

> 与单个字符基本相同，不同的点在上述的第三步和和第四步之间，先将每个字符的8位2进制数拼接后，再进行6位一组的分割

```js
let str = 'dvdjDHADA'
let i = 0;
let codeList = '';
while(i < str.length) {
    const code = str.charCodeAt(i);
    codeList = codeList + code.toString(2).padStart(8,'0');
    i++
}
codeList.replace(/(.{6})/g, '$1 ').trim().split(' ').map(item => {
    if(item.length === 6) return item.padStart(8,'0')
    if(item.length === 4) return `00${item}00`
    if(item.length === 2) return `00${item}0000`
    console.log('既不是6位也不是4位', item);
}).map(item => keyStr[parseInt(item,2)]).join('').padEnd(4, '=')
```

# Base64 解码过程

```js
let str = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+M/A8B8ABQAB'
str = str.replace(/=/g, '')
// const strstr.replace(/(.{4})/g, '$1 ').trim().split(' ')

let i = 0;
let codeList = [];
while(i < str.length) {
  const code = keyStr.indexOf(str[i]);
  codeList.push(code);
  i++
}
const codeStr = codeList.reduce((prev,curr) => {
  prev = prev + code.toString(2).padStart(8,'0')
  return prev;
}, '')
codeStr.replace(/(.{8})/g, '$1 ').trim().split(' ')
```



