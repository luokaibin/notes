# JavaScript Weekly #774
**Oxfmt Beta：比 Prettier 快 30 倍，100% 兼容**
*2026年2月24日*
[在线阅读](https://javascriptweekly.com/issues/774)

## 🎯 头条

### [Oxfmt Beta：快速、Rust 驱动的 JavaScript 代码格式化器](https://oxc.rs/blog/2026-02-24-oxfmt-beta)

**100% Prettier 兼容**的 JavaScript 代码格式化器（[Oxlint](https://oxc.rs/blog/2025-06-10-oxlint-stable.html) 的姐妹项目），宣称比 Prettier 快 30 倍，比 [Biome](https://biomejs.dev/) 快 3 倍。自 alpha 以来，新增嵌入语言格式化（JSX、YAML、HTML 等）、Tailwind CSS [类排序](https://oxc.rs/docs/guide/usage/formatter/sorting.html#sort-tailwind-css-classes)、[import 排序](https://oxc.rs/docs/guide/usage/formatter/sorting.html#sort-imports)等。

*— Boshen、Dunqing 和 Sugiura (VoidZero)*

## 📋 简报

- Martin Kleppe（以 [tixy.land](https://tixy.land/) 等创意实验闻名）用仅 666 个字符的 HTML 和 JavaScript 创建了[滚动位图 quine](https://aem1k.com/bitquine/)。[这里是带注释的源码](https://github.com/aemkei/aemkei.github.io/blob/master/bitquine/annotated.html)。
- Oracle vs Deno JavaScript 商标案：Oracle [请求延长诉讼程序两个月](https://ttabvue.uspto.gov/ttabvue/v?pno=92086835&pty=CAN&eno=22)，[Deno 已同意](https://x.com/rough__sea/status/2026054678669414832)。
- Patrick Brosset 指出，随着上个月 Firefox 147 的发布，[现在所有主流浏览器都可以在 Service Worker 中使用 JS 模块](https://bsky.app/profile/patrickbrosset.com/post/3mfloileyvs27)了。
- 一个巧妙的技术技巧：[使用浏览器的 Canvas 元素从 JavaScript 压缩文本数据](https://jstrieb.github.io/posts/canvas-compress/)。

## 📖 文章与视频

### [最快的前端工具链（为人类和 AI）](https://cpojer.net/posts/fastest-frontend-tooling)

Christoph（Jest 闻名）介绍了他首选的让 JavaScript 工具栈尽可能快速运行的工具。也面向 LLM 处理，有[此 Markdown 版本](https://cpojer.net/posts/fastest-frontend-tooling.md)。

*— Christoph Nakazawa*

### [再见 innerHTML，你好 setHTML——更强的 XSS 防护](https://hacks.mozilla.org/2026/02/goodbye-innerhtml-hello-sethtml-stronger-xss-protection-in-firefox-148/)

Firefox v148 起[支持](https://caniuse.com/mdn-api_sanitizer) [Sanitizer API](https://wicg.github.io/sanitizer-api/)。与其用 `innerHTML` 将 HTML 赋值给 DOM 节点，不如使用 [setHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML) 默认安全。Chrome 146 (beta) 也添加了支持，但 Safari 还没有，所以 [DOMPurify](https://github.com/cure53/DOMPurify) 仍然有用一段时间。

*— Mozilla Hacks*

### [Node.js 内存使用减半：指针压缩](https://blog.platformatic.dev/we-cut-nodejs-memory-in-half)

Cloudflare、Igalia 和 Node 项目合作开发了 `node-caged`，一个启用 V8 指针压缩的 Node.js 25 Docker 镜像，内存节省高达 50%。Matteo 深入探讨了所有细节。

*— Matteo Collina*

## 🛠 代码与工具

### [OpenSeadragon 6.0：高分辨率图片 Web 查看器](http://openseadragon.github.io/)

这个近 15 年历史的项目迈出了一大步，是渲染超高分辨率图片供用户缩放和平移的少数稳定、可靠选择之一。[版本 6](https://github.com/openseadragon/openseadragon/releases/tag/v6.0.0) 引入了新的异步和缓存管理管线，在规模下效率大幅提升。

*— OpenSeadragon 贡献者*

### [bignumber.js 10.0：任意精度算术库](https://mikemcl.github.io/bignumber.js/)

绕过 JavaScript `Number` 和 `BigInt` 类型的限制，例如需要处理非常大的非整数。库已包含在页面上，可直接在 JS 控制台中试用。

*— Michael Mclaughlin*

### ⏳ [Slowmo：减慢、暂停或加速时间](https://slowmo.dev/)

可作为库或浏览器扩展使用的工具，在浏览器中减慢时间以用于调试和测试目的。可减慢[多种事物](https://github.com/seflless/slowmo?tab=readme-ov-file#what-it-works-with)，包括 CSS 动画/过渡和 `requestAnimationFrame`。

*— Francois Laberge*

### [React Doctor：给 React 代码做一次快速体检](https://www.react.doctor/)

来自 [React Scan](https://react-scan.com/) 和 [React Grab](https://www.react-grab.com/) 的创建者，扫描你的代码库并给出 0-100 分。（[GitHub 仓库](https://github.com/millionco/react-doctor)）。

*— Aiden Bai*

### [Vue Scrollama 3.0：滚动驱动交互的 Vue 组件](https://vue-scrollama.pages.dev/)

[Scrollama](https://pudding.cool/process/introducing-scrollama/) 是一个做所谓「滚动叙事」的库，滚动位置影响视口中某些元素的存在。该项目使其更易于在 Vue 中使用。

*— Vignesh Shenoy*

- [Beautiful Mermaid 1.0](https://github.com/lukilabs/beautiful-mermaid#readme) – 将 Mermaid 图表标记渲染为 SVG 或 ASCII/Unicode 输出。
- 📊 [Plotly.js 3.4](https://github.com/plotly/plotly.js/releases/tag/v3.4.0) – 独立数据可视化库（[示例](https://plotly.com/javascript/)）。
- [pnpm v10.30.0](https://github.com/pnpm/pnpm/releases/tag/v10.30.0) – `pnpm why` 现在显示*反向*依赖树。
- 📄 [DOCX 9.6.0](https://docx.js.org/) – 用 JavaScript 生成/修改 `.docx` 文件。

## 📢 生态圈动态

- 在浏览器中体验[完整的 Windows 3.11 环境](https://pieter.com/)。非常有趣！包含 90 年代搜索引擎 *Altavista* 的重现版、连接到真实 IRC 服务器的 mIRC 版本，以及各种经典游戏。
- Andrew Nesbitt 分享了[关于 Git「魔法」文件的有用指南](https://nesbitt.io/2026/02/05/git-magic-files.html)，包括 `.gitignore`、`.gitmessage` 等。
- 以前在 JavaScript 中模拟 CPU 和游戏机很酷。但现在[有人用 CSS 做了个 x86 CPU 模拟器](https://lyra.horse/x86css/)！
- [Hologram](https://hologram.page/) 是一个有趣的 Elixir Web 框架，将 Elixir 前端代码编译为 JavaScript，[效果惊人](https://hologram.page/blog/porting-initiative-delivers-hologram-v0-7-0)。
- [Tailwind CSS v4.2](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.2.0) 引入 mauve、olive、mist 和 taupe 等新调色板。
- 🎉 [Angular 在 GitHub 上突破 10 万 star！](https://github.com/angular/angular)
