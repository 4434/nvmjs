<template>
	<transition name="fade">
		<div class="loading" v-if="loading">
			<div class="qiu-box">
				<div class="qiu"></div><div class="qiu"></div><div class="qiu"></div>
			</div>
		</div>
	</transition>
</template>
<script>
  export default {
    name: "MyMessage",
    data() {
      return {
		  loading: true
      }	
    }
  }
</script>
<style lang="scss">
	.loading{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 99999;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0);
	}
	.qiu-box{
		position: absolute;
		top: 40%;
		margin: 0 auto;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		.qiu{
			width: 10px;
			height: 10px;
			margin: 0 10px;
			font-size: 0;
			line-height: 0;
			border-radius: 5px;
			background: #0097A7;
			&:nth-child(1){
				animation: zoom .9s infinite;			
			}
			&:nth-child(2){
				animation: zoom .9s .3s infinite;			
			}
			&:nth-child(3){
				animation: zoom .9s .6s infinite;			
			}
		}
	}

	@keyframes zoom{
		0%{
			transform: scale(1,1);		
		}
		50%{
			transform: scale(1.5,1.5);
		}
		100%{
			transform: scale(1,1);		
		}			
	}

	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}  	
</style>

