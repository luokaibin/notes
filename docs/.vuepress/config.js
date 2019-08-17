module.exports = {
  title: '胖大人的日常记事',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: `/docs/.vuepress/public/logo.ico` }],
    //增加manifest.json
    ['link', { rel: 'manifest', href: '/docs/.vuepress/public/manifest.json' }],
  ],
  serviceWorker: true,
  themeConfig: {
    sidebar: [
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
    ],
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    displayAllHeaders: false,
    nav: [{
        text: 'Home',
        link: '/'
      },
      // {
      //   text: 'Guide',
      //   link: '/guide/'
      // },
      // {
      //   text: 'External',
      //   link: 'https://google.com'
      // },
    ],
  }
}