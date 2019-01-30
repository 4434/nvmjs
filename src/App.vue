<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
  @import '@/assets/css/yk-init.scss';
  #app{
    width: 100%;
    height: 100%;
  }
</style>
