<template>
  <div class="article-write">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="请输入标题">
        <el-input v-model="formLabelAlign.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="请选择类型">
        <el-radio-group v-model="formLabelAlign.type" size="mini">
          <el-radio-button :label="item.id" v-for="item in typeArr" :key="item.id">{{item.display}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="请输入内容" style="position: relative;">
        <el-button @click="articleBtn" type="primary" size="mini" style="position: absolute; right: 0; top: -46px;"><i class="el-icon-upload2"></i> 发布文章</el-button>
        <mavonEditor v-model="formLabelAlign.markdown" ref=md @change="changeHTML" @imgAdd="imgAdd" style="min-height: 600px"></mavonEditor>
      </el-form-item>      
      </el-form>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import * as qiniu from 'qiniu-js';
  import qiniuServe from '@/server/qiniu'
  import article from '@/server/article'
  export default {
    components: { mavonEditor },
    data() {
      return {
        labelPosition: 'top',
        typeArr: [
          {id: 1, display: '前端'},
          {id: 2, display: 'PHP'},
          {id: 3, display: '料理'},
          {id: 4, display: '工作'},
          {id: 5, display: '娱乐'},
          {id: 6, display: '八卦'},
          {id: 7, display: '其他'},
        ],
        formLabelAlign: {
          type: 1,
        },
        qiniuToken: null
      };
    },
    mounted () {
      this.init();
      this.getToken();
    },    
    methods: {
      init () {
        this.formLabelAlign.token = localStorage.token;
        let id = this.$route.query.id;
        id && this.getDetail(id);
      },
      changeHTML (value, render) {
        this.formLabelAlign.text = render;
      },
      imgAdd (pos, $file) {
        console.log(pos, $file);
        const $this = this;
        let putExtra = {
          fname: "",
          params: {},
          mimeType: ["image/png","image/jpeg","image/jpg","image/gif"]
        };
        let config = {
          useCdnDomain: true,
          region: null
        };                    
        var observable = qiniu.upload($file, $file.name, $this.qiniuToken, putExtra, config)
        var subscription = observable.subscribe(next=>{
          // 获取详情 
        }, error=>{
          // 错误处理
        }, complete=>{
          const url = 'https://pito.nvmjs.com/'+complete.key;
          $this.$refs.md.$imglst2Url([[pos, url]])    //  上传成功之后，将图片插入到编辑器中
        })        
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
      verification () {
        if(!this.formLabelAlign.title){
          this.open('请输入标题', 'error');
          return true;
        }
        if(!this.formLabelAlign.markdown){
          this.open('请输入内容', 'error');
          return true;
        }    
        if(!this.formLabelAlign.type){
          this.open('请选择类型', 'error');
          return true;
        }
      },
      articleUpdate (id) {
        this.formLabelAlign.id = id;
        if(this.verification()){ return};
        article.articleUpdate(this.formLabelAlign).then(res => {
          if(res.code == 200){
            this.$router.push({name: 'Index'});
          }         
        });       
      },
      articleWrite () {
        if(this.verification()){ return};       
        article.articleWrite(this.formLabelAlign).then(res => {
          if(res.code == 200){
            this.$router.push({name: 'Index'});
          }
        });
      },
      getToken () {
        qiniuServe.getToken().then(res=>{
          if(res.code == 200){
            this.qiniuToken = res.data.token;
          }
        });      
      }       
    }
  }
</script>
<style lang="scss" scoped>
	.article-write{
		padding: 10px;
		box-sizing: border-box;
	}
</style>