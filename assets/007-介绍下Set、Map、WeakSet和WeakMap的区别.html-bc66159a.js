import{_ as d,r as o,o as t,c as i,a as e,b as l,e as c,d as r}from"./app-1a9b85d0.js";const s={},n=r('<h1 id="_007-介绍下-set、map、weakset-和-weakmap-的区别" tabindex="-1"><a class="header-anchor" href="#_007-介绍下-set、map、weakset-和-weakmap-的区别" aria-hidden="true">#</a> 007-介绍下 Set、Map、WeakSet 和 WeakMap 的区别</h1><h2 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> set</h2><ol><li>成员不能重复；</li><li>没有键名，只有键值（或者说键名和键值是同一个值），所以 <code>keys</code> 方法和 <code>values</code> 方法的行为完全一致；</li><li>可以遍历，操作方法 <code>add()</code>，<code>delete</code> 和 <code>has</code>；</li></ol><h2 id="weakset" tabindex="-1"><a class="header-anchor" href="#weakset" aria-hidden="true">#</a> WeakSet</h2><ol><li>成员只能是对象，而不能是其他类型的值；</li><li>它的对象都是弱引用，即如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存；</li><li>不可遍历，没有 size 属性；</li><li>操作方法 <code>add()</code>，<code>delete</code> 和 <code>has</code>；</li></ol><h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h2><ol><li>本质上是健值对的集合，类似集合；</li><li>Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键；</li><li>Map 转为数组、数组转为 Map、Map 转为对象、对象转为 Map、Map 转为 JSON、JSON 转为 Map；</li></ol><h2 id="weakmap" tabindex="-1"><a class="header-anchor" href="#weakmap" aria-hidden="true">#</a> WeakMap</h2><ol><li>只接受对象作为键名（null 除外），不接受其他类型的值作为键名；</li><li>它的对象都是弱引用，即如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存。注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用；</li><li>没有遍历操作，也没有 size 属性；</li><li><code>get()</code>、<code>set()</code>、<code>has()</code>、<code>delete()</code>；</li></ol><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>',10),h={href:"https://es6.ruanyifeng.com/#docs/set-map",target:"_blank",rel:"noopener noreferrer"};function p(_,k){const a=o("ExternalLinkIcon");return t(),i("div",null,[n,e("p",null,[e("a",h,[l("Set和Map数据结构"),c(a)])])])}const M=d(s,[["render",p],["__file","007-介绍下Set、Map、WeakSet和WeakMap的区别.html.vue"]]);export{M as default};
