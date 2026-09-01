# ui-tests 视觉测试完整手册（自包含版）

> 对应项目：`~/Documents/work/edwealth-ai/ui-tests`
> 定位：Playwright CT（Component Testing）驱动的**像素级 Figma 1:1 视觉还原验收**，开发期本地验收工具，不是 CI 回归集。
> 本文档为**自包含整合版**，已完整收录项目内 README / ARCHITECTURE / PITFALLS / COLLAB-PLAYBOOK 四份文档的全部内容（架构原理、32 条技术踩坑、22 条协作踩坑、冷启动实验记录、噪音基线），无需再查阅项目内其他文档。
> 整合时间：2026-09-01。原始文档如有更新，以项目内最新版为准。

---

# 第一部分 · 快速上手（手把手）

## 1.1 它是什么

把 React 组件按设计稿逐字 props 挂载到固定视口渲染，截图后与 **Figma REST 导出的 1x 基准图**逐像素对比（超过容差即 FAIL）。核心链路：

```
Figma Frame ID ──(脚手架拉取)──► 基准图 + 背景物料 + 设计事实摘要
                                        │
组件源码 ──(映射为 props)──► Fixtures ──┴──► Playwright CT 渲染截图 ──► 逐像素 diff ──► analyze-diff.py 量化判读
```

- H5 视口 393×844（iPhone UA），PC 视口 1512×982，deviceScaleFactor 恒为 1（对齐 1x 基准）。
- 定位是**开发期本地验收工具**，不是 CI 回归集——用例与基准随设计稿变更即作废，重建成本低（熟练后约 3 分钟/例）。
- `visual/` 用例目录整体 gitignore：用例是一次性验收产物，clone 后按本文重建。

## 1.2 环境搭建（首次一次即可）

### 第 1 步：确认 monorepo 就位

ui-tests 是 `edwealth-ai` monorepo 的 workspace 成员，测试对象是主应用 `apps/token-seek`（Next.js 15 App Router + UnoCSS + Valtio + React Query）里的组件（tsconfig 别名 `@screens/*`、`@components/*` 全部指向它），所以必须连同主应用一起 clone：

```bash
cd ~/Documents/work/edwealth-ai
pnpm install          # 根目录安装（pnpm-workspace.yaml 已包含 ui-tests）
```

### 第 2 步：安装 Playwright 浏览器

```bash
cd ui-tests
pnpm exec playwright install chromium
```

### 第 3 步：准备 FIGMA_TOKEN

脚手架通过 Figma REST API 拉基准图与物料，**只依赖 REST API，不依赖 Figma 桌面端/MCP**。

```bash
# 方式 A：环境变量（推荐）
export FIGMA_TOKEN=figd_xxxxxxxx

# 方式 B：自动降级——脚本读不到 env 时，会尝试从
# ~/.config/kilo/kilo.jsonc 里 figma-framelink 配置的 --figma-api-key= 值提取
```

### 第 4 步：前置自检（强制）

```bash
node scripts/preflight.mjs --component=../apps/token-seek/src/screens/brief/components/BriefCard.tsx
```

- 检查项：运行目录、token 可用性、Figma 连通性（`GET /v1/me` HTTP 200）、被测组件源码存在。
- 任何 ❌ → 按脚本输出的「阻塞报告」处理（缺 token 补 token、组件路径写对），**不要绕过、不要反复重试**。

## 1.3 生成用例的必要输入

| 输入 | 必须 | 说明 |
|---|---|---|
| **Figma Frame ID**（如 `102803:58715`） | ✅ | 设计稿中卡/组件的真实 frame（警惕背景占位帧，见 §4.3 #12） |
| **FIGMA_TOKEN** | ✅ | Figma REST API key |
| **组件源码位置** | ✅ | 读组件 interface，把设计事实映射为 props（fixtures 的核心一步） |
| 卡型命名 slug + 目标 spec 名 | ✅ | `--name=news --spec=MyWidgets.h5.visual` |
| 背景策略 | 自动 | 三来源决策树（§4.3 #16）：子层 crop / root fill SVG 提取 / 产线 CDN |
| 条件态（付费/登录等） | 按需 | QueryClient 缓存预填 wrapper（§4.3 #14） |
| 动态数据真实样例 | 按需 | 设计稿示例值即可用于验收；接口样例更佳 |

## 1.4 为一个组件生成视觉用例（核心流程四步）

「📜 生成者契约 v2」：**你只负责生成文件，不负责让它跑通。** 流程固定为四步，工具即护栏。时间预算：首例 ≤ 8 分钟，后续每例 ≤ 3 分钟，总预算 = 8 + 3×(N-1) 分钟，到点未完成 → 停止并产出「进度 + 卡点 + 疑问清单 + 建议」。

### 第 1 步：生成骨架（可选，新组件建议）

```bash
node scripts/new-case.mjs --component=MyWidget    # PascalCase 组件名
```

生成 `visual/MyWidget/` 下的 `MyWidgetFixtures.tsx`、`MyWidgets.h5.visual.spec.tsx`、`MyWidgets.pc.visual.spec.tsx`（含 wrappers/ 目录）。mount 循环、getter 形态、import 形态都已预写好，只需填数据槽。已存在则拒绝覆盖（幂等安全）。

### 第 2 步：脚手架拉取基准与背景物料

```bash
node scripts/sync-figma-baseline.mjs \
  --node=<FrameId> --name=<slug> \
  --spec=MyWidgets.h5.visual \
  --dir=visual/MyWidget \
  [--bg=child|svg|cdn:<url>] [--file=<fileKey>]
```

| 参数 | 说明 |
|---|---|
| `--node` | Figma Frame ID（必填） |
| `--name` | 资产命名 slug（必填），如 `news`、`pick-paid` |
| `--spec` | 目标 spec 名（必传，决定 `-snapshots/` 基准目录名） |
| `--dir` | 组件目录，新组件传 `visual/MyWidget`（默认 `visual/BriefCard`） |
| `--bg` | 背景策略三选一：`child`（默认，有独立背景子层）；`svg`（frame root 是 IMAGE fill 无子层，走 REST SVG 提取内嵌 base64 原图）；`cdn:<url>`（直接用产线真图） |
| `--file` | Figma fileKey，默认 `5u9TvHh6FzxydDBW6ncDja`（Edgen 開發文檔） |

脚本产出：

1. frame 1x 整图 → `{spec}-snapshots/figma-{name}-chromium-darwin.png`（**基准唯一存放处**）；
2. 背景层导出到 `assets/figma-bg-{name}-raw.png`（带 frame 尺寸后缀防双端互覆）；
3. stdout 打印**设计事实摘要**（design facts digest）：mountSize / 背景信息（或纯色底检测）/ 文案 hints / 全量文案表——脚本**设计中立**，不产出任何组件的 props，props 组装由使用者读组件 interface 完成；
4. 若背景层需要裁剪，stdout 给出**完整可复制执行的 PIL 裁剪命令**——原样执行，不要改参数（box 语义 left/upper/right/lower 已显式求值，历史上手改参数踩过坑，见 §4.4 轮 2）。

