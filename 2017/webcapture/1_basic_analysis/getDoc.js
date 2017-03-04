var page = require('webpage').create(),
	system = require('system'),
	t = Date.now(),
	address = "https://www.baidu.com/s?wd=",
	result;

if(system.args.length == 1){
	console.log('Keyword should be entered.');
	phantom.exit();
}

var keyword = system.args[1];
address += keyword;
phantom.outputEncoding="gbk";

console.log('URL: ' + address);

// page.onConsoleMessage = function(msg){
// 	console.log('Message from webpage: ' + msg);
// }

page.open(address, function(status){
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
		page.includeJs('../util.js', function(){
			var dataList = page.evaluate(function(){
				var lists = $('.c-container'), 
					data = [];
				[].forEach.call(lists, function(item, index){
					var imgele = $('.c-img', item);
					data.push({
						title: $('h3>a', item)[0].innerText,
						info: $('.c-abstract', item)[0].innerText,
						link: $('.c-showurl', item)[0].href,
						pic: imgele.length ? imgele[0].src : '',
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
			phantom.exit();//page.includeJs是异步的，所以不能把这句放在page.open的最后
		})
	}
})
