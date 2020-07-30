<template>
	<div class="timeAbility">
    <div class="canvas-box">
      <canvas id="canvas"></canvas>
    </div>		
	</div>
</template>
<script>
import time from '@/utils/develop/time.js';
export default {
  name: 'timeAbility',
  components: {},
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
    let c = new time(cxt, canvasBox.offsetWidth, canvasBox.offsetHeight);    
  },

  methods: {

  }
}
</script>

<style scoped lang="scss">
  .timeAbility{
    width: 100%;
    height: 100%;
    background: #fff;
		.canvas-box{
			width: 100%;
			height: 100%;
		}    
  }

</style>