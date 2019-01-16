<template>
    <div id="top-header">
        <div class="left">
            <i class="index" @click="goToIndex">创作</i>
            <span v-for="(item, index) in list " :key="index" :class="indexPage == index ? 'index': ''">{{item.title}} </span>
        </div>
        <div class="center">
            <input type="text" placeholder="请输入查询内容">
            <i class="iconfont icon-sousuo"></i>
        </div>
        <div class="right">
            <span @click="writeArticle">写文章</span>
            <span>sign up</span>
            <span>sign in</span>
            <img class="avater" src="http://nvmjs.com/img/photoWall/photo1534494616877.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
  components: { },
  name: "top-header",
  data () {
      return {
          indexPage: 0,
          list: [{
              id: 1,
              title: '文章'
          }],
          
      }
  },
  methods: {
    goToIndex () {
        this.$router.push({path: '/'});
    },
    writeArticle () {
        this.$router.push({path: 'articleWrite'});
    }
  }
};
</script>
<style lang="scss">
    #top-header{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        color: #fff;
        padding: 0 20px;
        background: rgba($color: #000000, $alpha: 0.8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            font-size: 12px;
            i{
                font-style: normal;
                font-size: 16px;
                margin-right: 50px;
                cursor: pointer;
            }
            span{
                margin-right: 20px;
                font-size: 14px;
                cursor: pointer;
                &.index{
                    color: #ea6f5a;
                }
            }
        }
        .center{
            height: 30px;
            display: flex;
            background: #fff;
            border-radius: 15px;
            display: flex;
            align-items: center;
            i{
                font-size: 16px;
                color: #ccc;
                margin-right: 10px;
                cursor: pointer;
            }
            input{
                width: 200px;
                height: 30px;
                box-sizing: border-box;
                border: 0;
                border-radius: 15px;
                outline: none;
                padding: 0 20px;
            }
        }
        .right{
            display: flex;
            align-items: center;
            font-size: 14px;
            .avater{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-left: 20px;
                cursor: pointer;
            }
            span{
                margin-left: 20px;
                cursor: pointer;
            }
        }
    }
</style>

