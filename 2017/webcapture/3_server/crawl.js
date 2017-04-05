"use strict";

const phantom = require('phantom');
const co = require('co');
const CrawlModel = require('./db');

/**
 * @name task
 * @description 按关键字抓取页面
 * @param keyword {String} 关键字
 * 
 * @return {Object} 抓取结果
 * */
function* task(keyword){
	let t = Date.now();
	try{
		let url = `https://www.baidu.com/s?wd=${keyword}`;
		
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
			time: Date.now() - t,
			dataList: dataList
		};
		return result
		yield ph.exit();
	}catch(err){
		return {
			code: 0,
			msg: '抓取失败',
			err: err.msg, 
			time: Date.now()-t,
			word: keyword
		};
	}
	
}

/**
 * @name crawl
 * @description 将抓取页面结果保存至数据库
 * @param keyword {String} 关键字
 * @param callback {Function} 回调函数，将保存数据后返回参数传入
 * */
function crawl(keyword, callback){
	co(task(keyword)).then(result => {
		var cr = new CrawlModel(result);
		cr.save(callback);
	}).catch(err => { // co返回的promise对象在node7版本中需要有catch来捕获error
		console.log(err);
	})
}

module.exports = crawl;