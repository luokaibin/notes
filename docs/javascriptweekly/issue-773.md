# JavaScript Weekly #773
**Electrobun v1：基于 Bun 的桌面应用，12MB 包体**
*2026年2月17日*
[在线阅读](https://javascriptweekly.com/issues/773)

## 🎯 头条

### [TanStack Hotkeys：类型安全的跨平台快捷键库](https://tanstack.com/hotkeys/latest)

[TanStack 家族](https://tanstack.com/)迎来新成员：*Hotkeys*，alpha 阶段的通用键盘交互工具包。处理跨环境差异，支持多步序列（如 Vim 命令或作弊码），还能录制用户快捷键。[完整介绍](https://tanstack.com/hotkeys/latest/docs/overview)。

*— TanStack LLC*

### [TypeScript 6.0 Beta 发布](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-beta/)

v6.0 主要是*「清理 tsconfig」*的版本，旨在桥接到今年晚些时候的 [Go 驱动 TypeScript 7](https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/)。`types` 默认 `[]`、`--strict` 现在默认 true，以及[更多破坏性变更和弃用](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-beta/#breaking-changes-and-deprecations-in-typescript-6.0)。

*— Microsoft*

## 📋 简报

- 📊 [State of React 调查结果](https://2025.stateofreact.com/en-US)发布。
- 🤖 [Google 展示 WebMCP 预览](https://developer.chrome.com/blog/webmcp-epp)，尝试创建一种标准方式让网站为 AI Agent 提供能力。

## 📦 版本发布

- [Biome 2.4](https://biomejs.dev/blog/biome-v2-4/) – 格式化/lint 工具现可处理 JS 文件中嵌入的 CSS 和 GraphQL，改进 Vue 和 Svelte 支持，新增 HTML 无障碍 lint 规则。
- [React Native 0.84](https://reactnative.dev/blog/2026/02/11/react-native-0.84) – Hermes V1 成为 iOS 和 Android 默认 JS 引擎，iOS 附带预编译二进制文件，React 19.2.3。
- [Node.js 25.6.1 (Current)](https://nodejs.org/en/blog/release/v25.6.1) 和 [Node.js 24.13.1 (LTS)](https://nodejs.org/en/blog/release/v24.13.1)
- [sql.js v1.14.0](https://sql.js.org/) – SQLite 编译为 JavaScript。

## 📖 文章与视频

### [CodeMirror 实验](https://aziis98.com/blog/codemirror-review-tool/)

[CodeMirror](https://codemirror.net/) 是最健壮的代码编辑器组件之一，而且非常*可扩展*，本文展示了为其构建类 VSCode「变更审查」功能的过程。

*— Antonio De Lucreziis*

### [如何在 Node.js 中发起 HTTP 请求](https://nodejsdesignpatterns.com/blog/nodejs-http-request/)

在生产环境中使用 `fetch` 的全面指南，涵盖超时、流式请求和响应、重试、并发、模拟等。大部分内容在更广泛的 JavaScript 语境中也有用。

*— Luciano Mammino*

### [在十亿行规模实现虚拟滚动](https://rednegra.net/blog/20260212-virtual-scroll/)

构建能处理数十亿行数据的表格组件（[HighTable](https://github.com/hyparam/hightable)）所面临的众多挑战。

*— Sylvain Lesage*

### [JS 重型方案与长期性能目标不兼容](https://sgom.es/posts/2026-02-13-js-heavy-approaches-are-not-compatible-with-long-term-performance-goals/)

Automattic 的一位 Web 性能工程师为反对 JS 重型架构、支持更以服务端为中心的方法进行了论证。

*— Sérgio Gomes*

## 🛠 代码与工具

### [Electrobun v1：基于 Bun 的桌面应用方案](https://blackboard.sh/blog/electrobun-v1/)

跨平台 JS/TS 桌面应用运行时。使用操作系统默认 Web 渲染器（类似 [Neutralinojs](https://neutralino.js.org/)），[Bun](https://bun.sh/) 作为幕后引擎和打包器。生成的包体小至 12MB。（[主页](https://blackboard.sh/electrobun/docs/)和 [GitHub 仓库](https://github.com/blackboardsh/electrobun)）。

*— Blackboard*

### [fetch-network-simulator：拦截 fetch 模拟恶劣网络条件](https://github.com/thisiskps/fetch-network-simulator)

核心是一个拦截 `fetch` 并应用规则的库：丢弃随机请求、延迟或放慢它们，以测试应用的韧性。

*— Karn Pratap Singh*

### [Peek：智能页面头部行为的轻量库](https://adesignl.github.io/Peek/)

在页面上可以看到效果。它「智能」之处在于区分微小无意的滚动和有意滚动。可自定义阈值和延迟，兼容任何框架。[仓库](https://github.com/adesignl/Peek)。

*— Chad Pierce*

### 🏎️ [Rari：运行时加速的渲染基础设施](https://rari.build/)

React Server Components 框架 + Rust 驱动的服务端运行时，目标更高吞吐量和更低延迟。[入门指南](https://rari.build/docs/getting-started)可帮你了解。

*— Ryan Skinner*

### [Broad Infinite List：React 和 Vue 的双向无限列表](https://suhaotian.github.io/broad-infinite-list/)

在两个方向上流畅流式传输日志、动态更新或聊天记录，无布局偏移。

*— suhaotian*

- 📊 [Perspective 4.2](https://github.com/perspective-dev/perspective) – 面向大型/流式数据集的交互式分析和数据可视化组件。
- [Dockview 5.0](https://dockview.dev/) – 零依赖布局管理器，支持标签页、分组、网格和分体视图。
- ♟️ [Stockfish.js 18](https://github.com/nmrugg/stockfish.js) – Stockfish 国际象棋引擎的 WASM 移植版。
- [Ohm 17.5](https://github.com/ohmjs/ohm) – 构建解析器、解释器等的解析工具包。

## 📢 生态圈动态

- 🎨 [DPaint.JS](https://dpaint.app/) 发布了 [v0.2.0](https://dpaint.app/docs/#history)，经过两年开发，新增动画、触控笔支持、纹理画笔等。这款致敬传奇 Amiga 图形编辑器的项目没有像许多副项目那样消亡！
- [almostnode](https://almostnode.dev/) 是实验性项目，将 Node.js 运行时环境带入浏览器。主页上的演示很精彩。
- 📊 超过 10 万个网站的数据提炼为[现代 CSS 使用报告](https://www.projectwallace.com/the-css-selection/2026)。每个网站 CSS 规则中位数 2802 条，有一个页面用了 210695 条！
- 🕹️ Three.js 创建者不满足于[将 Quake 移植到浏览器](https://mrdoob.github.io/three-quake/)，又尝试了 [Descent 的移植](https://mrdoob.github.io/three-descent/)（[源码](https://github.com/mrdoob/three-descent)）。
- 🤖 [用一群 Agent 可以重现类似 SQLite 的东西吗？](https://kiankyars.github.io/machine_learning/2026/02/12/sqlite.html) Kian Kyars 尝试了一下，作为 Agent 协调实验的一部分。
- Cloudflare 正在推出[允许 Agent 从 Cloudflare 站点直接获取 Markdown 的功能](https://blog.cloudflare.com/markdown-for-agents/)。
