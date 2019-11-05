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
3. 详细Module语法、Module加载实现参考《ES6标准入门笔记》

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
 __proto__(例如：obj.__proto__)获取原型对象。虽然instanceof直接用于原始类型的判断不可行，但可以通过下面方法判断
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
