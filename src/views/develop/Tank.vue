<template>
	<div class="tank">
    <div class="canvas-box">
      <canvas id="canvas"></canvas>
    </div>
	</div>
</template>

<script>
  import tank from '@/assets/js/develop/tank';
  export default {
    data() {
      return {
        
      }
    },
    mounted() {
      let canvasBox = document.querySelector('.canvas-box');
      let canvas    = document.querySelector('#canvas');
      canvas.width  = canvasBox.offsetWidth;
      canvas.height = canvasBox.offsetHeight;
      let cxt = canvas.getContext('2d');
      let c = new tank(cxt, canvasBox.offsetWidth, canvasBox.offsetHeight);      
    },
    methods: {

    }
  }
</script>

<style scoped>
  .tank{
    width: 100%;
    height: 100%;
  }
  .canvas-box{
    width: 100%;
    height: 100%;
    background: #000;
  }
</style>