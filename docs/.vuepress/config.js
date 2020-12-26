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
        lineNumbers: true,
        extendMarkdown: md => {
            // 使用更多的 markdown-it 插件!
            md.use(require('markdown-it-katex'))
        }
    },
    extraWatchFiles: [
        '/docs/question/qs_js/002-去掉字符串中的空格',
        '/docs/guide/algorithm/介绍',
    ],
    themeConfig: {
        logo: '/nav_logo.png',  // 导航栏logo
        nav: [{ // 头部导航栏
            text: '学习笔记', link: '/guide/'
        }, {
            text: '面试题', link: '/question/'
        }, {
            text: '阅读书籍', link: '/books/'
        }],
        // {
        //     text: 'Language',
        //     ariaLabel: 'Language Menu',
        //     items: [{
        //         text: 'Chinese',
        //         link: '/chinese/'
        //     }, {
        //         text: 'English',
        //         link: '/english/'
        //     }]
        // }
        sidebar: {
            '/guide/': [{
                title: '学习笔记',
                collapsable: false,
            }, {
                title: 'JavaScript',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/javascript/js基础',
                ]
            }, {
                title: 'Vue',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/vue_js/vue-cli4.0创建项目',
                ]
            }, {
                title: 'Git',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/git/Git操作指南',
                ]
            }, {
                title: 'Project',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/guide/project/zhongshengyaoye',
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
                    '/guide/essays/向面试官提问',
                    '/guide/essays/H5手机App开发',
                ]
            }],
            '/question/': [{
                title: '面试题汇总',
                collapsable: false
            }, {
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
                ]
            }, {
                title: 'CSS篇',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                    '/question/qs_css/001-如何让一个元素水平垂直居中',
                    '/question/qs_css/002-css如何实现左侧固定300px，右侧自适应的布局',
                    '/question/qs_css/003-标准盒模型和IE盒模型的区别',
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