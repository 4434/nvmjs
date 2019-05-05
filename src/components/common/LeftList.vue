<template>
	<div class="left-list">
		<el-row  class="tac">
		  <el-col :span="24">
		    <el-menu class="el-menu-vertical-demo" router :default-active="activeRoute"  unique-opened   background-color="#ccc" text-color="#333" active-text-color="red" :collapse="false">
		      <el-submenu class="left_title_one" v-for="(item,index) in leftList" :index="JSON.stringify(index)" :key="index" >		      	
		        <template slot="title">
              <i :class="item.icon"></i>	
              <span>{{item.title}}</span>
		        </template>
		          <el-menu-item class="left_title_tow" v-for="(unitList,unitindex) in item.list" :index="unitList.router" @click="goToDestination(unitList,index);"  :key="unitindex">{{unitList.title}}</el-menu-item>
		      </el-submenu>
		    </el-menu>
		  </el-col>					
    </el-row>
    
	</div>	
</template>
<script>
export default {
	name: 'left-list',
	data () {
		return {
			leftList: [{
				title: '文章管理',
				icon: 'el-icon-info',
				list: [{
					title: '写文章', router: 'articleWrite' ,
        		},{
					title: '文章列表', router: 'articleList' ,
        		}]
      		}]
		}
	},
	computed: {
		activeRoute () {
			return this.$route.path.replace('/','')
		},
	},
    methods: {
    	goToDestination (data,index) {
    		this.$router.push({path: data.router,query: {}});
    	}
    }	
}	
</script>
<style>
.el-col .el-menu-vertical-demo{
  border-right: none;
}
.left_title_one{
  text-align: left;
}
.left_title_tow{
  text-align: left;
  text-indent: 25px;
}
</style>
