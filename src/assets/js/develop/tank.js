import { tankState, brick } from './tool'
class canvasAbility {
	fillStyle  = '#fff';		// 填充颜色
	colorArr   = ['#68ff03','#03a9ff','#026dff','#ff1705',"#ff9600","#363535","#b98080","#0ac1f6","#050b43","#5059ac"];
	vx = 4;
	vy = 4;
	npcNUm     = 6;
	player     = {x: 100, y: 600, r: 2, direction: 0, speed: 5, color: '#0097A7', bullet: []};		// 玩家
	playerBall = {size: 3, color: 'red', speed: 20}
	npcAttr    = {x: 0, y: 0, r: 2, direction: Math.round(Math.random()*10%4), speed: 1, color: '#abcdef', bullet: []}
	npcArr     = this.npcCreate(this.npcAttr, this.npcNUm);		// 生成 npc
	brickArr   = []												// 墙体
	down       = false
	npcBall = {size: 2, color: 'red', speed: 1}	// npc 子弹属性
	deathBall = [];		// 爆炸后的残骸

	constructor (ctx, w, h) {
		this.ctx 		= ctx;
		this.w   		= w;
		this.h   		= h;
		this.init(this.player, this.npcArr, this.deathBall);
		this.keySet(this.playerBall);
		this.rowBrick({x: parseInt((this.w/13) * 1), y: 100, r: 3, color: 'red', direction: 0}, 8, 2);
		this.rowBrick({x: parseInt((this.w/13) * 3), y: 100, r: 3, color: 'red', direction: 0}, 8, 2);
		this.rowBrick({x: parseInt((this.w/13) * 5), y: 100, r: 3, color: 'red', direction: 0}, 6, 2);
		this.rowBrick({x: parseInt((this.w/13) * 7), y: 100, r: 3, color: 'red', direction: 0}, 6, 2);
		this.rowBrick({x: parseInt((this.w/13) * 9), y: 100, r: 3, color: 'red', direction: 0}, 8, 2);
		this.rowBrick({x: parseInt((this.w/13) * 11), y: 100, r: 3, color: 'red', direction: 0}, 8, 2);
		this.rowBrick({x: parseInt((this.w/13) * 1), y: 400, r: 3, color: 'red', direction: 0}, 10, 2);
		this.rowBrick({x: parseInt((this.w/13) * 3), y: 400, r: 3, color: 'red', direction: 0}, 10, 2);
		this.rowBrick({x: parseInt((this.w/13) * 5), y: 400, r: 3, color: 'red', direction: 0}, 8, 2);
		this.rowBrick({x: parseInt((this.w/13) * 7), y: 400, r: 3, color: 'red', direction: 0}, 8, 2);
		this.rowBrick({x: parseInt((this.w/13) * 9), y: 400, r: 3, color: 'red', direction: 0}, 10, 2);
		this.rowBrick({x: parseInt((this.w/13) * 11), y: 400, r: 3, color: 'red', direction: 0}, 10, 2);
		this.rowBrick({x: parseInt((this.w/13) * 5), y: 500, r: 3, color: 'red', direction: 0}, 4, 1);		
	}	

