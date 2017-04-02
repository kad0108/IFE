## 任务描述 [demo](https://kad0108.github.io/IFE/2016/task25)

* 基于任务24的基本代码，实现一个树形组件，可参考如图示例，样式自定义，不做限制
* 要求有以下功能：
* 节点的折叠与展开
* 允许增加节点与删除节点
* 按照内容进行节点查找，并且把找到的节点进行特殊样式呈现，如果找到的节点处于被父节点折叠隐藏的状态，则需要做对应的展开

## 知识点

* 使用iconfont图标库，不同字体格式类型讲解见[这里](http://jingyan.baidu.com/article/3065b3b6e9b2d9becff8a4c1.html)
* 尾部添加子节点appendChild()，在某个子节点前插入子节点insertBefore()，移除子节点removeChild()，替换节点replaceChild()，获取父节点parentNode。
* children和childNodes都返回子节点集合，区别是childNodes会返回文本节点。
* parentNode返回父节点
* querySelector()返回匹配选择器的第一个元素，querySelectorAll()返回所有的元素。效率比getElementsByClassName高。但没有getElementById高。
* indexOf()对大小写敏感，要检索的字符串值没有出现，则该方法返回-1。
* replace方法返回替换后的新串。
* prompt() 方法用于显示可提示用户进行输入的对话框，取消返回null。
* 数组的一些常用方法：shift()删除并返回第一个元素，unshift()添加元素到数组开头，join()以指定的分隔符连接数组元素，slice()返回选定的元素，splice()删除元素并添加新元素。
