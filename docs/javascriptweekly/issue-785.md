# JavaScript Weekly #785
**加密有效的恶意软件攻入 npm**
*2026年5月12日*
[在线阅读](https://javascriptweekly.com/issues/785)

## 🎯 头条

### [TanStack npm 攻击事件剖析](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem)

[Shai-Hulud 蠕虫](https://www.stepsecurity.io/blog/mini-shai-hulud-is-back-a-self-spreading-supply-chain-attack-hits-the-npm-ecosystem)的新变种昨天向 npm 推送了 TanStack 包的恶意版本（包含检测到 token 撤销即删除文件的陷阱），[另有约 170 个包也被攻陷](https://safedep.io/mass-npm-supply-chain-attack-tanstack-mistral/)。**维护者凭据并未被盗**——攻击手法是链式利用 `pull_request_target` 滥用、缓存投毒和从 CI *内存*中窃取 OIDC token。

*— Tanner Linsley*

### [Rolldown 1.0 发布：高性能 JS 打包器](https://voidzero.dev/posts/announcing-rolldown-1-0)

Rust 驱动的打包器，作为 Vite 8 的底层引擎，达到稳定 v1.0。性能大幅提升，同时保持 Rollup 插件 API 兼容：比 Rollup 快 10-30 倍，早期采用者报告构建时间大幅下降。

*— VoidZero 团队*

## 📋 简报

- [Node.js 最近协作峰会的笔记](https://nodejs.org/en/blog/events/collab-summit-2026-london)，了解 Node 团队当前的工作重点。
- 关于 Bun 实验性 Zig→Rust 移植，Jarred Sumner 表示 96 万行代码的移植[通过了 99.8% 的现有测试套件](https://x.com/jarredsumner/status/2053047748191232310)。
- 🤖 有开发者发起了[将 NetHack 移植到 JavaScript 的挑战](https://mazesofmenace.ai/)。LLM 能完美移植这款复杂的 Roguelike 游戏吗？目前还没有——[排行榜](https://mazesofmenace.ai/)显示*转译*版本最接近。
- 你知道吗？[Firefox 有 $$$ 辅助工具](https://remysharp.com/2026/05/01/devtools-how-to-query-through-the-shadow-dom)用于穿透 Shadow DOM 查询。

## 📦 版本发布

- [Jest 30.4.0](https://github.com/jestjs/jest/releases/tag/v30.4.0) – 改进 ESM、Temporal 和 React 19 支持。
- [Node 26.1 (Current)](https://nodejs.org/en/blog/release/v26.1.0) – 上周 [Node 26 大版本](https://nodejs.org/en/blog/release/v26.0.0)带来了 Temporal API，26.1 则新增（实验性）官方 FFI 支持。
- [Electron 42](https://www.electronjs.org/blog/electron-42-0) – 升级到 Chromium 148/Node 24.15/V8 14.8，不再通过 `postinstall` 脚本下载二进制文件以增强安全性。
- [Capacitor 9.0 Alpha 1](https://ionic.io/blog/capacitor-9-starts-here)、[Playwright 1.60.0](https://github.com/microsoft/playwright/releases/tag/v1.60.0)、[Mantine 9.2](https://github.com/mantinedev/mantine/releases/tag/9.2.0)

## 📖 文章与视频

### [33 个 JavaScript 概念](https://33jsconcepts.com/)

从 [Medium 文章](https://medium.com/@steveandc/33-fundamentals-every-javascript-developer-should-know-13dd720a90d1)起步，演变为[热门 GitHub 仓库](https://github.com/leonardomso/33-js-concepts)，现在是一个完整网站，涵盖广泛的 JavaScript 概念，[甚至超出了 33 个](https://33jsconcepts.com/beyond/getting-started/overview)。

*— Leonardo Maldonado*

### [9 次 Web 平台受 JavaScript 库影响](https://jadjoubran.io/blog/web-platform-influenced-by-libraries)

Lodash、Dojo 和 jQuery 等库如何在「生产环境中做 R&D」，为最终进入浏览器 API 的各种功能铺路。

*— Jad Joubran*

### [从 React 到 Web Components：一个节省 100KB 的迁移](https://evilmartians.com/chronicles/from-react-to-native-web-with-nanotags-a-migration-that-saved-100kb)

*「我如何将一个网站从 React 迁移到原生 Web Components，为什么比预期更好，以及过程中用到的模式如何发展成了一个叫 nanotags 的小库。」*

*— Pavel Grinchenko (Evil Martians)*

### [为什么要迁移到 Valibot？](https://valibot.dev/blog/why-migrate-to-valibot/)

[Valibot](https://valibot.dev/) 是轻量、模块化的 TypeScript schema 校验库，Zod 的替代方案。[v1.4.0](https://valibot.dev/blog/valibot-v1.4-release-notes/) 也刚刚发布。

*— Fabian Hiller*

## 🛠 代码与工具

### [zero-native：用 Zig + WebView 构建桌面应用](https://zero-native.dev/)

Vercel Labs 在 Electron/Tauri 领域的尝试：基于 Zig 核心 + 系统 WebView *或* Chromium 构建原生桌面应用。有 [React、Svelte、Vue 等示例](https://github.com/vercel-labs/zero-native/tree/main/examples)。[GitHub 仓库](https://github.com/vercel-labs/zero-native)。

*— Vercel*

### [Wakaru：拆解压缩 JavaScript 包](https://github.com/pionxzh/wakaru)

将压缩打包的代码还原为可读的模块——无论是代码恢复、逆向工程还是安全审计。[在线尝试](https://wakaru.vercel.app/)。

*— Pionxzh*

### [BlueJS：将 JavaScript 编译为微型二进制文件](https://bluejs.dev)

JavaScript AOT 编译器，可选嵌入 QuickJS 支持动态特性。虽*闭源*，但原始数据引人注目（~5ms 启动、3.8MB 峰值内存、GUI 应用仅 1.2MB 二进制）。

*— BlueJS*

- [pnpm 11.1](https://github.com/pnpm/pnpm/releases/tag/v11.1.0) – 支持新 `gh:` 前缀（GitHub Packages）、`pnpm bugs` 打开浏览器查看 bug tracker、`pnpm audit signatures` 验证 ECDSA 签名。
- [Astro 6.3](https://astro.build/blog/astro-630/) – 实验性高级路由，完全支持 [Hono](https://hono.dev/) 等框架。
- [Syncpack 15.0](https://github.com/JamieMason/syncpack/releases/tag/15.0.0) – monorepo 依赖版本管理器，现已完整支持 pnpm 和 Bun catalogs。
- 📱 [Expo SDK 56 Beta](https://expo.dev/changelog/sdk-56-beta) – 速度提升，Jetpack Compose 和 SwiftUI API 稳定。
- [MDXEditor 4.0](https://mdxeditor.dev/) – 功能强大的 Markdown 编辑器 React 组件。
