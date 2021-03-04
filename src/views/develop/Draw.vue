<template>
  <div class="drawing">
      <div class="tiaojie">
            <ul>
                <li @click="selectColor('#000000')" data-color="#000000"></li>
                <li @click="selectColor('#ffffff')" data-color="#ffffff"></li>
                <li @click="selectColor('red')" data-color="red"></li>
                <li @click="selectColor('blue')" data-color="blue"></li>
                <li @click="selectColor('green')" data-color="green"></li>
                <li @click="selectColor('deeppink')" data-color="deeppink"></li>
                <li @click="selectColor('orange')" data-color="orange"></li>
                <li @click="selectColor('purple')" data-color="purple"></li>
            </ul>
      </div>
      <div class="left canvas-box">
            <canvas id="canvas"></canvas>
            <div class="xp"></div>
            <div class="xuanze"></div>
            <div class="zhezhao"></div>
      </div>
      <div class="right">
          <div class="tool">
              <ul>
                  <li @click="active = 2"><span>文件</span></li>
                  <li @click="active = 1"><span>画图</span></li>
                  <li @click="active = 3"><span>类型</span></li>
                  <li @click="active = 6"><span>粗细</span></li>
                  <li @click="active = 7"><span>橡皮</span></li>
                  <li @click="xuanzeBtn" class="tool-xuanze"><span>选择</span></li>
              </ul>
          </div>
          <div class="list">
              <ul class="functions uls1" v-if="active == 1">
                  <li @click="shape('pen');" data-role="pen"><span>画笔</span></li>
                  <li @click="shape('line');" data-role="line"><span>线</span></li>
                  <li @click="shape('rect');" data-role="rect"><span>矩形</span></li>
                  <li @click="shape('circle');" data-role="circle"><span>圆</span></li>
                  <li @click="shape('five');" data-role="five"><span>五角星</span></li>
              </ul>
              <ul class="functions uls2" v-if="active == 2">
                  <li @click="newFlie"><span>新建</span></li>
                  <li @click="preservation"><span>保存</span></li>
                  <li @click="backOff"><span>后退</span></li>
              </ul>
              <ul class="functions uls3" v-if="active == 3">
                  <li @click="fillOrStroke('stroke')" data-role="stroke"><span>画线</span></li>
                  <li @click="fillOrStroke('fill')" data-role="fill"><span>填充</span></li>
              </ul>
              <ul class="functions uls4" v-if="active == 4"></ul>
              <ul class="functions uls5" v-if="active == 5"></ul>
              <ul class=" functions uls6" v-if="active == 6">
                  <li @click="thickness(1)" data-role="1"><span>细</span></li>
                  <li @click="thickness(3)" data-role="3"><span>中</span></li>
                  <li @click="thickness(6)" data-role="6"><span>粗</span></li>
              </ul>
              <ul class=" functions uls7" v-if="active == 7">
                  <li @click="rubber(20)" data-role="20"><span>小</span></li>
                  <li @click="rubber(30)" data-role="30"><span>中</span></li>
                  <li @click="rubber(80)" data-role="80"><span>大</span></li>
                  <li @click="rubber(200)" data-role="200"><span>超级大</span></li>
              </ul>
              <ul class="functions uls8" v-if="active == 8">
                  <li @click="cancelSelect()" data-role="200"><span>取消选择</span></li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
  import drawing from '@/utils/develop/drawing';
  export default {
    data() {
      return {
        active: 1,
        c: '',    // canvas 实例化对象
        xp: '',   // 橡皮擦
        zhezhao: '',
        xuanze: ''
      }
    },
    mounted() {
      let canvasBox = document.querySelector('.canvas-box');
      let canvas    = document.querySelector('#canvas');
      this.xuanze    = document.querySelector('.xuanze');
      this.zhezhao   = document.querySelector('.zhezhao');
      this.xp       = document.querySelector('.xp');
      canvas.width  = canvasBox.offsetWidth;
      canvas.height = canvasBox.offsetHeight;
      let cxt = canvas.getContext('2d');
      this.c = new drawing(cxt, canvasBox.offsetWidth, canvasBox.offsetHeight, canvas, this.xuanze, this.xp, this.zhezhao);
    },
    methods: {
      shape (type) {
        this.c.shaps = type;
        this.c.shaps === 'pen' ? this.c.pen() : this.c.draw();
      },
      selectColor (color) {
        this.c.bordercolor = color;
      },
      fillOrStroke (type) {
        this.c.type = type;
      },
      thickness (num) {
        this.c.lineWidth = num;
      },
      rubber (num) {
        this.c.xp(this.zhezhao,this.xp,num,num);
      },
      xuanzeBtn(){
        this.active = 8;
        this.c.select(this.xuanze);
      },
      cancelSelect(){
        this.c.zhezhao.style = "display: none";
        this.c.xuanze.style = "display: none";
      },
      newFlie () {
        if(this.c.history.length>0){
          var yes = window.confirm("亲，是否保存？");
          if(yes){
              location.href=(canvas.toDataURL().replace("data:image/png","data:stream/octet"));
          }else{
              this.c.history = [];
              this.c.clearRect(0,0,canvas.width,canvas.height);
          }
        }        
      },
      preservation () {
        if(this.c.history.length<=0){
            alert("亲,没有要保存的内容");
        }else{
            location.href=(canvas.toDataURL().replace("data:image/png","data:stream/octet"));
        }        
      },
      backOff () {
        if(this.c.history.length == 0){
          alert("亲,没有历史记录");
          this.c.clearRect(0,0,canvas.width,canvas.height);
          return;
        }else{
          var pop = this.c.history.pop();
          this.c.cxt.clearRect(0,0,canvas.width,canvas.height);
          this.c.cxt.putImageData(pop,0,0);
        }        
      }
    }
  }
