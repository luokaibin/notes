---
updated: 2026/06/24 16:57:51
date: 2026/06/24 16:57:51
categories: 
  - javascriptweekly
title: issue-788
post_title: issue-788
comments: true
description: JavaScript Weekly #788如何在 2026 年审查 npm 包 2026年6月2日 在线阅读🎯 头条Hocuspocus 4：为任何应用添加实时协作基于 Yjs 的即插即用实时协作后端，可快速安全地在 JavaScript 应用中接入多用户协作体验。运行在 Node、Bun、Deno 或 Cloudflare Workers 上。
---
# JavaScript Weekly #788
**如何在 2026 年审查 npm 包**
*2026年6月2日*
[在线阅读](https://javascriptweekly.com/issues/788)

## 🎯 头条

### [Hocuspocus 4：为任何应用添加实时协作](https://tiptap.dev/docs/hocuspocus/getting-started/overview)

基于 [Yjs](https://yjs.dev/) 的即插即用实时协作后端，可快速安全地在 JavaScript 应用中接入多用户协作体验。运行在 Node、Bun、Deno 或 Cloudflare Workers 上。[GitHub 仓库](https://github.com/ueberdosis/hocuspocus)。

*— Tiptap*

### [如何评估 npm 包：2026 版](https://blog.gaborkoos.com/posts/2026-05-29-How-to-Evaluate-an-npm-Package-2026-Edition/)

一份超越 star 数的实用审查清单，涵盖来源证明（provenance attestation）、安装脚本、CI 质量和维护者响应速度。学会在 `npm install` 之前发现危险信号。

*— Gabor Koos*

## 📋 简报

- 🕒 流行的 [date-fns](https://date-fns.org/) 日期工具库正在[为 Temporal 时代做准备](https://date-fns.org/you-dont-need-date-fns)，转型为「Temporal-first 库」。更精简的 [v4.4](https://github.com/date-fns/date-fns/releases/tag/v4.4.0) 可用，[v5.0 已进入 alpha](https://github.com/date-fns/date-fns/releases/tag/v5.0.0-alpha.0)。
- 🔒 Shai-Hulud [最新攻击浪潮](https://socket.dev/blog/mini-shai-hulud-campaign-hits-red-hat-cloud-services-npm-packages)：[数十个 Red Hat npm 包被植入后门](https://arstechnica.com/security/2026/06/dozens-of-red-hat-packages-backdoored-through-its-offical-npm-channel/)。
- [npm 11.16.0 发布](https://github.com/npm/cli/releases/tag/v11.16.0)，初步支持*可选加入*的安装脚本策略（`allowScripts`）。[更多详情](https://github.com/npm/cli/pull/9360)。
- Svelte 团队发布了[最新的月度更新](https://svelte.dev/blog/whats-new-in-svelte-june-2026)。

## 📦 版本发布

- [Ember 7.0](https://blog.emberjs.com/ember-released-7-0/) – 长期框架的重大版本，移除已弃用功能。文章汇总了 6.0 以来的所有新变化。
- [Node.js 26.3.0 (Current)](https://nodejs.org/en/blog/release/v26.3.0) – npm 升级到 11.16.0，macOS x64 降级为 tier 2 平台，QUIC 大量改进。
- [Astro 6.4](https://astro.build/blog/astro-640/) – 新增可插拔 Markdown 管线、Rust 驱动 Markdown 处理器、Cloudflare 高级路由辅助。
- [pnpm 11.5.0](https://github.com/pnpm/pnpm/releases/tag/v11.5.0)/[11.5.1](https://github.com/pnpm/pnpm/releases/tag/v11.5.1)、[ESLint 10.4.1](https://eslint.org/blog/2026/05/eslint-v10.4.1-released/)、[Angular 22 RC3](https://github.com/angular/angular/releases/tag/v22.0.0-rc.3)

## 📖 文章与视频

### 🤖 [用 AI 更慢地写出更好的代码](https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/)

一位多产的 JavaScript 开发者表示，LLM 不只能快速生成烂代码——它们确实可以帮你更*慢*地写出更高质量的代码。

*— Nolan Lawson*

### [每个人都应该知道的 TypeScript 技巧](https://github.com/AllThingsSmitty/typescript-tips-everyone-should-know)

一组简洁的提示，让代码更安全、更干净。同时提醒：TypeScript 能提高正确性，但不能保证良好的架构或消除运行时 bug。

*— Matt Smith*

### [有意用 JavaScript 阻塞渲染](https://www.jayfreestone.com/writing/intentional-render-blocking-javascript/)

*「有时候一个内联的阻塞渲染脚本，是避免激进布局偏移的微小代价。」*

*— Jay Freestone*

### [为什么 tsgo 使用这么多内存？](https://zackoverflow.dev/writing/why-does-tsgo-use-so-much-memory)

深入了解 Go 驱动的 TypeScript 7 编译器，以及它在大型项目上为何会吃掉数 GB 内存。

*— Zack Radisic*

## 🛠 代码与工具

### 📊 [Plotly 3.6：声明式图表库](https://plotly.com/javascript/)

长期维护的库，在 Python 和 R 生态中也广泛使用，提供超过 50 种可视化类型。

*— Plotly, Inc.*

### [Component Party：UI 库的罗塞塔石碑](https://component-party.dev/?f=react-vue3)

并排对比 React、Vue、Svelte、Angular、Ember 等框架的代码片段。最近更新扩展了 Angular 和 Svelte 覆盖范围，还加入了 Ripple 和 Ember Polaris。

*— Mathieu Schimmerling*

### 🎉 [tsParticles 4：Web 特效粒子引擎](https://particles.js.org/)

如果你想要五彩纸屑炮、烟花、[丝带](https://ribbons.js.org/)、萤火虫、雪花或类似效果，这个库就是你的选择。支持所有主流框架和原生 JS。[在线演示](https://particles.js.org/playground/presets)。

*— Matteo Bruni*

- 📝 [officeParser 7.1](https://github.com/harshankur/officeParser/releases/tag/v7.1.0) – 将办公文件解析为 AST。[浏览器演示](https://officeparser.harshankur.com/#visualizer)。
- 🔎 [Fuse.js 7.4](https://github.com/krisk/Fuse/releases/tag/v7.4.0) – 模糊搜索库，v7.4 新增 Web Worker 并行搜索（[主页](https://www.fusejs.io/)）。
- [ESLint You Might Not Need An Effect 1.0](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect) – 检测 React 中[可能不需要 Effect](https://react.dev/learn/you-might-not-need-an-effect) 的情况。
- [PGlite 0.5](https://pglite.dev/) – WASM 中本地运行 Postgres，v0.5 升级到 Postgres 18.3。
- [TinyBase 8.4](https://tinybase.org/guides/releases/) – local-first 响应式数据存储，现已完整支持 [SolidJS](https://www.solidjs.com/)。
- [Sugar High 1.2](https://sugar-high.vercel.app/) – 1KB JS/JSX 语法高亮器。
- [Mantine 9.3](https://mantine.dev/changelog/9-3-0/) – 流行 React 组件套件。

## 📢 生态圈动态

- 编程语言传奇 [▶️ Anders Hejlsberg 做客 The Pragmatic Engineer](https://www.youtube.com/watch?v=K-Xv8D8NjTk)，畅谈 TypeScript、JavaScript 的优劣以及他如何使用 AI。
- Kyle Simpson（[YDKJS](https://github.com/getify/you-dont-know-js) 作者）介绍了 [@gql-x/Composer](https://github.com/gql-x/Composer)——动态组合 GraphQL 查询字符串的 JS DSL。
- 新的网站跟踪手段：[利用 Origin Private File System 分析 SSD 使用情况](https://arstechnica.com/security/2026/05/websites-have-a-new-way-to-spy-on-visitors-analyzing-their-ssd-activity/)。
- 🤖 [2026 年 Web 开发 AI 使用状况调查结果](https://2026.stateofai.dev/en-US)，超过 7000 名开发者参与。
