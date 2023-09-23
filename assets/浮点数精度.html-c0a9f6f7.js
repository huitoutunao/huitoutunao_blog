import{_ as e,r as t,o as p,c as o,a,b as n,e as c,d as r}from"./app-1a9b85d0.js";const i={},l=r(`<h1 id="浮点数精度" tabindex="-1"><a class="header-anchor" href="#浮点数精度" aria-hidden="true">#</a> 浮点数精度</h1><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span> <span class="token operator">===</span> <span class="token number">0.3</span> <span class="token comment">// false</span>

<span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span> <span class="token operator">-</span> <span class="token number">0.3</span> <span class="token comment">// 5.551115123125783e-17 =&gt; e 表示法的实际意义是 5.551115123125783 * 10^-7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h2><p>关于浮点数值计算会产生舍入误差问题，有一点需要明确：这是使用基于 IEEE754 数值的浮点计算通病，ECMAScript 并非独此一家；其他使用相同数值格式的语言也存在这个问题。</p><p>所谓 IEEE754 标准，全称 IEEE 二进制浮点数算术标准，这个标准定义了表示浮点数的格式等内容。</p><p>在 IEEE754 中，规定了四种表示浮点数值的方式：单精确度（32位）、双精确度（64位）、延伸单精确度、与延伸双精确度。像 ECMAScript 采用的就是双精确度，也就是说，会用 64 位字节来储存一个浮点数。</p><h2 id="解决" tabindex="-1"><a class="header-anchor" href="#解决" aria-hidden="true">#</a> 解决</h2><p>如果我们要判断 0.1 + 0.2 和 0.3 之间是否相等，应该怎么解决呢？</p><blockquote><p>方案：设置一个误差范围，通常称为“机器精度”，对 JavaScript 的数字来说，这个值通常是 2^-52（2.220446049250313e-16）</p></blockquote><p>ES6 为我们提供了 <code>Number.EPSILON</code> 这个方法。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Number<span class="token punctuation">.</span><span class="token constant">EPSILON</span> <span class="token operator">===</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">52</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以为 ES6 之前写兼容版本：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Number<span class="token punctuation">.</span><span class="token constant">EPSILON</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Number<span class="token punctuation">.</span><span class="token constant">EPSILON</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">52</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后判断两个数值是否相等的写法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">withinErrorMargin</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>a <span class="token operator">-</span> b<span class="token punctuation">)</span> <span class="token operator">&lt;</span> Number<span class="token punctuation">.</span><span class="token constant">EPSILON</span>
<span class="token punctuation">}</span>

<span class="token function">withinErrorMargin</span><span class="token punctuation">(</span><span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2>`,17),u={href:"https://github.com/mqyqingfeng/Blog/issues/155",target:"_blank",rel:"noopener noreferrer"};function d(k,m){const s=t("ExternalLinkIcon");return p(),o("div",null,[l,a("p",null,[n("这篇总结主要参考《JavaScript高级程序设计——Number类型》和"),a("a",u,[n("冴羽的博客"),c(s)]),n("。")])])}const b=e(i,[["render",d],["__file","浮点数精度.html.vue"]]);export{b as default};
