<template>
	<div class="realUser">
		<div class="sponsorDilog flex_r_f_e" @click.stop="dilogHide" v-show="isDilog">
			
			<div class="dilogList flex_r_f_e" @click.stop>
				<div>
					<div class="dialog-title">请验证手机号以完成此操作</div>
					<div class="phone flex_r_s_b">
						<img src="../../assets/icon-person@2x.png" alt="">
						<input type="text" v-model="phone">
					</div>
					<div class="yzCode flex_r_s_b">
						<img src="../../assets/icon_yanzheng@2x.png" alt="">
						<input type="text" v-model="code" placeholder="请输入验证码">
						<span class="getcode pointer" v-show="show" @click="getCode">获取验证码</span>
						<span v-show="!show" class="count getcode pointer">{{count}} 秒</span>
					</div>
					<div class="codeBtn pointer" @click="commit">验证</div>
				</div>
				
			</div>
		</div>
		<ul class="realNameList">
			<li>
				<div class="add_goods_title">主办方实名认证</div>
			</li>
			<li class="flex_r_f_s">
				<div class="realNameList_l">
					<p>认证者姓名<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="userName" maxlength="60" placeholder="请输入姓名"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="realNameList_l">
					<p>身份证号码<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="idCard" maxlength="60" placeholder="请输入身份证号"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s sponsorImgLi">
				<div class="realNameList_l">
					<p>法人或运营者身份证照片<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
						<div class="store_img">
						<div class="outside flex_r_s_b">
							<div class="outside_img" v-if="imgData.sfzz">
								<img :src="imgData.sfzz">
								<i @click="deleteImg($refs.uploadSfzz.uploadFiles,'sfzz')" class="el-icon-circle-close"></i>
							</div>
							<div v-show="!imgData.sfzz">
								<el-upload ref="uploadSfzz"  :http-request="function(file){return uploadIMG(file,'sfzz','sfzzObj')}" class="avatar-uploader" 
								action="http://192.168.0.109:8084/updateImg" list-type="picture-card" name="Img" :limit="1" :before-upload="beforeAvatarUpload">
									<i class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								
							</div>
							<div class="mid">
								<h3>法人身份证正面照片</h3>
								<p>需要清晰展示人物五官、身份证文字信息和国徽</p>
							</div>
							<div class="eg">
								<img src="../../assets/condition/shili04.png" alt="">
							</div>
						</div>
						<div class="outside inside flex_r_s_b">
							<div class="outside_img" v-if="imgData.sfzf">
								<img :src="imgData.sfzf">
								<i @click="deleteImg($refs.uploadSfzf.uploadFiles,'sfzf')" class="el-icon-circle-close"></i>
							</div>
							<div v-show="!imgData.sfzf">
								<el-upload ref="uploadSfzf" :http-request="function(file){return uploadIMG(file,'sfzf','sfzfObj')}"  class="avatar-uploader" action="http://192.168.0.109:8084/updateImg"
								 list-type="picture-card" :limit="1" name='Img' :before-upload="beforeAvatarUpload">
									<i class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<!-- <el-progress v-if="imgData.sfzfP>0" :percentage="imgData.sfzfP"></el-progress> -->
							</div>
							<div class="mid">
								<h3>法人身份证反面照片</h3>
								<p>需要清晰展示人物五官、身份证文字信息和国徽</p>
							</div>
							<div class="eg">
								<img src="../../assets/condition/shili07.png" alt="">
							</div>
						</div>
					</div>
				</div>
			</li>
			
		</ul>
		<div class="save_box">
			<el-button round class="fabu_btn" @click="dilogShow">立即认证</el-button>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				idCard:'',//身份证号码
				userName:'',//认证者姓名
				imgData: {
					sfzz: '',//身份证正面
					sfzf: '',//身份证反面
				},
				sfzzObj:{
					picData:'',
					picName:'',
				},
				sfzfObj:{
					picData:'',
					picName:'',
				},
				organizerId:'',
				formData:new FormData(),
				code:'',//验证码
				count:'',//计算
				show:true,
				isDilog:false,
				timer: null,//验证码定时器
				phone:JSON.parse(sessionStorage.getItem('user')).userPhone,//手机号码
				reg: /^1[3456789]\d{9}$/,//手机号码正则
				idcardReg : /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				
			}
		},
		mounted() {
			this.organizerId = this.$route.query.organizerId;
			this.$store.commit('initialNav', {
				navNum: 6,
				subNum: 2,
				subData: [{
					subNavName: '发布活动',
					subIcon: require('../../assets/home/icon_home1.png'),
					link: 'publishActivity'
				}, {
					subNavName: '主办方管理',
					subIcon: require('../../assets/home/icon_home2.png'),
					link: 'sponsorManage'
				}, {
					subNavName: '认证',
					subIcon: require('../../assets/home/icon_home5.png'),
					link: 'realName'
				}]
			});
		},
		methods:{
			beforeAvatarUpload(file) {
				
			},
			getCode() {
				//获取验证码
				let uId = JSON.parse(sessionStorage.getItem('user')).userId;
				let _this = this;
				const TIME_COUNT = 60;
				if(!this.reg.test(_this.phone)){
					_this.$message({
						showClose: true,
						message: '手机号码格式错误',
						type: 'error',
					});
					return false;
				}else{
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.axios.get(Api.userApi+'/ca/sms_approve_organizer?userId='+uId+'&phone='+_this.phone, {
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									}
								}).then(function(res) {
									if(res.data.code == '0'){
										this.show = true;
										clearInterval(this.timer);
										this.timer = null;
									}
								}).catch(function(error) {
									console.log(error);
								});
						
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--;
							} else {
								this.show = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
				}
				
			},
			uploadIMG(e,imgUrl,fData) {
			  // this.picavalue = e.file;
			  // console.log(this.picavalue.size / 1024);
			  if (e.file.size / 1024 > 10000) {
				this.$message({
				  message: "图片大小不能超过10M",
				  type: "warning"
				});
			  } else {
				this.imgPreview(e.file,imgUrl,fData);
			  }
			},
			deleteImg(arr,img,imgName) { //照片删除
				let self = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					callback: function(action, instance) {
						if (action == 'confirm') {
								
							arr.splice(0,1);
							self.imgData[img] = '';
						}
					}
				})
			},
			// 压缩图片
			compress(file,img) {
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext("2d");
				let initSize = img.src.length;
				let width = img.width;
				let height = img.height;
				canvas.width = width;
				canvas.height = height;
				// 铺底色
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, width, height);
			
				//进行最小压缩
				let ndata = canvas.toDataURL('image/jpeg',0.7);
				// console.log("*******压缩后的图片大小*******");
				// console.log(ndata)
				// console.log(ndata.length);
				return ndata;
			},
			// base64转成bolb对象
			dataURItoBlob(base64Data) {
				var byteString;
				if (base64Data.split(",")[0].indexOf("base64") >= 0)
					byteString = atob(base64Data.split(",")[1]);
				else byteString = unescape(base64Data.split(",")[1]);
				var mimeString = base64Data
					.split(",")[0]
					.split(":")[1]
					.split(";")[0];
				var ia = new Uint8Array(byteString.length);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				return new Blob([ia], {
					type: mimeString
				});
			},
			//获取图片
			imgPreview(file,imgUrl,fData) {
				let self = this;
				//判断支不支持FileReader
				if (!file || !window.FileReader) return;
				if (/^image/.test(file.type)) {
					//创建一个reader
					let reader = new FileReader();
					
					//将图片转成base64格式
					reader.readAsDataURL(file);
					//读取成功后的回调
					reader.onloadend = function() {
						let result = this.result;
						let img = new Image();
						img.src = result;
						console.log("********未压缩前的图片大小********");
						console.log(result.length);
						
						img.onload = function() {
							let data = self.compress(file,img);
							// self.postUrl = result;
							self.imgData[imgUrl] = result;
							let blob = self.dataURItoBlob(data);
							self[fData].picData = blob;
							self[fData].picName = file.name;
							
							console.log("*******base64转blob对象******");
							console.log(blob);
							// self.formData.append(fData,blob,file.name);
							console.log("********将blob对象转成formData对象********");
							// console.log(self.formData)
							
						};
					};
				}
			},
			
			dilogHide(){
				
				this.isDilog = false;
			},
			dilogShow(){
				let self= this;
				if(this.userName==''){
					self.$message({
						showClose: true,
						message: '请填写真实姓名',
						type: 'error',
					});
					return false;
				}else if(!this.idcardReg.test(self.idCard)){
					self.$message({
						showClose: true,
						message: '身份证格式错误',
						type: 'error',
					});
					return false;
				}else if(this.imgData.sfzz==''){
					self.$message({
						showClose: true,
						message: '请上传身份证正面照',
						type: 'error',
					});
					return false;
				}else if(this.imgData.sfzf==''){
					self.$message({
						showClose: true,
						message: '请上传身份证背面照',
						type: 'error',
					});
					return false;
				}else{
					this.axios.get(Api.userApi+'/ca/selectOrganizerApproveInfoIsRepeat',{params:{
						type:'1',
						IDCardNumber:self.idCard,
						companyName:''
					}}, {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
					}).then((res)=>{
						if(res.data.code =='1'){
							self.isDilog = true;
							
						}else{
							alert(res.data.msg)
						}
					})
				}
				
			},
			commit(){
				let self = this;
				if(this.phone==''){
					self.$message({
						showClose: true,
						message: '请填写手机号',
						type: 'error',
					});
					return false;
				}else if(this.code ==''){
					self.$message({
						showClose: true,
						message: '请填写验证码',
						type: 'error',
					});
					return false;
				}else{
					let formData = new FormData();
					formData.append('IDCardFrontImg',self.sfzzObj.picData,self.sfzzObj.picName)
					formData.append('IDCardBackImg',self.sfzfObj.picData,self.sfzfObj.picName)
					formData.append('organizerId',self.organizerId)
					formData.append('code',self.code)
					formData.append('userId',JSON.parse(sessionStorage.getItem('user')).userId)
					formData.append('type','1')
					formData.append('IDCardNumber',self.idCard)
					// self.formData.append('IDCardFrontImg',self.imgData.sfzz)
					// self.formData.append('IDCardBackImg',self.imgData.sfzf)
					formData.append('name',self.userName)
					formData.append('phone',self.phone)
					
					self.axios.post(Api.userApi+'/ca/updateCommunityActivityOrganizer',formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							self.$message({
								showClose: true,
								message: '认证审核中',
								type: 'success',
							});
							self.$router.push({
								name:'sponsorManage'
							})
						}else{
							alert(res.data.msg)
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.realUser {
		padding: 40px;
		.sponsorDilog{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index:1500;
			background: rgba(0,0,0,0.6);
		}
		.dilogList{
			width: 400px;
			background: #fff;
			height: 300px;
			border-radius: 4px;
			.dialog-title{
				font-size: 14px;
				color: #999;
				width: 260px;
				padding-bottom: 30px;
				text-align: center;
			}
			.phone{
				width: 260px;
				height: 30px;
				border-radius: 20px;
				background: #f2f2f2;
				box-sizing: border-box;
				padding: 0 10px;
				input{
					outline: none;
					width: 220px;
					height: 30px;
					background: #f2f2f2;
					font-size: #333;
				}
				img{
					width: 16px;
				}
			}
			.yzCode{
				width: 260px;
				height: 30px;
				border-radius: 20px;
				background: #f2f2f2;
				box-sizing: border-box;
				padding: 0 10px;
				margin: 50px 0;
				input{
					outline: none;
					width: 142px;
					height: 30px;
					background: #f2f2f2;
					font-size: #333;
				}
				img{
					width: 16px;
				}
				.getcode{
					width: 70px;
					height: 20px;
					background: #ff523d;
					border-radius: 10px;
					font-size: 12px;
					color: #fff;
					line-height: 20px;
					text-align: center;
				}
			}
			.codeBtn{
				width: 260px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border-radius: 20px;
				font-size: 14px;
				color: #fff;
				background: #ff523d;
			}
		}
		.save_box {
			margin-top: 68px;
		
			.el-button {
				height: 40px;
				padding: 0;
				line-height: 40px;
				width: 300px;
				color: #fff;
				font-size: 16px;
			}
		
			.fabu_btn {
				background: #FF523D;
				margin: 0 auto;
				display: block;
			}
		}
		.realNameList {
			.sponsorImgLi{
				align-items: flex-start;
				p{
					padding-top: 10px;
				}
			}
			li {
				padding: 15px 0;
			}

			li:first-child {
				padding-top: 0;
			}

			.add_goods_title {
				font-size: 18px;
				color: #FF523D;
				height: 18px;
				line-height: 18px;
				border-left: 2px solid #FF523D;
				padding-left: 6px;
			}

			.realNameList_l {
				width: 224px;

				p {
					color: #333;
					font-size: 14px;
				}
			}

			.realNameList_r {
				.el-textarea {
					font-size: 14px;

					textarea {
						height: 100px;
					}
				}

				.goodsNameInput {
					width: 420px;

					.el-input__inner {
						height: 32px;
						line-height: 32px;
						font-size: 14px;
					}
				}

				.el-radio {
					line-height: 32px;
				}

				.el-radio__input.is-checked+.el-radio__label {
					color: #333;
				}

				.el-radio__input.is-checked .el-radio__inner {
					border-color: #ff523d;
					background: #ff523d;
				}

				.el-radio__inner:hover {
					border-color: #ff523d;
				}
				.store_img {
					width: 620px;
					border: 1px solid rgba(221, 221, 221, 1);
					border-radius: 6px;
				
					.avatar-uploader-icon {
						font-size: 28px;
						color: #8c939d;
						width: 110px;
						height: 110px;
						line-height: 110px;
						text-align: center;
					}
				
					.el-upload--picture-card {
						height: 110px;
						width: 110px;
						line-height: 110px;
					}
				
					.outside_img {
						height: 110px;
						width: 110px;
						position: relative;
						font-size: 0;
				
						img {
							height: 110px;
							width: 110px;
				
						}
				
						.el-icon-circle-close {
							position: absolute;
							right: -5px;
							top: -5px;
							font-size: 18px;
							cursor: pointer;
							color: gray;
						}
					}
				
					.avatar-uploader-icon {
						font-size: 28px;
						color: #8c939d;
						width: 110px;
						height: 110px;
						line-height: 110px;
						text-align: center;
					}
				
					.avatar {
						width: 110px;
						height: 110px;
						display: block;
					}
				
					.avatar-uploader .el-upload {
						border: 1px dashed #d9d9d9;
						border-radius: 6px;
						cursor: pointer;
						position: relative;
						overflow: hidden;
					}
				
					.avatar-uploader .el-upload:hover {
						border-color: #409EFF;
					}
				
					.inside {
						border-top: 1px solid #ddd;
					}
				
					.outside {
						padding: 10px;
						box-sizing: border-box;
						align-items: flex-start;
				
						.mid {
							width: 270px;
				
							h3 {
								font-size: 16px;
								color: #333;
								margin-top: 5px;
							}
				
							p {
								color: #666;
								font-size: 14px;
								line-height: 24px;
								margin-top: 5px;
							}
						}
				
						.eg {
							img {
								width: 180px;
								height: 110px;
							}
						}
					}
				}
			}
		}
	}
</style>