</script>

<style scoped>
  .draw{
    width: 100%;
    height: 100%;
    user-select: none;
  }
*{
    box-sizing: border-box;
}
.canvas-box{
  width: 100%;
  height: 100%;
}
.set-box{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.drawing{
    width: 100%;
    height:100%;
    overflow: hidden;
    position: relative;
}
.drawing .tiaojie,.drawing .left,.drawing .right{
    float: left;
    height: 100%;
}
.drawing .tiaojie{
    width: 80px;
    background: #243C3C;
    text-align: center;
}
.drawing .tiaojie ul{
    width:100%;
    height: 50%;
}

.drawing .tiaojie ul li{
    width:80%;
    height: 40px;
    margin: 20px auto;
    background: blue;
    border-radius: 3px;
    cursor: pointer;
}

.drawing .tiaojie ul li:nth-child(1){
    background:#000000;
}
.drawing .tiaojie ul li:nth-child(2){
    background: #ffffff;
}
.drawing .tiaojie ul li:nth-child(3){
    background:red;
}
.drawing .tiaojie ul li:nth-child(4){
    background: blue;
}
.drawing .tiaojie ul li:nth-child(5){
    background:green;
}
.drawing .tiaojie ul li:nth-child(6){
    background:deeppink;
}
.drawing .tiaojie ul li:nth-child(7){
    background:orange;
}
.drawing .tiaojie ul li:nth-child(8){
    background:purple;
}

.drawing .tiaojie ul li:hover{
  animation: td 1s ease forwards;
}

.drawing .left{
    width: calc(100% - 320px);
    position: relative;
}
.drawing .left > .zhezhao{
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 2;
}
.drawing .left > .xp{
    display: none;
    position: absolute;
    background: #122EA0;
}
.drawing .left > .xuanze{
    display: none;
    border:1px dashed #000000;
    position: absolute;
}
.drawing .right{
    width: 240px;
    position: relative;
    overflow: hidden;
}
.drawing .right .tool,.drawing .right .list{
    width:50%;
    height: 100%;
    float: left;
}
.drawing .right .tool{
    border-right:1px solid darkgreen;
}
.drawing .right .tool ul{
    width:100%;
    height: 100%;
    border:1px solid rgba(0,0,0,0);
    background: #243C3C;
}
.drawing .right .tool ul li{
    margin: 13px auto;
    width:60%;
    height: 60px;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
}

.drawing .right .tool ul li span{
     display: inline-block;
 }
.drawing .right .tool ul li input{
    border: 0;
}
.drawing .right .tool ul li:nth-child(1){
    background-color:#207D59;
}
.drawing .right .tool ul li:nth-child(2){
    background-color:#3B5B8E;
}
.drawing .right .tool ul li:nth-child(3){
    background-color:#5C9FAF;
}
.drawing .right .tool ul li:nth-child(4){
    background-color:#B85B53;
}
.drawing .right .tool ul li:nth-child(5){
    background-color:#435DB2;
}
.drawing .right .tool ul li:nth-child(6){
    background-color:#B243AD;
}
.drawing .right .tool ul li:nth-child(7){
    background-color:#122EA0;
}
.drawing .right .tool ul li:nth-child(8){
    background-color:#A05512;
}
.drawing .right .tool ul li:hover{
  animation: hover 1s ease forwards;
}
.drawing .right .tool ul li:hover span{
  animation: xz 4s ease forwards;
}
.drawing .right .list ul{
    width:100%;
    height: 100%;
    border:1px solid rgba(0,0,0,0);
    background: #243C3C;
}
.drawing .right .list ul li{
     margin: 13px auto;
     width:60%;
     height: 60px;
     border-radius: 3px;
     color: #ffffff;
     text-align: center;
     line-height: 60px;
    cursor: pointer;
 }

.drawing .right .list .uls1 li{
    background: #207D59;
}

.drawing .right .list .uls2 li{
    background: #3B5B8E;
}
.drawing .right .list .uls3 li{
    background: #5C9FAF;
}

.drawing .right .list .uls4 li{
    background: #B85B53;
}
.drawing .right .list .uls5 li{
    background: #435DB2;
}

.drawing .right .list .uls6 li{
    background: #B243AD;
}
.drawing .right .list .uls7 li{
    background: #122EA0;
}
.drawing .right .list .uls8 li{
    background: #A05512;
}
.drawing .right .list li:hover{
  animation: hover 1s ease forwards;
}
.zhezhao{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  display: none;
}

/* 画布 */
canvas{
    background: #cccccc;
}


/* 旋转 */
@keyframes xz {
    0%{
        transform: rotateY(0deg);
    }
    100%{
        transform: rotateY(360deg);
    }

}

/* 鼠标滑过效果 */
@keyframes hover {
    0%{
        opacity: 1;
    }
    100%{
        opacity:0.6;
    }
}

@keyframes td {
    0%{
        transform: translateY(0px);
    }
    25%{
        transform: translateY(-10px);
    }
    50%{
        transform: translateY(0px);
    }
    75%{
        transform: translateY(-5px);
    }
    100%{
        transform: translateY(0px);
    }
}

/* 显示效果 */
@keyframes show {
    0%{
        opacity: 0;
    }
    100%{
       opacity: 1;
    }
}

/* 隐藏效果 */
@keyframes hide {
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
</style>