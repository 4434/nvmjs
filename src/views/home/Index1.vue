<template>
    <div class="home">
        <ul ref="bollBox" class="boll-box">
            <li ref="boll" v-for="(item, index) in arr" :key="index" :style="{width: `${item.w}px`, height: `${item.h}px`, top: `${item.y}px`, left: `${item.x}px`}"></li>
        </ul>
    </div>
</template>
<script>
import FFHome from '@/utils/home'
export default {
    data () {
        return {
            arr: [{id: 1, name: 'a'}]
        }
    },
    mounted () {
        const bollBox = this.$refs.bollBox;
        const boll    = this.$refs.boll;
        this.arr = new FFHome(bollBox.offsetWidth, bollBox.offsetHeight).init(10, 200, 200);
        console.log(this.arr);
        setInterval(()=>{
            this.arr = new FFHome(bollBox.offsetWidth, bollBox.offsetHeight).positionChange(this.arr);
            console.log(111);
        }, 10);
    }
}
</script>
<style lang="scss">
    .home{
        width: 100%;
        height: 100%;
        .boll-box{
            width: 100%;
            height: 100%;
            position: relative;
            li{
                width: 200px;
                height: 200px;
                background: red;
                border-radius: 50%;
                position: absolute;

            }
        }
    }    
</style>