### 第 3 步：组装 fixtures（唯一需要动脑的一步）

打开 `MyWidgetFixtures.tsx`，读组件 interface，把设计事实摘要映射为 props，在 **getter 函数**里加数据条目。照抄现成范例最稳：`visual/BriefCard/BriefCardFixtures.tsx`（getter + 背景图 ES import）+ `visual/BriefCard/BriefCards.h5.visual.spec.tsx`（双端循环挂载）。

**⛔ CT 挂载硬约束（违反即挂载失败/构建失败，全部是真实踩坑沉淀）：**

1. **mount 的组件必须定义在 spec 文件之外**——Playwright CT 会把 spec 文件内的内联组件判为「定义在测试文件中」直接拒绝挂载（报 `Component "Xxx" cannot be mounted`）。一切 wrapper/装饰组件（如 QueryClientProvider 包装）放 `wrappers/` 独立文件，spec 只 import 使用。
2. **默认态直接挂被测组件本身**——不要为「保险」给正常用例额外包 wrapper（冷启动实验轮 1 的全挂缺陷即此）。
3. **spec 内不得定义任何 React 组件**（哪怕看似无害的装饰），只允许数据/常量/纯函数。
4. **fixtures 不得用顶层常量立即消费资产 import**——vite-node 的 ESM/CJS interop 会把 png/webp import 编译为 lazy getter，模块 init 期被顶层 `const CASES = [{ url: bg }]` 立即求值 → `Cannot access 'xxx' before initialization`（TDZ）。**CASES 一律写成 getter 函数**（`export const getXxCases = (): Case[] => [...]`），spec 内调用取数。
5. **背景资产提取允许 REST SVG**——当卡为 frame root IMAGE fill（无独立背景子层）时，按 §4.3 #16 路径 2 用 Figma REST 导出 SVG 并提取内嵌 base64 原图合成，这是生成环节的合法操作，不算「绕过脚手架」。
6. **覆盖层组件**（`absolute inset-0` 类）需在 `mountFigmaFrame` 容器外加 `position:relative` 的定位容器，否则压暗层锚定到页面根。
7. **背景资产放 `visual/{Component}/assets/` 本地 ES import**（vite 直接处理），不要往主应用 public/ 写文件。

fixtures 写法范例（BriefCard 实际结构，H5 背景放 smallUrl+default，PC 放 bigUrl+default）：

```tsx
import newsBgH5 from "./assets/figma-bg-news-340x415.png";

export interface BriefCardCase {
  name: string;                                  // 全组件目录内唯一；PC 用例加 -pc 后缀
  frame: { width: number; height: number };      // Figma frame bbox = 基准图尺寸
  card: EnrichedBriefCard;
  unpaid?: boolean;                              // 条件态标志 → spec 里走 wrapper
}

export const getH5CardCases = (): BriefCardCase[] => [   // ⛔ 必须 getter，禁止顶层常量
  {
    name: "news",
    frame: { width: 340, height: 415 },
    card: {
      id: "visual-news-h5",
      type: "NEWS",
      title: "Nvidia rips to a fresh record, up 4.2% overnight",
      description: "NVDA just broke its 52-week high. ...",
      defaultUrl: newsBgH5,
      smallUrl: newsBgH5,        // H5：<768px 源；PC 用 bigUrl（≥768px 源），放错字段图片不换但语义错
      businessType: "NEWS",
      catIds: ["track", "ask_ed", "dislike"],
      eyebrow: { icon: "news", text: "News For You" },
      pickInfo: null,
      goalInfo: null,
    },
  },
  // ...
];
```

spec 形态（双端循环，仅 import 不定义组件）：

```tsx
import { expect, test } from "@playwright/experimental-ct-react";
import { BriefCardView } from "@screens/brief/components/BriefCard";
import { MOBILE_VIEWPORT, SCREENSHOT_OPTIONS, mountFigmaFrame, waitForRenderStable } from "../../visualTestUtils";
import { getH5CardCases } from "./BriefCardFixtures";
import { BriefCardUnpaidWrapper } from "./wrappers/BriefCardUnpaidWrapper";

test.use(MOBILE_VIEWPORT);

for (const caseDef of getH5CardCases()) {
  test(`figma-${caseDef.name}`, async ({ mount, page }) => {
    const card = <BriefCardView card={caseDef.card} isTracked={false} onTrack={async () => {}} onDislike={() => {}} interactive />;
    const component = await mountFigmaFrame(
      caseDef.unpaid ? <BriefCardUnpaidWrapper>{card}</BriefCardUnpaidWrapper> : card,
      caseDef.frame,
      mount,
    );
    await waitForRenderStable(component, page);
    await expect(component).toHaveScreenshot(`figma-${caseDef.name}.png`, SCREENSHOT_OPTIONS);
  });
}
```

### 第 4 步：静态校验（强制收尾）

```bash
node scripts/validate-visual-tests.mjs
```

秒级完成，检查项（C1~C7）：spec 内不得定义组件、Cases 必须 getter、legacy 目录、import 存在、基准图存在、基准图↔frame 尺寸一致、游离基准告警。有 ❌ 按报错自带修法修复后重跑，**通过才算生成完成**。

**仍然禁止**（生成者契约）：向 ui-tests/ 之外的任何路径写文件、跑 playwright/vite/tsc/jest、研究构建机制、验证 import 别名、使用任何 MCP 工具（`figma-talk-to-figma` 需要桌面端频道码无法自行获得，历史上导致过长时间无效尝试）。环境信任原则：现有示例怎么写就怎么抄，疑虑记疑问清单（继续生成！），由人诊断。

### ⛔ 工具止损协议（生成前必须执行的前置自检）

1. **FIGMA_TOKEN 可用性**：`echo $FIGMA_TOKEN`；为空则从 `~/.config/kilo/kilo.jsonc` 的 `figma-framelink` 配置提取 `--figma-api-key=` 后的值并 `export`（一次性降级路径，不算无效尝试）。
2. **连通性验证**（30 秒内完成）：`curl -s -H "X-Figma-Token: $FIGMA_TOKEN" "https://api.figma.com/v1/me"`；HTTP 200 → 继续；403/超时 → **立即停止并报告**。
3. **停止条件**：任何关键输入（token / Frame ID / 组件源码路径）缺失或验证失败时，**不要**：反复重试同类请求、尝试其他 Figma 工具、绕过脚手架自造资产、猜测 props。**要**：输出「阻塞报告」——缺失项 + 已尝试的动作（一次即可）+ 给人的建议，然后结束任务。
4. **超时纪律**：单个网络/构建操作超过 2 分钟无进展 → 视同失败，走第 3 条。

遇到文档与探测矛盾时：以文档与现有示例为准，矛盾点记入疑问清单。

## 1.5 跑测与判读

