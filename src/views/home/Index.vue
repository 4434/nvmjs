<template>
    <div id="index">
        <div class="box-inner">
            <div class="title">列表</div>
            <div class="inner">
                <articleList :articleList = articleData ></articleList>
            </div>
            <div class="page-box">
                <pageList :page="page" @page-data="pageData"></pageList>
            </div>
        </div>
    </div>
</template>
<script>
  import articleList from '@/components/common/articleList'
  import pageList from '@/components/common/pageList'
  import newVue from '@/assets/js/yk-vue.js'
  import article from '@/server/article.js'
  export default {
    components: { articleList, pageList },
    data() {
      return {
        articleData: [],
        page: {
            pageIndex: 1,
            pageSize: 10,
            pageAll: 100,
        },
        from: {
            search: ''
        }
      }
    },
    mounted () {
        this.getList();
        let $this = this;
        newVue.$on('search', function(data){
            $this.from = Object.assign(data);
            $this.getList($this.from);
        });
    },
    methods: {
        searchData (data) {
            console.log(data)
        },
        getList (data) {
            article.articleList(data).then(res => {
                this.articleData = res.data.data;
                this.page = res.data.page;
            })
        },
        pageData (data) {
            this.page = data;
            this.from = Object.assign(this.from,data);
            this.getList(this.from);
        },     
    }
  }
</script>
<style lang="scss">
    #index{
        width: 1200px;
        margin: 0 auto;
        .key-box{
            margin-top: 10px;
        }
        .box-inner{
            width: 100%;
            font-size: 12px;       
            margin-top: 10px;     
            .title{                
                height: 28px;
                line-height: 28px;
                padding: 0 10px;
                border: 1px solid #C9E6F2;
                background: #F2F9FC;
                color: teal;
            }
            .inner{
                min-height: 500px;
                border: 1px solid #C9E6F2;
                border-top: 0;
                padding: 10px;
                background: #fff;
                span{
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
