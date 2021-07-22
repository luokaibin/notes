---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - web
  - webpack
title: 37 附录：项目中常用的 loader
comments: 
description: 自信和希望是青年的特权。&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——大仲马本小节列出项目中常用的 Webpack Loader，大家在实际项目中有类似需求的可以直接通过本小节的介绍来快速查找使用。
lang: zh-CN
---

![](https://img2.mukewang.com/5cd965150001c63306400360.jpg)

> 自信和希望是青年的特权。
>
> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——大仲马

本小节列出项目中常用的 Webpack Loader，大家在实际项目中有类似需求的可以直接通过本小节的介绍来快速查找使用。

## JavaScript 相关

- [babel-loader](https://github.com/babel/babel-loader)：把 ES6 转换成 ES5；
- [script-loader](https://github.com/webpack-contrib/script-loader)：可以将指定的模块 JavaScript 文件转成纯字符串通过`eval`方式执行；
- [exports-loader](https://github.com/webpack-contrib/exports-loader)：可以导出指定的对象，例如`window.Zepto`；
- [ts-loader](https://github.com/TypeStrong/ts-loader)：把 TypeScript 转换成 JavaScript；
- [imports-loader](https://github.com/webpack-contrib/imports-loader)：将任意三方的对象添加到`window`对象中。

## 样式相关

- [style-loader](https://github.com/webpack-contrib/style-loader)：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS；
- [css-loader](https://github.com/webpack-contrib/css-loader)：加载 CSS，支持模块化、压缩、文件导入等特性；
- [postcss-loader](https://github.com/postcss/postcss-loader)：CSS 后处理器 postcss 的 loader；
- [less-loader](https://github.com/webpack-contrib/less-loader)：把 less 代码转换成 CSS 代码；
- [sass-loader](https://github.com/webpack-contrib/sass-loader)：把 SCSS/SASS 代码转换成 CSS 代码；
- [fast-sass-loader](https://github.com/yibn2008/fast-sass-loader)：并行处理 SCSS/SASS 文件，比 Sass-loader 快 5~10 倍的 loader；
- [stylus-loader](https://github.com/shama/stylus-loader)：把 Stylus 代码转换成 CSS 代码；
- [mini-css-extract-plugin 的 loader](https://github.com/webpack-contrib/mini-css-extract-plugin)：将 CSS 样式内容提取到 CSS 文件中。

## 静态资源相关

- [raw-loader](https://github.com/webpack-contrib/raw-loader)：把文本文件的内容加载到代码中去；
- [file-loader](https://github.com/webpack-contrib/file-loader)：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件；
- [url-loader](https://github.com/webpack-contrib/url-loader)：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去；
- [html-loader](https://github.com/webpack-contrib/html-loader)：HTML 语法的 loader，可以处理 HTML 中的图片、CSS 等；
- [svg-url-loader](https://github.com/bhovhannes/svg-url-loader)：把压缩后的 SVG 内容注入到代码中；
- [markdown-loader](https://github.com/peerigon/markdown-loader)：把 Markdown 文件转换成 HTML；
- [ejs-loader](https://github.com/okonet/ejs-loader)：把 EJS 模版编译成函数返回；
- [pug-loader](https://github.com/pugjs/pug-loader)：把 Pug 模版转换成 JavaScript 函数返回；
- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)：加载并且压缩图片文件；
- [csv-loader](https://www.npmjs.com/package/csv-loader)：加载 csv 文件内容；
- [xml-loader](https://www.npmjs.com/package/xml-loader)：加载 xml 文件内容。

## 工程相关

- [eslint-loader](https://github.com/webpack-contrib/eslint-loader)：通过 ESLint 检查 JavaScript 代码；
- [tslint-loader](https://github.com/wbuchwalter/tslint-loader)：通过 TSLint 检查 TypeScript 代码；
- [mocha-loader](https://github.com/webpack-contrib/mocha-loader)：加载 Mocha 测试用例代码。

## 其他

- [vue-loader](https://github.com/vuejs/vue-loader)：加载 Vue.js 单文件组件。


