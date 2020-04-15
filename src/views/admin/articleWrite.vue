<template>
  <div class="article-write">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="请输入标题">
        <el-input v-model="formLabelAlign.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="请选择类型">
        <el-radio-group v-model="formLabelAlign.type" size="mini">
          <el-radio-button label="1">前端</el-radio-button>
          <el-radio-button label="2">PHP</el-radio-button>
          <el-radio-button label="3">八卦</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="请输入内容" style="position: relative;">
        <el-button @click="articleBtn" type="primary" size="mini" style="position: absolute; right: 0; top: -46px;"><i class="el-icon-upload2"></i> 发布文章</el-button>
        <wangEditor :content="formLabelAlign.text" v-on:content-text="contentText"></wangEditor>
      </el-form-item>      
      </el-form>
  </div>
</template>

<script>
  import wangEditor from '@/components/common/wangEditor';
  import article from '@/server/article'
  export default {
    components: { wangEditor },
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          type: 1,
        }
      };
    },
    mounted () {
      this.init();
    },    
    methods: {
      init () {
        this.formLabelAlign.token = localStorage.token;
        let id = this.$route.query.id;
        id && this.getDetail(id);
      },
      contentText (text) {
        this.formLabelAlign.text = text;
      },
      getDetail (id) {
        article.articleDetail({id: id}).then( res => {
          this.formLabelAlign = res.data;
        });
      },
      articleBtn () {
        let id = this.$route.query.id;
        id && this.articleUpdate(id);
        !id && this.articleWrite();
      },
      articleUpdate (id) {
        this.formLabelAlign.id = id;
        if(!this.formLabelAlign.title){
          this.open('请输入标题', 'error');
          return;
        }
        if(!this.formLabelAlign.text){
          this.open('请输入内容', 'error');
          return;
        }    
        if(!this.formLabelAlign.type){
          this.open('请选择类型', 'error');
          return;
        }        
        article.articleUpdate(this.formLabelAlign).then(res => {
          if(res.code == 200){
            this.$router.push({name: 'Index'});
          }         
        });       
      },
      articleWrite () {
        if(!this.formLabelAlign.title){
          this.open('请输入标题', 'error');
          return;
        }
        if(!this.formLabelAlign.text){
          this.open('请输入内容', 'error');
          return;
        }
        article.articleWrite(this.formLabelAlign).then(res => {
          if(res.code == 200){
            this.$router.push({name: 'Index'});
          }
        });
      }
    }
  }
</script>
<style lang="scss">
	.article-write{
		padding: 10px;
		box-sizing: border-box;
	}
</style>