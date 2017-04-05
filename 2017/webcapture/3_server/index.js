"use strict";

const http = require("http");
const querystring = require('querystring');
const db = require('./db');
const crawl = require('./crawl');
const co = require('co');

http.createServer(function(request, response) { 
	let data = request.url.split('?')[1];
	let req = querystring.parse(data);
	// console.log(req.keyword);
	let code;
	crawl(req.keyword, (err, data) => {
		if(err) response.end(JSON.stringify({code: 0, msg: '保存失败'}));
		else response.end(JSON.stringify({code: 1, msg: '保存成功'}));
	})

}).listen(8899, function(){
	console.log('server started');
});
