---
updated: 2026/06/24 17:07:55
date: 2026/06/24 17:07:55
categories: 
  - javascriptweekly
title: issue-772
post_title: issue-772
comments: true
description: JavaScript Weekly #772浏览和比较 npm 包的快速现代方式 2026年2月10日 在线阅读🎯 头条npmx：全新的 npm 注册表包浏览器流畅、快速地浏览官方 npm 注册表上的包。速度快、界面流畅，信息展示更直观——例如看看 axios 页面。「我们不是在替代 npm 注册表，而是通过快速、现代的 UI 提供更高的开发者体验。」
---
# JavaScript Weekly #772
**浏览和比较 npm 包的快速现代方式**
*2026年2月10日*
[在线阅读](https://javascriptweekly.com/issues/772)

## 🎯 头条

### [npmx：全新的 npm 注册表包浏览器](https://npmx.dev/)

流畅、快速地浏览[官方 npm 注册表](https://www.npmjs.com/)上的包。速度快、界面流畅，信息展示更直观——例如看看 [axios 页面](https://npmx.dev/package/axios)。*「我们不是在替代 npm 注册表，而是通过快速、现代的 UI 提供更高的开发者体验。」*

*— npmx*

### 📊 [State of JS 2025 调查结果](https://2025.stateofjs.com/en-US/)

年度调查结果出炉，汇集了超过 12000 名 JavaScript 开发者的意见，生成大量图表，涵盖[语言痛点](https://2025.stateofjs.com/en-US/features/#language_pain_points)、[前端框架选择](https://2025.stateofjs.com/en-US/libraries/front-end-frameworks/)、[构建工具使用](https://2025.stateofjs.com/en-US/libraries/build-tools/)、[AI 代码占比](https://2025.stateofjs.com/en-US/usage/#ai_generated_code_balance)和[使用的非 JS/TS 语言](https://2025.stateofjs.com/en-US/other-tools/#non_js_languages)。

*— Devographics*

### [ESLint v10.0.0 发布](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)

这个期待已久的里程碑完成了旧 `eslintrc` 配置系统的移除，引入了从 linted 文件开始的新配置查找算法（monorepo 友好），新增 JSX 引用跟踪以修复作用域分析问题等。

*— ESLint 团队*

## 📋 简报

- [webpack 分享 2026 路线图](https://webpack.js.org/blog/2026-04-02-roadmap-2026/)。主题包括支持 `universal` 目标以编译代码在多种运行时上运行、无 loader 构建 TypeScript、无插件 CSS modules 等。
- [VoidZero 分享 2026 年 1 月回顾](https://voidzero.dev/posts/whats-new-jan-2026)，涵盖 Oxlint、Oxfmt、Vitest 等更新。
- [Deno Deploy 现已 GA](https://deno.com/blog/deno-deploy-is-ga)，轻松将 JS/TS 应用部署到 Web。还有 Ryan Dahl 展示的 45 分钟视频。
- 🤯 *Promethee* 提供 [JavaScript 的 UEFI 绑定](https://codeberg.org/smnx/promethee)。用 JavaScript 写 UEFI 引导程序而不是 C？是的。

## 📦 版本发布

- 🤖 [Transformers.js v4 预览](https://huggingface.co/blog/transformersjs-v4) – *在浏览器中*基于新 WebGPU 运行时运行 ML 模型。
- [Bun v1.3.9](https://bun.sh/blog/bun-v1.3.9) – 用 `--parallel/--sequential` 并行/顺序运行多个 `package.json` 脚本，更快的 `Bun.markdown.react()`，正则表达式 SIMD 加速等。
- [Ink 6.7](https://github.com/vadimdemedes/ink) – 用 React 构建丰富的终端应用。v6.7 新增并发渲染和同步更新（更少闪烁！）
- [Ember 6.10](https://blog.emberjs.com/ember-released-6-10/) – 稳定、久经考验框架的清理和现代化。

## 📖 文章与视频

### [JavaScript 的资源清理即将变得容易得多](https://piccalil.li/blog/its-about-to-get-a-lot-easier-for-your-javascript-to-clean-up-after-itself/)

对 `Symbol.dispose` 和 `using` 的有趣技术探索——两个新功能将缓解资源清理方面的许多头疼问题：关闭连接、释放资源等。只要当心 Muppets……

*— Mat Marquis*

### ▶ [Evan You 谈 Vite、Rust 和 JS 工具链的未来](https://www.youtube.com/watch?v=LSGZtHafiM4)

Vue.js 创建者做客 Better Stack 播客，讨论从构建 Vite 到创立 VoidZero 并开发基于 Rust 的 JS 工具链的历程。

*— Evan You 和 Better Stack*

### 🤖 [用 AI 调试 React：能替代有经验的开发者吗？](https://www.developerway.com/posts/debugging-with-ai)

Nadia 搭建了一个充满细微 bug 的应用，让 Claude 来调试，然后……看着它表现不佳。

*— Nadia Makarevich*

## 🛠 代码与工具

### [Shovel.js：如果服务端只是一个 Service Worker 呢？](https://shovel.js.org/blog/introducing-shovel/)

围绕 [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 模型构建的全栈框架和元框架，尽可能使用 Web API，在 Node、Bun 和 Edge 运行时上提供一致的服务端接口。

*— Brian Kim*

### [VerifyFetch：带断点续传和校验功能下载大文件](https://verifyfetch.com/)

功能像 `fetch` 但支持断点续传、校验下载内容是否正确、发现损坏时快速失败。[GitHub 仓库](https://github.com/hamzaydia/verifyfetch)。

*— Hamza Ezzaydia*

### 🔐 [OTPAuth：一次性密码（HOTP/TOTP）库](https://github.com/hectorm/otpauth)

Node、Deno、Bun 和浏览器库，生成和校验双因素认证中使用的 TOTP 和 HOTP 一次性密码。

*— Héctor Molinero Fernández*

### 📺 [Shaka Player 5.0：自适应媒体播放库](https://github.com/shaka-project/shaka-player)

在浏览器中播放 DASH 和 HLS 格式，*无需*插件。通过 IndexedDB 支持离线存储和播放。（[演示](https://shaka-project.github.io/shaka-player/demo/)）。

*— Shaka Project*

- [Meriyah 7.1](https://github.com/meriyah/meriyah) – 长期维护的 100% ES2024 兼容、自托管 JS 解析器（[在线体验](https://meriyah.github.io/meriyah/)）。
- [React Grab 1.0](https://www.react-grab.com/blog/1-0) – 在浏览器中选择组件[供 Agent 编辑](https://www.react-grab.com/blog/agent)的工具。
- [Downshift 9.3](https://github.com/downshift-js/downshift) – 构建 WAI-ARIA 兼容的 React 自动完成、组合框和选择下拉原语。
- [Js_of_ocaml 6.3](https://github.com/ocsigen/js_of_ocaml) – OCaml 到 JS 转译器。
- [VuePDF 2.0](https://github.com/TaTo30/vue-pdf) – 在 Vue 3 应用中渲染 PDF。
- [Lume 3.2](https://lume.land/) – Deno 静态网站生成器。

## 📢 生态圈动态

- ⭐ [Shades of Halftone](https://blog.maximeheckel.com/posts/shades-of-halftone/) 是 Maxime Heckel 对像素化、抖动和 GLSL 半色调效果（用 [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)）的宏大巡礼——在现代 Web 设计和数字艺术中越来越流行的美学。
- 😬 [Heroku](https://www.heroku.com/) 采用「维持工程模式」，无新功能开发计划。开发者社区[听到了「死亡之音」](https://news.ycombinator.com/item?id=46913903)，`migrate off heroku` 已加入许多待办清单。
- 🎥 如果你被用 Agent 构建视频的 [Remotion](https://www.remotion.dev/) 相关讨论淹没，Remotion 现在有[▶️ 5 分钟教程将其浓缩为基础](https://www.youtube.com/watch?v=5NRAOnKc3c8)。
- 📗 [Node.js 官方文档新设计的预览](https://nodejs-api-docs-tooling.vercel.app/)，有问题可[提交 issue](https://github.com/nodejs/doc-kit/issues)。
