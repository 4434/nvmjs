<template>
    <div class="content">
        <div class="null" v-if="articleList.length == 0">
            <img src="@/assets/img/null.jpg" alt="">
        </div>
	    <div class="article-list" @click="goToDetail(item);" v-for="item in articleList" :key="item.id">
	        <h2>{{item.title}}</h2>
	        <div class="desc">
	            <p>{{item.describe}}</p>
	        </div>                    
	        <div class="footer">
                <div class="left">
                    <span>{{item.username}}</span>
                    <span>{{item.length}}字</span>
                </div>
                <div class="right">
	                <span>{{item.create_time | dateTime}}</span>
                </div>
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
            window.open(routeUrl.href, '_blank');            
        },
    }    
  }
</script>
<style lang="scss" scoped>
.null{
    text-align: center;
}
.article-list{
    box-sizing: border-box;
    padding: 10px 0;
    background: #fff;
    margin: 10px;
    font-size: 12px;
    cursor: pointer;
    background: #fff;
    border-bottom: 1px solid #eee;
    transition: all 1s;
    &:hover{
        border-bottom: 1px solid rgb(0, 151, 167);
    };
    &:last-child{
        border-bottom: 0;
    }
    h2{
        font-size: 16px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;               
    }
    .desc{
        width: 100%;
        margin-top: 6px;
        p{
            font-size: 12px;
            color: #666;
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
        justify-content: space-between;
        margin-top: 6px;
        .left{
            span{
                margin-right: 10px;
                i{
                    font-size: 12px;
                    font-style: normal;
                    margin-left: 3px;
                }
            }
        }

    }
}	
</style>