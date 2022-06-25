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
    plugins: ['@vuepress/medium-zoom'],
    extraWatchFiles: [
        '/docs/question/qs_css/004-求最终left、right的宽度',
        '/docs/guide/git/Github搜索开源项目',
    ],
    themeConfig: {
        repo: 'https://github.com/huitoutunao/Blog', // 链接到 github 博客地址
        repoLabel: 'GitHub',
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
                title: 'JavaScript进阶',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/js_advanced/作用域和闭包',
                    '/guide/js_advanced/关于this',
                    '/guide/js_advanced/原型和原型链',
                    '/guide/js_advanced/继承',
                    '/guide/js_advanced/浮点数精度',
                    '/guide/js_advanced/类型转换',
                    '/guide/js_advanced/栈内存和堆内存的区别',
                    '/guide/js_advanced/函数柯里化',
                    '/guide/js_advanced/偏函数',
                    '/guide/js_advanced/惰性函数',
                    '/guide/js_advanced/TypeScript基础',
                ]
            }, {
                title: 'JavaScript专题',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/js_subject/模拟实现instanceof',
                    '/guide/js_subject/模拟实现call、apply和bind',
                    '/guide/js_subject/模拟实现new',
                    '/guide/js_subject/数组去重',
                    '/guide/js_subject/类型判断',
                    '/guide/js_subject/阅读lodash源码学防抖',
                    '/guide/js_subject/阅读lodash源码学节流',
                    '/guide/js_subject/深拷贝',
                    '/guide/js_subject/如何求数组的最大值',
                    '/guide/js_subject/数组扁平化',
                    '/guide/js_subject/事件循环机制',
                    '/guide/js_subject/V8引擎的垃圾回收机制-简易',
                    '/guide/js_subject/V8引擎的垃圾回收机制-完整',
                    '/guide/js_subject/V8是如何执行一段JS代码',
                    '/guide/js_subject/JS实用技巧',
                ]
            }, {
                title: 'Vuejs进阶',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/vue2_advanced/vue2与vue3的区别',
                    '/guide/vue2_advanced/Vue2项目简易封装Axios',
                    '/guide/vue2_advanced/vue-cli4创建项目',
                    '/guide/vue2_advanced/虚拟列表',
                    '/guide/vue2_advanced/Vue2源码之Object的变化侦测',
                    '/guide/vue2_advanced/Vue2源码之Array的变化侦测',
                    '/guide/vue2_advanced/Vue2源码之虚拟DOM',
                ]
            }, {
                title: '浏览器和HTTP',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/browser/Chrome架构初探',
                    '/guide/browser/TCP协议简介',
                    '/guide/browser/HTTP请求流程的简单介绍',
                    '/guide/browser/浏览器输入URL发生了什么',
                    '/guide/browser/如何系统优化页面',
                    '/guide/browser/浏览器常见安全问题',
                    '/guide/browser/HTTP基本认识',
                    '/guide/browser/HTTP的Cookie机制和缓存控制',
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
                    '/guide/essays/认识JSBridge',
                    '/guide/essays/NVM的安装和使用',
                    '/guide/essays/Sass进阶',
                    '/guide/essays/Sass、Scss与Less区别',
                    '/guide/essays/从零搭建一个简单的Vue脚手架',
                    '/guide/essays/VuePress搭建博客',
                    '/guide/essays/vscode调试lodash源码',
                    '/guide/essays/NPM发包、更新和撤销',
                    '/guide/essays/Git实战技巧',
                    '/guide/essays/Git问题总结',
                    '/guide/essays/Github搜索开源项目',
                    '/guide/essays/H5手机App开发',
                    '/guide/essays/向面试官提问',
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
                    '/question/qs_js/001-递归实现，数组长度为5且元素的随机数在2-32间不重复的值',
                    '/question/qs_js/002-去掉字符串中的空格',
                    '/question/qs_js/003-去除字符串中最后一个指定的字符',
                    '/question/qs_js/004-写一个方法把下划线命名转成大驼峰命名',
                    '/question/qs_js/005-写一个去除制表符和换行符的方法',
                    '/question/qs_js/006-统计某一字符或字符串在另一个字符串中出现的次数',
                    '/question/qs_js/007-介绍下Set、Map、WeakSet和WeakMap的区别',
                    '/question/qs_js/008-如何判断一个元素是否在可视区域中',
                    '/question/qs_js/009-手写filter函数',
                    '/question/qs_js/010-手写reduce函数',
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
                    '/question/qs_css/005-em_px_rem_vh_vw',
                    '/question/qs_css/006-隐藏元素及区别',
                    '/question/qs_css/007-实现三栏布局中间自适应',
                    '/question/qs_css/008-如何画一个三角形',
                    '/question/qs_css/009-css动画有哪些',
                    '/question/qs_css/010-谈谈对BFC的理解',
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
            }],
            '/books/': [{
                title: '阅读感悟',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/books/read_think/追风筝的人',
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