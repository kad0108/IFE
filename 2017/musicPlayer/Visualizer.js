function Visualizer(audio){
	this.$canvas = $('canvas')[0];
	this.width = innerWidth;
	this.height = 256;
	this.$canvas.width = this.width;
	this.$canvas.height = this.height;
	this.context = this.$canvas.getContext('2d');

	if(audio) {

		audio.crossOrigin = "anonymous";
		this.ac = new (window.AudioContext || window.webkitAudioContext)();
		this.mediaSource = this.ac.createMediaElementSource(audio);
		this.analyser = this.ac.createAnalyser();
		this.size = 128; // 实时音频频域个数
		this.analyser.fftSize = this.size * 2;
		
		this.mediaSource.connect(this.analyser);
		this.analyser.connect(this.ac.destination);
		this.arr = new Uint8Array(this.analyser.frequencyBinCount);

		this.line = this.context.createLinearGradient(0, 0, 0, this.height);
		this.line.addColorStop(0, "red");
		this.line.addColorStop(0.5, "yellow");
		this.line.addColorStop(1, "green");

		this.loop();
	}
}
Visualizer.prototype = {
	constructor: this,
	loop: function(){
		// console.log(this.arr);
		this.analyser.getByteFrequencyData(this.arr);
		this.draw();
		requestAnimationFrame(this.loop.bind(this));
	},
	draw: function(){
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillStyle = this.line;
		var w = this.width / this.size;
		for(var i = 0; i < this.size; i++){
			this.context.save();
			var h = this.arr[i] / (this.size*2) * this.height;
			this.context.fillRect(w * i, this.height - h, w*0.6, h);
			this.context.restore();
		}
	}
}