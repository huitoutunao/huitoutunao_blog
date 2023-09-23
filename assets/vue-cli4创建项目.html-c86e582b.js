import{_ as c,r as p,o,c as l,a as n,b as s,e as a,w as r,d as t}from"./app-1a9b85d0.js";const u="/images/vue_js/vue_1.jpg",d="/images/vue_js/vue_2.jpg",v="/images/vue_js/vue_3.jpg",k="/images/vue_js/vue_4.jpg",m={},b=n("h1",{id:"vue-cli4-创建项目",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vue-cli4-创建项目","aria-hidden":"true"},"#"),s(" vue-cli4 创建项目")],-1),h=n("h2",{id:"前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),s(" 前言")],-1),g=n("p",null,"由于在工作中经常使用vue框架来开发项目，所以或多或少都有遇到一些问题。这篇文章主要总结 vue-cli4.0 创建项目的流程，和安装配置相关移动端适配插件。",-1),x={href:"https://nodejs.org/zh-cn/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://webpack.docschina.org/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://cli.vuejs.org/zh/guide/installation.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.npmjs.com/package/mirror-config-china",target:"_blank",rel:"noopener noreferrer"},w=t(`<h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># node.js 版本号：v12.13.0</span>
<span class="token function">node</span> <span class="token parameter variable">-v</span>

<span class="token comment"># npm 版本号：6.10.0</span>
<span class="token function">npm</span> <span class="token parameter variable">-v</span>

<span class="token comment"># vue-cli 版本号：@vue/cli 4.4.0</span>
vue <span class="token parameter variable">-V</span>

<span class="token comment"># 安装淘宝镜像</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> cnpm <span class="token parameter variable">--registry</span><span class="token operator">=</span>https://registry.npm.taobao.org

<span class="token comment"># 安装 mirror-config-china</span>
<span class="token function">npm</span> i <span class="token parameter variable">-g</span> mirror-config-china <span class="token parameter variable">--registry</span><span class="token operator">=</span>https://registry.npm.taobao.org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建项目" tabindex="-1"><a class="header-anchor" href="#构建项目" aria-hidden="true">#</a> 构建项目</h2><h4 id="打开命令行工具-执行下面语句开始创建项目-app-cli是即将要创建项目的名称也是存放项目文件的文件夹名称" tabindex="-1"><a class="header-anchor" href="#打开命令行工具-执行下面语句开始创建项目-app-cli是即将要创建项目的名称也是存放项目文件的文件夹名称" aria-hidden="true">#</a> 打开命令行工具，执行下面语句开始创建项目：app_cli是即将要创建项目的名称也是存放项目文件的文件夹名称</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vue create app_cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="运行后-可以看到下面出现两个选项-第一项是默认设置babel和eslint插件-第二项是自定义安装插件-我选择了第二项。" tabindex="-1"><a class="header-anchor" href="#运行后-可以看到下面出现两个选项-第一项是默认设置babel和eslint插件-第二项是自定义安装插件-我选择了第二项。" aria-hidden="true">#</a> 运行后，可以看到下面出现两个选项，第一项是默认设置babel和eslint插件，第二项是自定义安装插件，我选择了第二项。</h4><p><img src="`+u+'" alt="avatar"></p><h4 id="选项如下图-我分别选择了babel-router-vuex。" tabindex="-1"><a class="header-anchor" href="#选项如下图-我分别选择了babel-router-vuex。" aria-hidden="true">#</a> 选项如下图，我分别选择了babel，router，vuex。</h4><p>Babel：转码器，可以将ES6转成ES5代码</p><p>Typescript：TypeScript是一个JavaScript（后缀.js）的超集（后缀.ts）包含并扩展了 JavaScript 的语法，需要被编译输出为 JavaScript在浏览器运行</p><p>Progressive Web App (PWA) Support：渐进式Web应用程序</p><p>Router：vue路由</p><p>Vuex：vue的状态管理模式</p><p>CSS Pre-processors：CSS预处理器（如：less、sass、stylus）</p><p>Linter / Formatter：代码风格检查和格式化（如：ESlint）</p><p>Unit Testing：单元测试</p><p>E2E Testing：e2e（end to end） 测试</p><p><img src="'+d+'" alt="avatar"></p><h4 id="接下来只要按照下面选择就好了-最后就是漫长的等待" tabindex="-1"><a class="header-anchor" href="#接下来只要按照下面选择就好了-最后就是漫长的等待" aria-hidden="true">#</a> 接下来只要按照下面选择就好了，最后就是漫长的等待...</h4><p><img src="'+v+'" alt="avatar"></p><p><img src="'+k+'" alt="avatar"></p><h2 id="配置相关插件——lint" tabindex="-1"><a class="header-anchor" href="#配置相关插件——lint" aria-hidden="true">#</a> 配置相关插件——lint</h2><h4 id="安装eslint-plugin" tabindex="-1"><a class="header-anchor" href="#安装eslint-plugin" aria-hidden="true">#</a> 安装eslint-plugin</h4>',23),j=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 有时候会安装失败</span>
vue <span class="token function">add</span> eslint

<span class="token comment"># 上面安装失败，用下面这条语句，直接去图形界面搜索cli-plugin-eslint（一般排在最前面）</span>
<span class="token comment"># 注意：进入图形界面操作时，须要选择该项目文件夹</span>
vue ui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),S={href:"https://github.com/huitoutunao/vue-lint",target:"_blank",rel:"noopener noreferrer"},q=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 补充安装 eslint 依赖</span>
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> eslint eslint-plugin-vue

<span class="token comment"># 安装 eslint-loader</span>
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> eslint-loader

<span class="token comment"># 安装 eslint-friendly-formatter</span>
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> eslint-friendly-formatter

<span class="token comment"># 安装 babel-eslint</span>
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> babel-eslint

<span class="token comment"># 安装 stylelint-webpack-plugin stylelint</span>
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> stylelint-webpack-plugin stylelint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),C={href:"https://vue-loader.vuejs.org/zh/guide/linting.html#stylelint",target:"_blank",rel:"noopener noreferrer"},E=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> StyleLintPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;stylelint-webpack-plugin&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... 其它选项</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">StyleLintPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;**/*.{vue,htm,html,css,sss,less,scss,sass}&#39;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置移动端适配插件" tabindex="-1"><a class="header-anchor" href="#配置移动端适配插件" aria-hidden="true">#</a> 配置移动端适配插件</h2><p>打开根目录的.postcssrc.js文件，可以看到那里已经写好了相关配置项，现在须要依次安装它们。 这里移动端适配使用的是vw方案，已经弃用flexible方案了。 <strong>注意：目前 vue-cli 4 的 postcss 的版本是 7，而 postcss-import 和 postcss-url 插件需要安装兼容 7 版本的，分别是 12.0.1 和 8.0.0，可以将下面这两个命令修改为 postcss-import@12.0.1、postcss-url@8.0.0</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-S</span> postcss-import postcss-url postcss-aspect-ratio-mini postcss-write-svg postcss-cssnext postcss-px-to-viewport cssnano
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="postcss-import" tabindex="-1"><a class="header-anchor" href="#postcss-import" aria-hidden="true">#</a> postcss-import</h3><p>postcss-import主要功能是解决@import引入路径问题。使用这个插件，可以让你很轻易的使用本地文件、node_modules或者web_modules的文件。这个插件配合postcss-url让你引入文件变得更轻松。</p><h3 id="postcss-url" tabindex="-1"><a class="header-anchor" href="#postcss-url" aria-hidden="true">#</a> postcss-url</h3><p>postcss-url插件主要用来处理文件，比如图片文件、字体文件等引用路径的处理。</p><h3 id="postcss-cssnext" tabindex="-1"><a class="header-anchor" href="#postcss-cssnext" aria-hidden="true">#</a> postcss-cssnext</h3><p>postcss-cssnext插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理。</p><h3 id="cssnano" tabindex="-1"><a class="header-anchor" href="#cssnano" aria-hidden="true">#</a> cssnano</h3><p>cssnano主要用来压缩和清理CSS代码，配置中使用了preset: &quot;advanced&quot;，所以还需要另外安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 cssnano-preset-advanced</span>
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> cssnano-preset-advanced
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装好后，在.postcssrc.js文件上配置如下：（提供的文件已经配置好了）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string-property property">&#39;cssnano&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;cssnano-preset-advanced&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">zindex</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token literal-property property">autoprefixer</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码把autoprefixer和postcss-zindex禁掉了。前者是有重复调用，后者是只要启用了这个插件，z-index的值就会重置为1。千万记得将postcss-zindex设置为false。</p><h3 id="postcss-px-to-viewport" tabindex="-1"><a class="header-anchor" href="#postcss-px-to-viewport" aria-hidden="true">#</a> postcss-px-to-viewport</h3>`,17),z={href:"https://github.com/evrone/postcss-px-to-viewport",target:"_blank",rel:"noopener noreferrer"},D=t(`<p>在不想要把px转换为vw的时候，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box ignore<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编写CSS时：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.ignore</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span> // 这里不会被编译成vw单位
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 180px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.hairlines</span> <span class="token punctuation">{</span>
    <span class="token property">border-bottom</span><span class="token punctuation">:</span> 0.5px solid red<span class="token punctuation">;</span> // 这里不会被编译成vw单位
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="postcss-aspect-ratio-mini" tabindex="-1"><a class="header-anchor" href="#postcss-aspect-ratio-mini" aria-hidden="true">#</a> postcss-aspect-ratio-mini</h3><p>postcss-aspect-ratio-mini主要用来处理元素容器宽高比。在实际使用的时候，具有一个默认的结构</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">aspectratio</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">aspectratio-content</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构定义之后，需要在你的样式文件中添加一个统一的宽度比默认属性：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">[aspectratio]</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">[aspectratio]::before</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -1px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">[aspectratio-content]</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想要做一个188:246（188是容器宽度，246是容器高度）这样的比例容器，只需要这样使用：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">[w-188-246]</span> <span class="token punctuation">{</span>
  <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> <span class="token string">&#39;188:246&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>有一点需要特别注意：aspect-ratio属性不能和其他属性写在一起，否则编译出来的属性只会留下aspect-ratio的值，比如：</strong></em></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">aspectratio</span> <span class="token attr-name">w-188-246</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>color<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>补充解释：主要是因为在插件中做了相应的处理，不在每次调用aspect-ratio时，生成前面指定的默认样式代码，这样代码没那么冗余。所以在使用的时候，需要把width和background-color分开来写：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">[w-188-246]</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 188px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">[w-188-246]</span> <span class="token punctuation">{</span>
  <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> <span class="token string">&#39;188:246&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="postcss-write-svg" tabindex="-1"><a class="header-anchor" href="#postcss-write-svg" aria-hidden="true">#</a> postcss-write-svg</h3><p>postcss-write-svg 插件主要用来处理移动端 1px 的解决方案。该插件主要使用的是 border-image 和 background 来做 1px 的相关处理。比如：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@svg</span> 1px-border</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
  <span class="token atrule"><span class="token rule">@rect</span></span> <span class="token punctuation">{</span>
    <span class="token property">fill</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--color<span class="token punctuation">,</span> black<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.example</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-image</span><span class="token punctuation">:</span> <span class="token function">svg</span><span class="token punctuation">(</span>1px-border <span class="token function">param</span><span class="token punctuation">(</span>--color #00b1ff<span class="token punctuation">)</span><span class="token punctuation">)</span> 2 2 stretch<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译 CSS 后：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.example</span> <span class="token punctuation">{</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid transparent<span class="token punctuation">;</span>
    <span class="token property">border-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;data:image/svg+xml;charset=utf-8,%3Csvg xmlns=&#39;http://www.w3.org/2000/svg&#39; height=&#39;2px&#39;%3E%3Crect fill=&#39;%2300b1ff&#39; width=&#39;100%25&#39; height=&#39;50%25&#39;/%3E%3C/svg%3E&quot;</span><span class="token punctuation">)</span></span> 2 2 stretch<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面演示的是使用 <em><strong>border-image</strong></em> 方式，除此之外还可以使用 <em><strong>background-image</strong></em> 来实现。比如：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@svg</span> square</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@rect</span></span> <span class="token punctuation">{</span>
    <span class="token property">fill</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--color<span class="token punctuation">,</span> black<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">#example</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> white <span class="token function">svg</span><span class="token punctuation">(</span>square <span class="token function">param</span><span class="token punctuation">(</span>--color #00b1ff<span class="token punctuation">)</span><span class="token punctuation">)</span> repeat-x left bottom<span class="token punctuation">;</span>
  <span class="token property">background-size</span><span class="token punctuation">:</span> 100% 1px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><em><strong>声明：</strong></em> 由于有一些低端机对border-image支持度不够友好，个人建议你使用background-image的这个方案。</p></blockquote><h2 id="配置-vw-兼容-vant-组件" tabindex="-1"><a class="header-anchor" href="#配置-vw-兼容-vant-组件" aria-hidden="true">#</a> 配置 vw 兼容 vant 组件</h2>`,24),V={href:"https://www.npmjs.com/package/postcss-design-convert",target:"_blank",rel:"noopener noreferrer"},L=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .postcssrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;postcss-design-convert&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">multiple</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token literal-property property">units</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vw&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">selector</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\.van-</span><span class="token regex-delimiter">/</span></span>  <span class="token comment">// 样式选择器 van 开头</span>
            <span class="token comment">// /^\\.design-|^\\.van-/ 可以添加多个</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾" aria-hidden="true">#</a> 结尾</h2>`,2),P={id:"全部安装好后-现在可以运行一下项目-由于代码检查工具的影响-所以会出现一些警告-须要根据提示修改相关代码的格式-最后就可以正常运行啦-全文到这里就结束了-文中的内容参考大漠老师的文章。",tabindex:"-1"},T=n("a",{class:"header-anchor",href:"#全部安装好后-现在可以运行一下项目-由于代码检查工具的影响-所以会出现一些警告-须要根据提示修改相关代码的格式-最后就可以正常运行啦-全文到这里就结束了-文中的内容参考大漠老师的文章。","aria-hidden":"true"},"#",-1),B={href:"https://www.w3cplus.com/mobile/vw-layout-in-vue.html?expire=1590422647&code=nsWfZflKYwA&sign=cd9b42d6c35ee0e7a57cd62d280ee59a#paywall",target:"_blank",rel:"noopener noreferrer"};function N(W,A){const e=p("ExternalLinkIcon"),i=p("font");return o(),l("div",null,[b,h,g,n("p",null,[s("创建项目开始前，默认系统已经安装好了"),n("a",x,[s("node.js"),a(e)]),s("，"),n("a",f,[s("webpack"),a(e)]),s("，"),n("a",_,[s("vue-cli"),a(e)]),s("，在国内可能会遇到网络问题，安装淘宝源镜像和"),n("a",y,[s("mirror-config-china"),a(e)]),s("插件解决。")]),w,n("blockquote",null,[a(i,{color:"#f66"},{default:r(()=>[s("注意：")]),_:1}),s("这里只是安装插件而已，千万不要选择官方提供的配置，因为后面会提供配置文件（如果安装成功，官方会提示你选择哪个配置方案，这时候直接退出就好）")]),j,n("p",null,[s("安装好cli-plugin-eslint插件后，这里准备了js，css等相关的"),n("a",S,[s("配置文件"),a(e)]),s("，将它们放在项目根目录上，接下来还要补充安装相关依赖。")]),q,n("p",null,[s("安装好依赖后，须要对stylelint做一下配置，可以"),n("a",C,[s("参考文档"),a(e)]),s("，在根目录上创建vue.config.js文件，且在里面引入安装好的依赖，具体见下面：")]),E,n("p",null,[n("a",z,[s("postcss-px-to-viewport"),a(e)]),s("插件主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一。相关配置见文件注释。")]),D,n("p",null,[s("如果你的设计稿是 750px，那么 vw 方案兼容 vant 组件需要配置这个插件 "),n("a",V,[s("postcss-design-convert"),a(e)])]),L,n("h4",P,[T,s(" 全部安装好后，现在可以运行一下项目，由于代码检查工具的影响，所以会出现一些警告，须要根据提示修改相关代码的格式，最后就可以正常运行啦！全文到这里就结束了，文中的内容参考"),n("a",B,[s("大漠老师的文章"),a(e)]),s("。")])])}const I=c(m,[["render",N],["__file","vue-cli4创建项目.html.vue"]]);export{I as default};
