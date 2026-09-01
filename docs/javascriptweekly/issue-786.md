# JavaScript Weekly #786
**Dr. Axel 的博客消失了（暂时）**
*2026年5月19日*
[在线阅读](https://javascriptweekly.com/issues/786)

## 🎯 头条

### RFC：[是时候让 npm 的安装脚本变为 opt-in 了](https://github.com/npm/rfcs/pull/868)

npm 是唯一默认执行依赖安装脚本（如 `postinstall`）的主流包管理器，它们已经成了太大的安全漏洞，GitHub（npm 维护者）的 Jamie 说道。这份 RFC 进一步讨论了该想法及其权衡。

*— Jamie Magee*

### [Mini Shai-Hulud 攻击：300+ 恶意 npm 包被发布](https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/)

「Shai-Hulud」类 npm 生态攻击持续发酵。今天又有[数百个包](https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/#full-list-of-compromised-packages)被攻陷——包括流行的 `antv` 系列和 `timeago.js`。

*— SafeDep 团队*

## 📋 简报

- 😱 Dr. Axel Rauschmayer（JavaScript 传奇、前 JS Weekly 编辑）[将博客和 JavaScript 书籍从 Web 上撤下](https://2ality.com/)，原因是被 AI 爬虫淹没。你仍然可以[在这里购买他出色的书籍](https://payhip.com/rauschma)。
- Bun 的故事继续。尽管曾[淡化其重要性](https://news.ycombinator.com/item?id=48019226)，[Rust 重写的 Bun 已被合并](https://github.com/oven-sh/bun/pull/30412)，但 AI 移植的代码存在[质量问题](https://github.com/oven-sh/bun/issues/30719)。[Hacker News 上大量讨论](https://news.ycombinator.com/item?id=48150900)。
- [Deno 团队预告 Deno 2.8](https://bsky.app/profile/deno.land/post/3mm6clkq5uc22)，本周发布。Node.js 兼容性大幅提升、`import defer`、TypeScript 6.0.3 支持。
- Chrome 和 Edge 团队正在开发[新的 `<install>` HTML 元素](https://developer.chrome.com/blog/install-element-ot)，用于渲染 PWA 的「可信安装按钮」。
- *Express.js* 项目[焕然一新](https://expressjs.com/en/blog/2026-05-18-a-new-look-for-express/)，新网站、新 logo、[改进的文档](https://expressjs.com/en/5x/starter/installing/)。

## 📦 版本发布

- [Angular 22 Release Candidate](https://github.com/angular/angular/releases/tag/v22.0.0-rc.0) – 最终版预计 6 月初发布。期待[基于 Signal 的表单](https://angular.dev/guide/forms/signals/overview)和 [OnPush](https://github.com/angular/angular/discussions/66779) 变更检测策略成为默认。
- [Bun 1.3.14](https://bun.com/blog/bun-v1.3.14) – 新增 `Bun.Image`、更多 HTTP/2 和 HTTP/3 支持、更多 Node 兼容性改进。
- [ESLint Config Inspector 3.0](https://github.com/eslint/config-inspector) – 可视化检查和理解 ESLint flat config 的工具。
- [TypeORM 1.0](https://typeorm.io/docs/releases/1.0/release-notes/)、[ESLint 10.4.0](https://eslint.org/blog/2026/05/eslint-v10.4.0-released/)、[Relay 21.0](https://github.com/facebook/relay/releases/tag/v21.0.0)、[Rolldown 1.0.1](https://github.com/rolldown/rolldown/releases/tag/v1.0.1)

## 📖 文章与视频

### 🤖 [Mark Erikson 的 Agent 配置、工作流和工具](https://blog.isquaredsoftware.com/2026/05/ai-thoughts-part-2-agent-workflow-tools/)

Redux 维护者、Redux Toolkit 创建者 Mark 深入介绍他的日常开发工作流，包括 [OpenCode](https://opencode.ai/)（开源 JS 编程 Agent）的使用，以及知识库和任务管理方式。

*— Mark Erikson*

### 📗 [NodeBook：Node.js 内部原理进阶指南](https://www.thenodebook.com/)

八个深入章节讲解 Node.js 内部机制：[事件循环](https://www.thenodebook.com/node-arch/event-loop-intro#what-the-nodejs-event-loop-does)、[V8 引擎](https://www.thenodebook.com/node-arch/v8-engine-intro)、[流](https://www.thenodebook.com/streams/foundation-of-streams)、[模块解析](https://www.thenodebook.com/modules/resolution-algorithm)和 [async/await](https://www.thenodebook.com/async-patterns/async-await)。

*— Ishtmeet Singh*

### [很快我们就可以把 JavaScript 放逐到 ShadowRealm](https://css-tricks.com/soon-we-can-finally-banish-javascript-to-the-shadowrealm/)

[TC39 提案](https://github.com/tc39/proposal-shadowrealm)：在隔离的「伪 realm」中运行 JavaScript，拥有自己的全局对象和内置对象。适用于第三方代码或任何你想隔离于全局作用域之外的代码。

*— Mat Marquis*

## 🛠 代码与工具

### [Orval：从 OpenAPI/Swagger 规范生成类型安全客户端](https://orval.dev/)

给定有效的 OpenAPI v3 或 Swagger v2 规范，为 React、Vue、Svelte、Solid、Hono 应用甚至纯 `fetch` 生成模型、请求、hooks 和 mock。

*— Victor Bury*

### [Brownies：像普通对象一样的浏览器存储，带变更事件](https://github.com/franciscop/brownies)

一个覆盖 cookies、localStorage、sessionStorage 和 IndexedDB 的微型 API。类型值自动保留，并支持 `subscribe()` 变更事件。

*— Francisco Presencia*

### 🖼️ [Pica 10.0：浏览器中高质量图片缩放](https://nodeca.github.io/pica/demo/)

利用 WASM 和 Web Worker，或退回到纯 JS。v10 是现代化构建（2021 年以来的首个版本），新增 ESM、分体构建，迁移至 TypeScript。[GitHub 仓库](https://github.com/nodeca/pica)。

*— Vitaly Puzrin*

### 🗓️ [SVAR Calendar：React、Svelte 和 Vue 的日历组件](https://svar.dev/blog/svar-calendar-for-react-svelte-vue/)

灵活的日历组件，MIT 许可核心 + 商业扩展版。[开源版在线演示](https://svar.dev/demos/calendar/)。

*— XB Software Sp.*

### [Fate 1.0：React 的现代化数据框架](https://fate.technology/posts/fate-1.0)

前 Jest 负责人、前 Meta 工程师 Christoph Nakazawa 打造的新数据框架。

*— Christoph Nakazawa*

### [Alien Signals：「最轻量的 Signal 库」](https://github.com/stackblitz/alien-signals)

将 Vue、Preact 和 Svelte 的精华提炼为最轻量的 Signal 库。push-pull 响应式核心调优出色，已被合并回 Vue。

*— Johnson Chu*

- [Critical 8.0](https://github.com/addyosmani/critical) – Addy Osmani 的提取和内联首屏 CSS 到 HTML 的库。
- [SQL Formatter 15.8](https://github.com/sql-formatter-org/sql-formatter) – SQL 美化工具（[演示](https://sql-formatter-org.github.io/sql-formatter/)）。
- [Shiki 4.1](https://shiki.style/) – 流行强大的语法高亮器。
- [Redux Toolkit 2.12.0](https://github.com/reduxjs/redux-toolkit/releases/tag/v2.12.0) 和 [React Redux 9.3](https://github.com/reduxjs/react-redux/releases/tag/v9.3.0)
- [Vue.js Language Tools 3.3](https://github.com/vuejs/language-tools/releases/tag/v3.3.0)

## 📢 生态圈动态

- Andrea Giammarchi [提出 JSONRegistry](https://es.discourse.group/t/jsonregistry-allows-branded-instances-in-regular-json/2569)，`JSON` 的替代方案，可为自定义/品牌类型定义序列化和反序列化注册表。
- 🐝 [Wasp](https://wasp.sh/) 创始人讲述 [5 年 500 万美元的教训：为 Web 开发发明新编程语言是个错误](https://wasp.sh/blog/2026/05/13/new-language-for-web-dev-was-a-mistake)。
- 你知道吗？[某些浏览器会区别对待某些网站](https://denodell.com/blog/browsers-treat-big-sites-differently)。Firefox 和 Safari 自带[针对流行网站的「调整」](https://searchfox.org/firefox-main/source/browser/extensions/webcompat/data/interventions)来修复默认渲染不正确的问题。
- 🤖 Simon Willison 分享了[LLM 过去六个月的快速回顾](https://simonwillison.net/2026/May/19/5-minute-llms/)。
