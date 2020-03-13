<template>
	<div id="info">
		<el-form label-width="200px" :label-position="'left'" :model="form">
		<el-form-item label="昵称">
			<span>{{form.username}}</span>
		</el-form-item>
		<el-form-item label="头像">
			<div class="avater-box">
				<img class="avater" :src="form.avater ? form.avater : require('@/assets/img/icon.png') "/>
				<div class="update-avater">
					<input type="file" ref="upfile" class="file-update" @change="upfile" accept="image/png,image/jpeg,image/jpg" />
					<i class="el-icon-edit"></i>
				</div>					
			</div>	
		</el-form-item>
		<el-form-item label="性别">
			<el-radio-group v-model="form.sex">
			<el-radio :label="0">保密</el-radio>
			<el-radio :label="1">男</el-radio>
			<el-radio :label="2">女</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="个人简介">
			<el-input type="textarea" v-model="form.d"></el-input>
		</el-form-item>
		<el-form-item label="操作">
			<el-button type="primary" @click="submit">提交</el-button>
		</el-form-item>
		</el-form>
		
 		<!-- vueCropper 剪裁图片实现-->
		<el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
			<div class="cropper-content">
				<div class="cropper" style="text-align:center">
				<vueCropper
					ref="cropper"
					:img="option.img"
					:outputSize="option.size"
					:outputType="option.outputType"
					:info="true"
					:full="option.full"
					:canMove="option.canMove"
					:canMoveBox="option.canMoveBox"
					:original="option.original"
					:autoCrop="option.autoCrop"
					:fixed="option.fixed"
					:fixedNumber="option.fixedNumber"
					:centerBox="option.centerBox"
					:infoTrue="option.infoTrue"
					:fixedBox="option.fixedBox"
					@realTime="realTime"
				></vueCropper>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="finish">确认</el-button>
			</div>
		</el-dialog>						
	</div>
</template>
<script>
import * as qiniu from 'qiniu-js';
import qiniuServe from '@/server/qiniu'
import userServe from '@/server/user';	
export default {
	name: 'login',
	data () {
		return {
			form: {},
			qiniuToken: '',
			dialogVisible: false,
			option: {
				img: '', // 裁剪图片的地址
				info: true, // 裁剪框的大小信息
				outputSize: 0.8, // 裁剪生成图片的质量
				outputType: 'jpeg', // 裁剪生成图片的格式
				canScale: false, // 图片是否允许滚轮缩放
				autoCrop: true, // 是否默认生成截图框
				autoCropWidth: 100, // 默认生成截图框宽度
				autoCropHeight: 100, // 默认生成截图框高度
				fixedBox: true, // 固定截图框大小 不允许改变
				fixed: true, // 是否开启截图框宽高固定比例
				fixedNumber: [1, 1], // 截图框的宽高比例
				full: true, // 是否输出原图比例的截图
				canMoveBox: false, // 截图框能否拖动
				original: false, // 上传图片按照原始比例渲染
				centerBox: false, // 截图框是否被限制在图片里面
				infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
			},
			token: localStorage.token || '',			
		}
	},	
	mounted () {
		this.getToken();
		this.getUse(this.token);
	},
    methods: {
		getUse (token) {
			userServe.getUse({uid: token}).then(res=>{
				if(res.code == 200){
					this.form = res.data;
				}
			});
		},
		realTime () {},
		finish () {
			this.$refs.cropper.getCropBlob((data)=>{
				const name = 'avater'+ this.timeInit().getTime;
				const putExtra = {
					fname: "",
					params: {},
					mimeType: ["image/png","image/jpeg","image/jpg","image/gif"]
				};
				const config = {
					useCdnDomain: true,
					region: null
				};
				const observable = qiniu.upload(data, name, this.qiniuToken, putExtra, config);
				const $this = this;
				const subscription = observable.subscribe(next=>{
					// 获取详情
					console.log(next); 
				}, error=>{
					// 错误处理
					console.log(error);
				}, complete=>{
					$this.form.avater = 'http://pito.nvmjs.com/'+complete.key;
					$this.dialogVisible = false;
				})				
			});
		},
		upfile () {
			let file = this.$refs.upfile.files[0];
			this.option.img = this.getObjectUrl(file);
			this.dialogVisible = true;
		},
		getObjectUrl(file) {
			let url = null;
			if (window.createObjectURL != undefined) {
				// basic
				url = window.createObjectURL(file);
			} else if (window.webkitURL != undefined) {
				// webkit or chrome
				url = window.webkitURL.createObjectURL(file);
			} else if (window.URL != undefined) {
				// mozilla(firefox)
				url = window.URL.createObjectURL(file);
			}
			return url;		
		},
		submit () {
			this.form.uid = localStorage.token;
			userServe.userInfo(this.form).then(res=>{
				if(res.code == 200){
					localStorage.avater = res.data.avater;
					this.$message({type: 'success', message: '修改个人信息成功'});
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
<style lang="scss">
	#info {
		width: 800px;
		min-height: calc(100% - 10px);
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 40px 100px;
		margin: 10px auto 0;
		background: #fff;
		.avater{
			width: 80px;
			height: 80px;
			border: 1px solid #ddd;
		}
		.avater-box{
			display: flex;
			align-items:flex-end;
			.update-avater{
				font-size: 30px;
				cursor: pointer;
				margin-left: 10px;
				color: #0097A7;
				position: relative;
				.file-update{
					width: 30px;
					height: 30px;
					position: absolute;
					top: 0;
					left: 0;
					cursor: pointer;
					opacity:0;
				}
			}
		}
	}

	// 截图
	.cropper-content {
		.cropper {
			width: auto;
			height: 300px;
		}
	}
</style>