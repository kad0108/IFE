# Task50 [demo](https://kad0108.github.io/IFE/task50)

> A Vue.js project. 基本功能的初步实现，只用到了基本的```vue + vue-router```，还需要继续改进加入```vuex + SCSS```。用了不到两周的零散时间做完，最开始入手时还觉得不知道该怎么实现，一点一点功能实现，做完再回过头来看，其实也没有多难。总把一个大问题看的太难，其实拆分成一小步一小步做就好了。之后就慢慢对这个单页应用做改进啦~~


## Vue+Webpack

使用vue-cli(脚手架，自动生成模板工程)官方提供的命令行工具：

```bash
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$  vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev
```

* vue的template中的```export default{}```编译时会自动生成new Vue({})

* index.html中应该是默认调用src/main.js这个文件

* main.js中```import App from './App'```引入的就是App.vue这个文件，import是ES6的语法，等价于```var App = require('./App')```

* ```npm install```安装的依赖包是node_modules这个文件，```import Vue from vue```就在这个目录下

* vue中注册的组件命名是驼峰的写法，在html中会转换为小写和横杠的写法

* ```.vue```文件就是一个组件：```template + script + style```，组件的data必须是函数，```data () {}```是ES6的语法，相当于```data: function(){}```

* run的时候一路enter下来的结果就是eslint语法检查太严格了。。。

* 父组件向子组件传数据```props```，子组件向父组件传数据```$emit(触发事件)```

* el选项提供将页面上已存在的DOM元素作为Vue实例的挂载目标，vue2.0中所有的挂载元素会被Vue生成的Dom替换，不推荐将vue实例挂载到<html>或<body>上

* main.js中渲染模板的两种写法：template | render

  ```vue
  import Vue from 'vue'
  import App from './App'

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    template: '<App></App>',
    components: { App }
  })
  ```

  ```vue
  import Vue from 'vue'
  import App from './App'

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    components: { App },
    render (createElement) {
      return createElement('app')
    }
  })
  ```



## [Vue-router](http://router.vuejs.org/zh-cn/essentials/getting-started.html)

**路由的作用就是转发信息**

```npm install vue-router
npm install vue-router
```

