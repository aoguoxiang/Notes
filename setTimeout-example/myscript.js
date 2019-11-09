/*
该程序设计的是让"任务队列"中只保持2个异步任务
1.第一次调用launcher()添加两个异步任务，分别为队列1，队列2；同时输出“代码24行的内容”
2.这时主线程任务执行完毕，队列1进入主线程开始执行
  a.将items数组第一个成员添加到results数组中
  b.running值变为1，同时打印在浏览器控制台
  c.调用launcher()，队列1执行完毕被释放
3.第二次调用launcher()，添加队列3；同时输出“代码24行的内容”
4.这时主线程任务执行完毕，队列2进入主线程开始执行
  过程类似队列1的执行过程

因此规律为队列1执行时results.length=1,running=1,items.length=4,添加队列3进入任务队列中
....
队列5执行时results.length=5,running=1,items.length=0(不再调用launcher())
队列6执行时results.length=6,running=0,根据控制条件输出results数组
*/
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
var running = 0;
var limit = 2;

function async(arg, callback) {
    // 这是同步任务
  console.log('参数为 ' + arg +' , 1秒后返回结果');
//   这是异步任务，需要在while循环结束后再执行
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

function launcher() {
  while(running < limit && items.length > 0) {
    var item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      console.log(running);
      if(items.length > 0) {
        launcher();
      } else if(running == 0) {
        final(results);
      }
    });
    running++;
  }
}
// launcher();

/*
每次调用的定时器函数(不论是setTimeout还是setInterval)返回值(定时器编号)都是整数且比上次大1
该程序定时器setInterval函数不断向任务队列中添加clearAllTimeouts回调函数
clearAllTimeouts函数执行时又会向任务队列中添加一个setTimeout(这是异步任务，要将后面的同步任务执行完毕才会执行)
在执行clearAllTimeouts函数的同步任务时，while循环的逻辑是将后面添加的setTimeout异步任务全部从任务队列中清除，但不会清除setInterval这个异步任务
所以总结该程序的设计目的是：清除当前任务队列中所有的setTimeout定时器，虽然该程序并无实际意义，但是是一个利用定时器
                          编号清除定时器的例子
*/

(function() {
  // 每轮事件循环检查一次
  var gid = setInterval(clearAllTimeouts, 0);
  // console.log(gid);

  function clearAllTimeouts() {
    var id = setTimeout(function() {}, 0);
    // console.log(id);
    while (id > 0) {
      if (id !== gid) {
        clearTimeout(id);
      }
      id--;
    }
  }
})();

/**
 * setTimeout(f,0)的应用场景一，改变事件执行顺序
 */

var input=document.getElementById("my_button");
input.onclick=function A(){
  // setTimeout(function B(){
    input.value+="input";
  // },0);
}
document.body.onclick=function C(){
  input.value+="body";
}

/**
 * setTimeout(f,0)应用场景二
 * 背景：有时用户自定义的函数，先于浏览器默认动作执行
 * 例如：下面代码中，只能将用户之前输入的字母转为大写，因为keypress事件会在浏览器接收文本之前就触发
 */

document.getElementById("input_box").onkeypress=function(event){
  // 错误的写法
  // this.value=this.value.toUpperCase()

  // 正确的写法
  // 将当前DOM元素绑定到变量self，否则setTimeout的回调函数中的this指向全局对象
  let self=this;
  setTimeout(function(){
    self.value=self.value.toUpperCase();
  },0);
}

 /**
  * setTimeout(f,0)应用场景三，处理计算量大，耗时长的任务，把它分成若干任务分别放大setTimeout(f,0)中执行
  */

 var div = document.getElementsByTagName('div')[0];
// 写法一
/*
for (var i = 0xA00000; i < 0xFFFFFF; i++) {
  div.style.backgroundColor = '#' + i.toString(16);
}
*/

// 写法二
var timer;
var i=0x100000;
function func() {
  timer = setTimeout(func, 0);
  div.style.backgroundColor = '#' + i.toString(16);
  if (i++ == 0xFFFFFF) clearTimeout(timer);
}
// timer = setTimeout(func, 0);
