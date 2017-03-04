## Web Capture —— basic analysis

> 实现根据传入的参数（关键字），抓取百度第一页对应该关键字的搜索结果。将结果输出为json string回显。

> json格式为：

```
{
   code: 1, //返回状态码，1为成功，0为失败
   msg: '抓取成功', //返回的信息
   word: '示例关键字', //抓取的关键字
   time: 2000, //任务的时间
   dataList:[   //抓取结果列表
       {
           title: 'xx',  //结果条目的标题
           info: ‘’, //摘要
           link: ‘’, //链接            
           pic: '' //缩略图地址
           }
   ]
}
```

GitBash里运行各种报错，换成在cmd里就能正常运行。然后就看到了这句话：**!!run it from the command line, not the REPL.** 

运行命令：
```bash
phantomjs getDoc.js keyword
phantomjs getJSON.js keyword
```
很明显抓取json响应时间要比抓取document网页内容要快很多。

[node-phantom](https://www.npmjs.com/package/node-phantom)

[phantomjs文档](http://phantomjs.org/api/webpage/method/include-js.html)

[phantomjs属性说明](http://www.tuicool.com/articles/nieEVv)

## PhantomJS Quick Start

**load example.com and save it as an image**

```
var page = require('webpage').create();

page.open('http://phantomjs.org', function(status){
	console.log('Status: ' + status);
	if(status === 'success'){
		page.render('example.png');
	}
	phantom.exit();
})
```

**load a URL and measures the time it takes to load it**

```
var page = require('webpage').create(),
	system = require('system'),
	t,
	address;
if(system.args.length == 1){//获取运行phantomjs时传入的所有参数
	console.log('Usage: loadspeed.js <some URL>');
	phantom.exit();
}
t = Date.now();
address = system.args[1];
page.open(address, function(status){
	if(status !== 'success'){
		console.log('Fail to load the addres');
	}else{
		t = Date.now() - t;
		console.log('Loading ' + system.args[1]);
		console.log('Loading time ' + t + 'msec');
	}
	phantom.exit();
})
```

**show the title of a web page**

```
var page = require('webpage').create();
page.onConsoleMessage = function(msg){
	console.log('Page title is ' + msg);
}
page.open('http://phantomjs.org', function(status){
	// var title = page.evaluate(function(){
	// 	return document.title;
	// });
	// console.log('Page title is ' + title);

	page.evaluate(function(){
		console.log(document.title);
	})
	phantom.exit();
})
```

**Network Requests and Responses**

```
var page = require('webpage').create();
page.onResourceRequested = function(request){
	console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response){
	console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
page.open('http://phantomjs.org');
```