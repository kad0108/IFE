/*
* 瀑布流布局模块
*/
function Waterfall(selector, col, photos){
	this.ele = selector;
	this.col = col;
	this.init();
}
//初始化栏
Waterfall.prototype.init = function(){
	var width = this.ele.clientWidth / this.col;
	for(var i = 0; i < this.col; i++){
		var div = document.createElement('div');
		div.className = 'gallery-column';
		div.style.width = width + 'px';
		this.ele.appendChild(div);
	}
	this.columns = $('.gallery-column', this.ele);
}
//返回当前高度最小的一栏
Waterfall.prototype.getMinColumn = function(){
	var min = this.columns[0];
	for(var i = 0; i < this.columns.length; i++){
		if(this.columns[i].clientHeight < min.clientHeight){
			min = this.columns[i];
		}
	}
	return min;
}
//将请求到的图片数据渲染到页面上
Waterfall.prototype.append = function(photos){
	for(var i = 0; i < photos.length; i++){
		var item = document.createElement('div');
		item.className = 'gallery-item';
		item.innerHTML = 
				'<img class="gallery-img" data-large = ' + photos[i].large_url + 
					' data-radio = ' + photos[i].aspect_ratio + 
					' src=' + photos[i].image_url + '>' + 
				'<div class="gallery-infor">' + 
					'<div class="gallery-name">' + photos[i].name + '</div>' + 
				'</div>';
		//每次添加新的图片时，都将其放在高度最小的一栏
		this.getMinColumn().appendChild(item);
		var img = $('img', item)[0];
		//因为用于瀑布流布局的图片像素是280px＊280px，宽度已定，不定义高度的话所有图片高度都是一样的
		img.style.height = parseInt(item.clientWidth / photos[i].aspect_ratio) + 'px';
	}
}