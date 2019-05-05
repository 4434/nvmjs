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
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$emit('page-data',this.page);
        console.log(`当前页: ${val}`);
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
     margin-top: 20px;
     .el-pagination{
        text-align: center;
        .el-pager{
          li{
            margin: 0 10px;
            &.active{
              background: red;
              color: #fff;
            }
          }
        }
     }
  }
</style>