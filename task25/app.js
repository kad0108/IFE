//判断输入节点名是否合法
function isValid(text){
	if(text && text.trim()) return true;
	else return false;
}

//创建根节点对象
var root = new TreeNode({
	parent: null,
	childs: [],
	name: 'Front-End Engineer',
	ele: $('root'),
});
root.addChild('Tech').addChild('Algorithm').addChild('Basics');
root.childs[0].addChild('Html5').addChild('CSS3').addChild('JavaScript');
root.childs[1].addChild('DFS/BFS').addChild('Binary Tree').addChild('Sort');
root.childs[2].addChild('NetWork').addChild('OS').addChild('Backend Development Language');

//节点操作
addEvent(root.ele, 'click', function(event){
	var event = event || window.event;
	event.stopPropagation();
	var target = event.target || event.srcElement;
	if(target && target.tagName === 'i'.toUpperCase()){
		if(target.className.indexOf('icon-add') != -1){//添加
			var text = prompt('Please input child node:');
			if(text != null){
				if(isValid(text)){
					getObj(target).addChild(text.trim());
				}else{
					alert('Input can not be empty or spaces.');
				}
			}
		}else if(target.className.indexOf('icon-del') != -1){//删除
			getObj(target).delNode();
		}else if(target.className.indexOf('icon-rename') != -1){//重命名
			var preName = getObj(target).name;
			var text = prompt('Please input child node:', preName);
			if(text != null){
				if(text !== preName){
					if(isValid(text)){
						getObj(target).renameNode(text.trim());
					}else{
						alert('Input can not be empty or spaces.');
					}
				}
			}

		}
	}else if(target && target.tagName === 'span'.toUpperCase()){
		if(target.className.indexOf('arrow') != -1){//折叠展开
			var obj = getObj(target);
			if(obj.foldState){
				obj.openNodeList();
			}else{
				obj.closeNodeList();
			}
		}
	}

	function getObj(tag){
		return tag.parentNode.parentNode.TreeNode;
	}
})
//查找节点
addEvent($('search'), 'click', function(event){
	var key = $('key').value;
	// var data = dfsSearch(root);
	var data = bfsSearch(root);

	var result = [];
	if(isValid(key)){
		key = key.trim().toLowerCase();
		for(var i = 0; i < data.length; i++){
			if(data[i].name.toLowerCase().indexOf(key) != -1){
				result.push(data[i]);
			}
		}
		//结果高亮显示
		for(var i = 0; i < result.length; i++){
			var node = result[i];
			node.ele.className += ' find';
			while(node.parent != null){
				node.parent.openNodeList();
				node = node.parent;
			}
		}
		$('res').innerHTML = 'find ' + result.length + ' results';
	}
})
//重置查找结果
addEvent($('reset'), 'click', function(event){
	$('key').value = '';
	$('res').innerHTML = '';
	var data = dfsSearch(root);
	//取消高亮
	for(var i = 0; i < data.length; i++){
		data[i].ele.className = data[i].ele.className.replace(/ find/, '');
	}
})

//dfs查找节点
function dfsSearch(root){
	var data = [];
	(function dfs(root){
		data.push(root);
		for(var i = 0; i < root.childs.length; i++){
			if(root.childs[i]) dfs(root.childs[i]);
		}
	})(root);
	return data;
}
//bfs查找节点
function bfsSearch(root){
	var data = [];
	var q = [];
	q.push(root);
	data.push(root);
	while(q.length){
		var node = q.shift();
		for(var i = 0; i < node.childs.length; i++){
			q.push(node.childs[i]);
			data.push(node.childs[i]);
		}
	}
	return data;
}