function Observer(data){
	this.data = data;
	this._msgs = [];
	this.dfs(data);
}
Observer.prototype.dfs = function(obj){
	for(var key in obj){
		// 只看对象本身属性
		if(obj.hasOwnProperty(key)){
			var val = obj[key];
			// 如果对象属性还是对象，注意这里typeof判断类型object是首字母小写
			if(typeof val === 'object'){
				new Observer(val);
			}
			this.change(key, val);
		}
	}
}
Observer.prototype.change = function(key, val){
	var self = this;
	Object.defineProperty(this.data, key, {
		enumerable: true,
		configurable: true,
		get: function(){
			console.log("you've visited " + key);
			return val;
		},
		set: function(newVal){
			console.log('you set ' + key);
			console.log('new ' + key + ' is ' + newVal);
			val = newVal;// 这儿的val不是值传递？？

			if(typeof newVal === 'object'){
				new Observer(newVal);
			}
			self.$emit(key, newVal);
		}
	})
}
// 订阅事件
Observer.prototype.$watch = function(type, fn){
	if(!(type in this._msgs)){
		this._msgs[type] = [fn];
	}else{
		this._msgs[type].push(fn);
	}
}
// 发布事件
Observer.prototype.$emit = function(type, args){
	//消息未被注册
	if(!this._msgs[type]) return;
	for(var i = 0, len = this._msgs[type].length; i < len; i++){
		this._msgs[type][i].call(this, args);
	}
}

var user = {
	name: 'kad',
	age: 23
}
var app = new Observer(user);

app.$watch('age', function(age){
	console.log(`my age has changed, now I am ${age}`);
})

