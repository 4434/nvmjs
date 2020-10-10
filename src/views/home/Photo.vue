<template>
    <div id="home" ref="home">
        <div class="item" v-show="item.style" v-for="(item, index) in articleData" :key="index" :style="item.style">
            <div class="box" :class="`style${item.w}`">
                <h1>{{item.title}}</h1>
                <p>{{item.describe}}</p>
                <div class="info">
                    <span>{{item.username}}</span>
                    <span>{{item.create_time | dateTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import articleList from '@/components/common/articleList'
  import pageList from '@/components/common/pageList'
  import block from '@/utils/develop/block.js'
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
                this.layout();
                this.page = res.page;
            })
        },
        pageData (data) {
            this.page = data;
            this.from = Object.assign(this.from,data);
            this.getList(this.from);
        },
        layout () {
            const homeBox = document.querySelector('#home');
            const homeW   = homeBox.offsetWidth;
            const homeH   = homeBox.offsetHeight;
            this.articleData.forEach(res=>{
                res.w = Math.floor(Math.random() * 3);
                res.h = res.w;
            });
            this.articleData = new block(homeW, homeH, this.articleData).init();            
        }   
    }
  }
</script>
<style lang="scss" scoped>
#home{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #4AA0DD;
    .item{
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 2px;
        .box{
            width: 100%;
            height: 100%;
            word-break:break-all;
            box-sizing: border-box;
            background: rgba(250, 250, 250, 0.1);
            color: #fff;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: all .4s;
            &.style2{
                h1{
                    font-size: 32px;
                }
                p{
                    font-size: 24px;
                    margin: 20px auto;
                    line-height: 40px;
                }
                .info{
                    font-size: 24px;
                }
            }
            &.style3{
                h1{
                    font-size: 52px;
                }
                p{
                    font-size: 24px;
                    margin: 40px auto;
                    line-height: 50px;
                }
                .info{
                    font-size: 34px;
                }
            }            
            &:hover{
                background: #fff;
                h1{
                    color: #333;
                }
                p{
                    color: #333;
                }
                .info{
                    color: #333;
                }
            }
            .info{
                display: flex;
                justify-content: space-between;
            }
            h1{
                font-size: 18px;
                letter-spacing: 5px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;                
            }
            p{
                font-size: 14px;
                line-height: 18px;
                margin: 10px auto;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;                   

            }
        }
    }

}
</style>
