---
updated: 2021/07/26 19:53:25
date: 2021/07/26 19:53:25
categories: 
  - node
title: node常用功能
comments: 
description: 读取文件夹下所有文件批量修改文件名
lang: zh-CN
---

## 读取文件夹下所有文件

```js
const path = require('path');
const fs = require('fs');

// 同步读取当前目录下的所有文件
let files = fs.readdirSync(__dirname);

// 将文件的后缀名删了
files.forEach((item,index) => {
  files[index] = item.split('.')[0]
});

// 将文件名数组转成json传写入当前目录下files.js文件内
fs.writeFileSync(path.resolve(__dirname, 'files.js'), JSON.stringify(files));
```

## 批量修改文件名

```js
const path = require('path');
const fs = require('fs');

// 源文件名 对应 要修改的文件名
const config = new Map([
  ['0008.md', '08 在 Webpack 中使用 Babel 转换 JavaScript 代码'],
  ['0009.md', '09 Webpack 中使用 TypeScript 开发项目'],
  ['0010.md', '10 Webpack 中样式相关的配置'],
  ['0011.md', '11 Webpack 中使用 lint 工具来保证代码风格和质量'],
  ['0012.md', '12 使用 Webpack 管理项目中的静态资源'],
  ['0013.md', '13 Webpack 中打包 HTML 和多页面配置'],
  ['0014.md', '14 Webpack Dev Server 本地开发服务'],
  ['0015.md', '15 Webpack 中配置React和Vue开发环境'],
  ['0016.md', '16 Webpack 环境相关配置及配置文件拆分'],
  ['0017.md', '17 Webpack 优化之体积优化'],
  ['0018.md', '18 Webpack 优化之增强缓存命中率'],
  ['0019.md', '19 使用 Webpack 的 splitChunks 功能来拆分代码'],
  ['0020.md', '20 Webpack 优化之速度优化'],
  ['0021.md', '21 使用 Webpack 的 Tree-Shaking'],
  ['0022.md', '22 为你准备了一份 Webpack 工程化最佳实践总结'],
  ['0023.md', '23 怎么调试 Webpack？'],
  ['0024.md', '24 Tapable —— Webpack 的核心模块'],
  ['0025.md', '25 Webpack 的 Compiler 和 Compilation'],
  ['0026.md', '26 Webpack 工作流程'],
  ['0027.md', '27 从 Webpack 的产出代码来看 Webpack 是怎么执行的'],
  ['0028.md', '28 Webpack 的模块热替换做了什么？'],
  ['0029.md', '29 实战：使用 PostCSS 打造移动适配方案'],
  ['0030.md', '30 实战：手写一个 markdown-loader'],
  ['0031.md', '31 实战：手写一个 prefetch-webpack-plugin 插件'],
  ['0032.md', '32 实战：使用 Express 和中间件来实现 Webpack-dev-server'],
  ['0033.md', '33 实战：使用 Stats 数据结构生成 Webpack 构建报告'],
  ['0034.md', '34 实战：给 Webpack 项目添加 modern'],
  ['0035.md', '35 Webpack 5.0'],
  ['0036.md', '36 课程总结'],
  ['0037.md', '37 附录：项目中常用的 loader'],
  ['0038.md', '38 附录：项目中常用的插件']
])

// 遍历Map 对象
config.forEach((value,key) => {
  // 获取源文件路径
  const filepath = path.resolve(__dirname, key);
  
  // 读取文件内容 并输出文件内容 encoding 默认是 buffer
  let content = fs.readFileSync(filepath, {encoding: 'utf-8'});
  
  // 在文件开始部位添加内容
  content = `---
title: ${value}
description: 
lang: zh-CN
---

${content}
`
  // 将新内容写入文件
  fs.writeFileSync(filepath,content);
  
  // 对文件改名
  fs.renameSync(filepath, path.resolve(__dirname, `${value}.md`));
})
```



```js
const init = () => {
  document.querySelector('#competitor_action').value = '无';
  document.querySelector('#competitor_url').value = '无';
  document.querySelector('#is_auth [value="0"]').selected = true;
  document.querySelector('#url_type [value="1"]').selected = true;
  document.querySelector('#svr_url').value = 'http://ocloud-tcenter-tcs-app:8088/api/v1';
  document.querySelector('#is_wiki [value="0"]').selected = true;
  document.querySelector('#category [value="应用管理相关接口"]').selected = true;
  [...document.querySelectorAll('#del_example_body')].forEach(el => el.click());
  [...document.querySelectorAll('[name="competitor_name[]"]')].forEach(el => el.value = '无')
}
```

