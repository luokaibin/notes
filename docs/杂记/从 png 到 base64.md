# Base64 编解码

## 前言

在互联网应用中，我们经常需要传输二进制图片、音频等数据，但是普通的文本传输协议如HTTP、SMTP等只能传输ASCII字符，这时就需要将二进制数据转换成可打印字符，以便通过文本方式进行传输。Base64编码就是一种将二进制数据转换为可打印字符的方案。本篇文章就来介绍一下Base64编码的背景、解决的问题和编码规则。

## 背景

Base64编码最早出现于1977年，由美国国家标准与技术研究院（NIST）提出，当时是作为一种将二进制数据转换为ASCII字符的方法，以便于拨号网络传输。当时的拨号网络设备只支持传输ASCII字符，而无法传输二进制数据。在1980年，Base64编码被加入到了RFC822标准中，以便于邮件传输。之后，Base64编码广泛应用于网络传输、数据存储以及加密等领域。

## 编码规则

Base64编码使用64个字符来表示256个字符集中的数据，它的基本原理是将每3个字节的二进制数据划分成4组，每组6位，但6位不够一个字节，所以再往前补两个0，这样原本的3字节数据，被扩充成了4字节【**这就是为什么图片被转成base64之后，体积会增大33%，原本三字节被转成了4字节，体积可不得增大吗**】，然后将这8位的二进制数据转成10进制，然后根据下表进行匹配到对应字符，将这些字符拼接起来，就成了我们看到的base64编码。

