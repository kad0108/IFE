function MusicPlayer(){
	this.$playlist = $('.playlist')[0];
	this.$title = $('.title')[0];
	this.$cover = $('.cover')[0];
	this.$artist = $('.artist')[0];
	this.$time = $('.time')[0];
	this.$play = $('.play')[0];
	this.$pause = $('.pause')[0];
	this.$progress = $('.progress')[0];
	this.$progressVal = $('.progressbar')[0];
	this.$volume = $('.volume')[0];
	this.$volumeVal = $('.volumebar')[0];
	this.$pre = $('.pre')[0];
	this.$next = $('.next')[0];
	this.playIndex = 0;
	this.audio = new Audio();
	this.deg = 0;
	this.visualizer = new Visualizer(this.audio);
	this.init();
}
MusicPlayer.prototype = {
	constructor: this,
	init: function(){
		this.$playlist.innerHTML = playlist.map(function(item, index){
			return `<li class="playlist-item" data-index="${index}">${index+1}. ${item.title} - ${item.artist}</li>`
		}).join('');
		this.$playlistItem = $('.playlist-item');

		EventUtil.addEvent(this.$playlist, 'click', (e) => {
			this.sing(~~e.target.dataset.index);
		})
		EventUtil.addEvent(this.$play, 'click', this.play.bind(this));
		EventUtil.addEvent(this.$pause, 'click', this.pause.bind(this));
		EventUtil.addEvent(this.$progress, 'click', this.setProgress.bind(this));
		EventUtil.addEvent(this.$volume, 'click', this.setVolume.bind(this));
		EventUtil.addEvent(this.audio, 'timeupdate', this.updateProgress.bind(this));
		EventUtil.addEvent(this.$pre, 'click', this.pre.bind(this));
		EventUtil.addEvent(this.$next, 'click', this.next.bind(this));
		EventUtil.addEvent(this.audio, 'ended', this.next.bind(this));
		EventUtil.addEvent(this.audio, 'canplay', () => {
			this.$cover.classList.remove('rotate-pause');
		})
		this.sing(0);
	},
	setProgress: function(e){
		let rect = e.currentTarget.getBoundingClientRect();
		let num = (e.x - rect.left) / rect.width * this.audio.duration;
		this.audio.currentTime = num; // 修改currentTime会触发timeupdate事件
	},
	updateProgress: function(e){
		var time = this.audio.currentTime;
		var minute = ~~(time / 60);
		var second = ~~(time % 60);
		if(second < 10) second = '0' + second;
		this.$time.textContent = `${minute}:${second}`;
		this.$progressVal.style.width = (time / this.audio.duration) * 100 + '%';
	},
	setVolume: function(e){
		let rect = e.currentTarget.getBoundingClientRect();
		let num = (e.x - rect.left) / rect.width;
		this.$volumeVal.style.width = num * 100 + '%';
		this.audio.volume = num;
	},
	load: function(index){
		var song = playlist[index];
		this.$cover.src = song.picUrl;
		this.$title.textContent = song.title;
		this.$artist.textContent = song.artist;
		this.audio.src = song.src;
		document.title = song.title;
	},
	play: function(e){
		this.audio.play();
		this.$play.classList.add('hide');
		this.$pause.classList.remove('hide');
		if(e && e.target.className.indexOf('play') != -1){
			this.$cover.classList.remove('rotate-pause');
		}

		// var playPromise = this.audio.play();
		// var self = this;
		// if(playPromise !== undefined){
		// 	playPromise.then(function(){
		// 		console.log('ok');
		// 	}).catch(function(err){
		// 		self.visualizer = new Visualizer();
		// 		console.log('Err:', err);
		// 	})
		// }
	},
	sing: function(index){
		if(index != this.playIndex) {
			this.$cover.classList.remove('rotate');
			setTimeout(()=>{
				this.$cover.classList.add('rotate');
			}, 0);
		}
		this.$playlistItem[this.playIndex].classList.remove('selected');
		this.playIndex = index;
		this.$playlistItem[index].classList.add('selected');
		this.load(index);
		this.play();
	},
	pause: function(){
		this.audio.pause();
		this.$play.classList.remove('hide');
		this.$pause.classList.add('hide');
		this.$cover.classList.add('rotate-pause');
	},
	pre: function(){
		if(this.playIndex == 0){
			this.sing(playlist.length - 1);
		}else{
			this.sing(this.playIndex - 1);
		}
	},
	next: function(){
		if(this.playIndex == playlist.length - 1){
			this.sing(0);
		}else{
			this.sing(this.playIndex + 1);
		}
	}
}
