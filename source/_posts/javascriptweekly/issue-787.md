---
updated: 2026/06/24 16:58:15
date: 2026/06/24 16:58:15
categories: 
  - javascriptweekly
title: issue-787
post_title: issue-787
comments: true
description: JavaScript Weekly #787npm 和 pnpm 引入分阶段发布 2026年5月26日 在线阅读🎯 头条JS 填字游戏：所有答案都是 JavaScript这份手工制作的谜题将严峻考验你的 JavaScript 知识。我在社交媒体上看到很多人在欢呼完成或者诅咒卡关……
---
# JavaScript Weekly #787
**npm 和 pnpm 引入分阶段发布**
*2026年5月26日*
[在线阅读](https://javascriptweekly.com/issues/787)

## 🎯 头条

### [JS 填字游戏：所有答案都是 JavaScript](https://lyra.horse/fun/jscrossword/)

这份手工制作的谜题将严峻考验你的 JavaScript 知识。我在社交媒体上看到很多人在欢呼完成或者诅咒卡关……

*— Lyra Rebane*

### [npm 的分阶段发布正式上线](https://docs.npmjs.com/staged-publishing)

npm 的「分阶段发布」模式提供了一个审查期，包需要批准后才能上线 npm 注册表。[npm 11.15.0](https://github.com/npm/cli/releases/tag/v11.15.0) 和 [pnpm 11.3](https://pnpm.io/blog/releases/11.3) 均已支持。

*— npm 项目*

## 📋 简报

- [Firefox 151 新增 Web Serial 支持](https://hacks.mozilla.org/2026/05/web-serial-support-in-firefox/)，可从 JS 连接微控制器、3D 打印机等串行设备。
- Mozilla 的 Ryan Hunt [告别 asm.js](https://spidermonkey.dev/blog/2026/05/20/saying-goodbye-to-asmjs.html)，Firefox 的 JS 引擎默认禁用其优化。
- 🤖 [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance) 是一套经专家审查的技能指南，指导 Agent 构建现代 Web 体验。
- [TC39 举行了最新会议](https://github.com/tc39/agendas/blob/main/2026/05.md)——总结即将发布。

## 📦 版本发布

- [Storybook 10.4](https://storybook.js.org/blog/storybook-10-4/) – 新增一流的 TanStack React 支持，Agent 可在复杂应用中配置 Storybook。
- [Node.js v26.2.0 (Current)](https://nodejs.org/en/blog/release/v26.2.0) 和 [v24.16.0 (LTS)](https://nodejs.org/en/blog/release/v24.16.0)
- [pnpm 11.3](https://pnpm.io/blog/releases/11.3) – 新增 `pnpm stage`（分阶段发布）、`trustLockfile`、原生 `pkg`/`repo`/`set-script` 命令等。
- [npm 12.0 预览版](https://github.com/npm/cli/releases/tag/v12.0.0-pre.0.0)、[Apache ECharts 6.1](https://github.com/apache/echarts/releases/tag/6.1.0)（[演示](https://echarts.apache.org/examples/en/index.html)）

## 📖 文章与视频

### [Chrome 预览声明式局部更新](https://developer.chrome.com/blog/declarative-partial-updates)

两组新 API，用于乱序处理 HTML：通过 `<template for>` 在文档中处理，或通过 `setHTML`/`streamHTML` 动态插入。Chrome 148 实验性支持，[polyfill](https://github.com/GoogleChromeLabs/html-setters-polyfill) [可用](https://github.com/GoogleChromeLabs/template-for-polyfill)。

*— Pollard 和 Rosenthal (Chrome)*

### [从 Webpack 迁移到 Rspack 优化构建时间](https://engineeringblog.yelp.com/2026/05/optimizing-our-build-times-by-migrating-from-webpack-to-rspack.html)

Yelp 如何用 [Rspack](https://rspack.rs/)（Rust 驱动的 webpack 替代品）将构建时间减半，以及他们在 barrel 文件和重导出方面的经验。

*— Benson Pan (Yelp)*

### [微软对 Mini Shai-Hulud 攻击的分析](https://www.microsoft.com/en-us/security/blog/2026/05/20/mini-shai-hulud-compromised-antv-npm-packages-enable-ci-cd-credential-theft/)

对上周 [Mini Shai-Hulud](https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/) npm 安全链攻击的详细事后分析。

*— Microsoft Defender 安全研究团队*

## 🛠 代码与工具

### [Deno 2.8：「迄今为止最大的小版本」](https://deno.com/blog/v2.8#new-subcommands)

头条：Node.js 兼容性从 2.7 的 42% 跃升至 76.4%（超越 Bun）。Deno 还获得了[全面性能提升](https://deno.com/blog/v2.8#performance)，并取消了添加/安装包时的 `npm:` 前缀要求。其他亮点包括：

*— Bartek Iwańczuk*

### 📄 [DOCX 9.7：用 JavaScript 构建 Word .docx 文件](https://docx.js.org/)

成熟、全面的库，支持客户端和服务端生成 `docx` 文件。有 [CodePen 示例](https://codepen.io/dolanmiu/pen/RwNeObg)和[超过 100 个示例脚本](https://github.com/dolanmiu/docx/tree/master/demo)。

*— Dolan Miu*

### [tinykeys 4.0：小巧现代的快捷键库](https://jamiebuilds.github.io/tinykeys/)

API 非常简单直观，页面包含在线演示。

*— Jamie Kyle*

### [Node.js 官方 Codemod：从 Axios 迁移到 fetch](https://app.codemod.com/registry/@nodejs/axios-to-whatwg-fetch)

一个 [codemod](https://nodejs.org/learn/getting-started/userland-migrations)，将使用 Axios 的代码转换为 Fetch API。

*— Node.js 团队*

### 📱 [Hot Updater：React Native 自托管热更新](https://hot-updater.dev/)

无需应用商店提交即可部署更新。

*— Sungyu Kang*

- 📊 [Perspective 4.5](https://github.com/perspective-dev/perspective) – 面向大型和流式数据集的分析与数据可视化组件。
- [Partytown 0.14.0](https://partytown.qwik.dev/) – 将资源密集型脚本移入 Web Worker。
- [atproto TypeScript SDK 升级](https://atproto.com/blog/ts-sdk-upgrades) – `@atproto` 命名空间下所有包均已重建，全部以 ESM 发布。
- [Kysely 0.29.0](https://github.com/kysely-org/kysely/releases/tag/v0.29.0) – 流行类型安全 SQL 查询构建器。
- [Svader 1.0](https://github.com/sockmaster27/svader) – 创建 GPU 渲染的 Svelte 组件。

## 👀 JS 填字游戏技巧

- 填字游戏在浏览器中运行，所以 `window` 全局对象可用。例如：`find(0)` 和 `name` 在浏览器中返回结果，但在 Node 中不行。
- 查看谜题下方的「playground」。线索可能说 `object`，但期望的结果可能更详细。
- 像 67 这样的数字可以用多种方式表示。例如：`0103 == 67` 和 `0x43 == 67`。
- 你可以在数字前后加前缀和后缀。例如：`123.`、`+123` 和 `+123.` 都等于 `123`。
- 赋值语句求值为被赋的值。
- [标签模板字面量](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)提供了一种调用函数的有趣方式。考虑这一点在 JS 中是可行的：`console.log\`hi\``（虽然不等价于 `console.log('hi')`）。
- `'` 不在允许的字符列表中。
