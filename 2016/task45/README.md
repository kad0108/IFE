##任务描述 [demo](https://kad0108.github.io/IFE/task45)

#### 实现向第三方图片源500px请求图片资源，会出现每次刷新图片不同的情况，考虑到500px是国外服务器也会出现图片加载失败的情况。这个木桶布局同一张图片直接请求了一个高清图image_size的url，所以第一次加载会很慢，但是大图显示时就不需要额外加载等待了。

实现分为三个模块：Bucket实现木桶布局，Modal是大图显示，Application应用层对各模块进行组织以及页面逻辑的实现。Modal和Application模块直接复用了上一个任务的代码。Bucket的实现原理是：先定一个每行的最小高度，根据容器宽度计算出宽高比，对拿到的图片的宽高比进行累加，一旦累加和超过容器长宽比，就将之前累加的这些图片作为一行。然后根据这个累加的宽高比和容器宽度计算出实际的高度，每个照片的宽度就是自适应的。

<br/>
* 参考如下设计图，使用JavaScript、CSS，实现如图的木桶布局。我们在一些摄影网站（如 500px、flickr 等）有时会看到如下图的布局，每张图片的占位长宽比和图片本身的长宽比是一致的；每一行的高度是不固定的，但是要尽可能接近；每行的图片数也是不同的，在一定范围内（这题中我们规定每行 3-6 张，最后一行除外）通过控制图片是否加入当前行，保证行高尽可能接近。这里我们方便起见给这种布局起名叫“木桶布局”，因为它和木桶一样，不在乎你放多少块木头，以及不同圈的木头高度是否一致，只要每圈都把桶围成同样宽度。
* ![设计图](http://7xrp04.com1.z0.glb.clouddn.com/task_3_45_1.png)
* 实现封装为一个JavaScript的库

##参考资料

* [500px image_size设置](https://github.com/500px/api-documentation/blob/master/basics/formats_and_terms.md#image-urls-and-image-sizes)
* [linear-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient)

##知识点

* ```CSS linear-gradient()```函数创建一个线性渐变颜色的```<image>```，参数：渐变线起始位置、渐变角度、[colors]，eg:```background-image: linear-gradient(45deg, blue, red);```