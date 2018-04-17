var TABLE_SIZE = 10;
var map = [];

function Table(){
	
}
Table.prototype.init = function(){
	var tbody = document.getElementsByTagName("tbody")[0];
	tbody.innerHTML = "";
	var content = "";
	map = [];
	for(var i = 0; i <= TABLE_SIZE; i++){
		map[i] = [];
		content += "<tr>";
		for(var j = 0; j <= TABLE_SIZE; j++){
			if(i == 0 && j != 0){
				content += "<td>" + j + "</td>";
			}else if(i != 0 && j == 0){
				content += "<td>" + i + "</td>";
			}else{
				content += "<td id="+i+"_"+j+"></td>";
			}
			map[i].push(0);
		}
		content += "</tr>";
	}
	tbody.innerHTML = content;
}
Table.prototype.wall = function(){
	this.init();
	for(var i = 0; i < TABLE_SIZE; i++){
		var x = parseInt(Math.random()*TABLE_SIZE);
		var y = parseInt(Math.random()*TABLE_SIZE);
		if(this.bound(x * SQUARE_SIZE, y * SQUARE_SIZE) && x!= 1 && y != 1){
			var id = x + "_" + y;
			$(id).className = "wall";
			map[x][y] = 1;
		}
	}
}
Table.prototype.bound = function(top, left){
	var len = SQUARE_SIZE * TABLE_SIZE;
	return top > 0 && top <= len && left >0 && left <= len;
}