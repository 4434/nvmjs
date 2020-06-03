<template>
	<div id="editor" ref="editor"></div>
</template>

<script>
import * as qiniu from 'qiniu-js';
import qiniuServe from '@/server/qiniu'
import E from 'wangeditor';	
export default {
  name: 'editor',
  data () {
    return {
      editor: null,
      qiniuToken: '',
    }
  },
  props: ['content'],
  mounted () {
    this.seteditor();
    this.getToken();
  },
  watch: {
    content (data, oldData){
      !oldData  && this.editor.txt.html(data);
    }    
  },
  methods: {
  	seteditor () {
      let that = this;
      this.editor = new E(this.$refs.editor);
  		this.editor.customConfig = {
  			uploadImgShowBase64: true,
        fontNames: ['宋体', '微软雅黑'],        
  			onchange: (html)=>{
          this.$emit('content-text', html);
  			},
        customUploadImg (files, insert) {         // 获取上传图片file 以及插入路径到文本中
          let putExtra = {
            fname: "",
            params: {},
            mimeType: ["image/png","image/jpeg","image/jpg","image/gif"]
          };
          let config = {
            useCdnDomain: true,
            region: null
          };                    
          var observable = qiniu.upload(files[0], files[0].name, that.qiniuToken, putExtra, config)
          var subscription = observable.subscribe(next=>{
            // 获取详情 
          }, error=>{
            // 错误处理
          }, complete=>{
            insert('https://pito.nvmjs.com/'+complete.key);  //  上传成功之后，将图片插入到编辑器中
          })
        },        
      }
      //this.editor.customConfig.qiniu = true;
      this.editor.create();       
     //this.uploadInit();
    },
    // 初始化七牛上传的方法
    uploadInit() {
      qiniu.upload(file, key, token, putExtra, config);
    },
    getToken () {
      qiniuServe.getToken().then(res=>{
        if(res.code == 200){
          this.qiniuToken = res.data.token;
        }
      });      
    }    
  }, 
}
</script>
<style lang="scss">
	#editor{
		background: #fff;
    .w-e-text-container{
        height: 600px !important;
    }        
	}	
</style>