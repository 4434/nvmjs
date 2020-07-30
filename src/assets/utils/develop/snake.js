class snakeAbility {
    r           = 20;
    start       = {x:20, y:20};
    snake       = [];
    direction   = 2;
    leng        = 3;
    speed       = 1;
    food        = [];
    colorArr   = ['#68ff03','#03a9ff','#026dff','#ff1705',"#ff9600","#363535","#b98080","#0ac1f6","#050b43","#5059ac"];
    constructor (cxt,w,h) {
        this.cxt    = cxt;
        this.w      = w;
        this.h      = h;
        this.init();
        this.keySet();
        this.foodPosition();
    }

    init () {
        for(let i=0; i< this.leng; i++){
            let unit = {x: this.start.x, y: this.start.y + this.r * i, color: '#abcdef'}
            this.snake.push(unit);
        }

        this.draw(this.snake);
        this.draw(this.food);

        setInterval(()=>{
            this.repeat();	
        },100);
    }

    repeat () {
        this.clear(0,0,this.w, this.h);
        let item;
        if(this.direction == 0){
            item = {x: this.snake[0].x - this.r, y: this.snake[0].y, color: this.snake[0].color};
        }
        if(this.direction == 1){
            item = {x: this.snake[0].x, y: this.snake[0].y - this.r, color: this.snake[0].color};
        }
        if(this.direction == 2){
            item = {x: this.snake[0].x + this.r, y: this.snake[0].y, color: this.snake[0].color};
        }    
        if(this.direction == 3){
            item = {x: this.snake[0].x, y: this.snake[0].y + this.r, color: this.snake[0].color};
        }
        this.snake.unshift(item);

        for(let i=0; i<this.snake.length; i++){
            if(i !=0 && i != this.snake.length-1){
                this.snake[i].color = this.snake[i + 1].color
            }
        }

        this.snake.splice(this.leng, this.snake.length - this.leng);
        this.draw(this.snake);
        this.draw(this.food);

        this.eat();
    }

	clear (x,y,w,h) {
		this.cxt.clearRect(x,y,w,h);
    }
    
    draw (arr) {
        for(let i=0; i<arr.length; i++){
            arr[i].w  = this.r;
            arr[i].h  = this.r;
            this.square(arr[i]);
        }
    }

    eat () {
        aaa: for(let i=0; i<this.food.length; i++){
            for(let j=0; j<this.snake.length; j++){
                if(this.food[i].x == this.snake[j].x && this.food[i].y == this.snake[j].y){
                    this.snake.unshift(this.food[i]);
                    this.leng = this.leng + 1;
                    this.snake.splice(this.leng, this.snake.length - this.leng);
                    this.food.splice(0,1);
                    this.foodPosition();
                    break aaa;                    
                }
            }
        }
    }

    foodPosition () {
        let item = {x: Math.floor(Math.random()*this.w/this.r) * this.r, y: Math.floor(Math.random()*this.h/this.r) * this.r, color: this.colorArr[Math.floor(Math.random()*10)]}
        this.food.push(item);
    }    

    square (item) {
        this.cxt.beginPath();
        this.cxt.fillStyle = item.color;
        this.cxt.rect(item.x - this.r/2,item.y - this.r/2,item.w,item.h);
        this.cxt.fill();
        this.cxt.closePath();
    }

    keySet () {
        let that = this;
        let flag = true;
        document.onkeydown = function (event) {
            if(flag){
                flag = false;
                if(event.keyCode == 37){
                    that.direction = 0;
                }
                if(event.keyCode == 38){
                    that.direction = 1;
                }
                if(event.keyCode == 39){
                    that.direction = 2;
                }
                if(event.keyCode == 40){
                    that.direction = 3;
                }
            }
			document.onkeyup = function() {
				flag = true;
			}	            
        }
    }
    
    

}
export default snakeAbility;