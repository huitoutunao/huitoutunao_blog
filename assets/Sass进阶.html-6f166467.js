import{_ as p,r as t,o as c,c as o,a as n,b as a,e,d as i}from"./app-bc941942.js";const l="/images/essays/sass_1.png",u={},d=i(`<h1 id="sass-进阶" tabindex="-1"><a class="header-anchor" href="#sass-进阶" aria-hidden="true">#</a> Sass 进阶</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>日常开发主要使用 Sass 语法编写样式，所以这里记录 Sass 几个好用的技巧。</p><h2 id="控制指令" tabindex="-1"><a class="header-anchor" href="#控制指令" aria-hidden="true">#</a> 控制指令</h2><p>在编写 <code>@mixin</code> 和 <code>@function</code> 时提供逻辑判断。</p><h3 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> @if</h3><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$boolean</span></span><span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token statement keyword">!default</span><span class="token punctuation">;</span>

<span class="token keyword">@mixin</span> <span class="token selector">simple-mixin </span><span class="token punctuation">{</span>
    <span class="token comment">// #{} 类似 ES6 字符串模板的变量(\${})</span>
    <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$boolean</span> </span><span class="token punctuation">{</span>
        <span class="token keyword">@debug</span> <span class="token string">&quot;$boolean is #{$boolean}&quot;</span><span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
        <span class="token keyword">@debug</span> <span class="token string">&quot;$boolean is #{$boolean}&quot;</span><span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token selector">.selector </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> simple-mixin<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> @for</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法1：从 start 遍历到 end，包含 end 的值。
@for $var from &lt;start&gt; through &lt;end&gt;

语法2：从 start 遍历到 end，不包含 end 的值。
@for $var from &lt;start&gt; to &lt;end&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$class-name</span></span><span class="token punctuation">:</span> for <span class="token statement keyword">!default</span><span class="token punctuation">;</span>

<span class="token keyword">@for</span> <span class="token variable">$i</span> <span class="token keyword">from</span> 0 <span class="token keyword">through</span> <span class="token selector">4 </span><span class="token punctuation">{</span>
    <span class="token selector">.<span class="token variable">#{$class-name}</span>-<span class="token variable">#{$i}</span> </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 32px <span class="token operator">+</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@for</span> <span class="token variable">$i</span> <span class="token keyword">from</span> <span class="token selector">0 to 4 </span><span class="token punctuation">{</span>
    <span class="token selector">.<span class="token variable">#{$class-name}</span>-<span class="token variable">#{$i}</span> </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 32px <span class="token operator">+</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="each" tabindex="-1"><a class="header-anchor" href="#each" aria-hidden="true">#</a> @each</h3><p>基础：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$list</span></span><span class="token punctuation">:</span> red green yellow black orange<span class="token punctuation">;</span>
<span class="token keyword">@mixin</span> <span class="token selector">list-color </span><span class="token punctuation">{</span>
    <span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$var</span> in <span class="token variable">$list</span> </span><span class="token punctuation">{</span>
        <span class="token selector">.<span class="token variable">#{$var}</span> </span><span class="token punctuation">{</span>
            <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$var</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.item </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> list-color<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.item .red</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.item .green</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token comment">/* ...省略 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结合上面的 <code>@for</code> 的写法：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.item </span><span class="token punctuation">{</span>
    <span class="token keyword">@for</span> <span class="token variable">$var</span> <span class="token keyword">from</span> 0 <span class="token keyword">through</span> <span class="token selector">4 </span><span class="token punctuation">{</span>
        <span class="token selector"><span class="token parent important">&amp;</span>.<span class="token variable">#{$class-name}</span>-<span class="token variable">#{$var}</span> </span><span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 32px <span class="token operator">+</span> <span class="token variable">$var</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@include</span> list-color<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.item.for-0</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token selector">.item .red</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token selector">.item.for-1</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token selector">.item .green</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">/* ...省略 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="while" tabindex="-1"><a class="header-anchor" href="#while" aria-hidden="true">#</a> @while</h3><p>只要 <code>@while</code> 后面的条件为 <code>false</code> 就会停止循环。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$index</span></span><span class="token punctuation">:</span> 4<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$index-width</span></span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>

<span class="token keyword">@while</span> <span class="token selector"><span class="token variable">$index</span> &gt; 0 </span><span class="token punctuation">{</span>
    <span class="token selector">.box-<span class="token variable">#{$index}</span> </span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$index-width</span> <span class="token operator">+</span> <span class="token variable">$index</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token property"><span class="token variable">$index</span></span><span class="token punctuation">:</span> <span class="token variable">$index</span> <span class="token operator">-</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="extend" tabindex="-1"><a class="header-anchor" href="#extend" aria-hidden="true">#</a> @extend</h2><p>一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。使用 <code>@extend</code> 告诉 Sass 将一个选择器下的所有样式继承给另一个选择器。</p><h3 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h3><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.clearfloat </span><span class="token punctuation">{</span>
    *<span class="token property">zoom</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
    <span class="token selector"><span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
        <span class="token property">visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
        <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.box </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .clearfloat<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多重延伸" tabindex="-1"><a class="header-anchor" href="#多重延伸" aria-hidden="true">#</a> 多重延伸</h3><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.dis-flex </span><span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.clearfloat </span><span class="token punctuation">{</span>
    *<span class="token property">zoom</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
    <span class="token selector"><span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
        <span class="token property">visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
        <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.box </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .dis-flex<span class="token punctuation">;</span>
    <span class="token keyword">@extend</span> .clearfloat<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用逗号隔开：<code>@extend .dis-flex, .clearfloat;</code>。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>此外需要注意的是，<code>@extend</code> 命令无法用在其他 <code>@</code> 命令中，例如用在 <code>@media</code> 命令中。当你在上面定义 <code>.clearfloat</code> 类时，在 <code>Media Queries</code> 代码里面就无法扩展 <code>.clearfloat</code> 类。但是你可以在 <code>Media Queries</code> 里面再定义一个 <code>.clearfloat</code> 然后扩展一下。</p></div><h3 id="继续延伸" tabindex="-1"><a class="header-anchor" href="#继续延伸" aria-hidden="true">#</a> 继续延伸</h3><p>当一个选择器延伸给第二个后，可以继续将第二个选择器延伸给第三个。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.error </span><span class="token punctuation">{</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px #f00<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #fdd<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.seriousError </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .error<span class="token punctuation">;</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.criticalError </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .seriousError<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 10%<span class="token punctuation">;</span>
    <span class="token property">bottom</span><span class="token punctuation">:</span> 10%<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 10%<span class="token punctuation">;</span>
    <span class="token property">right</span><span class="token punctuation">:</span> 10%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="按需求输出的-extend" tabindex="-1"><a class="header-anchor" href="#按需求输出的-extend" aria-hidden="true">#</a> 按需求输出的 @extend</h3><p>像之前说的，使用 <code>@extend</code> 需要规划好可复用的类放在上面，然后再在下面 <code>@extend</code> 调用。这样，我们的可复用部分就会编译输出到 <code>CSS</code> 中，但这些代码可能是无意义的，我们并不想使其编译出现在 <code>CSS</code> 文件中，那么就可以使用 <code>%</code> 符号来实现。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">#context a<span class="token placeholder">%extreme</span> </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
    <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.notice </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%extreme</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">#context a.notice</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
    <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个例子：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector"><span class="token placeholder">%flex-box</span> </span><span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.flex-a </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%flex-box</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.flex-b </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%flex-box</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.flex-a, .flex-b</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.flex-a</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.flex-b</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多个选择器运用了相同的 <code>%placeholder</code> 也只会输出一次代码。没有引用的 <code>%placeholder</code> 是不会输出任何 CSS 代码。</p><h2 id="mixin" tabindex="-1"><a class="header-anchor" href="#mixin" aria-hidden="true">#</a> @mixin</h2><h3 id="基础-1" tabindex="-1"><a class="header-anchor" href="#基础-1" aria-hidden="true">#</a> 基础</h3><p><code>@mixin</code> 定义的是一个片段，这个片段可以是类似变量的一段文字一条属性，也可以是一整个选择器和内容，也可以是一个选择器的一部分 <code>CSS</code> 代码。此外还可以传递参数，通过参数生成不同代码。它需要配合 <code>@include</code> 命令来引用这段代码，类似复制的效果。<code>@mixin</code> 定义的内容，不会编译输出。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">font</span><span class="token punctuation">(</span><span class="token variable">$color</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$fontSize</span></span><span class="token punctuation">:</span> 14px<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$fontSize</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">p </span><span class="token punctuation">{</span> <span class="token keyword">@include</span> <span class="token function">font</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">h1 </span><span class="token punctuation">{</span> <span class="token keyword">@include</span> <span class="token function">font</span><span class="token punctuation">(</span>blue<span class="token punctuation">,</span> 20px<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">p </span><span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">h1 </span><span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="传递多参数" tabindex="-1"><a class="header-anchor" href="#传递多参数" aria-hidden="true">#</a> 传递多参数</h3><p>需要在参数后面加上三个点，表示这个参数可能包含多条属性：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">box-shadow</span><span class="token punctuation">(</span><span class="token variable">$shadows</span>...<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">-moz-box-shadow</span><span class="token punctuation">:</span> <span class="token variable">$shadows</span><span class="token punctuation">;</span>
    <span class="token property">-webkit-box-shadow</span><span class="token punctuation">:</span> <span class="token variable">$shadows</span><span class="token punctuation">;</span>
    <span class="token property">box-shadow</span><span class="token punctuation">:</span> <span class="token variable">$shadows</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.shadow </span><span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token keyword">@include</span> <span class="token function">box-shadow</span><span class="token punctuation">(</span>0px 4px 5px #666<span class="token punctuation">,</span> 2px 6px 10px #999<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，多值参数还可以用在 <code>@include</code> 传參的时候，分解某个变量值，例如：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">colors</span><span class="token punctuation">(</span><span class="token variable">$text</span><span class="token punctuation">,</span> <span class="token variable">$background</span><span class="token punctuation">,</span> <span class="token variable">$border</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$text</span><span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$background</span><span class="token punctuation">;</span>
    <span class="token property">border-color</span><span class="token punctuation">:</span> <span class="token variable">$border</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$values</span></span><span class="token punctuation">:</span> #ff0000<span class="token punctuation">,</span> #00ff00<span class="token punctuation">,</span> #0000ff<span class="token punctuation">;</span>
<span class="token selector">.box1 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">colors</span><span class="token punctuation">(</span><span class="token variable">$values</span>...<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$value-map</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token property">text</span><span class="token punctuation">:</span> #00ff00<span class="token punctuation">,</span> <span class="token property">background</span><span class="token punctuation">:</span> #0000ff<span class="token punctuation">,</span> <span class="token property">border</span><span class="token punctuation">:</span> #ff0000<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token selector">.box2 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">colors</span><span class="token punctuation">(</span><span class="token variable">$value-map</span>...<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="向-mixin-传递内容" tabindex="-1"><a class="header-anchor" href="#向-mixin-传递内容" aria-hidden="true">#</a> 向 @mixin 传递内容</h3><p>对于编写响应式不要太友好，例如：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">#logo </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">@mixin</span> <span class="token selector">iphone5 </span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@media</span> only screen <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">min-device-width</span> <span class="token punctuation">:</span> 320px<span class="token punctuation">)</span> <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">max-device-width</span> <span class="token punctuation">:</span> 568px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
        <span class="token keyword">@content</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">@include</span> <span class="token selector">iphone5 </span><span class="token punctuation">{</span>
    <span class="token selector">#logo </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@content</code> 是即将插入 <code>@include</code> 中的内容。</p><h2 id="组织-sass-文件" tabindex="-1"><a class="header-anchor" href="#组织-sass-文件" aria-hidden="true">#</a> 组织 Sass 文件</h2><p><img src="`+l+'" alt="sass_1"></p><h3 id="base" tabindex="-1"><a class="header-anchor" href="#base" aria-hidden="true">#</a> base</h3><p>该文件夹包含初始化模板相关的文件。</p><h3 id="components" tabindex="-1"><a class="header-anchor" href="#components" aria-hidden="true">#</a> components</h3><p>该文件夹包含组件样式相关的文件。</p><h3 id="helpers" tabindex="-1"><a class="header-anchor" href="#helpers" aria-hidden="true">#</a> helpers</h3><p>该文件夹包含 Sass 的工具和帮助之类的样式文件。</p><h3 id="layouts" tabindex="-1"><a class="header-anchor" href="#layouts" aria-hidden="true">#</a> layouts</h3><p>该文件夹包含布局相关的文件。比如说“header”，“footer”，“网格布局”和“响应式布局”等。</p><h3 id="pages" tabindex="-1"><a class="header-anchor" href="#pages" aria-hidden="true">#</a> pages</h3><p>如果你需要针对一些页面写特定的样式，我想将他们放在 <code>pages/</code> 文件夹中是非常酷的，并且以页面的名称来命名。</p><h3 id="theme" tabindex="-1"><a class="header-anchor" href="#theme" aria-hidden="true">#</a> theme</h3><p>该文件夹包含主题样式的相关文件。</p><h3 id="vendors" tabindex="-1"><a class="header-anchor" href="#vendors" aria-hidden="true">#</a> vendors</h3><p>主要用来包含来自外部的库和框架的 CSS 文件。</p><h2 id="限制嵌套" tabindex="-1"><a class="header-anchor" href="#限制嵌套" aria-hidden="true">#</a> 限制嵌套</h2><p>原则如下：</p><ol><li>嵌套永远不要超过三个层级；</li><li>确保输出的CSS简洁、可重用；</li><li>使用嵌套是很有意义的，而不是默认选项；</li></ol><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>',78),r={href:"https://www.w3cplus.com/preprocessor/Sass-control-directives-if-for-each-while.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.w3cplus.com/preprocessor/sass-advanced.html",target:"_blank",rel:"noopener noreferrer"};function v(b,m){const s=t("ExternalLinkIcon");return c(),o("div",null,[d,n("ul",null,[n("li",null,[n("a",r,[a("Sass控制命令：@if,@for,@each和@while"),e(s)])]),n("li",null,[n("a",k,[a("Sass进阶"),e(s)])])])])}const x=p(u,[["render",v],["__file","Sass进阶.html.vue"]]);export{x as default};
