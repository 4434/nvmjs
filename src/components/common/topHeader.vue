<template>
    <div id="top-header">
        <div class="header-inner">
            <div class="left">
                <div class="logo" @click="goToIndex" >创作</div>
                <input @keydown="keyInput" v-model="form.search" type="" name="" placeholder="Keyword">
                <span @click="searchBtn">搜索</span>
                <span @click="resetBtn">重置</span>
            </div>
            <div class="right">
                <span @click="writeArticle">写文章</span>
                <span @click="goToLogin">sign in</span>            
                <span @click="goToRegister">sign up</span>
                <!-- <img class="avater" src="http://nvmjs.com/img/photoWall/photo1534494616877.png" alt=""> -->
            </div>            
        </div>
    </div>
</template>
<script>
import newVue from '@/assets/js/yk-vue.js'
export default {
  components: { },
  name: "top-header",
  data () {
      return {
          active: 0,
          form: {
            search: '',
          }
      }
  },
  methods: {
    goToIndex () {
        this.$router.push({name: 'Index'});
    },
    goToLogin () {
        this.$router.push({name: 'login'});
    },
    goToRegister () {
        this.$router.push({name: 'register'});
    },
    goToPage (item, index) {
        this.active = index;
        this.$router.push({name: item.uri});
    },
    searchBtn () {
        newVue.$emit('search', this.form);
    },
    resetBtn () {
        this.form.search = '';
        this.searchBtn();
    },
    keyInput (event) {
        if(event.keyCode == 13){
            this.searchBtn();
        }
    },
    writeArticle () {
        this.$router.push({name: 'articleWrite'});
    }
  }
};
</script>
<style lang="scss">
    #top-header{
        width: 100%;
        height: 72px;
        box-sizing: border-box;
        background: #fff;
        border-bottom: 1px solid #ddd;
        .header-inner{
            width: 1200px;
            height: 72px;
            margin: 0 auto;
            display: flex;
            font-size: 14px;
            justify-content: space-between;
            align-items: center;            
            .left{
                color: #333;
                display: flex;
                align-items: center;
                .logo{
                    font-size: 24px;
                    font-weight: 700;
                    color: #0097A7;
                    cursor: pointer;
                }
                input{
                    width: 200px;
                    border: 0;
                    border-bottom: 1px solid #ddd;
                    margin-left: 40px;
                    outline: none;
                }
                span{
                    margin-left: 20px;
                    cursor: pointer;
                }
            }
            .right{
                span{
                    margin-left: 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>

