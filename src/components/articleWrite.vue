<template>
  <div class="article-write">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="请输入标题">
        <el-input v-model="formLabelAlign.title" placeholder="请输入标题"></el-input>
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
  export default {
    components: { wangEditor },
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {}
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
        var _this = this;
        this.ajax({
          url: 'public/index.php/api/index/articleId',
          data: {
            id: id
          },
          success (res) {
            _this.formLabelAlign = res.data;
          }
        })
      },
      articleBtn () {
        let id = this.$route.query.id;
        id && this.articleUpdate(id);
        !id && this.articleWrite();
      },
      articleUpdate (id) {
        let _this = this;
        this.formLabelAlign.id = id;
        this.ajax({
          url: 'public/index.php/api/index/articleUpdate',
          type: 'post',
          data: this.formLabelAlign,
          success (res) {
            if(res.code == 200){
              _this.open(res.message, 'success');
              _this.$router.push({name: 'articleList'}); 
            }
          }
        });        
      },
      articleWrite () {
        let _this = this;
        this.ajax({
          url: 'public/index.php/api/index/articleInsert',
          type: 'post',
          data: this.formLabelAlign,
          success (res) {
            if(res.code == 200){
              _this.open(res.message, 'success');
              _this.$router.push({name: 'articleList'}); 
            }
          }
        });
      }
    }
  }
</script>