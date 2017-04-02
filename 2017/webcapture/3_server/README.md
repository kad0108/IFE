## 知识点

* HTTP Request分为4个部分，URL、Method、Headers、Body。

* POST请求获取Request Body：
```
http.createServer(function(request, response) {
	let data = '';
	request.on('error', function(err) {
		console.error(err);
	}).on('data', function(chunk) {
		data += chunk; // chunk is a buffer
	}).on('end', function() {
		console.log(data);
		response.end('received');
	});
}).listen(8899, function(){
	console.log('server started');
});
```

## 参考

[Node HTTP Request](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body)
