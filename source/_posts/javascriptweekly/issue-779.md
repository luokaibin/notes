---
updated: 2026/06/24 17:04:35
date: 2026/06/24 17:04:35
categories: 
  - javascriptweekly
title: issue-779
post_title: issue-779
comments: true
description: JavaScript Weekly #779通过 Axios 的重大 npm 供应链攻击 2026年3月31日 在线阅读🎯 头条Axios 包被攻陷；恶意版本植入木马依赖Axios 是一个 HTTP 库，周下载量超过 1 亿，很大程度上是由于其历史流行度。攻击者利用这一点推出了包含恶意依赖的版本，植入了远程访问木马（尽管 Axios 的代码库
---
# JavaScript Weekly #779
**通过 Axios 的重大 npm 供应链攻击**
*2026年3月31日*
[在线阅读](https://javascriptweekly.com/issues/779)

## 🎯 头条

### [Axios 包被攻陷；恶意版本植入木马依赖](https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan)

[Axios](https://axios-http.com/) 是一个 HTTP 库，周下载量超过 1 亿，很大程度上是由于其历史流行度。攻击者利用这一点推出了包含恶意依赖的版本，植入了远程访问木马（尽管 Axios 的代码库*本身*没有问题）。这是大事——即使你*不*直接使用 Axios，你的依赖也可能引用它。[如何自查是否受影响](https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan#am-i-affected)。

*— Ashish Kurmi*

### [Transformers.js v4：在浏览器中运行 AI 模型](https://github.com/huggingface/transformers.js/releases/tag/4.0.0)

将 [Hugging Face](https://huggingface.co/) 托管的 Transformer 模型引入 JavaScript，让你在浏览器中运行 NLP、视觉和音频模型。v4 切换到 WebGPU 运行时，支持 npm 安装。有[许多在线演示](https://huggingface.co/collections/webml-community/transformersjs-v4-demos)，涵盖[实时语音转录](https://huggingface.co/spaces/mistralai/Voxtral-Realtime-WebGPU)、[使用 Qwen 3.5](https://huggingface.co/spaces/webml-community/Qwen3.5-WebGPU) 和[实时视频字幕](https://huggingface.co/spaces/LiquidAI/LFM2-VL-WebGPU)。

*— Hugging Face*

## 📦 版本发布

- [Inertia.js 3.0](https://inertiajs.com/) – React/Vue/Svelte SPA 与 Laravel/Rails/Django 等非 JS 服务端框架之间的粘合剂。[v3 更多信息](https://laravel.com/blog/inertiajs-v3-is-now-in-beta)。
- [Node.js 2026 年 3 月安全发布](https://nodejs.org/en/blog/vulnerability/march-2026-security-releases) – 包括 v25.8.2、v24.14.1、v22.22.2 和 v20.20.2。
- [TanStack DB 0.6](https://tanstack.com/blog/tanstack-db-0.6-app-ready-with-persistence-and-includes) – 现支持持久化、离线支持和分层数据。
- [Astro 6.1](https://astro.build/blog/astro-610/)、[Mantine 9.0](https://mantine.dev/changelog/9-0-0/)、[Ky 2.0 预览版](https://github.com/sindresorhus/ky/releases/tag/v2.0.0-0)、[CKEditor 48.0](https://github.com/ckeditor/ckeditor5/releases/tag/v48.0.0)、[pnpm 10.33](https://github.com/pnpm/pnpm/releases/tag/v10.33.0)

## 📖 文章与视频

### [Signals：推拉算法](https://willybrauner.com/journal/signal-the-push-pull-based-algorithm)

图文并茂地从零开始解释 [Signals](https://preactjs.com/blog/introducing-signals/) 的内部工作原理，聚焦于 Solid、Vue 和 Angular 等框架响应式核心的 push-pull 算法。

*— Willy Brauner*

### 🖼️ [用 JavaScript 预加载图片的选项](https://macarthur.me/posts/preloading-images/)

*「有多种方法可以用 JavaScript 按需预加载图片，每种都有各自的优缺点。让我们来一一探讨。」*

*— Alex MacArthur*

### [npm Workspaces 温和入门（带图示）](https://wasp.sh/blog/2026/03/25/gentle-intro-npm-workspaces)

[Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) 让你在一个仓库中管理多个包，并链接本地包使它们可以按名称相互引用。npm 会在安装时提升和去重兼容的依赖。

*— Carlos Precioso*

## 🛠 代码与工具

### [Pretext：多行文本测量和布局库](https://simonwillison.net/2026/Mar/29/pretext/)

前 React 核心团队成员 Cheng Lou 三天前发的 [X 帖子](https://x.com/_chenglou/status/2037713766205608234)引起轰动，获得 2200 万曝光和 2.5 万 GitHub star。为什么呢？人们对实时 Web 布局的潜力*非常*兴奋！[这里有演示](https://chenglou.me/pretext/)。

*— Cheng Lou*

### [Knip v6：清理 JS/TS 项目的工具](https://knip.dev/blog/knip-v6)

[Knip](https://knip.dev/) 是查找和移除未使用文件、导出和依赖的首选工具。v6 集成 *oxc* 实现 2-4 倍性能提升（扫描 *Astro* 只需两秒），基本是直接升级即可。

*— Lars Kappert*

### 📺 [ArtPlayer：现代化全功能 HTML5 视频播放器](https://github.com/zhw2590582/ArtPlayer)

提供高度可自定义的 YouTube 风格播放体验。[在线演示/playground](https://artplayer.org/)。

*— Harvey Zhao*

### [Semiotic 3.0：React + D3 数据可视化框架](https://semiotic.nteract.io/)

基础图表做得好，也有一些更独特的产品如[等值区域地图](https://semiotic.nteract.io/charts/choropleth-map/)、[桑基图](https://semiotic.nteract.io/charts/sankey-diagram)、[流图](https://semiotic.nteract.io/charts/flow-map)和[小提琴图](https://semiotic.nteract.io/charts/violin-plot)，加上流式数据支持。

*— nteract*

- [Heat.js 5.1](https://github.com/williamtroup/Heat.js) – 生成热力图、图表和统计数据，可视化基于日期的活动。
- [numpy-ts 1.2](https://github.com/dupontcyborg/numpy-ts/releases/tag/v1.2.0) – TS/JS 版 NumPy，现约达原生 50% 性能，支持 Float16（[主页](https://numpyts.dev/)）。
- [ts-blank-space 0.8](https://github.com/bloomberg/ts-blank-space) – 使用 TypeScript 6 解析器的纯 JS 类型剥离器。
- [RxDB 17.0](https://rxdb.info/releases/17.0.0.html) – local-first 响应式 NoSQL JS 数据库。
- [filesize.js 11.0.15](https://filesizejs.com/) – 字节数转人类可读文件大小。
- 💳 [React Stripe.js 6.0](https://github.com/stripe/react-stripe-js) – Stripe.js 和 Stripe Elements 组件。
- [css-select 7.0](https://github.com/fb55/css-select) – CSS 选择器编译器和引擎，现为 ESM。
- [ESLint Markdown Plugin 8.0](https://github.com/eslint/markdown) – 用 ESLint 检查 Markdown。

## 📢 生态圈动态

- JetBrains IntelliJ IDEA 现在[免费内置 JS/TS 核心功能](https://blog.jetbrains.com/idea/2026/03/js-ts-free-support/)。
- Vercel 解释了[让 Next.js 跨云平台更好运行的工作](https://nextjs.org/blog/nextjs-across-platforms)。Adapter API 让平台可以调整应用适配环境。OpenNext、Netlify、Cloudflare、AWS Amplify、Google Cloud 均已加入。
- 🤖 GitHub 宣布从 4 月下旬起，免费/Pro/Pro+ Copilot 用户的数据[将默认用于训练未来 AI 模型](https://github.blog/news-insights/company-news/updates-to-github-copilot-interaction-data-usage-policy/)。你可以选择退出。
- 🤖 有开发者发现 [Copilot 在他的 PR 中「插入」了广告](https://notes.zachmanson.com/copilot-edited-an-ad-into-my-pr/)。GitHub 的 Martin Woodward [解释了原因](https://x.com/martinwoodward/status/2038612131084464521)并表示该「功能」已禁用。
- 🔠 寻找新 IDE 字体？[CodingFont](https://www.codingfont.com/) 让你通过淘汰赛制*可视化*选择理想字体。
