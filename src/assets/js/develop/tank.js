class canvasAbility {
	fillStyle  = '#fff';		// 填充颜色
	colorArr   = ['#68ff03','#03a9ff','#026dff','#ff1705',"#ff9600","#363535","#b98080","#0ac1f6","#050b43","#5059ac"];
	vx = 4;
	vy = 4;
	player = {x: 100, y: 600, r: 4, direction: 0, speed: 10, color: '#fff', bullet: []};		// 玩家	
	npcArr = [
		{x: 0, y: 0, r: 5, direction: 0, speed: 5, color: '#abcdef', bullet: []},				// npc
		{x: 0, y: 0, r: 5, direction: 1, speed: 5, color: '#abcdef', bullet: []},
		{x: 0, y: 0, r: 5, direction: 2, speed: 5, color: '#abcdef', bullet: []},
		{x: 0, y: 0, r: 5, direction: 3, speed: 5, color: '#abcdef', bullet: []},
		{x: 0, y: 0, r: 5, direction: 0, speed: 5, color: '#abcdef', bullet: []},
		{x: 0, y: 0, r: 5, direction: 1, speed: 5, color: '#abcdef', bullet: []},
		{x: 0, y: 0, r: 5, direction: 2, speed: 5, color: '#abcdef', bullet: []},
		{x: 0, y: 0, r: 5, direction: 3, speed: 5, color: '#abcdef', bullet: []},
		{x: 0, y: 0, r: 5, direction: 1, speed: 5, color: '#abcdef', bullet: []},
	];
	deathBall = [];		// 爆炸后的残骸

	constructor (ctx, w, h) {
		this.ctx 		= ctx;	
		this.w   		= w;
		this.h   		= h;
		this.init(this.player, this.npcArr, this.deathBall);
		this.keySet(this.player);		
	}

	clear (x,y,w,h) {
		this.ctx.clearRect(x,y,w,h);
	}
	
	init () {
		window.requestAnimFrame = (function(){
			return  window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					function( callback ){
					  window.setTimeout(callback, 1000 / 60);
					};
		})();
		
		let that = this;
		(function aaa(){
			requestAnimFrame(aaa);

			that.clear(0,0,that.w,that.h);
			that.npc(that.npcArr);		// npc
			if(that.player){
				that.tank(that.player.x, that.player.y, that.player.r, that.player.direction, that.player.color);   // 玩家坦克
				that.player.position = that.tankTrajectory(that.player.x, that.player.y, that.player.r);   	// 玩家坐标
				that.playerBullet(that.player);													// 玩家子弹
				that.hit(that.player, that.npcArr, that.deathBall);							// 命中					
			}

			// 死亡		
			for(let i=0; i<that.deathBall.length; i++){
				that.blast(that.deathBall[i]);
			}
				
		})();			
			

		setInterval(()=>{
			for(let i=0; i<this.npcArr.length; i++){
				this.npcArr[i].direction = Math.round(Math.random()*3)		
			}
			// this.npcArr.push({x: 0, y: 0, r: 3, direction: 1, speed: 5, color: '#abcdef', bullet: []});
		},2000);

		setInterval(()=>{
			for(let i=0; i<this.npcArr.length; i++){
				let newBullet = {x: this.npcArr[i].x + 3*2*this.npcArr[i].r + this.npcArr[i].r/2, y: this.npcArr[i].y + 3*2*this.npcArr[i].r + this.npcArr[i].r/2, r:4, direction: this.npcArr[i].direction, speed: 10, color: '#abcdef'};
				this.npcArr[i].bullet.push(newBullet);
			}		
		}, 500);

	}

	playerBullet (player) { // 玩家子弹							
		for(let m=0; m<player.bullet.length; m++){
			if(player.bullet[m].x <= 0){
				player.bullet.splice(m,1);
				continue;
			}
			if(player.bullet[m].x >= this.w){
				player.bullet.splice(m,1);
				continue;
			}
			if(player.bullet[m].y <= 0){
				player.bullet.splice(m,1);
				continue;
			}
			if(player.bullet[m].y >= this.h){
				player.bullet.splice(m,1);
				continue;
			}
		}
		for(let i=0; i<player.bullet.length; i++){
			if(player.bullet[i].direction == 2){
				player.bullet[i].y = player.bullet[i].y - player.bullet[i].speed
			}
			if(player.bullet[i].direction == 0){
				player.bullet[i].x = player.bullet[i].x - player.bullet[i].speed
			}
			if(player.bullet[i].direction == 1){
				player.bullet[i].x = player.bullet[i].x + player.bullet[i].speed
			}
			if(player.bullet[i].direction == 3){
				player.bullet[i].y = player.bullet[i].y + player.bullet[i].speed
			}

			player.bullet[i].position = this.bulletTrajectory(player.bullet[i].x, player.bullet[i].y, player.bullet[i].r);
			this.ball(player.bullet[i].x, player.bullet[i].y, player.bullet[i].r, player.bullet[i].color);			
		}				
	}

	npc (npcArr) {
		for(let i=0; i<npcArr.length; i++){
			if(npcArr[i].x <= 0){
				npcArr[i].direction = 1;
			}
			if(npcArr[i].x >= this.w){
				npcArr[i].direction = 0;
			}
			if(npcArr[i].y <= 0){
				npcArr[i].direction = 3;
			}
			if(npcArr[i].y >= this.h){
				npcArr[i].direction = 2;
			}			

			if(npcArr[i].direction == 0){
				npcArr[i].x = npcArr[i].x - npcArr[i].speed;
			}
			if(npcArr[i].direction == 2){
				npcArr[i].y = npcArr[i].y - npcArr[i].speed;
			}
			if(npcArr[i].direction == 1){
				npcArr[i].x = npcArr[i].x + npcArr[i].speed;
			}
			if(npcArr[i].direction == 3){
				npcArr[i].y = npcArr[i].y + npcArr[i].speed;
			}

			npcArr[i].position = this.tankTrajectory(npcArr[i].x, npcArr[i].y, npcArr[i].r);
			this.tank(npcArr[i].x, npcArr[i].y, npcArr[i].r, npcArr[i].direction, npcArr[i].color);
			this.npcBullet(npcArr[i]);
		}
	}

	npcBullet (npc) {
		for(let m=0; m<npc.bullet.length; m++){
			if(npc.bullet[m].x <= 0){
				npc.bullet.splice(m,1);
				continue;
			}
			if(npc.bullet[m].x >= this.w){
				npc.bullet.splice(m,1);
				continue;
			}
			if(npc.bullet[m].y <= 0){
				npc.bullet.splice(m,1);
				continue;
			}
			if(npc.bullet[m].y >= this.h){
				npc.bullet.splice(m,1);
				continue;
			}
		}

		for(let j=0; j<npc.bullet.length; j++){
			if(npc.bullet[j].direction == 0){
				npc.bullet[j].x = npc.bullet[j].x - npc.bullet[j].speed;
			}
			if(npc.bullet[j].direction == 2){
				npc.bullet[j].y = npc.bullet[j].y - npc.bullet[j].speed;
			}
			if(npc.bullet[j].direction == 1){
				npc.bullet[j].x = npc.bullet[j].x + npc.bullet[j].speed;
			}
			if(npc.bullet[j].direction == 3){
				npc.bullet[j].y = npc.bullet[j].y + npc.bullet[j].speed;
			}

			npc.bullet[j].position = this.bulletTrajectory(npc.bullet[j].x, npc.bullet[j].y, npc.bullet[j].r);
			this.ball(npc.bullet[j].x, npc.bullet[j].y, npc.bullet[j].r, npc.bullet[j].color);			
		}
	}

	hit (player, npcArr, deathBall) {		//击中 
		bbb: for(let i=0; i<player.bullet.length; i++){
			for(let j=0; j<npcArr.length; j++){
				if(player.bullet[i].position.x1 >= npcArr[j].position.x1 && player.bullet[i].position.y1 >= npcArr[j].position.y1 && player.bullet[i].position.x2 <= npcArr[j].position.x2 && player.bullet[i].position.y2 <= npcArr[j].position.y2 || player.bullet[i].position.x1 <= npcArr[j].position.x1 && player.bullet[i].position.y1 <= npcArr[j].position.y1 && player.bullet[i].position.x2 >= npcArr[j].position.x2 && player.bullet[i].position.y2 >= npcArr[j].position.y2){
					console.log('玩家命中');
					deathBall = this.death(npcArr[j], deathBall);
					npcArr.splice(j,1);
					player.bullet.splice(i,1);
					continue bbb;
				}
			}
		}
		ccc: for(let i=0; i<npcArr.length; i++){
			for(let j=0; j<npcArr[i].bullet.length; j++){
				if(npcArr[i].bullet[j].position.x1 >= player.position.x1 && npcArr[i].bullet[j].position.y1 >= player.position.y1 && npcArr[i].bullet[j].position.x2 <= player.position.x2 && npcArr[i].bullet[j].position.y2 <= player.position.y2){
					console.log('玩家被击中');
					npcArr[i].bullet.splice(j,1);
					deathBall = this.death(player, deathBall);
					this.player = null;
					break ccc;
				}
			}
		}				
	}

	tank (x,y,ballR,letter,color) {				// 绘制坦克
		let arr = this.letter()[letter];
		for(let i=0; i<arr.length; i++){
			let ballX = x + i*2*ballR + ballR;
			for(let j=0; j< arr[i].length; j++){
				let ballY = y + j*2*ballR + ballR;
				if(arr[i][j] == 1){
					this.ball(ballX,ballY,ballR,color);
				}
			}
		}		
	}

	death (tank,deathBall) {					// 坦克爆炸效果					
		let arr = this.letter()[tank.direction];
		for(let m=0; m<arr.length; m++){
			let ballX = tank.x + m*2*tank.r + tank.r;
			for(let j=0; j< arr[m].length; j++){
				let ballY = tank.y + j*2*tank.r + tank.r;
				if(arr[m][j] == 1){
					let json = {x:ballX, y:ballY, r: tank.r, vx: Math.random()*10-5, vy: Math.random()*10-5, color: this.colorArr[Math.floor(Math.random()*10)]}
					deathBall.push(json);
					if(deathBall.length > 200){
						deathBall.splice(deathBall.length - 200, 200);
					}
				}
			}
		}			
		return deathBall;
	}
	
	ball (x,y,r,color) {
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x,y,r,0,Math.PI*2);
		this.ctx.fill();
		this.ctx.closePath();
	}

	blast (ball) {
		this.ctx.fillStyle = ball.color;
		this.ctx.beginPath();		
		ball.x += ball.vx;
		ball.y += ball.vy;
		this.ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
		this.ctx.fill();
		this.ctx.closePath();
	}	


	tankTrajectory (x,y,r) {	// 坦克坐标
		let json = {};
		json.x1 = x,
		json.y1 = y,
		json.x2 = x + 6*2*r,
		json.y2 = y + 6*2*r;
		return json;			
	}

	bulletTrajectory (x,y,r) {	// 子弹坐标
		let json = {};
		json.x1 = x - r,
		json.y1 = y - r,
		json.x2 = x + r,
		json.y2 = y + r;
		return json;
	}

	keySet (player) {
		let down = false,
			time;	
		document.onkeydown = function (event) {
			if(!player){
				return;
			}
			if(event.keyCode == 32){
				let newBullet = {x: player.x + 3*2*player.r + player.r/2, y: player.y + 3*2*player.r + player.r/2, r:4, direction: player.direction, speed: 20, color: '#fff'};
				player.bullet.push(newBullet);
				return;			
			}

			if(event.keyCode == 37){
				player.direction = 0;
			}
			if(event.keyCode == 38){
				player.direction = 2;
			}
			if(event.keyCode == 39){
				player.direction = 1;
			}
			if(event.keyCode == 40){
				player.direction = 3;
			}

			if(!down){
				time = setInterval(()=>{
					if(player.direction == 0){
						player.x = player.x - player.speed;
					}
					if(player.direction == 2){
						player.y = player.y - player.speed;
					}
					if(player.direction == 1){
						player.x = player.x + player.speed;
					}
					if(player.direction == 3){
						player.y = player.y + player.speed;
					}

					if(player.x <= 0){
						player.x = 0;
					}
					if(player.x >= this.w){
						player.x = this.w;
					}
					if(player.y <= 0){
						player.y = 0;
					}
					if(player.y >= this.h){
						player.y = this.h;
					}

					player.x1 = player.x - player.r;
					player.y1 = player.y - player.r;
					player.x2 = player.x + player.r;
					player.y2 = player.y + player.r;

				}, 10);
			}
			down = true;
			document.onkeyup = function() {
				down = false;
				clearInterval(time);
			}		
		}		
	}		

	letter () {
		let letters = [
			[
				[0,0,1,1,0,0],
				[0,0,1,1,0,0],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1]			
			],[
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[0,0,1,1,0,0],
				[0,0,1,1,0,0]			
			],[
				[0,0,1,1,1,1],
				[0,0,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[0,0,1,1,1,1],
				[0,0,1,1,1,1]			
			],[
				[1,1,1,1,0,0],
				[1,1,1,1,0,0],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,0,0],
				[1,1,1,1,0,0]			
			],

		]
		return letters;
	}   
}

export default canvasAbility;