<template>
  <div class="hello">
    <top-header></top-header>
    <div class="center">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/common/TopHeader";
export default {
  components: { TopHeader },
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello{
    width: 100%;
    height: 100%;
  }
  .center{
    width: 100%;
    height: calc(100% - 72px);
    overflow-y: auto;
  }
</style>
