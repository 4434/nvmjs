class block {
    size = 200;
    constructor (w, arr = []) {
        this.w       = w;
        this.arr     = arr;
        this.grid    = [];   // 网格
        this.row    = Math.floor(this.w / this.size);
        this.actual  = this.w / this.row;     // 真实尺寸
        this.gridInit(this.row, 10000);     
    }
    init () {
        for(let i=0; i<this.arr.length; i++){
            for(let j=0; j<this.grid.length; j++){
                let item = this.position(this.arr[i], this.grid[j].x, this.grid[j].y);
                if(this.compare(item, this.grid)){
                    this.arr[i].style = {width: `${this.actual * this.arr[i].w}px`, height: `${this.actual * this.arr[i].h}px`, top: `${this.actual * this.grid[j].y}px`, left: `${this.actual * this.grid[j].x}px`};
                    break;
                }
            }
        }
        return this.arr;        
    }
    gridInit (row, col) {
        for(let i=0; i<col; i++){
            for(let j=0; j<row; j++){
                let item = {x: j, y: i, type: true};
                this.grid.push(item);
            }
        }
    }
   
    compare (item, grid) {   // 比较是否可能放得下
        let num = 0;
        for(let i=0; i<item.length; i++){
            for(let j=0; j<grid.length; j++){
                if(item[i].x == grid[j].x && item[i].y == grid[j].y && grid[j].type){
                    num ++;
                }
            }
        }
        
        if(num == item.length){
            for(let i=0; i<item.length; i++){
                for(let j=0; j<grid.length; j++){
                    if(item[i].x == grid[j].x && item[i].y == grid[j].y){
                        grid[j].type = false;
                    }
                }
            }
        }

        return num == item.length;
    }

    position (item, x, y) {    // 生成占位坐标
        let arr= [];
        for(let i =0; i<item.w; i++){
            for(let j=0; j<item.h; j++){
                arr.push({x: i + x, y: j + y});
            }
        }
        return arr;
    }    

}

export default block;