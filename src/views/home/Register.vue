<template>
	<div id="login">
		<div class="login-box">
			<div class="slogn">
				<span>创作----注册</span>
			</div>
			<div class="input-box">
				<i class="iconfont icon-yonghu-"></i>
				<input v-model="form.username" type="" name="" placeholder="请输入昵称">
			</div>
			<div class="input-box">
				<i class="iconfont icon-mimasuo"></i>
				<input v-model="form.password" type="password" name="" placeholder="请输入密码">
			</div>
			<div class="input-box">
				<i class="iconfont icon-mimasuo"></i>
				<input v-model="form.repeat" type="password" name="" placeholder="请再次输入密码">
			</div>
			<div class="btn" @click="registerBtn(form)">注册</div>
		</div>
	</div>
</template>
<script>
import userServe from '@/server/user';		
export default {
	name: 'login',
	data () {
		return {
			form: {
				username: null,
				password: null,
				repeat: null,
			}
		}
	},
	computed: {
		activeRoute () {
			return this.$route.path.replace('/','')
		},
	},
    methods: {
    	registerBtn (data) {
    		if(!data.username){
    			this.open('请输入用户名', 'error');
    			return;
    		}
    		if(!data.password){
    			this.open('请输入密码', 'error');
    			return;
    		}
    		if(!data.repeat){
    			this.open('请再次输入密码', 'error');
    			return;
    		}
    		if(data.password != data.repeat){
    			this.open('俩次输入的密码不相等', 'error');
    			return;
    		}
    		userServe.register(data).then(res => {
    			console.log(res.data.data);
    		});   		
    	},
    }	
}	
</script>
<style lang="scss">
	#login{
		width: 100%;
		height: 100%;
		background: url('./../../assets/img/bgcover.png') no-repeat center;
		background-size: cover;
		.login-box{
			width: 430px;
			height: 468px;
			background: rgba(255,255,255,0.8);
			position: absolute;
			top: 20%;
			left: 50%;
			box-sizing: border-box;
			padding: 50px;
			.slogn{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 50px;
				.logo{
					width: 40px;
					height: 40px;
				}
				span{
					margin-left: 10px;
					font-size: 20px;
					color: #F84F47;
					font-weight: bold;
				}				
			}
			.input-box{
				width: 100%;
				height: 40px;
				border: 1px solid #999;
				display: flex;
				box-sizing: border-box;
				padding:  0 10px;
				justify-content: center;
				align-items: center;
				margin-bottom: 30px;
				i{
					font-size: 20px;
					color: #666;
				}
				input{
					width: 100%;
					height: 38px;
					margin-left: 10px;
					border: 0;
					background: 0;
					outline: none;
					box-sizing: border-box;
				}				
			}
			.btn{
				width: 100%;
				height: 40px;
				text-align: center;
				line-height: 40px;
				color: #fff;
				background: #fd4c5b;
				cursor: pointer;
			}

		}
	}
</style>