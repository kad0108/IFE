/*
* 图片大图显示模块
*/
function Modal(){
	this.$modal = document.createElement('div');
	this.$modal.className = 'modal';
	this.$modal.innerHTML =
		'<div class="bounce">' +
		  	'<span></span>' +
		    '<span></span>' +
		'</div>' +
		'<div class="modal-container">' + 
			'<img class="modal-img">' +
		'</div>';
	
	this.$container = $('.modal-container', this.$modal)[0];
	this.$bounce = $('.bounce', this.$modal)[0];
	this.$img = $('img', this.$modal)[0];
	document.body.appendChild(this.$modal);

	this.init();
}
Modal.prototype.init = function(){
	var self = this;
	//hide
	addEvent(this.$modal, 'click', function(event){
		//点击图片返回img元素，点击图片周围返回modal
		if(event.target == self.$modal){
			self.$modal.className = self.$modal.className.replace(/ active/, '');
			document.body.classList.remove('noscroll');
			// self.$container.classList.remove('show');
		}
	});
	this.$img.onload = function(){
		self.$bounce.style.zIndex = -1;
		// self.$container.className += ' show';//本来想等大图全部加在完成再显示的，但是像素太大加载很慢会等很久
	}
}
Modal.prototype.show = function(url, radio){
	document.body.className += ' noscroll';
	this.$modal.className += ' active';
	if(this.$img.src != url){
		this.$img.src = url;
		this.$bounce.style.zIndex = 1;

		//因为弹出层显示时要禁止页面向下滑动，所以要对两种尺寸的图片分别处理
		var windowRadio = innerWidth / innerHeight;
		if(windowRadio > radio){//portrait人像图
			this.$container.style.width = (innerHeight - 100) * radio + 'px';
		}else{//landscape风景图
			this.$container.style.width = (innerWidth - 100) + 'px';
			//因为图片可能会过于扁，不处在屏幕正中间没法覆盖loading效果
			this.$container.style.marginTop = (innerHeight - (innerWidth - 100) / radio) / 2 + 'px';
		}
	}
}