```bash
# 1. 跑测：用完整 spec 名（子串过滤会同时命中 h5/pc 两个 spec 互踩，见 §4.3 #13）
pnpm exec playwright test MyWidgets.h5.visual

# 常用变体
pnpm test              # playwright test
pnpm test:ui           # 交互面板
pnpm test:debug        # 调试模式
pnpm exec playwright test --headed        # 有头 + 自动开 DevTools
pnpm exec playwright show-report          # HTML 报告（reporter 是 list，结束即退不弹报告）

# 2. 失败时量化分析 diff（agent 判读的"眼睛"）
python3 scripts/analyze-diff.py "results/<失败test目录>" --expect=0.12
# --expect 值取自 baselines.json 登记的残差率；输出 PASS / REGRESSION 判定（含 ±2% 容差）
```

`analyze-diff.py` 输出：尺寸一致性检查、10 横带差异占比（定位差异垂直分布）、差异像素坐标聚类（水平分布）、关键区域平均色对比（top/mid/bottom/btn）。它处理目录内的 `*-expected.png` / `*-actual.png` 截图对。

**残差指纹速查（量化输出 → 归因）：**

| 指纹 | 归因 | 动作 |
|---|---|---|
| 全域 >90% + 顶底偏亮/中段偏暗 | 背景几何错位（object-cover 裁切 ≠ Figma 拉伸） | 修资产裁剪 |
| 中段全域低幅（<25%） | Figma vs Chromium 渲染管线系统性噪音（基线登记内） | 无需处理 |
| 单一横带高差异 | 文案/字号/行高不一致 | 修组件或 fixtures |
| 底部按钮区偏亮 | 已知疑似真实差异（跨端族问题，待裁决） | 对照 Figma 后进 UI 还原 TODO |
| 残差率显著高于 baselines.json 登记值 | 本次改动引入回归 | 排查改动 |

新卡校准通过后，把残差 ratio **登记进 `baselines.json`**，作为后续重跑的回归判读锚点。

## 1.6 固定配置（不要在 spec 里手写）

全部固化在 `visualTestUtils.tsx`（根目录共享层），所有 spec 统一 import：

| 导出 | 值 | 说明 |
|---|---|---|
| `MOBILE_VIEWPORT` | 393×844 + iPhone UA（iOS 18_5）+ isMobile/hasTouch，dsf=1 | H5；393 = 设计稿 H5 frame 宽，渲染口径与设计稿对齐 |
| `PC_VIEWPORT` | 1512×982 + 默认桌面 UA，dsf=1 | PC |
| `SCREENSHOT_OPTIONS` | `maxDiffPixelRatio: 0.08, threshold: 0.3, animations: "disabled"` | 容差历史为 2%，2026-08-19 还原度阶段定稿为 8%（8% 像素差异内通过 = 92% 相似度）；threshold 0.3 吸收字形抗锯齿噪音同时保留结构性颜色/布局偏差检出 |
| `waitForRenderStable()` | fonts.ready + img 解码轮询（10s 超时） | 稳定等待统一实现，勿在 spec 内手写变体 |
| `mountFigmaFrame(el, {width,height}, mount)` | 容器 div = Figma frame bbox | 容器尺寸必须与基准图一致（规则固化成函数，杜绝手写错尺寸） |

两端 deviceScaleFactor 恒为 1（对齐 Figma REST scale=1 导出的 1x 基准）。

## 1.7 维护场景

| 场景 | 动作 |
|---|---|
| 换机 / clone 后 | `visual/` 不存在 → 按 §1.4 重建（Frame ID 清单从需求文档/PM 处获取） |
| 设计稿变更 | 只重跑变更卡的脚手架（新基准覆盖旧）+ 对应 fixtures 数据更新 |
| 组件 props 契约变更 | 修 fixtures 映射；spec 与基建不动 |
| 改了 spec 的 import 路径后报旧缓存错 | `rm -rf playwright/.cache node_modules/.vite`（CT 聚合缓存持有旧模块图，报错指向 40 行的 index.tsx:238 这种幻觉行号即是它） |
| 新增卡型 | fixtures 加一条数据，spec 零改动 |

## 1.8 目录结构与提交策略

```
ui-tests/
├── visualTestUtils.tsx          # 共享层：双端视口/容差/稳定等待/mountFigmaFrame（全组件共享）
├── scripts/
│   ├── preflight.mjs            # 第 0 步前置检查（token/连通性/组件路径）+ 阻塞报告
│   ├── new-case.mjs             # 新组件骨架生成器（L0 结构防呆）
│   ├── sync-figma-baseline.mjs  # 脚手架：Figma 节点 → 基准 + 物料 + 设计事实摘要
│   ├── validate-visual-tests.mjs# 静态校验器（L2，强制最后一步）
│   └── analyze-diff.py          # diff 量化分析（agent 的眼睛）
├── playwright.config.ts         # CT 核心配置
├── uno.config.ts                # re-export 主应用 uno.config + 覆盖 content 扫描路径
├── tsconfig.json                # 路径别名（@screens/* 等 → apps/token-seek/src/*）
├── mocks/                       # 仅 Next.js 运行时 mock（image/link/router/navigation/font/dynamic）
├── vite-plugins/auto-fonts.ts   # 自动字体插件（解析主应用 fonts config → 虚拟模块）
├── playwright/                  # CT 挂载页模板 + beforeMount CSS 注入入口
├── baselines.json               # 噪音基线（机器可读，analyze-diff --expect 消费）
├── results/                     # 执行结果（config outputDir；gitignored）
└── visual/                      # ⛔ 全目录 gitignored（用例不提交）
    └── {Component}/             # 命名规范：每组件一个目录，PascalCase
        ├── {Component}s.h5.visual.spec.tsx          # H5 spec
        ├── {Component}s.h5.visual.spec.tsx-snapshots/   # 基准图（Playwright 派生命名，不可改名）
        ├── {Component}s.pc.visual.spec.tsx          # PC spec
        ├── {Component}s.pc.visual.spec.tsx-snapshots/
        ├── {Component}Fixtures.tsx                  # 卡型数据驱动表
        ├── assets/                                  # 背景物料（crop 前后）
        └── wrappers/                                # 条件态注入（如未付费）
```

**提交策略（已定稿）**：基建提交（utils/scripts/mocks/文档/config）；`visual/` 用例目录整体 gitignore——一次性验收产物（设计稿变更即作废），重建约 3 分钟/卡；防回归价值由本机保留的 visual/ 承担，不依赖仓库。snapshots 目录名由 Playwright 从 spec 文件名派生（`*.spec.tsx-snapshots`），**不可改名**（曾试 `__visual__` 前缀 → 基准解析失败风险，已回退）。

---

# 第二部分 · 架构与原理

## 2.1 现状概述

