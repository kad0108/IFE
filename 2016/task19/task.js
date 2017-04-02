(function(){
	var $ = function(ele){
			return document.querySelectorAll(ele);
		},
		data = [],
		HEIGHT = 400,
		wait = 60,
		FACTOR = HEIGHT/100,
		aniq = delay(function(){}, 0),
		
		$display = $('.display')[0],
		$spans = $display.children,
		$btns = $('.btn')[0],

		geneDom = function(){
			console.log('TEST');
			randomNum();
			$display.innerHTML = "";
			data.forEach(function(item){
				var span = document.createElement('span');
				span.style.height = item * FACTOR + 'px';
				span.innerText = item;
				$display.appendChild(span);
			})
			function randomNum(){
				data = [];
				for(var i = 1; i <= 50; i++){
					data.push(parseInt(Math.random() * 90) + 10);
				}
			}
		},
		sort = {
			bubble: function(){
				for(var i = 0, len = data.length; i < len; i++){
					for(var j = 1; j < len; j++){
						if(data[j-1] > data[j]){
							render(j-1, data[j]);
							render(j, data[j-1]);
							[data[j-1], data[j]] = [data[j], data[j-1]];
						}
					}
				}
			},
			quickSort: function(l, r){
				if(l < r){
					renderRange(l, r);
					var q = this.partition(l, r);
					clearRange(l, r);
					this.quickSort(l, q-1);
					this.quickSort(q+1, r);
				}
			},
			partition: function(l, r){
				var tmp = data[l];
				while(l < r){
					while((l < r) && (tmp < data[r])) r--;
					if(l < r) {
						render(l, data[r]);
						data[l++] = data[r];
					}
					while((l < r) && (tmp > data[l])) l++;
					if(l < r) {
						render(r, data[l]);
						data[r--] = data[l];
					}
				}
				if(l == r) {
					render(l, tmp);
					data[l] = tmp;
				}
				return l;
			},
			mergeSort: function(l, r){
				if(l < r){
					var q = parseInt((l + r) / 2);//必须是向下取整
					this.mergeSort(l, q);
					this.mergeSort(q+1, r);
					renderRange(l, r);
					this.merge(l, q, r);
					for(var i = l; i <= r; i++){
						render(i, data[i]);
					}
					clearRange(l, r);
				}
			},
			merge: function(l, q, r){
				var tmp = [], k = l;
				var ll = l, lr = q;
				var rl = q+1, rr = r;
				while((ll <= lr) && (rl <= rr)){
					if(data[ll] < data[rl]) tmp[k++] = data[ll++];
					else tmp[k++] = data[rl++];
				}
				while(ll <= lr) tmp[k++] = data[ll++];
				while(rl <= rr) tmp[k++] = data[rl++];
				for(var i = l; i <= r; i++){
					data[i] = tmp[i];
				}
			}
		},
		render = function(id, val){
			aniq.delay(function(){
				$spans[id].classList.remove("range");
				$spans[id].style.height = val * FACTOR + 'px';
				$spans[id].innerText = val; 
			}, wait);
		},
		renderRange = function(l, r){
			aniq.delay(function(){
				for(var i = l; i <= r; i++){
					$spans[i].classList.add("range");
				}
			}, wait);
		},
		clearRange = function(l, r){
			aniq.delay(function(){
				for(var i = l; i <= r; i++){
					$spans[i].classList.remove("range");
				}
			}, wait);
		},
		disableBtns = function(id){
			var all = false;
			if(!arguments.length) all = true;
			[].forEach.call($btns.children, function(item){
				if(all) item.disabled = true;
				else{
					if(id == -1 || item.dataset.val == id) item.disabled = false;
					else item.disabled = true;
				}
			})
		}
		init = function(){
			console.log($btns);
			disableBtns(0);
			EventUtil.addEvent($btns, "click", function(e){
				// EventUtil.stopPropagation();
				var target = EventUtil.getTarget(e);
				console.log('click');
				if(target){
					switch(parseInt(target.dataset.val)){
						case 0:
							geneDom();
							disableBtns(-1);
							break;
						case 1:
							disableBtns();
							sort.bubble();
							aniq.delay(function(){
								disableBtns(0);
							}, 0);
							break;
						case 2:
							disableBtns();
							sort.quickSort(0, data.length-1);
							aniq.delay(function(){
								disableBtns(0);
							}, 0);
							break;
						case 3:
							disableBtns();
							sort.mergeSort(0, data.length-1);
							aniq.delay(function(){
								disableBtns(0);
							}, 0);
							break;
					}
				}
			});
		};
	init();
})();