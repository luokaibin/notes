# JavaScript Weekly #783
**JavaScript 到底更新了什么（以及接下来会有什么）**
*2026年4月28日*
[在线阅读](https://javascriptweekly.com/issues/783)

## 🎯 头条

### [pnpm 11.0 发布](https://pnpm.io/blog/releases/11.0)

你已经听说过[它的好处](https://pnpm.io/motivation)，现在这款流行的包管理工具更好了。v11 默认将 `minimumReleaseAge` 设为一天、SQLite 驱动的存储索引（更快安装！）、原生包发布、[pack-app](https://pnpm.io/11.x/cli/pack-app) 等。有 [v10 用户迁移指南](https://pnpm.io/11.x/migration)。Rust 移植版 *Pacquet* [的工作也已恢复](https://github.com/pnpm/pacquet)。

*— Zoltan Kochan*

### [TypeScript 7.0 Beta：10 倍更快的 TypeScript 编译](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/)

Go 驱动的移植版，编译器性能「约快 10 倍」。[TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) 的弃用和[配置变更](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/#updates-since-5.x-and-new-behaviors-from-6.0)将帮助从 v5 平滑升级到 v7。还有[代码编写方式的变更](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/#javascript-differences)需留意。v7 被认为是「接近生产就绪」，但稳定的程序化 API 要到 v7.1。

*— Microsoft*

## 📋 简报

- *Node.js v26.0 (Current)* 预计今天发布，升级到 V8 14.6 后默认启用 Temporal API。[发布说明预览](https://github.com/nodejs/node/pull/62526)。
- 注意到 GitHub 最近不太稳定吗？Vlad Fedorov 有[关于 GitHub 可用性的最新官方更新](https://github.blog/news-insights/company-news/an-update-on-github-availability/)。
- 🇪🇺 [NodeConf EU](https://www.nodeconf.eu/) 回归！9 月 29-30 日在意大利博洛尼亚。门票在售，[CFP 开放中](https://docs.google.com/forms/d/e/1FAIpQLSdhxLUxB5kW8NU5Dv6PM7vvQqKLcKed45AXvsXPGN8tIkzfkg/viewform)。

## 📦 版本发布

- [Rspack 2.0](https://rspack.rs/blog/announcing-2-0) – 快速 Rust webpack 兼容打包器，比 v1.7 快 10%，[更好的静态分析](https://rspack.rs/blog/announcing-2-0#better-tree-shaking)，[实验性 RSC 支持](https://rspack.rs/blog/announcing-2-0#rsc-support)。[Rsbuild 2.0](https://rsbuild.rs/blog/v2-0) 也发布了。
- [Nuxt UI 4.7](https://ui.nuxt.com/) – 125+ 组件的 Vue UI 库。v4.7 新增 [Listbox](https://ui.nuxt.com/docs/components/listbox) 和 [Prompt](https://ui.nuxt.com/docs/typography/prompt) 组件（用于展示可复制的 AI 提示词）。
- 🌐 [Lingui 6.0](https://lingui.dev/blog/2026/04/22/announcing-lingui-6.0) – 框架和运行时无关的 JS 国际化库。
- [Transformers.js 4.2.0](https://github.com/huggingface/transformers.js/releases/tag/4.2.0)、[Electron 41.3.0](https://github.com/electron/electron/releases/tag/v41.3.0)、[Etherpad v2.7.0](https://github.com/ether/etherpad/releases/tag/v2.7.0)

## 📖 文章与视频

### [JavaScript 到底更新了什么（以及接下来会有什么）](https://neciudan.dev/whats-new-in-javascript)

你可以读规范和无数的博文来了解每个语言新特性，或者……看这篇文章，它将 ES2025 和 ES2026 中所有相关和有用的内容汇集一处。涵盖 Iterator helpers、`Promise.try`、`Map.getOrInsert`、`using`、Temporal 等。

*— Neciu Dan*

## 🛠 代码与工具

### [TSRX：用于声明式 UI 的 TypeScript 语言扩展](https://tsrx.dev/)

Svelte 维护者和前 React 核心工程师打造的 JSX 改进方案。包含控制流、作用域样式和局部变量，编译到 React、Preact、Solid 和 [Ripple](https://www.ripple-ts.com/)。

*— Dominic Gannaway*

### 📊 [Lightweight Charts™ 5.2：金融数据快速图表](https://www.tradingview.com/lightweight-charts/)

七年的 Canvas 图表库，针对金融数据用例优化：[圆角蜡烛图](https://tradingview.github.io/lightweight-charts/plugin-examples/plugins/rounded-candles-series/example/)、[箱须图](https://tradingview.github.io/lightweight-charts/plugin-examples/plugins/box-whisker-series/example/)、[双范围柱状图](https://tradingview.github.io/lightweight-charts/plugin-examples/plugins/dual-range-histogram-series/example/)。主页有丰富的交互式演示。[GitHub 仓库](https://github.com/tradingview/lightweight-charts)。

*— TradingView*

### [Nano Stores 1.3：微型（286 字节）状态管理器](https://github.com/nanostores/nanostores)

原子化和派生式 store，面向所有主流框架（包括 React）和原生 JS。如果你看重极小体积和框架无关设计，值得关注。

*— Andrey Sitnik (Evil Martians)*

### [BWIP-JS 4.10：纯 JavaScript 条形码生成器](https://github.com/metafloor/bwip-js)

支持 100 多种不同标准的条形码生成。[在线演示](https://bwip-js.metafloor.com/demo/demo.html)会让你发现条形码的种类比你想象的更多。

*— Mark Warren*

### 🍋 [Fresh 2.3：默认零 JS、View Transitions 等](https://deno.com/blog/fresh-2.3)

Deno 全栈 Web 框架（[介绍](https://fresh.deno.dev/)）获得一流 WebSocket 支持，不再为不需要 JS 的页面发送*任何* JavaScript，使用 View Transitions API 只需在视图中添加一个属性。

*— Bartek Iwańczuk (Deno)*

- 🎬 [Mediabunny v1.41.0](https://github.com/Vanilagy/mediabunny) – 强大的 JS 媒体文件处理工具包。
- [hyperid 4.0](https://github.com/mcollina/hyperid) – Matteo Collina 的快速唯一 ID 生成器 for Node 和浏览器。
- [Svelte Bricks 0.5](https://bricks.janosh.dev/) – 支持 SSR 的 Svelte 瀑布流组件。
- [focus-trap 8.1](https://github.com/focus-trap/focus-trap) – 将焦点限制在 DOM 节点内（[演示](https://focus-trap.github.io/focus-trap/)）。
- [CheerpJ 4.3](https://labs.leaningtech.com/blog/cheerpj-4.3) – 在浏览器中运行未修改的 Java 应用。
- [qrcode.vue 3.9](https://github.com/scopewu/qrcode.vue) – 生成二维码的 Vue 组件。

## 📢 生态圈动态

- 🎵 [Chip Player JS](https://chiptune.app/) 是在线播放器和仓库，收录超过 30 万个 MIDI、tracker、chiptune 和视频游戏音乐文件。作背景音乐非常棒。我特别喜欢[《时空之轮》的原声](https://chiptune.app/browse/Nintendo%20SNES/Chrono%20Trigger/)。
- 📊 [Datatype](https://franktisellano.github.io/datatype/) 是 OpenType 可变字体，将简单文本表达式转为内联图表，无需 JS 或图片。例如：`{l:10,50,30,80,20}` 渲染为内联迷你图。
- 🤖 Cloudflare 的新工具 [Is Your Site Agent-Ready?](https://isitagentready.com/) 分析你的网站，*「看看它对 AI Agent 有多友好」*。
- 🤖 Cloudflare 发布了[一组 Agent 技能](https://github.com/cloudflare/skills)，帮助 Agent 开发工具在 Cloudflare 平台上构建。
- Sean Goedecke 解释[大公司里的好工程师如何写出烂代码](https://www.seangoedecke.com/bad-code-at-big-companies/)。
- 实在没办法的话，[盯着墙看十分钟](https://www.alexselimov.com/posts/men_who_stare_at_walls/)。
