<template>
    <div class="canvas-box">
        <canvas id="canvas"></canvas>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    mounted () {
      let canvasBox = document.querySelector('.canvas-box');
      let canvas    = document.querySelector('#canvas');
      canvas.width  = canvasBox.offsetWidth;
      canvas.height = canvasBox.offsetHeight;
      let cxt = canvas.getContext('2d');

      let image = new Image();
      image.src = require('@/assets/img/bgcover.png');
      image.crossOrigin = 'Anonymous';
      console.log(image)
      image.onload = function () {
        cxt.drawImage(image,0,0,canvas.width, canvas.height);
        let imageData = cxt.getImageData(0, 0,canvas.width, canvas.height).data;
        console.log(imageData.length);
      }
    }
}
</script>
<style lang="scss" scoped>
  .canvas-box{
    width: 100%;
    height: 100%;
    background: #eee;
  }
</style>