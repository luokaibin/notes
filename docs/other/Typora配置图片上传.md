---
title: Typora配置图片自动上传至七牛云
lang: zh-CN
---

## 前言

个人比较喜欢用 Typora 写文档，对于文档中的图片之前一直是手动上传到七牛云，复制地址，在粘回文档，比较累。就一直在想怎么能实现图片自动上传呢，然后最近就发现 window 版的 Typora 也支持自定义图床了(mac很久之前就支持了)，就专门研究了下，下面就分享下怎么把图片自动上传到七牛云。先看下最后的实现效果：

<img src="https://static.jindll.com/notes/2020050701.gif" alt="2020050701" style="zoom:67%;" />

## 前置条件

有 node 环境

## 编写脚本

我们先打开 Typora 的设置，选择到图像，插入图片时选择上传图片，下面的选项根据自己的需要选，下方的上传服务选择自定义命令( `Custom Command` )

![2020050702](https://static.jindll.com/notes/2020050702.png)

自定义命令要输入的就是上传图片时会执行的命令，假入我们输入的是 `node index.js` 那么最后上传图片时执行的就是 `node index.js xxx.jpg` ，执行完成之后必须在控制台打印出最后的图片地址。

所以自定义命令我最后输入的是： 

**`/Users/mac/.nvm/versions/node/v12.16.1/bin/node /Applications/qshell/index.js -file`**

上方的命令表示用 node 去执行 `/Applications/qshell/` 下的 `index.js` 文件，`-file` 字段名，最后通过 `file` 取传入的图片路径。

>**特殊说明：**
>
>1. 因为我 mac 上是用 nvm 管理 node 版本的，所以造成 typora 直接去执行 node 命令的时候，会报 node 命令不存在，所以我用的是 `/Users/mac/.nvm/versions/node/v12.16.1/bin/node` 绝对的 node 命令，**如果你也用的nvm管理node，那你一定要找到你的node命令** 。**如果你没有用nvm等node管理工具，node 命令随处可执行，那么你就可以把 `/Users/mac/.nvm/versions/node/v12.16.1/bin/node` 换成 `node`** 
>
>2. `/Applications/qshell/index.js` 是我脚本所在位置，使用过程中根据实际来，你的脚本在那个文件夹下，就改成你脚本的位置
>
>3. 例如我 window 上的命令就是 

然后到 `/Applications/qshell/` 目录下(这是我脚本所在位置，实际应用时到你脚本的存放位置)去执行下 `npm init -y` ，然后接着 `npm i -D commander` ，最后新建个 `index.js` 文件

`index.js` 内写入如下内容

```js
const program = require('commander');
const progress = require('child_process');

program.option('-file, --LocalFile <LocalFile>', '要上传的本地文件');
program.parse(process.argv);

const exec = (command) => {
  return new Promise((resolve,reject) => {
    progress.exec(command,(error,stdout,stderr)=> {
      if (error) {
        console.log(error)
        reject()
      } else {
        resolve(stdout)
      }
    })
  })
}

const upload = async () => {
  const {LocalFile} = program.opts();
  let fileName,res;
  if (LocalFile.startsWith('https://') || LocalFile.startsWith('http://')) {
    // 处理网络图片
    fileName =  LocalFile.split('/');
    fileName = fileName[fileName.length - 1];
    res = await exec(`/Applications/qshell/qshell fetch ${LocalFile} blog -k notes/${fileName}`);
    console.log(`https://static.jindll.com/notes/${fileName}`)
  } else {
    // 处理本地图片
    fileName = LocalFile.split(/[\/|\\]/);
    fileName = fileName[fileName.length - 1];
    res = await exec(`/Applications/qshell/qshell fput --overwrite blog notes/${fileName} ${LocalFile}`);
    console.log(`https://static.jindll.com/notes/${fileName}`)
  }
}

upload();
```















```js
const program = require('commander');
const progress = require('child_process');

program.option('-file, --LocalFile <LocalFile>', '要上传的本地文件');
program.parse(process.argv);

const exec = (command) => {
  return new Promise((resolve,reject) => {
    progress.exec(command,(error,stdout,stderr)=> {
      if (error) {
        console.log(error)
        reject()
      } else {
        resolve(stdout)
      }
    })
  })
}

const upload = async () => {
  const {LocalFile} = program.opts();
  let fileName,res;
  if (LocalFile.startsWith('https://') || LocalFile.startsWith('http://')) {
    fileName =  LocalFile.split('/');
    fileName = fileName[fileName.length - 1];
    res = await exec(`qshell fetch ${LocalFile} blog -k notes/${fileName}`);
    console.log(`https://static.jindll.com/notes/${fileName}`)
  } else {
    fileName = LocalFile.split(/[\/|\\]/);
    fileName = fileName[fileName.length - 1];
    res = await exec(`qshell fput --overwrite blog notes/${fileName} ${LocalFile}`);
    console.log(`https://static.jindll.com/notes/${fileName}`)
  }
  // const reg = /=>.*(notes\/.*)\s*success!/
  // if (reg.test(res)) {
  //   console.log(`https://static.jindll.com/${RegExp.$1}`)
  // }
}

upload();
```

