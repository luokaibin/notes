---
updated: 2026/06/24 17:05:03
date: 2026/06/24 17:05:03
categories: 
  - javascriptweekly
title: issue-778
post_title: issue-778
comments: true
description: JavaScript Weekly #778TypeScript 6.0、Next.js 16.2 和一个新的 Node.js 运行时 2026年3月24日 在线阅读🎯 头条TypeScript 6.0 发布经过六个多月的开发，TypeScript 6.0 旨在桥接其自托管编译器
---
# JavaScript Weekly #778
**TypeScript 6.0、Next.js 16.2 和一个新的 Node.js 运行时**
*2026年3月24日*
[在线阅读](https://javascriptweekly.com/issues/778)

## 🎯 头条

### [TypeScript 6.0 发布](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

经过六个多月的开发，TypeScript 6.0 旨在桥接其自托管[编译器](https://github.com/microsoft/TypeScript/tree/main/src/compiler)与即将推出的 [Go 驱动 TypeScript 7.0 原生编译器](https://devblogs.microsoft.com/typescript/typescript-native-port/)之间的差距。*有*新功能（Temporal 改进、`RegExp.escape` 等），但最重要的是帮助你为 7.0 做准备的变更。

*— Daniel Rosenwasser (Microsoft)*

## 📋 简报

- 🤖 Node.js 社区正在争论 LLM 生成的代码在核心实现中应扮演什么角色，io.js 分支的创建者[发起请愿反对 AI 辅助的贡献](https://github.com/indutny/no-slop-in-nodejs-core)。
- 大量 [Deno](https://deno.com/) 员工[宣布](https://bsky.app/profile/marvinh.dev/post/3mhbtbl2ptk23)离职。Deno 员工 Josh Collinsworth（不代表公司）[表示](https://bsky.app/profile/collinsworth.dev/post/3mhdpgmoao22j)*「Deno 不会消失。只是艰难时期。」*
- 📗 [Chibivue](https://book.chibivue.land/) 是一个代码项目和配套在线书籍，提供并解释如何自己构建一个最小化的 Vue.js 实现。

## 📦 版本发布

- [Next.js 16.2](https://nextjs.org/blog/next-16-2) – React 框架 `next dev` 启动更快，渲染性能提升约 50%。
- [Storybook 10.3.0](https://github.com/storybookjs/storybook/releases/tag/v10.3.0) – 组件工坊新增 Vite 8、Next.js 16.2、ESLint 10 支持，以及 React 开发的 MCP Server 预览。
- ⚠️ 所有维护中的 Node.js 版本[今天晚些时候将有安全发布](https://nodejs.org/en/blog/vulnerability/march-2026-security-releases)，修复九个漏洞。
- [Deno 2.7.6](https://github.com/denoland/deno/releases/tag/v2.7.6) – `deno eval` 自动检测 CJS vs ESM，`--cpu-prof-flamegraph` 生成交互式 SVG 火焰图。
- [Bun 1.3.11](https://bun.com/blog/bun-v1.3.11)、[Valibot 1.3](https://valibot.dev/blog/valibot-v1.3-release-notes/)、[ESLint 10.1](https://eslint.org/blog/2026/03/eslint-v10.1.0-released/)

## 📖 文章与视频

### [JavaScript 膨胀的三大支柱](https://43081j.com/2026/03/three-pillars-of-javascript-bloat)

你的 `node_modules` 巨大的三个原因：不必要的 ES3 兼容包、单一消费者的微库、以及为早已内置的 API 准备的 [ponyfill](http://ponyfill.com/)！James（[e18e](https://e18e.dev/) 生态性能项目）提供了一些缓解策略。

*— James Garbutt*

### [用 TypeScript 重写 Rust+WASM 解析器如何让它更快](https://www.openui.com/blog/rust-wasm-parser)

表面上看违反直觉的结果，但 WASM-JS 边界会带来严重的性能惩罚，许多使用场景下留在 JS 世界可以快 2-4 倍。

*— Thesys 工程团队*

### 📊 [React SSR 框架性能对决](https://blog.platformatic.dev/react-ssr-framework-benchmark-tanstack-start-react-router-nextjs)

TanStack Start、React Router 和 Next.js 在重负载下的大规模基准测试。结果促成了对 TanStack 和 React 都有益的补丁。

*— Matteo Collina (Platformatic)*

### [React 两个开发者不喜欢但无法回避的设计选择](https://dev.to/playfulprogramming/two-react-design-choices-developers-dont-like-but-cant-avoid-d6g)

延迟状态提交和 Effects 的依赖数组导致了很多问题，但 Ryan 指出基于 Signal 的替代方案（如 Solid）只是通过保持同步来避开它们。

*— Ryan Carniato*

## 🛠 代码与工具

### [pnpm 11 Beta 0：抢先看](https://github.com/pnpm/pnpm/releases/tag/v11.0.0-beta.0)

[效率优先的 npm 替代品](https://pnpm.io/)在 JS 包管理领域持续发挥巨大影响力。转向 SQLite 驱动的存储、配置大修、默认更严格的构建安全策略。新增四条命令，包括 `pnpm sbom` 用于生成软件物料清单 JSON 文档。

*— pnpm 贡献者*

### [Edge.js：在 WebAssembly 沙箱中运行 Node 应用](https://wasmer.io/posts/edgejs-safe-nodejs-using-wasm-sandbox)

全新的 alpha 阶段运行时，保持完整 Node 兼容性，同时通过 WebAssembly 提供隔离。现有应用/模块无需修改即可运行，系统调用被沙箱化，JS 引擎可插拔（V8、JavaScriptCore 和 QuickJS 可选）。[主页更多信息](https://edgejs.org/)。

*— Syrus Akbary (Wasmer)*

### [ArrowJS 1.0：基于平台原语的快速响应式 UI 运行时](https://www.arrow-js.com/)

围绕 ES 模块、模板字面量和 DOM 构建，还可以将组件逻辑隔离在 WASM 沙箱中同时渲染内联 DOM。2022 年由 [FormKit](https://formkit.com/) 创建者首次亮相，现在显然正在稳步发展。

*— Justin Schroeder*

### [Sugar High 1.0：轻量 JSX 语法高亮器](https://sugar-high.vercel.app/)

不需要 React，可在任何地方高亮 JSX 代码片段。支持 CSS 主题。[GitHub 仓库](https://github.com/huozhi/sugar-high)。

*— Jiachi Liu*

- [htmlparser2 12.0](https://github.com/fb55/htmlparser2/releases/tag/v12.0.0) – 快速宽容的 HTML/XML 解析器。
- 🔊 [vue-audio-visual 3.1](https://github.com/staskobzar/vue-audio-visual) – Vue 3 HTML5 音频可视化组件（[演示](https://staskobzar.github.io/vue-audio-visual/)）。
- [Svelte SEO 2.1](https://github.com/artiebits/svelte-seo) – 优化 Svelte 应用的搜索引擎/社交媒体展示。
- [pnpm/action-setup 5.0](https://github.com/pnpm/action-setup) – 安装和配置 pnpm 的 GitHub Action。
- ☎︎ [vue-tel-input v9.8.0](https://github.com/iamstevendao/vue-tel-input) – 全球电话号码输入 Vue 组件（[演示](https://iamstevendao.com/vue-tel-input/)）。
- [Mediabunny 1.40.0](https://github.com/Vanilagy/mediabunny/releases/tag/v1.40.0) – 强大的媒体文件读写/转换工具包。
- 🗓️ [EventCalendar 5.5](https://github.com/vkurko/calendar) – 全尺寸拖放事件日历。
- [Maz UI 4.9](https://github.com/LouisMazel/maz-ui) – Vue 3 和 Nuxt 3 的轻量 UI 组件。
- [React Joyride 3.0](https://github.com/gilbarbara/react-joyride/releases/tag/v3.0.0) – 在 React 应用中创建引导式导览。

## 📢 生态圈动态

- VS Code 团队[分享了他们如何使用 AI 开发 VS Code](https://code.visualstudio.com/blogs/2026/03/13/how-VS-Code-Builds-with-AI)。如果你注意到 VS Code 现在每周发布一次，这就是原因！
- 🔒 [Secretlint](https://github.com/secretlint/secretlint) 是专门检测仓库中是否泄露密钥的 linter。
- 1989 年，Go 语言和 UTF-8 的联合创建者 Rob Pike 写了 [Rob Pike 的 5 条编程法则](https://www.cs.unc.edu/~stotts/COMP590-059-f24/robsrules.html)，本周走红，在 2026 年仍然适用。
- 🤖 [Addy Osmani 介绍理解债务](https://addyosmani.com/blog/comprehension-debt/)。在 Agent 生成代码的世界里，问题不再是*「如何生成更多代码？」*而是*「我们如何真正理解我们在发布什么？」*
-  不喜欢 macOS 26 (Tahoe) 引入的所有菜单图标？[有解决方案](https://mastodon.social/@stroughtonsmith/116262411548746327)：`defaults write -g NSMenuEnableActionImages -bool NO`
