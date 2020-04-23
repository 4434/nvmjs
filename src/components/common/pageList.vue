<template>
  <div class="block">
    <el-pagination      
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.pageIndex"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.pageAll">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
        this.$emit('page-data',this.page);
      },
      handleCurrentChange(val) {
        this.$emit('page-data',this.page);
      }
    },
    data() {
      return { 

      };
    },
    props: ['page']
  }
</script>
<style lang="scss">
  .block{
     .el-pagination{
        .el-pager{
          li{
            margin: 0 10px;
            &.active{
              background: teal;
              color: #fff;
            }
          }
        }
     }
  }
</style>