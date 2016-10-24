function Modal(ele){
	this.ele = ele;
}
Modal.prototype = {
	constructor: Modal,

	show: function(){
		this.ele.className = this.ele.className.replace(/ hide/, '');
	},

	hide: function(){
		this.ele.className += ' hide';
	},

	drag: function(){
		var isMove = false;
		var dialog = this.ele.getElementsByClassName('dialog')[0];
		var header = this.ele.getElementsByClassName('header')[0];
		addEvent(header, 'mousedown', function(event){
			var x = event.clientX - dialog.offsetLeft;//光标相对dialog左上角的横轴相对位置
			var y = event.clientY - dialog.offsetTop;//纵轴相对位置
			var dragEvent;

			addEvent(document, 'mousemove', dragEvent = function(event){
				isMove = true;//是不是进行了move操作，和click事件做区别

				dialog.style.left = event.clientX - x + 'px';//鼠标当前位置减去相对dialog左上角的位移就是dialog当前应该在的位置
				dialog.style.top = event.clientY - y + 'px';
			});
			addEvent(document, 'mouseup', function(event){
				/* 防止鼠标在不按下移动的状态时导致dialog也跟着移动的两种处理方式：
				* 1. ifdrag变量在mousedown时标记，在mousemove时判断是不是在鼠标按下时move，然后在mouseup时取消标记。
				* 2. 不开标记变量，但是在mouseup时要给mousemove事件解绑
				*/
				removeEvent(this, 'mousemove', dragEvent);
				isMove = false;
			});
		});

		// addEvent(header, 'click', function(){//测试click和mouse系列事件
		// 	if(!isMove) console.log('click');
		// 	isMove = false;
		// })

	},
	
	watch: function(){
		var self = this;
		addEvent(this.ele.getElementsByClassName('mask')[0], 'click', function(event){
			event.stopPropagation();
			self.hide();
		});
		addEvent(this.ele.getElementsByClassName('footer')[0], 'click', function(event){
			event.stopPropagation();
			self.hide();
		});
		this.drag();
	}
}

var modal = new Modal($('modal'));
modal.watch();
addEvent($('open'), 'click', function(event){
	modal.show();
});

