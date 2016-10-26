/*
* @author kad 2016-9-30
* 好久没写js了，用最笨的方法实现了基本功能，代码写成一坨翔
* 查询处文件展开有bug，写的太乱
* 接下来再对文件树进行封装
*/

var icon = {
	open: '&#xe60b;',
	close: '&#xe60c;',
	add: '&#xe600;',
	del: '&#xe608;',
	rename: '&#xe604;',
}

addEvent($('#root'), 'click', function(event){
	var event = event || window.event;
	event.stopPropagation();
	var target = event.target || event.srcElement;

	if(target && target.tagName === 'i'.toUpperCase()){
		//添加子节点
		if(target.dataset.btn === 'add'){
			var content = prompt("Input child node's name:");
			if(content !== null){
				var div = document.createElement('div');
				div.className = 'item head';
				var i = document.createElement('i');
				i.className = 'iconfont';
				div.appendChild(i);
				var span = document.createElement('span');
				span.className = 'name';
				span.innerHTML = content;
				div.appendChild(span);
				var i = document.createElement('i');
				i.className = 'iconfont add';
				i.setAttribute('data-btn', 'add');
				i.innerHTML = icon.add;
				div.appendChild(i);
				var i = document.createElement('i');
				i.className = 'iconfont del';
				i.setAttribute('data-btn', 'del');
				i.innerHTML = icon.del;
				div.appendChild(i);
				var i = document.createElement('i');
				i.className = 'iconfont rename';
				i.setAttribute('data-btn', 'rename');
				i.innerHTML = icon.rename;
				div.appendChild(i);
				var root = document.createElement('div');
				root.className = 'root';
				root.appendChild(div);

				if(target.parentNode.children[0].innerHTML === '' || target.parentNode.children[0].innerHTML === icon.open){
					target.parentNode.children[0].innerHTML = icon.close;
					target.parentNode.children[0].setAttribute('data-btn', 'close');
				}
				target.parentNode.parentNode.appendChild(root);
			}
		}//删除节点
		else if(target.dataset.btn === 'del'){
			var parent = target.parentNode.parentNode.parentNode;
			parent.removeChild(target.parentNode.parentNode);
			if(parent.children.length === 1){
				parent.children[0].children[0].innerHTML = '';
			}
		}//重命名
		else if(target.dataset.btn === 'rename'){
			var node = target.parentNode;
			var newName = prompt("Modify node's name:", node.children[1].innerHTML);
			if(newName !== null){
				node.children[1].innerHTML = newName;
			}
		}
		else{
			//点击折叠
			if(target.dataset.btn === 'close'){
				target.dataset.btn = 'open';
				target.innerHTML = icon.open;
				var list = target.parentNode.parentNode.children;
				for(var i = 1; i < list.length; i++){
					list[i].className += ' hide';
				}
			}//点击展开
			else if(target.dataset.btn === 'open'){
				target.dataset.btn = 'close';
				target.innerHTML = icon.close;
				var list = target.parentNode.parentNode.children;
				for(var i = 1; i < list.length; i++){
					list[i].className = list[i].className.replace(/hide/i, "");
				}
			}
		}
	}
})

addEvent($('#search'), 'click', function(event){
	var text =  $('#text').value;
	var data = [];
	(function dfs(node){
		data.push(node.children[0]);
		for(var i = 1; i < node.children.length; i++){
			if(node.children[i]) dfs(node.children[i]);
		}
	})($('#root'));
	var cot = 0;
	//查询结果高亮显示，并且上层文件展开
	for(var i = 0; i < data.length; i++){
		text = text.toLowerCase();
		if(data[i].children[1].innerHTML.toLowerCase().indexOf(text) != -1){
			cot++;

			data[i].children[1].className += ' search';
			var node = data[i].parentNode.parentNode;
			while(node != $('#root')){
				var target = node.children[0].children[0];
				if(target.dataset.btn === 'open'){
					target.dataset.btn = 'close';
					target.innerHTML = icon.close;
					var list = target.parentNode.parentNode.children;
					for(var i = 1; i < list.length; i++){
						list[i].className = list[i].className.replace(/hide/i, "");
					}
				}
				node = node.parentNode;
			}
			var target = node.children[0].children[0];
			if(target.dataset.btn === 'open'){
				target.dataset.btn = 'close';
				target.innerHTML = icon.close;
				var list = target.parentNode.parentNode.children;
				for(var i = 1; i < list.length; i++){
					list[i].className = list[i].className.replace(/hide/i, "");
				}
			}
		}
	}
	$('#result').innerHTML = 'find ' + cot + ' results';
})

addEvent($('#reset'), 'click', function(event){
	$('#text').value = '';
	$('#result').innerHTML = '';
	var data = [];
	(function dfs(node){
		data.push(node.children[0]);
		for(var i = 1; i < node.children.length; i++){
			if(node.children[i]) dfs(node.children[i]);
		}
	})($('#root'));
	//取消高亮
	for(var i = 0; i < data.length; i++){
		data[i].children[1].className = data[i].children[1].className.replace(/search/i, '');
	}
})