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
		      prop="create"
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
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>		    
		  </el-table>
		</template>		
	</div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
        	title: '文章标题文章标题文章标题',
        	create: '2019-1-15 10:11:22',
        	zan: 200,
        },{
        	title: '文章标题文章标题文章标题',
        	create: '2019-1-15 10:11:22',
        	zan: 200,
        },{
        	title: '文章标题文章标题文章标题',
        	create: '2019-1-15 10:11:22',
        	zan: 200,
        }]
      }
    },
    mounted () {
    	this.getList();
    },
    methods: {
    	getList () {
    		this.ajax({
    			url: 'http://127.0.0.1/public/index.php/api/index/index',
    			success () {
    				
    			}
    		})
    	}
    }
  }
</script>