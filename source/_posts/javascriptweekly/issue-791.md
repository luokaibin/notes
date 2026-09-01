---
updated: 2026/06/24 16:54:56
date: 2026/06/24 16:57:38
categories: 
  - javascriptweekly
title: issue-791
post_title: issue-791
comments: true
description: JavaScript Weekly #791Babel 8.0、Vite 8.1 和 TypeScript 7.0 RC 2026年6月23日 在线阅读🎯 头条用 Deno Desktop 构建桌面应用Deno 2.9（或当前的 canary 版本）可以将 JavaScript 项目转成 macOS、Windows 和 Linux 上的独立应用。与 Electron 不同，你可以选择使用操作系统的默认 WebView 
---
# JavaScript Weekly #791
**Babel 8.0、Vite 8.1 和 TypeScript 7.0 RC**
*2026年6月23日*
[在线阅读](https://javascriptweekly.com/issues/791)

## 🎯 头条

### [用 Deno Desktop 构建桌面应用](https://docs.deno.com/runtime/desktop/)

Deno 2.9（或当前的 canary 版本）可以将 JavaScript 项目转成 macOS、Windows 和 Linux 上的独立应用。与 Electron 不同，你可以选择使用操作系统的默认 WebView *或* 内置的 Chromium 后端，此外还支持交叉编译，并自动适配基于 Next.js、SvelteKit 等框架构建的应用。

*— The Deno Project*

> 📉 文章里没提，但 `--compress` 选项能大幅减小包体——我测试一个基础应用时，从 65MB 降到了 19MB。

### [Babel 8.0 发布：JavaScript 转译器](https://babeljs.io/blog/2026/06/16/8.0.0/)

距离 Babel 7.0 已经过去了*八年*，尽管 SWC 和 Oxc 等工具崛起，`@babel` 包的周下载量反而增长了 380 倍。v8.0 是一个现代化版本：纯 ESM，默认编译目标为 ~ES2023（之前是 ES5）。

*— Babel Team*

### [TypeScript 7.0 Release Candidate](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/)

Go 驱动的 TypeScript 编译器又近了一步，承诺构建性能提升约 10 倍。*（我在社交媒体上看到大家对此非常兴奋。）*

*— Daniel Rosenwasser (Microsoft)*

## 📋 简报

- Cloudflare 新增了[在「临时账户」上创建和部署 Workers](https://blog.cloudflare.com/temporary-accounts/)的功能。名义上是「为 AI Agent 准备的」，但你也可以自己用，无需绑定即可运行 Worker 60 分钟。
- TC39 代表 Luca Casonato 提出了[为 `<time>` 元素添加内置本地化时间格式](https://github.com/whatwg/html/issues/12591)的提案，类似于 GitHub 的 [`<relative-time>` 元素](https://github.com/github/relative-time-element)。
- 🤖 [MDN 推出了官方 MCP Server](https://developer.mozilla.org/en-US/blog/introducing-mdn-mcp-server/)，为编程 Agent 提供更好的 MDN 最新 JavaScript 和前端文档访问。
- Bun 团队提议[为 JavaScriptCore 添加共享内存线程](https://github.com/oven-sh/WebKit/pull/249)（相比 worker threads 更传统的线程方案）。

## 📦 版本发布

- ⭐ [Vite 8.1](https://vite.dev/blog/announcing-vite8-1) – 实验性支持「打包开发模式」，大幅提升大型应用的开发服务器启动和全量重载速度。同时新增 [WASM/ESM 集成](https://github.com/WebAssembly/esm-integration/blob/main/proposals/esm-integration/README.md)支持。
- ⭐ [Astro 7.0](https://astro.build/blog/astro-7/) – 这款流行 Web 框架获得更快的构建速度，`.astro` 编译和 Markdown/MDX 处理通过 Rust 驱动管线完成。*高级路由*让你完全掌控请求管线。
- [pnpm 11.7](https://pnpm.io/blog/releases/11.7) 和 [11.8](https://github.com/pnpm/pnpm/releases/tag/v11.8.0) – `pnpm install` 新增 `--dry-run` 选项，`--frozen-store` 支持只读包存储等。
- [Node.js v26.3.1 (Current)](https://nodejs.org/en/blog/release/v26.3.1)、[v24.17.0 (LTS)](https://nodejs.org/en/blog/release/v24.17.0) 和 [v22.23.0 (LTS)](https://nodejs.org/en/blog/release/v22.23.0)

## 📖 文章与视频

### [一个被低估的重构如何节省 90% 内存](https://tanstack.com/blog/tanstack-table-v9-memory-performance)

[TanStack Table](https://tanstack.com/table/latest) v9 比 v8 在处理大表格时使用更少内存，秘诀很简单：将方法存储在共享原型上，而不是为每个对象都创建一份。附有性能基准，其他库也可以借鉴这种模式。

*— Kevin Van Cott (TanStack)*

- 📄 [`window.showDirectoryPicker` 打开了新世界的大门](https://steveharrison.dev/showdirectorypicker-opens-up-a-whole-new-world/) – Chrome 86+ 提供了一个让用户[为 Web 应用开放本地目录](https://web.dev/patterns/files/open-a-directory)的方法。*— Steve Harrison*
- 📄 [什么是 Git Worktree，为什么要用它？](https://github.blog/ai-and-ml/github-copilot/what-are-git-worktrees-and-why-should-i-use-them/) – 这个已有十年历史的 `git` 功能在 AI Agent 时代重新受到关注。*— Cassidy Williams (GitHub)*
- 📄 [TanStack Start：面向 Next.js 开发者的心智模型](https://www.adarsha.dev/blog/tanstack-mental-model-for-nextjs-developers) – 通过并排代码对比将 TanStack Start 映射到 Next.js 概念上。*— Adarsha Acharya*

## 🛠 代码与工具

### [FullCalendar 7.0：全功能 JavaScript 日历](https://fullcalendar.io/)

为你的应用带来 Google Calendar 式的体验。支持 React、Vue 和 Angular（[v7.0](https://github.com/fullcalendar/fullcalendar/releases/tag/v7.0.0) 新增 Angular 22 支持），也可使用纯 JavaScript。[这里有演示](https://themes.fullcalendar.io/)可以体验各种主题和样式方案。MIT 许可，商业扩展需付费。

*— FullCalendar LLC*

### 🤖 [Eve：像 Next.js，但是用来构建 Agent](https://vercel.com/blog/introducing-eve)

Vercel 推出的新框架，用 TypeScript 和 Markdown 为构建 AI Agent 提供类似 Next.js 的结构化开发体验。

*— Vercel*

### [ForesightJS 4：Web 预测性用户意图库](https://foresightjs.com/)

通过指针和键盘信号预测用户意图，提前预取内容，带来更流畅的用户体验。[v4.0](https://github.com/spaansba/ForesightJS/releases/tag/V4.0) 新增官方 React 和 Vue 包，[v4.2](https://github.com/spaansba/ForesightJS/releases/tag/V4.2.0) 添加了声明式 `<Foresight>` 组件。

*— ForesightJS, Inc.*

### [Prop For That：JS 知道的，现在 CSS 也能用](https://nerdy.dev/prop-for-that)

让 CSS 能访问通常需要 JS 才能获取的值（如指针位置、时间、滑块值）。在 HTML 上添加属性，实时值即作为 CSS 自定义属性出现，弥合 JS 与 CSS 之间的鸿沟。[演示页面](https://prop-for-that.netlify.app/)很赞。

*— Adam Argyle*

### [Kage：克隆网站供离线查看](https://kage.tamnd.com/)

克隆网站并提供离线查看的工具。与「另存为」的区别在于它使用无头浏览器保存 DOM，能处理 JS 渲染的网站。[仓库](https://github.com/tamnd/kage)。

*— Duc-Tam Nguyen*

### [goja：纯 Go 实现的 ECMAScript/JavaScript 引擎](https://github.com/dop251/goja)

成熟的 JavaScript 引擎，为 Go 应用添加脚本功能，无需 CGo/V8。

*— Dmitry Panov*

- [Anime.js 4.5](https://github.com/juliangarnier/anime/releases/tag/v4.5.0) – 强大动画引擎[新增适配器](https://animejs.com/documentation/adapters/)支持非 DOM 对象动画（如 Three.js 网格或 Canvas 上下文）。
- [Ink 7.1](https://github.com/vadimdemedes/ink/releases/tag/v7.1.0) – 流行 TUI 渲染器[新增 `suspendTerminal()`](https://github.com/vadimdemedes/ink/pull/972)可临时将终端交给子进程（如编辑器）。
- [Nuxt UI 4.9](https://github.com/nuxt/ui/releases/tag/v4.9.0) – Vue UI 库改进日历组件，统一焦点样式，新增 `useTour` 用于引导式导览。
- [Nx 23.0](https://github.com/nrwl/nx/releases/tag/23.0.0) – monorepo 工具的年度大版本。现在 `nx migrate` 可将迁移工作交给 AI Agent。
- ☀️ [SunCalc 2.0](https://github.com/mourner/suncalc) – 计算太阳和月亮的位置与相位。

## 📢 生态圈动态

- 有开发者将 [Signal 实现代码高尔夫到仅 33 字节](https://gist.github.com/GulgDev/7b113b5e971682a6512d96c9c0fdf6da)。一位 Reddit 用户[详细解析了其中的原理](https://www.reddit.com/r/javascript/comments/1uc0scy/33byte_js_signal_implementation/ot4dm0o/)。
- 🔒 GitHub 发布了 [actions/checkout v7](https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/)，*「默认拒绝常见的 pwn 请求模式」*，包括在 `pull_request_target` 和 `workflow_run` 工作流中拒绝拉取 fork 的 PR 代码。
- 如果你是 GitHub 项目维护者且被 PR 淹没，[GitHub 现在可以限制单个用户同时打开的 PR 数量](https://github.blog/open-source/maintainers/how-pull-request-limits-are-cutting-down-the-noise/)。
- Tim Wehrle [把整个网站存进了 favicon](https://www.timwehrle.de/blog/i-stored-a-website-in-a-favicon/)。为什么？为什么不呢？
