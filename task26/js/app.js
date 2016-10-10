//获取时间
function getTime(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = format(month);
	var day = date.getDay();
	day = format(day);
	var hour = date.getHours();
	hour = format(hour);
	var minute = date.getMinutes();
	minute = format(minute);
	var second = date.getSeconds();
	second = format(second);
	var milli = date.getMilliseconds();
	return year  + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '.' + milli;

	function format(num){
		return num < 10 ? '0' + num : num;
	}
}

/**
* 控制台输出
* @param meg 消息
* @param type 消息类型
*/
var consolePanel = $('console');
function log(meg, type){
	var p = document.createElement('p');
	if(type) p.className = type;
	var time = getTime();
	p.innerHTML = time + '  ' + meg;
	consolePanel.appendChild(p);
	//scrollHeight是对象的滚动高度，scrollTop是向上卷起的高度
	consolePanel.scrollTop = consolePanel.scrollHeight;
}
log('准备就绪！请操作');


//飞船飞行及显示管理
(function(){
	setInterval(function(){
		for(var i = 0; i < mediator.shipList.length; i++){
			var ship = mediator.shipList[i];
			if(ship !== null){
				//是否已删除飞船，若没有这个属性记录，每次会去删除一个不存在的节点
				if(ship._destroyed && !ship.clear){
					ship.clear = true;
					document.body.removeChild(ship._ele);
				}
				ship.drive.fly();
				ship._ele.style.transform = 'rotate(' + ship._deg + 'deg)';
				ship._ele.children[0].style.width = ship._energy + '%';
				ship._ele.children[1].innerHTML = ship._energy + '%';
			}
		}
	}, 100);
})();

//能源管理
(function(){
	setInterval(function(){
		for(var i = 0; i < mediator.shipList.length; i++){
			var ship = mediator.shipList[i];
			if(ship !== null){
				//能源系统充电，每秒增加2%
				ship.energy.add(2);
				//飞行消耗能源，每秒消耗5%
				ship.energy.consume(5);
			}
		}
	}, 1000);
})();
