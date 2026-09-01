# JavaScript Weekly #782
**用 HTML 和 JavaScript 创建视频——HyperFrames**
*2026年4月21日*
[在线阅读](https://javascriptweekly.com/issues/782)

## 🎯 头条

### [HyperFrames：编写 HTML 和 JavaScript 来创建视频](https://hyperframes.heygen.com/)

开源框架，用 HTML 和 JavaScript 创建和渲染视频。本质上是 [Remotion](https://www.remotion.dev/) 的更简单、非 React 的替代方案。包含各种[内置块/组件](https://hyperframes.heygen.com/catalog/blocks/instagram-follow)，支持常见的视频效果和元素，还可以[合成现有视频](https://hyperframes.heygen.com/concepts/compositions)和音频片段。[GitHub 仓库](https://github.com/heygen-com/hyperframes#readme)。

*— HeyGen*

### [Vercel 安全事故：起因是一个 Roblox 作弊器](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)

Vercel 员工使用的一款 AI 工具供应商的员工被恶意软件攻陷（[捆绑在 Roblox 作弊器中！](https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform)），攻击者利用此立足点，通过 Google Workspace 获取了部分 Vercel 客户的环境变量。

*— Vercel*

## 📋 简报

- [Node.js 将默认支持 Temporal API](https://github.com/nodejs/node/pull/61806)，很可能在[下周的 Node v26](https://github.com/nodejs/node/pull/62526#issuecomment-4282061307) 中。
- *Salesforce* 生态开发者现在可以[在 Salesforce 上构建原生 React 应用](https://developer.salesforce.com/blogs/2026/04/build-with-react-run-on-salesforce-introducing-salesforce-multi-framework)。
- Rust 官方包注册表 [crates.io](https://crates.io/) 正在[从 Ember.js 迁移到 Svelte 5](https://blog.rust-lang.org/inside-rust/2026/04/17/crates-io-svelte-public-testing/)。

## 📦 版本发布

- [Node.js 24.15.0 (LTS)](https://nodejs.org/en/blog/release/v24.15.0) – `require(esm)` 和模块编译缓存标记为稳定，新增 `--max-heap-size`。
- [Fable 5.0](https://fable.io/) – 成熟的 F# 转译器，目标语言 JavaScript 等。v5.0 新增 .NET 10 和 F# 10 支持。
- [uuid 14.0](https://github.com/uuidjs/uuid) – 创建 RFC9562 兼容的 UUID（v1 到 v7）。

## 📖 文章与视频

### [Evan You 的 Vue 2026 年度演讲](https://www.youtube.com/watch?v=a9_Ud5MFTjU)

一个月前，Evan You 发表了年度演讲。相比以往更少关注 Vue（尽管 *Vapor Mode*「几乎就绪」），重点放在 Vite 生态更新：涵盖 [Vite 8](https://vite.dev/blog/announcing-vite8)、[Vite+](https://viteplus.dev/) 和 [Void](https://void.cloud/)。

*— Evan You / Vue.js Amsterdam*

### [我如何解决 15000 个循环依赖](https://stefanhaas.xyz/article/15k-circular-dependencies/)

一位微软高级工程师回顾从 700 万行 TypeScript monorepo 中清除约 15000 个项目级循环依赖的经历，提供了管理大型 TS 工作空间的可复用思路。**注意：截至 4 月 24 日这篇文章已不可访问。**

*— Stefan Haas*

### [垂直代码库](https://tkdodo.eu/blog/the-vertical-codebase)

按 `components/`、`hooks/`、`utils/` 等文件夹组织应用起初感觉整洁，但久而久之越来越难维护。Dominik 为垂直、领域优先的方案辩护。

*— Dominik Dorfmeister*

### 🔒 [OWASP NPM 安全最佳实践速查表](https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html)

一份有用且长期维护的清单，持续更新，最近的更新涉及禁用生命周期脚本、打字劫持、可信发布和依赖混淆。

*— OWASP Cheat Sheet Series*

### [我们如何用 AI 让 Angular 编译器更快](https://voidzero.dev/posts/oxc-angular-compiler)

VoidZero 的两名开发者想看看他们能把 Angular 编译器做得多快。结果非常快。

*— Brooklyn 和 Michael Dong (VoidZero)*

## 🛠 代码与工具

### [Bun v1.3.13：更智能的测试、流式安装、更少内存](https://bun.com/blog/bun-v1.3.13)

[Bun](https://bun.com/) 运行时的出色版本系列（包括上周内置浏览器自动化的 [v1.3.12](https://bun.com/blog/bun-v1.3.12)）。`bun test` 新增 `--isolate`、`--parallel`、`--shard`、`--changed` 选项。运行时[现在内存使用减少 5%](https://bun.com/blog/bun-v1.3.13#bun-s-runtime-uses-5-less-memory)，`bun install` 更快等。

*— Jarred Sumner*

### [Animata：100+ 动画 React 组件](https://animata.design/)

一套新颖的动画 React 组件：[动画光束](https://animata.design/docs/background/animated-beam)、[卡片展开](https://animata.design/docs/card/card-spread)、[Slack 风格启动画面](https://animata.design/docs/hero/slack-intro)等不常见的组件。

*— Codse*

### 📄 [officeParser：解析常见办公文件格式的库](https://officeparser.harshankur.com/)

处理 `docx`、`pptx`、`xlsx`、`odt` 等格式，支持浏览器和服务端。[GitHub 仓库](https://github.com/harshankur/officeParser)。

*— Harsh Ankur*

### 🎵 [tiks：Web 的程序化 UI 音效](https://rexa-developer.github.io/tiks/)

用 Web Audio API 合成的点击、弹出和提示音（因此非常小）。

*— Rexa*

- [TypeGPU 0.11](https://github.com/software-mansion/TypeGPU) – TypeScript WebGPU 工具包，可在 TS 中编写着色器。
- 📺 [Shaka Player 5.1](https://github.com/shaka-project/shaka-player) – 自适应媒体播放 JS 库，支持 DASH 和 HLS（[演示](https://shaka-project.github.io/shaka-player/demo/)）。
- [TiddlyWiki 5.4](https://tiddlywiki.com/) – 自包含的个人 JavaScript Wiki（[仓库](https://github.com/TiddlyWiki/TiddlyWiki5)）。
- ✂️ [Knip 6.6](https://github.com/webpro-nl/knip/releases/tag/knip%406.6.0) – 查找并移除未使用的文件、依赖和导出。
- [wasm-xlsxwriter 0.13](https://github.com/estie-inc/wasm-xlsxwriter) – 浏览器或 Node 中生成 Excel 文件。
- [React Three Fiber 9.6](https://github.com/pmndrs/react-three-fiber/releases/tag/v9.6.0) – Three.js 的 React 渲染器。
- [np 11.2](https://github.com/sindresorhus/np) – 更好的 `npm publish`。

## 📢 生态圈动态

- [Git 2.54 发布](https://github.blog/open-source/git/highlights-from-git-2-54/)：`git history` 提供新的交互式编辑提交消息或拆分提交的方式。现在可以在配置文件中定义 hooks 而非仅 `.git/hooks`。
- 如果你用过 *Ruby on Rails*，[rails_vite 很有意思](https://evilmartians.com/chronicles/now-you-see-it-vite-on-rails-without-the-proxy)，将 [Vite](https://vite.dev/) 无缝引入 Rails 管线。
- 💥 [GitHub 存在巨大的「假星」经济](https://awesomeagents.ai/news/github-fake-stars-investigation/)，人们付费让项目看起来比实际更受欢迎。
- Isa Yeter 讲述[如何从 DigitalOcean 迁移到 Hetzner](https://isayeter.com/posts/digitalocean-to-hetzner-migration/)，主机费用削减 84%。
- Cloudflare 发布了[其新 cf CLI 工具的预览版](https://blog.cloudflare.com/cf-cli-local-explorer/)。
