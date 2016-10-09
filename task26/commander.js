var commander = {
	//飞船列表
	shipList: [],
	//创建飞船
	buildShip: function(orbit){
		var id = this.shipList.length;
		var ele = document.createElement('div');
		ele.className = 'spaceship';
		ele.id = 'spaceship' + id;
		var eng = document.createElement('div');
		eng.className = 'energy';
		ele.appendChild(eng);
		var text = document.createElement('div');
		text.className = 'text';
		text.innerHTML = '100%';
		ele.appendChild(text);
		document.body.insertBefore(ele, document.querySelector('.wrapper'));
		this.shipList.push(new SpaceShip(orbit, ele));
	}
}


addEvent($('control'), 'click', function(event){
	var event = event || window.event;
	var target = event.target || event.srcElement;
	if(target && target.tagName === 'button'.toUpperCase()){
		var orbit = parseInt(target.parentNode.dataset.id);
		var type = target.dataset.type;
		switch(type){
			case 'drive':
				if(target.dataset.status = 'start'){
					commander.shipList[orbit].drive.start();
					target.dataset.status = 'stop';
					target.innerHTML = '停止';
				}
				break;
			case 'build':
				if(target.dataset.status = 'build'){
					commander.buildShip(orbit);
					target.dataset.status = 'destory';
					target.innerHTML = '销毁';
					target.nextElementSibling.disabled = false;
				}else{

				}
		}
	}
});


var requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback){
				return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
			};
})();

//飞船飞行及显示管理
(function(){
	function manage(){
		for(var i = 0; i < commander.shipList.length; i++){
			var ship = commander.shipList[i];
			if(ship._destoryed){
				document.body.removeChild(ship._ele);
			}else{
				ship.drive.fly();
				ship._ele.style.transform = 'rotate(' + ship._deg + 'deg)';
				ship._ele.children[0].style.width = ship._energy + '%';
				ship._ele.children[1].innerHTML = ship._energy + '%';
			}
		}
		requestAnimationFrame(manage);
	}
	manage();

	// setInterval(function(){
	// 	for(var i = 0; i < commander.shipList.length; i++){
	// 		var ship = commander.shipList[i];
	// 		if(ship._destoryed){
	// 			document.body.removeChild(ship._ele);
	// 		}else{
	// 			ship.drive.fly();
	// 			ship._ele.style.transform = 'rotate(' + ship._deg + 'deg)';
	// 			ship._ele.children[0].style.width = ship._energy + '%';
	// 			ship._ele.children[1].innerHTML = ship._energy + '%';
	// 		}
	// 	}
	// }, 100);
})();

//能源管理
(function(){
	function manage(){
		for(var i = 0; i < commander.shipList.length; i++){
			var ship = commander.shipList[i];
			if(!ship._destoryed){
				//能源系统充电，每秒增加2%
				ship.energy.add(2);
				//飞行消耗能源，每秒消耗5%
				ship.energy.consume(5);
			}
		}
		requestAnimationFrame(manage);
	}
	manage();
	
	// setInterval(function(){
	// 	for(var i = 0; i < commander.shipList.length; i++){
	// 		var ship = commander.shipList[i];
	// 		if(!ship._destoryed){
	// 			//能源系统充电，每秒增加2%
	// 			ship.energy.add(2);
	// 			//飞行消耗能源，每秒消耗5%
	// 			ship.energy.consume(5);
	// 		}
	// 	}
	// }, 1000);
})();