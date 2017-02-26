var data = [],
	HEIGHT = 400;
	$ = function(ele){
		return document.querySelectorAll(ele);
	},
	$display = $('.display')[0],
	$btns = $('.btn')[0],
	geneDom = function(){
		randomNum();
		data.forEach(function(item){
			var span = document.createElement('span');
			span.style.height = HEIGHT * (item / 100) + 'px';
			span.innerText = item;
			$display.appendChild(span);
		})
		function randomNum(){
			data = [];
			for(var i = 1; i <= 60; i++){
				data[i] = parseInt(Math.random() * 90) + 10;
			}
		}
	},
	
	sort = {
		bubble: function(){
			for(var i = 0, len = data.length; i < len; i++){
				for(var j = i+1; j < len; j++){
					if(data[i] > data[j]) 
				}
			}
		}
	},
	init = function(){
		EventUtil.addEvent($btns, "click", function(e){
			EventUtil.stopPropagation();
			var target = EventUtil.getTarget(e);
			if(target){
				switch(target.dataset.val){
					case 0:
						geneDom();
						break;
				}
			}
		});
	};
init();