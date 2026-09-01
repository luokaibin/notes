---
updated: 2025/11/12 14:55:59
date: 2025/12/08 17:58:25
categories: 
  - web
title: nextjs渲染流程
post_title: nextjs渲染流程
comments: true
description: Next.js 首页渲染流程（客户端 → 服务端 → 客户端）1. 浏览器发起请求用户在地址栏输入首页 URL（例如 ）。浏览器发起 HTTP 请求（GET），并根据协议（HTTP/2、HTTP/3 等）与服务器建立连接。2. Next.js 服务端处理请求请求到达 Next.js 服务器（自托管或 Vercel 边缘节点）。
---
# Next.js 首页渲染流程（客户端 → 服务端 → 客户端）

## 1. 浏览器发起请求
- 用户在地址栏输入首页 URL（例如 `https://example.com/`）。
- 浏览器发起 HTTP 请求（GET），并根据协议（HTTP/2、HTTP/3 等）与服务器建立连接。

## 2. Next.js 服务端处理请求
- 请求到达 Next.js 服务器（自托管或 Vercel 边缘节点）。
- 服务端根据路由匹配到首页对应的 _Server Components tree_（`page.tsx`/`layout.tsx` 等）。
- 执行服务端逻辑：
  - 获取数据（调用 API、数据库等）。
  - 递归渲染 **没有 `use client`** 的组件：直接在服务端产出最终 HTML，并把已计算好的 props 序列化进响应。
  - 渲染 **带 `use client`** 的组件时，服务端同样会执行组件函数并生成对应 HTML，只是在执行过程中跳过浏览器相关 API（如 `useEffect` 等待到客户端再运行）。为了保证客户端能够复用这段 DOM，Next.js 同时在响应中嵌入 React Flight 数据，告诉浏览器后续需要加载哪些客户端 bundle 来进行 hydration。
- 服务端生成响应：
  - 完整 HTML 文档（包含所有 Server Components 渲染出的静态 DOM）。
  - React Flight 数据流（通过内联脚本或 streaming chunk）描述客户端组件的树结构与 props。
  - `<script>` 标签引用客户端组件的 bundle，供 hydration 使用。
  - `<link>` 与 `<style>` 标签用于 CSS（无论组件是 server 还是 client，样式都会被收集并下发）。

### Server / Client 组件的渲染细节

| 组件类型 | 服务端输出 | 客户端执行 |
| --- | --- | --- |
| **纯 Server Component**（无 `use client`） | 直接生成最终 HTML；不会打包进客户端 JS | 不在浏览器执行，只作为静态 DOM 被复用 |
| **纯 Client Component**（文件顶部有 `use client`） | 生成占位符（React Flight 节点），不会输出内部 DOM | 浏览器下载该组件 bundle，hydrate 时在占位符处真正渲染并绑定事件 |
| **Server 包含 Client**（例如 `<Server><Client /></Server>`） | Server 层渲染出自己的 DOM，并在客户端子树位置注入 React Flight 占位符及其初始 props | 浏览器加载客户端组件 bundle 后，仅对该子树执行 hydrate，父级 Server DOM 原样复用 |
| **Client 包含 Server**（例如 `<Client><Server /></Client>`） | Server 部分先在服务端渲染好 HTML；整个结果作为 props 传给 Client，输出对应占位符 | 客户端执行 Client 组件，接收 Server 渲染好的片段，插入占位符并绑定事件 |

举例：`<A><B /></A>`，其中 `A` 含 `use client`，`B` 为纯 Server Component：
- 服务端渲染时：
  - `B` 完全在服务端求值，产出 HTML 片段。
  - `A` 作为客户端组件，服务端只返回一个占位符，并把 `B` 的静态 HTML 作为序列化后的 props（React Flight payload）传给客户端。
- 客户端 hydration：
  - 浏览器加载到 `A` 对应的 JS bundle 后执行。
  - React 在 `A` 的占位符处运行客户端逻辑，拿到 `B` 的 HTML/props，并在客户端组装最终 DOM。此时事件绑定发生在 `A` 内部。
- 结论：**Server Component 的 DOM 只算一次（服务端），Client Component 的 DOM 会在客户端重新生成。**