	rowBrick (item, num = 10, type = 1) {		// 行墙
		if(type == 1){
			for(let i=0; i<num; i++){
				item.x = item.x + 4*2*item.r;
				item.position = this.brickTrajectory(item.x, item.y, item.r);
				this.brickArr.push({...item});
			}
		}

		if(type == 2){							// 纵墙
			for(let i=0; i<num; i++){
				item.y = item.y + 4*2*item.r;
				item.position = this.brickTrajectory(item.x, item.y, item.r);
				this.brickArr.push({...item});
			}			
		}
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
			if(that.npcArr.length == 0){
				that.npcNUm ++
				that.npcArr = that.npcCreate(that.npcAttr, that.npcNUm);
			}
			that.npc(that.npcArr, that.brickArr);		// npc
			if(that.player){
				that.tank(tankState,that.player.x, that.player.y, that.player.r, that.player.direction, that.player.color);   // 玩家坦克
				that.player.position = that.tankTrajectory(that.player.x, that.player.y, that.player.r);   	// 玩家坐标
				that.playerBullet(that.player);													// 玩家子弹
				that.hit(that.player, that.npcArr, that.brickArr);							// 命中					
			}

			// 死亡		
			for(let i=0; i<that.deathBall.length; i++){
				that.blast(that.deathBall[i]);
			}

			// 墙壁 
			for(let i=0; i<that.brickArr.length; i++){
				that.tank(brick, that.brickArr[i].x, that.brickArr[i].y, that.brickArr[i].r, that.brickArr[i].direction, 'red');
			}

			// 玩家轨迹行为
			that.playerTrack(that.down);
		})();			
			

		setInterval(()=>{    // 每隔2s 随机转向
			for(let i=0; i<this.npcArr.length; i++){
				this.npcArr[i].direction = Math.round(Math.random()*3)		
			}
		},2000);

		setInterval(()=>{	// npc 每隔500ms 生成一颗子弹
			for(let i=0; i<this.npcArr.length; i++){
				let newBullet = {x: this.npcArr[i].x + 3*2*this.npcArr[i].r + this.npcArr[i].r/2, y: this.npcArr[i].y + 3*2*this.npcArr[i].r + this.npcArr[i].r/2, r: this.npcBall.size, direction: this.npcArr[i].direction, speed: this.npcBall.speed, color: this.npcBall.color};
				this.npcArr[i].bullet.push(newBullet);
			}		
		}, 500);

	}
	
	npcCreate (npc, n) {
		let arr = [];
		for(let i = 0; i < n; i++) {
			arr.push({...npc});
		}
		return arr;
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

	npc (npcArr, brickArr) {		
		for(let i=0; i<npcArr.length; i++){
			// 边界转向
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

			// 墙体转向

			for(let j=0; j<brickArr.length; j++){
				if(!(brickArr[j].position.x1 > npcArr[i].position.x2 || brickArr[j].position.x2 < this.npcArr[i].position.x1 || brickArr[j].position.y1 > npcArr[i].position.y2 || brickArr[j].position.y2 < npcArr[i].position.y1)){
					npcArr[i].direction = Math.round(Math.random()*3);
				}
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
			this.tank(tankState,npcArr[i].x, npcArr[i].y, npcArr[i].r, npcArr[i].direction, npcArr[i].color);
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

	hit (player, npcArr, brickArr) {		
		aaa: for(let i=0; i<player.bullet.length; i++){	 // 玩家击中坦克
			for(let j=0; j<npcArr.length; j++){
				if(!(player.bullet[i].position.x1 > npcArr[j].position.x2 || player.bullet[i].position.x2 < npcArr[j].position.x1 || player.bullet[i].position.y1 > npcArr[j].position.y2 || player.bullet[i].position.y2 < npcArr[j].position.y1)){
					console.log('玩家命中NPC');
					this.deathBall = this.death(npcArr[j], this.deathBall);
					npcArr.splice(j,1);
					player.bullet.splice(i,1);
					continue aaa;
				}
			}
		}
		bbb: for(let i=0; i<player.bullet.length; i++){  // 玩家击中墙壁
			for(let j=0; j<brickArr.length; j++){
				if(!(player.bullet[i].position.x1 > brickArr[j].position.x2 || player.bullet[i].position.x2 < brickArr[j].position.x1 || player.bullet[i].position.y2 < brickArr[j].position.y1 || player.bullet[i].position.y1 > brickArr[j].position.y2)){
					console.log('玩家命中墙壁');
					this.deathBall = this.death(brickArr[j], this.deathBall, 'brick');
					brickArr.splice(j,1);
					player.bullet.splice(i,1);
					continue bbb;
				}
			}
		}
		ccc: for(let i=0; i<npcArr.length; i++){	// NPC击中玩家
			for(let j=0; j<npcArr[i].bullet.length; j++){
				if(!(npcArr[i].bullet[j].position.x1 > player.position.x2 || npcArr[i].bullet[j].position.x2 < player.position.x1 || npcArr[i].bullet[j].position.y1 > player.position.y2 || npcArr[i].bullet[j].position.y2 < player.position.y1)){
					console.log('玩家被击中');
					npcArr[i].bullet.splice(j,1);
					this.deathBall = this.death(player, this.deathBall);
					this.player = null;
					break ccc;
				}
			}
		}

		ddd: for(let i=0; i<npcArr.length; i++){	// NPC击中墙壁
			for(let j=0; j<npcArr[i].bullet.length; j++){
				for(let m=0; m<brickArr.length; m++){
					if(!(npcArr[i].bullet[j].position.x1 > brickArr[m].position.x2 || npcArr[i].bullet[j].position.x2 < brickArr[m].position.x1 || npcArr[i].bullet[j].position.y1 > brickArr[m].position.y2 || npcArr[i].bullet[j].position.y2 < brickArr[m].position.y1)){
						console.log('墙壁被击中');
						npcArr[i].bullet.splice(j,1);
						this.deathBall = this.death(brickArr[m], this.deathBall, 'brick');
						brickArr.splice(m,1);
						break ddd;
					}
				}
			}
		}
						
	}

	tank (item, x=0, y=0, ballR=2,direction = 0,color = 'red') {				// 绘制坦克 and 墙壁
		let arr = item[direction];
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

	death (tank, deathBall, type = 'tank') {					// 坦克 and 墙壁 爆炸效果					
		let arr;
		if(type == 'tank'){
			arr = tankState[tank.direction]
		}
		if(type == 'brick'){
			arr = brick[tank.direction]
		}
		for(let m=0; m<arr.length; m++){
			let ballX = tank.x + m*2*tank.r + tank.r;
			for(let j=0; j< arr[m].length; j++){
				let ballY = tank.y + j*2*tank.r + tank.r;
				if(arr[m][j] == 1){
					let json = {x:ballX, y:ballY, r: tank.r, vx: Math.random()*10-5, vy: Math.random()*10-5, color: this.colorArr[Math.floor(Math.random()*10)]}
					deathBall.push(json);
					if(deathBall.length > 500){
						deathBall.splice(deathBall.length - 500, 500);
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

	brickTrajectory (x,y,r) {		// 墙体坐标	
		let json = {};
		json.x1 = x-r,
		json.y1 = y-r,
		json.x2 = json.x1 + 4*2*r,
		json.y2 = json.y1 + 4*2*r;
		return json;	
	}

	tankTrajectory (x,y,r) {	// 坦克坐标
		let json = {};
		json.x1 = x-r,
		json.y1 = y-r,
		json.x2 = json.x1 + 6*2*r,
		json.y2 = json.y1 + 6*2*r;
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
	playerTrack (down) {
		let that = this;
		if(down){
			if(that.player.direction == 0){
				that.player.x = that.player.x - that.player.speed;
			}
			if(that.player.direction == 2){
				that.player.y = that.player.y - that.player.speed;
			}
			if(that.player.direction == 1){
				that.player.x = that.player.x + that.player.speed;
			}
			if(that.player.direction == 3){
				that.player.y = that.player.y + that.player.speed;
			}

			if(that.player.x <= 0 + that.player.r){			// 边界判定
				that.player.x = that.player.position.x1 + that.player.r + 1;
			}
			if(that.player.position.x2 >= that.w){
				that.player.x = that.player.position.x1 + that.player.r - 1;
			}
			if(that.player.y <= 0){
				that.player.y = that.player.position.y1 +  that.player.r + 1;
			}
			if(that.player.y2 >= that.h){
				that.player.y = that.player.position.y1 + that.player.r - 1;
			}
			for(let i=0; that.brickArr.length; i++){	// 墙体判定
				if(!(that.player.position.x2 <= that.brickArr[i].position.x1 || that.player.position.x1 >= that.brickArr[i].position.x2 || that.player.position.y1 >= that.brickArr[i].position.y2 || that.player.position.y2 <= that.brickArr[i].position.y1)){
					if(that.player.direction == 0){
						that.player.x = that.player.x + 5;
					}
					if(that.player.direction == 1){
						that.player.x = that.player.x - 5;
					}
					if(that.player.direction == 2){
						that.player.y = that.player.y - 5;
					}
					if(that.player.direction == 3){
						that.player.y = that.player.y + 5;
					}
				}
			}
			that.player.x1 = that.player.x - that.player.r;
			that.player.y1 = that.player.y - that.player.r;
			that.player.x2 = that.player.x1 + 2*that.player.r*6;
			that.player.y2 = that.player.y1 + 2*that.player.r*6;				
		}
	}
	keySet (ball) {
		let that = this;
		document.onkeydown = function (event) {
			if(!that.player){
				return;
			}
			if(event.keyCode == 32){
				let newBullet = {x: that.player.x + 3*2*that.player.r + that.player.r/2, y: that.player.y + 3*2*that.player.r + that.player.r/2, r: ball.size, direction: that.player.direction, speed: ball.speed, color: ball.color};
				that.player.bullet.push(newBullet);
				return;			
			}
			if(event.keyCode == 37){
				that.player.direction = 0;
				that.down = true;
			}
			if(event.keyCode == 38){
				that.player.direction = 2;
				that.down = true;
			}
			if(event.keyCode == 39){
				that.player.direction = 1;
				that.down = true;
			}
			if(event.keyCode == 40){
				that.player.direction = 3;
				that.down = true;
			}
			document.onkeyup = function() {
				that.down = false;
			}		
		}		
	}  
}

export default canvasAbility;