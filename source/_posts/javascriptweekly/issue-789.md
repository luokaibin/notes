---
updated: 2026/06/24 16:56:33
date: 2026/06/24 16:56:33
categories: 
  - javascriptweekly
title: issue-789
post_title: issue-789
comments: true
description: JavaScript Weekly #789VoidZero 加入 Cloudflare，Angular 22 发布 2026年6月9日 在线阅读🎯 头条VoidZero 加入 Cloudflare今年 JS 工具链领域最大的变动之一，由 Evan You 亲述。他创立的公司（Vite、Vitest、Rolldown、Oxc 等的幕后团队）将加入 Cloudflare。他坦率地解释了原因（变现很难）。好消息：所有项目保持 MIT 许可，Evan 和团队继续掌舵。
---
# JavaScript Weekly #789
**VoidZero 加入 Cloudflare，Angular 22 发布**
*2026年6月9日*
[在线阅读](https://javascriptweekly.com/issues/789)

## 🎯 头条

### [VoidZero 加入 Cloudflare](https://voidzero.dev/posts/voidzero-cloudflare)

今年 JS 工具链领域最大的变动之一，由 Evan You 亲述。他创立的公司（Vite、Vitest、Rolldown、Oxc 等的幕后团队）将加入 Cloudflare。他坦率地解释了原因（变现很难）。好消息：所有项目保持 MIT 许可，Evan 和团队继续掌舵。

*— Evan You*

### [Angular v22 发布](https://blog.angular.dev/announcing-angular-v22-c52bb83a4664)

Google 的 batteries-included 框架将三项重大功能推向稳定：[Signal Forms](https://angular.dev/essentials/signal-forms)、[Angular Aria](https://angular.dev/guide/aria/overview) 和[异步响应式（resource）](https://angular.dev/guide/signals/resource)。路由器还实验性支持了原生浏览器 [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)。

*— Angular 团队*

## 📋 简报

- Safari 27（beta 版，于 WWDC 发布）[包含符合标准的 ESM 加载器重写](https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/#javascript)，改进了顶层 `await` 支持，并[在 WebAssembly 中新增 JSPI 支持](https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/#webassembly)。
- [Electron 43 进入 beta](https://github.com/electron/electron/releases/tag/v43.0.0-beta.1)，性能大幅提升：嵌入式 Node.js 快照、缓存为 V8 字节码的包、主二进制文件的链接时优化。
- [React Compiler 的 Rust 移植版](https://github.com/facebook/react/pull/36173#issuecomment-4608356402)已经可以测试了（Meta 已看到「很好的效果」）——即将被合并。

## 📦 版本发布

- [TanStack Table v9 Beta](https://tanstack.com/blog/tanstack-table-v9-taking-form) – 强大的无头数据表格引擎，支持 React、Preact、Solid、Vue、Angular、Svelte 和 Lit。
- [Node-RED 5.0](https://nodered.org/blog/2026/06/09/version-5-0-released) – 基于 Node.js 的「低代码」流式编程环境。
- [Rolldown 1.1](https://github.com/rolldown/rolldown/releases/tag/v1.1.0)、[pnpm 11.5](https://pnpm.io/blog/releases/11.5)、[RunJS 4](https://runjs.app/)、[Emscripten 6.0](https://github.com/emscripten-core/emscripten/releases/tag/6.0.0)

## 📖 文章与视频

### [现代工程价值观](https://cpojer.net/posts/modern-engineering-values)

*「我简直不能相信我过去竟然是手写代码的！」* Jest 和 [Fate](https://fate.technology/) 的创建者说，随着 Agent 编写越来越多的软件，重要的工程价值观也在转移——所有权、品味、以及严格而快速的反馈循环变得至关重要。

*— Christoph Nakazawa*

### [「我希望 Deno 继续做它最擅长的事」](https://hackers.pub/@hongminhee/2026/i-wish-deno-would-keep-doing-what-it-does-best)

一位 Deno 粉丝认为追逐 Node.js/npm 兼容性正在让这个运行时失去其零配置、Web 标准、一体化二进制体验的优势。

*— Hong Minhee*

### [Bun 能告诉我们关于 AI 和开源的启示](https://redmonk.com/sogrady/2026/06/04/bun-two-lessons/)

一位分析师将 Bun（其代码越来越多是 AI 生成而非人类编写）作为观察 AI 编写核心基础设施是否可持续的风向标。

*— Stephen O'Grady (RedMonk)*

## 🛠 代码与工具

### [Geometric.js：几何计算库](https://www.harryjstevens.com/geometric/)

由一位为《纽约时报》制作图形的人创建，这个优雅的库让你处理多边形、边界框、反射、插值、旋转等（[示例](https://www.harryjstevens.com/geometric/examples/)）。想知道两个多边形是否相交？[有专门的函数](https://www.harryjstevens.com/geometric/examples/polygon-intersects-polygon/)。

*— Harry Stevens (The New York Times)*

### [Micromodal.js：轻量可访问模态对话框库](https://micromodal.vercel.app/)

零依赖，符合 WAI-ARIA 指南的模态对话框库。比原生 [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) 提供更多细节：钩子、滚动锁定、进场/退场过渡、点击背景关闭。

*— Ghosh 和 Singh*

### 📝 [PDFSlick 4.0：在 JS 应用中查看和交互 PDF](https://pdfslick.dev/)

面向 React、Solid、Svelte 和原生 JS 应用的 PDF 查看器，从简单的 PDF 查看到处理多个大型文档及批注。[演示](https://pdfslick.dev/examples/pdf-viewer-app)。

*— Vancho Stojkov*

### [babel-plugin-zod-hoist：将 Zod Schema 定义提升到文件顶部](https://github.com/gajus/babel-plugin-zod-hoist)

来自 [Slonik](https://github.com/gajus/slonik) 的创建者，让 Zod 校验显著加快。

*— Gajus Kuizinas*

- [eslint-plugin-functional 10.0](https://github.com/eslint-functional/eslint-plugin-functional) – 禁止 mutation、鼓励函数式编程的 lint 规则。
- [ts-loader 9.6](https://github.com/TypeStrong/ts-loader/releases/tag/v9.6.0) – webpack 的 TypeScript 加载器[重新支持 webpack 4](https://johnnyreilly.com/ts-loader-goes-webpack-4-again)。
- 🧊 [Draco.js](https://github.com/mrdoob/draco.js) – mrdoob 本人开发的纯 JS Draco 网格加载器 for three.js（[演示](https://mrdoob.github.io/draco.js/#bunny.drc)）。
- [Taiga UI 5.10](https://taiga-ui.dev/) – 面向 Angular 的 50+ 组件流行套件。

## 📢 生态圈动态

- Oxide 电脑公司的 [Mitos ASCII 工具](https://mitos-pied.vercel.app/)可将图像转换为 ASCII 艺术*和*动画，内置实时代码环境（基于出色的 [play.core](https://play.ertdfgcvb.xyz/)）。
- 🔁 [replacements.fyi](https://replacements.fyi/)（来自 e18e 团队）可查找 npm 包的替代方案——更简单的包、等效的代码片段或原生 API。
- ⚡ 给页面添加 [Obs.js](https://csswizardry.com/Obs.js/demo/)，它会向 `<html>` 添加 class，根据可用性能（带宽、CPU、延迟）自定义用户体验。
- 🕹️ Raymond Camden 尝试看看 [Chrome 内置 AI 能否玩 Zork 1](https://www.raymondcamden.com/2026/06/02/ai-versus-a-grue)，这款经典的文字冒险游戏。
