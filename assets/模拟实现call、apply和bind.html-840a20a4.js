import{_ as t,r as o,o as c,c as l,a as n,b as s,e,d as a}from"./app-4ec55863.js";const i={},u=a(`<h1 id="模拟实现-call、apply-和-bind" tabindex="-1"><a class="header-anchor" href="#模拟实现-call、apply-和-bind" aria-hidden="true">#</a> 模拟实现 call、apply 和 bind</h1><h2 id="call" tabindex="-1"><a class="header-anchor" href="#call" aria-hidden="true">#</a> call</h2><h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3><p>一句话介绍 call：</p><blockquote><p>call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。</p></blockquote><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// demo1</span>
<span class="token keyword">var</span> student <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;xiaoming&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">people</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">people</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span> <span class="token comment">// xiaoming</span>

<span class="token comment">// demo2</span>
<span class="token keyword">var</span> student2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;xiaoming2&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">people2</span> <span class="token punctuation">(</span><span class="token parameter">age<span class="token punctuation">,</span> job</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">people2</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>student2<span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">&#39;student&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// xiaoming2</span>
<span class="token comment">// 18</span>
<span class="token comment">// student</span>

<span class="token comment">// demo3</span>
<span class="token keyword">var</span> student3 <span class="token operator">=</span> <span class="token string">&#39;xiaoming3&#39;</span>

<span class="token keyword">function</span> <span class="token function">people3</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>student3<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">people3</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// xiaoming3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：</p>`,8),r=n("li",null,[s("在 demo1 中，people 函数执行时，"),n("code",null,"call()"),s(" 方法改变了 "),n("code",null,"this"),s(" 的指向，指向到了 student。")],-1),k=n("li",null,"在 demo2 中，people2 函数执行时，多传入了 2 个参数。",-1),d=n("code",null,"this",-1),v={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call#%E4%BD%BF%E7%94%A8_call_%E6%96%B9%E6%B3%95%E8%B0%83%E7%94%A8%E5%87%BD%E6%95%B0%E5%B9%B6%E4%B8%94%E4%B8%8D%E6%8C%87%E5%AE%9A%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%8F%82%E6%95%B0%EF%BC%88argument%EF%BC%89",target:"_blank",rel:"noopener noreferrer"},m=a(`<h3 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myCall</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">$<span class="token keyword">this</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> context <span class="token operator">=</span> $<span class="token keyword">this</span> <span class="token operator">||</span> window <span class="token comment">// 判断是否传递第一个参数</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span> <span class="token comment">// 这里 this 指向调用 myCall() 的对象</span>

    <span class="token comment">// 遍历除第一位后面的参数</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> res <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token comment">// 返回 call 绑定函数的值</span>

    <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn <span class="token comment">// fn 的对象属性，在这里是辅助作用，最后得删掉</span>
    <span class="token keyword">return</span> res
<span class="token punctuation">}</span>

<span class="token keyword">var</span> v <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">v</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>v<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> name<span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> age<span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>v
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

bar<span class="token punctuation">.</span><span class="token function">myCall</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span><span class="token function">myCall</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">&#39;kevin&#39;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 1</span>
<span class="token comment">// Object {</span>
<span class="token comment">//    name: &#39;kevin&#39;,</span>
<span class="token comment">//    age: 18,</span>
<span class="token comment">//    value: 1,</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="apply" tabindex="-1"><a class="header-anchor" href="#apply" aria-hidden="true">#</a> apply</h2><h3 id="介绍-1" tabindex="-1"><a class="header-anchor" href="#介绍-1" aria-hidden="true">#</a> 介绍</h3><p>一句话介绍 apply：</p><blockquote><p>apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。</p></blockquote><p>因此除了传递参数的形式不同之外，其他实现和 call 类似。</p><h3 id="实现-1" tabindex="-1"><a class="header-anchor" href="#实现-1" aria-hidden="true">#</a> 实现</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myApply</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">$<span class="token keyword">this</span><span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> context <span class="token operator">=</span> $<span class="token keyword">this</span> <span class="token operator">||</span> window
    <span class="token keyword">var</span> res
    context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        res <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        res <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>arr<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn
    <span class="token keyword">return</span> res
