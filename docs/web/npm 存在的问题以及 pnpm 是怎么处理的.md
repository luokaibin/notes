---
updated: 2022/05/04 15:27:29
date: 2022/10/15 18:00:43
categories: 
  - web
title: npm 存在的问题以及 pnpm 是怎么处理的
post_title: npm 存在的问题以及 pnpm 是怎么处理的
comments: true
description: 在日常开发中我们时常会遇到 node_modules 中的依赖问题，前一次运行出错删除 package-lock.json 和 node_modules 之后重新安装就好了。 或者是明明自己开发的一个库在 A 项目中运行完好，但是安装到 B 项目之后却提示缺少依赖。就算没有遇到上面的两个问题，肯定也见过电脑磁盘上面占了大片空间的 node_modules 文件夹。
---
> 在日常开发中我们时常会遇到 node_modules 中的依赖问题，前一次运行出错删除 package-lock.json 和 node_modules 之后重新安装就好了。 或者是明明自己开发的一个库在 A 项目中运行完好，但是安装到 B 项目之后却提示缺少依赖。就算没有遇到上面的两个问题，肯定也见过电脑磁盘上面占了大片空间的 node_modules 文件夹。

在日常开发中我们时常会遇到 node_modules 中的依赖问题，前一次运行出错删除 package-lock.json 和 node_modules 之后重新安装就好了。 或者是明明自己开发的一个库在 A 项目中运行完好，但是安装到 B 项目之后却提示缺少依赖。就算没有遇到上面的两个问题，肯定也见过电脑磁盘上面占了大片空间的 node_modules 文件夹。

