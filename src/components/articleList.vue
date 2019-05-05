<template>
	<div class="articleList">
		<template>
		  <el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="title"
		      label="文章标题"
		      width="300">
		    </el-table-column>
		    <el-table-column
		      prop="create_time"
		      label="发布时间"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="zan"
		      label="点赞数量">
		    </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.row)">删除</el-button>
		      </template>
		    </el-table-column>		    
		  </el-table>
		</template>		
	</div>
</template>
<script>
  import article from '@/server/article'  
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted () {
    	this.getList();
    },
    methods: {
        getList () {
            article.articleList().then(res => {
                this.tableData = res.data.data;
            })
        },
    	handleEdit (data) {
    		this.$router.push({name: 'articleWrite', query: {id: data.id}});
    	},
    	handleDelete (data) {
    		this.$confirm('确定要删除这篇文章吗？', '提示信息',{
    			type: 'warning'
    		})
    		.then(()=>{
    			this.articleDelete(data);
    		})
    		.catch(()=>{

    		});
    	},
    	articleDelete (data) {
    		let _this = this;
            article.articleDelete({ id: data.id}).then(res => {
                this.getList();
                open(res.message, 'success');
            });  		
    	}
    }
  }
</script>