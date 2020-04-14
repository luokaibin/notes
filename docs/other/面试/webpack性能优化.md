---
title: webpack性能优化
lang: en-US
description: 随着一个产品的功能变复杂，项目也变的越来越大，必然造成打包耗时更久，打出来的包也越来越大，那么我们可以如何借助webpack来进行优化
---

一个项目的开始总是需求简单，功能简单，项目简单，但是随着功能的越来越复杂，项目也变得越来越大，相应的打包时间也越来越长，打出来的包也越来越大，那么基于此，对于webpack的性能优化我们也聚焦于两个方面：

- 缩短项目打包耗时
- 缩小项目体积

## 缩短项目打包耗时

针对于缩短打包耗时，我们首先需要了解影响打包耗时的元凶是什么；影响打包耗时有两个主要因素 **一是构建过程** ，**二是代码压缩** 过程；如此，那我们对于缩短耗时也将从这两方面入手；

### 构建过程优化

对于构建过程的优化，可以从 **减少查找过程、预编译、多线程、和缓存** 四个主要方面来进行；

#### 减少查找过程

- **使用 resolve.alias配置路径别名**

  我们导入一个模块时，如果使用的是相对路径，那么打包时，就需要基于当前文件去一层一层的查找文件。使用  `resolve.alias ` 配置项通过别名（alias）来把原导入路径映射成一个新的导入路径，简单说，当我们使用 `resolve.alias` 配置了路径别名后，在项目使用别名来导入模块，打包时，webpack 识别到这个别名，会直接去这个别名对应的路径下，查找文件，减少了相对路径的层层查找；

  ```js
  module.exports = {
      resolve: {
          // 使用 alias 把导入 @ 的语句换成 ./src 路径
          // 减少耗时的递归解析操作
          alias: {
              '@': path.resolve(__dirname, './src')
          }
      }
  };
  ```

- **使用 resolve.extensions 设置查找优先级**

  在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试询问文件是否存在，查询的顺序是按照我们配置的`resolve.extensions` 顺序从前到后查找，如果我们配置 `resolve.extensions= ['js', 'json']` ，那么会先找xxx.js然后没有再查找xxx.json，所以我们应该把常用到的文件后缀写在前面，或者我们**导入模块时，尽量带上文件后缀名**。

  ```js
  module.exports = {
    resolve: {
      extensions: ['vue', 'js', 'json'], // 配置查找优先级
      // 使用 alias 把导入 @ 的语句换成 ./src 路径
      // 减少耗时的递归解析操作
      alias: {
      '@': path.resolve(__dirname, './src')
    	}
    }
  };
  ```

- **使用 module.noParse 排除不需要解析的模块**

  让webpack打包时对 **没有使用模块化的模块** 解析是没有意义的，例如：jQuery，文件巨大，又没使用模块化；让webpack去解析这些文件，耗时有没意义，所以可以配置 `module.noParse` ，将这类文件进行排除，打包时不对此文件进行解析。

  ```js
  module.exports = {
    resolve: {
      extensions: ['vue', 'js', 'json'], // 配置查找优先级
      // 使用 alias 把导入 @ 的语句换成 ./src 路径
      // 减少耗时的递归解析操作
      alias: {
      '@': path.resolve(__dirname, './src')
    	}
    },
    module: {
   	 noParse: /node_modules\/(jquey\.js)/; // 排除对此文件的解析
  	}
  }
  ```

- **合理使用 rule 配置**

  在 rule 配置上，有test、include、exclude 三个可以控制范围的配置，示例

  ```js
  rules: [
      {
          // 匹配到JS文件后对JS文件使用 babel-loader 进行编译，同时编译针对src路径下的文件，排除掉 ./node_modules 路径下的文件
          test: /\.js$/, // 匹配js文件
          loader: 'babel-loader', // 使用babel-loader
          // 排除路径使用数组
          exclude: [path.resolve(__dirname, './node_modules')],
          // 查找路径使用数组
          include: [path.resolve(__dirname, './src')]
      }
  ];
  ```

#### 使用webpack.DllPlugin实现预编译

在常规的项目开发中，我们会通过 `npm install` 加载非常多的项目依赖，正常情况依赖安装进来之后也不会再去进行版本升级或者修改这些插件源码。但是每一次打包时，这些三方依赖都会被重新编译打包，耗费相当长的时间；所以我们的目标就是对于这类型的依赖，进行初始时的一次打包，后续的打包这些依赖不会再被重新编译打包。