- **主应用**：`apps/token-seek`（Next.js 15 App Router + UnoCSS + Valtio + React Query）
- **测试包**：`ui-tests/`（独立 workspace 包，Playwright CT + Vite）
- **状态**：✅ 可用。BriefCard 等真实组件可挂载渲染、截图、视觉对比。
- **历史**：早期版本的桶文件污染问题（`@hooks` barrel → 199 个 `export *` → 循环依赖崩溃）已由主应用侧重构解决（hooks/store barrel 已删除，改为直接路径导入）。测试侧不再需要任何 hooks/store mock。

## 2.2 playwright.config.ts 逐项说明

| 配置 | 值 | 原因 |
|------|-----|------|
| `testDir` / `outputDir` | `./visual` / `./results` | 用例目录与结果目录分离，results 已 gitignore |
| `ctPort` | 3100 | CT 的 Vite dev server 端口 |
| `reporter` | `'list'` | 终端直出、结束即退。HTML 报告按需 `playwright show-report` |
| `ctViteConfig.plugins` | `UnoCSS() + autoFontsPlugin()` | 样式两件套 |
| `ctViteConfig.publicDir` | 主应用 `apps/token-seek/public` | `/assets/*` 静态资源对齐（dislike.svg 等；Next.js 自动做的事，Vite 要手动对齐） |
| `ctViteConfig.resolve.alias` | 6 个 next/* mock | Next.js 服务端模块在浏览器不可用（image/link/router/navigation/font/dynamic） |
| `ctViteConfig.esbuild.jsx` | `'automatic'` | Vite 默认不启用 JSX |
| `connectOptions`（可选） | `CT_BROWSER_URL` 环境变量 | 连接已开的 Chrome（CDP）；http:// 自动请求 `/json/version` 转成 ws://（Playwright 要 ws 端点，直接给 http:// 报 startsWith 错误） |
| `launchOptions.args` | `--auto-open-devtools-for-tabs` | 有头模式自动开 DevTools（连外部浏览器时不生效） |
| `retries` | CI 2 次 / 本地 0 | — |

## 2.3 uno.config.ts —— 单一事实来源 + 一处覆盖

```ts
import baseConfig from '../apps/token-seek/uno.config';
export default {
  ...baseConfig,
  content: {
    pipeline: {
      // 必须从 exclude 里删掉 **/*.spec.* —— 主应用排除测试文件，但我们恰恰要扫描
      exclude: (baseConfig排除项).filter(p => !p.includes('.spec.')),
      include: [
        // 主应用 config 的 "src/**" 是相对路径，从 ui-tests 运行时解析落空
        // 必须重写为绝对路径，否则类名进 DOM 但样式不生成
        here('../apps/token-seek/src/**/*.{js,ts,jsx,tsx}'),
        here('../packages/osp-ui/src/**/*.{js,ts,jsx,tsx}'),
        here('**/*.{ts,tsx}'),
      ],
    },
  },
};
```

主题变量（`--edgen-*`）、shortcuts、字体规则全部自动跟随主应用。

## 2.4 playwright/index.tsx —— CSS 注入顺序（顺序即优先级）

```ts
import '../../apps/token-seek/src/app/globals.css'; // ① reset + 基础样式（先）
import 'virtual:fonts.css';                         // ② 字体 @font-face + :root 变量
import 'virtual:uno.css';                           // ③ 工具类（最后，可覆盖①②）
```

同优先级后加载者胜：globals.css → fonts → uno.css（工具类最后）。

## 2.5 vite-plugins/auto-fonts.ts —— 自动字体

- 构建时解析 `apps/token-seek/src/config/fonts/index.ts` 的 `localFont({...})` 声明
- 生成 `virtual:fonts.css`：@font-face（url 指向真实字体文件）+ `:root { --font-* }`
- **family 命名规则**：`--font-osp-icons` → `"OspIcons"`（PascalCase）。必须与 `globals.css` 里 `.osp-icon { font-family: "OspIcons" }` 对齐，否则图标字体加载了但用不上（表现为图标空白/豆腐块）
- 主应用字体增删改 → 测试自动跟随，零维护
- 插件内部对 `__dirname` 做了归一化处理（构建链路中它可能指向 ui-tests 根或 vite-plugins/）

## 2.6 Playwright CT 的双运行时架构（最重要的心智模型）

```
spec 文件 → Node.js 测试运行器（Playwright 编译，不经过 Vite）
              ↓ mount() 序列化 React 元素
           浏览器 ← Vite 构建的组件代码（playwright/index.tsx 依赖图）
```

推论：

- **spec 里写 uno class 不生成样式**（CT 双运行时：spec 在 Node 跑不经过 Vite，UnoCSS 扫描不到）——样式写在被 mount 的组件文件里；临时尺寸用 `style={}`，常用样式抽组件
- **本地图片用 ES import**（`import bg from './x.webp'`，Vite 转真实 URL）；字符串相对路径 `'./x.png'` 在浏览器是 HTTP 请求 → 404 空白
- mock 里不能用 `jest.fn()`（CT 环境无 jest），用普通函数；浏览器侧没有 `global`，用 `globalThis`

## 2.7 视觉回归对比机制

```ts
await expect(component).toHaveScreenshot('name.png', SCREENSHOT_OPTIONS);
```

- 首次运行生成 baseline 到 `*.spec.tsx-snapshots/`；之后逐像素对比
- 基准带 `-chromium-darwin` 平台后缀：本地跑顺阶段 OK，CI(Linux) 会另生一套（已知未处理）
- test ↔ 基准映射：`-snapshots/` 是 **spec 文件级**目录（同文件所有 test 共用），每个 test 由 `toHaveScreenshot("figma-{name}.png")`（name 来自 fixtures）自动加平台后缀后在本 spec 文件的 snapshots 目录解析；双端隔离靠两个 spec 文件各自的 snapshots 目录，同文件内靠 case name 唯一
- `toHaveScreenshot` 默认 `scale: 'css'`（1x）；2x 需 `deviceScaleFactor: 2` + `scale: 'device'`——**已放弃 2x，无必要**
- 失败产物：`results/` 下 expected/actual/diff 三张图 + error-context.md（同次运行内各失败 test 子目录共存，跨次运行清空重建）

## 2.8 已知限制

| 限制 | 说明 |
|------|------|
| 截图只支持 PNG | Playwright 硬限制；输入物料用 webp（体积约 1/7），输出必须 PNG |
| spec 内联样式用 style={} | uno class 写 spec 里不生效（双运行时），常用样式抽组件 |
| gen:api 代码含非法语法 | `export type undefined = undefined` 需注释（重新生成会回来，已知债务） |
| 完整依赖链体积大 | 真实 BriefCard 构建含 7000+ 模块（i18n 4.5MB chunk 等），首跑构建慢属正常 |
| Figma 对比有固有偏差 | 渲染 vs 设计稿存在系统性低幅全域差（详见 §4.3 #6），容差需覆盖该值 |

## 2.9 调试口诀

- 浏览器停住：放开 spec 里 `waitForTimeout` 注释 + 命令加 `--timeout=660000`
- `waitForTimeout` 是油门（真的停），`--timeout` 是上限（允许停多久），**两者都要**
- 断言：mount 返回的 locator 本身就是根，直接 `expect(component).toHaveText(...)`
- 可选连接本机 Chrome：

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
CT_BROWSER_URL=http://127.0.0.1:9222 pnpm exec playwright test MyWidgets.h5.visual
```

