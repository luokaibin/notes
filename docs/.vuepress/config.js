module.exports = {
  title: '胖大人的日常记事',
  description: 'Just playing around',
  plugins: ['@vuepress/pwa',{
    serviceWorker: true,
    popupComponent: 'MySWUpdatePopup',
    updatePopup: true,
  }],
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: 'logo.png' }],
    ['link', { rel: 'mask-icon', href: 'logo.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: 'logo_144*144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }]
  ],
  themeConfig: {
    sidebar: {
      '/webpack/': [
        ['0001.md', '01 开篇词 | 使用 Webpack 实现前端工程化'],
        ['0002.md', '02 什么是 Webpack'],
        ['0003.md', '03 Webpack 开发环境搭建'],
        ['0004.md', '04 使用 webpack-cli 体验零配置打包'],
        ['0005.md', '05 基础概念和常见配置项介绍（一）'],
        ['0006.md', '06 基础概念和常见配置项介绍（二）'],
        ['0007.md', '07 Webpack 中的模块化开发'],
        ['0008.md', '08 在 Webpack 中使用 Babel 转换 JavaScript 代码'],
        ['0009.md', '09 Webpack 中使用 TypeScript 开发项目'],
        ['0010.md', '10 Webpack 中样式相关的配置'],
        ['0011.md', '11 Webpack 中使用 lint 工具来保证代码风格和质量'],
        ['0012.md', '12 使用 Webpack 管理项目中的静态资源'],
        ['0013.md', '13 Webpack 中打包 HTML 和多页面配置'],
        ['0014.md', '14 Webpack Dev Server 本地开发服务'],
        ['0015.md', '15 Webpack 中配置React和Vue开发环境'],
        ['0016.md', '16 Webpack 环境相关配置及配置文件拆分'],
        ['0017.md', '17 Webpack 优化之体积优化'],
        ['0018.md', '18 Webpack 优化之增强缓存命中率'],
        ['0019.md', '19 使用 Webpack 的 splitChunks 功能来拆分代码'],
        ['0020.md', '20 Webpack 优化之速度优化'],
        ['0021.md', '21 使用 Webpack 的 Tree-Shaking'],
        ['0022.md', '22 为你准备了一份 Webpack 工程化最佳实践总结'],
        ['0023.md', '23 怎么调试 Webpack？'],
        ['0024.md', '24 Tapable —— Webpack 的核心模块'],
        ['0025.md', '25 Webpack 的 Compiler 和 Compilation'],
        ['0026.md', '26 Webpack 工作流程'],
        ['0027.md', '27 从 Webpack 的产出代码来看 Webpack 是怎么执行的'],
        ['0028.md', '28 Webpack 的模块热替换做了什么？'],
        ['0029.md', '29 实战：使用 PostCSS 打造移动适配方案'],
        ['0030.md', '30 实战：手写一个 markdown-loader'],
        ['0031.md', '31 实战：手写一个 prefetch-webpack-plugin 插件'],
        ['0032.md', '32 实战：使用 Express 和中间件来实现 Webpack-dev-server'],
        ['0033.md', '33 实战：使用 Stats 数据结构生成 Webpack 构建报告'],
        ['0034.md', '34 实战：给 Webpack 项目添加 modern'],
        ['0035.md', '35 Webpack 5.0'],
        ['0036.md', '36 课程总结'],
        ['0037.md', '37 附录：项目中常用的 loader'],
        ['0038.md', '38 附录：项目中常用的插件'],
      ],
      '/typescript/': [
        ['TypeScript入门.md', 'TypeScript入门']
      ],
      '/es2015/': [
        {
          title: 'ES2015+常用API',   // 必要的
          // path: '/foo/',      // 可选的, 应该是一个绝对路径
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2,    // 可选的, 默认值是 1
          children: [
            '变量',
            '字符串',
            '箭头函数',
            '数组',
            '对象',
            'Map',
            'Set',
            'Promise',
            '语句和声明',
            '扩展',
          ]
        },
        'async和Promise以及Generator什么关系',
        '如何使用Gzip进行前端性能优化',
        'forEach与map性能对比',
        'Symbol新的JS原始数据类型',
        '借助Web自定义事件更好的实现发布订阅',
        '借助Map更好的实现策略模式',
        '使用fetch更轻量的去做请求',
        'FileReader前端文件读取',
        'FormData详解',
        'What is  Blob',
        '如何在Web使用手机原生的分享能力',
        '如何在Input中输入图片(实现简易富文本编辑器)',
      ],
      '/other/': [
        '恰运维一口饭',
        '将Vue玩出花',
        '将小程序玩出花',
        '算法复杂度是什么',
      ]
    },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    displayAllHeaders: false,
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'webpack',
        link: '/webpack/'
      },
      {
        text: 'typescript',
        link: '/typescript/TypeScript入门'
      },
      {
        text: 'ES2015 +',
        link: '/es2015/ES2015+常用API'
      },
      {
        text: 'other',
        link: '/other/恰运维一口饭'
      }
    ],
  },
}