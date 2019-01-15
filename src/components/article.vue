<template>
    <div id="index">
        <div class="class">
            <span class="index">web前端</span>
            <span>php</span>
        </div>
        <div class="content">
            <div class="list">
                <h2>vue-cli 3.0 修改端口</h2>
                <div class="desc">1. vue-cli 3.0 修改端口 项目根目录下 创建 vue.config.js 文件创建 vue.config.js 文件创建 vue.config.js 文件</div>
                <div class="footer">
                    <span>2018-10-11</span>
                    <span>
                        <span><i class="iconfont icon-ai-eye"></i> <i>20</i></span>
                        <span><i class="iconfont icon-xin"></i><i>20</i></span>
                    </span>
                </div>
            </div>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
        </div>
    </div>
</template>
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
                h2{
                    height: 40px;
                    font-size: 14px;
                    color: #444;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;                
                }
                .desc{
                    width: 100%;
                    height: 52px;
                    margin-top: 10px;
                    font-size: 11px;
                    color: #777;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    line-clamp: 3;
                    -webkit-box-orient: vertical;                     
                }
                .footer{
                    color: #777;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 22px;
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
