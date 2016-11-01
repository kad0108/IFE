function Gallery(ele, pics){
	this.ele = ele;
	this.pics = pics;
	this.init();
	this.setSizes();
}
Gallery.prototype.init = function(){
	this.ele.innerHTML = '';
	this.ele.style.width = this.ele.clientWidth + 'px';
	this.ele.style.height = this.ele.clientHeight + 'px';
	for(var i = 0; i < this.pics.length; i++){
		this.ele.appendChild(this.pics[i]);
	}
}
Gallery.prototype.setSizes = function(){
	var items = $('img', this.ele);
	this['size' + items.length]().forEach(function(size, i){
		items[i].style.width = size.width + 'px';
		items[i].style.height = size.height + 'px';
		if(size.right !== undefined){
			items[i].style.float = 'right';
		}
	})
}
Gallery.prototype.size1 = function(){
	return [
		{
			width: this.ele.clientWidth,
			height: this.ele.clientHeight
		}
	];
}
Gallery.prototype.size2 = function(){
	var width = this.ele.clientWidth * 2 / 3;
	var height = this.ele.clientHeight;
	return [
		{
			width: width,
			height: height,
		},
		{
			width: width,
			height: height,
		}
	];
}
Gallery.prototype.size3 = function(){
	var size = this.ele.clientHeight/2;
	return [
		{
			width: this.ele.clientWidth - size,
			height: this.ele.clientHeight,
		},
		{
			width: size,
			height: size,
		},
		{
			width: size,
			height: size,
		}
	];
}
Gallery.prototype.size4 = function () {
	var width = this.ele.clientWidth / 2;
	var height = this.ele.clientHeight / 2;

	return [
		{
		  width: width,
		  height: height
		},
		{
		  width: width,
		  height: height
		},
		{
		  width: width,
		  height: height
		},
		{
		  width: width,
		  height: height
		}
	];
}
Gallery.prototype.size5 = function(){
	var width = this.ele.clientWidth / 3;
	var height = this.ele.clientHeight / 3;
	return [
		{
			width: width*2,
			height: height*2,
		},
		{
			width: width,
			height: width,
		},
		{
			width: width,
			height: this.ele.clientHeight - width,
			right: true,
		},
		{
			width: width,
			height: height,
		},
		{
			width: width,
			height: height,
		}
	];
}
Gallery.prototype.size6 = function(){
	var width = this.ele.clientWidth / 3;
	var height = this.ele.clientHeight / 3;
	return [
		{
			width: width*2,
			height: height*2,
		},
		{
			width: width,
			height: height,
		},
		{
			width: width,
			height: height,
			// right: true,
		},
		{
			width: width,
			height: height,
		},
		{
			width: width,
			height: height,
		},
		{
			width: width,
			height: height,
		}
	];
}