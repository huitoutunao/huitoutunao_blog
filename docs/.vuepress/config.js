module.exports = {
    title: '灰头涂脑',
    description: '站在巨人肩膀上看世界',
    dest: './dist',
    host: 'localhost',
    port: '8080',
    head: [
        ['link', {rel: 'icon', href: '/icon.png'}],
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
        ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }],
    ],
    markdown: {
        lineNumbers: false,
        extendMarkdown: md => {
            // 使用更多的 markdown-it 插件!
            md.use(require('markdown-it-latex2img')) // 说明文档：https://makergyt.github.io/markdown-it-latex2img/
        }
    },
    extraWatchFiles: [
        '/docs/question/qs_css/004-求最终left、right的宽度',
        '/docs/guide/git/Github搜索开源项目',
    ],
    themeConfig: {
        // repo: 'https://github.com/Mulander-J/Wiki1001Pro.git', // 链接到 github 博客地址
        // repoLabel: 'GitHub',
        logo: '/nav_logo.png',  // 导航栏logo
        nav: [{ // 头部导航栏
            text: '前端笔记', link: '/guide/'
        }, {
            text: '面试题', link: '/question/'
        }, {
            text: '阅读书籍', link: '/books/'
        }],
        sidebar: {
            '/guide/': [{
                title: 'JavaScript 进阶',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/js_advanced/作用域和闭包',
                    '/guide/js_advanced/关于this',
                    '/guide/js_advanced/原型',
                    '/guide/js_advanced/js中栈内存和堆内存的区别',
                ]
            }, {
                title: 'JavaScript 专题',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/js_subject/模拟实现call、apply和bind',
                    '/guide/js_subject/模拟实现instanceof',
                ]
            }, {
                title: 'Vue2 进阶',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/vue2_advanced/vue-cli4.0创建项目',
                ]
            }, {
                title: 'Git',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/git/Git操作指南',
                    '/guide/git/Github搜索开源项目',
                ]
            }, {
                title: '算法',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/algorithm/介绍',
                ]
            }, {
                title: '杂文乱炖',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/essays/VuePress搭建博客',
                    '/guide/essays/向面试官提问',
                    '/guide/essays/NPM发包、更新和撤销',
                    '/guide/essays/H5手机App开发',
                ]
            }],
            '/question/': [{
                title: 'HTML篇',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/question/qs_html/001-语义化的理解',
                    '/question/qs_html/002-meta元素都有什么',
                    '/question/qs_html/003-script的async跟defer的区别',
                    '/question/qs_html/004-html标签b和strong的区别',
                    '/question/qs_html/005-html布局元素的分类有哪些？描述每种布局元素的应用场景',
                ]
            }, {
                title: 'JS篇',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/question/qs_js/节流与防抖',
                    '/question/qs_js/001-递归实现，数组长度为5且元素的随机数在2-32间不重复的值',
                    '/question/qs_js/002-去掉字符串中的空格',
                    '/question/qs_js/003-去除字符串中最后一个指定的字符',
                    '/question/qs_js/004-写一个方法把下划线命名转成大驼峰命名',
                    '/question/qs_js/005-写一个去除制表符和换行符的方法',
                    '/question/qs_js/006-统计某一字符或字符串在另一个字符串中出现的次数',
                ]
            }, {
                title: 'CSS篇',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/question/qs_css/001-如何让一个元素水平垂直居中',
                    '/question/qs_css/002-css如何实现左侧固定300px，右侧自适应的布局',
                    '/question/qs_css/003-标准盒模型和IE盒模型的区别',
                    '/question/qs_css/004-求最终left、right的宽度',
                ]
            }, {
                title: '框架篇',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/question/qs_frame/1'
                ]
            }, {
                title: '异步篇',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/question/qs_async/1'
                ]
            }]
        },
        smoothScroll: true,
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10
    },
    evergreen: true
}