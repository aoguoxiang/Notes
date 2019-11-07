# 该日记是记录每天遇到一些新的知识点和不熟悉知识点的大概总结
# 2019.11.2
## 如何使用html5的canvas元素绘制矩形、三角形、圆等基本图形
**ctx是canvas创建的2D上下文环境**
### 绘制矩形：
```javascript
        ctx.fillStyle='#fff';
        ctx.beginPath();
        ctx.rect(x,y,width,height);
        //填充矩形，填充颜色为ctx.fillStyle;
        //ctx.fillRect(x,y,width,height)是ctx.rect()和ctx.fill()的合并写法
        ctx.fill();
        //空心矩形
        ctx.stroke();
```    
### 绘制圆：
```javascript
      ctx.fillStyle='#fff';
      ctx.beginPath();
      //startAngle圆弧的起始点，以x轴开始计算，单位为弧度；显然endAngle为圆弧的终止点；anticlockwise代表绘制圆弧的方向，默认值false，顺时针方向
      ctx.arc(x,y,r,starAngle,endAngle,anticlockwise);
      //填充圆，填充颜色为ctx.fillStyle
      ctx.fill();
      //空心圆
      ctx.stroke();
```        
### 绘制三角形：
  ```javascript
        ctx.fillStyle='#fff';
        ctx.beginPath();
        ctx.moveTo(x,y);
        //length为三角形的长度
        ctx.lineTo(x+length,y);
        //设置三角形的高，let triHeight=(length/2)*Math.tan();也可以直接设置一个triHeight的值
        ctx.lineTo(x+length/2,y+triHeight);
        //最后一个lineTo()的参数要和moveTo()的参数一致，保证三角形路径是封闭的
        ctx.lineTo(x,y);
        //填充的三角形，填充颜色为ctx.fillStyle
        ctx.fill();
        //空心三角形
        ctx.stroke();
```        
### 延伸的数学知识：
- 弧度、弧长、角度数的换算关系
- tan(),cos(),sin()三角函数的概念
## 区别querySelector()和getElementsByClassName()
- document.querySelector(selector)是返回选择器匹配的第一个元素，并且selector是选择器字符串
- document.getElementsByClassName(string)返回一个NodeList,里面包含所匹配的元素，string为class的属性值
## Module的语法、Module加载的实现
1. 如果你尝试用本地文件加载HTML 文件 (i.e. with a file:// URL), 由于JavaScript 模块的安全性要求，
      你会遇到CORS 错误。你需要通过服务器来做你的测试
2. Moudle的扩展名为.mjs方便与传统.js文件的区别，为了服务器能正确识别.mjs的扩展名，需要以MIME-type为javascript/esm加载或者
      其他javaScript兼容的MIME-type的类型(该问题还未解决)
3. 详细Module语法、Module加载实现[参考《ES6标准入门笔记》](http://es6.ruanyifeng.com/)

# 2019.11.3
## github上的"New pull request"作用有哪些？
在github上个人的repository分为两种，一种是自己创建的，另一种是fork别人的；
- 自己创建的repository在发布后如果有别人fork你的仓库，并且别人有了新的commited，你觉得ok可以Merge，那么需要如下操作：
    1. 进入仓库页面，选择Code选项，找到New pull request按钮点击进入；
    2. 在新打开的页面里base fork选择自己的仓库和分支，head fork选择你想要Merge的用户的仓库和分支
    3. 点击Create pull request，添加创建说明，再点击Merge pull request就成功将别人的commited合并到自己的分支中了
- fork别人的repository想要保持和原作者同步更新，那么需要如下操作：
    1. 同1. a的步骤一样
    2. 此时应该点击一compare across fork,再将base fork选择自己的仓库和分支，head fork选择源作者的仓库和分支
    3. 同1. c的步骤一样
[fork的项目如何保持同作者同步更新](https://www.cnblogs.com/rxbook/p/7090208.html)
- fork别人的repository想要向源作者推送commited，那么需要如下操作：
    1. 同2.的步骤类似，只是要将base fork选择源作者的仓库和分支,head fork选择自己的仓库和分支
## typeof和instanceof
1. typeof可以判断原始类型和对象，有几点需要注意：
    - typeof null 输出结果为Object,实际上null不是对象，这是JS的一个历史BUG
    - typeof function 输出结果为function，函数在JS中也是属于对象类型的
2. instanceof运算符表示构造函数的prototype属性是否在实例对象的原型链上
    - instanceof用于判断对象的实例。在ES规范中只能通过构造函数的prototype属性获取原型对象，但是实例对象可以通过非标准属性
 __ proto__(例如：obj.__ proto__)获取原型对象。虽然instanceof直接用于原始类型的判断不可行，但可以通过下面方法判断
 ```javascript
            class PrimitiveString{
                static [Symbol.hasInstance](x){
                    return typeof x === 'string'
                }
            }
            console.log('hello world' instanceof PrimitiveString);//输出结果为true
```
## 拓展知识：
需了解symbol原始类型值和内置symbol值以及Symbol对象
# 2019.11.5
## 重新加深对Vue.js框架的认识
### 视图层
一个网页通过DOM的组合和嵌套形成最基本的视图结构。我们把HTML中的DOM与其他部分(例如交互部分)独立开来划分出一个层次，这个层次就叫视图层  
*Vue的核心库只关心视图层*
## Virtual DOM
可以预先通过JavaScript进行各种计算，把最终的DOM操作计算出来并优化
## Webpack是什么？为什么要用Webpack？
Webpack是一个前端打包和构建工具

打包功能：  
一个单页面应用程序本身很复杂，需要用到大量素材(例如每一个素材在HTML中一link或script来引入)，这就造成了打开一个页面需要向服务器请求多次，造成TCP的握手和挥手过程时间的浪费。Webpack打包功能就可以将这些素材文件打包成一个文件，只需向服务器请求一次，并且多个资源都是共享一个HTTP请求，所以head部分也是共享的，相当于形成了规模效应，让网页展现更快，用户体验更好。

构建功能：  
首先大部分浏览器还不支持ES6，这就需要Webpack的Loader自动载入一个转换器将ES6==>老版本JavaScript语言，这个转换器就是Babel

*Webpack不止这一点功能*
## NPM和Node.js是什么，有什么关系？
Node.js:  
我们知道通常情况下，JavaScript的运行环境都是浏览器，因此JavaScript的能力也就局限于浏览器能赋予它的权限了。比如说读写本地系统文件这种操作，一般情况下运行在浏览器中的JavaScript代码是没有这个操作权限的。如果我们想用JavaScript写出一些能够运行在操作系统上的，能够具有像PHP，JAVA之类的编程语言具有的功能的程序该怎么办呢？Node.js就解决了这个问题。Node.js是一个服务端的JavaScript运行环境，通过Node.js可以实现用JavaScript写独立程序。像我们之前提到的Webpack就是Node.js写的，所以作为一个前端开发，即使你不用Node.js写独立程序，也得配一个Node.js运行环境，毕竟很多前端工具都是使用它写的。

NPM:  
是一个node.js的包管理器。我们在传统开发的时候，JQuery.js大多都是百度搜索，然后去官网下载，或者直接引入CDN资源，这种方法太过于麻烦。如果以后遇到其他的包，这个包的代码本身可能还调用了其他的包（也称这个包和其他的那几个包存在依赖关系），那么我们要在自己的项目中引入一个包将变得十分困难。现在我们有了NPM这个包管理器，直接可以通过，比如下面这样

> npm install vue

就自动在当前项目文件夹下导入了这个包，并且npm自动下载好了vue这个包依赖的其他包。  
至于有的人在按照网上的npm教程配置的时候踩坑了，发现下载速度很慢或者完全下载不了，那是因为我国有着众所周知的原因，网上也有各种解决方法可以解决这个问题，大家多善用搜索引擎。  
前面提到了Webpack可以安装各种插件来扩展功能，其实也是通过这种方式扩展。

## Vue-CLi是什么？
一个Vue.js脚手架工具，自动帮你生成好项目目录，配置好Webpack，以及各种依赖包的工具  
[参考昌维-代码之美](https://zhuanlan.zhihu.com/p/25659025)


## JS中的类型转换
- JS中的类型转换只有三种情况：
1. 转为boolean
2. 转为string
3. 转为number
> 注意图中有一个错误，Boolean 转字符串这行结果我指的是 true 转字符串的例子，不是说 Boolean、函数、Symblo 转字符串都是 `true`
![类型转换表格](https://user-gold-cdn.xitu.io/2018/11/15/16716dec14421e47?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
## 四则运算符
- “+”加法运算符
    1. 如果有一方为字符串，则另一方会转为字符串
    2. 如果没有字符串，会优先转为数字，转不了数字再转为字符串  
注意：+数据类型 **只会**把数据类型转为数值，转不了会转为NaN，例如'a'+ +'b'=>'aNaN'
- 除加法运算符外，都**只会**转为数值，转不了的为NaN
## this指定
- 在全局执行环境中，不管是否是严格模式，this都指定为全局对象
- 在函数执行环境中，严格模式默认指定undefined，非严格模式指定为全局对象
![判断this指定流程图](https://user-gold-cdn.xitu.io/2018/11/15/16717eaf3383aae8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
> 如果将this传递给call、bind、或者apply，它将被忽略。不过你仍然可以为调用添加参数，不过第一个参数（thisArg）应该设置为null。bind函数只会生效一次
## 不足知识点
- 对象转为原始数据类型调用内置函数[[ToPrimitive]]的逻辑
- 比较运算符的转换逻辑
[参考《前端面试之道》](https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5bdc715f6fb9a049c15ea4e0)

# 2019.11.6
## Vue实例  
当Vue实例被创建时，data对象的所有属性都被加入到Vue的**响应式系统**，当这些属性的值发生改变时，视图就会产生响应匹配更新的值  
***值得注意只有当实例被创建时就已经存在data中的属性才是响应的，使用Object.freeze()冻结属性，该属性无法被响应式系统追踪***

每个实例被创建时都要经过一系列的初始化过程--例如，需要设置数据监听、编译模板、将实例挂载到DOM并在数据变化是更新DOM等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己代码的机会  
[钩子生命周期图](https://cn.vuejs.org/images/lifecycle.png)
## 模板语法
Vue.js使用基于HTML的模板语法，允许开发者声明式地将DOM绑定至底层Vue实例的数据。在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应系统，Vue能够智能地计算出最少需要重新渲染多少组件，并把DOM操作次数减到最少  
*如果你熟悉虚拟DOM并且偏爱JavaScript的原始力量，也可以不用模板，直接写渲染函数，使用可选的JSX语法*

{{}}插值会把数据渲染成普通文本而不是HTML，如果你要渲染成HTML就使用v-html指令  
{{}}语法不能作用在HTML特性上，要绑定特性需要用到Vue的指令

指令特性的值预期是**单个JavaScript表达式**(v-for除外)，它的作用是当表达式的值改变时，将其产生的连带影响响应式地作用于DOM  
从Vue 2.6.0开始可以为指令使用动态参数  
- 对动态参数的值的约束  
动态参数预期会求出一个字符串，异常情况下值为null。这个特殊的null值可以显性地用于移除绑定。任何其他非字符串类型的值都会触发一个警告
- 对动态参数表达式的约束  
如果表达式中有空格和引号字符，将会触发一个警告，例如：  
```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' +bar]='value'>....</a>
```
变通方法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式  
***在HTML文件里直接撰写模板，要避免使用大写字符命名键名，因为浏览器会被attribute名全部强制转为小写***  
```html
<!--
在DOM中使用模板时这段代码会被转为 'v-bind:[someattr]'
除非在实例中有一个名为"someattr"的property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value">...</a>
```
## 计算属性和侦听器
### 计算属性：
概念：用函数的方式定义，像普通属性一样使用  
计算属性默认的方法是getter函数，也可以设置setter函数 
计算属性是**基于它们的响应式依赖进行缓存的**，只在相关响应式依赖发生改变时它们才会重新求值。这一点同方法截然不同，每次调用方法都将会重新计算求值  
**侦听属性**适用于数据变化时执行异步操作和或开销较大的操作，但是不要滥用watch，通常用计算属性。  
参考文档:[适用于侦听器的代码](https://cn.vuejs.org/v2/guide/computed.html)
### class的绑定
对象语法：  
```html
<div :class="{active:isActive}"></div>
```
上面语法表示active这个class存在与否将取决于数据属性isActive的trunthiness。

数组语法：  
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
```html
<div :class="[isActive ? activeClass : "", errorClass]"></div>
```
数组语法中也可以使用对象语法
```html
<div :class="[{active:isActive},errorClass]"></div>
```

用在组件上：  
当在一个自定义组件上使用class属性，这些class属性将被添加到该组件的根元素上面。这个元素上已经存在的class不会被覆盖
### style的绑定
对象语法：  
```html
<div :style="{color:activeColor,fontSize:fontSize+'px'}"></div>
```
```javascript
data{
    activeColor:'red',
    fontSize:30
}
```
**v-bind:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：**

数组语法：  
数组语法可以将多个样式对象应用到同一个元素上：
```html
<div :style="[baseStyles,overridingStyles]"></div>
```

自动添加前缀：  
当 v-bind:style 使用需要添加[浏览器引擎前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

**未完待续**

# 2019.11.7
## 异步
1. 单线程模型：  
众所周知，JavaScript只在一个线程上运行，但是JavaScript引擎有多个线程，单个脚本只能在一个线程上运行(称为主线程)，其他线程都是在后台配合。而且JavaScript语言本身并不慢，慢的是I/O操作，比如等待Ajax请求返回结果，因此引入了事件循环机制(Event Loop)  
Event Loop：CPU完全可以不管I/O操作，挂起处于等待中的任务，先运行排在后面的任务。等到I/O操作返回结果，再回头把挂起的任务继续执行下去。

2. 任务队列和事件循环：  
任务队列：  
它是用于存放被引擎挂起的异步任务(异步任务没有回调函数将不会进入队列)  
PS：*实际上引擎会根据异步任务的类型将它存放在多个队列中*

3. 异步操作的几种方式：  
    - 回调函数，优点是比较容易理解，实现；缺点是不利于代码的阅读和维护，各个部分之间高度耦合(coupling)，使得程序结构混乱、流程难以追踪(尤其多个回调函数嵌套使用)，而且每个任务只能指定一个回调函数
    - 事件监听，优点是容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以去耦合(decoupling)，有利于模块化。缺点是整个程序都是事件驱动，运行流程不清晰，很难看出主流程。
    - 发布/订阅，这种方法的性质同"事件监听"类似，但是明显优于后者。因为可以通过查看"信号中心"，了解存在多少个信号、每个信号有多少个订阅者，从而监控程序的运行。[发布/订阅的定义和例子](https://wangdoc.com/javascript/async/general.html)
    
4. 多个异步操作的流程控制  
    - 串行执行，我们可以编写一个流程控制函数，让它控制异步任务，一个任务完成以后，再执行另一个
    - 并行执行，流程控制函数也可以并行执行，即所有异步任务同时执行
    - 并行与串行的结合，设置一个门槛，每次最多只能并行执行n个异步任务，这样就避免过分占用系统资源[并行与串行的结合代码示例](https://wangdoc.com/javascript/async/general.html)  
    **一定要仔细研究这个示例代码，熟悉异步的工作方式**
    
    


