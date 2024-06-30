import{_ as p,r as c,o,c as i,a as n,b as a,e as t,d as l}from"./app-4ec55863.js";const u="/images/js_subject/promise4.png",r="/images/js_subject/promise1.png",k="/images/js_subject/promise2.png",d="/images/js_subject/promise3.png",v="/images/js_subject/promise5.png",m="/images/js_subject/promise6.png",b="/images/js_subject/promise7.png",h="/images/js_subject/promise8.png",g="/images/js_subject/promise9.png",e="/images/js_subject/promise10.png",f="/images/js_subject/promise11.png",w="/images/js_subject/promise12.png",y={},j=l(`<h1 id="手撕-promise" tabindex="-1"><a class="header-anchor" href="#手撕-promise" aria-hidden="true">#</a> 手撕 Promise</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>不论是前端日常开发，还是前端面试题，总是会遇到 Promise 相关的问题。因此今天就来一探究竟，揭开 Promise 的神秘面纱。</p><h2 id="基本结构" tabindex="-1"><a class="header-anchor" href="#基本结构" aria-hidden="true">#</a> 基本结构</h2><ul><li>构造函数里传入一个函数，它有两个形参 <code>resolve</code>、<code>reject</code></li><li><code>resolve</code> 函数成功时执行</li><li><code>reject</code> 函数失败时执行</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 同步调用「执行器函数」</span>
    <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三种状态实现" tabindex="-1"><a class="header-anchor" href="#三种状态实现" aria-hidden="true">#</a> 三种状态实现</h2><blockquote><p>一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。</p></blockquote><ul><li>进行中 <code>pending</code></li><li>已成功 <code>fulfilled</code></li><li>已失败 <code>rejected</code></li><li>状态只能改变一次</li></ul><p>在开始之前，我们先看 <code>Chrome</code> 内置的 <code>Promise</code> 输出结果：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// resolve(&#39;ok&#39;)</span>
  <span class="token comment">// reject(&#39;error&#39;)</span>
  <span class="token comment">// throw &#39;Error&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>首先 <code>Promise</code> 传入的函数不执行任何操作：</li></ul><p><img src="`+u+'" alt="图片4"></p><ul><li><code>resolve(&#39;ok&#39;)</code> 结果如下：</li></ul><p><img src="'+r+'" alt="图片1"></p><ul><li><code>reject(&#39;error&#39;)</code> 结果如下：</li></ul><p><img src="'+k+'" alt="图片2"></p><ul><li><code>throw &#39;Error&#39;</code> 结果如下：</li></ul><p><img src="'+d+`" alt="图片3"></p><ul><li>状态只能改变一次，运行如下代码查看效果：</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
  <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// throw &#39;Error&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+v+`" alt="图片5"></p><p>通过上面打印的结果，<code>PromiseState</code> 指当前状态，<code>PromiseResult</code> 指结果值。现在我们模仿上面的运行结果实现如下：</p><h3 id="pending" tabindex="-1"><a class="header-anchor" href="#pending" aria-hidden="true">#</a> pending</h3><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 同步调用「执行器函数」</span>
    <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// resolve(&#39;ok&#39;)</span>
  <span class="token comment">// reject(&#39;error&#39;)</span>
  <span class="token comment">// throw &#39;Error&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="fulfilled" tabindex="-1"><a class="header-anchor" href="#fulfilled" aria-hidden="true">#</a> fulfilled</h3><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 同步调用「执行器函数」</span>
    <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="rejected" tabindex="-1"><a class="header-anchor" href="#rejected" aria-hidden="true">#</a> rejected</h3><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="状态只能改变一次" tabindex="-1"><a class="header-anchor" href="#状态只能改变一次" aria-hidden="true">#</a> 状态只能改变一次</h3><p>目前我们的 Promise 运行如下代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
  <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// throw &#39;Error&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打印结果如下：</p><p><img src="`+m+`" alt="图片6"></p><p>输出的结果明显有问题，正确的状态应是 <code>fulfilled</code>，因为状态只能是 <code>pending</code> 变成 <code>fulfilled</code>，或者 <code>pending</code> 变成 <code>rejected</code>，所以通过判断状态是否为 <code>pending</code> 即可修复该问题。</p><p>优化代码如下：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="promise-prototype-then" tabindex="-1"><a class="header-anchor" href="#promise-prototype-then" aria-hidden="true">#</a> <code>Promise.prototype.then()</code></h2><blockquote><p>它的作用是为 Promise 实例添加状态改变时的回调函数。then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数，它们都是可选的。</p></blockquote><p>在开始之前，我们先看 <code>Chrome</code> 内置的 <code>Promise</code> 输出结果：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// reject(&#39;error&#39;)</span>
  <span class="token comment">// throw &#39;Error&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token comment">// 输出：ok</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面运行效果，需要在 <code>Promise</code> 类添加 <code>then</code> 方法：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
      <span class="token function">handleResolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
      <span class="token function">handleReject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="异步实现" tabindex="-1"><a class="header-anchor" href="#异步实现" aria-hidden="true">#</a> 异步实现</h2><p>按照惯例，先看 <code>Chrome</code> 内置 <code>Promise</code> 的表现：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token comment">// reject(&#39;error&#39;)</span>
  <span class="token comment">// throw &#39;Error&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token comment">// =&gt; 1s 后输出 ok</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 <code>resolve</code> 或 <code>reject</code> 在 <code>setTimeout</code> 内执行时，<code>then</code> 方法的 <code>PromiseState</code> 还是 <code>pending</code> 状态，所以我们就需要在 <code>then</code> 方法里把成功或失败的回调函数存到公用对象，当 <code>resolve</code> 或 <code>reject</code> 执行改变状态时，就调用它们。</p><p>优化代码如下：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态成功时执行回调函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span>handleResolve<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">handleResolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态失败时执行回调函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span>handleReject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">handleReject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
      <span class="token function">handleResolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
      <span class="token function">handleReject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 等待状态时保存 handleResolve 和 handleReject 函数，后面改变状态时调用</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">{</span>
        handleResolve<span class="token punctuation">,</span>
        handleReject<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>再看 <code>Chrome</code> 内置 <code>Promise</code> 执行多个回调的表现：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// reject(&#39;error&#39;)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token comment">// reject(&#39;error&#39;)</span>
  <span class="token comment">// throw &#39;Error&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token comment">// 1s 后输出 ok</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token comment">// 1s 后弹出 ok</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要借助 <code>callbacks</code> 数组保存回调函数，因此改造代码如下：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态成功时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleResolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态失败时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleReject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
      <span class="token function">handleResolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
      <span class="token function">handleReject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 等待状态时保存 handleResolve 和 handleReject 函数，后面改变状态时调用</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        handleResolve<span class="token punctuation">,</span>
        handleReject<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="同步执行-then-的返回结果" tabindex="-1"><a class="header-anchor" href="#同步执行-then-的返回结果" aria-hidden="true">#</a> 同步执行 <code>then</code> 的返回结果</h2><p>首先看 <code>Chrome</code> 内置 <code>Promise</code> 的运行结果：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> res <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token comment">// 因为这里没有 return 返回值，所以结果是 undefined</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>res</code> 的结果如下图：</p><p><img src="`+b+`" alt="图片7"></p><ul><li>结果是新的 <code>Promise</code> 对象</li><li>结果值 <code>(PromiseResult)</code> 是 <code>then</code> 方法中 <code>handleResolve</code> 回调函数的返回值</li><li>结果状态 <code>(PromiseState)</code> 是 <code>fulfilled</code></li></ul><p>实现代码如下：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态成功时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleResolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态失败时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleReject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 返回新的 Promise 对象</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
          <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">handleResolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果是 Promise 类型对象</span>
            result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 结果状态改为成功</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
        <span class="token function">handleReject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 等待状态时保存 handleResolve 和 handleReject 函数，后面改变状态时调用</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          handleResolve<span class="token punctuation">,</span>
          handleReject<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 示例</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// reject(&#39;error&#39;)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> res <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token comment">// return &#39;ok&#39;</span>
  <span class="token comment">// return new Promise((resolve, reject) =&gt; {</span>
  <span class="token comment">//   // resolve(&#39;success&#39;)</span>
  <span class="token comment">//   // reject(&#39;error&#39;)</span>
  <span class="token comment">// })</span>
  <span class="token keyword">throw</span> <span class="token string">&#39;fail&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="异步状态-then-方法的返回结果" tabindex="-1"><a class="header-anchor" href="#异步状态-then-方法的返回结果" aria-hidden="true">#</a> 异步状态 <code>then</code> 方法的返回结果</h2><p>首先看 <code>Chrome</code> 内置 <code>Promise</code> 的运行结果：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> res <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token comment">// 因为这里没有 return 返回值，所以结果是 undefined</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>res</code> 的结果如下图：</p><p><img src="`+h+'" alt="图片8"></p><p>对比目前手写 <code>Promise</code> 的 <code>res</code> 输出结果如下图：</p><p><img src="'+g+`" alt="图片9"></p><p>观察发现 <code>PromiseState</code> 状态并没有变为 <code>fulfilled</code>，说明 <code>then</code> 方法中 <code>pending</code> 逻辑需要优化。</p><p>改造代码如下：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态成功时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleResolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态失败时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleReject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 返回新的 Promise 对象</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
          <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">handleResolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果是 Promise 类型对象</span>
            result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 结果状态改为成功</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
        <span class="token function">handleReject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 等待状态时保存 handleResolve 和 handleReject 函数，后面改变状态时调用</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token function-variable function">handleResolve</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">handleResolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                  <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                  <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
              <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 返回结果不是 Promise 对象，状态变为 fulfilled</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">handleReject</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">handleReject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                  <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                  <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
              <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 返回结果不是 Promise 对象，状态变为 fulfilled</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 示例</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// reject(&#39;err&#39;)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> res <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// console.log(value)</span>
  <span class="token keyword">return</span> <span class="token string">&#39;success&#39;</span>
  <span class="token comment">// return new Promise((resolve, reject) =&gt; {</span>
  <span class="token comment">//   resolve(&#39;hello promise&#39;)</span>
  <span class="token comment">// })</span>
  <span class="token comment">// throw &#39;fail&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token comment">// 返回结果是 undefined</span>
  <span class="token comment">// return &#39;Err&#39;</span>
  <span class="token comment">// return new Promise((resolve, reject) =&gt; {</span>
  <span class="token comment">//   reject(&#39;hello promise&#39;)</span>
  <span class="token comment">// })</span>
  <span class="token comment">// throw &#39;fail&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="then-方法完善" tabindex="-1"><a class="header-anchor" href="#then-方法完善" aria-hidden="true">#</a> then 方法完善</h2><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态成功时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleResolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态失败时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleReject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 返回新的 Promise 对象</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 封装处理结果回调函数</span>
      <span class="token keyword">const</span> <span class="token function-variable function">callBackResult</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
          <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果是 Promise 类型对象</span>
            result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 结果状态改为成功</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleResolve<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 等待状态时保存 handleResolve 和 handleReject 函数，后面改变状态时调用</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token function-variable function">handleResolve</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleResolve<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">handleReject</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><div class="highlight-line"> </div><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><div class="highlight-line"> </div><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="catch-方法添加" tabindex="-1"><a class="header-anchor" href="#catch-方法添加" aria-hidden="true">#</a> catch 方法添加</h2><p>首先看 <code>Chrome</code> 内置 <code>Promise</code> 的运行结果：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;err&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果如下图：</p><p><img src="`+e+'" alt="图片10"></p><p>对比目前手写 <code>Promise</code> 输出结果如下图：</p><p><img src="'+f+`" alt="图片11"></p><p>观察发现，目前手写 <code>Promise</code> 缺少 <code>catch</code> 方法。</p><p>改造代码如下：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态成功时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleResolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态失败时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleReject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 返回新的 Promise 对象</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 封装处理结果回调函数</span>
      <span class="token keyword">const</span> <span class="token function-variable function">callBackResult</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
          <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果是 Promise 类型对象</span>
            result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 结果状态改为成功</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleResolve<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 等待状态时保存 handleResolve 和 handleReject 函数，后面改变状态时调用</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token function-variable function">handleResolve</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleResolve<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">handleReject</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 catch 方法</span>
  <span class="token keyword">catch</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> handleReject<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="异常穿透" tabindex="-1"><a class="header-anchor" href="#异常穿透" aria-hidden="true">#</a> 异常穿透</h3><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;err&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Chrome 内置的 <code>Promise</code> 输出结果如下：</p><p><img src="`+e+'" alt="图片10"></p><p>对比目前手写 <code>Promise</code> 输出结果如下图：</p><p><img src="'+w+`" alt="图片12"></p><p>改造代码如下：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态成功时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleResolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态失败时执行回调函数</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">handleReject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断回调函数参数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> handleReject <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">handleReject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> reason
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> handleResolve <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">handleResolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> value
    <span class="token punctuation">}</span>

    <span class="token comment">// 返回新的 Promise 对象</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 封装处理结果回调函数</span>
      <span class="token keyword">const</span> <span class="token function-variable function">callBackResult</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
          <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果是 Promise 类型对象</span>
            result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 结果状态改为成功</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleResolve<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 等待状态时保存 handleResolve 和 handleReject 函数，后面改变状态时调用</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token function-variable function">handleResolve</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleResolve<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">handleReject</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 catch 方法</span>
  <span class="token keyword">catch</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> handleReject<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="resolve-方法" tabindex="-1"><a class="header-anchor" href="#resolve-方法" aria-hidden="true">#</a> resolve 方法</h2><p>直接上代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>

  <span class="token comment">// 添加 resolve 方法</span>
  <span class="token keyword">static</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reject-方法" tabindex="-1"><a class="header-anchor" href="#reject-方法" aria-hidden="true">#</a> reject 方法</h2><p>直接上代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>

  <span class="token comment">// 添加 reject 方法</span>
  <span class="token keyword">static</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="all-方法" tabindex="-1"><a class="header-anchor" href="#all-方法" aria-hidden="true">#</a> all 方法</h2><p>直接上代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>

  <span class="token comment">// 添加 all 方法</span>
  <span class="token keyword">static</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token parameter">promises</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span>
      <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> promises<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        promises<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token comment">// 得知对象的状态是成功</span>
          <span class="token comment">// 每个 promise 对象都成功</span>
          count <span class="token operator">+=</span> <span class="token number">1</span>

          <span class="token comment">// 将当前 promise 对象成功的结果 存入到数组中</span>
          arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> v

          <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">===</span> promises<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="race-方法" tabindex="-1"><a class="header-anchor" href="#race-方法" aria-hidden="true">#</a> race 方法</h2><p>直接上代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略代码</span>

  <span class="token comment">// 添加 race 方法</span>
  <span class="token keyword">static</span> <span class="token function">race</span><span class="token punctuation">(</span><span class="token parameter">promises</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> promises<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        promises<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="then-方法回调的异步执行" tabindex="-1"><a class="header-anchor" href="#then-方法回调的异步执行" aria-hidden="true">#</a> then 方法回调的异步执行</h2><p>完整代码如下：</p><details class="custom-container details"><summary>点击查看代码</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造器</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 结果值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">// resolve 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 已成功</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态成功时执行回调函数</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          item<span class="token punctuation">.</span><span class="token function">handleResolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// reject 函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断状态是否为 pending</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">!==</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 修改对象状态</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 已失败</span>

      <span class="token comment">// 设置对象结果值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult <span class="token operator">=</span> data

      <span class="token comment">// 状态失败时执行回调函数</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          item<span class="token punctuation">.</span><span class="token function">handleReject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 捕获 throw</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步调用「执行器函数」</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 修改 promise 对象状态为失败</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 then 方法</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">handleResolve<span class="token punctuation">,</span> handleReject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断回调函数参数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> handleReject <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">handleReject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> reason
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> handleResolve <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">handleResolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> value
    <span class="token punctuation">}</span>

    <span class="token comment">// 返回新的 Promise 对象</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 封装处理结果回调函数</span>
      <span class="token keyword">const</span> <span class="token function-variable function">callBackResult</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// PromiseResult 传递给回调函数的结果值</span>
          <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseResult<span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果是 Promise 类型对象</span>
            result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 结果状态改为成功</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 根据 PromiseState 调用对应回调函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleResolve<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 等待状态时保存 handleResolve 和 handleReject 函数，后面改变状态时调用</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PromiseState <span class="token operator">===</span> <span class="token string">&#39;pending&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token function-variable function">handleResolve</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleResolve<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function-variable function">handleReject</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">callBackResult</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 catch 方法</span>
  <span class="token keyword">catch</span><span class="token punctuation">(</span>handleReject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> handleReject<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 resolve 方法</span>
  <span class="token keyword">static</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 reject 方法</span>
  <span class="token keyword">static</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 all 方法</span>
  <span class="token keyword">static</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token parameter">promises</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span>
      <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> promises<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        promises<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token comment">// 得知对象的状态是成功</span>
          <span class="token comment">// 每个 promise 对象都成功</span>
          count <span class="token operator">+=</span> <span class="token number">1</span>

          <span class="token comment">// 将当前 promise 对象成功的结果 存入到数组中</span>
          arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> v

          <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">===</span> promises<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加 race 方法</span>
  <span class="token keyword">static</span> <span class="token function">race</span><span class="token punctuation">(</span><span class="token parameter">promises</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> promises<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        promises<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>今天又进步了一点。完。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,110),P={href:"https://es6.ruanyifeng.com/#docs/promise",target:"_blank",rel:"noopener noreferrer"},R={href:"https://juejin.cn/post/6845166891061739528",target:"_blank",rel:"noopener noreferrer"},S={href:"https://promisesaplus.com/",target:"_blank",rel:"noopener noreferrer"};function x(_,E){const s=c("ExternalLinkIcon");return o(),i("div",null,[j,n("ul",null,[n("li",null,[n("a",P,[a("ES6 中文文档"),t(s)])]),n("li",null,[n("a",R,[a("手撕 Promise"),t(s)])]),n("li",null,[n("a",S,[a("Promises/A+"),t(s)])])])])}const T=p(y,[["render",x],["__file","手撕Promise.html.vue"]]);export{T as default};
