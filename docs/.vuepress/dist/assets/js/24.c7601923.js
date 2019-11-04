(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{233:function(t,s,a){"use strict";a.r(s);var n=a(3),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[a("img",{attrs:{src:"https://img3.mukewang.com/5cd963fc000167cb06400360.jpg",alt:""}})]),t._v(" "),a("blockquote",[a("p",[t._v("读一本好书，就是和许多高尚的人谈话。")]),t._v(" "),a("p",[t._v("               ——歌德")])]),t._v(" "),a("p",[t._v("在 Webpack4 之前，我们处理公共模块的方式都是使用 CommonsChunkPlugin，然后该插件让开发配置繁琐，并且使公共代码的抽离不够彻底和细致，因此新的splitChunks改进了这些能力，不过虽然splitChunks相对 CommonsChunkPlugin 进步不少，但是 splitChunks 的配置却比较复杂。")]),t._v(" "),a("h2",{attrs:{id:"webpack-代码拆分方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webpack-代码拆分方式","aria-hidden":"true"}},[t._v("#")]),t._v(" Webpack 代码拆分方式")]),t._v(" "),a("p",[t._v("在 Webpack 中，总共提供了三种方式来实现代码拆分（Code Splitting）：")]),t._v(" "),a("ul",[a("li",[t._v("entry 配置：通过多个 entry 文件来实现；")]),t._v(" "),a("li",[t._v("动态加载（按需加载）：通过写代码时主动使用import()或者require.ensure来动态加载；")]),t._v(" "),a("li",[t._v("抽取公共代码：使用splitChunks配置来抽取公共代码。")])]),t._v(" "),a("p",[t._v("这里我们主要讲的是通过splitChunks抽取公共代码。在讲解之前，再来复习下 Webpack 中三个重要的概念：module、chunks、bundle。")]),t._v(" "),a("ul",[a("li",[t._v("module：就是 JavaScript 的模块，简单来说就是你通过 import、require 语句引入的代码，也包括 css、图片等资源；")]),t._v(" "),a("li",[t._v("chunk: chunk 是 webpack 根据功能拆分出来的，chunk 包含着 module，可能是一对多也可能是一对一，chunk 包含三种情况，就是上面介绍的三种实现代码拆分的情况。")]),t._v(" "),a("li",[t._v("bundle：bundle 是 webpack 打包之后的各个文件，一般就是和 chunk 是一对一的关系，bundle 就是对 chunk 进行编译压缩打包等处理之后的产出。\n记住这些，后面会用到，下面开始 splitChunks 配置。")])]),t._v(" "),a("h2",{attrs:{id:"splitchunks-默认配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#splitchunks-默认配置","aria-hidden":"true"}},[t._v("#")]),t._v(" splitChunks 默认配置")]),t._v(" "),a("p",[t._v("由于 Webpack 做到了开箱即用，所以splitChunks是有"),a("a",{attrs:{href:"https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("默认配置"),a("OutboundLink")],1),t._v("的：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n    optimization"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        splitChunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            chunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'async'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 三选一： "initial" | "all" | "async" (默认)')]),t._v("\n            minSize"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("30000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 最小尺寸，30K，development 下是10k，越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了")]),t._v("\n            maxSize"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 文件的最大尺寸，0为不限制，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize")]),t._v("\n            minChunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 默认1，被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小")]),t._v("\n            maxAsyncRequests"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了")]),t._v("\n            maxInitialRequests"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了")]),t._v("\n            automaticNameDelimiter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'~'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 打包文件名分隔符")]),t._v("\n            name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拆分出来文件的名字，默认为 true，表示自动生成文件名，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个")]),t._v("\n            cacheGroups"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                vendors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/[\\\\/]node_modules[\\\\/]/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 正则规则，如果符合就提取 chunk")]),t._v("\n                    priority"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    minChunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                    priority"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 优先级")]),t._v("\n                    reuseExistingChunk"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("blockquote",[a("p",[a("em",[a("strong",[t._v("Tips：")])]),t._v(" 上面的默认配置都添加了注释，一些很简单的配置就不再详细介绍，下面主要介绍一些比较难理解并且重要的配置项。")])]),t._v(" "),a("p",[t._v("splitChunks默认配置对应的就是 chunk 生成的第二种情况：通过写代码时主动使用import()或者require.ensure来动态加载。")]),t._v(" "),a("p",[t._v("下面来看下使用import()或者require.ensure来写代码，在 Webpack 打包的时候有什么不同。")]),t._v(" "),a("p",[t._v("创建index.js，使用import()动态加载react模块，"),a("strong",[t._v("同时为了方便跟踪产出物，在这里使用了 webpack 的魔法注释，保证输出的 bundle 名称，后面也使用这种方式。")]),t._v(" 内容如下：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('/* webpackChunkName: "react" */')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("blockquote",[a("p",[a("em",[a("strong",[t._v("Tips：")])]),t._v(" 如果忘记魔法注释内容，可以翻阅之前的文章。[TODO]文章链接")])]),t._v(" "),a("p",[t._v("添加webpack.config.js，内容如下：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" BundleAnalyzerPlugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'webpack-bundle-analyzer'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("BundleAnalyzerPlugin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    mode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'production'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    entry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        main"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./default/index.js'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BundleAnalyzerPlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("在这里使用了"),a("a",{attrs:{href:"https://www.npmjs.com/package/webpack-bundle-analyzer",target:"_blank",rel:"noopener noreferrer"}},[t._v("webpack-bundle-analyzer"),a("OutboundLink")],1),t._v("插件来查看 webpack 打包情况。")]),t._v(" "),a("p",[t._v("完成上面配置之后，执行webpack --config webpack.config.js，首先看到对应的输出的 log 为：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d074cc80001775213640744.png",alt:""}})]),t._v(" "),a("p",[t._v("index.js打包出来了两个文件react.js和main.js，两个文件包含的内容通过 webpack-bundle-analyzer 查看效果如下：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d074cf40001f95814260783.png",alt:""}})]),t._v(" "),a("p",[t._v("由此可以知道：")]),t._v(" "),a("ol",[a("li",[t._v("index.js打包出来了两个文件react.js和main.js；")]),t._v(" "),a("li",[t._v("react.js是被拆分出来的，内容实际是 react；")]),t._v(" "),a("li",[t._v("react.js被拆分出来是因为splitChunks默认配置chunks='async'。")])]),t._v(" "),a("h3",{attrs:{id:"理解-splitchunks-chunks-三个值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#理解-splitchunks-chunks-三个值","aria-hidden":"true"}},[t._v("#")]),t._v(" 理解 splitChunks.chunks 三个值")]),t._v(" "),a("p",[t._v('splitChunks中的chunks是一个很重要的配置项，表示从哪些 chunks 里面抽取代码，chunks的三个值有："initial"、 "all"、 "async"， 默认就是是async。')]),t._v(" "),a("p",[t._v("为了理解splitChunks.chunks三个值的差异，下面通过实例来帮助我们理解。首先创建两个文件a.js和b.js：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// a.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" react "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" $ "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('/* webpackChunkName: "a-lodash" */')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'lodash'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'I am a.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// b.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" $ "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('/* webpackChunkName: "b-react" */')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('/* webpackChunkName: "b-lodash" */')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'lodash'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'I am b.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("blockquote",[a("p",[a("em",[a("strong",[t._v("Tips：")])]),t._v(" 为了方便判断打包出来的 bundle 文件是谁生产的，所以统一使用了魔法注释（magic comments）。")])]),t._v(" "),a("p",[t._v("这两个文件的特点是：")]),t._v(" "),a("ol",[a("li",[t._v("react模块被两个文件都引入了，不同的是a.js是同步引入，b.js是动态引入；")]),t._v(" "),a("li",[t._v("jquery模块在两个文件中都被引入，并且都是"),a("strong",[t._v("同步引入")]),t._v("；")]),t._v(" "),a("li",[t._v("lodash模块都被两个文件引入，并且都是"),a("strong",[t._v("动态引入")]),t._v("。")])]),t._v(" "),a("p",[t._v("下面是我们的webpack.config.js文件内容，我们主要修改是chunks的三个值：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" BundleAnalyzerPlugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'webpack-bundle-analyzer'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("BundleAnalyzerPlugin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    mode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'development'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    entry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./default/a.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./default/b.js'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BundleAnalyzerPlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    optimization"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        splitChunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            cacheGroups"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                vendors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    chunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'async'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这里是我们修改的地方，async|initial|all")]),t._v("\n                    test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/[\\\\/]node_modules[\\\\/]/")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h4",{attrs:{id:"chunks-async"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chunks-async","aria-hidden":"true"}},[t._v("#")]),t._v(" chunks='async'")]),t._v(" "),a("p",[t._v("当"),a("code",[t._v("chunks='async'")]),t._v("配置下，Webpack 打包 log 和 bundle 分析结果如下：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d074d3a0001e00617240792.png",alt:""}})]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d074d850001a58214250789.png",alt:""}})]),t._v(" "),a("p",[t._v("通过实践观察，在这种模式下：")]),t._v(" "),a("ol",[a("li",[t._v("在a.js和b.js 都同步引入的 jquery 被打包进了各自的 bundle 中没有拆分出来共用，说明在这种配置下只会针对动态引入的的代码进行拆分；")]),t._v(" "),a("li",[t._v("react在a.js和b.js表现不同：")]),t._v(" "),a("li",[t._v("在a.js因为是同步引入的，设置的chunks='async'，所以不被拆分出去；")]),t._v(" "),a("li",[t._v("在b.js是动态引入的，符合chunks='async'的设置，所以被单独拆到vendors~b-react.js;")]),t._v(" "),a("li",[t._v("lodash因为在两个文件都是动态加载的，所以被拆到了vendors~a-lodash.js。")])]),t._v(" "),a("blockquote",[a("p",[a("em",[a("strong",[t._v("Tips：")])]),t._v(" b.js中的react拆出来的文件名是vendors~b-react.js含有vendors，说明中了名字为vendors的cacheGroups规则。")])]),t._v(" "),a("h4",{attrs:{id:"chunks-initial"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chunks-initial","aria-hidden":"true"}},[t._v("#")]),t._v(" chunks='initial'")]),t._v(" "),a("p",[t._v("在"),a("code",[t._v("chunks='initial'")]),t._v("配置下，Webpack 打包 log 和 bundle 分析结果如下：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d074dc70001b89b17440792.png",alt:""}})]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d074e030001785314250787.png",alt:""}})]),t._v(" "),a("p",[t._v("initial 即原始的最初的意思，原则就是有共用的情况即发生拆分。首先，"),a("strong",[t._v("动态引入的模块不受影响，它是无论如何都会被拆分出去的")]),t._v(" 。而对于同步引入的代码，如果有多处都在使用，则拆分出来共用，至于共同引用多次会被拆分，是通过minChunks单独配置的，针对这个原则，我们再来看下上面的代码拆分的结果：")]),t._v(" "),a("ol",[a("li",[t._v("因为jquery模块是a.js和b.js共用的代码，所以单独拆除来放到vendors~a~b.js中，vendors~a~b.js文件名来自我们配置的cacheGroups的 key，即vendors和分隔符（automaticNameDelimiter）以及实际被共用的 bundle 的名称，即：a 和 b；")]),t._v(" "),a("li",[t._v("react在b.js因为用的是动态引入，所以被拆成了b-react.js（名字来自于设置的魔法注释）；a.js的react则被拆到了vendors~a.js；")]),t._v(" "),a("li",[t._v("lodash因为在两个文件都是动态加载的，所以被拆到了a-lodash.js（名字来自魔法注释）。")])]),t._v(" "),a("blockquote",[a("p",[a("strong",[t._v("进一步解释：")]),t._v(" react在b.js拆出来为b-react.js名称，说明中了默认配置（默认配置是chunks='async'），名字来自魔法注释；a.js的react文件名是vendors~a.js，这是因为中了vendors规则，本身a.js的react是同步引入，在这里被拆出来是因为react在 development 模式用的是 dev 版本，体积超过minSize的默认设置30K，所以被拆出来了，观察对应的 webpack 打包 log：Entrypoint a = vendors~a~b.js vendors~a.js a.js 也说明这一点。如果我们把对应的配置，加大minSize到 80K（超过 dev 版本 react 大小），则vendors~a.js 和 a.js会合并在一起了，具体看下图效果：")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 忽略其他，只看cacheGroups")]),t._v("\nvendors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    minSize"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    chunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'initial'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/[\\\\/]node_modules[\\\\/]/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d07521100018ee516700744.png",alt:""}})]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d07526e0001f60414280791.png",alt:""}})]),t._v(" "),a("h4",{attrs:{id:"chunks-all"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chunks-all","aria-hidden":"true"}},[t._v("#")]),t._v(" chunks='all'")]),t._v(" "),a("p",[t._v("在 chunks='initial' 配置下，虽然a.js和b.js都引入了react，但是因为引入方式不同，而没有拆分在一起，而是各自单独拆封成一个 chunk，要想把react放到一个文件中，就要使用chunks='all'了。下面是chunks='all'的配置结果：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d0752cc0001072618980744.png",alt:""}})]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d0752ee00015c7314240796.png",alt:""}})]),t._v(" "),a("p",[t._v("通过执行打包结果，跟我们的预期一致，chunks='all'的配置下能够最大程度的生成复用代码，复用代码在 http cache 环境下，多页应用由一个页面跳转到另外一个共用代码的页面，会节省 http 请求，所以一般来说chunks='all'是推荐的方式，但是async和initial也有其存在的必要，理解三者差异，根据项目实际代码拆分需求来配置即可。")]),t._v(" "),a("blockquote",[a("p",[a("em",[a("strong",[t._v("Tips：")])]),t._v(" 拆分出来的文件名称可以通过output.chunkFilename来指定规则，例如chunkFilename='[name].js'，然后在对应的配置中配置name的具体值，比如 vendors 的 name 指定为foo：vendors.name='foo'")])]),t._v(" "),a("h3",{attrs:{id:"使用-cachegroups"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用-cachegroups","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用 cacheGroups")]),t._v(" "),a("p",[t._v("cacheGroups（缓存组）是 Webpack splitChunks 最核心的配置，splitChunks的配置项都是作用于cacheGroup上的，默认有两个cacheGroup：vendors和default（本文一开始默认配置部分已经贴出），如果将cacheGroup的默认两个分组vendor和default设置为 false，则splitChunks就不会起作用，我们也可以重写这俩默认的配置。")]),t._v(" "),a("p",[t._v("cacheGroups除了拥有默认配置所有的配置项目（例如 minSize、minChunks、name 等）之外，还有三个独有的配置项：test、priority和reuseExistingChunk。 splitChunks.cacheGroup "),a("strong",[t._v("必须同时满足")]),t._v(" 各个配置项的条件才能生效")]),t._v(" "),a("p",[t._v("reuseExistingChunk表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。下面重点说下test和priority")]),t._v(" "),a("blockquote",[a("p",[a("em",[a("strong",[t._v("Tips：")])]),t._v(" 除了 JavaScript，splitChunks也适用于使用"),a("a",{attrs:{href:"https://github.com/webpack-contrib/mini-css-extract-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("mini-css-extract-plugin"),a("OutboundLink")],1),t._v("插件的 css 配置。")])]),t._v(" "),a("h4",{attrs:{id:"priority"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#priority","aria-hidden":"true"}},[t._v("#")]),t._v(" priority")]),t._v(" "),a("p",[t._v("priority配置项的意义就是权重。如果有一个模块满足了多个缓存组的条件就会去按照权重划分，谁的权重高就优先按照谁的规则处理。")]),t._v(" "),a("p",[t._v("在下面的配置中：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("optimization"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    splitChunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        cacheGroups"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            vendors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                chunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'initial'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/[\\\\/]node_modules[\\\\/]/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                priority"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/[\\\\/]node_modules[\\\\/]/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                chunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'initial'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                priority"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("虽然给vendors和default除 priority 配置外，其他配置都相同，打包的结果如下：")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://img.mukewang.com/5d0753360001d76914270793.png",alt:""}})]),t._v(" "),a("p",[t._v("共用的代码文件名为vendors~cachegroup1~cachegroup2.js说明中了vendors配置，虽然default和vendors两个都能满足需求，但是 default 的 priority 是 -20 明显小于 vendors 的-10，所以会优先按照 vendors 这个缓存组拆分。")]),t._v(" "),a("h4",{attrs:{id:"test"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#test","aria-hidden":"true"}},[t._v("#")]),t._v(" test")]),t._v(" "),a("p",[t._v("cacheGroup.test表示满足这个条件的才会被缓存组命中，取值可以是正则、字符串和函数。正则和字符串很好理解，当test为函数时，比如返回true/false，并且接收两个参数：module和chunks")]),t._v(" "),a("ul",[a("li",[t._v("module：每个模块打包的时候，都会执行test函数，并且传入模块 module 对象，module 对象包含了模块的基本信息，例如类型、路径、文件 hash 等；")]),t._v(" "),a("li",[t._v("chunks：是当前模块被分到哪些chunks使用，module 跟 chunks 关系可能是一对一，也可能是多对一，所以一旦我们使用 chunks 做匹配，那么符合条件的 chunk 内包含的模块都会被匹配到。")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n    optimization"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        splitChunks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            cacheGroups"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                vendors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" chunks")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n                        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'javascript/auto'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("举个实际应用场景来说明，前面提到过splitChunks不仅作用于 JavaScript，还可以作用于 CSS，所以类似test=/[\\/]node_modules[\\/]/的写法，实际也会匹配出node_modules中的 CSS，如果我们用到的一个 npm 包引入了自己的 css 文件，那么也会中了拆分逻辑，这时候如果要排除这部分 CSS 或者单独给这部分 CSS 设置自己的cacheGroup规则，有两种方式：")]),t._v(" "),a("ol",[a("li",[t._v("设置更高权重的cacheGroup；")]),t._v(" "),a("li",[t._v("使用test函数针对类型为 js 和 css 分别设置各自的cacheGroup。")])]),t._v(" "),a("p",[t._v("另外我们还可以使用test函数实现更细化的匹配，例如：忽略一部分文件等。")]),t._v(" "),a("blockquote",[a("p",[t._v("本小节 Webpack 相关面试题：")]),t._v(" "),a("ul",[a("li",[t._v("本章节一直在回答一个问题：Webpack 怎么优化。本小节主要介绍 Webpack splitChunks 来拆分代码。")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);