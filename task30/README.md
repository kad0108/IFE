##任务描述 [demo](https://kad0108.github.io/IFE/task30)

**尝试用vue实现了表单验证，这是自己用vue实现的第一个任务，应该有很多可以改进的地方。**

##知识点

* 将表单以submit按钮提交，提交整个form，其中设置了name的元素可以直接调用。
* charCodeAt方法返回一个数字，表示给定索引处的字符的unicode值，前128个unicode码点与ASCII字符编码匹配。一个汉字是2个字符。
* px相对于显示器屏幕分辨率。em相对于浏览器默认字体尺寸，会继承父级元素字体大小。rem相对于body，不继承。推荐使用rem。
* 字符串连接用'\'，比用'+'简洁。
```
'\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
'
```

##学习资料

* [JavaScript 表单验证](http://www.w3school.com.cn/js/js_form_validation.asp)
* [Vue.js](https://cn.vuejs.org/v2/guide/)