## 3. HTML 下发到浏览器
- 浏览器开始解析响应的 HTML **自上而下**：
  1. **解析结构**：根据 DOM 树结构构建节点。
  2. **CSS 资源**：遇到 `<link rel="stylesheet">` 时并行下载；遇到 `<style>` 会立即解析并应用样式。
  3. **阻塞与非阻塞脚本**：
     - `<script>` 默认阻塞 HTML 解析，下载并执行后继续；
     - `<script async>` 异步下载并尽快执行，不阻塞；
     - `<script defer>` 异步下载但等 DOM 构建完成后按顺序执行。
- 同时构建 CSSOM（CSS 对象模型）和 DOM 树。
- 当 DOM + CSSOM 准备完成后，合成 Render Tree，触发首次绘制（First Paint）。

> ⚠️ 如果 HTML 中包含 `Suspense` / streaming chunks，浏览器可能逐块接收响应并逐步更新 DOM， Next.js 14 以后的 streaming 机制会让部分内容更早呈现。

## 4. 执行客户端 JavaScript
- 浏览器下载 `<script>` 指定的 JS bundle，例如 Next 的 `app/client.js`、各个组件拆分出来的 chunk。
- 执行顺序：
  - `async`：资源下载完成后立即执行，与 HTML 解析无关联；
  - `defer`：在 DOMContentLoaded 前执行，一般 Next.js 的脚本使用 `defer`；
  - 动态插入的 `<script>` 会在插入后立刻下载/执行。
- React 客户端脚本启动 hydration：
  - 找到服务端标记的根节点；
  - 根据服务端输出的 hydration 数据恢复 React 状态；
  - 将客户端组件渲染结果插入占位符（例如 A/B/C），替换掉服务端的占位标记；
  - 绑定事件监听，实现交互。

## 5. Hydration 与 UI 完整呈现
- Hydration 过程中：
  - 若匹配成功，React 复用服务端 DOM；
  - 若服务端和客户端 DOM 不一致，React 会发出警告并重新渲染该 subtree；
  - Suspense / lazy 组件会在对应数据 ready 时填充内容。
- Next.js 可能会启动额外的客户端逻辑，如：
  - Prefetch 内链；
  - 启动路由事件；
  - 注入 runtime（例如服务端数据缓存）。

## 6. 次要资源与后续交互
- 浏览器继续下载懒加载的图片、字体等。
- 浏览器触发 `DOMContentLoaded` 与 `load` 事件（开发者可监听）。
- CSR（客户端路由）生效：后续导航可通过 `next/link` 等实现局部更新，不再进行完整服务器刷新。

---

## 7. 首页渲染流程时序图

{% mermaid %}
sequenceDiagram
    participant User as 用户
    participant Browser as 浏览器
    participant NextServer as Next.js 服务端
    participant ReactSSR as React SSR<br/>（Server Components）
    participant DataSource as 数据源/API
    participant ReactClient as React 客户端

    User->>Browser: 输入首页 URL
    Browser->>NextServer: 发起 HTTP 请求
    NextServer->>ReactSSR: 匹配路由并调用页面组件
    ReactSSR->>DataSource: 拉取所需数据（API/数据库）
    DataSource-->>ReactSSR: 返回数据
    ReactSSR->>ReactSSR: 渲染 Server Components（产出 HTML）
    ReactSSR->>ReactSSR: 遇到 Client Components 时生成 React Flight 数据
    ReactSSR-->>NextServer: 返回 HTML 片段 + Flight payload
    NextServer->>NextServer: 收集样式与脚本引用
    NextServer-->>Browser: 下发 HTML + CSS + JS 引用 + Flight 数据

    Browser->>Browser: 自上而下解析 HTML
    Browser->>Browser: 下载 CSS 并构建 CSSOM
    Browser->>Browser: 合成 DOM/CSSOM，触发首次布局与绘制（First Paint）
    Browser->>Browser: 持续加载图片/字体等资源（可能引发二次布局/重绘）
    Browser->>Browser: 遇到脚本（async/defer/inline）按规则执行
    Browser->>ReactClient: 加载客户端 JS bundle

    ReactClient->>ReactClient: Hydration（替换占位符、绑定事件，必要时触发重排/重绘）
    ReactClient-->>Browser: 更新 DOM

    Browser->>Browser: 进入 CSR 模式，后续路由交由客户端处理
{% endmermaid %}

