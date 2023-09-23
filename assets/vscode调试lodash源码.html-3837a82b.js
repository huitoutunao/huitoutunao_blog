import{_ as t,r as p,o as l,c as i,a as n,b as s,e,d as o}from"./app-1a9b85d0.js";const c="/images/essays/1.png",r="/images/essays/2.png",d="/images/essays/3.png",u={},v=n("h1",{id:"vs-code-调试-lodash-源码",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vs-code-调试-lodash-源码","aria-hidden":"true"},"#"),s(" VS Code 调试 lodash 源码")],-1),m=n("h2",{id:"前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),s(" 前言")],-1),k={href:"https://node.green/",target:"_blank",rel:"noopener noreferrer"},b={href:"http://www.ruanyifeng.com/blog/2015/06/es-checker.html",target:"_blank",rel:"noopener noreferrer"},h=o(`<p>下面是我在本地使用 ES-Checker 的结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 项目目录安装 es-checker</span>
<span class="token function">npm</span> <span class="token function">install</span> --save-dev es-checker

<span class="token comment"># 执行检测</span>
npx es-checker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+c+'" alt="图1"></p><p>从结果图可以看到，我这里是不支持 ES6 的 import/export 模块化机制语法。</p><p>然而 lodash 源码文件涉及到模块化机制语法，为了能够在 Node 环境顺利运行，我们需要将它转换成 Node.js 支持的语法，解决方案如下：</p>',5),g=n("li",null,"Babel。",-1),q=n("code",null,".mjs",-1),_={href:"http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html",target:"_blank",rel:"noopener noreferrer"},f=o(`<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>本文使用第一种方案处理。第二种方案我没有尝试过，有兴趣的同学可以试一试。</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><ol><li>克隆代码且安装预设依赖。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/lodash/lodash.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>安装调试环境所需依赖。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> @babel/core @babel/node @babel/preset-env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在项目根目录创建 .babelrc 文件，做如下配置，其中 <code>&quot;debug&quot;</code> 对应 launch.json 中的 <code>&quot;BABEL_ENV&quot;: &quot;debug&quot;</code>。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// .babelrc</span>

<span class="token punctuation">{</span>
  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;env&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;debug&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;sourceMaps&quot;</span><span class="token operator">:</span> <span class="token string">&quot;inline&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;retainLines&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),j={start:"3"},y={href:"https://go.microsoft.com/fwlink/?linkid=830387",target:"_blank",rel:"noopener noreferrer"},x=o(`<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// launch.json</span>

<span class="token punctuation">{</span>
    <span class="token comment">// 使用 IntelliSense 了解相关属性。</span>
    <span class="token comment">// 悬停以查看现有属性的描述。</span>
    <span class="token comment">// 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.2.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;configurations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;launch&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Launch Node&quot;</span><span class="token punctuation">,</span>

            <span class="token comment">// 调试时忽略文件 node_module</span>
            <span class="token property">&quot;skipFiles&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token string">&quot;\${workspaceFolder}/node_modules/**/*.js&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;&lt;node_internals&gt;/**/*.js&quot;</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>

            <span class="token comment">// 程序的绝对路径，启动调试的入口文件 app.js</span>
            <span class="token property">&quot;program&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${workspaceFolder}\\\\app.js&quot;</span><span class="token punctuation">,</span>

            <span class="token comment">// 使用 babel-node 作为调试环境</span>
            <span class="token property">&quot;runtimeExecutable&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${workspaceRoot}\\\\node_modules\\\\.bin\\\\babel-node&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;sourceMaps&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">&quot;env&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;BABEL_ENV&quot;</span><span class="token operator">:</span> <span class="token string">&quot;debug&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>断点调试</li></ol><p>配置完成后，我们在项目根目录创建 app.js 文件，引入 add.js 模块，然后在 add.js 的代码中打个断点，最后运行调试。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// app.js</span>

<span class="token keyword">import</span> add <span class="token keyword">from</span> <span class="token string">&#39;./add&#39;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>断点和调试效果图如下：</p><p><img src="`+r+'" alt="图2"><img src="'+d+'" alt="图3"></p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>通过 VS Code 调试源码，可以高效学习优秀前端库，使你理清楚它的实现逻辑和代码细节。好了，文章到这里就结束了，希望本文能够帮助到你。</p>',8);function w(E,N){const a=p("ExternalLinkIcon");return l(),i("div",null,[v,m,n("p",null,[s("最近因为在学习 lodash 源码，所以想到了使用 VS Code 的 Node 环境进行调试。虽然 Node.js 几乎支持所有 ES6 语法，但是 ES6 的模块化机制一直未支持。支持的语法目录可以"),n("a",k,[s("查看网站"),e(a)]),s("，或者使用 "),n("a",b,[s("ES-Checker"),e(a)]),s(" 的侦测库。")]),h,n("ol",null,[g,n("li",null,[s("在 package.json 文件添加如下语句，或者使用 "),q,s(" 的文件后缀。具体"),n("a",_,[s("参考网站"),e(a)]),s("。")])]),f,n("ol",j,[n("li",null,[s("配置 launch.json 文件。参考"),n("a",y,[s("官方文档"),e(a)])])]),x])}const V=t(u,[["render",w],["__file","vscode调试lodash源码.html.vue"]]);export{V as default};
