import { defineUserConfig, defaultTheme } from 'vuepress'
// import { searchPlugin } from '@vuepress/plugin-search'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import markdownItLatex2img from 'markdown-it-latex2img'
import navbar from './configs/navbar.js'
import sidebar from './configs/sidebar.js'

export default defineUserConfig({
  base: '/',
  dest: './dist',
  lang: 'zh-CN',
  title: '灰头涂脑',
  description: '站在巨人肩膀上看世界',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon.png',
      },
    ],
  ],
  theme: defaultTheme({
    logo: '/hero.png',
    repo: 'https://github.com/huitoutunao/Blog',
    docsDir: 'docs',

    // 导航栏
    navbar,

    // 侧边栏
    sidebar,

    editLinkText: '在 GitHub 上编辑此页',
    lastUpdatedText: '上次更新',
    contributors: false,
    tip: '提示',
    warning: '注意',
    danger: '警告',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',
    openInNewWindow: '在新窗口打开',
    toggleColorMode: '切换颜色模式',
    toggleSidebar: '切换侧边栏',
  }),
  plugins: [
    // searchPlugin(),
    docsearchPlugin({
      apiKey: '0f0328a546f58b3cb46610152f200901',
      indexName: 'huitoutunao',
      appId: 'SJVDTH9RC3',
      placeholder: '搜索文档',
    }),
  ],
  extendsMarkdown: (md) => {
    md.use(markdownItLatex2img)
  },
})
