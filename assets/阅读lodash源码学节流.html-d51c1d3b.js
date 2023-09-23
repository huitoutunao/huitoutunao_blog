import{_ as p,r as e,o,c as l,a as n,b as a,e as t,d as c}from"./app-bc941942.js";const i="/images/js_subject/throttle1.gif",u="/images/js_subject/throttle2.gif",r="/images/js_subject/throttle3.gif",k={},d=c(`<h1 id="阅读-lodash-源码学节流" tabindex="-1"><a class="header-anchor" href="#阅读-lodash-源码学节流" aria-hidden="true">#</a> 阅读 lodash 源码学节流</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>上一篇文章我们已经学习了防抖的实现原理，如果还没有学习的同学可以<a href="&#39;/guide/js_subject/%E9%98%85%E8%AF%BBlodash%E6%BA%90%E7%A0%81%E5%AD%A6%E9%98%B2%E6%8A%96&#39;">戳这里学习</a>。今天我们一起来学习节流的实现原理。</p><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>如果你在这 1s 内连续触发事件，那么只执行一次。（1s 为自定义间隔时间）</p><p>这里有首次是否执行和结束后是否执行两种效果，而它们的实现方式也各有不同。</p><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><p>好，看完上面对节流的概述，我们可以简单实现如下：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge, chrome=1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>throttle<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">#wrapper</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
            <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #666<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrapper<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>throttle.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// throttle.js</span>

<span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">let</span> wrapperDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;wrapper&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">doEvent</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    wrapperDom<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> count<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">throttle</span> <span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timerId
    <span class="token keyword">let</span> lastInvokeTime <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">function</span> <span class="token function">throttled</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> lastThis <span class="token operator">=</span> <span class="token keyword">this</span>
        <span class="token keyword">const</span> lastArgs <span class="token operator">=</span> args

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timerId <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                timerId <span class="token operator">=</span> <span class="token keyword">null</span>
                <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>lastThis<span class="token punctuation">,</span> lastArgs<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> throttled
<span class="token punctuation">}</span>

wrapperDom<span class="token punctuation">.</span>onmousemove <span class="token operator">=</span> <span class="token function">throttle</span><span class="token punctuation">(</span>doEvent<span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果图如下：</p><p><img src="`+i+`" alt="throttle1"></p><p>从效果图可以看出，鼠标首次触发事件是在 1.5s 后，就是说它不是立即触发事件的，而且在鼠标移出区域 1.5s 后，即结束后执行了一次事件。</p><p>我现在想让它首次执行事件该如何修改代码呢？见下方实现：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span> <span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> lastInvokeTime <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">function</span> <span class="token function">throttled</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> lastThis <span class="token operator">=</span> <span class="token keyword">this</span>
        <span class="token keyword">const</span> lastArgs <span class="token operator">=</span> args
        <span class="token keyword">const</span> time <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token operator">-</span> lastInvokeTime <span class="token operator">&gt;</span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>lastThis<span class="token punctuation">,</span> lastArgs<span class="token punctuation">)</span>
            lastInvokeTime <span class="token operator">=</span> time
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> throttled
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果图如下：</p><p><img src="`+u+`" alt="throttle2"></p><p>从该效果图可以看出，它与上面介绍的有两点不同：1、首次执行事件；2、结束后没有执行事件。</p><h2 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h2><p>现在将上面两种效果结合，且外部可以通过传递参数控制首次或结束是否执行事件。我们定下规则：</p><ol><li>leading: false 表示禁用在节流开始前执行。</li><li>trailing: false 表示禁用在节流结束后执行。</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span> <span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timerId<span class="token punctuation">,</span>
        lastThis<span class="token punctuation">,</span>
        lastArgs<span class="token punctuation">,</span>
        result

    <span class="token keyword">let</span> lastInvokeTime <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> leading <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">let</span> trailing <span class="token operator">=</span> <span class="token boolean">true</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        leading <span class="token operator">=</span> <span class="token string">&#39;leading&#39;</span> <span class="token keyword">in</span> options <span class="token operator">?</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>leading <span class="token operator">:</span> leading
        trailing <span class="token operator">=</span> <span class="token string">&#39;trailing&#39;</span> <span class="token keyword">in</span> options <span class="token operator">?</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>trailing <span class="token operator">:</span> trailing
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">throttled</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> time <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        lastThis <span class="token operator">=</span> <span class="token keyword">this</span>
        lastArgs <span class="token operator">=</span> args

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>lastInvokeTime <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>leading<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lastInvokeTime <span class="token operator">=</span> time
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> remainingWait <span class="token operator">=</span> wait <span class="token operator">-</span> <span class="token punctuation">(</span>time <span class="token operator">-</span> lastInvokeTime<span class="token punctuation">)</span>

        <span class="token comment">// 如果没有剩余的时间了或者你改了系统时间</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>remainingWait <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> remainingWait <span class="token operator">&gt;</span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>timerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timerId<span class="token punctuation">)</span>
                timerId <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token punctuation">}</span>

            lastInvokeTime <span class="token operator">=</span> time
            result <span class="token operator">=</span> <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>lastThis<span class="token punctuation">,</span> lastArgs<span class="token punctuation">)</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                lastThis <span class="token operator">=</span> lastArgs <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timerId <span class="token operator">&amp;&amp;</span> trailing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// leading 和 trailing 的值不允许同时为 false</span>
            timerId <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>invokeFunc<span class="token punctuation">,</span> remainingWait<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> result
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">invokeFunc</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lastInvokeTime <span class="token operator">=</span> leading <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        timerId <span class="token operator">=</span> <span class="token keyword">null</span>
        result <span class="token operator">=</span> <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>lastThis<span class="token punctuation">,</span> lastArgs<span class="token punctuation">)</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lastThis <span class="token operator">=</span> lastArgs <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 取消</span>
    <span class="token keyword">function</span> <span class="token function">cancel</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lastInvokeTime <span class="token operator">=</span> <span class="token number">0</span>
        timerId <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    throttled<span class="token punctuation">.</span>cancel <span class="token operator">=</span> cancel

    <span class="token keyword">return</span> throttled
<span class="token punctuation">}</span>

wrapperDom<span class="token punctuation">.</span>onmousemove <span class="token operator">=</span> <span class="token function">throttle</span><span class="token punctuation">(</span>doEvent<span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">trailing</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// wrapperDom.onmousemove = throttle(doEvent, 1500, {</span>
<span class="token comment">//     leading: false</span>
<span class="token comment">// })</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果图如下：</p><p><img src="`+r+'" alt="throttle3"></p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>本文到这里就结束了，通过文章我们了解到什么是节流以及它的实现原理，使用节流函数可以解决项目中，懒加载要监听计算滚动条的位置，按一定时间的频率获取。</p><p>在前端面试中，节流函数还是一道高频考题，希望小伙伴们看完本文后能够顺利拿下。</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>',28),v={href:"https://github.com/lodash/lodash/blob/master/throttle.js",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/mqyqingfeng/Blog/issues/26",target:"_blank",rel:"noopener noreferrer"};function b(g,h){const s=e("ExternalLinkIcon");return o(),l("div",null,[d,n("ul",null,[n("li",null,[n("a",v,[a("Lodash 源码"),t(s)])]),n("li",null,[n("a",m,[a("冴羽的博客"),t(s)])])])])}const y=p(k,[["render",b],["__file","阅读lodash源码学节流.html.vue"]]);export{y as default};
