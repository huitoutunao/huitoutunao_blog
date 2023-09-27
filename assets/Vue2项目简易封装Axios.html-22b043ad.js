import{_ as n,o as s,c as a,d as p}from"./app-665c4bcb.js";const t={},e=p(`<h1 id="vue2-项目简易封装-axios" tabindex="-1"><a class="header-anchor" href="#vue2-项目简易封装-axios" aria-hidden="true">#</a> Vue2 项目简易封装 Axios</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>日常开发前后端分离项目时，经常会使用到 axios 这个 HTTP 库。下面对它进行简易封装做了归纳整理。</p><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2><p>目录结构，我一般是这么安排的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>|- src
|-- api
|--- index.js
|--- sendMsg.js
|-- utils
|--- index.js
|--- axios.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通用" tabindex="-1"><a class="header-anchor" href="#通用" aria-hidden="true">#</a> 通用</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// utils/axios.js</span>

<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>
<span class="token keyword">import</span> <span class="token constant">QS</span> <span class="token keyword">from</span> <span class="token string">&#39;qs&#39;</span> <span class="token comment">// 引入 qs 模块，用来序列化 post 类型的数据</span>

<span class="token comment">// 环境切换</span>
<span class="token keyword">const</span> <span class="token constant">BASE_URL</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;development&#39;</span>
    <span class="token operator">?</span> <span class="token string">&#39;https://www.kaifa_dev.com&#39;</span>
    <span class="token operator">:</span> <span class="token string">&#39;https://www.shengchan_prod.com&#39;</span>

<span class="token comment">// 设置默认的请求超时时间</span>
axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>timeout <span class="token operator">=</span> <span class="token number">15000</span>

<span class="token comment">// 创建实例</span>
<span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token constant">BASE_URL</span><span class="token punctuation">,</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/x-www-form-urlencoded&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 请求拦截器</span>
instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 每次发送请求时，需要判断是否存在 token（vuex、cookie、localStorage）</span>
    <span class="token comment">// 如果存在，那么将它添加在 header 上携带给后端，后端可以根据 token 判断用户登录状态</span>
    <span class="token comment">// 如果存储的 token 过期了，须要在响应拦截里面做处理</span>
    <span class="token keyword">const</span> myToken <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;myToken&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>Authorization <span class="token operator">=</span> token
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 引导用户登录</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> config
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 响应拦截器</span>
instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理返回结果</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 成功</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 失败</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理异常</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 封装 post 请求</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">post</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        instance<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token constant">QS</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 封装 get 请求</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            instance<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                params
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// utils/index.js</span>

<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&#39;./axios.js&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// api/sendMsg.js</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> get<span class="token punctuation">,</span> post <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../utils/index.js&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">apiSendMsg</span> <span class="token operator">=</span> <span class="token parameter">data</span> <span class="token operator">=&gt;</span> <span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;api/v1/sendMsg&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// api/index.js</span>

<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&#39;./sendMsg.js&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="特殊" tabindex="-1"><a class="header-anchor" href="#特殊" aria-hidden="true">#</a> 特殊</h2><p>例如，token 过期了自动获取最新的，让用户无感知。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// utils/axios.js</span>

<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>
<span class="token keyword">import</span> <span class="token constant">QS</span> <span class="token keyword">from</span> <span class="token string">&#39;qs&#39;</span>
<span class="token keyword">import</span> md5 <span class="token keyword">from</span> <span class="token string">&#39;./md5&#39;</span> <span class="token comment">// md5 加密，参考：https://github.com/blueimp/JavaScript-MD5</span>
<span class="token keyword">import</span> secret <span class="token keyword">from</span> <span class="token string">&#39;./crypto&#39;</span>

<span class="token keyword">const</span> <span class="token constant">BASE_URL</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;development&#39;</span>
    <span class="token operator">?</span> <span class="token string">&#39;https://www.kaifa_dev.com&#39;</span>
    <span class="token operator">:</span> <span class="token string">&#39;https://www.shengchan_prod.com&#39;</span>

<span class="token keyword">const</span> <span class="token constant">TOKEN_URL</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;development&#39;</span>
    <span class="token operator">?</span> <span class="token string">&#39;https://www.kaifa_token_dev.com&#39;</span>
    <span class="token operator">:</span> <span class="token string">&#39;https://www.shengchan_token_prod.com&#39;</span>

<span class="token comment">// 获取 token</span>
<span class="token keyword">function</span> <span class="token function">fetchToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token constant">TOKEN_URL</span><span class="token punctuation">,</span>
        <span class="token literal-property property">transformRequest</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">let</span> v <span class="token operator">=</span> data
                v <span class="token operator">=</span> <span class="token constant">QS</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
                <span class="token keyword">return</span> v
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/x-www-form-urlencoded&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">15000</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> instance
        <span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;/auth/getTokenExample&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">appName</span><span class="token operator">:</span> <span class="token string">&#39;example&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">appKey</span><span class="token operator">:</span> <span class="token string">&#39;example&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>result <span class="token operator">===</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&#39;token&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
                <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建通用 axios 实例</span>
<span class="token keyword">function</span> <span class="token function">createBaseInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建实例</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token constant">BASE_URL</span><span class="token punctuation">,</span>
        <span class="token literal-property property">transformRequest</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">let</span> v <span class="token operator">=</span> data
                v <span class="token operator">=</span> <span class="token constant">QS</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
                <span class="token keyword">return</span> v
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/x-www-form-urlencoded&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">15000</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 请求拦截器</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleRequest</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> cfg <span class="token operator">=</span> config
        <span class="token keyword">const</span> token <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;token&#39;</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;&#39;</span>

        cfg<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token punctuation">{</span>
            token<span class="token punctuation">,</span>
            <span class="token literal-property property">jsonData</span><span class="token operator">:</span> secret<span class="token punctuation">.</span><span class="token function">encrypt</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>data<span class="token punctuation">.</span>jsonData<span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">sign</span><span class="token operator">:</span> <span class="token function">md5</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">jsonData=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>config<span class="token punctuation">.</span>data<span class="token punctuation">.</span>jsonData<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&amp;example=123456</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// example 与后端约定</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> cfg
    <span class="token punctuation">}</span>

    <span class="token comment">// 响应拦截器</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleResponse</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> responseData <span class="token operator">=</span> response
        <span class="token keyword">if</span> <span class="token punctuation">(</span>responseData<span class="token punctuation">.</span>data<span class="token punctuation">.</span>result <span class="token operator">===</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>responseData<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>responseData<span class="token punctuation">.</span>data<span class="token punctuation">.</span>errorCode <span class="token operator">===</span> <span class="token number">1000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 重新获取 token，然后再请求上一个接口</span>
            <span class="token keyword">const</span> tokenRes <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">const</span> configData <span class="token operator">=</span> <span class="token constant">QS</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>responseData<span class="token punctuation">.</span>config<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
            configData<span class="token punctuation">.</span>token <span class="token operator">=</span> tokenRes
            configData<span class="token punctuation">.</span>jsonData <span class="token operator">=</span> secret<span class="token punctuation">.</span><span class="token function">decrypt</span><span class="token punctuation">(</span>configData<span class="token punctuation">.</span>jsonData<span class="token punctuation">)</span>
            responseData<span class="token punctuation">.</span>config<span class="token punctuation">.</span>data <span class="token operator">=</span> configData
            <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>responseData<span class="token punctuation">.</span>config<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>responseData<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 处理异常</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleError</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>code <span class="token operator">===</span> <span class="token string">&#39;ECONNABORTED&#39;</span> <span class="token operator">&amp;&amp;</span> error<span class="token punctuation">.</span>message<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;timeout&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;加载超时&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>handleRequest<span class="token punctuation">,</span> handleError<span class="token punctuation">)</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>handleResponse<span class="token punctuation">,</span> handleError<span class="token punctuation">)</span>

    <span class="token keyword">return</span> instance
<span class="token punctuation">}</span>

<span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token function">createBaseInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> request
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// utils/index.js</span>

<span class="token keyword">import</span> request <span class="token keyword">from</span> <span class="token string">&#39;./axios.js&#39;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// api/sendMsg.js</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/utils&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">apiSendMsg</span> <span class="token operator">=</span> <span class="token parameter">data</span> <span class="token operator">=&gt;</span> request<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;api/v1/sendMsg&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// api/index.js</span>

<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&#39;./sendMsg.js&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// crypto.js 参考：https://github.com/brix/crypto-js</span>

<span class="token keyword">import</span> CryptoJS <span class="token keyword">from</span> <span class="token string">&#39;crypto-js&#39;</span>

<span class="token keyword">const</span> key <span class="token operator">=</span> CryptoJS<span class="token punctuation">.</span>enc<span class="token punctuation">.</span>Utf8<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&#39;example&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 与后端约定</span>
<span class="token keyword">const</span> iv <span class="token operator">=</span> CryptoJS<span class="token punctuation">.</span>enc<span class="token punctuation">.</span>Utf8<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">&#39;example&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 与后端约定</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token comment">// 加密 TripleDES</span>
    <span class="token function">encrypt</span><span class="token punctuation">(</span><span class="token parameter">word</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> ciphertext <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
        ciphertext <span class="token operator">=</span> CryptoJS<span class="token punctuation">.</span>TripleDES<span class="token punctuation">.</span><span class="token function">encrypt</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            iv<span class="token punctuation">,</span>
            <span class="token literal-property property">mode</span><span class="token operator">:</span> CryptoJS<span class="token punctuation">.</span>mode<span class="token punctuation">.</span><span class="token constant">ECB</span><span class="token punctuation">,</span> <span class="token comment">// ECB 模式</span>
            <span class="token literal-property property">padding</span><span class="token operator">:</span> CryptoJS<span class="token punctuation">.</span>pad<span class="token punctuation">.</span>Pkcs7<span class="token punctuation">,</span> <span class="token comment">// padding 处理</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> ciphertext<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 解密</span>
    <span class="token function">decrypt</span><span class="token punctuation">(</span><span class="token parameter">word</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> ciphertext <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
            ciphertext <span class="token operator">=</span> CryptoJS<span class="token punctuation">.</span>TripleDES<span class="token punctuation">.</span><span class="token function">decrypt</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            iv<span class="token punctuation">,</span>
            <span class="token literal-property property">mode</span><span class="token operator">:</span> CryptoJS<span class="token punctuation">.</span>mode<span class="token punctuation">.</span><span class="token constant">ECB</span><span class="token punctuation">,</span> <span class="token comment">// ECB 模式</span>
            <span class="token literal-property property">padding</span><span class="token operator">:</span> CryptoJS<span class="token punctuation">.</span>pad<span class="token punctuation">.</span>Pkcs7<span class="token punctuation">,</span> <span class="token comment">// padding 处理</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token comment">// 解析数据后转为 UTF-8</span>
        <span class="token keyword">return</span> ciphertext<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>CryptoJS<span class="token punctuation">.</span>enc<span class="token punctuation">.</span>Utf8<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>以上对 axios 封装仅提供思路，请求前或响应后具体如何处理，还需要根据自己业务需求和后端返回的状态数据来定。</p><p>本文到这里就结束了，希望这篇文章对你有所帮助。</p>`,21),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","Vue2项目简易封装Axios.html.vue"]]);export{r as default};
