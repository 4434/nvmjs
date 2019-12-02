<template>
	<div class="keyGame">
    <div class="canvas-box">
      <canvas id="canvas"></canvas>
    </div>
	</div>
</template>

<script>
  import keyGame from '@/assets/js/develop/keyGame';
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
      let c = new keyGame(cxt, canvasBox.offsetWidth, canvasBox.offsetHeight);      
    },
    methods: {

    }
  }
</script>

<style scoped>
  .keyGame{
    width: 100%;
    height: 100%;
  }
  .canvas-box{
    width: 100%;
    height: 100%;
    background: #000;
  }
</style>