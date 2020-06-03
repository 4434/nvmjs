<template>
    <div id="top-header">
        <div class="header-inner">
            <div class="left">
                <div class="logo" @click="goToIndex" >创作</div>
                <input v-model="form.search" type="" @keyup="keyBtn" name="" placeholder="关键字">
                <span @click="searchBtn" class="search">搜索</span>
                <span @click="resetBtn" class="search">重置</span>
                <span @click="$router.push({name: 'Tank'})" class="search">坦克大战</span>
            </div>
            <div class="right">
                <div class="sign-in" v-if="!token" @click="goToLogin">登陆</div>            
                <div class="sign-up" v-if="!token" @click="goToRegister">注册</div>
                <div class="user-data" v-if="token">
                    <img v-if="!avater" class="user-photo" @click="info" src="@/assets/img/icon.png" alt="">
                    <img v-if="avater" class="user-photo" @click="info" :src="avater" alt="">
                    <ul class="user-list">
                        <li @click="writeArticle">
                            <i class="el-icon-edit"></i>
                            <span>写文章</span>  
                        </li>
                        <li @click="articleList">
                            <i class="el-icon-s-operation"></i>
                            <span>文章列表</span>
                        </li>
                        <li @click="$router.push({name: 'Tank'})">
                            <i class="el-icon-burger"></i>
                            <span>游戏列表</span>
                        </li>
                        <li @click="$router.push({name: 'Echarts'})">
                            <i class="el-icon-tableware"></i>
                            <span>统计列表</span>
                        </li>      
                        <li @click="exit">
                            <i class="el-icon-setting"></i>
                            <span>退出</span>
                        </li>
                    </ul>
                </div>
                <!-- <img class="avater" src="http://nvmjs.com/img/photoWall/photo1534494616877.png" alt=""> -->
            </div> 
        </div>
    </div>
</template>
<script>
import bus from '@/assets/js/bus.js'
export default {
  components: { },
  name: "top-header",
  data () {
      return {
          active: 0,
          token: '',
          avater: '',
          form: {
            search: '',
          }
      }
  },
  mounted () {
    this.token = localStorage.token;
    this.avater = localStorage.avater;
  },
  methods: {     
    goToIndex () {
        this.$router.push({name: 'Index'});
    },
    goToLogin () {
        this.$router.push({name: 'Login'});
    },
    goToRegister () {
        this.$router.push({name: 'Register'});
    },
    goToPage (item, index) {
        this.active = index;
        this.$router.push({name: item.uri});
    },
    keyBtn (event) {
        bus.$emit('search', this.form);
    },
    searchBtn () {
        bus.$emit('search', this.form);
    },
    resetBtn () {
        this.form.search = '';
        this.searchBtn();
    },
    info () {
        this.$router.push({name: 'Info'});
    },
    writeArticle () {
        this.$router.push({name: 'articleWrite'});
    },
    articleList () {
        this.$router.push({name: 'articleList'});
    },
    exit () {
        localStorage.clear();
        window.location.href= "/";
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
                    &.search{
                        color: #0097A7;
                    }
                    &.reset{
                        color: red;
                    }
                }
            }
            .right{
                display: flex;
                height: 100%;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &>div{
                    margin-left: 20px;
                    position: relative;
                }
                .user-data{
                    height: 100%;
                    cursor: pointer;
                    box-sizing: border-box;
                    position: relative;
                    padding: calc((72px - 42px) / 2) 20px;
                    &:hover{
                        background: rgba(0,0,0,0.1);
                        .user-list{
                            display: block;
                        }
                    }
                    .user-photo{
                        display: block;
                        width: 42px;
                        height: 42px;
                        box-sizing: border-box;
                        border: 1px solid #ddd;
                        border-radius: 50%;
                    }
                    .user-list{
                        display: none;
                        min-width: 100px;
                        position: absolute;
                        z-index: 99;
                        top: 70px;
                        left: 0;
                        border-radius: 3px;
                        background: #fff;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1); 
                        color: #333;
                        li{
                            line-height: 40px;
                            box-sizing: border-box;
                            padding: 0 10px;
                            &:hover{
                                background:rgba(0,0,0,0.1);
                            }
                            span{
                                margin-left: 10px;
                            }
                        }
                    }
                } 
            }
        }
    }
</style>

