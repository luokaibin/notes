const path = require('path');
module.exports = {
  title: '胖大人的日常记事',
  description: 'Just playing around',
  base: '/vuepress/',
  plugins: ['@vuepress/pwa',{
    serviceWorker: true,
    updatePopup: {
      message: '内容有更新',
      buttonText: '刷新'
    },
  }, {
    clientRootMixin: path.resolve(__dirname, 'urlChange.js')
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
    ['meta', { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }],
    ['script', { src: 'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js', defer: 'defer'}],
    ['script', { src: 'https://static.jindll.com/static/cdn/html2canvas.min.js', defer: 'defer'}],
    ['script', { src: '/share.js?2gu6df', defer: 'defer'}],
    ['link', { rel: 'stylesheet', href: '/reset.css?2gu6df'}],
  ],
  themeConfig: {
    sidebar: {
      '/web/webpack/': [
        '01 使用 Webpack 实现前端工程化',
        '02 什么是 Webpack',
        '03 Webpack 开发环境搭建',
        '04 使用 webpack-cli 体验零配置打包',
        '05 基础概念和常见配置项介绍（一）',
        '06 基础概念和常见配置项介绍（二）',
        '07 Webpack 中的模块化开发',
        '08 在 Webpack 中使用 Babel 转换 JavaScript 代码',
        '09 Webpack 中使用 TypeScript 开发项目',
        '10 Webpack 中样式相关的配置',
        '11 Webpack 中使用 lint 工具来保证代码风格和质量',
        '12 使用 Webpack 管理项目中的静态资源',
        '13 Webpack 中打包 HTML 和多页面配置',
        '14 Webpack Dev Server 本地开发服务',
        '15 Webpack 中配置React和Vue开发环境',
        '16 Webpack 环境相关配置及配置文件拆分',
        '17 Webpack 优化之体积优化',
        '18 Webpack 优化之增强缓存命中率',
        '19 使用 Webpack 的 splitChunks 功能来拆分代码',
        '20 Webpack 优化之速度优化',
        '21 使用 Webpack 的 Tree-Shaking',
        '22 为你准备了一份 Webpack 工程化最佳实践总结',
        '23 怎么调试 Webpack？',
        '24 Tapable —— Webpack 的核心模块',
        '25 Webpack 的 Compiler 和 Compilation',
        '26 Webpack 工作流程',
        '27 从 Webpack 的产出代码来看 Webpack 是怎么执行的',
        '28 Webpack 的模块热替换做了什么？',
        '29 实战：使用 PostCSS 打造移动适配方案',
        '30 实战：手写一个 markdown-loader',
        '31 实战：手写一个 prefetch-webpack-plugin 插件',
        '32 实战：使用 Express 和中间件来实现 Webpack-dev-server',
        '33 实战：使用 Stats 数据结构生成 Webpack 构建报告',
        '34 实战：给 Webpack 项目添加 modern',
        '35 Webpack 5.0',
        '36 课程总结',
        '37 附录：项目中常用的 loader',
        '38 附录：项目中常用的插件',
      ],
      '/web/typescript/': [
        ['TypeScript入门.md', 'TypeScript入门']
      ],
      '/web/es2015/': [
        {
          title: 'ES2015+常用API',   // 必要的
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
        'forEach与map性能对比',
        'Symbol新的JS原始数据类型',
        '借助Map更好的实现策略模式',
        '使用fetch更轻量的去做请求',
        'FileReader前端文件读取',
        'FormData详解',
        'What is  Blob',
        '如何在Web使用手机原生的分享能力',
        '实现简易富文本编辑器',
      ],
      '/web/': [
        {
          title: '前端面试系列',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2,    // 可选的, 默认值是 1
          children: [
            'interview/扫盲--前端面试',
            'interview/在浏览器输入一个地址发生了什么',
            'interview/如何使页面更快的呈现在用户面前',
            'interview/如何收集产品线上错误',
            'interview/函数节流与函数防抖',
            'interview/webpack性能优化',
            'interview/前端技术发展史',
            'interview/腾讯四道笔试真题',
            'interview/前端面试自问自答'
          ]
        },
        '仿EventBus实现小程序兄弟组件传值',
        '如何自定义一套Vue-Cli项目模版',
        'iframe架构微前端实战',
        '将Vue玩出花',
        '将小程序玩出花',
        '大型前端项目结构设计',
        '大型前端项目git管理方案',
      ],
      '/node/': [
        "egg-redis常用api",
        "eggjs新手村指南",
        "node常用功能",
        "从零搭建Koa项目",
        "使用apidoc生成接口文档",
      ],
      '/other/': [
        '基础正则',
        '速查',
        'Nginx',
        '算法复杂度是什么',
        'Typora配置图片上传',
      ],
      '/discipline/HRM/': [
        '人力资源管理概述',
        '工作分析与岗位评价',
        '人力资源规划',
        '员工招聘',
        '员工培训',
        '职业生涯管理',
        '绩效管理',
        '薪酬管理',
      ],
      '/discipline/exam/': [
        '工商行政管理',
        '货币银行学',
        '现代企业制度管理',
      ],
      '/discipline/degree/': [
        '学位英语',
        '单词'
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
        text: 'Web',
        ariaLabel: 'web',
        items: [
          {
            text: 'ES2015 +',
            link: '/web/es2015/ES2015+常用API'
          },
          // {
          //   text: 'Webpack',
          //   link: '/web/webpack/'
          // },
          {
            text: 'TypeScript',
            link: '/web/typescript/TypeScript入门'
          },
          {
            text: 'more...',
            link: '/web/iframe架构微前端实战'
          },
        ]
      },
      {
        text: 'Node.js',
        link: '/node/node常用功能'
      },
      {
        text: 'other',
        link: '/other/恰运维一口饭'
      },
      {
        text: '课程',
        ariaLabel: 'discipline',
        items: [
          {
            text: '学位考试',
            link: '/discipline/degree/学位英语'
          },
          {
            text: 'HRM',
            link: '/discipline/HRM/人力资源管理概述'
          },
          {
            text: 'EXAM',
            link: '/discipline/exam/工商行政管理'
          }
        ]
      }
    ],
  },
  markdown: {
    lineNumbers: true
  }
}