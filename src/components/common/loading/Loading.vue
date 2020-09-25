<template>
  <transition name="fade">
    <div class="loading" v-if="loading">
      <div class="Vertical-Alignment">
        <div class="Middle">
          <div class="Background"></div>
          <div class="Foreground">
            <div class="Water">
              <div class="Coast"></div>
              <div class="Wave Deep"></div>
              <div class="Wave Surf"></div>
              <div class="Wave Deep"></div>
              <div class="Wave Surf"></div>
              <div class="Wave Deep"></div>
              <div class="Wave Surf"></div>
              <div class="Wave Deep"></div>
              <div class="Wave Surf"></div>
              <div class="Wave Deep"></div>
              <div class="Wave Surf"></div>
              <div class="Wave Deep"></div>
              <div class="Wave Surf"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "MyMessage",
  data() {
    return {
      loading: true,
    };
  },
};
</script>
<style lang="scss">
.Vertical-Alignment {
  width: 100%;
  height: 100%;
  display: table;
}
.Vertical-Alignment > .Middle {
  vertical-align: middle;
  display: table-cell;
}
.Horizon-Alignment {
  width: 100%;
  height: 100%;
}
.Horizon-Alignment > .Center {
  text-align: center;
}
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  background: #fff;
  .Background {
    background: #cccccc;
    font-weight: bold;
    margin: 0 auto;
    width: 410px;
    height: 65px;
  }
  .Background {
    -webkit-mask: url("../../../assets/img/NvmJS-com.svg");
    -webkit-mask-repeat: no-repeat;
  }

  .Foreground {
    font-weight: bold;
    margin: 0 auto;
    width: 410px;
    height: 65px;
    margin: -65px auto 0;
  }
  .Foreground {
    -webkit-mask: url("../../../assets/img/NvmJS-com.svg");
    -webkit-mask-repeat: no-repeat;
  }
  .Foreground .Water {
    width: 410px;
    height: 65px;
    transform: translateY(50px);
    white-space: nowrap;
    transition: all 0.3s linear;
    animation: position 5s infinite;
  }
  .Foreground .Water .Coast {
    background: #0097a7;
    width: 390px;
    height: 65px;
    position: absolute;
    z-index: 1;
  }
  .Foreground .Water .Wave {
    width: 70px;
    height: 70px;
    border-radius: 40%;
    margin: -2px 0 0 -25px;
  }
  .Foreground .Water .Wave {
    display: inline-block;
    background: #0097a7;
  }
  .Foreground .Water .Wave.Deep {
    animation: Wave-Rotate2 3s linear 0s infinite;
  }
  .Foreground .Water .Wave.Surf {
    animation: Wave-Rotate1 3s linear 0s infinite;
    opacity: 0.5;
    margin: -3px 0 0 -40px;
  }
}
@keyframes position {
  0% {
    transform: translateY(50px);
  }
  50% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes Wave-Rotate1 {
  0% {
    transform: rotate(50deg);
  }
  100% {
    transform: rotate(410deg);
  }
}
@keyframes Wave-Rotate2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}
</style>

