/*
* Bucket木桶布局
*/
function Bucket(ele, minHeight){
	this.ele = ele;
	this.minHeight = minHeight || 300;
	this.minRadio = this.ele.clientWidth / this.minHeight;
	this.gap = 8;
	this.photos = [];
}
//获得完整的一行图片数据，不满一行的数据留着下一次用
Bucket.prototype.getRows = function(photos){
	photos = this.photos.concat(photos);//合并上次剩下的图片
	var radio = 0;
	var rows = [];
	var row_photos = [];//存放要放在一行的图片数据
	for(var i = 0; i < photos.length; i++){
		row_photos.push(photos[i]);
		radio += Number(photos[i].aspect_ratio);
		if(radio > this.minRadio){//累加的长宽比大于minRadio时，则之前累加的图片作为一行
			rows.push({
				radio: radio,
				photos: row_photos,
			})
			row_photos = [];
			radio = 0;
		}
	}
	this.photos = row_photos;//剩下的图片留到下一次
	return rows;
}
//渲染布局
Bucket.prototype.append = function(photos){
	var rows = this.getRows(photos);
	for(var i = 0; i < rows.length; i++){
		var row = rows[i];
		var actualWidth = this.ele.clientWidth - (row.photos.length+1) * this.gap;
		var $row = document.createElement('div');
		$row.className = 'gallery-row';
		$row.style.height = actualWidth / row.radio + 'px';
		$row.innerHTML = row.photos.reduce(function(html, photo){
			html += '<div class="gallery-item">' + 
						'<img title=' + photo.name + ' data-radio=' + photo.aspect_ratio +
							 ' data-large=' + photo.large_url + ' src=' + photo.image_url + '>' + 
						'<div class="gallery-infor">' + photo.name + 
						'</div>' + 
					'</div>';
			return html;
		}, '');
		this.ele.appendChild($row);
	}
}