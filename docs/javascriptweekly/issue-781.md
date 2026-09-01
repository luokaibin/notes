# JavaScript Weekly #781
**MDN 抛弃 React 改用 Web Components 重建前端**
*2026年4月14日*
[在线阅读](https://javascriptweekly.com/issues/781)

## 🎯 头条

### [MDN 新前端的底层揭秘](https://developer.mozilla.org/en-US/blog/mdn-front-end-deep-dive/)

[MDN](https://developer.mozilla.org/en-US/) 从头重建了前端技术栈，抛弃 React，采用 Web Components 和自研服务端组件系统。一篇关于构建现代、内容密集型网站而不在每个页面发送不必要 JavaScript 的精彩文章。

*— Leo McArdle (MDN)*

### 🕹️ [Phaser 4.0：2D WebGL 和 Canvas 游戏框架](https://phaser.io/)

广泛使用的游戏框架 13 岁生日，[重大版本](https://github.com/phaserjs/phaser/releases/tag/v4.0.0)聚焦性能/效率改进，包含 [skills 文件](https://github.com/phaserjs/phaser/tree/master/skills)以便 AI Agent 构建 Phaser 4.0 应用。有[大量演示](https://labs.phaser.io/)和 [v3→v4 迁移指南](https://github.com/phaserjs/phaser/blob/master/changelog/v4/4.0/MIGRATION-GUIDE.md)。

*— Phaser Studio Inc.*

## 📋 简报

- Google 6 月起[惩罚「劫持」后退按钮的网站](https://developers.google.com/search/blog/2026/04/back-button-hijacking)。
- [TanStack Start](https://tanstack.com/start/latest) 现在有[（实验性）React Server Components 支持](https://tanstack.com/blog/react-server-components)。
- 🇫🇷 [dotJS](https://www.dotjs.io/) 9 月 18 日巴黎——[CFP](https://www.dotjs.io/speak) 开放中。
- 🇷🇴 [JSHeroes](https://jsheroes.io/) 5 月 14-15 日罗马尼亚。

## 📦 版本发布

- [Bun v1.3.12](https://bun.com/blog/bun-v1.3.12) – 内置原生无头浏览器自动化，[Bun.cron](https://bun.com/blog/bun-v1.3.12#in-process-bun-cron-scheduler) 进程内任务调度器。
- ⚠️ [React 19.2.5](https://github.com/facebook/react/releases/tag/v19.2.5) 等发布，修复 RSC 漏洞。
- [React Native 0.85](https://reactnative.dev/blog/2026/04/07/react-native-0.85) – 新动画后端和 DevTools 改进。
- [pnpm v11.0 RC 0](https://github.com/pnpm/pnpm/releases/tag/v11.0.0-rc.0)、[React Three Fiber 9.6](https://github.com/pmndrs/react-three-fiber/releases/tag/v9.6.0)、[Electron 41.2](https://github.com/electron/electron/releases/tag/v41.2.0)、[DOMPurify 3.4](https://github.com/cure53/DOMPurify/releases/tag/3.4.0)

## 📖 文章与视频

### [安装每一个 Firefox 扩展](https://jack.cab/blog/every-firefox-extension)

一个人用 JavaScript 探索 Firefox 扩展生态的娱乐性和英雄式故事。里面的古怪发现让人大开眼界！就像开发者的《爱丽丝梦游仙境》。

*— Jack Cab*

### [嵌套 Promise 的用途](https://blog.jcoglan.com/2026/03/23/uses-for-nested-promises/)

James 重新审视 2013 年 Promises/A+ monad 争论，遇到了一个实际并发问题改变了他的看法。内容有深度但值得阅读。

*— James Coglan*

### [解析，不要校验（在不想让你这样做的语言中）](https://cekrem.github.io/posts/parse-dont-validate-typescript/)

厌倦了在多个文件中重复写防御性 `if` 检查？Branded types 和 discriminated unions 可以让 TypeScript 替你携带校验完成的证明。

*— Christian Ekrem*

### 🌐 [Intl API：你还没用的最佳浏览器 API](https://polypane.app/blog/the-intl-api-the-best-browser-api-youre-not-using/)

关于 `Intl` 能做什么的代码密集型入门指南。

*— Kilian Valkhof*

## 🛠 代码与工具

### [Boneyard：自动生成 UI 骨架屏](https://boneyard.vercel.app/overview)

截取真实 UI 生成扁平化的骨架「骨骼」列表——精确定位、尺寸匹配。支持 React、Preact、React Native、Vue、Svelte 和 Angular。

*— 0xGF*

### 📈 [Micro-ML：预测和聚类算法工具包](https://github.com/AdamPerlinski/micro-ml)

~56KB WASM 驱动的库，回归和平滑算法。聚类、分类或预测序列中下一个值，无需 TensorFlow.js。

*— Adam Perliński*

### [Ink 7.0：用 React 构建 TUI 和命令行应用](https://github.com/vadimdemedes/ink/releases/tag/v7.0.0)

驱动着[许多流行终端应用](https://github.com/vadimdemedes/ink?tab=readme-ov-file#whos-using-ink)，v7.0 采用 React 19.2，新 hooks 和设置。

*— Vadim Demedes*

### 🔊 [web-audio-api：在 Node 和 Bun 中使用 Web Audio API](https://github.com/audiojs/web-audio-api)

完整 [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) 支持，播放或渲染到文件（[Tone.js](https://tonejs.github.io/) 也能用）。

*— Sébastien Piquemal*

### [Syncpack：大型 JS monorepo 依赖版本一致性工具](https://syncpack.dev/)

CLI 工具（被 Electron、Cloudflare、Vercel 等使用），查找整个 monorepo 版本不匹配，修复并可在 CI 中强制执行策略。

*— Jamie Mason*

- [Mantine 9.0](https://mantine.dev/changelog/9-0-0/) – 包含完整的日历排程组件。
- [wa-sqlite 1.1](https://github.com/rhashimoto/wa-sqlite) – SQLite WASM 构建，支持 JS 虚拟文件系统。
- [gridstack.js 12.6](https://gridstackjs.com/) – 响应式拖放多列仪表盘。
- [Formula.js 4.6](https://formulajs.info/) – Excel 公式函数 JS 版。
- [Lexical 0.43](https://github.com/facebook/lexical/releases/tag/v0.43.0) – Facebook 可扩展文本编辑器框架。

## 📢 生态圈动态

### [Windows 95 作为 Electron 应用](https://github.com/felixrieseberg/windows95)

基于 [v86](https://github.com/copy/v86/) JS+WASM 模拟器的完整 Windows 95 体验。[v5.0](https://github.com/felixrieseberg/windows95/releases/tag/v5.0.0) 可挂载本地文件夹为 Z: 驱动器、共享剪贴板。

*— Felix Rieseberg*

- 🎨 [JSPaint](https://github.com/1j01/jspaint) 新版本——重温 MS 画图。[在线体验](https://jspaint.app/)。
- JS 模块进入 Web 平台[已十年](https://blog.whatwg.org/js-modules)。
- GitHub [「堆叠 PR」私有预览](https://github.github.com/gh-stack/)。
- TanStack 获得 [Solid 2.0 beta 支持](https://tanstack.com/blog/tanstack-start-solid-v2)。
- 🎤 [npmx 项目开发者对话](https://www.igalia.com/chats/npmxyz)。
- [JSON Alexander](https://github.com/wesbos/JSON-Alexander) – Wes Bos 的 JSON 查看器扩展。
