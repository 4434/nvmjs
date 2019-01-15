<template>
	<div id="editor" ref="editor">
    <p>{{content}}</p> 
  </div>
</template>

<script>
import E from 'wangeditor';	
export default {
  name: 'editor',
  data () {
    return {

    }
  },
  props: ['content'],
  mounted () {
  	this.seteditor();
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
	}	
</style>