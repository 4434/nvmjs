<template>
	<div id="articleDetail">
		<div class="content">
			<h2>{{detail.title}}</h2>
			<div class="author-box">
				<div class="portraits">
					<img src="http://nvmjs.com/img/photoWall/photo1534494616877.png">
				</div>
				<div class="author">
					<h6>李广</h6>
					<p class="desc">
						<span>{{detail.create_time}}*</span>
						<span> 字数 339</span>
						<span> 阅读 1</span>
						<span> 评论 0</span>
						<span> 喜欢 0</span>
					</p>
				</div>				
			</div>
			<div class="article-conter" v-html="detail.text"></div>	
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        detail: {},
      }
    },
    mounted () {

    	this.getDetail(this.$route.query.id);
    },
    methods: {
    	getDetail (id) {
    		var _this = this;
    		this.ajax({
    			url: 'public/index.php/api/index/articleId',
    			data: {
    				id: id
    			},
    			success (res) {
    				_this.detail = res.data;
    			}
    		})
    	}
    }
  }
</script>

<style lang="scss">
	#articleDetail{
		height: 100%;
		.content{
			width: 800px;
			min-height: 100%;
			box-sizing: border-box;
			padding: 40px 20px;
			margin: 0 auto;
			background: #fff;
			.author-box{
				display: flex;
				margin-top: 20px;
				margin-bottom: 20px;
				.portraits{
					width: 60px;
					height: 60px;
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.author{
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 10px;
					h6{
						font-weight: normal;
						font-size: 12px;
						color: #333;
					}
					.desc{
						margin-top: 10px;
						font-size: 12px;
						color: #969696;
						span{
							margin-right: 10px;
						}
					}
				}
			}
		}
		.article-conter{
			font-size: 14px;
			line-height: 30px;
			color: #2f2f2f;
			pre{
				background: #282c34;
				color: #abb2bf;
				line-height: 20px;
				border-radius: 4px;
				box-sizing: border-box;
				padding: 5px 10px;
			}
		}
	}
</style>