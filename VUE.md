# Vue.js知识点的一些笔记、总结
## 重新加深对Vue.js框架的认识
### 视图层
一个网页通过DOM的组合和嵌套形成最基本的视图结构。我们把HTML中的DOM与其他部分(例如交互部分)独立开来划分出一个层次，这个层次就叫视图层  
*Vue的核心库只关心视图层*
### Virtual DOM
可以预先通过JavaScript进行各种计算，把最终的DOM操作计算出来并优化
### Webpack是什么？为什么要用Webpack？
Webpack是一个前端打包和构建工具

打包功能：  
一个单页面应用程序本身很复杂，需要用到大量素材(例如每一个素材在HTML中通过link或script来引入)，这就造成了打开一个页面需要向服务器请求多次，造成TCP的握手和挥手过程时间的浪费。Webpack打包功能就可以将这些素材文件打包成一个文件，只需向服务器请求一次，并且多个资源都是共享一个HTTP请求，所以head部分也是共享的，相当于形成了规模效应，让网页展现更快，用户体验更好。

构建功能：  
首先大部分浏览器还不支持ES6，这就需要Webpack的Loader自动载入一个转换器将ES6==>老版本JavaScript语言，这个转换器就是Babel

*Webpack不止这一点功能*
### NPM和Node.js是什么，有什么关系？
Node.js:  
我们知道通常情况下，JavaScript的运行环境都是浏览器，因此JavaScript的能力也就局限于浏览器能赋予它的权限了。比如说读写本地系统文件这种操作，一般情况下运行在浏览器中的JavaScript代码是没有这个操作权限的。如果我们想用JavaScript写出一些能够运行在操作系统上的，能够具有像PHP，JAVA之类的编程语言具有的功能的程序该怎么办呢？Node.js就解决了这个问题。Node.js是一个服务端的JavaScript运行环境，通过Node.js可以实现用JavaScript写独立程序。像我们之前提到的Webpack就是Node.js写的，所以作为一个前端开发，即使你不用Node.js写独立程序，也得配一个Node.js运行环境，毕竟很多前端工具都是使用它写的。

NPM:  
是一个node.js的包管理器。我们在传统开发的时候，JQuery.js大多都是百度搜索，然后去官网下载，或者直接引入CDN资源，这种方法太过于麻烦。如果以后遇到其他的包，这个包的代码本身可能还调用了其他的包（也称这个包和其他的那几个包存在依赖关系），那么我们要在自己的项目中引入一个包将变得十分困难。现在我们有了NPM这个包管理器，直接可以通过，比如下面这样

> npm install vue

就自动在当前项目文件夹下导入了这个包，并且npm自动下载好了vue这个包依赖的其他包。  
至于有的人在按照网上的npm教程配置的时候踩坑了，发现下载速度很慢或者完全下载不了，那是因为我国有着众所周知的原因，网上也有各种解决方法可以解决这个问题，大家多善用搜索引擎。  
前面提到了Webpack可以安装各种插件来扩展功能，其实也是通过这种方式扩展。

