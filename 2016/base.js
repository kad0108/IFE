function $(selector, context){
  context = context || document;//上下文是否存在，不存在就使用document
  var nodelist = context.querySelectorAll(selector);
  if(selector.charAt(0) == '#') return nodelist[0];
  return nodelist;
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