var DURATION = 500;
function Application(square){
	this.imageReader = new ImageReader();
	this.table = new Table();
	this.square = new Square($("square"));

	this.text = $("text");
	this.ol = $("line");
	this.resetbtn = $("reset");
	this.buildbtn = $("build");
	this.exebtn = $("execute");
	this.sizebtn = $("size");
	this.durationbtn = $("duration");

	this.span = $("filename");
	this.file = $("file");
	this.choofile = $("choofile");
	this.fileobj = this.file.files[0];
	this.reader = new FileReader();
}

Application.prototype.init = function(){
	this.table.init();
	this.square.init();
	this.text.value = "mov rig 8\ntun bot\ntra bot 6\nMOV TO 2,4\nBUILD\nBRU green\nmOV RIG 10\nTRA TOP 5\nmov lef 2\nGO 3";
	this.textinit();

	addEvent(this.text, "keyup", this.textinit.bind(this));
	addEvent(this.text, "scroll", this.scroll.bind(this));
	addEvent(document, "keydown", this.hotkey.bind(this));

	addEvent(this.buildbtn, "click", this.table.wall.bind(this.table));
	addEvent(this.resetbtn, "click", this.reset.bind(this));
	addEvent(this.exebtn, "click", this.execute.bind(this));
	addEvent(this.sizebtn, "change", this.resize.bind(this));
	addEvent(this.durationbtn, "change", this.setDuration.bind(this));

	addEvent(this.choofile, "click", this.firefox.bind(this));//单独处理火狐浏览器file点击事件
	if(typeof FileReader == 'undefined'){
		this.span.innerHTML="你的浏览器不支持FileReader接口！";
		this.span.className = " wrong";
		this.file.setAttribute("disabled","disabled");
	}
	addEvent(this.file, "change", this.process.bind(this));
}

Application.prototype.firefox = function(){
	var isFirefox = navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1 ? true : false;
	if(isFirefox) this.file.click();
}

Application.prototype.process = function(){
	var reg = /image\/\w+/;
	this.fileobj = this.file.files[0];
	if(!reg.test(this.fileobj.type)){
		this.span.className = " wrong";
		this.span.innerHTML = "图片文件才能测试！";
	}else{
		this.span.className = "";
		this.span.innerHTML = this.fileobj.name;

		this.reader.readAsDataURL(this.fileobj);

		addEvent(this.reader, "load", this.loadImage.bind(this));
	}
}

Application.prototype.loadImage = function(){
	this.imageReader.load(this.reader);
	this.text.value = this.imageReader.cmds;
	this.textinit();
}

Application.prototype.setDuration = function(){
	DURATION = parseInt(this.durationbtn.value);
	this.square.sq.style.transitionDuration = DURATION + "ms";
}

Application.prototype.resize = function(){
	TABLE_SIZE = this.sizebtn.value;
	this.table.init(this.table);
}

Application.prototype.reset = function(){
	window.location.reload();
}

Application.prototype.textinit = function(){
	var order = this.text.value;
	order.match(/\n/g) ? addrow(order.match(/\n/g).length+1, this.text, this.ol) : addrow(1, this.text, this.ol);
	function addrow(len, text, ol){
		ol.innerHTML = "";
		var top = text.scrollTop;
		for(var i = 0; i < len; i++){
			var li = document.createElement("li");
			li.innerHTML = i + 1;
			ol.appendChild(li);
		}
		ol.scrollTop = top;
	}
}

Application.prototype.scroll = function(){
	var top = this.text.scrollTop;
	this.ol.scrollTop = top;
}

Application.prototype.hotkey = function(event){
	if (event.target.tagName == 'BODY') {
		var dir = {37: 3, 38: 0, 39: 1, 40: 2}[event.keyCode];
		var direc = {0: "TOP", 1: "RIG", 2:"BOT", 3:"LEF"};
		if (typeof dir != 'undefined') {
			event.preventDefault();
			if(dir == this.square.dir){
				this.square.go(1);
			}else{
				this.square.rotate(direc[dir]);
			}
		}else if(event.keyCode == 32){
			this.square.build();
		}
	}
}

Application.prototype.sideRender = function(liId, flag){
	for(var i = 0, len = this.ol.childNodes.length; i < len; i++){
		if(this.ol.childNodes[i].innerHTML == (liId + 1)){
			if(flag == "error") this.ol.childNodes[i].className += " error";
			else if(flag == "scan") this.ol.childNodes[i].className += " scan";
		}
	}
}

Application.prototype.clearColor = function(){
	for(var i = 0, len = this.ol.childNodes.length; i < len; i++){
		if(this.ol.childNodes[i].className.match(/scan/)){
			this.ol.childNodes[i].className = this.ol.childNodes[i].className.replace(/scan/i, "");
		}
	}
}

Application.prototype.execute = function(){
	var btnarr = [this.sizebtn, this.durationbtn, this.exebtn, this.buildbtn, this.choofile];
	disableBtn(btnarr);


	var order = this.text.value.trim().split("\n");

	var i = 0, j = 0, cot = 0;
	var movToOrder = [];
	var app = this;
	var timer = setInterval(function(){
		app.clearColor();
		app.sideRender(i, "scan");
		if(i == order.length){
			clearInterval(timer);
			enableBtn(btnarr);
			return;
		}
		if(!app.square.checkCmd(order[i])){
			if(/^MOV\sTO\s\d+,\d+$/i.test(order[i])){
				if(j == 0){
					var one_order = order[i].trim().split(" ");
					var pos = one_order[2].split(",");
					var endx = parseInt(pos[0]), endy = parseInt(pos[1]);
					if(app.square.x == endx && app.square.y == endy){
						console.log("Already at the end pos.");
						i++;
						return;
					}
					if(app.square.bound(endx, endy)) {
						movToOrder = app.square.findPath(endx, endy);
						cot = movToOrder.length;
						if(cot == 0){
							app.sideRender(i, "error");
							clearInterval(timer);
							return;
						}
					}
				}
				if(j == cot){
					j = 0;
					i++;
				}else{
					app.square.operation(movToOrder[j++]);
				}
			}else{
				app.square.operation(order[i]);
				i++;
				if(i % 22 == 0) {
					app.text.scrollTop += app.text.clientHeight;
					app.ol.scrollTop += app.text.clientHeight;
				}
			}
		}else{
			app.sideRender(i, "error");
			clearInterval(timer);
			return;
		}
	}, DURATION);
}

var app = new Application();
window.onload = app.init.bind(app);