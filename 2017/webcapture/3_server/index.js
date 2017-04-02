"use strict";

const http = require("http");
const querystring = require('querystring');
const db = require('./db');
const crawl = require('./crawl');
const co = require('co');


// var process = require('process');
// var keyword = process.argv[2];// 接收node命令行参数
// console.log(keyword);

http.createServer(function(request, response) { 
	let data = request.url.split('?')[1];
	let req = querystring.parse(data);
	console.log(req.keyword);
	request.on('end', function*(){
		console.log('TEST');
		let result = yield crawl(req.keyword);
		console.log(req);
		console.log(result);
		response.end(result);
	})

	
	// try{
		
		
	// }catch(err){
	// 	response.end({msg: 'error'});
	// }
	// console.log(req);
	// let result = yield crawl(req.keyword);
	// console.log(req);
	// console.log(result);
	// response.end(result);

}).listen(8899, function(){
	console.log('server started');
});