所以我们就需要借助 `webpack.DllPlugin` 插件，怎么使用呢？首先在项目中为 dll 文件单独创建个 webpack 配置文件；假设文件名就叫 `webpack.config.dll.js`

```js
// webpack.config.dll.js
const webpack = require('webpack');
// 不会被修改的三方依赖库
const vendors = ['axios', 'ali-oss', 'echarts', 'element-ui', 'goeasy', 'md5', 'moment', 'vue-bus', 'vue-router', 'vuex', 'video.js', 'videojs-contrib-hls'];

module.exports = {
  mode: 'production',
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    vendor: vendors
  },
  output: {
    filename: '[name].[chunkhash].js',
    // 这里是使用将 verdor 作为 library 导出，并且指定全局变量名字是[name]_[chunkhash]
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json', // 设置 mainifest.json 路径（可以自行配置）
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ]
}
```

配置完成后，运行 `webpack --config webpack.config.dll.js` 命令进行 DLL 打包，打包完成后会在项目的根目录下生成一个 `manifest.json` 文件和 `dist` 目录, `dist` 中生成一个 `vendor.[hash].js` 文件, 如下:

```
├── dist
│   └── vendor.f504fbb2f031504b64a8.js # 这个是刚刚打包出来的 dll 文件
├── manifest.json # 这个是配置文件，下面
├── node_modules
├── package.json
└── webpack.config.dll.js # dll 配置
```

然后在你的 html 页面中, 通过 `script` 标签将 `vendor.[hash].js` 文件引入进来(建议把 `vendor.[hash].js` 上传到CND上引入, 不建议使用相对路径);

再在你的常规 webpack 配置文件 `plugins` 中使用 `webpack.DllReferencePlugin` 插件, 如下配置

```js
const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'); // 配置你的 manifest.json 路径地址
        })
    ]
};
```

在使用 Vue-Cli 创建的项目中, 以上配置可以添加到 `vue.config.js` 中;

```js
const webpack = require('webpack');

module.exports = {
  configureWebpack(config) {
    return {
      plugins: [
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require('./manifest.json'); // 配置你的 manifest.json 路径地址
        })
    	]
    }
  },
};

```

:ok_hand: 至此预编译的配置就完成, 我们可以在项目像正常使用这些模块的方式一样去 `import` 导入。

#### 利用多线程提升构建速度

因为NodeJs是单线程模型，所以运行在 NodeJs 上的 webpack 也是单线程的，所以如果想要加快构建速度，我们开启多个线程同时构建，这我们就需要借助 webpack 的插件，有两个插件可使用 [thread-loader](https://github.com/webpack-contrib/thread-loader)和[HappyPack](https://github.com/amireh/happypack)。

##### thread-loader

thread-loader 的优化是针对 loader 的，要使用他 需要将其放在其他其他 loader 之前执行，配置如下：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          'thread-loader'
          // 你的高开销的loader放置在此 (e.g babel-loader)
        ]
      }
    ]
  }
};
```

##### HappyPack

```js
// webpack.config.js
const os = require('os');
const HappyPack = require('happypack');
// 根据 cpu 数量创建线程池
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'happypack/loader?id=jsx'
            },

            {
                test: /\.less$/,
                use: 'happypack/loader?id=styles'
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'jsx',
            // 多少个线程
            threads: happyThreadPool,
            loaders: ['babel-loader']
        }),

        new HappyPack({
            id: 'styles',
            // 自定义线程数量
            threads: 2,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        })
    ]
};
```

#### 使用缓存

无论是做页面加载性能优化，还是 webpack 优化，或是其他方面的优化，只要有缓存的概念，基本上都可以借助到缓存；

##### Babel-loader

Webpack打包的实质就是对 JS 文件的打包，JS 文件打包多会用到 `babel-loader` 来进行代码编译, 打包耗时久, 一大原因就是因为编译时间过长。	

所以对于编译我们一是要合理的配置 `exclude` 和 `include` , 二来就是缓存; babel-loader 给我们提供了一个 `cacheDirectory` 配置选项, 用来给 Babel 编译时给定的目录，并且将用于缓存加载器的结果，但是这个设置**默认是false**关闭的状态，我们需要设置为true，这样 babel-loader 将使用默认的缓存目录 。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
            cacheDirectory: true, // 开启缓存
        },
        // 排除路径
        exclude: /node_modules/,
        // 查找路径
        include: [path.resolve('.src')]
    	}
    ]
  }
};
```

