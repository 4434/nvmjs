<template>
	<div class="articleList">
		<template>
		  <el-table
		    :data="tableData"
			border
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
			  <template slot-scope="scope">
				  <div>
					  {{scope.row.create_time | dateTime}}
				  </div>
			  </template>
		    </el-table-column>
		    <el-table-column
		      prop="zan"
		      label="作者">
			  <template slot-scope="scope">
				  <div>
					  <span v-if="scope.row.username">{{scope.row.username}}</span>
					  <span v-if="!scope.row.username">自己</span>
				  </div>
			  </template>
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
		<div class="page-box">
			<pageList :page="page" @page-data="pageData"></pageList>
		</div>
	</div>
</template>
<script>
  import article from '@/server/article'  
  import pageList from '@/components/common/pageList'
  export default {
	components: { pageList },
    data() {
      return {
		tableData: [],
        page: {
            pageIndex: 1,
            pageSize: 10,
            pageAll: 100,
		},
		uid: '',
      }
    },
    mounted () {
		this.uid = localStorage.token;
		let params = {
			uid: this.uid 
		}
		params = Object.assign(params,this.page);
    	this.getList(params);
    },
    methods: {
        getList (data) {
            article.articleUs(data).then(res => {
				if(res.code == 200){
					this.tableData = res.data;
					this.page = res.page;
				}
            })
        },
    	handleEdit (data) {
			const name = data.markdown ? 'Markdown' : 'articleWrite';
    		this.$router.push({name: name, query: {id: data.id}});
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
				let params = {
					uid: this.uid 
				}
				params = Object.assign(params,this.page);				
                this.getList(params);
            });  		
		},
        pageData (data) {
			this.page = data;
			let params = {
				uid: this.uid,
			}
			Object.assign(params, this.page)
            this.getList(params);
        },		
    }
  }
</script>
<style lang="scss" scope>
	.articleList{
		padding: 10px;
		box-sizing: border-box;
	}
	.page-box{
		margin-top: 20px;
	}
</style>
