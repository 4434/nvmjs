class timeAbility {
	r = 4;
	x = 100;
	y = 200;
	g = .5;
	speed = 2;
	color = '#999';
	colorArr = ['#68ff03','#03a9ff','#026dff','#ff1705',"#ff9600","#363535","#b98080","#0ac1f6","#050b43","#5059ac"];
	deathBall = [];
	constructor (ctx, w, h) {
		this.ctx = ctx;
		this.w   = w;
		this.h   = h;
		this.timeArr  = [];
		this.firstArr = []; 
		this.init();
		
	}

	init () {
		let that = this;
		window.requestAnimFrame = (function(){
			return  window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					function( callback ){
					  window.setTimeout(callback, 1000 / 60);
					};
			})();
		
		(function animloop(){
			requestAnimFrame(animloop);

			that.clear(0, 0, that.w, that.h);
			that.drawTime(that.time());
			that.falling(that.deathBall);
				
	  	})();
	}

	clear (x,y,w,h) {
		this.ctx.clearRect(x,y,w,h);
	}

	time () {
		this.firstArr = this.timeArr;
		this.timeArr  = [];
		let	time 	  = new Date(),
			year      = time.getFullYear(),
			month     = time.getMonth() + 1,
			day       = time.getUTCDate(),
			hours 	  = time.getHours(),
			minutes   = time.getMinutes(),
			seconds   = time.getSeconds();
		this.timeArr = this.timeArr.concat(year.toString().split(''))
		this.timeArr.push(11);
		this.timeArr.push(parseInt(month/10));
		this.timeArr.push(parseInt(month%10));
		this.timeArr.push(11);
		this.timeArr.push(parseInt(day/10));
		this.timeArr.push(parseInt(day%10));
		this.timeArr.push(12);
		this.timeArr.push(parseInt(hours/10));
		this.timeArr.push(parseInt(hours%10));
		this.timeArr.push(10);
		this.timeArr.push(parseInt(minutes/10));
		this.timeArr.push(parseInt(minutes%10));
		this.timeArr.push(10);
		this.timeArr.push(parseInt(seconds/10));
		this.timeArr.push(parseInt(seconds%10));	
		return this.timeArr;
	}

	drawTime (timeArr) {
		let digit = this.digit();
		let flag  = false; 
		for(let i =0; i<timeArr.length; i++){
			if(timeArr[i] != this.firstArr[i]){
				flag = true;
			}
			for(let m=0; m<digit[timeArr[i]].length; m++){
				for(let n=0; n<digit[timeArr[i]][m].length; n++){
					if(digit[timeArr[i]][m][n] == 1){
						this.ball(this.x+n*2*this.r + digit[timeArr[i]][m].length*i*2*this.r, this.y+m*2*this.r, this.r, this.color);
					}
					if(flag && digit[timeArr[i]][m][n] == 1){
						let json = {x:this.x+n*2*this.r + digit[timeArr[i]][m].length*i*2*this.r, y:  this.y+m*2*this.r, vx: Math.random()*this.speed-this.speed/2, vy: Math.random()*this.speed-this.speed/2, color: this.colorArr[Math.floor(Math.random()*10)]};
						this.deathBall.push(json);
					}
				}
			}
		}
	}

	falling (arr) {
		if(arr.length > 500){
			arr = arr.slice(-500)
		}
		for(let i=0; i<arr.length; i++){
			arr[i].x  += arr[i].vx;
			arr[i].y  += arr[i].vy;
			arr[i].vy += this.g;

			this.ball(arr[i].x, arr[i].y, this.r, arr[i].color);
		}
	}

	ball (x,y,r,color) {
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x,y,r,0,Math.PI*2);
		this.ctx.fill();
		this.ctx.closePath();
	}	

	digit () {
		let digit =
		    [
		        [
		            [0,0,1,1,1,0,0],
		            [0,1,1,0,1,1,0],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [0,1,1,0,1,1,0],
		            [0,0,1,1,1,0,0]
		        ],//0
		        [
		            [0,0,0,1,1,0,0],
		            [0,1,1,1,1,0,0],
		            [0,0,0,1,1,0,0],
		            [0,0,0,1,1,0,0],
		            [0,0,0,1,1,0,0],
		            [0,0,0,1,1,0,0],
		            [0,0,0,1,1,0,0],
		            [0,0,0,1,1,0,0],
		            [0,0,0,1,1,0,0],
		            [1,1,1,1,1,1,1]
		        ],//1
		        [
		            [0,1,1,1,1,1,0],
		            [1,1,0,0,0,1,1],
		            [0,0,0,0,0,1,1],
		            [0,0,0,0,1,1,0],
		            [0,0,0,1,1,0,0],
		            [0,0,1,1,0,0,0],
		            [0,1,1,0,0,0,0],
		            [1,1,0,0,0,0,0],
		            [1,1,0,0,0,1,1],
		            [1,1,1,1,1,1,1]
		        ],//2
		        [
		            [1,1,1,1,1,1,1],
		            [0,0,0,0,0,1,1],
		            [0,0,0,0,1,1,0],
		            [0,0,0,1,1,0,0],
		            [0,0,1,1,1,0,0],
		            [0,0,0,0,1,1,0],
		            [0,0,0,0,0,1,1],
		            [0,0,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [0,1,1,1,1,1,0]
		        ],//3
		        [
		            [0,0,0,0,1,1,0],
		            [0,0,0,1,1,1,0],
		            [0,0,1,1,1,1,0],
		            [0,1,1,0,1,1,0],
		            [1,1,0,0,1,1,0],
		            [1,1,1,1,1,1,1],
		            [0,0,0,0,1,1,0],
		            [0,0,0,0,1,1,0],
		            [0,0,0,0,1,1,0],
		            [0,0,0,1,1,1,1]
		        ],//4
		        [
		            [1,1,1,1,1,1,1],
		            [1,1,0,0,0,0,0],
		            [1,1,0,0,0,0,0],
		            [1,1,1,1,1,1,0],
		            [0,0,0,0,0,1,1],
		            [0,0,0,0,0,1,1],
		            [0,0,0,0,0,1,1],
		            [0,0,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [0,1,1,1,1,1,0]
		        ],//5
		        [
		            [0,0,0,0,1,1,0],
		            [0,0,1,1,0,0,0],
		            [0,1,1,0,0,0,0],
		            [1,1,0,0,0,0,0],
		            [1,1,0,1,1,1,0],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [0,1,1,1,1,1,0]
		        ],//6
		        [
		            [1,1,1,1,1,1,1],
		            [1,1,0,0,0,1,1],
		            [0,0,0,0,1,1,0],
		            [0,0,0,0,1,1,0],
		            [0,0,0,1,1,0,0],
		            [0,0,0,1,1,0,0],
		            [0,0,1,1,0,0,0],
		            [0,0,1,1,0,0,0],
		            [0,0,1,1,0,0,0],
		            [0,0,1,1,0,0,0]
		        ],//7
		        [
		            [0,1,1,1,1,1,0],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [0,1,1,1,1,1,0],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [0,1,1,1,1,1,0]
		        ],//8
		        [
		            [0,1,1,1,1,1,0],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [1,1,0,0,0,1,1],
		            [0,1,1,1,0,1,1],
		            [0,0,0,0,0,1,1],
		            [0,0,0,0,0,1,1],
		            [0,0,0,0,1,1,0],
		            [0,0,0,1,1,0,0],
		            [0,1,1,0,0,0,0]
		        ],//9
		        [
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,1,1,0,0,0],
		            [0,0,1,1,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,1,1,0,0,0],
		            [0,0,1,1,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0]
		        ],//:
		        [
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,1,1,1,1,1,0],
		            [0,1,1,1,1,1,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0]
		        ],// -
		        [
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0],
		            [0,0,0,0,0,0,0]
		        ]// 空白
		    ];
		return digit;
	}
}       

export default timeAbility;