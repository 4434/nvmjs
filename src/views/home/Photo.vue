<template>
    <div id="home" ref="home">
        <div class="item"  v-show="item.style" v-for="(item, index) in articleData" :key="index" :style="item.style">
            <div class="box" @click="goToDetail(item, index)">
                <div class="mask"></div>
                <div class="inner">
                    <p class="title">{{item.title}}</p>
                    <div class="desc"></div> 
                </div>
                <div class="info">
                    <div>{{item.username}}</div>
                    <div>{{item.create_time | dateTime}}</div>
                </div>
                <div class="num">{{item.length}}字</div>   
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
            pageSize: 20,
            pageAll: 100,
        },
        homeW: '',
        from: {
            search: ''
        },
        positian: {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        }
      }
    },
    mounted () {
        const homeBox = document.querySelector('#home');
        this.homeW    = homeBox.offsetWidth;        
        this.getList();
        let $this = this;
        bus.$off('search');
        bus.$on('search', function(data){
            $this.from = Object.assign(data);
            if(data.next){
                if($this.page.pageIndex < Math.ceil($this.page.pageAll / $this.page.pageSize)){
                    $this.page.pageIndex ++;
                }else{
                    $this.page.pageIndex = 1;
                }
            }else{
                $this.page.pageIndex = 1;
            }
            $this.from.pageIndex = $this.page.pageIndex;
            $this.getList($this.from);
        });

    },
    methods: {
        getList (data = {}) {
            data.pageSize = this.page.pageSize;
            article.articleList(data).then(res => {
                this.articleData = res.data;
                this.layout();
                this.page = res.page;
                this.$store.commit('setPage', this.page)
            })
        },
        pageData (data) {
            this.page = data;
            this.from = Object.assign(this.from,data);
            this.getList(this.from);
        },
        layout (w) {
            this.articleData.forEach(res=>{
                this.$set(res,'w',Math.floor(Math.random() * 2 + 1));
                this.$set(res,'h',Math.floor(Math.random() * 2 + 1));              
            });
            this.articleData = new block(this.homeW, this.articleData).init();
        },
        goToDetail (item) {
            const routeUrl = this.$router.resolve({
                name: "ArticleDetail",
                query: {id: item.id}
            });
            window.open(routeUrl.href, '_blank');            
        },              
        mousedownBtn (e) {
            this.positian.startX = e.offsetX;
            this.positian.startY = e.offsetY;
        },
        mouseupBtn (e, item, index) {
            setTimeout(()=>{
                this.positian.endX = e.offsetX;
                this.positian.endY = e.offsetY;
                if(Math.abs(this.positian.startX - this.positian.endX) < 10 && Math.abs(this.positian.startY == this.positian.endY) < 10){
                    this.enlargeBtn(item, index);
                }
            }, 0)
        },
        enlargeBtn (item, index) {
            this.articleData.forEach((res, i)=>{
                if(index != i){
                    this.$set(res, 'flag', false);
                }
                this.$set(res,'w',Math.floor(Math.random() * 2 + 1));
                this.$set(res,'h',Math.floor(Math.random() * 2 + 1));              
            });
            if(item.flag){
                item.flag = false;
            }else{
                item.flag = true;            
                item.w    = item.row;
                item.h    = item.row;
            }
            this.$set(this, 'articleData', [...new block(this.homeW, this.articleData).init()]);
        }   
    }
  }
</script>
<style lang="scss">
#home{
    width: 100%;
    position: relative;
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
            background: #fff;
            color: #333;
            padding: 40px 10px;
            transition: all .4s;
            box-orient: horizontal;
            box-pack: center;
            box-align: center;
            position: relative;
            z-index: 2;
            &.active{
                cursor: pointer;
            }      
            &:hover{
                .mask{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, .1);
                    z-index: 2;
                    cursor: pointer;
                    transition: all 1s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 16px;
                    span{
                        margin-left: 6px;
                    }
                }
            }
            .info{
                width: 100%;
                box-sizing: border-box;
                padding: 0 20px;
                position: absolute;
                left: 0;
                bottom: 10px;
                display: flex;
                justify-content: space-between;
                color: #666;
                font-size: 12px;
                div{
                    width: 50%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    &:last-child{
                        text-align: right;
                    }                    
                }
            }
            .num{
                position: absolute;
                top: 8px;
                right: 8px;
                font-size: 12px;
            }
            .inner{
                overflow: hidden;
                width: 100%;
                height: 100%;
                font-size: 14px;
                line-height: 26px;
                color: #2f2f2f;            
                .title{
                    color: #4AA0DD;
                    font-size: 14px;
                    font-weight: 700;
                    span{
                        color: #999;
                        font-size: 12px;
                        
                    }
                }
                .desc{
                    margin-top: 20px;
                    h1,h2,h3,h4,h5,h6{
                        line-height: 3em;
                    }
                    img{
                        max-width: 100%;
                    }                      
                }
                .user{
                    color: #9F7D50;
                }                              
            }
        }
    }
}
</style>
