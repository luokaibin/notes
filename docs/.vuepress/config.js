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