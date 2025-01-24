---
updated: 2022/11/12 14:28:48
date: 2022/11/12 14:28:48
categories: 
  - web
title: Vite多环境配置：让项目拥有更高定制化能力
post_title: Vite多环境配置：让项目拥有更高定制化能力
comments: 
description: 业务背景近些年来，随着前端工程架构发展，使得前端项目中也能拥有如后端工程的模块能力。正所谓 “能力越大，责任越大”，现在的前端工程不仅仅要满足业务需求，还伴随更多复杂的环境适配问题，例如：api请求的域名会根据不同环境而不同；线上环境和测试环境在打包策略有所不同「如线上要隔离sourceMap、屏蔽vue|react devtools等...」；
---

<img src="https://static.jiabanmoyu.com/notes/image-20220504154702827.png" alt="image-20220504154702827"  />

## 业务背景

近些年来，随着前端工程架构发展，使得前端项目中也能拥有如后端工程的模块能力。正所谓 “能力`（越）`越大`（来）`，责任`（越）`越大`（卷）`”，现在的前端工程不仅仅要满足业务需求，还伴随更多复杂的环境适配问题，例如：

> - api请求的域名会根据不同环境而不同；
> - 线上环境和测试环境在打包策略有所不同「如线上要隔离sourceMap、屏蔽vue|react devtools等...」；
> - 前端spa组件根据不同环境做出不同逻辑；

老板恨不得把所有应用端都收归到一个项目里面，什么微前端、uniapp多端方案接踵而至。。。但无论是什么方案，都离不开一个核心点：**环境变量和多环境适配**。那么，今天我们就来聊下如何在`Vite`中实现一套拓展能力强的多环境适配方案。

## 多环境场景的业务形态

我们先来了解，在多环境下要求前端工程架构流程是怎样的？

![image.png](https://static.jiabanmoyu.com/notes/b6dacd4186094ab7a28e502e8944078c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

如上图所示，在工程`启动 / 构建`时：

1. **环境变量注入**：一般通过命令参数模式，可在`package.json`里配置；
2. **多模式文件**：Vite根据环境变量来读取配置文件，把文件参数抽取出来做特性区分，这块也称为[Vite的环境模式](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2Fguide%2Fenv-and-mode.html)；
3. **环境收集器**：简单理解为1个函数，做的事情就是把第二步的特性参数归整到一处并做些特定的逻辑，之后通过插件生成客户端的最终参数并吐出；
4. **客户端环境差异定制化**：客户端（也就是工程里面的`.vue、.ts、.tsx`等前端文件）获取到环境参数做一些特定区分逻辑；
5. **构建和发布**：之后就是项目根据以上几步产出的环境特性文件来打包，最终推送到服务端完成整个前端工程的生产。

以上是大体流程，接下来会每步细分给大家讲解如何实现。方便大家理解，本次笔者专门开了个新[GitHub项目](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FJohnnyZhangQiao%2Fvite-mul-env-learn)来存放本文所有实现代码，有兴趣的同学可以拿下来实操下🌹🌹。

## Vite多环境方案实现

## 多模式文件配置

### 自定义环境变量

`Vite`通过 [多模式](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2Fguide%2Fenv-and-mode.html%23modes) 来配置不同启动场景下的特性环境变量，你可以创建自定义的模式文件，如下： 

![image-20220504155219650](https://static.jiabanmoyu.com/notes/image-20220504155219650.png)

这个项目创建了4种模式分别兼容`release、beta、测试、本地`环境，每种模式下有自己特定的环境变量，例如`.env.local`的内如如下：

```bash
# .env._local
# 透传客户端参数
VITE_NODE_ENV=local
VITE_OWNER=Tom
VITE_POSITION=广州，天河

# 私有参数，仅在vite server获取到，
# 假如你的项目包含此类敏感变量。应该将文件添加到你的 .gitignore 中，以避免它们被 git 检入。
MODE_KEY=PRIVATE_KEY_LOCAL
复制代码
```

根据Vite的约定规则，只有以`“VITE_”`开头的变量才会在客户端被捕获，捕获方式为：`import.meta.env.{参数名}`。

至于非`“VITE_”`开头的变量属于私有属性，不会传递出去。假如你的项目包含此类敏感变量。应该将文件添加到你的 `.gitignore` 中，以避免它们被 git 检入。

完成上述配置后，我们只需要在`package.json`增加对应的启动命令就可以让Vite获取哪个模式来运行项目了：

```json
{
  "name": "vite-mul-env-learn",
  "version": "0.0.0",
  "scripts": {
    "dev:local": "vite --mode _local",
    "dev:test": "vite --mode test",
    "build:beta": "vite build --mode beta",
    "build:release": "vite build --mode release",
    "lint": "eslint --fix --ext .js,.vue,ts src"
  }
}
复制代码
```

### Vite默认环境变量

Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：

> - **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2Fguide%2Fenv-and-mode.html%23modes)。
> - **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2Fconfig%2F%23base)决定。
> - **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境。
> - **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。
> - **`import.meta.env.SSR`**: {boolean} 应用是否运行在服务器渲染环境。

