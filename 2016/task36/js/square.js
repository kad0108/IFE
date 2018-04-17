var SQUARE_SIZE = 50;

function Square(sq){
	this.sq = sq;
	this.dir = 0;//0:top, 1:right, 2:bottom, 3:left
	this.deg = 0;
}

Square.prototype.init = function(){
	this.sq.style.display = "block";
	this.sq.style.top = SQUARE_SIZE + "px";
	this.sq.style.left = SQUARE_SIZE + "px";
	this.sq.style.transform = "rotate(0deg)";
	this.top = SQUARE_SIZE;
	this.left = SQUARE_SIZE;
	this.x = 1;
	this.y = 1;
}

Square.prototype.checkCmd = function(one_order){
	var regGo = /^GO(\s\d+)?$/i;
	// var regGo = new RegExp("GO(\s\d+)?", "i");
	var regTun = /^TUN\s(LEF|RIG|TOP|BOT)$/i;
    var regTraMov = /^(TRA|MOV)\s(LEF|RIG|TOP|BOT)(\s\d+)?$/i;
    var regBuild = /^BUILD$/i;
    var regBru = /^BRU\s(#[0-9A-Fa-f]{3}|#[0-9A-Fa-f]{6}|[A-Za-z]+|rgba\(\d+,\d+,\d+,\d+\))$/i;
    var regMovTo = /^MOV\sTO\s\d+,\d+$/i;
    return !regGo.test(one_order) && !regTun.test(one_order) && !regTraMov.test(one_order) && !regBuild.test(one_order) && !regBru.test(one_order) && !regMovTo.test(one_order);
}

Square.prototype.bound = function(top, left){
	var len = SQUARE_SIZE * TABLE_SIZE;
	return top > 0 && top <= len && left >0 && left <= len;
}

Square.prototype.position = function(top, left){
	this.sq.style.top = top + "px";
	this.sq.style.left = left + "px";
	this.top = top;
	this.left = left;
	this.x = top / SQUARE_SIZE;
	this.y = left / SQUARE_SIZE;
}

Square.prototype.rotate = function(dir){
	if(dir == "TOP") this.deg = 0;
	else if(dir == "RIG") this.deg = 90;
	else if(dir == "BOT") this.deg = 180;
	else if(dir == "LEF") this.deg = 270;
	this.dir = this.deg/90%4;

	this.sq.style.transform = "rotate(" + this.deg + "deg)";
}

Square.prototype.goTop = function(num){
	while(this.bound(this.top - SQUARE_SIZE, this.left) && !map[this.x - 1][this.y] && num){
		this.position(this.top - SQUARE_SIZE, this.left);
		num--;
	}
}

Square.prototype.goRig = function(num){

	while(this.bound(this.top, this.left + SQUARE_SIZE) && !map[this.x][this.y + 1] && num){
		this.position(this.top, this.left + SQUARE_SIZE);
		num--;
	}
}

Square.prototype.goBot = function(num){
	while(this.bound(this.top + SQUARE_SIZE, this.left) && !map[this.x + 1][this.y] && num){
		this.position(this.top + SQUARE_SIZE, this.left);
		num--;
	}
}

Square.prototype.goLef = function(num){
	while(this.bound(this.top, this.left - SQUARE_SIZE) && !map[this.x][this.y - 1] && num){
		this.position(this.top, this.left - SQUARE_SIZE);
		num--;
	}
}

Square.prototype.operation = function(order){
	order = order.toUpperCase();
	order = order.trim().split(" ");
	var num;
	switch(order[0]){
		case "GO":
			num = order[1] === undefined ? 1 : parseInt(order[1]);
			this.go(num);
			break;
		case "TUN":
			this.rotate(order[1]);
			break;
		case "TRA":
			num = order[2] === undefined ? 1 : parseInt(order[2]);
			this.tramovAction(order[1], num, false);
			break;
		case "MOV":
			num = order[2] === undefined ? 1 : parseInt(order[2]);
			this.tramovAction(order[1], num, true);
			break;
		case "BUILD":
			this.build();
			break;
		case "BRU":
			this.bru(order[1]);
			break;
		default:
			break;
	}
}

Square.prototype.go = function(num){
	if(this.dir == 0) this.goTop(num);
	else if(this.dir == 1) this.goRig(num);
	else if(this.dir == 2) this.goBot(num);
	else if(this.dir == 3) this.goLef(num);
}

Square.prototype.tramovAction = function(dir, num, ifmov){
	if(ifmov) this.rotate(dir); 
	if(dir == "TOP") this.goTop(num);
	else if(dir == "RIG") this.goRig(num);
	else if(dir == "BOT") this.goBot(num);
	else if(dir == "LEF") this.goLef(num);
}

Square.prototype.wallPos = function(){
	var wx, wy;
	if(this.dir == 0){
		wx = this.x - 1;
		wy = this.y;
	}else if(this.dir == 1){
		wx = this.x;
		wy = this.y + 1;
	}else if(this.dir == 2){
		wx = this.x + 1;
		wy = this.y;
	}else if(this.dir == 3){
		wx = this.x;
		wy = this.y - 1;
	}
	return {"x": wx, "y":wy};
}

Square.prototype.build = function(){
	var wallPos = this.wallPos();
	var wx = wallPos.x, wy = wallPos.y;
	if(this.bound(wx * SQUARE_SIZE, wy * SQUARE_SIZE) && !map[wx][wy]){
		var id = wx + '_' + wy;
		map[wx][wy] = 1;
		$(id).className = "wall";
	}
}

Square.prototype.bru = function(color){
	var wallPos = this.wallPos();
	var wx = wallPos.x, wy = wallPos.y;
	if(map[wx][wy] == 1){
		var id = wx + '_' + wy;
		$(id).style.backgroundColor = color;
	}else{
		console.log("no wall ahead, can't bru");
	}
}
/**
* @constructor
* @params x:方块到达位置的x坐标
* @params y:方块到达位置的y坐标
* @params dir:方块的方向，顺时针 top|0 right|1 bottom|2 left|3
*/
var PosObj = function(x, y, dir){
	this.x = x;
	this.y = y;
	this.dir = dir;
}
/**
 * BFS实现寻路算法
 * @returns {array}
 */
Square.prototype.findPath = function(endx, endy){
	var dirx = [-1, 0, 1, 0],
		diry = [0, 1, 0, -1];
	var queue = [];//队列实现bfs
	var pre = [];//记录节点的前驱节点
	var flag = [];//标记节点是否访问过

	for(var i = 0; i <= TABLE_SIZE; i++){
		flag[i] = [];
		pre[i] = [];
		for(var j = 0; j <= TABLE_SIZE; j++){
			flag[i][j] = 0;
			pre[i][j] = new PosObj(-1, -1, -10);
		}
	}
	//起点
	var startx = this.x, starty = this.y;
	var posObj = new PosObj(startx, starty, -10);
	queue.push(posObj);
	flag[posObj.x][posObj.y] = 1;

	var ans = 0;//标记是否到达终点(endx,endy)
	while(queue.length > 0)
	{
		var now = queue.shift();
		if(now.x == endx && now.y == endy){
			ans = 1;
			break;
		}
		for(var k = 0; k < 4; k++){
			var nx = now.x + dirx[k], ny = now.y + diry[k];
			if(this.bound(nx * SQUARE_SIZE, ny * SQUARE_SIZE) && !flag[nx][ny] && !map[nx][ny]){
				flag[nx][ny] = 1;
				queue.push(new PosObj(nx, ny, k));
				pre[nx][ny] = new PosObj(now.x, now.y, k);
			}
		}
	}
	var order = [];
	if(ans == 1){
		var tempx = endx, tempy = endy;
		var path = [];
		while(tempx != -1 && tempy != -1){
			path.push(new PosObj(tempx,tempy, pre[tempx][tempy].dir) );
			var nx = tempx, ny = tempy;
			tempx = pre[nx][ny].x;
			tempy = pre[nx][ny].y;
		}
		path.reverse();
		for(var i = 0; i < path.length; i++){
			if(path[i].dir == 0){
				// square.dir = 0;
				order.push("MOV TOP");
			}else if(path[i].dir == 1){
				// square.dir = 1;
				order.push("MOV RIG");
			}else if(path[i].dir == 2){
				// square.dir = 2;
				order.push("MOV BOT");
			}else if(path[i].dir == 3){
				// square.dir = -1;
				order.push("MOV LEF");
			}
		}
	}else{
		console.log("can't reach the end position");
	}
	
	return order;
}