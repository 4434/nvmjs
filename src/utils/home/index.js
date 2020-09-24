class FFHome {
    constructor (w, h) {
        this.w = w;
        this.h = h;
        this.g = 1;
        this.arr = [];
    }    
    init (num, w, h) {
        let i       = 0,
            counter = 0;
        while (i < num) {
            let newboll = {x: Math.round(Math.random() * (this.w - w)), y: 0, vx: Math.random() * 10 - 5, vy:5, w: w, h: h, s: Math.random(), gx: Math.random() * 2 - 1, gy: this.g}
            newboll.postion = this.positionBoll(newboll.x, newboll.y, newboll.w, newboll.h);
            let flag =  true;
            for(let j=0; j<this.arr.length; j++){
                if(this.intersect(this.arr[j], newboll)){
                    i --;
                    flag = false;
                    break;
                }
            }
            flag && this.arr.push(newboll);
            i++;

            if(counter > 1000){
                console.log('到达预计处理预值 1000');
                break;
            }
            counter ++;
        }
        return this.arr;                
    }
    positionChange (arr = []) {
        arr.forEach(res=>{
            res.x += res.vx * res.s;
            res.y += res.vy * res.s;
            res.vy += res.gy;
            res.vx += res.gx;
            res.postion = this.positionBoll(res.x, res.y, res.w, res.h);
            this.boundary(res);
        });
        for(let i=0; i<arr.length; i++){
            arr[i].x += arr[i].vx * arr[i].s;
            arr[i].y += arr[i].vy * arr[i].s;
            arr[i].vy += arr[i].gy;
            arr[i].vx += arr[i].gx;
            arr[i].postion = this.positionBoll(arr[i].x, arr[i].y, arr[i].w, arr[i].h);            
            for(let j=0; j<arr.length; j++){
                if(i == j){
                    continue;
                }
                this.intersect(arr[i], arr[j]);
            }               
        }
        this.clear(arr);
        return arr;

    }
    boundary (item) {  // 边界
        // if(item.postion.x1 < 0 || item.postion.x2 > this.w || item.y1 < 0 || item.y2 > this.y2){

        // }
        if(item.postion.y2 > this.h){
            item.vy = -item.vy * 0.9;
            console.log('触底！！！');
        }
        if(item.postion.x1 < 0 || item.postion.x2 > this.w){
            item.vx = -item.vx * 0.9;
            console.log('触左右！！！');
        }
        
    }
    intersect (a, b) {
        let flag = false;
        if(a.postion.x2 < b.postion.x1 || a.postion.x1 > b.postion.x2 || a.postion.y2 < b.postion.y1 || a.postion.y1 > b.postion.y2){
            // 此状态下不会相交
        }else{
            a.vx = -a.vx * 0.9;
            a.vy = -a.vy * 0.9;
            b.vx = -b.vx * 0.9;
            b.vy = -b.vy * 0.9;
            flag = true;
        }
        return flag;
    }
    clear (arr) {
        arr.forEach(res=>{
            if(Math.abs(res.vx) <  0.5){
                res.vx = 0;
                res.gx = 0;
            }
            if(Math.abs(res.vy) < 0.5){
                res.vy = 0;
                res.gy = 0;
            }
        });        
    }
    positionBoll (x, y, w, h) {
        return {
            x1: x,
            y1: y,
            x2: x + w,
            y2: y + h
        }
    }



}

export default FFHome;