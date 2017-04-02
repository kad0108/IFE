"use strict";

const phantom = require('phantom');
const co = require('co');

/**
 * @name task
 * @description 按关键字抓取页面
 * @param keyword {String} 关键字
 * 
 * @return {Object} 抓取结果
 * */
function* crawl(keyword){
	try{
		let url = `https://www.baidu.com/s?wd=${keyword}`;
		let t = Date.now();

		const ph = yield phantom.create();
		const page = yield ph.createPage();
		const status = yield page.open(url);

		if(status !== 'success') throw Error({msg: '网页访问失败'});

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
	
}

module.exports = crawl;