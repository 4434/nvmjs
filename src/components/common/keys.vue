<template>
    <div id="keys">
        <div class="title">分类</div>
        <div class="inner">
            <span>web前端</span>
            <span>JAVA</span>
        </div>
    </div>
</template>
<style lang="scss">
    #keys{
        width: 100%;
        font-size: 12px;            
        .title{                
            height: 28px;
            line-height: 28px;
            padding: 0 10px;
            border: 1px solid #C9E6F2;
            background: #F2F9FC;
            color: teal;
        }
        .inner{
            border: 1px solid #C9E6F2;
            border-top: 0;
            padding: 10px;
            background: #fff;
            color: #333;
            span{
            	margin-right: 10px;
            	cursor: pointer;
            }
        }
    }	
</style>