![image-20230421171715548](https://static.jindll.com/notes/image-20230421171715548.png)

## 【不够三字节】单字节编码

**但是** 每三个字节作为一组，如果遇到不够3字节的数据呢，例如：

 `M` 它就只有一个字节，根据上面的规则，我们需要获得 `M` 的二进制数据，怎么做呢

1. 我们先获取 `M` 的码点

```js
'M'.charCodeAt(0) // 输出77
```

2. 然后将其转为8位的二进制数据

```js
'M'.charCodeAt(0).toString(2).padStart(8,'0') // 输出 01001101
```

3. 然后以每6位对其进行分组，我们得到

```
010011 01
```

4. 然后在每组的前面补两个0，得到

```
00010011 0001
```

5. **这样第一组够8位了，但第二组只有四位，base64规定如果最后一组只有两位，我们处理往前补两个0外，还需往后补4个零，补足8位** 然后我们就能得到

```
00010011 00010000
```

6. 然后再将这两组转成10进制

```js
['00010011', '00010000'].map(item => parseInt(item, 2)) // 输出 19 16
```

7. 然后根据上方的 base64 编码表，可得知 【19为T，16为Q】，所以base64对`M`进行编码为 `TQ`
8. 但是 base64 要求 3 字节补0扩充为4字节，目前 `TQ` 只有两字节，所以base64规定 **如果不足四字节，往后补`=`,用来表示填充的字节数**
9. 所以填充 `=` 后，我们就得到了最终的编码内容 `TQ==`

## 【不够三字节】双字节编码

如果是两个字节，也就是16位，16位以每6位一组进行分割，每组长度为`[6,6,4]` ，**base64规定，如果最后一组只有4位，除了往前补两个0外，还需往后补两个0**

```js
const str = 'Mn'
let i = 0;
let codePointList = []
while(i<str.length) {
  // 1. 先获取这个字符串中每个字符的码点
  codePointList.push(str.charCodeAt(i))
  i++
}
console.log(codePointList) // 输出 [77, 110]
i = 0
while(i < str.length) {
  // 2. 将各个字符的码点转为8位的二进制数
  codePointList[i] = codePointList[i].toString(2).padStart(8,'0')
  i++
}
console.log(codePointList) // 输出 ['01001101', '01101110']
// 3. 将这个字符串的每个字符的8位二进制码点拼接起来，拼成字符串
codePointList = codePointList.join(''); // 输出 0100110101101110
// 4. 将这个8位二进制码点拼起来的字符串以每6位一组进行分割
codePointList = codePointList.match(/.{1,6}/g);
console.log(codePointList) // 输出 ['010011', '010110', '1110']

i = 0
// 5. 将分割后的每组进行不零扩充到8位
while(i < codePointList.length) {
  if(codePointList[i].length === 6) {
    // 5.1 如果是6位，就往前补两个0
    codePointList[i] = `00${codePointList[i]}`
  }
  if(codePointList[i].length === 4) {
    // 5.2 如果是4位，就前后各补两个0
    codePointList[i] = `00${codePointList[i]}00`
  }
  if(codePointList[i].length === 2) {
    // 5.3 如果是两位，就往前补两个0，往后补4个0
    codePointList[i] = `00${codePointList[i]}0000`
  }
  i++
}
console.log(codePointList) // 输出 ['00010011', '00010110', '00111000']
// 6. 列出 base64编码字典
const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
let base64 = codePointList.reduce((prev, curr) => {
  /**
   * 7. 先将补充到8位的二进制转成十进制 parseInt(curr, 2)
   * 		然后从编码字典中匹配对应的字符是什么 keyStr[parseInt(curr, 2)]
   *		最后将匹配的字符与上次的字符拼接 prev + keyStr[parseInt(curr, 2)]
   */
  prev = prev + keyStr[parseInt(curr, 2)]
  return prev
}, '')
/**
 * 8. 先获取编码后的字符串是否是4的倍数
 *		如果是的话，说明不需要往后补“=”
 * 		如果不是的话，则补充 4 - remainder 长度的“=”
 */
const remainder = base64.length % 4;
const repeatLength = remainder ? 4 - remainder : 0;
/**
 * 9. 编码后的字符串加上补充的 =，即可得到最终的base64编码
 */
base64 = base64 + `=`.repeat(repeatLength)
console.log(base64) // 输出 TW4=
```



## 解码--字符串

知道了编码规则后，我们就可以进行解码了

1. 我们先将编码后的base64字符串以4位一组进行划分

```js
let str = 'TW5yZ2ZzZ3hjeA==';
const getGroupByStr = (str) => {
  return str.match(/.{1,4}/g);
}
getGroupByStr(str) // 输出 ['TW5y', 'Z2Zz', 'Z3hj', 'eA==']
```

2. 我们获取每组每个字符在base64编码表中的码点，然后将其转为8位的二进制

```js
let groups = getGroupByStr(str);


const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

groups = groups.map((item) => {
  return item.split('').reduce((prev, curr) => {
    if(curr === '=') return prev;
    return prev + keyStr.indexOf(curr).toString(2).padStart(8, '0')
  }, '');
})
console.log(groups)
// 输出['00010011000101100011100100110010', '00011001001101100001100100110011', '00011001001101110010000100100011', '0001111000000000']
```

3. 去掉头部添加的两个0，将4字节还原成两字节(针对原始够3字节的二进制)；

```js
groups = groups.reduce((prev, item) => {
  const bytes = item.match(/.{1,8}/g).map(i => {
    return i.slice(2)
  })
  if(bytes.length === 3) bytes[bytes.length - 1] = bytes[bytes.length - 1].slice(0, 4);
  if(bytes.length === 2) bytes[bytes.length - 1] = bytes[bytes.length - 1].slice(0, 2);
  prev.push(...bytes.join('').match(/.{1,8}/g))
  return prev
}, [])
```

4. 将二进制还原成10进制，转成 unicode 字符

```js
groups.reduce((prev, curr) => {
  return prev+String.fromCodePoint(parseInt(curr, 2))
}, '')
```

### 完整代码

```js
const getByteByBase64 = (str) => {
  const getGroupByStr = (str) => {
    return str.match(/.{1,4}/g);
  }
  let groups = getGroupByStr(str);

  const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  groups = groups.map((item) => {
    return item.split('').reduce((prev, curr) => {
      if(curr === '=') return prev;
      return prev + keyStr.indexOf(curr).toString(2).padStart(8, '0')
    }, '');
  })
  
  groups = groups.reduce((prev, item) => {
    const bytes = item.match(/.{1,8}/g).map(i => {
      return i.slice(2)
    })
    if(bytes.length === 3) bytes[bytes.length - 1] = bytes[bytes.length - 1].slice(0, 4);
    if(bytes.length === 2) bytes[bytes.length - 1] = bytes[bytes.length - 1].slice(0, 2);
    prev.push(...bytes.join('').match(/.{1,8}/g))
    return prev
  }, [])
  return groups;
}

const decode = (str) => {
  return groups = getByteByBase64(str)

  return groups.reduce((prev, curr) => {
    return prev+String.fromCodePoint(parseInt(curr, 2))
  }, '')
}
```

## 解码图片

```js
let str = '/* 图片 base64 */';
const bytes = getByteByBase64(str);

const byteArray = new Uint8Array(bytes.map(item => parseInt(item, 2)));

const blob = new Blob([byteArray], { type: 'application/octet-stream' });

// 下载文件
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'example.png'; // 文件名
link.click()
```