---

# 第三部分 · 技术踩坑 32 条（PITFALLS 全录）

## 3.1 最大的一课：循环依赖（已由主应用重构解决）

**现象**：BriefCard 挂载即崩 `AlphaMarketTabEnum.US undefined`

**根因**：不是路径解析问题，是**循环依赖**。ESM 遇到环返回部分初始化的对象：

```
store/index.ts:6 export * from "./modules"（开始执行）
  → 15 层依赖链 → investMarketRouting.ts 回头 import "@/src/store"
  → store/index.ts 还在执行第 6 行，第 7 行的 types（AlphaMarketTabEnum 所在）未导出
  → undefined → 顶层访问 .US 崩溃
```

**为什么生产环境不崩**：Webpack 打包重排了模块求值顺序；Vite 按原生 ESM 严格按 import 顺序求值，暴露了隐藏的环。

**走过的弯路**（全部失败）：
- Vite alias 拦截 `@/src/hooks` → tsconfig paths 优先级更高
- `enforce: 'pre'` 自定义插件 resolveId → 插件未被调用
- ui-tests/tsconfig.json paths 覆盖 → CT 用主应用 tsconfig
- 修改主应用 tsconfig paths → barrel 拦截成功，但子路径 `@/src/hooks/useOpportunities` 泄漏

**最终解法**：桶文件重构（主应用删除 hooks/store barrel，全部直接路径导入）后问题彻底消失。**结论：架构债务应在业务侧修，不在测试侧兼容。**

## 3.2 环境与构建类（9 条）

| # | 坑 | 现象 | 解法 |
|---|-----|------|------|
| 1 | tsconfig 路径别名不解析 | `@screens/*` 找不到模块 | ui-tests 自己的 tsconfig paths + Vite 解析 |
| 2 | JSX 不解析 | .tsx 语法错误 | `esbuild: { jsx: 'automatic' }` |
| 3 | Next.js 服务端模块不可用 | next/image、next/router 等报错 | 6 个 Vite alias mock |
| 4 | `next/navigation` 漏 mock | mount 30s 超时 | Pages Router 的 next/router 和 App Router 的 next/navigation 是两个模块，都要 mock |
| 5 | 自动生成代码非法语法 | `export type undefined = undefined` 构建失败 | 注释掉（`gen:api` 重新生成会回来，已知债务） |
| 6 | dayjs 未安装 | 空测试也 mount 超时 | ui-tests 显式装 dayjs；错误信息不指向真因，靠二分法定位 |
| 7 | `(global as any).dayjs` | 浏览器 ReferenceError | 浏览器无 `global`，必须用 `globalThis` |
| 8 | mock 里用 `jest.fn()` | `ReferenceError: jest is not defined` | CT 环境无 jest，mock 一律用普通函数 |
| 9 | 大依赖链构建超时 | 7355 模块 120s 不够 | 真实组件可跑，仅首跑慢属正常 |

## 3.3 样式类（6 条）

| # | 坑 | 现象 | 解法 |
|---|-----|------|------|
| 10 | UnoCSS 样式不生成 | 类名在 DOM、CSS 规则没有 | 主应用 config 的 `content.pipeline.include` 是相对路径，从 ui-tests 运行时解析落空。**必须覆盖为绝对路径** |
| 11 | include 加了 spec 还是不生成 | 同上 | 继承的 exclude 里有 `**/*.spec.*`，exclude 优先于 include，**必须 filter 掉** |
| 12 | spec 里写 uno class 无样式 | DOM 有类名无规则 | CT 双运行时：spec 在 Node 跑不经过 Vite。**样式写在被 mount 的组件文件里** |
| 13 | `@ospweb/sdk-ui` 解析失败 | uno.config re-export 静默退化（残渣 CSS） | ui-tests 加 `@ospweb/sdk-ui: "workspace:*"` |
| 14 | 缺 globals.css | 缺 reset/基础样式 | index.tsx import 主应用 globals.css |
| 15 | CSS 顺序反了 | 基础样式覆盖组件样式 | 同优先级后加载者胜：globals.css → fonts → uno.css |

## 3.4 字体类（3 条）

| # | 坑 | 现象 | 解法 |
|---|-----|------|------|
| 16 | 字体不加载 | 文字用 PingFang 回退字体 | auto-fonts 插件自动解析主应用 config，零维护 |
| 17 | OspIcons 加载了但没生效 | 图标空白/豆腐块 | family 命名不对齐：插件生成 `"font-osp-icons"`，globals.css 要 `"OspIcons"`。命名规则 PascalCase |
| 18 | `__dirname` 指向不稳 | 插件读不到 fonts config | 构建链路中可能是 ui-tests 根或 vite-plugins/，两种都归一化处理 |

## 3.5 图片与截图类（8 条）

| # | 坑 | 现象 | 解法 |
|---|-----|------|------|
| 19 | 本地图片字符串路径 | 背景图空白 | 用 `import bg from './x.webp'`（Vite 转真实 URL） |
| 20 | public 静态资源 404 | dislike.svg 裂图 | `publicDir` 指向主应用 `public/` |
| 21 | 截图过早 | 背景图空白/半透明 | 三重等待：`document.fonts.ready` + 轮询 `img.complete && naturalWidth > 0` + `animations: 'disabled'` |
| 22 | `visible` ≠ 加载完成 | 以为等到了其实没有 | visible 只代表 DOM 可见；404 图片 complete=true 但 naturalWidth=0 |
| 23 | 过渡动画截到中间帧 | opacity 渐变半途 | `animations: 'disabled'` 是**快进到终态**，不是打断 |
| 24 | 截图 2560px 宽 | 尺寸失控 | mount 容器是块级元素撑满视口；加 `display: 'inline-block'` 让宽度由内容决定（现由 mountFigmaFrame 固定尺寸容器解决） |
| 25 | 图片体积过大 | 2.6MB 背景图加载慢 | 输入图统一 webp（sharp 转，-86%）；输出图必须 PNG |
| 26 | 2x 对比尺寸不符 | expected 1476×978 vs actual 738×489 | `toHaveScreenshot` 默认 `scale: 'css'`（1x）。**已放弃 2x，无必要** |

## 3.6 工具与流程类（6 条）

