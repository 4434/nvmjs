<template>
	<div id="articleDetail">
		<div class="content">
			<h2>标题标题标题标题标题标题标题标题标题标题标题标题</h2>
			<div class="author-box">
				<div class="portraits">
					<img src="http://nvmjs.com/img/photoWall/photo1534494616877.png">
				</div>
				<div class="author">
					<h6>李广</h6>
					<p class="desc">
						<span>2019.01.15 11:03*</span>
						<span> 字数 339</span>
						<span> 阅读 1</span>
						<span>评论 0</span>
						<span>喜欢 0</span>
					</p>
				</div>				
			</div>
			<div class="article-conter">
				12123123123
			</div>	
		</div>
	</div>
</template>
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
	}
</style>