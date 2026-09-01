---
updated: 2026/06/24 17:06:06
date: 2026/06/24 17:06:06
categories: 
  - javascriptweekly
title: issue-776
post_title: issue-776
comments: true
description: JavaScript Weekly #776TypeScript 6.0 RC 和 Solid 2.0 Beta 到来 2026年3月10日 在线阅读🎯 头条Solid v2.0.0 Beta： 结束了经过漫长的实验阶段，Solid 2.0 首个 beta 带来了一等公民异步支持：计算可以返回 Promise 或异步可迭代对象，响应式图在它们周围原生挂起和恢复。
---
# JavaScript Weekly #776
**TypeScript 6.0 RC 和 Solid 2.0 Beta 到来**
*2026年3月10日*
[在线阅读](https://javascriptweekly.com/issues/776)

## 🎯 头条

### [Solid v2.0.0 Beta：`<Suspense>` 结束了](https://github.com/solidjs/solid/releases/tag/v2.0.0-beta.0)

经过漫长的实验阶段，Solid 2.0 首个 beta 带来了一等公民异步支持：计算可以返回 Promise 或异步可迭代对象，响应式图在它们周围原生挂起和恢复。`<Suspense>` 被 `<Loading>` 替代（用于初始渲染），mutation 获得一等公民 `action()` 原语并支持乐观更新。对现有用户来说破坏性变更很大，但有[迁移指南](https://github.com/solidjs/solid/blob/next/documentation/solid-2.0/MIGRATION.md)。

*— Ryan Carniato*

### [TypeScript 6.0 Release Candidate](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-rc/)

v6.0 主要是为今年晚些时候推出的 Go 驱动 TypeScript 7.0 做的过渡版本，所有必要的 `tsconfig.json` 变更将让你为未来做好准备。RC 相比近期 beta [只有少量变化](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-rc/#what%E2%80%99s-new-since-the-beta)。

*— Daniel Rosenwasser (Microsoft)*

## 📋 简报

- [TC39 第 113 次会议已经开始](https://github.com/tc39/agendas/blob/main/2026/03.md)，[将 Temporal API 推进到 Stage 4](https://ptomato.name/talks/tc39-2026-03/) 是重点议程。
- 📊 [压缩基准测试](https://github.com/privatenumber/minification-benchmarks) 是不同 JS 压缩器的频繁更新对比。[SWC](https://github.com/swc-project/swc) 整体领先，但 [Minify](https://github.com/tdewolff/minify) 和 [Oxc](https://github.com/oxc-project/oxc) 的压缩器也不远且快得多。
- [11ty (Eleventy)](https://www.11ty.dev/) 最初是 Node.js 静态网站生成器，现在正在[转变为 Build Awesome](https://www.11ty.dev/blog/build-awesome/)，[Font Awesome](https://fontawesome.com/) 旗下的项目。
- 🇫🇷 [dotJS 大会](https://www.dotjs.io/) 9 月 1 日巴黎。[CFP](https://www.dotjs.io/speak) 开放至 4 月 28 日。

## 📦 版本发布

- [Node.js 25.8.0 (Current)](https://nodejs.org/en/blog/release/v25.8.0) – 新增 [`--permission-audit` 选项](https://github.com/nodejs/node/pull/61869)，以仅警告模式运行 Node [权限模型](https://nodejs.org/api/permissions.html)。
- [Astro 6.0](https://astro.build/blog/astro-6/) – `astro dev` 现使用 Vite 新的 Environment API，开发期间可运行精确的生产运行时。新的 Fonts API 处理自定义字体。
- [Knockout 3.5.2](https://github.com/knockout/knockout/releases/tag/v3.5.2) – 经典 MVVM 库六年来首次更新！
- [ESLint v10.0.3](https://eslint.org/blog/2026/03/eslint-v10.0.3-released/) 和 [ESLint v9.39.4](https://eslint.org/blog/2026/03/eslint-v9.39.4-released/)
- [Ember 6.11](https://blog.emberjs.com/ember-released-6-11/)、[Ionic Framework 8.8](https://ionic.io/blog/announcing-ionic-framework-8-8)、[React Native 0.85 RC.0](https://github.com/facebook/react-native/releases/tag/v0.85.0-rc.0)、[pnpm v10.32.0](https://github.com/pnpm/pnpm/releases/tag/v10.32.0)、[Recharts 3.8](https://github.com/recharts/recharts/releases/tag/v3.8.0)、[Jest 30.3](https://github.com/jestjs/jest/releases/tag/v30.3.0)

## 📖 文章与视频

### [七年到 TypeScript：Patreon 迁移 11000 个文件](https://www.patreon.com/posts/seven-years-to-typescript-152144830)

流行的创作者平台手上有 100 万行 JavaScript，虽然新代码采用 TypeScript 进展顺利，但转换*全部*代码是一项艰巨任务。这篇回顾涵盖了所涉及的工具和技术。

*— Gavy Aggarwal (Patreon)*

### [通过开 GitHub Issue 窃取 npm 发布 Token 的故事](https://neciudan.dev/cline-ci-got-compromised-here-is-how)

一个仓库有一个 AI 驱动的 Issue 分类系统，当任何 Issue 被打开时运行——Issue 的标题被直接输入提示词……而这只是此处解释的三阶段攻击的第一步。

*— Neciu Dan*

### [Wikipedia 遭自我传播 JavaScript 蠕虫攻击](https://www.bleepingcomputer.com/news/security/wikipedia-hit-by-self-propagating-javascript-worm-that-vandalized-pages/)

一份关于一段休眠脚本如何被 Wikimedia 员工意外触发，利用共享全局脚本破坏 Wikipedia *Meta-Wiki* 上近 4000 个页面的报道。

*— Lawrence Abrams (Bleeping Computer)*

## 🛠 代码与工具

### [RevoGrid：高性能数据网格组件](https://rv-grid.com/)

为海量数据集构建的高性能数据网格控件。支持 Vue、Angular、React、Svelte 或原生 JS。[在线演示](https://rv-grid.com/demo/)和 [GitHub 仓库](https://github.com/revolist/revogrid)。

*— Revolist OU*

### [ArkType 2.2：将 TypeScript 类型用作运行时校验器](https://arktype.io/docs/blog/2.2)

TypeScript 优先的校验库，类型和校验器合二为一。v2.2 中 `type.fn` 带来运行时校验的*函数*，自动检查输入和返回值。

*— ArkType*

### [TinyBase 8.0：local-first 应用的响应式数据存储](https://tinybase.org/)

可用作整个后端的响应式数据存储和同步引擎。可独立运行或[集成各种东西](https://tinybase.org/guides/the-basics/architectural-options/)如云存储、客户端存储、SQL 数据库等。[v8.0](https://tinybase.org/guides/releases/#v8-0) 新增中间件功能，cell 中可存储对象和数组。

*— James Pearce*

### 📄 [VMPrint：纯 JS 排版引擎，完美 PDF 输出](https://github.com/cosmiciron/vmprint)

常见的做法是使用无头 Chrome 实例进行打印到 PDF 的工作，但 VMPrint*「保证相同输入产生相同布局，精确到每个字形的亚点位置。」*[示例 PDF](https://github.com/cosmiciron/vmprint/blob/main/documents/readme-assets/readme.pdf)。

*— Cosmic Iron*

- [SQLite JS 1.3](https://github.com/sqliteai/sqlite-js) – 用 JavaScript 编写自定义 SQLite 函数。
- [Heapify 1.0](https://github.com/luciopaiva/heapify) – 使用二叉堆实现的快速 JS 优先队列。
- 📺 [OpenPlayer.js 3.0](https://github.com/openplayerjs/openplayerjs) – 模块化、可 tree-shaking 的 HTML5 媒体播放器。
- [Emittery 2.0](https://github.com/sindresorhus/emittery) – Sindre Sorhus 的简单现代异步事件发射器。
- [Svelte Sonner 1.1](https://github.com/wobsoriano/svelte-sonner) – Svelte 应用 Toast 通知组件。
- 📄 [EmbedPDF 2.8](https://github.com/embedpdf/embed-pdf-viewer) – 框架无关 JS PDF 查看器。
- [Tabulator 6.4](https://tabulator.info/) – JS 应用交互式数据表。
- 🕹️ [melonJS 18.0](https://melonjs.org/) – 轻量 HTML5 2D 游戏引擎。
- [flatted 3.4](https://github.com/WebReflection/flatted) – 快速、最小化的循环 JSON 解析器。
- [Poku 4.0](https://poku.io/) – 跨平台测试运行器。

## 📢 生态圈动态

- [JSLinux](https://bellard.org/jslinux/)，[Fabrice Bellard](https://bellard.org/) 的 JavaScript 驱动的浏览器内 Linux 虚拟机，现在支持 x86_64、AVX-512 和 APX。进入[完整的 x86_64 Alpine Linux 环境](https://bellard.org/jslinux/vm.html?cpu=x86_64&url=alpine-x86_64.cfg&mem=256)，立即开始使用 Git、Node、Ruby、Perl、Python 等。
- 你知道[可以在 URL 中使用换行和制表符](https://lemire.me/blog/2026/02/28/you-can-use-newline-characters-in-urls/)且它们会被忽略吗？
- 在 NVIDIA Jetson Nano 上[编译 Node.js 需要约 27 小时](https://brtkwr.com/posts/2026-03-02-upgrading-openclaw-to-latest-node22-on-jetson-nano/)。
- [如何用 CSS 零 JavaScript 重现 Flappy Bird 游戏](https://blog.scottlogic.com/2026/03/09/noJS-3-flappy-bird.html)。
