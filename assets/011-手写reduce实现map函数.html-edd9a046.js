import{_ as n,o as a,c as s,d as t}from"./app-1a9b85d0.js";const e={},p=t(`<h1 id="_011-手写-reduce-实现-map-函数" tabindex="-1"><a class="header-anchor" href="#_011-手写-reduce-实现-map-函数" aria-hidden="true">#</a> 011-手写 reduce 实现 map 函数</h1><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myMap</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> thisArg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> that <span class="token operator">=</span> thisArg <span class="token operator">||</span> <span class="token keyword">null</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> curr<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>that<span class="token punctuation">,</span> curr<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=[p];function o(u,i){return a(),s("div",null,c)}const r=n(e,[["render",o],["__file","011-手写reduce实现map函数.html.vue"]]);export{r as default};
