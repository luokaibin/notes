---
updated: 2026/06/24 16:59:41
date: 2026/06/24 16:59:41
categories: 
  - javascriptweekly
title: issue-784
post_title: issue-784
comments: true
description: JavaScript Weekly #784Remix 3 抛弃 React 2026年5月5日 在线阅读🎯 头条Remix 3 进入 Beta——不再是 React 框架Remix 的故事颇为曲折。由 React Router 二人组于 2020 年创建，被视为 Next.js 的替代方案
---
# JavaScript Weekly #784
**Remix 3 抛弃 React**
*2026年5月5日*
[在线阅读](https://javascriptweekly.com/issues/784)

## 🎯 头条

### [Remix 3 进入 Beta——不再是 React 框架](https://remix.run/blog/remix-3-beta-preview)

Remix 的故事颇为曲折。由 React Router 二人组于 2020 年创建，被视为 [Next.js 的替代方案](https://bejamas.com/hub/guides/remix-vs-nextjs)，2022 年[被 Shopify 收购](https://techcrunch.com/2022/10/31/shopify-acquires-remix-to-bolster-its-storefront-design-tools/)，核心思想于 2024 年融入 [React Router v7](https://remix.run/blog/react-router-v7)。现在，新方向来了：一个全栈、Web 标准优先的框架，拥有自己的 UI 组件模型，不再依赖 React。

*— Michael Jackson (Remix)*

### [Node.js 26.0.0 (Current) 发布](https://nodejs.org/en/blog/release/v26.0.0)

macOS 构建问题导致发布推迟到今天，但最新版 Node 终于到来：[Temporal API](https://bloomberg.github.io/js-blog/post/temporal/) 默认启用、V8 14.6、Undici 8。v26 是「current」前沿版本，10 月将晋升为 LTS。

*— Rafael Gonzaga*

## 📋 简报

- [Vitest](https://vitest.dev/) 紧密耦合于 Vite，但维护者[提议使其「框架无关」](https://github.com/vitest-dev/vitest/discussions/10271)以支持其他构建工具和运行时。
- Hacker News 上[激烈讨论](https://news.ycombinator.com/item?id=48016880) Bun 的 Jarred Sumner [将 Bun 从 Zig 移植到 Rust](https://github.com/oven-sh/bun/commit/46d3bc29f270fa881dd5730ef1549e88407701a5)。Jarred [现身](https://news.ycombinator.com/item?id=48019226)降温：Rust 移植*尝试中*，但暂时没有长期切换计划。
- Svelte 团队[分享最新月度动态](https://svelte.dev/blog/whats-new-in-svelte-may-2026)，Svelte 出现在 ThoughtWorks [最新技术雷达](https://www.thoughtworks.com/radar/languages-and-frameworks/summary/svelte)中。
- Deno 获得[实验性 import defer 支持](https://github.com/denoland/deno/pull/32360)（[TC39 提案](https://github.com/tc39/proposal-defer-import-eval)），可能是首个支持该特性的运行时。

## 📦 版本发布

- [PM2 7.0](https://github.com/Unitech/pm2/releases/tag/v7.0.0) – Node.js 进程管理器重构，大幅减少依赖，集群模式扩展至 Bun 应用。
- [Astro v7 Alpha](https://astro.build/blog/astro-620/#astro-v7-alpha) – 基于 Vite 8、Rust 编译器驱动的版本预览。同时 [v6.2](https://astro.build/blog/astro-620/) 发布。
- [Electron 41.5](https://github.com/electron/electron/releases/tag/v41.5.0) – 新增 macOS 上 WebAuthn 的 Touch ID 支持。
- [Ember 6.12](https://blog.emberjs.com/ember-released-6-12/) – 为 Ember 7.0 做准备的最终 6.x 版本。
- [ESLint 10.3](https://eslint.org/blog/2026/05/eslint-v10.3.0-released/)、[Zod 4.4](https://github.com/colinhacks/zod/releases/tag/v4.4.0)、[Babylon.js 9.5](https://github.com/BabylonJS/Babylon.js/releases/tag/9.5.0)

## 📖 文章与视频

### [在浏览器中测试 Vue 组件](https://jvns.ca/blog/2026/05/02/testing-vue-components-in-the-browser/)

Julia 为她的组件设置了完全在浏览器中运行的集成测试，绕过了多余的额外工具，分享了组件挂载、等待 DOM、填写表单和测量覆盖率方面的问题。

*— Julia Evans*

### [面向开放 Web 的可信 JavaScript](https://hacks.mozilla.org/2026/05/trustworthy-javascript-for-the-open-web/)

WAICT（Web 应用完整性、一致性与透明度）是一个新兴规范，用于加密验证浏览器中运行的 JavaScript 是否与网站发布的一致（[完整说明](https://blog.cloudflare.com/improving-the-trustworthiness-of-javascript-on-the-web/)）。Firefox Nightly 已有原型。

*— Firefox 安全团队 (Mozilla)*

## 🛠 代码与工具

### [Anime.js 4.4：灵活的 JavaScript 动画引擎](https://animejs.com/)

这款已有十年的库继续进化，新增 [scrambleText 效果](https://animejs.com/documentation/text/scrambletext/)和交错网格的[自动网格布局模式](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid)。[文档](https://animejs.com/documentation/getting-started)极其出色，示例丰富。

*— Julian Garnier*

### [Formisch：模块化、类型安全的表单库](https://github.com/open-circle/formisch)

基于 schema 的无头表单库，面向 Preact、Qwik、React、SolidJS、Svelte 和 Vue，管理表单状态和校验（使用 Valibot）。[在线 playground](https://formisch.dev/playground/) 可试玩。

*— Open Circle*

### [opentype.js：读写 OpenType 字体](https://opentype.js.org/)

在浏览器和 Node.js 中直接访问字形。支持 WOFF、OTF、TTF，支持连字、字距和 emoji，还可以从头创建字体。新 [v1.3.5](https://github.com/opentypejs/opentype.js/releases/tag/1.3.5) 是即将发布的 2.0 预览版。[GitHub 仓库](https://github.com/opentypejs/opentype.js)。

*— Frederik De Bleser*

### [View Transitions Mock：同文档视图过渡的非视觉 polyfill](https://github.com/GoogleChromeLabs/view-transitions-mock)

Same-Document View Transitions 的 JS 实现（不含视觉效果）。写一份干净代码：支持的浏览器获得过渡效果，不支持的获得即时 DOM 替换，但 Promise 行为一致。

*— Google Chrome Labs*

- 🎬 [Mediabunny v1.42.0](https://github.com/Vanilagy/mediabunny/releases/tag/v1.42.0) – 浏览器中读写转换音视频文件，v1.42 新增 HLS 读写支持。
- [pnpm v11.0.5](https://github.com/pnpm/pnpm/releases/tag/v11.0.5) – 自上周 [11.0 大版本](https://pnpm.io/blog/releases/11.0)以来的大量 bugfix。
- [Electrobun 1.18](https://blackboard.sh/electrobun/docs/) – 基于 Bun 构建微型跨平台桌面应用（[更新日志](https://docs.electrobunny.ai/electrobun/guides/changelog/v1-18-0/)）。
- [useHotkeys 5.3](https://github.com/JohannesKlauss/react-hotkeys-hook) – 组件中使用键盘快捷键的 React hook。
- [RxDB 17.2.0](https://github.com/pubkey/rxdb/releases/tag/17.2.0) – 快速、local-first、响应式 JS 数据库。

## 📢 生态圈动态

- 🚗 [Crashcat](https://crashcat.dev/)：JavaScript 3D 刚体物理库，主页让你化身一只猫开着敞篷车穿越无尽障碍。有[众多有趣的示例](https://crashcat.dev/examples/)。
- ✉️ Cloudflare [开源了 Agentic Inbox](https://github.com/cloudflare/agentic-inbox)，基于 React 19 和 React Router 7 的自托管 Web 邮件应用。
- [Ladybird](https://ladybird.org/) 是「真正独立的浏览器」，渲染器和 JS 引擎完全从零构建，alpha 版将于年内发布。[最新进展](https://ladybird.org/newsletter/2026-04-30/)涵盖 JS 和 CSS 的重大改进。
- 厌倦了 `localhost:3000`？Vercel 的 [Portless](https://github.com/vercel-labs/portless) 让你用更友好的 `.localhost` 主机名 + HTTPS 运行本地开发服务器。
- [Thales](https://github.com/jessealama/thales)：TypeScript 到 [Lean](https://lean-lang.org/) 的编译器，将代码转为可进行形式化推理的 Lean 模块。
