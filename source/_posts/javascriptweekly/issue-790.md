---
updated: 2026/06/24 16:55:26
date: 2026/06/24 18:03:16
categories: 
  - javascriptweekly
title: issue-790
post_title: issue-790
comments: true
description: JavaScript Weekly #7902026 年的 Flow vs TypeScript 2026年6月16日 在线阅读🎯 头条2026 年面向 TypeScript 用户的 Flow 指南Flow 是 Meta 的成熟 JavaScript 类型方言，多年来语法已高度趋近 TypeScript。这篇文章详细梳理了二者的差异：Flow 更严格的默认设置会拒绝一些 TypeScript 
---
# JavaScript Weekly #790
**2026 年的 Flow vs TypeScript**
*2026年6月16日*
[在线阅读](https://javascriptweekly.com/issues/790)

## 🎯 头条

### [2026 年面向 TypeScript 用户的 Flow 指南](https://medium.com/flow-type/flow-for-typescript-users-in-2026-ad07ac0a2d92)

[Flow](https://flow.org/) 是 Meta 的成熟 JavaScript 类型方言，多年来语法已高度趋近 TypeScript。这篇文章详细梳理了二者的差异：Flow 更严格的默认设置会拒绝一些 TypeScript `strict` 模式仍接受的易崩溃模式，同时也有自己的独有特性，如完备的 `match` 表达式。

*— George Zahariev (Meta)*

### [npm v12 将默认停止执行安装脚本](https://github.blog/changelog/2026-06-09-upcoming-breaking-changes-for-npm-v12/)

即将到来的 npm v12 将不再执行 `preinstall` / `install` / `postinstall` 脚本，除非你显式允许。现在就可以用 [npm 11.16.0](https://github.com/npm/cli/releases/tag/v11.16.0) 提前准备，它会打印 v12 将要阻止的内容的警告。

*— GitHub*

### 🤖 [代码越来越便宜了](https://htmx.org/essays/code-is-cheap/)

[htmx](https://htmx.org/) 的创建者认为，虽然代码越来越容易生成，但*理解*仍然昂贵，*「复杂性仍是我们顶级的掠食者」*。

*— Carson Gross*

## 📋 简报

- pnpm 团队创建了[一个新的 GitHub Action，可同时配置 pnpm 和 JS 运行时](https://github.com/marketplace/actions/setup-pnpm-with-runtime)（Node、Deno 或 Bun）。
- 🐈 [Compilecat](https://isaac-mason.github.io/compilecat/)（[仓库](https://github.com/isaac-mason/compilecat)）是一个新的实验性 JavaScript 性能编译器，执行 [Closure](https://github.com/google/closure-compiler) 风格的优化。
- 多个重磅项目正在 beta/预览阶段：[SvelteKit 3.0](https://github.com/sveltejs/kit/releases/tag/%40sveltejs%2Fkit%403.0.0-next.4)、[Vue 3.6](https://github.com/vuejs/core/blob/minor/CHANGELOG.md#360-beta15-2026-06-11)、[Vite 8.1](https://github.com/vitejs/vite/blob/v8.1.0-beta.0/packages/vite/CHANGELOG.md#810-beta0-2026-06-15) 和 [Astro 7.0](https://github.com/withastro/astro/releases/tag/astro@7.0.0-beta.4)。

## 📦 版本发布

- [Playwright 1.61](https://playwright.dev/docs/release-notes#version-161) – 现在可以注册和测试 passkey，还能通过新的 [WebStorage](https://playwright.dev/docs/api/class-webstorage) API 读写 `localStorage` 和 `sessionStorage`。
- [ESLint v10.5.0](https://eslint.org/blog/2026/06/eslint-v10.5.0-released/) – 五条核心规则现在高亮更小范围的代码，避免遮盖编辑器中的其他问题。
- 🤖 [TanStack AI Beta](https://tanstack.com/blog/tanstack-ai-beta) – 框架无关、供应商无关的 AI 工具包。

## 📖 文章与视频

### [TanStack 如何将 TypeScript 类型检查工作量削减 86%](https://tanstack.com/blog/tanstack-table-v9-typescript-performance)

TanStack Table v9（[现已 beta](https://tanstack.com/blog/tanstack-table-v9-taking-form)）将其功能模块化，但背后的泛型类型带来了明显的编辑器卡顿。这篇深度文章展示了团队如何使用 `tsc` 诊断将类型检查工作量削减 62-86%，编写类型密集型库的开发者都能从中受益。

*— Kevin Van Cott (TanStack)*

### 🛠️ [2026 年 React 库和工具](https://www.robinwieruch.de/react-libraries/)

Robin 每年更新这篇文章，涵盖他认为 React 生态中必不可少的库。

*— Robin Wieruch*

### [修改 Kindle 主页：编辑 Hermes 字节码](https://sighery.com/posts/patching-kindle-homepage/)

Kindle 的 UI 现在运行在 [Hermes](https://github.com/facebook/hermes) 驱动的 JavaScript 栈上。本文展示如何编辑 Hermes 生成的字节码来改变 Kindle UI 的行为。

*— Nicholas Tarta*

### 📈 [让 numpy-ts 达到原生速度](https://nico.codes/notes/numpyts-optimization/)

一个 [TypeScript NumPy 移植版](https://numpyts.dev)从比原生慢 15 倍到匹敌原生速度——关键不在于是否使用 WASM，而在于谁拥有字节的控制权。

*— Nico Dupont*

## 🛠 代码与工具

### [eslint-plugin-unicorn 67.0：超过 200 条强大的 ESLint 规则](https://github.com/sindresorhus/eslint-plugin-unicorn)

Sindre 精心策划的规则集大幅增长，仅最近几周就新增或更新了近 100 条。包括强制执行[更好的注释](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/comment-content.md)、[限制嵌套调用深度](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/max-nested-calls.md)、[优先使用 Temporal 而非 Date](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-temporal.md)、以及 [URL 中优先使用 HTTPS](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-https.md)。这些规则会严格挑战（并改善！）你的代码。

*— Sindre Sorhus 等人*

### [zod-compiler：将 Zod Schema 编译为零开销校验器](https://github.com/gajus/zod-compiler)

构建时编译器，可接入 Vite、webpack 等，将现有 schema 重写为优化、可 tree-shaking 的校验器。宣称校验速度提升 2-75 倍，无需修改源码，保留完整的 Zod API。

*— Gajus Kuizinas*

### 📊 [billboard.js 4.0：基于 D3 的 JavaScript 图表库](https://netil.medium.com/billboard-js-4-0-release-canvas-rendering-mode-94-3-faster-overall-in-benchmark-894b18798ffe)

接近九岁的 billboard.js 现在拥有新的可选 canvas 渲染模式（SVG 仍是默认），更小的打包体积，大数据集上更好的性能。有[数百个演示](https://naver.github.io/billboard.js/demo/)，从[环形图](https://naver.github.io/billboard.js/demo/#Chart.DonutChart)、[漏斗图](https://naver.github.io/billboard.js/demo/#Chart.FunnelChart)到[重叠柱状图](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarOverlap)和[雷达图](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarAxis)。

*— Jae Sung Park (NAVER)*

### [PolyCSS：DOM 的 CSS 3D 引擎](https://polycss.com/)

完全在 DOM 中使用 CSS `matrix3d()` 变换渲染带纹理的 3D 多边形网格——不需要 WebGL 或 `<canvas>`。支持原生 JS、React 和 Vue。有[画廊](https://polycss.com/gallery/)和[在线构建器](https://polycss.com/builder/)。

*— LayoutitStudio*

- [Tabulator 6.5](https://www.tabulator.info/) – 从任意 HTML 表格、JS 数组或 JSON 数据创建交互式表格。
- 🕒 [<relative-time> 5.2.0](https://github.com/github/relative-time-element) – 用于格式化自动更新时间戳的 Web Component。
- [Fable 5.2](https://github.com/fable-compiler/Fable/releases/tag/5.2.0) – F# 到 JS/TS（现在也到 Erlang）的编译器。[更多信息](https://fable.io/)。
- [React Native 0.86](https://reactnative.dev/blog/2026/06/11/react-native-0.86) – Android 15+ 边到边支持，DevTools 改进。
- [Biome 2.5](https://biomejs.dev/blog/biome-v2-5/) – 快速代码格式化和 lint 工具链，已超过 500 条 lint 规则。
- [get-value 4.1](https://github.com/jonschlinkert/get-value) – 用 `a.b.c` 路径从对象中获取嵌套值。
- [axios v1.18.0](https://github.com/axios/axios/releases/tag/v1.18.0) – 面向浏览器和 Node 的 Promise HTTP 客户端。
- 📊 [visx 4.0](https://visx.airbnb.tech/) – Airbnb 的 React 可视化原语。

## 📢 生态圈动态

- 🌐 WebKit 团队[展示了 MapKit JS 6](https://webkit.org/blog/18027/discover-mapkit-js-6-rebuilt-for-todays-web-developer/)，将 Apple Maps 集成到你的网站中[如此例所示](https://webkit.org/demos/yosemite/)。不过需要 Apple 开发者账号的 token。
- 😱 有开发者收到了[假 LinkedIn 招聘人员发来的恶意 JavaScript「编程测试」](https://roman.pt/posts/linkedin-backdoor/)，企图入侵他的机器。我今年已经多次听说这种攻击手段，请小心。
- [WASI 0.3（WebAssembly 系统接口）发布](https://bytecodealliance.org/articles/WASI-0.3)，为 WebAssembly 组件带来了原生异步支持。
- [performative-ui](https://vorpus.github.io/performativeUI/) 是一组有趣的现代 AI 创业公司风格的 React UI 组件，如 [ASCII 英雄艺术](https://vorpus.github.io/performativeUI/#/components/ascii-hero)和[节点图背景](https://vorpus.github.io/performativeUI/#/components/node-graph)。
- 一位开发者有台没有现代驱动的旧 USB 扫描仪，但[通过基于浏览器的 WASM 模拟器](https://yes-we-scan.app/details)通过 WebUSB 桥接让它工作了。他之前也用类似方法[复活了一台旧打印机](https://printervention.app/details)。
