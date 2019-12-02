class keyGame {
	r 			= 3;
	keyArr 		= [];
	len 		= 5;
	vx  		= 0;
	vy  		= 1;
	colorArr  	= ['#68ff03','#03a9ff','#026dff','#ff1705',"#ff9600","#363535","#b98080","#0ac1f6","#050b43","#5059ac"];
	deathBall	= [];
	fraction    = 0;
	constructor (ctx, w, h) {
		this.ctx = ctx;
		this.w   = w;
		this.h   = h;
		
		this.init();
	}

	init () {
		for(let i =0; i<this.len; i++){			
			this.keyArr.push({key: Math.floor(Math.random()*26), x: this.w*Math.random(), y:0, vx: this.vx, vy: this.vy, g: 0});
		}

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
			that.loop();
				
	  	})();

		this.keySet();
	}

	clear (x,y,w,h) {
		this.ctx.clearRect(x,y,w,h);
    }

	loop () {
		this.clear(0,0,this.w,this.h);
		for(let i=0; i<this.keyArr.length; i++){
			this.keyArr[i].x += this.keyArr[i].vx;
			this.keyArr[i].y += this.keyArr[i].vy;
			if(this.keyArr[i].y >= this.h){
				this.keyArr.splice(i,1);
				this.keyArr.push({key: Math.floor(Math.random()*26), x: this.w*Math.random(), y:0, vx: this.vx, vy: this.vy, g: 0});
				break;
			}
		}
		this.draw(this.keyArr);
		this.blast(this.deathBall);
	}

	draw (arr) {
		for(let i=0; i<arr.length; i++){
			let font = this.letter()[arr[i].key];
			for(let m=0; m<font.length; m++){
				for(let n=0; n<font[m].length; n++){
					if(font[m][n] == 1){
						this.ball(arr[i].x + 2*this.r*n, arr[i].y + 2*this.r*m, this.r, 'red');
					}
				}
			}
		}
	}

	death (item) {
		this.fraction ++;
		
		if(this.fraction > 10){
			this.vy = parseInt(this.fraction/10)
		}

		let font = this.letter()[item.key];
		for(let m=0; m<font.length; m++){
			for(let n=0; n<font[m].length; n++){
				if(font[m][n] == 1){
					this.deathBall.push({x:item.x + 2*this.r*n, y: item.y + 2*this.r*m, r: this.r, vx: Math.random()*10-5, vy: Math.random()*10-5, color: this.colorArr[Math.floor(Math.random()*10)]});
				}
			}
		}
	}

	ball (x,y,r,color) {
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x,y,r,0,Math.PI*2);
		this.ctx.fill();
		this.ctx.closePath();
	}

	blast (ball) {
		if(ball.length > 200){
			ball.splice(0, ball.length - 200);
		}
		for(let i=0; i< ball.length; i++){
			this.ctx.fillStyle = ball[i].color;
			this.ctx.beginPath();		
			ball[i].x += ball[i].vx;
			ball[i].y += ball[i].vy;
			this.ctx.arc(ball[i].x,ball[i].y,ball[i].r,0,Math.PI*2);
			this.ctx.fill();
			this.ctx.closePath();			
		}
	}	

    keySet () {
        let that = this;
        let flag = true;
        document.onkeydown = function (event) {
            if(flag){
                flag = false;
                for(let i=0; i<that.keyArr.length; i++){
                	if(that.keyArr[i].key + 65 == event.keyCode){
                		that.death(that.keyArr[i]);
                		that.keyArr.splice(i,1);
                		that.keyArr.push({key: Math.floor(Math.random()*26), x: that.w*Math.random(), y:0, vx: that.vx, vy: that.vy, g: 0});
                		break;
                	}
                }
            }
			document.onkeyup = function() {
				flag = true;
			}	            
        }
    }	

	letter () {
		var letters = [
			[
				[0,0,0,1,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,1,0,1,0,0],
				[0,0,0,0,0,0,0],
				[0,1,1,1,1,1,0],
				[1,0,0,0,0,0,1],
				[0,0,0,0,0,0,0],
			],
			[
				[0,1,1,1,1,0,0],
				[0,1,0,0,1,0,0],
				[0,1,0,1,0,0,0],
				[0,1,1,0,0,0,0],
				[0,1,1,1,0,0,0],
				[0,1,0,0,1,0,0],
				[0,1,1,1,1,0,0],
			],
			[
				[0,1,1,1,1,1,0],
				[0,1,1,1,1,1,0],
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
				[0,1,1,1,1,1,0],
				[0,1,1,1,1,1,0],
			],
			[
				[0,1,1,1,1,0,0],
				[0,1,1,0,1,1,0],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,1,1,0],
				[0,1,1,1,1,0,0],
			],
			[
				[0,1,1,1,1,1,0],
				[0,1,1,1,1,1,0],
				[0,1,1,0,0,0,0],
				[0,1,1,1,1,1,0],
				[0,1,1,0,0,0,0],
				[0,1,1,1,1,1,0],
				[0,1,1,1,1,1,0],
			],
			[
				[0,1,1,1,1,1,0],
				[0,1,1,1,1,1,0],
				[0,1,1,0,0,0,0],
				[0,1,1,1,1,1,0],
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
			],
			[
				[0,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,0,0,0,0,0],
				[1,1,0,1,1,1,1],
				[1,1,0,0,0,1,1],
				[1,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
			],
			[
				[1,1,0,0,0,1,1],
				[1,1,0,0,0,1,1],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,0,0,0,1,1],
				[1,1,0,0,0,1,1],
				[1,1,0,0,0,1,1],
			],
			[
				[0,0,1,1,1,0,0],
				[0,0,1,1,1,0,0],
				[0,0,0,0,0,0,0],
				[0,0,1,1,1,0,0],
				[0,0,1,1,1,0,0],
				[0,0,1,1,1,0,0],
				[0,0,1,1,1,0,0],
			],
			[
				[0,0,1,1,1,0,0],
				[0,0,1,1,1,0,0],
				[0,0,0,0,0,0,0],
				[0,1,1,1,1,0,0],
				[0,0,0,1,1,0,0],
				[0,0,0,1,1,0,0],
				[0,1,1,1,1,0,0],
			],
			[
				[0,1,1,0,0,1,1],
				[0,1,1,0,1,1,0],
				[0,1,1,1,1,0,0],
				[0,1,1,1,1,0,0],
				[0,1,1,0,1,1,0],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,0,1],
			],
			[
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
			],
			[
				[0,0,0,0,0,0,0],
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
				[0,1,0,1,1,0,1],
				[0,1,0,1,1,0,1],
				[0,1,0,1,1,0,1],
				[0,1,0,1,1,0,1],
			],
			[
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
			],
			[
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
			],
			[
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,0,0,0,0],
				[0,1,1,0,0,0,0],
			],
			[
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
				[0,0,0,0,0,1,1],
				[0,0,0,0,0,1,1],
			],
			[
				[1,1,1,1,1,1,0],
				[1,1,1,1,1,1,0],
				[1,1,1,0,0,1,0],
				[1,1,1,1,1,1,0],
				[1,1,0,0,1,1,1],
				[1,1,0,0,0,1,1],
				[1,1,0,0,0,1,1],
			],
			[
				[1,1,1,1,1,1,1],
				[1,1,1,0,1,1,1],
				[1,1,0,0,0,0,0],
				[0,1,1,1,0,0,0],
				[0,0,0,0,1,1,0],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
			],
			[
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[0,0,1,1,0,0,0],
				[0,0,1,1,0,0,0],
				[0,0,1,1,0,0,0],
				[0,0,1,1,0,0,0],
				[0,0,1,1,0,0,0],
			],
			[
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
			],
			[
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,1,1,0,0,1,1],
				[0,0,1,1,1,1,0],
				[0,0,0,1,1,0,0],
			],
			[
				[0,0,0,0,0,0,0],
				[0,1,0,0,0,0,1],
				[0,1,0,1,1,0,1],
				[0,1,0,1,1,0,1],
				[0,1,0,1,1,0,1],
				[0,1,1,1,1,1,1],
				[0,1,1,1,1,1,1],
			],
			[
				[1,0,0,0,0,0,1],
				[0,1,0,0,0,1,0],
				[0,0,1,0,1,0,0],
				[0,0,0,1,0,0,0],
				[0,0,1,0,1,0,0],
				[0,1,0,0,0,1,0],
				[1,0,0,0,0,0,1],
			],
			[
				[1,0,0,0,0,0,1],
				[0,1,0,0,0,1,0],
				[0,0,1,0,1,0,0],
				[0,0,0,1,0,0,0],
				[0,0,0,1,0,0,0],
				[0,0,0,1,0,0,0],
				[0,0,0,1,0,0,0],
			],
			[
				[1,1,1,1,1,1,1],
				[1,1,1,0,1,1,1],
				[0,0,0,0,1,1,0],
				[0,0,1,1,0,0,0],
				[0,1,1,0,0,0,0],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
			],
		]

		return letters;		
	}	
}

export default keyGame;