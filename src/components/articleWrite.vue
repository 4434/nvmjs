<template>
    <div class="article-write">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="请输入标题">
          <el-input v-model="formLabelAlign.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="请输入内容" style="position: relative;">
          <el-button @click="articleWrite" type="primary" size="mini" style="position: absolute; right: 0; top: -46px;"><i class="el-icon-upload2"></i> 发布文章</el-button>                    
          <wangEditor v-on:content-text="contentText"></wangEditor>
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
        formLabelAlign: {
          title: '',
          text: '',
        }
      };
    },
    methods: {
      contentText (text) {
        this.text = text;
      },
      articleWrite () {
        this.ajax({
          url: 'http://127.0.0.1/public/index.php/api/index/articleInsert',
          type: 'post',
          data: this.formLabelAlign,
          success (res) {

          }
        });
      }
    }
  }
</script>