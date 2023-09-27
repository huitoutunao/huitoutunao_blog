import{_ as n,o as s,c as a,d as p}from"./app-8d691574.js";const t="/images/js_advanced/this_1.png",e="/images/js_advanced/this_2.png",o={},c=p(`<h1 id="关于-this" tabindex="-1"><a class="header-anchor" href="#关于-this" aria-hidden="true">#</a> 关于 this</h1><h2 id="this-是什么" tabindex="-1"><a class="header-anchor" href="#this-是什么" aria-hidden="true">#</a> this 是什么</h2><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;foo：&#39;</span> <span class="token operator">+</span> num<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
<span class="token punctuation">}</span>
foo<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">foo</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// foo: 6</span>
<span class="token comment">// foo: 7</span>
<span class="token comment">// foo: 8</span>
<span class="token comment">// foo: 9</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>count<span class="token punctuation">)</span> <span class="token comment">// 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：从 foo 函数输出的 4 条记录来看，foo 函数的确被执行了 4 次，但是 foo.count 输出的结果居然是 0。在执行 foo.count = 0 时，已经向函数对象 foo 添加了属性 count，但是函数内部代码 this.count 中的 this 并不指向函数对象，所以 foo.count 才会输出 0。</p><p>结论：this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。</p><p>扩展：当一个函数被调用时，会创建一个活动记录（执行上下文）。这个记录会包含函数在哪里调用（调用栈）、函数的调用方式、传入的参数信息。this 就是这个记录的一个属性，会在函数执行的过程中用到。</p><p>既然 this 的指向和函数的调用位置有关，那么在开发的时候如何判断呢？我们使用日常开发的调试工具 Chrome 浏览器来查看下。</p><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">baz</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;baz&#39;</span><span class="token punctuation">)</span>
    <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span>
    <span class="token function">box</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">box</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">debugger</span><span class="token punctuation">;</span> <span class="token comment">// 断点</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;box&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看浏览器截图如下：</p><p><img src="`+t+'" alt="关于this_1"><img src="'+e+`" alt="关于this_2"></p><p>从调用栈列表中我们分析出 box 函数的调用位置是在 bar 这里。 <strong>分析调用栈（就是为了到达当前执行位置所调用的所有函数）。真正的调用位置就在当前正在执行的函数的前一个调用中。</strong></p><h2 id="this-绑定规则" tabindex="-1"><a class="header-anchor" href="#this-绑定规则" aria-hidden="true">#</a> this 绑定规则</h2><h3 id="默认规则" tabindex="-1"><a class="header-anchor" href="#默认规则" aria-hidden="true">#</a> 默认规则</h3><p>这是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。</p><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// demo1</span>
<span class="token keyword">function</span> <span class="token function">foo1</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> name1 <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span>

<span class="token function">foo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>

<span class="token comment">// demo2</span>
<span class="token keyword">function</span> <span class="token function">foo2</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;use strict&#39;</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> name2 <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span>

<span class="token function">foo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// TypeError: this is undefined</span>

<span class="token comment">// demo3</span>
<span class="token keyword">function</span> <span class="token function">foo3</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name3<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> name3 <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span>

<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;use strict&#39;</span>

    <span class="token function">foo3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：在全局作用域声明的变量就是全局对象的一个属性。因此 this.name 的 this 指向全局对象。 如果函数<strong>运行</strong>在严格模式（demo2），则不能将全局对象用于默认绑定，因此 this 会绑定到 undefined，而在严格模式下<strong>调用</strong>则不影响 <code>foo3()</code> 函数的默认绑定。换句话说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式，如果函数体处于严格模式，那么 this 就会被绑定到 undefined，否则就被绑定到全局对象。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>日常开发的时候，不应该将严格模式和非严格模式混合使用。整个程序要么严格要么非严格。</p></div><h3 id="隐式绑定" tabindex="-1"><a class="header-anchor" href="#隐式绑定" aria-hidden="true">#</a> 隐式绑定</h3><p>这是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。</p><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>

obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：调用位置会使用 obj 上下文来引用函数，因此你可以说函数被调用时 obj 对象 “拥有” 或 “包含”函数引用。所以这里的 this 会使用隐式绑定到 obj 上下文对象上。</p><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;bar1&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;bar2&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">obj1</span><span class="token operator">:</span> obj1
<span class="token punctuation">}</span>

obj2<span class="token punctuation">.</span>obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// bar1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。</p><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">doFoo</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>

<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&#39;global bar&#39;</span>

<span class="token function">doFun</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">)</span> <span class="token comment">// global bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：fn 参数是 obj.foo 的一个引用，它引用的是 foo 函数本身，再来看 <code>fn()</code> 此时的调用位置是在 doFoo 调用栈里，所以当前调用位置是全局作用域，此时 this 被绑定到全局对象上了。</p><h3 id="显式绑定" tabindex="-1"><a class="header-anchor" href="#显式绑定" aria-hidden="true">#</a> 显式绑定</h3><p><code>call()</code> 和 <code>apply()</code> 方法的第一个参数是一个<strong>对象</strong>，是给 this 准备的，接着在调用函数时将其绑定到 this。因此可以直接指定 this 的绑定对象，我们称为显式绑定。</p><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：通过 <code>foo.call()</code>，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。这里使用 <code>foo.apply()</code> 也可以达到一样的结果，它们的区别是其他参数上。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>如果你传入一个原始值（String、Boolean或Number）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式（<code>new String()</code>、<code>new Boolean()</code>或<code>new Number()</code>），这称为基本包装类型的对象。</p></div><h4 id="硬绑定" tabindex="-1"><a class="header-anchor" href="#硬绑定" aria-hidden="true">#</a> 硬绑定</h4><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">baz</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span>baz<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>

<span class="token function">baz</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span> <span class="token comment">// bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：创建了函数 <code>baz()</code>，并在它的内部手动调用了 <code>foo.call(obj)</code>，因此强制把 foo 的 this 绑定到了 obj。不管 baz 函数怎么被调用，foo 的 this 总会绑定到 obj 上。这种绑定是一种显示的强制绑定，因此称为硬绑定。</p><h4 id="硬绑定应用场景" tabindex="-1"><a class="header-anchor" href="#硬绑定应用场景" aria-hidden="true">#</a> 硬绑定应用场景</h4><p>一、典型的就是创建一个包裹函数，负责接收参数并返回值：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>baz<span class="token punctuation">)</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二、创建一个可以重复使用的辅助函数：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bind</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
<span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于硬绑定是一种非常常用的模式，所以 ES5 内置了 bind 方法。它的用法如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="new-绑定" tabindex="-1"><a class="header-anchor" href="#new-绑定" aria-hidden="true">#</a> new 绑定</h3><p>通过 new 调用的函数，我们称之为构造函数调用。使用 new 来调用函数会自动执行下面的操作：</p><ol><li>创建（或者说构造）一个全新的对象。</li><li>这个新对象会被执行 <code>[[Prototype]]</code> 连接。</li><li>这个新对象会绑定到函数调用的 this。</li><li>如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。</li></ol><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">foo</span><span class="token punctuation">(</span><span class="token string">&#39;huitoutunao&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// huitoutunao</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：使用 new 来调用 <code>foo()</code> 时，会构造一个新对象并把它绑定到 <code>foo()</code> 调用中的 this 上。</p><h3 id="优先级" tabindex="-1"><a class="header-anchor" href="#优先级" aria-hidden="true">#</a> 优先级</h3><p>上面介绍了四条绑定 this 的规则，如果某个调用位置满足这四条规则的条件，该怎么办呢？</p><p>不用担心，它们是有使用优先级的，排序为：new 绑定 &gt; 显示绑定 &gt; 隐式绑定 &gt; 默认绑定。</p><p>如果将 null 或 undefined 作为 this 的绑定对象传入 call、apply 或 bind，这些值在调用时会被忽略，此时应用的是默认绑定规则。</p><p>然而，总是使用 null 来忽略 this 绑定可能会产生一些副作用。例如：第三方库的某个函数上使用了 this，而你使用 null 来忽略 this 绑定，此时就会把它绑定到全局对象上，结果可能是修改全局对象。</p><p>为了避免上述问题，推荐创建一个空对象（<code>Object.create(null)</code>）来代替 null，举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> $<span class="token keyword">null</span> <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>

<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>$<span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 1, 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="软绑定" tabindex="-1"><a class="header-anchor" href="#软绑定" aria-hidden="true">#</a> 软绑定</h3><p>实现默认绑定除了全局对象和 undefined 以外的值，以及保留隐式绑定或显示绑定的能力。<strong>解决了硬绑定没有的灵活性</strong>。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>softBind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">softBind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> fn <span class="token operator">=</span> <span class="token keyword">this</span> <span class="token comment">// 这里的 this 和 bound 函数里面的 this 指向不同对象。这里是指调用 softBind() 的对象。</span>
        <span class="token keyword">var</span> curried <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 因为规定第一个必须传入对象，所以从参数的第二个开始截取。</span>

        <span class="token comment">// 闭包</span>
        <span class="token keyword">var</span> <span class="token function-variable function">bound</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> _this <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token keyword">var</span> args <span class="token operator">=</span> curried<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>curried<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>

            <span class="token comment">// 实现默认绑定除了全局对象和 undefined 以外的值，以及保留隐式绑定或显示绑定的能力。</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span> <span class="token operator">||</span> <span class="token keyword">this</span> <span class="token operator">===</span> <span class="token punctuation">(</span>window <span class="token operator">||</span> global<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                _this <span class="token operator">=</span> obj
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                _this <span class="token operator">=</span> <span class="token keyword">this</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>_this<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        bound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>fn<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
        <span class="token keyword">return</span> bound
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;name：&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;小明&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;小米&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj3 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;小红&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 默认绑定</span>
<span class="token keyword">var</span> fooBindJ <span class="token operator">=</span> foo<span class="token punctuation">.</span><span class="token function">softBind</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span>
<span class="token function">fooBindJ</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 小明</span>

<span class="token comment">// 隐式绑定</span>
obj2<span class="token punctuation">.</span>foo <span class="token operator">=</span> foo<span class="token punctuation">.</span><span class="token function">softBind</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span>
obj2<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 小米</span>

<span class="token comment">// 显示绑定</span>
<span class="token function">fooBindJ</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj3<span class="token punctuation">)</span> <span class="token comment">// 小红</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="this-词法" tabindex="-1"><a class="header-anchor" href="#this-词法" aria-hidden="true">#</a> this 词法</h2><p>ES6 新增了一种无法使用上述四种规则的特殊函数：箭头函数（<code>=&gt;</code>）。它是根据外层（函数或者全局）作用域来决定 this。</p><p>举个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span>
<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：由于 <code>foo()</code> 的 this 被绑定到 obj1 上了，所以 bar（返回的箭头函数）的 this 也会绑定到 obj1 上，而且箭头函数的绑定无法修改，new 也不行！</p><p>用途：常用于回调函数中，例如事件或定时器。</p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>在学习 JavaScript 基础中，关于 this 部分比较难以理解，同时也是最重要的内容，所以为了使自己能够对 this 这块知识体系的理解更加深入，写下了这篇文章总结。希望对你们也有所帮助。</p><p>以上内容是参考《你不知道的JavaScript》中，关于 this 解析所整理出来的总结。</p>`,73),i=[c];function l(u,r){return s(),a("div",null,i)}const k=n(o,[["render",l],["__file","关于this.html.vue"]]);export{k as default};
