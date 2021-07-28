---
updated: 2020/04/27 22:56:04
date: 2020/04/27 22:56:04
categories: 
  - web
  - webpack
title: 29 实战：使用 PostCSS 打造移动适配方案
comments: 
description: 生活永远不像我们想像的那样好，但也不会像我们想像的那样糟。&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——莫泊桑在 Web 移动开发中，手机屏幕适配是个很大的话题，最开始做屏幕适配可以追溯到桌面页面（PC）阶段。随着电脑屏幕越来越大和 iPad 的出现，前端工程师需要适配不同的屏幕页面，当时最火的技术是响应式布局，即通过媒体查询（Media Queries）将主流的设备进行分类，根据设备屏幕宽度占比划分出来大中小等多个标准尺寸，然后设置不同的尺寸，这样做有两个缺点：
lang: zh-CN
---

![](https://img4.mukewang.com/5cd964a00001e41606400360.jpg)

> 生活永远不像我们想像的那样好，但也不会像我们想像的那样糟。
> 
> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——莫泊桑

在 Web 移动开发中，手机屏幕适配是个很大的话题，最开始做屏幕适配可以追溯到桌面页面（PC）阶段。随着电脑屏幕越来越大和 iPad 的出现，前端工程师需要适配不同的屏幕页面，当时最火的技术是响应式布局，即通过媒体查询（Media Queries）将主流的设备进行分类，根据设备屏幕宽度占比划分出来大中小等多个标准尺寸，然后设置不同的尺寸，这样做有两个缺点：

* 并不能完美适配屏幕；
* 冗余代码较多，写起来还比较麻烦。
随着 CSS 标准和浏览器的支持，REM+视口单位（Viewport units）方式越来越成熟，在移动端上可以用来做更好的适配方案。

## 视口单位（Viewport units）
简单来说，视口指的是浏览器的可视区域。在桌面设备上，视口值得是浏览器的可视区域；但是移动设备上视口有三个不同的概念值，分别是 Layout Viewport（布局视口）、 Visual Viewport（视觉视口）、Ideal Viewport（理想视口）。

下面以 iPhone 6 为例来说明下移动设备中 Layout Viewport、 Visual Viewport、Ideal Viewport 的区别。

* **Layout Viewport**：这是浏览器设置 Viewport 元标签（meta）之后定义的一个虚拟布局视口，大小跟 web 页面可呈现的区域有关系；
* **Visual Viewport**：物理设备的可视区域，物理像素来表示，iPhone 6 的物理像素值为 750x1334；
* **Ideal Viewport**：这是我们通常说的屏幕分辨率，iPhone 6 的分辨率为375x667。
> ***Tips：*** 因为 iPhone 6 的屏幕分辨率为375x667而实际的物理像素为750x1334，所以一个分辨率的像素点实际等于 4 个物理像素点，即我们平时说的两倍屏（@2x），即 dpr（Device Pixel Ratio）= 750/375 = 2，即下图所示：

![](http://img.mukewang.com/5d077f1d0001f34005070271.png)

视口单位根据设备不同，代表的意义不同。在桌面端，视口单位是浏览器的可视区域来划分的；但在移动端，它指的是布局视口（Layout Viewport）。CSS3 规范中，规定了四个视口单位：

* **vw**：1vw 等于视口宽度的 1%；
* **vh**：1vh 等于视口高度的 1%；
* **vmin**：选取 vw 和 vh 中最小的那个；
* **vmax**：选取 vw 和 vh 中最大的那个。
> ***Tips：*** 很多朋友看到这里可能会觉得：视口单位看上去跟%单位一样？视口单位是依赖于视口的尺寸，根据视口尺寸的百分比来定义的，在页面的任意元素 1vw 的值是固定的；而%单位则是依赖于元素的祖先元素，不同的祖先元素，则1%值不同。

既然是 CSS3 规范的新单位，所以需要看下移动设备上的支持情况，下面是 [caniuse.com 网站](https://caniuse.com/#search=vw)上对视口单位支持情况：

![](http://img.mukewang.com/5d077f2e0001029412600442.png)

> ***Tips：*** 做过小程序开发的朋友，可能会想起 WXSS 中使用了 rpx 这个长度单位。rpx 是以小程序容器宽度（等于设备宽度）恒等于 750rpx 来做定义的，rpx跟 vw 值意义类似，都是相对于视口宽度的固定值。

## rem 单位和 rem 布局
下面再来介绍个 CSS3 规范中的新单位：rem（root em）。顾名思义，rem 是 em 的「变种」，是一个相对单位值，相对的元素是 root元素，即 HTML 标签的 **font-size**值，所以如果 HTML 的`font-size=14px`，则`1rem=14px`。

在来看看 rem 的兼容性：

![](http://img.mukewang.com/5d077f530001799312580460.png)

rem 布局指的是页面固定宽高的元素使用 rem 来标示大小。rem 的本质是相对的等比例缩放，所以 rem 布局提供了等比例缩放的布局。

当我们拿到一张视觉稿，完成切图之后，需要在不同的浏览器能够实现等比例缩放。假设视觉稿宽度可以分为 100 份，每一份用x来表示，某个元素我们根据视觉稿测量宽高，并且在 CSS 中设置了宽高为：

```css
.sth {
    width: 400x;
    height: 300x;
}
```

当我们的页面在不同屏幕宽度进行渲染的时候，我们需要上面的x单位能够根据不同的屏幕自动进行缩放（跟视觉稿等比例），这样我们就不需要写任何代码都可以适配不同宽度的设备屏幕了。根据前面提到的 rem 的本质是相对的等比例缩放，我们将宽高设置为rem的对应值，这样不管页面怎么变，我们 rem 会跟着其相对的值来进行变化，即根据root元素的`font-size`进行变化，即 HTML 的`font-size`。

所以，我们可以将 HTML 的`font-size`设置为：屏幕宽度的1/100：
```css
html {
    fons-size: screen_width / 100;
}
.sth {
    width: 400rem;
    height: 300rem;
}
```

那么我们还需要通过 JavaScript 来计算 HTML 元素font-size值，即下面的代码：
```js
document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
```

这就是 rem 布局切图的原理。为了做好横屏竖屏的适配，还需要添加上视口宽度变化和横竖屏事件绑定，在视口宽度发生变化后，重新设置 HTML 的font-size。

## 使用 vw + rem + postcss 实现移动页面适配方案

上面的 rem 布局切图中，我们做了一个假设，假设存在一个单位x值为宽度的 1/100，后来这个x值是经过 JavaScript 来计算得到的，那么我们学习了视口单位的概念之后，应该很快想到：我们不需要计算 HTML 的 font-size 啊，直接用 1vw 不就行了吗？1vw 就是我们假设的单位x啊！

所以，在视口单位的兼容性做得还不够好的时候，rem 是最好的解决方案。而当设备浏览器升级之后，视口单位已经做了很好的支持，我们完全可以省掉计算 html font-size 的步骤，直接使用vw来布局。

为了兼容两者，我们在实际开发中，采用了vw+rem的布局方式，同时配合 postcss 的插件，可以直接使用视觉稿的实际尺寸来进行布局计算，这样减少了我们转换单位的时间，也不需要考虑兼容性问题，极大地提升了我们的开发效率和开发体验。下面来详细介绍下我们项目中使用的移动页面适配方案。

首先前面提到了，vw 的浏览器兼容性不如 rem 好，所以我们需要使用 JavaScript 来做好兼容，支持 vw 的则设置 html font-size 为1vw，不支持的则设置为clinetWidth/100。然后页面布局的时候，还是使用 rem 来计算尺寸：

* 如果支持 vw，那么 1rem 实际等于 1vw，相当于我们直接使用了 vw 单位；
* 不支持 vw，1rem 等于clientWidth / 100，相当于自己实现了 vw 单位。
```js
// 此段代码需要放到html页面 head 中
(function(doc, win) {
    // 创建一个元素，检测是否支持1vw
    var dummy = doc.createElement('_').style;
    dummy.width = '1vw';
    if (dummy.width) {
        // 设置root fontsize 为1vw
        doc.documentElement.style.fontSize = '1vw';
        // 支持就不在做处理
        return;
    }
    // 如果不支持，那么就用 JavaScript 来计算 font-size
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            }
            docEl.style.fontSize = clientWidth / 100 + 'px';
        };
    // 初始化 font-size
    recalc();
    // 添加事件绑定
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);
```

在我们实际项目中，为了区分 rem 和 vw，专门引入了一个新的单位pr（再次类似小程序的 rpx），这样我们写 pr 的时候，经过postcss 处理会被转换成对应的 rem，而不是直接写 rem（防止混淆，万一真的用到 rem 或者 vw 呢），为了转换pr单位，这里引入了一个postcss插件：[postcss-plugin-pr2rem](https://www.npmjs.com/package/postcss-plugin-pr2rem)。假设我们拿到一个以 iPhone 6 Plus 为基准的视觉稿，宽度为 1242px，视觉稿上有个 621px 宽度的 div，那么html font-size=1vw，所以我们写 CSS 则根据实际宽度来写：

```css
div{
    width: 621pr;
}
```

然后安装postcss-plugin-pr2rem，

```
npm i -D postcss-plugin-pr2rem
```

并在 `postcsss.config.js` 中配置 postcss-plugin-pr2rem：

```js
const pr2rem = require('postcss-plugin-pr2rem');

const pr2remConfig = {
    // 设计图为1242px，一份 root 对应着rootWidth/100=12.42px
    rootValue: 12.42,
    // 这里是基本单位，前面设置了1vw
    unitPrecision: 1,
    propWhiteList: [],
    propBlackList: ['font-size'],
    selectorBlackList: [],
    ignoreIdentifier: '00',
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
};

module.exports = {
    plugins: [pr2rem(pr2remConfig)]
};
```

那么执行 Webpack 打包之后，对应的代码变成：
```css
/* input */
div{
    width: 621pr;
}

/* output */
div {
    width: 50rem;
}
```

## 总结
本文主要介绍 vw 和 rem 两个 css3规范的新单位，并且通过介绍 rem 布局原理，逐步推导出使用vw+rem的新移动适配方案，最后介绍了使用 Webpack 和 postcss 插件来实现自动转换 rem 的方式。

**本小节 Webpack 相关面试题：**

* 你们项目是怎么实现移动屏幕适配的？
