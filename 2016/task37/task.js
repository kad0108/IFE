/*
* 使用mousedown、mousemove、mouseup鼠标事件实现拖拽功能
*/
function Modal(ele){
	this.ele = ele;
}
Modal.prototype = {
	constructor: Modal,
	//显示
	show: function(){
		this.ele.className = this.ele.className.replace(/ hide/, '');
	},
	//隐藏
	hide: function(){
		this.ele.className += ' hide';
	},
	//拖拽
	drag: function(){
		var isMove = false;
		var dialog = $('.dialog', this.ele)[0];
		var header = $('.header', this.ele)[0];
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
	//调整大小
	resize: function(){
		var btn = $('.resize', this.ele)[0];
		var dialog = $('.dialog', this.ele)[0];
		var isResize = false;
		addEvent(btn, 'mousedown', function(event){
			isResize = true;
			var x = event.clientX - dialog.offsetWidth;//计算dialog左上角坐标
			var y = event.clientY - dialog.offsetHeight;

			addEvent(document, 'mousemove', function(event){
				if(isResize){
					dialog.style.width = event.clientX - x + 'px';
					dialog.style.height = event.clientY - y + 'px';
				}
			})
			addEvent(document, 'mouseup', function(event){
				isResize = false;
			})
		})
	},
	// 监听事件
	watch: function(){
		var self = this;
		addEvent($('.mask', this.ele)[0], 'click', function(event){
			event.stopPropagation();
			self.hide();
		});
		addEvent($('.footer', this.ele)[0], 'click', function(event){
			event.stopPropagation();
			self.hide();
		});
		this.drag();
		this.resize();
	}
}

var modal = new Modal($('#modal'));
modal.watch();
modal.show();
addEvent($('#open'), 'click', function(event){
	modal.show();
});

