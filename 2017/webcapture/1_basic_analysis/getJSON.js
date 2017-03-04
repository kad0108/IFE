var page = require('webpage').create(),
	system = require('system'),
	t = Date.now(),
	url = 'https://www.baidu.com/s?tn=json&wd=',
	result;

if(system.args.length == 1){
	console.log('Keyword should be entered.');
	phantom.exit();
}

var keyword = system.args[1];
url += keyword;
phantom.outputEncoding="gbk";

page.onConsoleMessage = function(msg){
	console.log('Message from webpage: ' + msg);
}

page.open(url, function(status){
	if(status !== 'success'){
		result = {
			code: 0,
			msg: '抓取失败',
			word: keyword,
			time: Date.now() - t,
			dataList: []
		}
		console.log('Result: ' + JSON.stringify(result, null, 4));
		phantom.exit();
	}else{
		// var json = JSON.parse(page.plainText);
		var dataList = page.evaluate(function(){
			// console.log(page.content);
			var json = eval('(' + document.body.innerText + ')');
			var lists = json.feed.entry;
			var data = [];
			lists.forEach(function(item){
				data.push({
					title: item.title,
					info: item.abs,
					link: item.url,
					pic: item.imgUrl
				})
			})
			return data;
		})
		result = {
			code: 1,
			msg: '抓取成功',
			word: keyword,
			time: Date.now() - t,
			dataList: dataList
		}
		console.log('Result: ' + JSON.stringify(result, null, 4));
		phantom.exit();
	}
});