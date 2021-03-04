<template>
  <div class="fabric">
    <div class="tool-box">
      <div class="tool">
        <ul>
          <li @click="penBtn">
            <i class="iconfont iconpen"></i>
          </li>
          <li  @click="lineBtn">
             <i class="iconfont iconzhixian"></i>
          </li>          
          <li @click="selectBtn">
            <i class="iconfont iconxuanze"></i>
          </li>
          <li @click="fontBtn">
            <i class="iconfont iconwenzi"></i>
          </li>
        </ul>
        <div class="title">工具</div>
      </div>
      <div class="tool">
        <div class="xian" @click="canvas.freeDrawingBrush.width = 1">
          <div class="size1"></div>
        </div>
        <div class="xian" @click="canvas.freeDrawingBrush.width = 3">
          <div class="size3"></div>
        </div>
        <div class="xian" @click="canvas.freeDrawingBrush.width = 5">
          <div class="size5"></div>
        </div>
        <div class="title">粗细</div>
      </div>
      <div class="tool">
        <ul class="color-box">
          <li v-for="(item, index) in colorArr" :key="index" @click="canvas.freeDrawingBrush.color = item">
            <div class="color" :style="{background: item}"></div>
          </li>
        </ul>
        <div class="title">调色板</div>
      </div>
      <div class="tool">
        <ul class="font-box">
          
        </ul>
        <div class="title">调色板</div>
      </div>
    </div>
    <div class="fabric-box">
      <canvas id="fabric" ></canvas>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  data() {
    return {
      canvas: null,
      select: null,
      status: 1,       // 1 自由绘制    2 选择模式  3 添加文字   4 直线绘制
      colorArr: ['red', '#000', 'blue', '#abcdef', 'green', '#333']
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let canvasBox = document.querySelector(".fabric-box");
      let canvas   = document.querySelector("#fabric");
      canvas.width = canvasBox.offsetWidth;
      canvas.height = canvasBox.offsetHeight;
      this.canvas = new fabric.Canvas("fabric", {
        isDrawingMode: true
      });
      this.canvas.freeDrawingBrush.width = 3
      this.canvas.selection = true      // 是否允许选中
      this.mouse()
      this.keyboard()
    },
    mouse () {
      let _this     = this
      let moveFlag  = false
      let json      = {}
      let position  = {}
      _this.canvas.on({"mouse:down": function(e){   
        moveFlag = true
        position.x1 = e.e.offsetX
        position.y1 = e.e.offsetY
        json = _this.canvas.toJSON()
      }})

      _this.canvas.on({"mouse:move": function(e){
        if(!moveFlag) return
        position.x2 = e.e.offsetX
        position.y2 = e.e.offsetY
        if(_this.status === 4){
          _this.canvas.clear()
          _this.canvas.loadFromJSON(json)
          _this.addLine(position)
        }        
      }})

      _this.canvas.on({"mouse:up": function(e) {
          moveFlag = false
          _this.select = _this.canvas.getActiveObject()    // 选择对象
        if(_this.status === 3 && !_this.select){
          _this.status = 2
          _this.addText({x: e.e.offsetX, y: e.e.offsetY,size: 33, color: '#000'})
        }
      }});

    },
    keyboard () {
      const _this = this;
      document.onkeydown = function (event) {
        if(event.key === 'Backspace'){
          if(!_this.select) return
          if(_this.select._objects && _this.select._objects.length){
            _this.select._objects.forEach(res=>{
              if(res.isEditing) return
              _this.canvas.remove(res)
            })
          }else{
            if(_this.select.isEditing) return
            _this.canvas.remove(_this.select)
          }
        }
      }
    },
    addRect () {
      let rect = new fabric.Rect({
        left: 100, //距离画布左侧的距离，单位是像素

        top: 100, //距离画布上边的距离

        fill: "red", //填充的颜色

        width: 100, //方形的宽度

        height: 100, //方形的高度
      });
      this.canvas.add(rect).setActiveObject(rect);
    },
    penBtn () {
      this.canvas.isDrawingMode = true
      this.status = 1
    },
    selectBtn () {
      this.canvas.isDrawingMode = false
      this.status = 2      
    },
    fontBtn () {
      this.canvas.isDrawingMode = false
      this.status = 3
    },
    lineBtn () {
      this.canvas.isDrawingMode = false
      this.status               = 4
    },
    addLine (position = {}) {
      let line = new fabric.Line([position.x1, position.y1, position.x2, position.y2], {
      　　fill: 'green',
      　　stroke: 'green',    //笔触颜色
      　　strokeWidth: 2,   //笔触宽度
      });
      this.canvas.add(line)
    },
    addText (item) {
      var text = new fabric.IText(' ', {
        borderColor: '#ff0000', // 激活状态时的边框颜色
        editingBorderColor: '#ff0000', // 文本对象的边框颜色，当它处于编辑模式时
        left: item.x,
        top: item.y - 10,
        transparentCorners: true,
        fontSize: item.size || 14,
        fill: item.color || '#ff0000',
        padding: 5,
        cornerSize: 5, // Size of object's controlling corners
        cornerColor: '#ff0000',
        rotatingPointOffset: 20, // Offset for object's controlling rotating point
        lockScalingFlip: true, // 不能通过缩放为负值来翻转对象
        lockUniScaling: true // 对象非均匀缩放被锁定
      });
      this.canvas.add(text).setActiveObject(text)
    }
  },
};
</script>

<style lang="scss" scoped>
.fabric {
  width: 100%;
  height: 100%;
  .tool-box {
    width: 100%;
    height: 100px;
    display: flex;
    .tool {
      min-width: 100px;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      border-right: 1px solid #999;
      position: relative;
      ul {
        display: flex;
        li {
          width: 34px;
          height: 34px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            font-size: 22px;
          }
        }
        &.color-box{
          li{
            padding: 2px;
            box-sizing: border-box;
            .color{
              width: 100%;
              height: 100%;
              background: red;
            }
          }
        }
      }
      .xian {
        width: 90%;
        height: 14px;
        margin: auto;
        margin-bottom: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover{
          background: #abcdef;
        }
        .size1{
          width: 100%;
          height: 1px;
          background: #000;
        }
        .size3{
          width: 100%;
          height: 3px;
          background: #000;
        }
        .size5{
          width: 100%;
          height: 5px;
          background: #000;
        }
      }
      .title {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 6px;
        text-align: center;
      }
    }
  }
}
.fabric-box {
  width: 100%;
  height: calc(100% - 100px);
  background: #fff;
}
</style>