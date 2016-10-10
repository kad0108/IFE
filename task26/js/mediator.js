/*
* 介质：广播信号发射器发出的命令
* 设计：原型模式
*/

function Mediator(){
	//各个轨道的状态
	this.orbitStatus = [false, false, false, false];
	//飞船列表
	this.shipList =  [null, null, null, null];
	this.cmd = {
		'build': '创建',
		'start': '起飞',
		'stop': '停止',
		'destory': '销毁',
	};
}

Mediator.prototype = {
	constructor: Mediator,
	//广播信息
	sendMessage: function(meg){
		if(meg.command === 'build'){
			this.buildShip(meg);
		}else{
			var self = this;
			setTimeout(function(){
				if(Math.random() <= 0.3){
					log('[消息]：' + (meg.id+1) + '号飞船的' + self.cmd[meg.command] + '指令丢包了！', 'error');
					return;
				}
				//销毁飞船
				if(meg.command === 'destory'){
					//记录中该轨道上没有飞船
					if(!self.orbitStatus[meg.id]){
						log('[消息]：' + (meg.id+1) + '号轨道上不存在飞船！', 'error');
						return;
					}
					self.orbitStatus[meg.id] = false;
				}

				log('[消息]：' + (meg.id+1) + '号轨道' + self.cmd[meg.command] + '成功');
				for(var i = 0; i < self.shipList.length; i++){
					var ship = self.shipList[i];
					//已销毁飞船不做处理
					if(ship !== null){
						ship.signal(meg);
					}
				}
			}, 300);
		}
	},
	//创建飞船，没有对建飞船做丢包处理
	buildShip: function(meg){
		//记录中该轨道上已经有飞船了，因为销毁指令会丢包
		if(this.orbitStatus[meg.id]){
			log('[消息]：' + (meg.id+1) + '号轨道上已经存在飞船！', 'error');
			return;
		}

		var ele = document.createElement('div');
		ele.className = 'spaceship';
		ele.id = 'spaceship' + meg.id;
		var eng = document.createElement('div');
		eng.className = 'energy';
		ele.appendChild(eng);
		var text = document.createElement('div');
		text.className = 'text';
		text.innerHTML = '100%';
		ele.appendChild(text);
		document.body.insertBefore(ele, document.querySelector('.wrapper'));
		this.shipList[meg.id] = new SpaceShip(meg.id, ele);

		this.orbitStatus[meg.id] = true;
		log('[消息]：' + (meg.id+1) + '号轨道创建飞船成功');
	},
}


var mediator = new Mediator();