<template>
	<div id="editor" ref="editor"></div>
</template>

<script>
import E from 'wangeditor';	
export default {
  name: 'editor',
  data () {
    return {
      editor: null,
    }
  },
  props: ['content'],
  mounted () {
  	this.seteditor();
  },
  watch: {
    content (data, oldData){
      !oldData  && this.editor.txt.html(data);
    }    
  },
  methods: {
  	seteditor () {
  		this.editor = new E(this.$refs.editor);
  		this.editor.customConfig = {
  			onchange: (html)=>{
          this.$emit('content-text', html);
  			},
  			uploadImgShowBase64: true,
  			fontNames: ['宋体', '微软雅黑']
  		}
  		this.editor.create();
               
  	}
  }
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