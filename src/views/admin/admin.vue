<template>
  <el-container class="element-box">
    <el-header class="element-header">
      <div class="header">
        <div class="left">
          <i class="icon" @click="goToIndex">创作</i>
        </div>
        <div class="center">
          <h3>你的想象力无极限</h3>
        </div>
        <div class="right"></div>
      </div>
    </el-header>
    <el-container class="element-content">
      <el-aside class="element-left" width="200px">
        <left-list></left-list>
      </el-aside>
      <el-container>
        <el-main class="element-center">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import LeftList from '@/components/common/LeftList';  
export default {
  name: "HelloWorld",
  components: { LeftList },
  props: {
    msg: String
  },
  methods: {
    goToIndex(){
      this.$router.push({name: 'Index'})
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .element-box{
    width: 100%;
    height: 100%;
    .element-header{
      width: 100%;
      background: #3C3C3C;
    }    
    .element-content{
      width: 100%;
      height: 100%;
      background: #ff8080;
      .element-left{
        height: 100%;
        background: #ccc;
      }
      .element-center{
        background: #eee;
      }    
    }
  }
  .header{
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      margin-left: 200px;
      text-align: center;
      .icon{
        color: #0097A7;
        font-size: 24px;
        font-weight: 700;
        cursor: pointer;
        font-style: normal;
      }
    }

    h3{
      color: #fff;
      margin-left: 50px;
    }
  }
</style>
