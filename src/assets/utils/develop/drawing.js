class drawing {   
    constructor (cxt,w,h,canvas,xuanze,xobj,zhezhao) {
        this.cxt         = cxt;
        this.width       = w;
        this.height      = h;
        this.canvas      = canvas;  /* 画布 */
        this.xobj        = xobj;   /* 橡皮 */
        this.xuanze      = xuanze;  /* 选择 */
        this.fillStyle   = "#000";  /* 填充颜色 */
        this.bordercolor = "#000"; /* 边框颜色 */
        this.lineWidth   = 2;         /* 线条宽度 */
        this.type        = "stroke";      /* 默认无填充 */
        this.shaps       = "line";       /* 默认画直线 */
        this.history     = [];           /* 历史记录 */
        this.selectFlag  = true;        /* 开关 */
        this.zhezhao     = zhezhao;     /* 遮罩 主要用来 解决 橡皮和选择的时候 出现鼠标移动的物体发生改变 事件失效问题 */
        this.pen(); 
    }
    init () {
        // 初始化
        this.xobj.style    = "display: none";
        this.xuanze.style  = "display: none";
        if (this.temp) {
            this.history.push(this.cxt.getImageData(0, 0, this.width, this.height));
            this.temp = null;
        }
        this.cxt.fillStyle = this.fillStyle;
        this.cxt.strokeStyle = this.bordercolor;
        this.cxt.lineWidth = this.lineWidth;
    }
    /* 直线 */
    line (x,y,x1,y1){
        this.cxt.beginPath();
        this.cxt.moveTo(x,y);
        this.cxt.lineTo(x1,y1);
        this.cxt.closePath();
        this.cxt.stroke();
    }
    /* 方形 */
    rect (x,y,x1,y1){
        this.cxt.beginPath();
        this.cxt.rect(x,y,x1-x,y1-y);
        this.cxt.closePath();
        this.cxt[this.type]();
    }

    /* 圆 */
    circle (x,y,x1,y1) {
        /*  */
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cxt.beginPath();
        this.cxt.arc(x,y,r,0,Math.PI*2);
        this.cxt.closePath();
        this.cxt[this.type]();
    }
    /* 五角星 */
    five (x,y,x1,y1){
        this.init();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r2=r/2;
        this.cxt.beginPath();
        this.cxt.moveTo(r+x,y);
        for(var i=0;i<10;i++){
            if(i%2==0){
                this.cxt.lineTo(x+Math.cos(i*36*Math.PI/180)*r,y+Math.sin(i*36*Math.PI/180)*r);
            }else{
                this.cxt.lineTo(x+Math.cos(i*36*Math.PI/180)*r2,y+Math.sin(i*36*Math.PI/180)*r2);
            }
        }
        this.cxt.closePath();
        this.cxt[this.type]();
    }
    /* 画笔 */
    pen () {
        var that = this;
        that.canvas.onmousedown = function(e){
            that.init();  /* 初始化 */
            that.cxt.beginPath();
            var startx   = e.offsetX;  //起始点
            var starty   = e.offsetY;
            that.cxt.moveTo(startx,starty);             
            that.canvas.onmousemove = function(e){
                /* 清空画布 */                
                that.cxt.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cxt.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                //that.cxt.lineTo(endx,endy);
                that.cxt.quadraticCurveTo(startx,starty,(startx+endx)/2,(starty+endy)/2);
                that.cxt.stroke();
                startx = endx;
                starty = endy;
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.cxt.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    draw () {
        var that = this;
        that.canvas.onmousedown = function (e) {
            that.init();  /* 初始化 */
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.canvas.onmousemove = function(e){
                /* 清空画布 */
                that.cxt.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cxt.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that[that.shaps](startx,starty,endx,endy);
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.cxt.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    xp(zhezhao,xobj, w, h){
        var that=this;
        zhezhao.style = "display:block;";
        let style1 = "width:" + w + "px;height:" + h + "px; display: block;";
        let style2 = '';
        xobj.style = style1 + style2;
        zhezhao.onmousedown=function(e){
            var lefts= e.offsetX-w/2;
            var tops= e.offsetY-h/2;
            if(lefts<=0){
                lefts=0;
            }
            if(lefts>=(that.width-w)){
                lefts=that.width-w;
            }
            if(tops<=0){
                tops=0;
            }
            if(tops>=(that.height-h)){
                tops=that.height-h;
            }
            style2 = "left:" + lefts + "px; top:" + tops + "px;";
            xobj.style = style1 + style2;
            zhezhao.onmousemove=function(e){
                var lefts= e.offsetX-w/2;
                var tops= e.offsetY-h/2;
                if(lefts<=0){
                    lefts=0;
                }
                if(lefts>=(that.width-w)){
                    lefts=that.width-w;
                }
                if(tops<=0){
                    tops=0;
                }
                if(tops>=(that.height-h)){
                    tops=that.height-h;
                }
                style2 = "left:" + lefts + "px; top:" + tops + "px;";
                xobj.style = style1 + style2;
                that.cxt.clearRect(lefts,tops,w,h);
            };
            window.onmouseup=function(){
                xobj.style = "display: none";
                zhezhao.style = "display:none;";
                that.history.push(that.cxt.getImageData(0,0,that.width,that.height));
                zhezhao.onmousemove=null;
                zhezhao.onmouseup=null;
            }

        }
    }
    select (xuanze) {
        var that=this;
        that.init();
        that.zhezhao.style = "display: block;";
        that.zhezhao.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY,minx,miny, w,h;
            that.init();
            that.zhezhao.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                xuanze.style = "display:block; left:" + minx + "px; top:" + miny + "px;width:" + w +"px;height:" + h + "px;";
            }
            that.zhezhao.onmouseup=function(){
                that.zhezhao.onmouseup=null;
                that.zhezhao.onmousemove=null;
                that.temp=that.cxt.getImageData(minx,miny,w,h);
                that.cxt.clearRect(minx,miny,w,h);
                that.history.push(that.cxt.getImageData(0,0,that.width,that.height));
                that.cxt.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,xuanze);
            }
        }

    }
    drag (x,y,w,h,xuanze) {
        var that=this;
        that.zhezhao.onmousemove=function(e){
            var ox = e.offsetX;
            var oy = e.offsetY;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.zhezhao.style.cursor="move";
            }else{
                that.zhezhao.style.cursor="default";
            }
        }

        that.zhezhao.onmousedown=function(e){
            var ox = e.offsetX;
            var oy = e.offsetY;
            var cx =ox-x;
            var cy =oy-y;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.zhezhao.style.cursor="move";
            }else{
                that.zhezhao.style.cursor="default";
                return;
            }
            that.zhezhao.onmousemove=function(e){                 
                that.cxt.clearRect(0,0,that.width,that.height);
                if(that.history.length!==0){
                    that.cxt.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx  = e.offsetX;
                var endy  = e.offsetY;
                var lefts = endx-cx;
                var tops  = endy-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w;
                }

                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h;
                }
                xuanze.style = "display:block; left:" + lefts + "px; top:" + tops + "px;width:" + w +"px;height:" + h + "px;";
                x=lefts;
                y=tops;
                that.cxt.putImageData(that.temp,lefts,tops);
            }
            window.onmouseup=function(){
                that.zhezhao.onmouseup=null;
                that.zhezhao.onmousemove=null;
            }
        }
    }    

}

export default drawing;