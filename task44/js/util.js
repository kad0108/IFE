/*
* 实现获取图片，加载完毕渲染页面，依赖文件500px.js
*/
function getPhotos(page, callback){
	_500px.api('/photos', { feature: 'popular', sort: 'created_at', page: page, image_size: [3,1080], 
		include_store: 'store_download', include_states: 'voted'}, function (response) {

		var data = response.data.photos;
		loadImage(data, callback);
	});
}	

function loadImage(data, callback){
	var photos = [];
	var cot = 20;//当20张图片都加载完执行回调函数
	for(var i = 0; i < data.length; i++){
		photos[i] = new Object();
		photos[i].name = data[i].name === 'Untitled' ? 'Picture' : data[i].name;
		photos[i].aspect_ratio = data[i].width / data[i].height;//宽高比
		photos[i].image_url = data[i].image_url;
		photos[i].large_url = data[i].images[1].url;//高清图url
		photos[i].$img = new Image();
		photos[i].$img.src = data[i].image_url;
		photos[i].$img.onload = function(){
			cot--;
			if(!cot){
				callback(photos);
			}
		}
	}
}