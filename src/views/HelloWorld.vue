<template>
  <div class="hello">
    <top-header v-if="!mobile"></top-header>
    <nav-mobile v-if="mobile"></nav-mobile>
    <div class="center">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/common/TopHeader.vue";
import NavMobile from "@/components/mobile/NavMobile.vue";
export default {
  components: { TopHeader, NavMobile},
  name: "HelloWorld",
  data () {
    return {
      mobile: false
    }
  },
  props: {
    msg: String
  },
  mounted () {
    const ua        = navigator.userAgent;
    const ipad      = ua.match(/(iPad).*OS\s([\d_]+)/),
          isIphone  =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
          isAndroid = ua.match(/(Android)\s+([\d.]+)/);
    const isMobile  = isIphone || isAndroid

    this.mobile = !!isMobile
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  width: 100%;
  height: 100%;
}
.center {
  width: 100%;
  height: calc(100% - 72px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
