## Web Capture —— device simulation

### 任务

记录不同device对应的尺寸信息和userAgent，增加一个参数，表示device信息，taskjs中，解析该参数并从配置文件找到对应的ua和尺寸，完成设置后再抓取

### 运行

```
npm install

node task.js
```

### BOM: 和浏览器交互

所有JS全局对象、变量都是window对象的成员，包括DOM的document

* 获取window尺寸

	获取浏览器窗口宽度，兼容所有浏览器，不包括工具栏、滚动条
	```
	var w=window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;
	```

* window.frames 属性返回窗口中所有命名的框架，一般用来获取窗口中的iframe

* window.screen有关用户屏幕信息

* window.location后去当前页面地址，并把浏览器重定向到新的页面

* window.history浏览器历史

* window.navigator有关访问者浏览器信息,**window.navigator.userAgent**

* window.alert警告框，window.confirm确认框，window.prompt提示框

* 定时：setTimeout、setInterval


### 知识点 

* npm和node更新，不适用window上更新，[详见这里](http://stackoverflow.com/questions/18412129/how-do-i-update-node-and-npm-on-windows)
	```
	npm update –g

	npm install –g n
	n latest
	```

* 有关package.json中依赖包版本写法：
	```
	In the simplest terms, the tilde matches the most recent minor version (the middle number). ~1.2.3 will match all 1.2.x versions but will miss 1.3.0.

	The caret, on the other hand, is more relaxed. It will update you to the most recent major version (the first number). ^1.2.3 will match any 1.x.x release including 1.3.0, but will hold off on 2.0.0.
	```

* ES6中的[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)

* [Generator与co](http://es6.ruanyifeng.com/#docs/generator-async)

### 返回结果
```
{ code: 1,
  msg: '抓取成功',
  word: 'phantomjs',
  device:
   { width: 375,
     height: 667,
     userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebK
it/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' },
  time: 2670,
  dataList:
   [ { info: 'PhantomJS is a headless WebKit scriptable with a JavaScript API. I
t has fast and native support for various web standards: DOM handling, CSS selec
tor, ...',
       link: 'http://www.baidu.com/link?url=vP5ZpyxH66wp3eUy-JDb-IgskD4DVHLe8oN-
w5CUBpW',
       pic: '',
       title: 'PhantomJS | PhantomJS' },
     { info: 'The executable phantomjs.exe is ready to use.Note: For this static
 build, the binary is self-contained with no external dependency. It will run on
 a...',
       link: 'http://www.baidu.com/link?url=y3mNgO-u4tIzP3y4DR-Wemb9uxk-5oKWLUz1
1-E5Mm1y_TZMvanHeonR9Qg8EkXS',
       pic: '',
       title: 'Download | PhantomJS' },
     { info: ' D Who\'s using PhantomJS? D Related Projects  Contribute D Contri
buting  D Source Code  D Test Suite  D Release Preparation  D Crash Reporting  D
 ...',
       link: 'http://www.baidu.com/link?url=sIjyhPsqv9awSjWQxgaWSskU_idKA0GSFFMY
spImPpT4Kx9RjIr-yXcvoNEO7TbC',
       pic: '',
       title: 'Documentation | PhantomJS' },
     { info: '2016年4月14日 -  主题 PhantomJS PhantomJS 是一个脚本化的无界面 W
ebKit,以 JavaScript 为脚本语言实现各项功能,官方列举的使用场景包括:无界面测试,页
面自动化,屏幕...',
       link: 'http://www.baidu.com/link?url=88FCKEp5_RWfe7lTisBjWQMOKg0SHmrMXb5F
uMlrv7_-HBLFoR1m8sLyt1cdXXtslOinfNBIEHVrOPshFB5TJq',
       pic: '',
       title: 'PhantomJS - 推酷' },
     { info: ' PhantomJS is free software/open source, and is distributed under
the BSD license. It contains third-party code, see the included third-party.txt
file ...',
       link: 'http://www.baidu.com/link?url=VWvkW-MIAWqufTaSi3UctWRxbmK0rFIKgY-E
amcF6aTTJQec7y9rOV1MDe6o-zX5',
       pic: '',
       title: 'GitHub - ariya/phantomjs: Scriptable Headless WebKit' },
     { info: '首页  开源项目  国产开源项目 项目分类 最新收录项目 Java 开源软件 C
# 开源软件 PHP 开源软件 C/C++ 开源软件 Ruby 开源软件 Python 开源软件 Go开源软件
JS...',
       link: 'http://www.baidu.com/link?url=WKbBnTqvdVhEQJxaiB1DUaelrR85cwAPRLZQ
lCm548bH-pf41QosarR5N1NMDkn9',
       pic: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=1209621937,4193545017&f
m=85&s=29C13B620BECA4CE1C449002030080C1',
       title: 'PhantomJS首页、文档和下载 - WebKit 的服务器端 API - 开源中国...'
},
     { info: 'This error means that something went wrong with your internet conn
ection, and the installer was not able to download the PhantomJS binary for your
 platform...',
       link: 'http://www.baidu.com/link?url=X3AGwR_ckF9uQjMBojeb-v8ITlfZeq0gCKqN
b_zOlM5YCWYXbVc4zJOnAzezO6Gn',
       pic: '',
       title: 'phantomjs' },
     { info: ' This error means that something went wrong with your internet con
nection, and the installer was not able to download the PhantomJS binary for you
r ...',
       link: 'http://www.baidu.com/link?url=adMapsLL-xDzAbP7OmZu8k_bhmYs3u1bu3eJ
ZSJeJhYG3Xl2uzL47r02OY4s78QB',
       pic: '',
       title: 'phantomjs' },
     { info: 'webpage模块是PhantomJS的核心模块,用于网页操作。var webPage = requi
re(\'webpage\'); var page = webPage.create(); 上面代码表示加载PhantomJS的webpage
模块,并创建...',
       link: 'http://www.baidu.com/link?url=SEJgArIbG8e5QVYhxVaq48au4Kg5b_M2PpYv
hRlv_ha6MZedeOKVkuVEokIx3z3K-hG0z4rOYtD8LkjSn3lBXK',
       pic: '',
       title: 'PhantomJS -- JavaScript 标准参考教程(alpha)' },
     { info: 'The major and minor number tracks the version of PhantomJS that wi
ll be installed. The patch number is incremented when there is either an install
er ...',
       link: 'http://www.baidu.com/link?url=mSwdcV-91aTFG9R9as3G6q0_1bftZgWeH4ec
NfCQ7eila_KMkC0OlXQ8ZzDN3CEb',
       pic: '',
       title: 'GitHub - Medium/phantomjs: NPM wrapper for installing phantomjs'
} ] }
```
