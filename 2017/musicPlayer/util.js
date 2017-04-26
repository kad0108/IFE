var EventUtil = {
	addEvent: function(ele, eventName, listener){
		if(ele.addEventListener){
			ele.addEventListener(eventName, listener, false);		
		}else if(ele.attachEvent){
			ele.attachEvent("on" + eventName, listener);
		}else{
			ele["on" + eventName] = listener;
		}
	},
	removeEvent: function(ele, eventName, listener){
		if(ele.removeEventListener){
			ele.removeEventListener(eventName, listener);		
		}else if(ele.detachEvent){
			ele.detachEvent("on" + eventName, listener);
		}else{
			ele["on" + eventName] = null;		
		}
	},
	getEvent: function(e){
		var evt = e || window.event;
		return evt;
	},
	getTarget: function(e){
		var e = this.getEvent(e);
		var target = e.target || e.srcElement;
		return target;
	},
	stopPropagation: function(e){
		var e = this.getEvent(e);
		if(e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;		
	},
	preventDefault: function(e){
		var e = this.getEvent(e);
		if(e.preventDefault) e.preventDefault();
		else e.returnValue = false;//兼容firefox
	}
}

function $(selector, context){
	context = context || document;
	var nodelist = context.querySelectorAll(selector);
	if(selector.charAt(0) == '#') return nodelist[0];
	return nodelist;
}