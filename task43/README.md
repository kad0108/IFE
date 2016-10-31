##任务描述 [demo](https://kad0108.github.io/IFE/task43)

* 参考下方设计图，使用JavaScript、CSS，实现在不同图片数量时的不同布局
* 实现封装为一个JavaScript的库
* ![设计图](http://7xrp04.com1.z0.glb.clouddn.com/task_3_43_1.png)

##知识点

* clip-path属性实现剪切效果，起笔点和落笔点连线剪切出的图形。
* 用CSS3实现了几种loading效果，[看这里](https://github.com/kad0108/Html5/tree/gh-pages/loading)
* cover是背景铺满元素，调整图片宽高的较小者铺满。contain是元素包含整个图片，调整图片宽高的较大者使背景图片完全包含在元素中。
* object-fit和background-size属性的区别

```
object是指替换元素，object-fit用于设置<img src="">元素的图像尺寸
background-size用于设置<div style="background-image: url('')">元素的背景图像尺寸，但是background-image元素在右键菜单中并不会被当作图片处理
```

* 一般的图片剪裁，都会在firefox下有兼容性问题，解决方法是创建svg。

##参考

![clip-path属性介绍](clip-path.png)

[CSS3 clip-path polygon图形构建与动画变换](http://www.zhangxinxu.com/wordpress/2015/03/css3-clip-path-polygon-shape-transition-animation/)

[CSS clip-path maker](http://bennettfeely.com/clippy/)

[clip-path详解](http://www.tuicool.com/articles/E3IRbmJ)

[clip-path VS svg](http://www.w3cplus.com/css3/creating-responsive-shapes-with-clip-path.html)

[CSS3 object-x属性](http://www.zhangxinxu.com/wordpress/2015/03/css3-object-position-object-fit/comment-page-1/)

