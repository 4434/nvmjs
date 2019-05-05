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
          type: 1
        }
      };
    },
    mounted () {
      this.init();
    },    
    methods: {
      init () {
        let id = this.$route.query.id;
        id && this.getDetail(id);
      },
      contentText (text) {
        this.formLabelAlign.text = text;
      },
      getDetail (id) {
        article.articleDetail({id: id}).then( res => {
          this.formLabelAlign = res.data.data;
        });
      },
      articleBtn () {
        let id = this.$route.query.id;
        id && this.articleUpdate(id);
        !id && this.articleWrite();
      },
      articleUpdate (id) {
        this.formLabelAlign.id = id;
        article.articleUpdate(this.formLabelAlign).then(res => {
          this.open(res.message, 'success');
          this.$router.push({name: 'articleList'});         
        });       
      },
      articleWrite () {
        article.articleWrite(this.formLabelAlign).then(res => {
          this.open(res.message, 'success');
          this.$router.push({name: 'articleList'});           
        });
      }
    }
  }
</script>