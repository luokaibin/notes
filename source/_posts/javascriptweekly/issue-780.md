---
updated: 2026/06/24 17:04:09
date: 2026/07/02 12:21:59
categories: 
  - javascriptweekly
title: issue-780
post_title: issue-780
comments: true
description: JavaScript Weekly #7802026 年 JavaScript 须知 2026年4月7日 在线阅读🎯 头条JSIR：Google 推出的 JavaScript 高级中间表示Google 开源了新工具（JSIR）并提议了一种行业标准的 JavaScript 中间表示。已在 Google 内部用于代码分析和转换，其底层思想可能构成新一代工具链的基础。如果说 AST 告诉你代码
---
# JavaScript Weekly #780
**2026 年 JavaScript 须知**
*2026年4月7日*
[在线阅读](https://javascriptweekly.com/issues/780)

## 🎯 头条

### [JSIR：Google 推出的 JavaScript 高级中间表示](https://discourse.llvm.org/t/rfc-jsir-a-high-level-ir-for-javascript/90456)

Google 开源了新工具（[JSIR](https://github.com/google/jsir)）并提议了一种行业标准的 JavaScript 中间表示。已在 Google 内部用于代码分析和转换，其底层思想可能构成新一代工具链的基础。如果说 AST 告诉你代码*长什么样子*，那 IR 告诉你代码*做了什么*。

*— Zhixun Tan (Google)*

### [2026 年 JavaScript 须知](https://frontendmasters.com/blog/what-to-know-in-javascript-2026-edition/)

JS 生态的最新全景概述，涵盖最新 ECMAScript 新增特性、值得关注的框架、运行时、构建工具等。是快速了解现状的好方式。

*— Chris Coyier*

## 📋 简报

- 🔓 Axios 团队发布了[上周 npm 供应链攻击的事后分析](https://github.com/axios/axios/issues/10636)，以及[社会工程攻击部分的深入分析](https://github.com/axios/axios/issues/10636#issuecomment-4180237789)。
- 📊 WebKit、Google 和 Mozilla [推出 JetStream 3](https://webkit.org/blog/17899/introducing-the-jetstream-3-benchmark-suite/)，浏览器 JS 和 WASM 性能基准套件的最新版本。
- [Cloudflare 发布 EmDash](https://blog.cloudflare.com/emdash-wordpress/)，JavaScript 风格的「WordPress 精神续作」。
- [Svelte 团队发布最新月度动态](https://svelte.dev/blog/whats-new-in-svelte-april-2026)。

## 📖 文章与视频

### [最低发布年龄：被低估的供应链防御手段](https://daniakash.com/posts/simplest-supply-chain-defense/)

指定包的最低「年龄」越来越成为包管理器的常见功能。思路是如果你等待一段时间，维护者和安全工具等会先处理掉最恶意的供应链攻击。虽不是银弹，但可能适合你的场景，文章介绍了如何配置。

*— Dani Akash*

### ▶ [TanStack Start：客户端优先的 Web 框架](https://www.youtube.com/watch?v=8XGcc-FRPuo)

TanStack 创始人 30 分钟演讲，展示 [TanStack Start](https://tanstack.com/start/latest) 对 React 和 Solid 开发者的价值主张。

*— Tanner Linsley*

### [开源维护者倦怠是真实的](https://openjsf.org/blog/burnout-is-real-for-open-source-maintainers)

40 分钟音频采访（附文字总结），对象是 [Lodash](https://lodash.com/) 创建者 John-David Dalton。

*— OpenJS Foundation*

### [CSS 大扩张](https://blog.gitbutler.com/the-great-css-expansion)

全面回顾那些曾经是 JavaScript 自然领域的 Web 任务（tooltip、dialog、滚动动画），但现在现代 CSS 已经能出色完成。

*— Pavel Laptev*

## 🛠 代码与工具

### [Fuse.js 7.3：轻量模糊搜索](https://fusejs.io/)

想要一个能容忍模糊输入的搜索功能*而无需专用后端*？[v7.3](https://github.com/krisk/Fuse/releases/tag/v7.3.0) 新增逐词模糊匹配，[v7.4 beta](https://github.com/krisk/Fuse/releases/tag/v7.4.0-beta.1) 新增[基于 Worker 的分布式搜索](https://www.fusejs.io/web-workers.html)。[演示](https://www.fusejs.io/demo.html)。

*— Kiro Risk*

### [Babylon.js 9.0 发布](https://blogs.windows.com/windowsdeveloper/2026/03/26/announcing-babylon-js-9-0/)

[微软流行的渲染引擎](https://www.babylonjs.com)用于构建交互式 3D Web 体验。新增节点粒子编辑器、[体积光](https://playground.babylonjs.com/?webgpu&areaLights=1&volumetricLight=1&clusteredLights=1&camera=volumetric#8BQJH7)、[高级高斯泼溅](https://playground.babylonjs.com/#J3MJSN)等。

*— Carter & Lucchini (Microsoft)*

### [Marked.js 18.0：快速 Markdown 解析器和编译器](https://marked.js.org/)

为速度而生的底层 Markdown 编译器。[演示](https://marked.js.org/demo/)，v18 主要是 bugfix，升级到 TypeScript 6。[GitHub 仓库](https://github.com/markedjs/marked)。

*— Christopher Jeffrey*

### [TinyBase v8.1：local-first 应用的响应式数据存储](https://tinybase.org/guides/releases/#v8-1)

可用作多种应用类型整个后端的响应式数据存储和同步引擎，**现原生支持 Svelte 5**。

*— James Pearce*

### [xdk-typescript：X API 官方 SDK](https://github.com/xdevplatform/xdk-typescript)

社交媒体平台 X 的新官方 API SDK（祝你好运）。

*— X Dev Platform*

- [npm-check-updates v20.0.0](https://github.com/raineorshine/npm-check-updates/releases/tag/v20.0.0) – 升级 package.json 依赖到最新版本。
- [Neutralinojs 6.7](https://github.com/neutralinojs/neutralinojs) – 跨平台桌面应用框架新增输入设备模拟 API。
- 🖼️ [SVGInject 2.0](https://github.com/iconfu/svg-inject) – 运行时内联 SVG 文件到 DOM。
- [vue-clamp 1.0](https://github.com/Justineo/vue-clamp) – Vue 3 多行文本截断原语（[演示](https://vue-clamp.void.app/)）。
- [vue-virtual-scroller 2.0](https://vue-virtual-scroller.netlify.app/) – Vue 3 列表快速虚拟滚动。
- [Verdaccio 6.4](https://github.com/verdaccio/verdaccio/releases/tag/v6.4.0) – 运行自己的本地 npm 私有注册表。
- [React Native Skia 2.6](https://github.com/Shopify/react-native-skia) – RN 快速 2D 图形库。
- [SunEditor 3.0](https://suneditor.com/) – 可扩展原生 JS WYSIWYG 编辑器。
- [hucre 0.3](https://github.com/productdevbook/hucre) – 零依赖电子表格引擎。

## 📢 生态圈动态

- [CSS is DOOMed](https://nielsleenheer.com/articles/2026/css-is-doomed-rendering-doom-in-3d-with-css/)：Niels Leenheer 用纯 CSS 渲染实现了 1993 年《毁灭战士》的版本（游戏逻辑用 JS）。[亲自体验](https://cssdoom.wtf/)或[查看代码](https://github.com/NielsLeenheer/cssDOOM)。
- [QuickBEAM](https://github.com/elixir-volt/quickbeam) 是 Erlang BEAM VM 上的 JavaScript 运行时，兼容核心 Node.js API。
- [CSS or BS?](https://www.keithcirkel.co.uk/css-or-bs/) 测试你对真实 CSS 属性和虚构 CSS 属性的辨别能力。
- ✉️ Spencer Mortensen [测试了 25 种邮箱地址混淆技术](https://spencermortensen.com/articles/email-obfuscation/)，看哪些在 2026 年真正有效。
