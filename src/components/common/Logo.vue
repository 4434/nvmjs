<template>
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
</template>
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
.Background {
  background: #cccccc;
  font-weight: bold;
  margin: 0 auto;
  width: 100px;
  height: 40px;
}
.Background {
  -webkit-mask: url("../../assets/img/NvmJS-com.svg");
  -webkit-mask-repeat: no-repeat;
}

.Foreground {
  font-weight: bold;
  margin: 0 auto;
  width: 100px;
  height: 40px;
  margin: -40px auto 0;
}
.Foreground {
  -webkit-mask: url("../../assets/img/NvmJS-com.svg");
  -webkit-mask-repeat: no-repeat;
}
.Foreground .Water {
  width: 100px;
  height: 40px;
  transform: translateY(30px);
  white-space: nowrap;
  transition: all 0.3s linear;
  animation: position 5s infinite;
}
.Foreground .Water .Coast {
  background: #4AA0DD;
  width: 390px;
  height: 40px;
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
  background: #4AA0DD;
}
.Foreground .Water .Wave.Deep {
  animation: Wave-Rotate2 3s linear 0s infinite;
}
.Foreground .Water .Wave.Surf {
  animation: Wave-Rotate1 3s linear 0s infinite;
  opacity: 0.5;
  margin: -3px 0 0 -40px;
}
@keyframes position {
  0% {
    transform: translateY(20px);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(20px);
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
</style>

