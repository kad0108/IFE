"use strict";

const phantom = require('phantom');
const device = require('./device.json');
const co = require('co');

let keyword = 'phantomjs';
let url = `https://www.baidu.com/s?wd=${keyword}`;
let dev = device['iphone6'];
let t = Date.now();

co(function* (){
	try{
		const ph = yield phantom.create();
		const page = yield ph.createPage();
		const status = yield page.open(url);

		if(status !== 'success') throw Error({msg: '网页访问失败'});

		// page.settings.userAgent = dev.userAgent;
		// page.viewportSize = {
		// 	width: dev.width,
		// 	height: dev.height
		// };
		page.setting('userAgent', device.userAgent);
		page.property('viewportSize', {
			width: dev.width,
			height: dev.height
		});

		let dataList = yield page.evaluate(function(){
			var data = $('.c-container').map(function(){
				return {
					title: $(this).find('h3>a').text() || '',
					info: $(this).find('.c-abstract').text() || '',
					link: $(this).find('.c-showurl').attr('href') || '',
					pic: $(this).find('.c-img').attr('src') || '',
				};
			}).toArray();
			return data;
		})

		let result = {
			code: 1,
			msg: '抓取成功',
			word: keyword,
			device: dev,
			time: Date.now() - t,
			dataList: dataList
		};
		console.dir(result);
		yield ph.exit();
	}catch(err){
		console.log(JSON.stringify({
			code: 0,
			msg: '抓取失败',
			err: err.msg, 
			time: Date.now()-t,
			word: keyword,
			device: dev
		}));
	}
	
})