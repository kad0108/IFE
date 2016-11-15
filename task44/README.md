##任务描述 [demo](https://kad0108.github.io/IFE/task44)

### 实现向第三方图片源500px请求图片资源，会出现每次刷新图片不同的情况，考虑到500px是国外服务器也会出现图片加载失败的情况。同一张图片请求了两个image_size的url，一个像素小用来加载瀑布流减少缓冲时间，一个是高清图用来全屏显示。实现分为三个模块：Waterfall实现瀑布流布局，Modal是大图显示，Application应用层对各模块进行组织以及页面逻辑的实现。

* 参考如下设计图，使用JavaScript、CSS，实现如图的瀑布布局
* ![设计图](http://7xrp04.com1.z0.glb.clouddn.com/task_3_44_1.png)
* 实现封装为一个JavaScript的库
* 在瀑布式布局中，每一栏的宽度是相同的，下图中的黑色数字表示图片被添加的顺序
* 每次添加新的图片时，都将其放在高度最小的一栏，以保证每一栏的高度尽可能相近。
* 点击一张图片后，全屏显示该图（有能力的同学可以适当增加动画效果）。黑色遮罩的不透明度是 80%，点击黑色部分退出全屏浏览。
* 有能力的同学可以实现，当页面滚动到瀑布图最下方后，通过Ajax动态加载下一批图片

##参考资料

* [Jquery.waterfall demo](http://dfcreative.github.io/projects/waterfall/)
* [PLACEHOLD.IT 用来占位的不同大小的图片生成工具](https://placehold.it/)
* [500px API](https://github.com/500px/api-documentation)
* [image_size](https://github.com/500px/api-documentation/blob/master/basics/formats_and_terms.md#image-urls-and-image-sizes)

##知识点

* CSS3 [aspect-ratio](http://www.w3chtml.com/css3/properties/madia-queries/aspect-ratio.html) 属性 指浏览器可见页面宽度和高度的比率
* 图片源是一些摄影网站，比如500px、flickr、Pinterest等
* 看review真的能看到好多自己不知道的东西，比如[文档注释JSDoc](http://www.css88.com/doc/jsdoc/index.html)，[a pure Javascript template plugin with methods and default settings](http://stackoverflow.com/questions/14362047/vanilla-js-plugin-template)，[JS面向对象的写法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)，[Promise处理JS回调](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，[coding云端开发](https://coding.net/)
* 参考的队伍自己用node搭了一个[图片接口服务器](https://github.com/qiuxiang/gallery-server)，是用[express](http://www.expressjs.com.cn/)框架搭的，NodeJS的知识还有待学习啊。
* window.innerWidth属性是窗口文档显示区宽度，IE不支持该属性可用document.body.clientWidth代替。
* bind的作用，修改上下文的this。

```
对比两段代码：
var button = document.getElementById("button");
button.onclick = function() {
    alert(this.id); // 弹出button
};

var button = document.getElementById("button"),
    text = document.getElementById("text");
button.onclick = function() {
    alert(this.id); // 弹出text
}.bind(text);

自己的理解：bind就是将函数中的this从绑定事件的对象改变为bind的对象。
```

* 移除元素class两种写法：

```
$modal.className = self.$modal.className.replace(/ active/, '');
$modal.classList.remove('active');
```

* 点击弹出层显示之后禁止页面滚动：```overflow:hidden; height: 100%;```