#### 合理配置sourceMap

不合理的使用sourceMap也会也会严重影响打包用时, 因为 sourceMap 的生成相当耗费时间, 建议在生产环境直接关闭 sourceMap 的生成

#### 使用效率速度更高的loader和插件

及时对 loader 或插件升级, 和寻找同功能但效率性能更好的插件进行替换, 也可以明显的提升打包速度。

### 代码压缩优化

代码压缩一般来说，只有在生产环境才需要进行，除了利用缓存和开启多线程，其余可优化空间较小；基于此我们可以借助 [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) 插件来开启多线程和缓存，**terser-webpack-plugin** 是webpack官方在维护的插件，但是需要注意插件仅在webpack4可以使用。**terser-webpack-plugin** 插件除了可以开启缓存和多线程外，还可以配置在打包时删除 `console` `debugger` 以及不可访问的语句。

```js
// webpack是基于node运行的，所以需要使用require语句导入
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true, // 开启缓存
                parallel: true // 多线程
            })
        ]
    }
};
```

## 缩小项目体积

### 使用CDN将项目依赖加载进来

一个项目的开发，不可避免地要使用众多的三方依赖，一般情况对于三方依赖我们都是 `npm install` 直接安装进项目，但很明显打包时，这些三方依赖也被打包进项目了，所以对于三方依赖我们可以使用CDN的方式引入项目，关于CDN的相关配置可以看我的这篇文章 ： [https://juejin.im/post/5d46378a5188255d845fff71](https://juejin.im/post/5d46378a5188255d845fff71)

### JS代码压缩

对于JS的代码压缩可以使用  [`terser-webpack-plugin`](https://github.com/webpack-contrib/terser-webpack-plugin) 插件，它是webpack官方维护的插件，配置示例：

```js
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启 cache，加快二次构建速度
        parallel: true, // 开启多线程压缩打包
        terserOptions: {
          output: {
            comments: false, // 打包时删除注释
          },
          compress: {
            drop_console: true, // 生产环境禁止打印console.log()
            dead_code: true, // 删除无法访问的代码
            drop_debugger: true, // 删除debugger
          },
        },
      }),
    ],
  },
};

```

### CSS压缩

除了JS外，我也们还可以对CSS代码进行压缩；

#### CSS导出

首先我们的 CSS 文件应该是导出到单独的 CSS 文件中，而不要直接打包到 JavaScript 文件中，然后通过style-loader的 addStyles方法添加进去，导出 CSS 文件就需要使用[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)这个插件。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[contenthash:8].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      }
    ]
  }
};
```

#### CSS压缩

对于CSS的压缩，我们可以使用 [cssnano](https://cssnano.co/) ，**cssnano** 是基于 postcss 的一款功能强大的插件包，集成了 30 多个插件，只需要执行一个命令，就可以对我们的 CSS 做多方面不同类型的优化，比如：

- 删除空格和最后一个分号；
- 删除注释；
- 优化字体权重；
- 丢弃重复的样式规则；
- 压缩选择器；
- 减少手写属性；
- 合并规则；
- …

在 Webapck 中，css-loader 已经集成了 cssnano，所以我们可以使用[optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)来自定义 cssnano 的规则。optimize-css-assets-webpack-plugin 是一个 CSS 的压缩插件，默认的压缩引擎就是 cssnano。

```js
// webpack.config.js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'), // 这里制定了引擎，不指定默认也是 cssnano
      cssProcessorPluginOptions: {
        preset: ['default', {discardComments: {removeAll: true}}]
      },
      canPrint: true
    })
  ]
};
```

### 图片资源优化

在项目中大多时候代码其实并没有多大，但一张 banner 图可能会比整个项目都大，所以对于图片资源，建议上传到 CDN ，通过外链加载进来而不是打包进项目。

同时可以借助 `url-loader` 对静态资源进行优化，如果项目中有众多的小图标，也使用[雪碧图](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/CSS_Image_Sprites)（CSS Sprite）来合并这些小图到一张大图中，然后使用background-position来设置图片的位置，同时也可以节省多次小图片的请求。

## 结束