| # | 坑 | 现象 | 解法 |
|---|-----|------|------|
| 27 | HTML reporter 卡住 | 测试完弹报告页不退出 | `reporter: 'list'`；要报告手动 `playwright show-report` |
| 28 | waitForTimeout 与 timeout 关系混乱 | 加了 `--timeout` 浏览器还是秒关 | 两者都要（见 §2.9） |
| 29 | CDP 连接报 startsWith 错误 | connectOptions 给 http:// 失败 | Playwright 要 ws:// 端点；config 里自动请求 `/json/version` 转换 |
| 30 | 断言写法 | `getByTestId` 找不到根元素自身 | mount 返回的 locator 本身就是根 |
| 31 | 快照 baseline 尺寸错配 | expected/actual 尺寸不同直接判败 | baseline 尺寸必须与实际截图一致（由 mountFigmaFrame + 脚手架尺寸校验保证） |
| 32 | Figma 对比固有偏差 | 渲染 vs 设计稿恒有低幅全域差 | 字体渲染/抗锯齿的正常差异；详见 §4.3 #6 噪音基线 |

## 3.7 经验法则（沉淀）

1. **架构问题在业务侧修，测试侧不兼容** —— 桶文件循环依赖的教训
2. **单一事实来源** —— uno.config re-export、auto-fonts 解析主应用 config，主应用改了测试自动跟随
3. **CT 双运行时心智模型** —— spec 在 Node，组件在 Vite；凡是"构建期扫描"的能力（UnoCSS）对 spec 无效
4. **错误信息会骗人** —— dayjs 缺失表现为 mount 超时；字体加载成功但 family 名不对表现为图标空白。二分法 + 产物检查（CSS/bundle 内容）最可靠
5. **截图前等三样** —— 字体、图片解码、动画终态；缺一个就会截到中间态

---

# 第四部分 · 人 × Agent 协作手册（COLLAB PLAYBOOK 全录）

> 记录「人和 agent 配合做 UI 视觉测试」的分工、稳定流程、踩的坑。首例：新闻卡 `102803:58715`（2026-08-18）。

## 4.1 分工模型（首例验证有效）

| 环节 | 人 | Agent |
|---|---|---|
| Figma 就绪 | 桌面端打开文件、报频道码 | REST API 拉节点树（bbox/文本/fills） |
| 节点信息 | 给 Frame ID 清单 | REST API 拉节点树 |
| 基准图 | 确认 1x 口径 | REST `scale=1` 导出 → -snapshots/ |
| 背景资产 | —— | 背景层节点单独导出，按 frame 窗口裁剪 |
| 写 spec/fix持tures | review 流程 | 从设计事实摘要读组件 interface 映射 props → mount → 稳定等待 → toHaveScreenshot |
| 判读 diff | **看图做最终裁决**（agent 不能读图） | `analyze-diff.py` 量化给出定位假设 |
| 容差/通过标准 | 定夺 | 提供数据支撑 |

**核心约束：agent 全程不"看"图。** 所有视觉判断 = 量化脚本输出 + 人的肉眼裁决。这张表是流程能稳定复制的原因——两边能力边界清晰。

## 4.2 稳定流程 SOP（首例约 8 分钟含熟悉成本，后续每例约 3 分钟；1~3 步已脚本化）

```
0. 前置：FIGMA_TOKEN；节点 ID 来自设计稿定位
1.【自动化】脚手架一条命令：sync-figma-baseline（产出基准图/背景物料/crop 指令/设计事实摘要）
   ⚠️ 脚本是设计中立的提取器——不产出任何组件的 props
   无背景图层时自动跳过资产与裁剪（ℹ️ 提示），颜色底由组件 token 自带
2.【人工】（仅当有背景图）执行 crop 指令（PIL）→ 背景资产落 assets/
3.【agent】按摘要写 fixtures：先读组件源码 interface，把设计事实映射成该组件的 props
   H5 资产放 smallUrl+default，PC 放 bigUrl+default
4. 首跑（预期红）→ python3 scripts/analyze-diff.py <results 目录>
5. 人看 expected/actual/diff 三图 + agent 的量化假设 → 裁决差异性质
6. 归因闭环：噪音（资产/管线）修资产或容差；真实还原差异 → 记 TODO 留 UI 还原阶段；
   校准后 ratio 登记 baselines.json
```

> 回验记录（2026-08-18）：脚本对两例既有卡产出的基准图与背景裁剪资产，与手工版**逐字节一致**（cmp 验证）。

## 4.3 协作层踩坑 #1~#19（全录）

### #1 agent 读不了图 —— 一切判读走量化
- Figma export 与 Playwright 三图附件都返回图片，**当前模型不支持图片输入**。
- 解法：`analyze-diff.py`（横带分布 + 区域均色 + 聚类）是 agent 的眼睛；语义判读模式库（几何错位/色彩噪音/单带文案差异的指纹）已写进脚本头部注释。

### #2 背景图不能按 imageRef 反查
- 文件级 `GET /v1/files/{key}/images` 只返回 1 个 ref（与节点树里的 imageRef 对不上）。
- 解法：**导出背景层节点本身**（png 含 scrim 合成 / svg 含 base64 原图），不查 ref 表。

### #3 背景资产必须按「frame 裁剪窗口」处理，不能 resize
- 首例：背景层 340×440 在 frame（340×415）内 Δy=-25。
  - 错误做法：resize 440→415（整体压缩）→ 20% 残差；
  - 正确做法：`crop((0, 25, 340, 440))`（顶裁 25px，底对齐）→ 12%。
- 组件 `object-cover object-center` 对"已按窗口裁剪的等比图"是恒等变换 → 噪音最小。

### #4 基准与容器尺寸强绑定
- 容器 div 必须 = frame bbox（如 340×415），写错直接 size mismatch。
- 基准带 `-chromium-darwin` 后缀，CI(Linux) 会另生一套（已知未处理）。

### #5 spec 命名与目录
- test 名：**必须英文**（中文 → test-results 目录乱码）。
- 命名规约：spec 文件 `{Component}{Variant}.visual.spec.tsx`（PascalCase）；test 名 `figma-{name}`；基准 `figma-{name}-chromium-darwin.png`；PC 用例 name 加 `-pc` 后缀（validator 按组件目录全局寻名）。

### #6 环境差异的预期噪音基线
- Figma 渲染 vs Chromium 渲染存在**系统性低幅全域差**（中段 ~10-25% 像素、幅度 <12/255），疑似色彩合成管线差异（PNG 无 ICC，排除色彩配置文件，指向渲染器本身）。
- 该噪音意味着：**真实还原差异需超过容差且集中在局部区域才可靠检出**。后续若全绿噪音仍高，人可决策调容差或引入 blur/mask 预处理（未实施，留档）。

### #7 跑单个 spec 的正确姿势
- `pnpm test -- Xxx.spec.tsx` 的 `--` 过滤**不生效**（实际跑了全部 spec，grep 输出混入其它 spec 的失败文本造成误读）。
- 正确命令：`pnpm exec playwright test <SpecName>`（子串过滤）。

### #8 PC 端与 H5 的参数差异

