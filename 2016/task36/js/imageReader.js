function ImageReader(){
	this.canvas = document.createElement("canvas");
	this.img = document.createElement("img");
	this.cmds = "";
}

ImageReader.prototype.load = function(reader){
	this.img.src = reader.result;
	var context = this.canvas.getContext("2d");
    context.drawImage(this.img, 0, 0, TABLE_SIZE, TABLE_SIZE);
    var data = [];
    for(var h = 0; h < TABLE_SIZE; h++){
        data.push([]);
        for(var w = 0; w < TABLE_SIZE; w++){
            data[h].push(toRGBA(context.getImageData(w, h, 1, 1).data));
        }
    }
    this.createCmd(data);
    function toRGBA(pixel){
		return 'rgba(' + pixel[0] + ',' + pixel[1] + ',' + pixel[2] + ',' + pixel[3] + ')'
	}
}

ImageReader.prototype.createCmd = function(data){
	var cmds = "mov to 1,1\ntun top\ntra bot\n";
	for(var i = 0; i < data.length; i++){
		if(i == data.length - 1){
			cmds += "tun rig\ntra lef\n";
			for(var j = data[i].length - 1; j >= 0; j--){
				if(i == data.length - 1 && j == 0) break;
				cmds += "build\n";
				cmds += "bru " + data[i][j] + "\n";
				if(i % 2 == 1) cmds += "tra lef\n";
				else if(i % 2 == 0) cmds += "tra rig\n";
			}		
		}else{
			for(var j = 0; j < data[i].length; j++){
				cmds += "build\n";
				cmds += "bru " + data[i][j] + "\n";
				if(j == data[i].length - 1) cmds += "tra bot\n";
				else if(i % 2 == 1) cmds += "tra lef\n";
				else if(i % 2 == 0) cmds += "tra rig\n";
			}
		}
	}
	this.cmds = cmds;
}