### Vue-CLi是什么？
一个Vue.js脚手架工具，自动帮你生成好项目目录，配置好Webpack，以及各种依赖包的工具  
[以上内容参考昌维-代码之美](https://zhuanlan.zhihu.com/p/25659025)

---
## Vue实例
### 创建Vue实例
- 通过`new Vue({/*选项对象*/})`创建的实例称为*根实例*；选项对象中常用的属性有`el`,`data`,`watch`,`computed`等，详细查看[API文档](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE)
- 一个Vue应用通过根实例，以及可嵌套的、可复用的组件树组成；所有的组件都是Vue实例，并且接受相同的选项对象(一些根实例特有的属性除外)
### 数据与方法
- 当Vue实例被创建时，data对象的所有属性都被加入到Vue的**响应式系统**，当这些属性的值发生改变时，视图就会产生响应匹配更新的值  
***值得注意只有当实例被创建时就已经存在data中的属性才是响应的，另外使用Object.freeze()冻结属性，该属性无法被响应式系统追踪***

- Vue实例暴露了一些有用的实例属性，用前缀`$`表示，以便与用户定义的属性区分开，见下面示例
```javascript
var data = { a: 1 }
var vm = new Vue({
// 'el','data'就是用户定义的属性
  el: '#example',
  data: data
})

// `$data`指向*选项对象*的data属性，vm.data===undefined
vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```
### 实例生命周期钩子
- 每个实例被创建时都要经过一系列的初始化过程，例如，需要设置数据监听、编译模板、将实例挂载到DOM并在数据变化时更新DOM等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己代码的机会，[理解Vue的生命周期](https://segmentfault.com/a/1190000008570622)
- 不要在选项属性或回调上使用箭头函数，比如`created: () => console.log(this.a)`或`vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有this，this会作为变量一直向上级词法作用域查找，直至找到为止，经常导致`Uncaught TypeError: Cannot read property of undefined`或`Uncaught TypeError: this.myMethod is not a function`之类的错误。
### Vue实例，组件，DOM模板，字符串模板的区别？
- 所有的Vue组件都是Vue实例，并且接受相同的对象选项(除一些根实例特有的选项)；
- 只有根实例(通过new创建的Vue实例)有DOM模板，其他组件模板都是字符串模板(组件对象里的template选项)；
- 组件只能用在模板中(参见blog-post组件,component-b组件,component-a组件)；
---
## 模板语法
Vue.js使用基于HTML的模板语法，允许开发者声明式地将DOM绑定至底层Vue实例的数据。在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应系统，Vue能够智能地计算出最少需要重新渲染多少组件，并把DOM操作次数减到最少  
*如果你熟悉虚拟DOM并且偏爱JavaScript的原始力量，也可以不用模板，直接写渲染函数，使用可选的JSX语法*
### 插值
#### 文本
- `{{}}`是最常见的数据绑定，使用`v-once`能一次性的进行插值，例如：`<span v-once="msg">不会随着msg改变而改变:{{msg}}</span>`
#### 原始HTML
- `{{}}`插值会把数据渲染成普通文本而不是HTML，如果你要渲染成HTML就使用v-html指令,如下示例中`rawHtml='<span style="color:red">red</span>'`
```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```
渲染结果：
```
Using mustaches: <span style="color=red">red</span>
Using v-html directive: red
```
- `v-html`不能用来复合*局部模板*，因为Vue不是基于字符串的模板引擎。
- 你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。
#### 特性
- `{{}}`语法不能作用在HTML特性上，要绑定HTML特性需要用到`v-bind`
- 对于布尔特性(只要它们存在就意味着true)，Vue的工作方式略有不同，例如：`<button v-bind:disable='isButtonDisable'>Button</button>`，如果`isButtonDisable`的值为`null`,`undefined`,`false`，那么`disable`特性不会被包含在被渲染出`<button>`的元素中
#### 使用JavaScript表达式
- 对于所有的数据绑定，Vue都提供了完全的JavaScript表达式支持，但每个绑定只能是*单个JavaScript*表达式，如下示例
```
{{number+1}}
{{ok?'YES':'NO'}}
{{message.split('').reverse().join('')}}
<div v-bind:id="'list-'+id"></div>
```
下面的例子不会生效
```
<!--这是语句，不是表达式-->
{{var a=1}}
<!--流程控制语句也不行，换成三元表达式-->
{{if(ok){teturn message}}}
```
> 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。(理解这句话)
### 指令
指令是带有`v-`前缀的特殊特性，它的值预期是**单个JavaScript表达式**(v-for除外)，它的作用是当表达式的值改变时，将其产生的连带影响响应式地作用于DOM  
#### 参数
- 一些指令可以带有参数，参数紧跟着指令名称的冒号`:`后面，比如`v-bind`指令和`v-on`指令等等
#### 动态参数
从Vue 2.6.0开始可以为指令使用动态参数--用方括号括起来的JavaScript表达式
对动态参数的值的约束：  
- 动态参数预期会求出一个字符串，异常情况下值为null。这个特殊的null值可以显性地用于移除绑定。任何其他非字符串类型的值都会触发一个警告
对动态参数表达式的约束：  
- 如果表达式中有空格和引号字符，将会触发一个警告，例如： 
```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' +bar]='value'>....</a>
```
变通方法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式
- 动态参数要避免使用大写符命名，因为浏览器会把`HTML特性名`全部强制转为小写，如下所示
```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```
#### 修饰符
- 修饰符是以半角句号`.`指明的特殊后缀，用于指出一个指令应该以特殊方式绑定，例如：`<form v-on:sumbit.prevent="onSubmit"></form>`，这里`prevent`告诉`v-on`指令对于触发的事件调用`event.preventDefault()`
---
## 计算属性和侦听器
计算属性：(computed)  
用函数的方式定义，像普通属性一样使用  
侦听器：(watch)  
当监听的值变化时，就会执行回调函数  
计算属性默认的方法是getter函数，也可以设置setter函数  
计算属性是**基于它们的响应式依赖进行缓存的**，只在相关响应式依赖发生改变时它们才会重新求值。这一点同方法截然不同，每次调用方法都将会重新计算求值  
**侦听属性**适用于数据变化时执行异步操作和或开销较大的操作，但是不要滥用watch，通常用计算属性。  
参考文档:[适用于侦听器的代码](https://cn.vuejs.org/v2/guide/computed.html)
---
## class的绑定
### 对象语法：
```html
<div :class="{active:isActive}"></div>
```
上面语法表示`active`这个class存在与否将取决于数据属性isActive的trunthiness。
### 数组语法：
- 数组里的元素都是JavaScript表达式
```html
<div :class="[activeClass,errorClass]"></div>
```
```javascript
data{
    activeClass:'active',
    errorClass:'text-danger'
}
```
数组中也可以用三元表达式
```
<div :class="[isActive ? activeClass : "", errorClass]"></div>
```
数组语法中也可以使用对象语法
```html
<div :class="[{active:isActive},errorClass]"></div>
```
### 用在组件上：
当在一个自定义组件上使用class属性，这些class属性将被添加到该组件的根元素上面。这个元素上已经存在的class不会被覆盖
## style的绑定
### 对象语法：
```html
<div :style="{color:activeColor,fontSize:fontSize+'px'}"></div>
```
```javascript
data{
    activeColor:'red',
    fontSize:30
}
```
Vue 2.3.0 起你可以为style绑定中的属性提供一个包含多个值的数组(常用于提供多个带前缀的值)，例如：
```
<div :style="{display:['-webKit-box','-ms-flexbox','flex']}">多重值</div>
<!-- 只会渲染数组中最后一个被浏览器支持的值，因此这里display:flex -->
```
**v-bind:style的对象语法十分直观，看着非常像CSS，但其实是一个JavaScript对象。CSS属性名可以用驼峰式(camelCase)或短横线分隔(kebab-case，记得用引号括起来)来命名：**
### 数组语法：
数组语法可以将多个样式对象应用到同一个元素上：
```html
<div :style="[baseStyles,overridingStyles]"></div>
```
自动添加前缀：  
当 v-bind:style 使用需要添加[浏览器引擎前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
**未完待续**