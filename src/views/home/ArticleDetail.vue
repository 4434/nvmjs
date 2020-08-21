<template>
	<div id="articleDetail">
		<div class="content">
			<h2>{{detail.title}}</h2>
			<div class="author-box">
				<div class="portraits">
					<img v-if="!detail.avater" src="@/assets/img/icon.png">
					<img v-if="detail.avater" :src="detail.avater">
				</div>
				<div class="author">
					<h6>{{detail.username}}</h6>
					<p class="desc">
						<span>{{detail.create_time | dateTime}}</span>
						<span> 字数 {{detail.length}}</span>
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
  import article from '@/server/article';
  import 'mavon-editor/dist/css/index.css';
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
    		article.articleDetail({id: id}).then(res => {
    			this.detail = res.data;
    		});  
    	},
    }
  }
</script>

<style lang="scss">
	#articleDetail{
		height: 100%;
		margin-top: 10px;
		.content{
			width: 1200px;
			min-height: 100%;
			box-sizing: border-box;
			padding: 40px 20px;
			margin: 0 auto;
			background: #fff;
			position: relative;
			pre{
				white-space: pre-wrap;
    			word-wrap: break-word;
			}
			.goBack{
				width: 60px;
				height: 28px;
				border: 1px solid #eee;
				line-height: 28px;
				text-align: center;
				font-size: 12px;
				background: #fff;
				position: absolute;
				top: 80px;
				right: 8px;
				cursor: pointer;
				transition: all 1s;
				color: #333;
				&:hover{
					border: 1px solid red;
				};
			}
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
			h1{
				line-height:62px;
			}
			h2{
				line-height: 52px;
			}
			h3{
				line-height: 42px;
			}
			h4{
				line-height: 32px;
			}
			img{
				max-width: 100%;
			}
			pre{
				background: #f0f0f0;
				line-height: 20px;
				border-radius: 4px;
				box-sizing: border-box;
				padding: 5px 10px;
			}
		}
	}
</style>