使用 Vue.js 时，我们就已经把组件组合成一个应用了，当你要把 vue-router 加进来，只需要配置组件和路由映射，然后告诉 vue-router 在哪里渲染它们。直接看样例：

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 定义组件
const Home = { template: '<div>This is Home</div>' }
const Foo = { template: '<div>This is Foo</div>' }
const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }
// 创建router实例
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  // 定义路由
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})
// 创建和挂载根实例
new Vue({
  router,
  template: `
    <div id="app">
      <h1>Named Routes</h1>
      <p>Current route name: {{ $route.name }}</p>
      <ul>
        <li><router-link :to="{ name: 'home' }">home</router-link></li>
        <li><router-link :to="{ name: 'foo' }">foo</router-link></li>
        <li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
```

* import导入vue-router必须通过```Vue.use(VueRouter)```明确安装路由功能，如果是全局的script标签则不需要
* 动态路径参数 以冒号开头```path: '/user/:id'```
* 嵌套路由：<router-view>是组件渲染的出口，嵌套路由配置的嵌套组件在VueRouter的参数中配置children，而且也可以有自己嵌套的<router-view>
* 编程式导航，这部分内容和Html5 History API基本完全相同。点击<router-link>时会内部调用router.push()方法。




## [Vuex](http://vuex.vuejs.org/zh-cn/intro.html)

**vuex是vue.js的状态管理模式，集中存储管理应用的所有组件的状态。** 

```
npm install vuex
```

单个组件内是单向数据流：state(data)->view(template)->actions(methods)->state(data)，当多个组件共享状态时，有很多问题，解决方法是把组件的共享状态抽取出来，以全局单例模式管理，这就是vuex的基本思想。

![vuex](http://vuex.vuejs.org/zh-cn/images/vuex.png)

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
// store.commit方法触发状态变更
store.commit('increment')
// store.state获取状态对象
console.log(store.state.count)
```

* Vuex的核心是store，包含着应用中大部分的状态。改变store中的状态的唯一途径是显式地提交mutations

* 字符串模板使用反撇号`，较普通字符串多了插值功能```${var}``` 

  ​

## [vue-resource](https://github.com/pagekit/vue-resource)

网络请求模块，为单页应用渲染动态数据



## [Webpack](http://www.jianshu.com/p/42e11515c10f#)

package.json文件是npm说明文件，```npm init```自动创建。貌似package.json文件中不能加注释。

[什么是source maps ](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html) 提供对应编译文件和源文件的方法，方便压缩代码后进行调试。在webpack.config.js文件中的devtool属性配置。

webpack.config.js是webpack的配置文件，包含入口文件路径和打包文件路径。

打包命令package文件中配置后，可以使用配置的命令```npm start```，也可以直接```webpack```打包。

安装webpack-dev-server时需要的webpack版本不存在，解决方法```npm install --save-dev webpack-dev-server@1.9.0```，运行server的命令为```webpack-dev-server```，webpack的本地服务器基于nodejs搭建，默认端口8080。

Loaders是webpack中对各种格式的文件进行处理。eg: scss to css, es6 to es5, json to js等。

配置json-loader： ```npm install --save-dev json-loader```，这个好像得在项目目录下执行才好使。在webpack.config.js文件中的module属性配置。

配置babel：babel的配置选项放在".babelrc"文件中。

配置css-loader： ```npm install --save-dev style-loader css-loader```，这里还有点问题，先留着。



## [Echarts](http://echarts.baidu.com/tutorial.html#ECharts%20%E7%89%B9%E6%80%A7%E4%BB%8B%E7%BB%8D)

[Echarts JS代码下载](http://echarts.baidu.com/download.html)

```
npm install echarts --save
```

[按需引入模块列表](https://github.com/ecomfe/echarts/blob/master/index.js)

通过npm安装的echarts，需要在项目代码中````require('echarts')` ```或```import echarts from 'echarts'```



## 知识点

* let和const特性：块级作用域，不存在变量提升

* 弹性盒子父元素设置```display: flex;-webkit-align-items: center;```，子元素y轴居中对齐

* 在做问题复用这个功能时，再次遇到引用类型的拷贝，简单的复制会出现对一个问题做修改会同步到另一个复用的问题上，则需要进行对象的深拷贝。

* create.vue中添加问题的type这儿本来想用v-for实现的，结果返回的icon代码字符串无法在html中正常解析，不知道怎么解决。。。

* input的focus触发时，选中文本```onfocus="this.select()"```

* ```Date.now()相当于new Date().getTime()```返回自1970年1月1日至今的毫秒数，```Date()```直接返回当前时间字符串

* new Date(year, month, day)传入下个月的第0天就返回这个月的最后一天，也就是这个月总共的天数

* Vue属性created在实例被创建完成之后调用，用来初始化数据

* 子组件向父组件传递信息，通过$emit来触发父组件的某个事件，从而父组件去执行这个事件对应的方法

* rem相对html/body的字体尺寸，1rem=16px

* v-link是vue1.0的写法，vue2.0路由设置是<router-link>组件，可通过tag属性生成别的标签

* 在一个VueComponent实例中，```this.$route```是路由信息；```this.$router```是对路由进行操作，编程式导航就需要使用router的实例方法。

* 感觉弹出浮出层这里可以用到vuex，先把基本功能都实现了再回来改进。

* 深度监听时只监听formList无法同步userId，所以暂时去掉userId这个属性了。

* 不可以在子组件中修改props传过来的属性！！！

* Modal组件和调用Modal的父组件之间的通信感觉还能更优化，现在的能力还提不出更好的解决方法（子组件和父组件都操纵着子组件的show和hide）。

* 刚改变完watch的属性值，就路由跳转，出现问题，watch可能没来得及处理完就直接跳走了，所以做了**延时跳转**，因为setTimeout改变了this的作用域，导致路由跳转不好使了，所以采用箭头函数，**箭头函数体内的this对象是定义时所在的对象，而不是使用时所在的对象**。

* Question组件分割出来，想了很久，一开始觉得父组件把form传给Question组件，编辑功能又需要Q组件内对form进行修改，数据同步会出现问题，但是后来发现一个很神奇的地方，自己单独做了测试，看代码![子组件可修改引用类数据](props.png)

  测试表明：传数组给子组件，add方法没报错，edit方法没报错（控制台输出test.que修改数据已同步给父组件），override报错。**即父组件把引用类数据传给子组件，可修改但不可重写。**

  所以这个Q组件的实现，就是在子组件内对父组件传过来的form数组进行修改，因为本身引用类的数据指向的是同一个内存地址，所以修改同步。

* Modal组件在实现删除问卷功能时也借鉴了上一点同样的思想，因为删除问卷有个index值，因为要弹框提醒，所以需要把index传给子组件，隐藏弹框时再把子组件传回给父组件中的触发事件，这样做太费劲，所以直接把删除执行的函数传给了子组件。

* 做编辑功能，我想提取到当前问卷的id，两种写法```this.$route.path.replace(/[^0-9]/ig, '')```，```this.$route.path.replace(/\/edit\//, '')```，前一种写法是匹配未包含的字符，比如```[^abc]匹配‘plain’中的a```，所以前一种写法更通用。

* v-model不支持动态绑定input的type，所以改为用v-if

* 在写填写问卷功能时就考虑开始用echarts了，echarts需要什么格式的数据渲染图表。因为图表要展示题目的选项选择比例情况，所以每个用户填写问卷的具体内容是什么其实并不需要记录，只需要记录每个选项被选择过多少次即可，对于文本题要展示有效回答比例，则再多加一个属性记录这个问卷一共被填写过多少次。



