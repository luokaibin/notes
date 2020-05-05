---
title: Typora配置图片上传
lang: zh-CN
---

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

