/*
* 指挥官
* 设计：单例模式
*/
var commander = {
	//创建飞船
	build: function(orbit){
		log('[指挥官]：' + (orbit+1) + '号轨道创建飞船指令已发送');
		mediator.sendMessage({
			id: orbit,
			command: 'build',
		});
	},
	//飞船起飞
	start: function(orbit){
		log('[指挥官]：' + (orbit+1) + '号轨道飞船起飞指令已发送');
		mediator.sendMessage({
			id: orbit,
			command: 'start',
		});
	},
	//停止飞行
	stop: function(orbit){
		log('[指挥官]：' + (orbit+1) + '号轨道飞船停止飞行指令已发送');
		mediator.sendMessage({
			id: orbit,
			command: 'stop',
		});
	},
	//销毁飞船
	destory: function(orbit){
		log('[指挥官]：' + (orbit+1) + '号轨道飞船销毁指令已发送');
		mediator.sendMessage({
			id: orbit,
			command: 'destory',
		});
	},
	//控制面板
	control: $('control'),
	//控制板飞船个数
	shipCot: 0,
	//添加对新的飞船的指令
	addOrder: function(){
		if(this.shipCot > 4){
			return;
		}
		var div = document.createElement('div');
		div.dataset.id = this.shipCot;
		var span = document.createElement('span');
		span.innerHTML = '对' + (this.shipCot+1) + '号飞船下达命令：';
		div.appendChild(span);
		var button1 = document.createElement('button');
		button1.type = 'button';
		button1.dataset.type = 'build';
		button1.dataset.status = 'build';
		button1.innerHTML = '创建';
		div.appendChild(button1);
		var button2 = document.createElement('button');
		button2.type = 'button';
		button2.dataset.type = 'drive';
		button2.dataset.status = 'start';
		button2.innerHTML = '飞行';
		button2.disabled = 'disabled';
		div.appendChild(button2);

		var addOrder = this.control.children[this.control.children.length-1]
		this.control.insertBefore(div, addOrder);
		this.shipCot++;
		if(this.shipCot == 4){
			this.control.removeChild(addOrder);
		}
	}
}

commander.addOrder();//添加一条控制飞船指令到面板

// 操作面板的按钮事件
addEvent(commander.control, 'click', function(event){
	var event = event || window.event;
	var target = event.target || event.srcElement;
	if(target && target.tagName === 'button'.toUpperCase()){
		var orbit = parseInt(target.parentNode.dataset.id);
		if(target.dataset.status === 'add'){
			commander.addOrder();
		}else{
			var type = target.dataset.type;
			switch(type){
				case 'drive':
					if(target.dataset.status === 'start'){
						commander.start(orbit);
						target.dataset.status = 'stop';
						target.innerHTML = '停止';
					}else{
						commander.stop(orbit);
						target.dataset.status = 'start';
						target.innerHTML = '飞行';
					}
					break;
				case 'build':
					if(target.dataset.status === 'build'){
						commander.build(orbit);
						target.dataset.status = 'destory';
						target.innerHTML = '销毁';
						target.nextElementSibling.disabled = false;
						target.nextElementSibling.dataset.status = 'start';
						target.nextElementSibling.innerHTML = '飞行';
					}else{
						commander.destory(orbit);
						target.dataset.status = 'build';
						target.innerHTML = '创建'
						target.nextElementSibling.disabled = true;
					}
					break;
			}
		}
	}
});