这里补充说明下，`DEV 和 PROD`分别对应`package.json`中启动dev和build命令决定的，而`SSR`则是对应了Vite启动时设定的`middlewareMode`变量决定的：

```typescript
const { createServer: createViteServer } = require('vite')

const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
```

## 通过插件透传环境变量

很多情况下，我们的环境变量不仅仅是简单的字符串，而是通过vite服务中二次计算才能得到最终结果，有点类似Vue中`computed`或React中`useMemo`、`useCallback`的效果。 像这类非静态的环境变量，我们需要借助插件能力来让它们也能够返回客户端，插件很多，这里推荐`vite-plugin-environment`，使用大概是这样子的：

You can provide a list of environment variable names to expose to your client code:

```typescript
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    EnvironmentPlugin(['API_KEY', 'DEBUG']),
  ],
})
```

And then use them as:

```typescript
const apiKey = process.env.API_KEY
```

在这个基础上，我们还能配合模式文件进行联合判断：

```typescript
import { defineConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
import { fetchEnv } from './server/envUitls';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, __dirname);
  const { proxy } = fetchEnv(env.VITE_NODE_ENV); // 设置域名和端口

  return {
    base: './',
    plugins: [
      vue(),
      EnvironmentPlugin({
        PROXY: proxy
      })
    ]
  };
});
```

`const env = loadEnv(mode, __dirname);`可以获取`.env._local`是所有非私密参数，接下来程序可以根据模式参数来计算最终的环境变量，通过插件返回到客户端。

`fetchEnv`方法可以理解成环境收集器，里面可以写逻辑让环境参数得到统一整合。

## 客户端环境差异定制

这块就很好理解了，无非就是通过指定方法获取环境变量，来条件渲染vue或React组件。下面做了个demo：

```typescript
<script setup lang="ts">
import { ref } from 'vue';
import { proxy } from '@/api/proxy';

interface IEnv extends ImportMetaEnv {
  VITE_NODE_ENV: string;
  VITE_OWNER: string;
  VITE_POSITION: string;
}
const viteEnv: IEnv = import.meta.env;
</script>

<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <section class="main">
      <div class="card">
        <h3>①通过环境文件传入的参数</h3>
        <div class="tips">说明：只包含"VITE_"开头参数</div>
        <div>项目owner：{{ viteEnv.VITE_OWNER }}</div>
        <div>owner位置：{{ viteEnv.VITE_POSITION }}</div>
        <div>项目mode：{{ viteEnv.VITE_NODE_ENV }}</div>
      </div>
      <div class="card">
        <h3>②环境插件传递的参数</h3>
        <div class="tips">
          说明：通过vite-plugin-environment插件传递过来，一般为二次计算后的参数。假如是静态参数值则直接通过方案①传回来即可。
        </div>
        <p>服务请求域：{{ proxy }}</p>
      </div>
      <div class="card">
        <h3>③Vite环境自带参数</h3>
        <div class="tips">
          说明：Vite默认参数，参考
          <a href="https://cn.vitejs.dev/guide/env-and-mode.html#env-variables"
            >Vite环境变量</a
          >
        </div>
        <p>是否为SSR模式：{{ viteEnv.SSR }}</p>
        <p>是否为本地开发模式：{{ viteEnv.DEV }}</p>
        <p>是否为构建模式：{{ viteEnv.PROD }}</p>
        <p>当前启动命令读取的mode为：{{ viteEnv.MODE }}</p>
        <p>部署应用时的基本 URL：{{ viteEnv.BASE_URL }}</p>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  display: flex;
  .card {
    margin: 10px;
    padding: 10px;
    width: 300px;
    text-align: left;
    background-color: #dbf1e7;
    font-size: 14px;
    h3 {
      margin-bottom: 0;
    }
    .tips {
      margin-bottom: 10px;
      font-size: 12px;
      color: #898989;
    }
  }
}
</style>
```

### 效果图

![image-20220504155339816](https://static.jiabanmoyu.com/notes/image-20220504155339816.png)

## 解决的业务场景思考

除了本文 **“业务背景”** 模块所说的最直观的场景外，其实还可以做很多项目工程化相关的高阶操作。

假如项目构建操作放在远程服务器进行，那么在构建打包前就可以联动服务api来生产出不同版本、不同模式的构建包，甚至可以把SSR逻辑放到这块来做，达到“千人千面”的效果。

