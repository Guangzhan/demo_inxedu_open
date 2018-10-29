/*-------- audio fun 2015/12/11 --------*/
var audio = function() {
	this.audio = document.querySelector("#audio"); //audio元素
	this.stick = document.querySelector("#stick"); //进度条
	this.playBtn = document.querySelector("#btn-playorpause"); //播放暂停按钮
	this.aName = document.querySelector("#aName"); //音频名称
	this.buffer = document.querySelector("#buffer"); //缓冲状态
	this.acTime = document.querySelector("#adoCurrentTime"); //当前音频时间
	this.aaTime = document.querySelector("#adoAllTime"); //当前音频总时长
	this.adoPic = document.querySelector(".ado-c-img"); //当前音频封面图

	this.mlist = [musicName];
	this.msrc = [musicUrl];

	this.init();
	this.calculate();
};
audio.prototype = {
	init : function() {
		var _this = this;

		_this.audio.autobuffer = false; //设置是否在页面加载时自动缓冲音频
		_this.audio.autoplay = false; //设置音频是否自动播放
		_this.audio.loop = false; //设置音频是否要循环播放

		_this.audio.src = _this.msrc[0];
		_this.aName.innerHTML = _this.adoPic.alt = _this.mlist[0];

		_this.playBtn.onclick = function() {
			if (_this.audio.paused) {
				_this.audio.play();
				_this.playBtn.className = "btn-playorpause adoStop";
				_this.playBtn.setAttribute("title" , "暂停");
				_this.playBtn.innerHTML = "暂停";
			} else {
				_this.audio.pause();
				_this.playBtn.className = "btn-playorpause";
				_this.playBtn.setAttribute("title" , "播放");
				_this.playBtn.innerHTML = "播放";
			};
		}
	},
	calculate : function() {
		var _this = this,
			_timer = null;
		//监听是否可以播放
		_this.audio.addEventListener("canplay",function(){
			_this.buffer.style.display="none";
		},false);
		//监听是否缓冲
		_this.audio.addEventListener("loadstart",function(){
			_this.buffer.style.display="block";
		},false);
		//监听已加载时
		_this.audio.addEventListener("canplaythrough", function() {
			var allTime = _this.audio.duration;
			//_this.aaTime.innerHTML = _this.formatTime(allTime);
			_this.aaTime.innerHTML = musicTime;
			//_this.playPause();
		},false);
		//监听播放中
		_this.audio.addEventListener("play", function() {
			_this.adoTime();
			_this.playBtn.className = "btn-playorpause adoStop";
			_this.playBtn.setAttribute("title" , "暂停");
			_this.playBtn.innerHTML = "暂停";
			_this.adoPic.parentNode.className = "ado-cover-wrap ado-rotate";
		}, false);
		//监听暂停中
		_this.audio.addEventListener("pause", function() {
			clearInterval(_this._timer);
			_this.playBtn.className = "btn-playorpause";
			_this.playBtn.setAttribute("title" , "播放");
			_this.playBtn.innerHTML = "播放";
			_this.adoPic.parentNode.className = "ado-cover-wrap";
		}, false);
		//监听播放进度条
		_this.audio.addEventListener("timeupdate", function() {
			var adoAllTime = _this.audio.duration;
			if (!isNaN(_this.audio.duration)) {
				var progressValue = _this.audio.currentTime/adoAllTime*200;
				_this.stick.style.width = parseInt(progressValue) + "px";
			};
		}, false);
		//监听播放结束时
		_this.audio.addEventListener("ended", function() {
			_this.stick.style.width = 0;
			_this.playBtn.className = "btn-playorpause";
			_this.playBtn.setAttribute("title" , "播放");
			_this.playBtn.innerHTML = "播放";
			clearInterval(_this._timer);
			var adoCurrentTime = _this.audio.currentTime;
			_this.acTime.innerHTML = _this.formatTime(0);
			_this.adoPic.parentNode.className = "ado-cover-wrap";
		}, false);
	},
	playPause : function() {
		var _this = this;
		_this.playBtn.onclick = function() {
			if (_this.audio.paused) {
				_this.audio.play();
				_this.playBtn.className = "btn-playorpause adoStop";
				_this.playBtn.setAttribute("title" , "暂停");
				_this.playBtn.innerHTML = "暂停";
			} else {
				_this.audio.pause();
				_this.playBtn.className = "btn-playorpause";
				_this.playBtn.setAttribute("title" , "播放");
				_this.playBtn.innerHTML = "播放";
			};
		}
	},
	adoTime : function() {
		var _this = this;
		_this._timer = setInterval(function() {
			var adoCurrentTime = _this.audio.currentTime;
			_this.acTime.innerHTML = _this.formatTime(adoCurrentTime);
		}, 1000);
	},
	formatTime : function(sTime) {
		//分
		var minute = sTime / 60,
			minutes = parseInt(minute);
		if (minutes < 10) {
			minutes = "0" + minutes;
		};
		//秒
		var second = sTime % 60,
			seconds = parseInt(second);
		if (seconds < 10) {
			seconds = "0" + seconds;
		};
		var fmTime = "" + "" + minutes + "" + ":" + "" + seconds + "";
		return fmTime;
	}
};
new audio();