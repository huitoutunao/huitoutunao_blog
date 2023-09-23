import{_ as n,o as s,c as a,d as e}from"./app-01af8480.js";const t={},p=e(`<h1 id="_005-写一个去除制表符和换行符的方法" tabindex="-1"><a class="header-anchor" href="#_005-写一个去除制表符和换行符的方法" aria-hidden="true">#</a> 005-写一个去除制表符和换行符的方法</h1><p>知识点：</p><ul><li>正则匹配</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * \\f  匹配换页字符。
 * \\n  匹配换行字符。
 * \\r  匹配回车符字符。
 * \\t  匹配制表字符。
 * \\v  匹配垂直制表符。
 * <span class="token keyword">@param</span> <span class="token parameter">str</span> - 字符串
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span> <span class="token operator">|</span> string<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">remoEmpty</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\t\\n\\v\\r\\f]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">remoEmpty</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">|


|</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[p];function i(l,o){return s(),a("div",null,c)}const u=n(t,[["render",i],["__file","005-写一个去除制表符和换行符的方法.html.vue"]]);export{u as default};
