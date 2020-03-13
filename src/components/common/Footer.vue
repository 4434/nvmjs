<template>
  <div class="footer">
    <p class="record">备案号：晋ICP备17000600号-2</p>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer{
  height:50px;
  line-height: 50px;
  background: #333;
  .record{
    font-size: 12px;
    text-align: center;
    color: #fff;
  }
}
</style>
