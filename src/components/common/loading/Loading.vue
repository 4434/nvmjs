<template>
  <transition name="fade">
    <div class="loading" v-if="loading">
      <div class="qiu-box">
        <div class="qiu"></div>
        <div class="qiu"></div>
        <div class="qiu"></div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "loading",
  data() {
    return {
      loading: true,
    };
  },
};
</script>
<style lang="scss">
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  .qiu-box{
    width: 200px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: auto;
    .qiu{
      width: 10px;
      height: 10px;
      margin: 0 6px;
      border-radius: 50px;
      background: #4AA0DD;
      position: relative;
      opacity: 1;
      &:nth-child(1){
        animation: mymove 2s infinite;
      }
      &:nth-child(2){
        animation: mymove 2s .5s infinite;
      }
      &:nth-child(3){
        animation: mymove 2s 1s infinite;
      }
    }
  }
}
@keyframes mymove {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>

