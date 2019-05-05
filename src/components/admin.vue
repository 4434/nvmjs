<template>
    <div id="admin">
        <el-container class="element">
        <el-aside width="200px" class="left">
            <left-list></left-list>
        </el-aside>
        <el-main class="right">
            <router-view/>
        </el-main>
        </el-container>        
    </div>
</template>

<script>
import LeftList from '@/components/common/LeftList'
export default {
  components: { LeftList },  
  name: 'app',
}
</script>

<style lang="scss">
    #admin{
        width: 100%;
        height: 100%;
        .element{
            width: 100%;
            height: 100%;
            .left{
                height: 100%;
                background: #ddd;
            }
            .right{
                height: 100%;
            }
        }
    }
</style>
