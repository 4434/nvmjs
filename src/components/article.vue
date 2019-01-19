<template>
    <div id="index">
        <div class="class">
            <span class="index">web前端</span>
            <span>php</span>
        </div>
        <div class="content">
            <div class="list" @click="goToDetail(item);" v-for="(item, index) in articleList" :key="item.id">
                <h2>{{item.title}}</h2>
                <div class="author">
                    作者： 李广
                </div>
                <div class="desc">
                    <p>{{item.describe}}</p>
                </div>
                <div class="footer">
                    <span>{{item.create_time}}</span>
                    <span>
                        <span><i class="iconfont icon-ai-eye"></i> <i>20</i></span>
                        <span><i class="iconfont icon-xin"></i><i>20</i></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        articleList: []
      }
    },
    mounted () {
        this.getList();
    },
    methods: {
        goToDetail (item) {
            this.$router.push({name: 'articleDetail', query: {id: item.id}});
        },
        getList () {
            var _this = this;
            this.ajax({
                url: 'public/index.php/api/index/index',
                type: 'post',
                success (res) {
                    console.log(res);
                    _this.articleList = res.data;
                }
            })
        }
    }
  }
</script>
<style lang="scss">
    #index{
        .class{
            height: 30px;
            line-height: 30px;
            margin: 0 10px;
            margin-top: 10px;
            span{
                cursor: pointer;
                font-size: 12px;
                margin-right: 20px;
                &.index{
                    color: #ea6f5a;
                }
            }
        }        
        .content{
            display: flex;
            flex-wrap: wrap;
            .list{
                width: 220px;
                height: 160px;
                box-sizing: border-box;
                border-radius: 3px;
                padding: 10px;
                background: #fff;
                margin: 10px;
                font-size: 12px;
                cursor: pointer;
                background: #e2ffe7;
                h2{
                    font-size: 14px;
                    color: #444;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;               
                }
                .author{
                    margin-top: 5px;
                    font-size: 12px;
                    color: #777;
                }
                .desc{
                    width: 100%;
                    height: 72px;
                    margin-top: 10px;
                    p{
                        font-size: 12px;
                        color: #2f2f2f;
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
                    color: #777;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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
        }

    }
</style>
