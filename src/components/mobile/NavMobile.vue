<template>
    <div class="nav-mobile">
        <div class="search-box">
            <input type="text" v-model="form.search" placeholder="请输入关键字">
            <div class="btn" @click="searchBtn">搜索</div>
        </div>
        <div class="set-box">
            <span @click="resetBtn">重置</span>
            <span @click="nextBtn">换一批({{page.pageIndex}}/{{Math.ceil(page.pageAll / page.pageSize)}})</span>
        </div>
    </div>
</template>
<script>
import bus from '@/utils/bus.js'
import Logo from '@/components/common/Logo.vue';
export default {
  components: { Logo },
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
  computed: {
    page(){
        return this.$store.state.page
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
    nextBtn () {
        bus.$emit('search', {next: true});     
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
    .nav-mobile{
        background: #fff;
        .search-box{
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;
            font-size: 16px;
            input{
                height: 34px;
                border: 0;
                outline: none;
                background: #eee;
                border-radius: 5px;
                width: calc(100% - 46px);
                padding: 0 10px;
            }
            .btn{
                width: 40px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                border-radius: 5px;
                border: 1px solid #4aa0dd;
                color: #4aa0dd;
                line-height: 34px;
                
            }
        }
        .set-box{
            padding: 10px;
            font-size: 16px;
            color: #4aa0dd;
            span{
                margin-right: 10px;
            }
        }
    }
</style>