function $(id){
	return document.getElementById(id);
}
function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}

/**
 * ie不支持trim
 */
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

function disableBtn(ele){
	if(Array.isArray(ele)){
		ele.forEach(function(item){
			item.setAttribute('disabled', 'disabled');
			if(item.getAttribute('type') !== null){
				item.className += ' disable';
			}
		})
	}else{
		ele.setAttribute('disabled', 'disabled');
	}
}
function enableBtn(ele){
	if(Array.isArray(ele)){
		ele.forEach(function(item){
			item.removeAttribute('disabled');
			if(item.getAttribute('type') !== null){
				item.classList.remove('disable');
			}
		})
	}else{
		ele.removeAttribute('disabled');
	}
}