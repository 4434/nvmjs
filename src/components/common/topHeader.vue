<template>
    <div id="top-header">
        <div class="header-inner">
            <div class="left">
                <div class="logo" @click="goToIndex" >创作</div>
                <input @keydown="keyInput" v-model="form.search" type="" name="" placeholder="Keyword">
                <span @click="searchBtn">search</span>
                <span @click="resetBtn">reset</span>
            </div>
            <div class="right">
                <div class="sign-in" v-if="!user.token" @click="goToLogin">sign in</div>            
                <div class="sign-up" v-if="!user.token" @click="goToRegister">sign up</div>
                <div class="user-data" v-if="user.token">
                    <img class="user-photo" src="http://pito.nvmjs.com/1.jpg" alt="">
                    <ul class="user-list">
                        <li @click="writeArticle">
                            <i class="el-icon-edit"></i>
                            <span>写文章</span>  
                        </li>
                        <li @click="exit">
                            <i class="el-icon-edit"></i>
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
import newVue from '@/assets/js/yk-vue.js'
export default {
  components: { },
  name: "top-header",
  data () {
      return {
          active: 0,
          user: {},
          form: {
            search: '',
          }
      }
  },
  mounted () {
    this.user = localStorage.user && JSON.parse(localStorage.user) || {};
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
    },
    exit () {
        localStorage.user = null;
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