| 维度 | H5 | PC |
|---|---|---|
| test.use | `MOBILE_VIEWPORT` | `PC_VIEWPORT` |
| 容器 | frame bbox（如 340×415） | frame bbox（如 738×489） |
| 背景资产落点 | `smallUrl`（<768px 源） | **`bigUrl`**（≥768px 源）——放错字段图片不换但语义错 |
| 背景裁剪方向 | 纵向（Δy 顶裁） | 横向（Δx 居中裁）——都按「背景层在 frame 内的 Δ 坐标」算裁剪窗口 |
| 布局断言点 | 纵向堆叠 + title line-clamp-3 | md:flex-row 左文 400 宽（x=40 ↔ md:p-10）、无 clamp |

- PC 首跑 6%（H5 首跑 96%）：**H5 沉淀的「frame 窗口裁剪」法在 PC 一次到位**，方法论可复制性得到第二例验证。
- PC 残差集中在 y146+（文本下部/按钮/底部 scrim，actual 底部偏亮），与 H5 例的底部按钮区偏亮同源——疑似同一真实差异跨端复现，待人肉眼裁决。

### #9 固化配置
见 §1.6（visualTestUtils.tsx 共享层，spec 不再各自手写）。重构验证：两例 diff 像素数与重构前逐一致，行为无损。

### #10 命名规约（防 -snapshots/ 目录错配）
- spec 文件：`{Card}{Variant}.visual.spec.tsx`；test 名**必须英文**；snapshots：`{SpecName}.spec.tsx-snapshots/figma-{name}-chromium-darwin.png`。

### #11 噪音基线登记（回归判读用）
每张卡校准后的残差率登记在 `baselines.json`（机器可读版），后续重跑若显著高于登记值 = 新引入回归：

| 卡 | 端 | 校准后 ratio | 主要残差 |
|---|---|---|---|
| 新闻卡 102803:58715 | H5 | 0.12 | 中段低幅全域 + 底部按钮区偏亮（疑真实差异）|
| 新闻卡 104178:228745 | PC | 0.06 | 同上同源（跨端复现）|
| 文章卡 103586:117209 | H5 | 0.14 | 同新闻卡族；另疑 eyebrow 图标 `refresh-dollar` 黑色 fill 与设计稿 aura 黄 #f3ff86 不符，待人裁决 |
| 文章卡 104178:228798 | PC | 0.10 | 同上同源 |
| goal 卡 102803:58634 | H5 | **0.21** | 全族最高——背景用产线 CDN goal.webp（非 Figma 导出），设计稿↔产线资产差异 + 信息框排版均可能贡献 |
| goal 卡 104178:230000 | PC | 0.13 | 同上同源 |
| pick 已付费 102803:59099 | H5 | 0.10 | 族内正常 |
| pick 已付费 104178:230052 | PC | 0.04 | ✅ 全族最低 |
| pick 未付费 102803:59124 | H5 | 0.20 | H5 明显高于 PC——blur 遮蔽强度与设计稿差异嫌疑最大 |
| pick 未付费 104178:228756 | PC | 0.04 | 与已付费几乎同值 |
| 手势引导 104014:13787 | H5 | **PASS（<2%）** | ✅ 首个全绿 spec，白底平铺基准法成立 |

### #12 节点 id 可能指向「背景占位帧」
- 现象：某节点（名 `H1-1`）是**空 frame**（children=[]，仅 IMAGE+GRADIENT fills），真正的卡容器是相邻节点。
- 判别：摘要 allTexts 为空 + bgInfo null + frame 带 IMAGE fill → 几乎必是占位帧；探相邻节点找同名 FRAME。
- 处理：① 卡基准取真身 frame；② 背景资产可直接导出占位帧（它就是纯背景，全幅覆盖 Δ=0 无需裁剪）。
- 脚本已修：背景层检测从「RECTANGLE only」放宽为「任意带 IMAGE fill 的覆盖节点」，并在 frame 自身带 IMAGE fill 时打印提示。

### #13 spec 过滤子串会同时命中多个 spec
- `playwright test ArticleCard` 同时命中 `ArticleCard.visual` 与 `ArticleCardPc.visual`（先后跑会互相清空 test-results，diff 产物只剩最后一组）。
- 分析单卡 diff 时用完整 spec 名：`playwright test ArticleCard.visual`（.visual 后缀区分 H5/PC）。

### #14 条件态注入：QueryClient 缓存预填 wrapper
- 需求：BriefCard 的 `isPaid` 来自 `useMemberUser()`（react-query + `enabled: !!memberApi && ...`），CT 环境无 provider 时默认 isPaid=true。
- 方案：spec 挂 `wrappers/BriefCardUnpaidWrapper.tsx`——内层 `QueryClientProvider` + `setQueryData(["MEMBER_USE_PLAN", undefined, undefined], { product: { level: "FREE" } })`。enabled=false 不发请求，预填即终值。
- 为什么不用 `page.route` 拦截接口：还需先满足 enabled（browser 侧 valtio store 的 ownerInfo 赋值做不到，spec 在 Node 跑）。缓存预填一步到位、无网络时序抖动。
- 泛化：任何「hook 派生态」的组件条件渲染（付费/登录/灰度）都适用此模式。

### #15 覆盖层类组件的 alpha 基准处理
- Figma 导出的纯覆盖层 frame（SOLID 半透明 fill，无底层内容）是带 alpha 的 PNG；组件截图无 alpha 通道，直接对比必炸。
- 处理：PIL 把基准**平铺到白底**再进 `-snapshots/`（组件在白页上的截图同口径）。swipehint 以此法首次全绿。

### #16 背景资产三种来源决策树
1. **frame 内独立背景子层**（news/article）→ 导出子层 + 按覆盖窗口 crop（#3/#8）
2. **frame root IMAGE fill 无子层**（pick）→ frame 导出 SVG → 提取 `<image>` base64 原图 + `ImageOps.fit` 按 FILL/slice 合成到 frame 尺寸
3. **产线 CDN 真图**（goal：后端三件套下发的 story/{h5,pc}/goal.webp）→ 直接下载；与 Figma 基准的差异是「设计稿 vs 产线资产」的真实检查项，不是噪音处理对象

### #17 目录结构与 spec 组织定稿
- `-snapshots/` 是基准图**唯一存放处**（Playwright 机制：PNG + 平台后缀，expected 只认 PNG 不换 webp）；`assets/` 放物料；`results/` 独立目录已 gitignore。
- spec 组织：11 个文件 → **2 个**（h5/pc 各一，视口是文件级配置天然分端）+ fixtures 数据驱动。**新增卡型 = fixtures 加一条数据，spec 零改动**。
- 迁移验证：合并后双端全部 ratio 与 11 文件时代**逐像素一致**。
- ⚠️ 新坑：改 spec 的 import 路径后必须清 `playwright/.cache/` + `node_modules/.vite`。

### #18 基准映射机制与共享层
- test ↔ 基准图映射机制见 §2.7。
- 设计事实摘要（node.json）不再物理保存：一次性中间产物，stdout 消费，设计稿变更后重新生成，旧文件反而误导。
- `visualTestUtils.tsx` 上提到 ui-tests 根作全组件共享层；组件目录内只有 fixtures/wrappers/assets/specs。

