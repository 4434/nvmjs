<template>
    <div class="article-write">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="请输入标题">
          <el-input v-model="formLabelAlign.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="请输入内容">
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
          name: '',
          region: '',
          type: ''
        }
      };
    },
    methods: {
      contentText (text) {
        console.log(text)
      }
    }
  }
</script>