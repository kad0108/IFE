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

function removeEvent(element, eventName, listener){
  if(element.removeEventListener){
    element.removeEventListener(eventName, listener, false);
  }else if(element.detachEvent){
    element.detachEvent("on" + eventName, listener);
  }
}