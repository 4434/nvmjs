<template>
    <div class="content">
	    <div class="article-list" @click="goToDetail(item);" v-for="item in articleList" :key="item.id">
	        <h2>{{item.title}}</h2>
	        <div class="desc">
	            <p>{{item.describe}}</p>
	        </div>                    
	        <div class="footer">
	            <span>李广</span>
	            <span>{{item.length}}字</span>
	            <span><i class="iconfont icon-ai-eye"></i> <i>20</i></span>
	            <span><i class="iconfont icon-xin"></i><i>20</i></span>
	            <span>{{item.create_time}}</span>
	        </div>
	    </div>
    </div>   	

</template>
<script>
  import article from '@/server/article.js'
  export default {
    data() {
      return {
      }
    },
    props: ['articleList'],
    methods: {
        goToDetail (item) {
            let routeUrl = this.$router.resolve({
                name: "ArticleDetail",
                query: {id: item.id}
            });
            window.open(routeUrl .href, '_blank');            
        },
    }    
  }
</script>
<style lang="scss">
.article-list{
    box-sizing: border-box;
    border-radius: 3px;
    padding: 10px;
    background: #fff;
    margin: 10px;
    font-size: 12px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #eee;
    transition: all 1s;
    &:hover{
        border: 1px solid rgb(0, 151, 167);
    };
    h2{
        font-size: 16px;
        color: #969696;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;               
    }
    .desc{
        width: 100%;
        margin-top: 6px;
        p{
            font-size: 12px;
            color: #999;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;                         
        }                    
    }
    .footer{
        color: #b4b4b4;
        display: flex;
        align-items: center;
        margin-top: 6px;
        span{
            display: flex;
            align-items: center;
            i{
                font-size: 12px;
                font-style: normal;
                margin-left: 3px;
            }
        }
    }
}	
</style>