# JavaScript Weekly #775
**外部 Import Map、Bun 大更新和 Node.js 发布计划变更**
*2026年3月3日*
[在线阅读](https://javascriptweekly.com/issues/775)

## 🎯 头条

### [Bun v1.3.10：一个出乎意料的大更新](https://bun.com/blog/bun-v1.3.10)

Bun 的 REPL 完全重写，有多项改进；`--compile --target=browser` 选项可将项目打包成包含所有 JS、CSS 和资源的自包含 HTML 文件；完整支持 TC39 Stage 3 [ES 装饰器](https://github.com/tc39/proposal-decorators)；更快的事件循环；barrel import 优化等。

*— Jarred Sumner*

### [外部 Import Map，今天就可用！](https://lea.verou.me/blog/2026/external-import-maps-today/)

几周前 Lea 发帖说 [Web 依赖是坏的](https://lea.verou.me/blog/2026/web-deps/)，但现在她有了解决方案。用于模拟外部 import map 支持的核心技术虽然简单但不明显，已被 [JSPM 4.0](https://jspm.org/jspm-4.0-release#import-map-package-management) 采用。

*— Lea Verou*

## 📋 简报

- [React Foundation 正式启动](https://react.dev/blog/2026/02/24/the-react-foundation)，接管 React、React Native 和 JSX 的所有权。由八位创始成员（包括 Meta）组成的董事会，前 Meta React 负责人 Seth Webster 任执行董事。
- [Node.js 发布计划将于今年晚些时候改变](https://nodejs-org-git-fork-ulisesgascon-release-announcement-openjs.vercel.app/en/blog/announcements/evolving-the-nodejs-release-schedule)（一年一个大版本，每个版本都是 LTS，不再有奇偶之分）。
- 📢 月度动态发布：[Svelte](https://svelte.dev/blog/whats-new-in-svelte-march-2026)、[ViteLand/VoidZero](https://voidzero.dev/posts/whats-new-feb-2026)、[Astro](https://astro.build/blog/whats-new-february-2026)。
- 🔒 Angular 团队[解释了 Angular 中两个最近修复的漏洞](https://blog.angular.dev/security-advisory-addressing-recent-vulnerabilities-in-angular-c2656249b799)。
- [Navigation API 现已在所有主流浏览器中 Baseline Newly Available](https://web.dev/blog/baseline-navigation-api?hl=en)。

## 📦 版本发布

- [Deno 2.7](https://deno.com/blog/v2.7) – 稳定化 Temporal API 支持，支持 Windows on ARM，新增 `package.json` `overrides` 支持等。
- [Expo SDK 55](https://expo.dev/changelog/sdk-55) – 流行的 React Native 框架/工具链。
- [Shiki 4.0](https://shiki.style/) – TextMate 语法驱动、VS Code 风格的语法高亮器。
- [Angular 21.2](https://github.com/angular/angular/releases/tag/v21.2.0)、[Mediabunny 1.35](https://github.com/Vanilagy/mediabunny/releases/tag/v1.35.0)、[Neo.mjs 12.0](https://github.com/neomjs/neo/releases/tag/12.0.0)

## 📖 文章与视频

### [让 WebAssembly 成为 Web 的一等公民](https://hacks.mozilla.org/2026/02/making-webassembly-a-first-class-language-on-the-web/)

WASM 已经走了很长的路，但在 Web 上仍然很难用——即使执行 `console.log` 也需要大量胶水代码。Ryan 论证了 [WebAssembly 组件模型](https://component-model.bytecodealliance.org/)可以改变这一现状，让模块直接绑定到浏览器 API，直接从 `script` 标签加载等。

*— Ryan Hunt*

### [我们值得拥有更好的 JavaScript Streams API](https://blog.cloudflare.com/a-better-web-streams-api/)

*「我发布这个是为了开启一次对话，」*James 说道，展示了一种绕过当前标准*「根本性可用性和性能问题」*的 Web Streams 替代方案。结果和 James 在该领域的丰富经验构成了有说服力的论据。

*— James M Snell*

### [JavaScript「DRM」的幻觉](https://www.therantydev.com/javascript-drms-are-stupid)

解释为什么纯粹用 JavaScript 构建 DRM/复制保护系统（而非基于 [EME](https://en.wikipedia.org/wiki/Encrypted_Media_Extensions) 的方案）充其量只是*「复杂的摩擦力」*，并以破解某（NSFW）平台保护机制的故事为例。

*— Ahmed Arat*

### [Cloudflare 如何在一周内用 AI 重建 Next.js](https://blog.cloudflare.com/vinext/)

[vinext](https://github.com/cloudflare/vinext) 是实验性的、基于 Vite 的 Next.js API 表面重实现，让现有应用在更多环境中运行，但[有取舍](https://github.com/cloudflare/vinext#whats-not-supported-and-wont-be)。

*— Steve Faulkner (Cloudflare)*

### [用 Val Town 帮我找到电影院](https://www.raymondcamden.com/2026/03/01/using-val-town-to-get-me-to-the-movies)

[Val Town](https://www.val.town/) 是快速编写和部署 JavaScript 驱动服务的绝佳平台。就像这个！

*— Raymond Camden*

## 🛠 代码与工具

### [txiki.js：小巧强大的 JavaScript 运行时](https://txikijs.org/)

基于 QuickJS-ng 和 libuv，旨在支持最新 ECMAScript 特性并符合 [WinterTC](https://wintertc.org/) 标准。[GitHub 仓库](https://github.com/saghul/txiki.js)。

*— Saúl Ibarra Corretgé*

### [numpy-ts：TypeScript NumPy 实现](https://numpyts.dev/)

[NumPy](https://numpy.org/) 的重现——Python 科学计算生态的基石——在浏览器、Node、Bun 和 Deno 中运行。已覆盖 94% 的 NumPy API，有[在线 playground](https://numpyts.dev/v1.0.x/playground)。

*— Nicolas Dupont*

### [Yoopta Editor 6.0：React 无头富文本编辑器](https://yoopta.dev/)

MIT 许可，创建基于块的、Notion 风格的富文本编辑体验。核心无头，但附带各种 UI 组件可快速上手。[Playground](https://yoopta.dev/playground) 有在线示例。

*— Akhmed Ibragimov*

### [AdonisJS v7 发布：「全方位」Node.js 框架](https://adonisjs.com/blog/v7)

包含 auth、ORM、队列、测试等的流行框架。v7 带来[全新网站](https://adonisjs.com/)、OpenTelemetry 集成、新入门套件等。

*— Harminder Virk*

### 🎨 [Color Thief 3.0：从图片中抓取调色板](https://lokeshdhakar.com/projects/color-thief/)

给定一张图片，使用 `canvas` 返回主色调列表。支持浏览器和 Node。新增 OKLCH 支持、Web Worker 卸载、视频/canvas/image 元素的「实时提取」等。[GitHub 仓库](https://github.com/lokesh/color-thief)。

*— Lokesh Dhakar*

### 📊 [ng2-charts：基于 Chart.js 的 Angular 图表库](https://valor-software.com/ng2-charts/)

现已支持 Angular 20。

*— Valor Labs*

### [vue-superselect：Vue 3 无头 Select/Combobox](https://github.com/nemanjamalesija/vue-superselect)

*— Nemanja Malesija*

- 📄 [React PDF 10.4](https://projects.wojtekmaj.pl/react-pdf/) – React 应用中展示 PDF。v10.4 新增覆盖渲染颜色功能。
- 🕹️ [JSNES 2.0](https://github.com/bfirsh/jsnes/releases/tag/v2.0.0) – 浏览器和 Node 的 JS NES 模拟器（[演示](https://jsnes.org/)）。
- [Milkdown 7.19](https://github.com/Milkdown/milkdown) – 插件驱动的 WYSIWYG Markdown 编辑器框架。
- [Peggy 5.1](https://github.com/peggyjs/peggy) – 简单解析器生成器。

## 📢 生态圈动态

- 🎉 [npmx.dev](https://npmx.dev/) 人气暴涨，社区[热情](https://piccalil.li/blog/finding-an-accessibility-first-culture-in-npmx/)[高涨](https://johnnyreilly.com/npmx-with-a-little-help-from-my-friends)，我记不得上次一个 JS 项目同时吸引这么多博文是什么时候了。
- [Locutus](https://locutus.io/) 是一个有趣的项目，提供 15 种其他编程语言（PHP、Go、Python、Ruby 等）标准库的 TypeScript 移植版。
- [State of React Native 2025 调查结果](https://results.stateofreactnative.com/en-US/) 发布。
- [TypeScript 5.x 到 6.0 迁移的详细笔记](https://gist.github.com/privatenumber/3d2e80da28f84ee30b77d53e1693378f)。
- [xkcd 关于单人依赖的著名漫画](https://xkcd.com/2347/)的[交互式版本](https://editor.p5js.org/isohedral/full/vJa5RiZWs)，基于 [p5.js](https://p5js.org/)。
- [Drizzle ORM](https://orm.drizzle.team/) 团队[加入 PlanetScale](https://planetscale.com/blog/drizzle-joins-planetscale)。
