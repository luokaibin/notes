# JavaScript Weekly #777
**关于时间：Temporal 推进、Vite 加速**
*2026年3月17日*
[在线阅读](https://javascriptweekly.com/issues/777)

## 🎯 头条

### [Temporal：修复 JavaScript 时间的九年征程](https://bloomberg.github.io/js-blog/post/temporal/)

JavaScript 的日期/时间处理以[混乱](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#background_and_concepts)著称，[Moment.js](https://momentjs.com/) 等库因此流行。2017 年，Moment.js 维护者 Maggie Johnson-Pint 提出了 [Temporal API](https://tc39.es/proposal-temporal/docs/) 以从根本上修复日期/时间处理，现在我们*基本到了*（[支持度持续增长](https://caniuse.com/temporal)，Safari 和 Node 也在追赶）。

*— Jason Williams (Bloomberg)*

### [Vite 8.0 发布](https://vite.dev/blog/announcing-vite8)

流行构建工具的超大版本。设计为平滑升级，背后有大量变化：`@vitejs/plugin-react` v6 不再需要 Babel，[Rolldown](https://rolldown.rs/) 替代 Rollup 和 esbuild，WASM SSR 支持，浏览器 console 转发到终端，以及巨大的性能提升。

*— Vite*

## 📋 简报

- [Sarah Gooding 汇总了上周 TC39 会议](https://socket.dev/blog/tc39-advances-temporal-to-stage-4)及推进的提案，包括 Temporal、[Import Text](https://github.com/tc39/proposal-import-text)、[Error Stack Accessor](https://github.com/tc39/proposal-error-stack-accessor) 和 [Iterator Includes](https://github.com/tc39/proposal-iterator-includes)。
- 😆 `BigInt.PI = 3`？qntm 幽默的[向 BigInt 添加数学常量的提案](https://github.com/qntm/proposal-bigint-constants)。
- Laurent Cazanove [汇总了上周 Vue.js Amsterdam 大会的公告](https://laurentcazanove.com/blog/state-of-vue-vite-2026-amsterdam-recap)，包括 Vue Router 5、Vite 8 和 [Void Cloud](https://void.cloud/)。

## 📦 版本发布

- [Electron 41.0](https://www.electronjs.org/blog/electron-41-0) – 新增 ASAR Integrity digest 和 MSIX 自动更新，改进 Wayland 支持，升级至 Chromium 146/Node v24.14.0/V8 14.6。
- [Nitro v3 Beta](https://nitro.build/blog/v3-beta) – 用生产就绪的服务器扩展 Vite 应用，兼容任何运行时。
- [Vitest 4.1](https://vitest.dev/blog/vitest-4-1.html) – 下一代测试框架，现支持 Vite 8。
- [Preact 10.29.0](https://github.com/preactjs/preact/releases/tag/10.29.0)、[Prisma 7.5.0](https://github.com/prisma/prisma/releases/tag/7.5.0)、[Babel 8.0 RC3](https://github.com/babel/babel/releases/tag/v8.0.0-rc.3)、[Vue 3.6.0 Beta 8](https://github.com/vuejs/core/blob/minor/CHANGELOG.md#360-beta8-2026-03-16)

## 📖 文章与视频

### [Source Maps：通过标准推进功能](https://bloomberg.github.io/js-blog/post/standardizing-source-maps/)

[Source maps](https://developer.mozilla.org/en-US/docs/Glossary/Source_map) 是 JSON 文件，为调试器等工具提供压缩/转换后代码与原始代码库之间的映射。Jon 带我们了解它并揭示该功能如何逐步成为标准（[ECMA-426](https://tc39.es/ecma426/)）。

*— Jon Kuperman (Bloomberg)*

### [我们如何在两周内将 13 万行代码从 React 重写为 Svelte](https://strawberrybrowser.com/blog/react-to-svelte)

近几个月一个常见的说法是 LLM 和编程 Agent 可能将我们锁定在最流行的框架中，但实际上它们也让*框架之间的切换*比以往任何时候都更容易。

*— Strawberry*

### [Svelte 开发者最佳实践](https://svelte.dev/docs/svelte/best-practices)

Svelte 文档中全新的页面，概述了编写更健壮 Svelte 应用的最佳实践。

*— Svelte Docs*

### [前端内存泄漏实证研究](https://stackinsight.dev/blog/memory-leak-empirical-study/)

分析了 500 个 React、Vue 和 Angular 应用中导致内存泄漏的模式。缺失的定时器清理和事件监听器移除是主要原因。

*— Ko-Hsin Liang*

### [用 TypeScript 重写一个 12 年的 JavaScript 库](https://ifandelse.com/blog/rewriting-a-12-year-old-javascript-library-in-typescript/)

具体来说，是 [Machina](https://machina-js.org/) 有限状态机库。

*— Jim Cowart*

## 🛠 代码与工具

### [Nuxt 4.4：全栈 Vue 框架](https://nuxt.com/blog/v4-4)

包含路由（现由 Vue Router v5 驱动）、SSR 和数据获取的全栈 Vue 框架，现新增自定义 `useFetch`/`useAsyncData` 工厂、类型化布局属性、构建分析等。

*— Daniel Roe 和 Nuxt 团队*

### [Reveal.js 6.0：HTML 演示文稿框架](https://revealjs.com/)

长期存在的方式，为任何有浏览器的人带来优雅的演示文稿。[v6.0](https://github.com/hakimel/reveal.js/releases/tag/6.0.0) 有破坏性变更，切换到 Vite，并引入官方 React 封装。

*— Hakim El Hattab*

### [RedwoodSDK 1.0：Cloudflare 原生的 React 框架](https://rwsdk.com/blog/redwood-v1-getting-out-of-the-weeds)

服务端优先的 React 框架，作为 Vite 插件构建，深度集成 Cloudflare 平台（[为什么？](https://rwsdk.com/blog/why-cloudflare-unified-platform)）及其 workers、D1 数据库、Durable Objects、R2 存储、AI API 等。

*— Peter Pistorius*

- [Defuddle 0.14.0](https://github.com/kepano/defuddle) – 获取页面主要内容作为 Markdown，Mozilla [Readability](https://github.com/mozilla/readability) 的现代实现。
- [Extension.js 3.9](https://extension.js.org/) – 零配置开发统一跨浏览器扩展。
- [React Native Sandbox 0.5](https://github.com/callstackincubator/react-native-sandbox) – 在应用中运行多个隔离的 RN 实例。
- [XO 2.0](https://github.com/xojs/xo) – 有主见的、可配置的 ESLint 10 封装。
- [Poku 4.1](https://poku.io/) – 跨平台测试运行器，支持 Node、Bun 和 Deno。
- [sax js 1.6](https://github.com/isaacs/sax-js) – SAX 风格流式 XML 解析器。
- 📺 [YouTube.js 17.0](https://github.com/LuanRT/YouTube.js/releases/tag/v17.0.0) – YouTube 私有 API 的 JavaScript 客户端。
- [Svelte SPA Router 5.0](https://github.com/ItalyPaleAle/svelte-spa-router) – Svelte 5 单页应用路由。
- 📃 [PDFKit 0.18](https://github.com/foliojs/pdfkit/releases/tag/v0.18.0) – Node 和浏览器 PDF 生成库。
- [Cypress ESLint Plugin v6.2.0](https://github.com/cypress-io/eslint-plugin-cypress) – Cypress 测试 ESLint 插件。

## 📢 生态圈动态

- 📈 [49MB 的网页](https://thatshubham.com/blog/news-audit)：Shubham Bose 惊讶地发现加载一个*纽约时报*页面产生 422 个网络请求和 49MB 数据传输。他反思了导致这成为新闻网站普遍体验的问题。
- [Difftastic](https://difftastic.wilfred.me.uk/) 是基于*语法*的代码差异工具，[支持大多数流行语言](https://difftastic.wilfred.me.uk/languages_supported.html)包括 JS 和 TS。
- [VS Code 1.111 发布](https://code.visualstudio.com/updates/v1_111)，这是 VS Code 新每周稳定发布节奏的首个版本。
- Amazon S3 引入[账户区域命名空间 for S3 存储桶](https://aws.amazon.com/blogs/aws/introducing-account-regional-namespaces-for-amazon-s3-general-purpose-buckets/)，有助于防止「[bucketsquatting](https://onecloudplease.com/blog/bucketsquatting-is-finally-dead)」。
- 🎂 [AWS S3 云存储系统 20 岁了](https://aws.amazon.com/blogs/aws/twenty-years-of-amazon-s3-and-building-whats-next/)。
