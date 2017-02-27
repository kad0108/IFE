/*
* test chain setTimeout
*/

function delay(fn, t){
	var queue = [], timer = null, self;
	function schedule(fn, t){
		timer = setTimeout(function(){
			timer = null;
			fn();
			if(queue.length){
				var item = queue.shift();
				schedule(item.fn, item.t);
			}
		}, t);
	}
	self = {
		delay: function(fn, t){
			if(queue.length || timer){
				queue.push({fn: fn, t: t});
			}else{
				schedule(fn, t);
			}
			return self;
		},
		cancel: function(){
			clearTimeout(timer);
			timer = null;
			queue = [];
		}
	}
	return self.delay(fn, t);
}


// function test1(){
// 	console.log(1);
// }
// function test2(){
// 	console.log(2);
// }
// function test3(){
// 	console.log(3);
// }

// delay(test1, 500).delay(test2, 500).delay(test3, 500);