前不久看到了一篇文章讲述 [Vue 以及相关的几个包都从 yarn 切换到了 pnpm](https://www.teqng.com/2021/12/07/%E4%B8%BA%E4%BB%80%E4%B9%88-vue-%E6%BA%90%E7%A0%81%E4%BB%A5%E5%8F%8A%E7%94%9F%E6%80%81%E4%BB%93%E5%BA%93%E8%A6%81%E8%BF%81%E7%A7%BB-pnpm/)， 虽然是从 yarn workspace 迁移到了 pnpm workspace，但这也引起了我研究 pnpm 的兴趣。很早就知道了pnpm，但是仅仅止步于听说过，正好借这次机会研究并记录下来。

## npm 的问题

要理解为什么 pnpm 要那样实现，首先我们需要知道现阶段 npm 还存在着哪些问题，然后我们在带着问题去 pnpm 中看看他是怎么解决的。

一开始的 npm 在安装依赖包之后会将依赖以树形结构存储在项目根目录的 node_modules中，如下图：

<img src="https://static.jiabanmoyu.com/notes/image-20220504151629263.png" alt="image-20220504151629263" style="zoom:50%;" />

也就是项目中依赖的包会被安装到 node_modules 下面的一级子目录，然后依赖包的子依赖也会被安装到依赖包中的 node_modules 下，以此循环。 这种做法看起来非常的直观，并且符合依赖关系。但问题是这样做的话同一个包如果被不同的依赖或者子依赖所使用的话，就必须安装多个相同的包在不同的目录下。 以上图为例，即存在两个不同版本的 D 包（D@1.0.0 和D@2.0.0），并且在 A/B/C 三个依赖包下面都存在单独的一份。

在这种情况下一个项目的依赖包安装完就是占用大量的本地磁盘，并且安装依赖数的方式逐层安装的方式会导致依赖层数太深，进而导致在 Window 会因为引用路径太长的问题导致无法直接删除。 因此 npm 3 为了解决这个问题把 node_modules 下的依赖包结构打平了：

<img src="https://static.jiabanmoyu.com/notes/image-20220504151700365.png" alt="image-20220504151700365" style="zoom:50%;" />

如图所示，把 B/C 两个依赖包具有的相同的子依赖提升到了 node_modules 下，这样就在既满足 Node.js 的模块查找规则的同时降低了依赖层级，某种程度上缓解了占用磁盘空间和路径过长的问题。 但这样做依然会产生一些问题：[幻影依赖（Phantom dependencies）](https://rushjs.io/pages/advanced/npm_doppelgangers/) 和 [npm分身（NPM doppelgangers）](https://rushjs.io/pages/advanced/npm_doppelgangers/)。

## 幻影依赖

幻影依赖指的是 node_modules 中的依赖包在没有 package.json 中声明的情况下使用了其他包的依赖。这种情况在 npm 3 之前是能够尽可能避免的，但是由于 npm 3 将依赖打平关系使得产生幻影依赖的可能性更大了，减少包重复的代价是引入了更多的幻影依赖可能。

在上一个图的那种情况下其他在 node_modules 下的依赖包可以直接访问到并不属于它的依赖D@2.0.0，在不更改项目的依赖版本的前提下可能是可以正常的运行的。但是某些情况下有可能会运行失败，例如 node_modules 中的依赖也可能是如下结构：

<img src="https://static.jiabanmoyu.com/notes/image-20220504151834237.png" alt="image-20220504151834237" style="zoom:50%;" />

如果此时使用的幻影依赖的其他依赖包引用 D，则会引用到 D@1.0.0 而不是之前的D@2.0.0，从而导致运行出错。 这是因为在 npm 中将哪个版本放到项目 node_modules 目录下是通过复杂的依赖计算逻辑得出的，[不同的安装顺序可能会有不同的依赖结构](http://npm.github.io/how-npm-works-docs/npm3/non-determinism.html)。 同时这也是我们为什么需要 package-lock.json 的原因，在存在 package-lock.json 的情况下，npm install 能够保证安装后的依赖结构是相同的。

## npm 包分身

同样的也因为打平了 node_modules 中的依赖，就会造成了相同版本的子依赖包在被不同的项目依赖所依赖时会安装两次（即上面的图，B/C 两个包都依赖了 D@2.0.0），这样会给我们带来一些问题：

- 相同的包安装了两次，占用磁盘空间，相对的安装的速度也会变慢
- 破坏单例，如果是单例的库会使得不同的使用方拿不到相同的实例（代码都不是同一份）

在实际工作中我就常常被这个问题所困扰，特别是当项目与项目的依赖包都使用相同包时，会导致因为引用不同的问题（依赖注入注册和获取分别在两个包中时发生）。

## pnpm 是怎么处理的

讲到这里其实也就大概了解了现阶段的 npm 到底有什么问题了，npm 3 之前直观的依赖树的方式从依赖可靠性的角度上看会更好一点，但是这带来了磁盘占用以及路径过长的问题，npm3 打平了依赖之后却引入了另外的问题。

通过研究 pnpm 可以看到 pnpm 非常优雅的解决 npm 3 之前的问题而不带入新的问题。从[pnpm 的官网](https://pnpm.io/zh/)上可以看到 pnpm 自称是快速并且节省磁盘空间的包管理器，同时也通过了类似npm workspace 的 monorepos 的支持。 这里我们主要了解 pnpm 是怎么处理依赖来解决上面的问题，关于 monorepos 相关的内容先按下不表。

pnpm 解决占用磁盘空间以及依赖路径过长的方案是通过硬链接与软链接结合来实现的，在通过 pnpm 安装依赖包时会将依赖包下载并保存在 ~/.pnpm-store 中， 然后通过硬链接的方式链接到项目中的 node_modules/.pnpm 下，再通过软链接的方式把对应的依赖包软链接到node_modules。 此时 node_modules 下面的依赖包都是通过软链接链接到node_modules/.pnpm，并且目录结构是直观的依赖数结构，从项目以及依赖包的package.json 可以反向推出来。

以上面的例子为例，则结构为下图所示：

<img src="https://static.jiabanmoyu.com/notes/image-20220504152050745.png" alt="image-20220504152050745" style="zoom:50%;" />

整个图看起来有一点点复杂，其中的虚线代表的是软连接，pnpm 会将所有的项目依赖以及相关的子依赖以平铺的结构[硬链接](https://zh.wikipedia.org/wiki/%E7%A1%AC%E9%93%BE%E6%8E%A5)到 node_modules/.pnpm 下，然后在对应的项目依赖中通过软链接的方式链接到子依赖，最后再软连接回到项目的 node_modules。

这样就同时解决了按照依赖树安装空间占用过大以及平铺结构导致的幻影依赖和 npm 包分身的问题：由于依赖是以硬链接的方式放在 node_modules/.pnpm 下，因此其他的包无法访问到没有在 package.json 中记录的依赖项； 不同的依赖包的子依赖实际上是软链接到相同的一份物理代码，因此 npm 分身的问题也解决了。

## 总结

pnpm 通过巧妙硬链接 + 软链接结合的方式完全实现了依赖树结构的 node_modules，并且严格遵循了 Node.js 的模块解析标准，解决了幻影依赖和 npm 分身的问题。 并且通过全局只保存一份在 ~/.pnpm-store 的方式，在不同的项目中进行 install 的速度也会[变得更快](https://pnpm.io/benchmarks)，也解决了磁盘空间占用的问题。

但在实际使用 pnpm 的过程中会有一些问题需要自己处理，例如 Rush 的文档中[提到的问题](https://rushjs.io/pages/maintainer/package_managers/#:~:text=Although%20PNPM%E2%80%99s%20symlinking,for%20help%2C%20though.)，有些包没有在 package.json 中列出依赖项但在非 pnpm 的情况下可以正常运行（依赖项存在于子依赖的依赖项中），或者自己实现了模块解析而没有按照标准来做，这些兼容性问题都需要手动的进行修复。 不过好在 pnpm 有提供了相关的方案来解决这些需要手动修复但是无法修改包本身的[方法](https://pnpm.io/faq#pnpm-does-not-work-with-your-project-here)。

通过上述的研究，目前为止还没有发现什么难以解决的问题，没有什么理由不使用 pnpm 来进行包管理。

## 参考

- [How npm Works](https://npm.github.io/how-npm-works-docs/index.html)
- [NPM doppelgangers](https://rushjs.io/pages/advanced/npm_doppelgangers/)
- [Phantom dependencies](https://rushjs.io/pages/advanced/phantom_deps/)
- [Why should we use pnpm?](https://medium.com/pnpm/why-should-we-use-pnpm-75ca4bfe7d93)
- [npm 依赖管理中被忽略的那些细节](https://www.zoo.team/article/npm-details)
- [为什么 vue 源码以及生态仓库要迁移 pnpm?](https://www.teqng.com/2021/12/07/%E4%B8%BA%E4%BB%80%E4%B9%88-vue-%E6%BA%90%E7%A0%81%E4%BB%A5%E5%8F%8A%E7%94%9F%E6%80%81%E4%BB%93%E5%BA%93%E8%A6%81%E8%BF%81%E7%A7%BB-pnpm/)