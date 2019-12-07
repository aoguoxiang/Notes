# CSS&&CSS3
***CSS中没有显示书写的属性都是默认值***
## CSS文本
### line-height
概念：  
行框：line-height与font-size之差(行间距)分成两半，分别加到一个文本行内容的顶部和底部。可以包含这些内容的最小框就是行框。  
    > 行框的高度指的是文本行的高度，不同于height属性(它是指一个html标签的高度)  
应用：  
如果一个html标签(比如：div)只有单行文本内容，并未设置padding，那么将设置line-height=height可以使文本在垂直方向上达到居中的效果  
## CSS3边框
### border-image
- border-image是一个简写属性，它包含如下属性(复合写法时按以下顺序书写)；必须要同时具有border-style和border-width，border-image才会生效
    1. border-image-source，表示边框背景图片的URL
    2. border-image-slice，将边框背景图片裁剪成九宫格，分别对应border的top left,top,top right,right,bottom right,bottom,bottom left,left
    3. border-image-width，默认是边框的宽度，用来限制相应区域背景图的范围；首先相应背景区域的图像会根据这个属性值进行缩放。然后再重复或平铺或拉伸。
    4. border-image-outset，相当于把原来贴图的位置向外延伸，不能为负值
    5. border-image-repeat，有三个属性值round(平铺)，repeated(类似round)，stretch(拉伸)；stretch为默认值
#### border-image-slice
`border-image-slice [<number>|<percentage>]{1,4} && fill?`  
- `number`表示纯数值，不需要带单位，默认单位为“px”；`percentage`百分数是相对于边框图片大小
- `{1,4}`表示可以有1~4个值，分别对应top,right,bottom,left四边的裁剪；1表示对应四边的裁剪均为该参数，2表示第一个参数为top和bottom，第二个参数为right和left，*同理，css中其他属性值个数也是类似用法*
- `fill?`如果有`fill`属性值，则作用是将border-image-source九宫格中间那一块切片作为DOM节点的背景
#### border-image-repeat
`border-image-repeat [stretch|round|repeat]{1,2}`  
- `{1,2}`表示可选值1~2，1表示水平和垂直均为该值；2表示水平和垂直分别使用指定的参数
- `round`和`repeat`的区别在于，round会凑整填充（进行了适度的拉伸）。repeat不进行拉伸，不凑整
#### border-image-width
`border-image-width [<length>|<percentage>|<number>|auto]{1,4}`
- 在复合写法中应该位于 slice属性 和repeat属性中间 用“/”间隔；如：`border-image:url(border.png) 27 / 6rem / repeat;`
- `length`带 px, em, in … 单位的尺寸值；`percentage`百分比;`number` 不带单位的数字；它表示 border-width 的倍数;auto 使用 auto， border-image-width 将会使用 border-image-slice 的值
#### border-image-outset
`border-image-outset [<number>|<percentage>]{1,4}`
- 在复合写法中应该位于border-image-width后面，用“/”间隔；如：`border-image:url(border.png) 27 / 6rem / 1.5rem /repeat;`;向外延伸1.5rem再贴图。  
[参考border-image详解](https://juejin.im/post/5dd3ac5b51882510e060d4a7#heading-9)
### border-shadow
### border-radius
`border-radius [<length>|<percentage>]{1,4}/[<length>|<percentage>]{1,4}`
- 如果未完全显式定义四个角，则基于“对角线相等原则”
- 语法中的`/`左边值表示x轴的半径，`/`右边的值表示y轴的半径，即最终创建一个椭圆圆角  
*一图弄懂border-radius*  
![一图弄懂border-radius](https://user-gold-cdn.xitu.io/2017/5/19/a7dc1c4612749412a1d6f2337ee13af0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
---
## CSS3背景
### background-size
`background-size [<length>|<percetage>]{1,2}`,percentage是相对于父元素的大小  
该属性定义背景图像的大小，在CSS3以前背景图像大小由实际图像大小决定
### background-origin
`background-origin [content-box|padding-box|border-box]{1}`  
该属性定义初始放置背景图像的位置，默认是从border-box位置开始(同CSS3之前放置背景图像的位置一样)
### background-clip
`background-clip [content-box|padding-box|border-box]{1}`
指定背景的绘制位置，默认值是border-box
### 渐变
#### 线性渐变(linear-gradient函数)
`background-image linear-gradient(angle|direction,color1,color2,...)`
- 默认是从上到下，使用direction记得要以`to direction`格式书写，使用angle渐变的方向参考下图：  
![使用angle渐变的方向](https://www.runoob.com/wp-content/uploads/2014/07/7B0CC41A-86DC-4E1B-8A69-A410E6764B91.jpg)  
- 可以使用rgba()函数设置颜色的transparent(透明度),比如`background-image:linear-gradient(rgba(255,0,0,0),rgba(255,255,255,1))`
- 使用`repeating-linear-gradient(angle|direction,color-stop1,color-stop2,...)`，color-stop1，color-stop2由颜色值和停止位置组成(percentage表示)