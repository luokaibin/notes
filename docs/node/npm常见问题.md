---
title: npm 常见问题
lang: zh-CN
description: 
---

## Npm install failed with “cannot run in wd”

1. Run `npm install` with the `--unsafe-perm` flag:

   ```js
   [sudo] npm install --unsafe-perm
   ```

2. Add the `unsafe-perm` flag to your `package.json`:

   ```js
   "config": {
       "unsafe-perm":true
   }
   ```

## FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory

1. 增加Node JS内存。在您的VS Code终端中，键入：`export NODE_OPTIONS="--max-old-space-size=8192"`

   > 其中max-old-space-size的值可以是：2048、4096、8192、16384，依此类推

2. 请尝试以下步骤：

   1. 删除`node_modules`文件夹。
   2. 删除`package-lock.json`文件。
   3. 重新安装node.js或更新到最新版本。
   4. 然后`npm install`。

   如果此解决方案不起作用，请尝试**解决方案1**。



