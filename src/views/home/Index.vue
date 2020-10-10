<template>
    <div id="index">
        <div class="box-inner">
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
  import bus from '@/utils/bus.js'
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
        bus.$off('search');
        bus.$on('search', function(data){
            $this.from = Object.assign(data);
            $this.page.pageIndex = 1;
            $this.getList($this.from);
        });

    },
    methods: {
        searchData (data) {
            console.log(data)
        },
        getList (data) {
            article.articleList(data).then(res => {
                this.articleData = res.data;
                this.page = res.page;
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
                color: teal;
            }
            .inner{
                min-height: 500px;
                border-top: 0;
                padding: 10px;
                background: #fff;
            }
        }
        .page-box{
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 20px;
        }
    }
</style>
