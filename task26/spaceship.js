var STOP = 0;//停止状态
var FLY = 1;//飞行状态

/*
* 飞船
* 设计：工厂模式
* @param {number} orbit 所在轨道
*/
function SpaceShip(orbit, ele){
	var obj = {
		//所在轨道
		_orbit: orbit,
		//对应的dom节点
		_ele: ele,
		//当前飞行状态
		_status: STOP,
		//已经销毁
        _destroyed: false,
		//当前能源
		_energy: 100,
		//速度
		_speed: 1,
		//旋转角度
		_deg: 0,
		//动力系统
		drive: {
			//起飞
			start: function(){
				if(obj._energy > 0) obj._status = FLY;
			},
			//飞行
			fly: function(){
				if(obj._status === FLY) obj._deg += obj._speed;
				obj._deg %= 360;
			},
			//停止
			stop: function(){
				obj._status = STOP;
			},
		},
		//能源系统
		energy: {
			//添加能量
			add: function(num){
				obj._energy += num;
				if(obj._energy > 100) obj._energy = 100;
			},
			consume: function(num){
				if(obj._status === FLY) obj._energy -= num;
				if(obj._energy <= 0){
					obj._status = STOP;
					obj._energy = 0;
				}
			}
		},
		//信号系统
		signal: {

		},
		//自爆系统
		destory: function(){
			obj._destroyed = true;
		}
	};
	return obj;
}
