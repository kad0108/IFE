/*
* @author kad
* 封装树形组件
*/

/*
* @param obj 树节点对象
*/
function TreeNode(obj){
	this.parent = obj.parent;//父节点
	this.childs = obj.childs;//子节点
	this.name = obj.name;//节点名
	this.ele = obj.ele;//对应的DOM节点
	this.ele.TreeNode = this;//对应的DOM结点访问回原对象
	this.foldState = true;//折叠状态
}
//添加子节点
TreeNode.prototype.addChild = function(text){
	var node = document.createElement('div');
	node.className = 'root';
	var head = document.createElement('div');
	head.className = 'head';
	var arrow = document.createElement('span');
	arrow.className = 'arrow';
	head.appendChild(arrow);
	var name = document.createElement('span');
	name.className = 'name';
	name.innerHTML = text;
	head.appendChild(name);
	var addIcon = document.createElement('i');
	addIcon.className = 'iconfont icon-add';
	head.appendChild(addIcon);
	var delIcon = document.createElement('i');
	delIcon.className = 'iconfont icon-del';
	head.appendChild(delIcon);
	var renameIcon = document.createElement('i');
	renameIcon.className = 'iconfont icon-rename';
	head.appendChild(renameIcon);
	node.appendChild(head);

	this.ele.appendChild(node);
	//创建对应的TreeNode对象并添加到childs中
	var obj = {
		parent: this,
		childs: [],
		name: text,
		ele: node,
	}
	this.childs.push(new TreeNode(obj));
	//展开节点
	this.openNodeList();
	//方便链式调用
	return this;
}
//删除节点
TreeNode.prototype.delNode = function(){
	this.parent.ele.removeChild(this.ele);//移除对应的DOM结点
	for(var i = 0; i < this.parent.childs.length; i++){//移除对应对象
		if(this.parent.childs[i] == this){
			this.parent.childs.splice(i, 1);
			break;
		}
	}
	//节点没有子节点时去掉箭头
	if(this.parent.childs.length == 0){
		this.parent.ele.getElementsByClassName('arrow')[0].className = 'arrow';
	}
}
//节点重命名
TreeNode.prototype.renameNode = function(text){
	this.name = text;
	this.ele.getElementsByClassName('name')[0].innerHTML = text;
}
//展开节点
TreeNode.prototype.openNodeList = function(){
	var arrow = this.ele.getElementsByClassName('arrow')[0];
	if(arrow.className.indexOf('open') == -1){
		arrow.className = arrow.className.replace(/ close/, '');
		arrow.className += ' open';
		this.foldState = false;

		for(var i = 0; i < this.childs.length; i++){
			this.childs[i].ele.className = this.childs[i].ele.className.replace(/ hide/, '');
		}
	}
}
//折叠节点
TreeNode.prototype.closeNodeList = function(){
	if(this.childs.length != 0){
		var arrow = this.ele.getElementsByClassName('arrow')[0];
		if(arrow.className.indexOf('close') == -1){
			arrow.className = arrow.className.replace(/ open/, '');
			arrow.className += ' close';
			this.foldState = true;

			for(var i = 0; i < this.childs.length; i++){
				this.childs[i].ele.className += ' hide';
			}
		}
	}
}
