function Calendar(ele, fn){
	this.ele = $('.calendar', ele)[0];
	this.curDate = {};
	this.input = $('.input', ele)[0];
	this.type = 'single';
	this.callback = fn;
	this.mark = false;//时间段是否正确选择完成
}
Calendar.prototype = {
	constructor: Calendar,
	$year: $('.year', this.ele)[0],
	$month: $('.month', this.ele)[0],
	$day: $('.day', this.ele)[0],
	//初始化
	init: function(){
		var date = new Date();
		this.curDate = {
			now: {
				year: date.getFullYear(),
				month: date.getMonth(),//0~11
				day: 0,
			},
			start: null,
			end: null,
		};
		var self = this;
		//初始化年份
		for(var i = 1980; i < 2060; i++){
			var option = document.createElement('option');
			option.value = i;
			option.innerHTML = i;
			this.$year.appendChild(option);
		}
		this.$year.value = this.curDate.now.year;
		
		//初始化月份
		for(var i = 1; i <= 12; i++){
			var option = document.createElement('option');
			option.value = i;
			option.innerHTML = i;
			this.$month.appendChild(option);
		}
		this.$month.value = this.curDate.now.month + 1;
		
		//添加星期栏
		var weeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
		var $week = $('.week', this.ele)[0];
		var ul = document.createElement('ul');
		for(var i = 0; i < weeks.length; i++){
			var li = document.createElement('li');
			li.innerHTML = weeks[i];
			ul.appendChild(li);
		}
		$week.appendChild(ul);

		this.render();
		this.setEvent();
	},
	//渲染日期面板
	render: function(){
		//拿到这个月总共的天数
		var days = this.getDays();
		//这个月第一天是星期几 0~6
		var firstDay = new Date(this.curDate.now.year, this.curDate.now.month, 1).getDay();

		var ul = document.createElement('ul');
		//开头显示空白
		for(var i = 0; i < firstDay; i++){
			var li = document.createElement('li');
			ul.appendChild(li);
		}
		for(var i = 1; i <= days; i++){
			if(firstDay == 7){
				ul.appendChild(document.createElement('br'));
				firstDay = 0;
			}
			var li =  document.createElement('li');
			li.dataset.id = i;
			li.innerHTML = i;
			if(this.type === 'single'){
				if(i == this.curDate.now.day) li.className = 'chosen';
			}
			ul.appendChild(li);
			firstDay++;
		}
		this.$day.innerHTML = "";
		this.$day.appendChild(ul);

		this.$lis = $('li', this.$day);//日期面板上的所有li，拿出来方便多次使用

		//渲染时间段下方按钮
		if(this.type == 'period'){
			var self = this;

			var div = document.createElement('div');
			div.className = 'footer';
			var confirmBtn = document.createElement('button');
			confirmBtn.type = 'button';
			confirmBtn.innerHTML = '确认';
			confirmBtn.onclick = function(){
				if(self.mark){
					self.callback();
					self.input.value = 'from ' + util.formateDate(self.curDate.start) + ' to ' + util.formateDate(self.curDate.end);
					self.hide();
				}else{
					alert('未正确选中');
				}
				
			}
			div.appendChild(confirmBtn);

			var cancelBtn = document.createElement('button');
			cancelBtn.type = 'button';
			cancelBtn.innerHTML = '取消';
			cancelBtn.onclick = function(){
				self.mark = false;
				self.clear();
				self.curDate.start = null;
				self.curDate.end = null;
			}
			div.appendChild(cancelBtn);
			this.$day.appendChild(div);

			this.range();
		}
	},
	//给日期组件添加代理事件
	setEvent: function(){
		var self = this;
		//年份改变
		this.$year.onchange = function(){
			self.curDate.now.year = Number(this.value);
			self.curDate.now.day = 0;
			self.render();
		};
		//月份改变
		this.$month.onchange = function(){
			self.curDate.now.month = this.value - 1;
			self.curDate.now.day = 0;
			self.render();
		};
		//上一月
		$('.pre', this.ele)[0].onclick = function(){
			self.curDate.now.month--;
			if(self.curDate.now.month < 0){
				self.$year.value = --self.curDate.now.year;
				self.curDate.now.month = 11;
			}
			self.$month.value = self.curDate.now.month+1;
			self.curDate.now.day = 0;
			self.render();
		}
		//下一月
		$('.next', this.ele)[0].onclick = function(){
			self.curDate.now.month++;
			if(self.curDate.now.month > 11){
				self.$year.value = ++self.curDate.now.year;
				self.curDate.now.month = 0;
			}
			self.$month.value = self.curDate.now.month+1;
			self.curDate.now.day = 0;
			self.render();
		}
		//选择日期
		addEvent(this.$day, 'click', function(event){
			var event = event || window.event;
			event.stopPropagation();
			var target = event.target || event.srcElement;
			if(target && target.tagName === 'li'.toUpperCase()){
				if(self.type === 'single'){
					self.curDate.now.day = Number(target.dataset.id);
					self.input.value = util.formateDate(self.curDate.now);
					self.hide();
					self.callback();
				}else{
					var obj = {
						year: self.$year.value,
						month: self.$month.value-1,
						day: Number(target.dataset.id),
					};
					//未选择起始时间，或新选择的时间<起始时间
					if(self.curDate.start === null || util.formateDate(obj) < util.formateDate(self.curDate.start)){
						self.clear();
						self.curDate.start = obj;
					}else{
						//选择了结束时间且新选择的时间<结束时间
						if(self.curDate.end && util.formateDate(obj) < util.formateDate(self.curDate.end)){
							self.clear(self.curDate.start.day);
						}
						self.curDate.end = obj;
						self.mark = true;
					}
					self.range();
				}
			}
		});
		//点击输入框
		this.input.onclick = function(){
			self.show();
			self.render();
		}
		//单选按钮改变选中选项
		var radios = $('input[name="type"]');
		for(var i = 0; i < radios.length; i++){
			radios[i].onchange = function(){
				self.type = this.id;
				self.render();
				self.show();
			}
		}
		
	},
	//渲染时间段
	range: function(){
		//选中起始点终止点
		this.chosen(this.curDate.start);
		this.chosen(this.curDate.end);
		if(this.curDate.start === null || this.curDate.end === null) return;

		//选中区间
		var startid, endid;
		var date = this.getInterval();
		if(util.cmp(date.curEnd, this.curDate.start) < 0
			|| util.cmp(date.curStart, this.curDate.end) > 0){
			startid = endid = -1;
		}else{
			startid = util.max(date.curStart, this.curDate.start).day+1;
			endid = util.min(date.curEnd, this.curDate.end).day-1;
		}
		for(var i = 0; i < this.$lis.length; i++){
			if(this.$lis[i].dataset.id >= startid && this.$lis[i].dataset.id <= endid){
				this.$lis[i].className = 'range';
			}
		}
	},
	//选中日期
	chosen: function(arg){
		if(arg === null) return;
		var date = this.getInterval();
		if(util.cmp(date.curStart, arg) < 0 && util.cmp(arg, date.curEnd) < 0){
			for(var i = 0; i < this.$lis.length; i++){
				if(this.$lis[i].dataset.id == arg.day)
					this.$lis[i].className = 'chosen';
			}
		}
	},
	//传入下个月的第0天就返回这个月的最后一天，也就是这个月总共的天数
	getDays: function(){
		return new Date(this.curDate.now.year, this.curDate.now.month+1, 0).getDate();
	},
	//拿到当前日期面板的时间范围
	getInterval: function(){
		var curStart = {
			year: this.$year.value,
			month: this.$month.value-1,
			day: 0,
		};
		var curEnd = {
			year: this.$year.value,
			month: this.$month.value-1,
			day: this.getDays()+1,
		}
		return {
			curStart: curStart,
			curEnd: curEnd,
		};
	},
	//清理日期面板
	clear: function(){
		var startid = arguments[0] ? arguments[0]+1 : 0;
		for(var i = 0; i < this.$lis.length; i++){
			if(this.$lis[i].dataset.id >= startid){
				if(this.$lis[i].className) this.$lis[i].className = '';
			}
		}
	},
	//显示日期面板
	show: function(){
		this.ele.className = this.ele.className.replace(/ hide/, '');
	},
	//隐藏日期面板
	hide: function(){
		this.ele.className += ' hide';
	},
}

var util = {
	preZero: function(num){
		return num < 10 ? ('0' + num) : num;
	},
	formateDate: function(curDate){
		return curDate.year + '-' + this.preZero(curDate.month+1) + '-' + this.preZero(curDate.day);
	},
	max: function(a, b){
		if(this.formateDate(a) > this.formateDate(b)) return a;
		return b;
	},
	min: function(a, b){
		if(this.formateDate(a) < this.formateDate(b)) return a;
		return b;
	},
	cmp: function(a, b){
		if(this.formateDate(a) < this.formateDate(b)) return -1;
		if(this.formateDate(a) > this.formateDate(b)) return 1;
		return 0;
	}
}

var calendar = new Calendar($('#calendar'), function(){
	if(this.type === 'single') alert('选中日期 ' + util.formateDate(this.curDate.now));
	else alert('选中时间段 ' + util.formateDate(this.curDate.start) + '~' + util.formateDate(this.curDate.end));
});
calendar.init();