### #19 用例不提交 + 目录规范化
- `visual/` 整体 gitignore、目录规范化 `visual/{Component}/`、H5 视口 390→393 对齐设计稿（复验 ratio 逐像素不变——挂载容器为固定 frame bbox，视口宽度不影响组件渲染）。

## 4.4 冷启动生成实验（#20/#21 全录）

### #20 三轮冷启动实验（2026-08-18）

**实验设计**：清空 `visual/BriefCard`，派无上下文子 agent 仅凭 README + Frame ID 清单生成全部 11 用例；人负责跑测与 review。

| 轮 | 结果 | 卡点 | 修复 |
|---|---|---|---|
| 1 | 零产出即卡死 | FIGMA_TOKEN 未继承 → 转 MCP 探测（无频道码） | 止损协议：token 自检 + kilo.jsonc 降级提取 + 禁 MCP |
| 2 | 生成 ~40% | demo 标注 alias「可用」与探测矛盾 → 钻研 vite 8 tsconfig paths | 生成者契约：环境信任原则 + 只生成不执行 + 时间预算 + 疑问清单机制 |
| 3 | **预算内全套完成，零阻塞** | —— | 产出双端 ratio 与参考实现逐像素一致 |

**问题分类**：
- *子 agent 特有*：环境变量不继承（spawn 特性）；无图片读取能力；无法自行获得 MCP 频道码。
- *共性（指引修复）*：MCP 诱惑（→止损协议）；「验证环境」的过度负责（→生成者契约）；脚手架 outDir 硬编码（→`--dir` 参数）；文档命名漂移（以 README 为准）。

### #21 五轮冷启动稳定性实验（2026-08-19）

每轮：清空目录 → 全新子 agent 仅凭 README + Frame ID 清单生成 11 用例 → 跑测比对基线。

| 轮 | 耗时 | 结果 | 缺陷 | 指引修复 |
|---|---|---|---|---|
| 1 | 21min | 生成成功，跑全挂 | paid 例也包 wrapper（spec 内定义组件被 CT 拒绝挂载） | 硬约束 1/3 |
| 2* | 16min | news 差 71% | crop 窗口 `(0,25,340,440)` 被写成 `(0,25,340,415)`（PIL box 语义歧义） | 脚手架 crop 指令改为完整可复制 PIL 命令 |
| 3 | 20min | **一次通过** | — | 硬约束 0：REST SVG 提取为合法操作 |
| 4 | 18min | 生成成功，跑全挂 | fixtures 顶层常量立即消费 png import → TDZ | 硬约束 4：getter 函数延迟求值 |
| 5 | **10min** | **一次通过** | — | — |

**结论**：
1. agent 仅凭指引即可稳定生成——5/5 预算内完成、零阻塞；缺陷全部是**指引/脚手架缺口**（共性），每个缺陷修一次不再复发。
2. 修复收敛曲线：缺陷从「跑全挂」→「单卡资产错」→ 零缺陷；耗时 21→10 分钟。
3. 「跑测验证」是必要环节不可省——轮 1/4 的生成物表面完整、报告自信，只有跑测才暴露。生成者契约 + 下游验证的分工是对的。
4. 高质量疑问清单是隐性验收：各轮报出的疑点事后都被证实为真实问题。

## 4.5 Harness 化（#22）

**背景**：五轮实验复盘——凡是工具化的修复从未复发，凡是散文化的修复依赖阅读理解。规则从散文迁往代码（「散文规则是等待被违反的规则，代码里的规则自我执行」）。

**四层结构**：

| 层 | 载体 | 消灭的坑 |
|---|---|---|
| L0 结构防呆 | `new-case.mjs`（骨架生成器） | TDZ、spec 内组件、wrapper 滥用从「禁止」变「不可能」 |
| L1 工具吸收 | preflight（token/连通性/PIL/组件路径 + 阻塞报告，脚手架内双保险）；脚手架 `--bg=child\|svg\|cdn:` + token 降级 + raw 带尺寸命名 | token 探测兔子洞、SVG/CDN 手工流程、raw 撞名、crop 语义 |
| L2 静态校验 | `validate-visual-tests.mjs`（C1~C7）——**新坑的归宿从 README 段落变为 validator check** | 全部已知坑的秒级自助消费 |
| L3 语义散文 | 生成者契约 v2（四步流程）+ 疑问清单机制 | 只留语义映射与歧义上抛 |

**轮 6 验证**（Harness 首跑）：全新子 agent 仅凭契约四步——preflight 8✅、validate 一次过、零阻塞、20 分钟；跑测 ratio 双端与基线逐像素一致。其疑问清单还抓到**真实组件缺陷**：H5 pick description 被 `max-md:hidden` 隐藏 vs 设计稿明示。

## 4.6 首例遗留的疑似真实差异（待人裁决）

| 项 | 证据 | 状态 |
|---|---|---|
| 底部按钮区背景偏亮 | btn 带 exp 均色 ~(77,77,77) vs act ~(108,108,108)，band 8-9 差异 78% | 疑似按钮容器/背景 token 与设计稿不一致，**正是测试该抓的**——待肉眼对照 Figma |
| 中段全域低幅差 | band 3-5 差异 68-74% 但幅度小 | 归因渲染管线噪音（#6） |
| H5 pick description 隐藏 | `max-md:hidden` vs 设计稿明示 | 已登记 baselines.json _pendingHuman |
| eyebrow 图标颜色 | `refresh-dollar` 黑 fill vs 设计稿 aura 黄 #f3ff86 | 待人肉眼裁决 |

## 4.7 baselines.json 现行内容

```json
{
  "BriefCard": {
    "news": { "h5": 0.12, "pc": 0.06 },
    "article": { "h5": 0.14, "pc": 0.10 },
    "goal": { "h5": 0.21, "pc": 0.13, "note": "背景为产线 CDN 真图口径，含设计稿↔产线资产差异" },
    "pick-paid": { "h5": 0.10, "pc": 0.04 },
    "pick-unpaid": { "h5": 0.20, "pc": 0.04, "note": "H5 偏高疑 blur 强度差异" },
    "swipehint": { "h5": "PASS", "note": "<0.02 全绿" }
  }
}
```

## 4.8 已验收组件与里程碑时间线

- 首个落地组件：BriefCard（V3.0.6，11 用例）。后续：BriefSwipeHint（手势引导，首个全绿）、CreditsModal（积分弹窗，H5/PC 双端）。
- 里程碑：2026-08-14 CT 基建跑通（EDG-327）→ 08-18 首例校准 + SOP 沉淀 + 全卡型双端完成 → 08-19 Harness 化（preflight/脚手架/validator/new-case/baselines.json 五件套）+ 五轮冷启动实验收敛（21→10 分钟，零缺陷）。
