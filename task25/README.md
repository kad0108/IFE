##任务描述 [demo](https://kad0108.github.io/IFE/task25)

* 基于任务24的基本代码，实现一个树形组件，可参考如图示例，样式自定义，不做限制
* 要求有以下功能：
* 节点的折叠与展开
* 允许增加节点与删除节点
* 按照内容进行节点查找，并且把找到的节点进行特殊样式呈现，如果找到的节点处于被父节点折叠隐藏的状态，则需要做对应的展开

##知识点

* 使用iconfont图标库，不同字体格式类型讲解见[这里](http://jingyan.baidu.com/article/3065b3b6e9b2d9becff8a4c1.html)
* children和childNodes都返回子节点集合，区别是childNodes会返回文本节点。
* querySelector()返回匹配选择器的第一个元素，querySelectorAll()返回所有的元素。效率比getElementsByClassName高。但没有getElementById高。
* indexOf()对大小写敏感