<span class="token punctuation">}</span>

<span class="token keyword">var</span> v <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">v</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>v<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> name<span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> age<span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>v
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

bar<span class="token punctuation">.</span><span class="token function">myApply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span><span class="token function">myApply</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;kevin&#39;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 1</span>
<span class="token comment">// Object {</span>
<span class="token comment">//    name: &#39;kevin&#39;,</span>
<span class="token comment">//    age: 18,</span>
<span class="token comment">//    value: 1,</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bind" tabindex="-1"><a class="header-anchor" href="#bind" aria-hidden="true">#</a> bind</h2><h3 id="介绍-2" tabindex="-1"><a class="header-anchor" href="#介绍-2" aria-hidden="true">#</a> 介绍</h3><p>一句话介绍 bind：</p><blockquote><p><code>bind()</code> 方法创建一个新的函数，在 <code>bind()</code> 被调用时，这个新函数的 this 被指定为 <code>bind()</code> 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。</p></blockquote><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// demo1</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">v</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>v<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">&#39;daisy&#39;</span><span class="token punctuation">)</span>
<span class="token function">bindFoo</span><span class="token punctuation">(</span><span class="token string">&#39;20&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 1</span>
<span class="token comment">// daisy</span>
<span class="token comment">// 20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：</p>`,16),b=n("li",null,"返回一个函数。",-1),y=n("li",null,"可以传入参数，在使用 bind 绑定时传入一个参数(name)，在后面执行返回函数时再传入另一个参数(age)。",-1),h=n("li",null,[s("调用 "),n("code",null,"bind()"),s(" 方法是一个函数。")],-1),f={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#%E4%BD%9C%E4%B8%BA%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%BD%BF%E7%94%A8%E7%9A%84%E7%BB%91%E5%AE%9A%E5%87%BD%E6%95%B0",target:"_blank",rel:"noopener noreferrer"},g=a(`<h3 id="实现-2" tabindex="-1"><a class="header-anchor" href="#实现-2" aria-hidden="true">#</a> 实现</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myBind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">this</span> <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;调用 bind 的不是函数&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> $<span class="token keyword">this</span> <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> <span class="token function-variable function">fnBind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> fnBindArgs <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
        <span class="token keyword">var</span> _this <span class="token operator">=</span> <span class="token keyword">null</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">fnBind</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            _this <span class="token operator">=</span> <span class="token keyword">this</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            _this <span class="token operator">=</span> context
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> $<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>_this<span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>fnBindArgs<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    fnBind<span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
    <span class="token keyword">return</span> fnBind
<span class="token punctuation">}</span>

<span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token number">2</span>
<span class="token keyword">var</span> fooBind <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">barBind</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>habit <span class="token operator">=</span> <span class="token string">&#39;shopping&#39;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;barBind&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;barBind&#39;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;barBind&#39;</span><span class="token punctuation">,</span> age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

barBind<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>friend <span class="token operator">=</span> <span class="token string">&#39;xiaohong&#39;</span>

<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> barBind<span class="token punctuation">.</span><span class="token function">myBind</span><span class="token punctuation">(</span>fooBind<span class="token punctuation">,</span> <span class="token string">&#39;xiaoming&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">bindFoo</span><span class="token punctuation">(</span><span class="token string">&#39;20&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// barBind undefined</span>
<span class="token comment">// barBind xiaoming</span>
<span class="token comment">// barBind 20</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>habit<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>friend<span class="token punctuation">)</span>
<span class="token comment">// shopping</span>
<span class="token comment">// xiaohong</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function w(_,B){const p=o("ExternalLinkIcon");return c(),l("div",null,[u,n("ol",null,[r,k,n("li",null,[s("如果没有传递第一个参数，那么 "),d,s(" 值指向全局对象。"),n("a",v,[s("见文档"),e(p)])])]),m,n("ol",null,[b,y,h,n("li",null,[s("作为构造函数的绑定函数。"),n("a",f,[s("见文档"),e(p)])])]),g])}const E=t(i,[["render",w],["__file","模拟实现call、apply和bind.html.vue"]]);export{E as default};