> 总结：  
> 1）浏览器请求 → Next.js 生成 HTML（带初始内容 + 占位符 + 脚本）。  
> 2）浏览器解析 HTML/CSS → 下载并执行 JS。  
> 3）React 客户端 hydrate，将占位符替换为真实组件，绑定交互。  
> 4）页面完成首次渲染并进入客户端路由模式。  
>   
> 如果使用 streaming 或 Suspense，首屏内容可以更早呈现，再渐进增强剩余区域。  
> 同时注意 `<script>` 的属性影响解析执行顺序，合理使用 `async/defer` 可缩短白屏时间。

---

## 附录：首屏布局偏移/抖动的常见原因

在 HTML 首次呈现后，如果后续的样式或内容变更导致元素尺寸变化，就会出现布局跳动（Layout Shift）。常见原因包括：

1. **图片/媒体缺乏尺寸约束：**  
   - 服务端下发的 HTML 中 `<img>`、背景图所在的 `<div>` 没有固定 `width`/`height` 或 aspect ratio；  
   - 客户端加载真实图片时才确定尺寸，挤占周围元素；  
   - 解决方案：提前给 `<img>` 添加宽高、使用 CSS `aspect-ratio`、或者提供骨架屏占位。

2. **动态数据占位符无尺寸：**  
   - 服务端渲染时输出占位符（如空 `<div>`、`<Suspense fallback>`）没有固定大小；  
   - 客户端 JS 执行后插入真实内容（比如卡片、表格），导致布局突变；  
   - 解决方案：在占位容器上预留合理高度/宽度或放置 skeleton。

3. **字体异步加载导致重排：**  
   - Web 字体 (webfonts) 初始未下载时使用 fallback 字体；  
   - 字体加载完成后重新绘制，文字宽度变化，造成邻近元素移动；  
   - 解决方案：使用 `font-display: swap` + 与首屏接近的 fallback 字体、或预加载关键字体。

4. **延迟注入的 CSS/JS：**  
   - 某些组件的 CSS 在客户端才加载，重新计算样式导致布局变化；  
   - 客户端脚本执行后修改内联样式或插入 DOM，也可能引起 reflow。

5. **广告/第三方脚本：**  
   - 在线广告、第三方组件往往占位不固定，加载完成后扩大容器尺寸。

实践建议：
- 预留所有首屏资源的空间（图片、卡片、列表等），使用 skeleton/shimmer；
- 控制 CLS 指标（Cumulative Layout Shift），确保布局稳定；
- 合理拆分默认 CSS，避免关键样式延迟注入。

## 8. 理想的响应式渲染流程（参考）

{% mermaid %}
sequenceDiagram
    participant User as 用户
    participant Browser as 浏览器
    participant NextServer as Next.js 服务端
    participant DeviceInfo as 设备信息检测
    participant ReactSSR as React SSR
    participant DataSource as 数据源/API
    participant ReactClient as React 客户端

    User->>Browser: 输入首页 URL
    Browser->>NextServer: 发起请求（携带 UA / viewport 信息）
    NextServer->>DeviceInfo: 判定设备类型（大屏 / 小屏）
    DeviceInfo-->>NextServer: 返回判定结果
    NextServer->>ReactSSR: 按判定结果渲染页面
    ReactSSR->>DataSource: 拉取页面数据
    DataSource-->>ReactSSR: 返回数据

    alt 判定为大屏
        ReactSSR->>ReactSSR: 渲染“大屏基准” DOM
        ReactSSR->>ReactSSR: 将“小屏专属组件”标记为延迟加载
    else 判定为小屏
        ReactSSR->>ReactSSR: 渲染“小屏基准” DOM
        ReactSSR->>ReactSSR: 将“大屏专属组件”标记为延迟加载
    end

    ReactSSR-->>NextServer: 返回 HTML 片段 + Flight payload
    NextServer->>NextServer: 汇总样式与脚本引用（含备用布局懒加载入口）
    NextServer-->>Browser: 下发 HTML + CSS + JS + Flight 数据

    Browser->>Browser: 解析 HTML / 构建 DOM
    Browser->>Browser: 下载 CSS 并构建 CSSOM
    Browser->>Browser: 合成 DOM + CSSOM，触发首次渲染（基准布局）
    Browser->>Browser: 下载首屏必要脚本
    Browser->>ReactClient: Hydration（绑定事件，保持当前布局）
    Browser->>Browser: 利用空闲时间加载备用布局脚本/资源
    Browser->>Browser: 当窗口尺寸变化时触发备用布局逻辑
    note over Browser: 备用布局延迟加载，减少首屏抖动

    Browser->>Browser: 进入 CSR 模式，可继续响应路由与自适应
{% endmermaid %}
