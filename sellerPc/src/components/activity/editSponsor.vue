<template>
	<div class="addSponsor">
		<div class="sponsorDilog flex_r_f_e" @click.stop="dilogHide" v-show="isDilog">
			
			<div class="dilogList flex_r_f_e" @click.stop>
				<div>
					<div class="dialog-title">请验证手机号以完成此操作</div>
					<div class="phone flex_r_s_b">
						<img src="../../assets/icon-person@2x.png" alt="">
						<input type="text" v-model="phone" readonly>
					</div>
					<div class="yzCode flex_r_s_b">
						<img src="../../assets/icon_yanzheng@2x.png" alt="">
						<input type="text" v-model="code" placeholder="请输入验证码">
						<span class="getcode pointer" v-show="show" @click="getCode">获取验证码</span>
						<span v-show="!show" class="count getcode pointer">{{count}} 秒</span>
					</div>
					<div class="codeBtn pointer" @click="addSponsor">验证</div>
				</div>
				
			</div>
		</div>
		<ul class="addSponsorList">
			<li>
				
				<div class="add_goods_title">主办方添加</div>
				
			</li>
			<li class="flex_r_f_s sponsorImgLi">
				<div class="addSponsorList_l">
					<p>主办方头像<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="addSponsorList_r">
					<div class="sponsorImg" v-show="sponsorImg!=''">
						<div class="img-box">
							<img :src="sponsorImg" alt="">
							<i class="el-icon-close pointer" @click="deleteGoodsMain()"></i>
						</div>
					</div>
					<div class="sponsorImg" v-show="sponsorImg==''">
						<el-upload class="avatar-uploader" :before-upload="function(file){return sizeReg(file,200,200)}"  :http-request="uploadIMG" ref="uploadGoodsMain" 
						action="http://192.168.0.109:8084/updateImg" :limit="1" list-type="picture" name="Img">
							<div class="upload-text flex_c_f_s">
								<i class="el-icon-plus"></i>
								<div><span>+</span>点击上传头像(200*200)</div>
							</div>
						</el-upload>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="addSponsorList_l">
					<p>主办方类型<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="addSponsorList_r">
					<div class="sponsorType">
						<el-radio v-model="isEnterprise" label="1">个人</el-radio>
						<el-radio v-model="isEnterprise" label="2">企业</el-radio>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s sponsorImgLi">
				<div class="addSponsorList_l">
					<p>主办方简称<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="addSponsorList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="sponsorAppellation" maxlength="60" placeholder="请输入主办方简称"></el-input>
						<div class="tx">（主办方简称可以是企业简称、社团组织名称等词汇，请勿使用非法如果名称中含有商标名称，可能您需要上传商标注册证书和商标授权书等文件。）</div>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s" v-if="isEnterprise=='2'">
				<div class="addSponsorList_l">
					<p>企业名称<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="addSponsorList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="enterpriseName" maxlength="60" placeholder="请输入企业名称"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s" v-else>
				<div class="addSponsorList_l">
					<p>姓名<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="addSponsorList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="realName" maxlength="60" placeholder="请输入真实姓名"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="addSponsorList_l">
					<p>手机号码<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="addSponsorList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="phone" maxlength="60" placeholder="请输入手机号码"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="addSponsorList_l">
					<p>主办方简介<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="addSponsorList_r">
					<div class="sponsorIntroduction">
						<el-input type="textarea" placeholder="请输入主办方简介" v-model="sponsorIntroduction" maxlength="100" :show-word-limit="true"></el-input>
						<div class="inputNum">{{sponsorIntroduction.length}}/100</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="save_box">
			<el-button round class="fabu_btn" @click="dilogShow">保存</el-button>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				sponsorImg:'',//主办方头像
				sponsorImgData:'',
				formData:null,//头像数据
				isEnterprise:'1',//是否是企业
				sponsorAppellation:'',//主办方简称
				enterpriseName:'',//企业名称
				realName:'',//真实姓名
				sponsorIntroduction:'',//主办方简介
				timer: null,//验证码定时器
				phone:'',//手机号码
				codePhone:JSON.parse(sessionStorage.getItem('user')).userPhone,
				code:'',//验证码
				count:'',//计算
				show:true,
				isDilog:false,
				organizerId:'',
				organizerHead:'',
				reg: /^1[3456789]\d{9}$/    //手机号码正则
			}
		},
		mounted() {
			// console.log(JSON.parse(sessionStorage.getItem('user')))
			console.log(this.$route.params.sponsorInfo);
			this.getSponsorInfo();
		},
		methods:{
			getSponsorInfo(){
				let re = this.$route.params.sponsorInfo;
				this.sponsorImg = re.organizerHead;
				this.organizerHead = re.organizerHead;
				this.isEnterprise = re.type+'';
				this.sponsorAppellation = re.organizerName;
				this.enterpriseName = re.companyName;
				this.phone = re.phone;
				this.sponsorIntroduction = re.organizerSynopsis;
				this.realName = re.name;
				this.organizerId = re.organizerId;
			},
			dilogShow(){
				let self = this;
				if(self.sponsorImg==''){
					self.$message({
						showClose: true,
						message: '请上传主办方头像',
						type: 'error',
					});
					return false;
				}else if(self.sponsorAppellation==''){
					self.$message({
						showClose: true,
						message: '请填写主办方简称',
						type: 'error',
					});
					return false;
				}else if(self.isEnterprise=='1'&&self.realName==''){
					self.$message({
						showClose: true,
						message: '请填写真实姓名',
						type: 'error',
					});
					return false;
				}else if(self.isEnterprise=='2'&&self.enterpriseName==''){
					self.$message({
						showClose: true,
						message: '请填企业名称',
						type: 'error',
					});
					return false;
				}else if (!self.reg.test(self.phone)) {
				
					self.$message({
						showClose: true,
						message: '手机号码输入错误',
						type: 'error',
					});
					return false;
				}else if(self.sponsorIntroduction==''){
					self.$message({
						showClose: true,
						message: '请填写主办方简介',
						type: 'error',
					});
					return false;
				}else{
					self.isDilog = true;
				}
				
			},
			dilogHide(){
				
				this.isDilog = false;
			},
			getCode() {
				//获取验证码
				let uId = JSON.parse(sessionStorage.getItem('user')).userId;
				let _this = this;
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					if(!this.forgetState){
						this.axios.get(Api.userApi+'/ca/sms_update_organizer?userId='+uId+'&phone='+_this.phone+'&type='+_this.isEnterprise, {
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
					}
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
			
			
			},
			uploadIMG(e) {
			  this.picavalue = e.file;
			  console.log(this.picavalue.size / 1024);
			  if (this.picavalue.size / 1024 > 10000) {
				this.$message({
				  message: "图片大小不能超过10M",
				  type: "warning"
				});
			  } else {
				this.imgPreview(e.file);
			  }
			},
			sizeReg(file,w,h) { //检测上传l图片宽高
				let _this = this;
			
				return new Promise(function(resolve, reject) {
					var reader = new FileReader();
					reader.onload = function(event) {
						var image = new Image();
						image.onload = function() {
							var width = this.width;
							var height = this.height;
							if (width < w || height<h) {
								_this.$alert('图片宽度必须大于800并且高度大于533', '提示', {
									confirmButtonText: '确定'
								});
								reject();
							}
							
							resolve();
						};
						image.src = event.target.result;
					}
					reader.readAsDataURL(file);
				});
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
			imgPreview(file) {
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
							self.sponsorImg = result;
			
							let blob = self.dataURItoBlob(data);
							self.sponsorImgData = blob;
							console.log("*******base64转blob对象******");
							console.log(blob);
							
							console.log("********将blob对象转成formData对象********");
							
							
						};
					};
				}
			},
			deleteGoodsMain() { //头像图片删除
			
				let self = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					callback: function(action, instance) {
			
						if (action == 'confirm') {
							self.$refs.uploadGoodsMain.uploadFiles.splice(0, 1);
							self.sponsorImg = '';
							self.sponsorImgData = '';
						}
					}
				})
			},
			addSponsor(){
				let self= this;
				this.axios.get(Api.userApi+'/ca/selectOrganizerInfoIsRepeat',{params:{
					userId:JSON.parse(sessionStorage.getItem('user')).userId,
					type:self.isEnterprise,
					organizerName:self.sponsorAppellation,
					phone:self.phone,
					companyName:self.enterpriseName
				}}, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code=='1'){
							if(this.code == ''){
								self.$message({
									showClose: true,
									message: '验证码不能为空',
									type: 'error',
								});
								return false;
							}else{
								if(self.isEnterprise=='1'){
									self.enterpriseName = '';
								}else{
									self.realName = '';
								}
								// alert(111)
								let formData = new FormData();
								formData.append("organizerHeadImg",self.sponsorImgData);
								formData.append("userId",JSON.parse(sessionStorage.getItem('user')).userId);
								formData.append("type",self.isEnterprise);
								formData.append("code",self.code);
								formData.append("organizerSynopsis",self.sponsorIntroduction);
								formData.append("name",self.realName);
								formData.append("phone",self.phone)
								formData.append("companyName",self.enterpriseName)
								formData.append("organizerName",self.sponsorAppellation)
								formData.append("organizerId",self.organizerId)
								
								self.axios.post(Api.userApi + '/ca/updateCommunityActivityOrganizerInfo',formData,{
									headers: {
										'Content-Type': 'multipart/form-data'
									}
								}).then((res) => {
									if (res.data.code == 1) {
										// self.activeType = res.data.data;
										self.$message({
											showClose: true,
											message: '编辑成功',
											type: 'success',
										});
										setTimeout(function(){
											self.$router.push({
												name:'sponsorManage'
											})
										},200)
									} else {
										alert(res.data.msg)
									}
								})
							}
							
						}else{
							alert(res.data.msg)
						}
					})
				
			}
		}
	}
</script>

<style lang="scss">
	
	.addSponsor{
		padding: 40px;
		.sponsorDilog{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index:1500;
			background: rgba(0,0,0,0.6);
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
		}
		.el-upload-list{
			display: none;
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
		.addSponsorList{
			li {
				padding: 15px 0;
			}
			
			li:first-child {
				padding-top: 0;
			}
			.sponsorImgLi{
				align-items: flex-start;
				p{
					padding-top: 10px;
				}
			}
			.add_goods_title {
				font-size: 18px;
				color: #FF523D;
				height: 18px;
				line-height: 18px;
				border-left: 2px solid #FF523D;
				padding-left: 6px;
			}
			.addSponsorList_l {
				width: 100px;
				
				p {
					color: #333;
					font-size:14px;
				}
			}
			.addSponsorList_r{
				.el-textarea{
					font-size: 14px;
					textarea{
						height: 100px;
					}
				}
				.goodsNameInput{
					width: 420px;
					.el-input__inner{
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
				.sponsorImg{
					.upload-text{
						width: 200px;
						height: 200px;
						border-radius: 4px;
						border: 1px solid #e8e8e8;
						box-sizing: border-box;
						align-items:center;
						justify-content: center;
						i{
							font-size: 20px;
							color: #999;
							margin-bottom: 10px;
						}
						div{
							font-size: 14px;
							color: #999;
							span{
								color: #FF523D;
							}
						}
						
					}
					.img-box{
						width: 200px;
						height: 200px;
						border-radius: 4px;
						position: relative;
						
						img{
							width:200px;
							height: 200px;
							display: block;
							border-radius: 4px;
						}
						i {
							position: absolute;
							top: -5px;
							right: -5px;
							background: rgba(0, 0, 0, 0.5);
							color: #fff;
							border-radius: 50%;
							z-index: 100;
						}
					}
				}
				.sponsorName{
					width: 420px;
					.tx{
						font-size: 14px;
						color: #999;
						line-height: 24px;
					}
				}
				.sponsorIntroduction{
					width: 600px;
					.inputNum{
						font-size: 14px;
						color: #999;
						padding-top: 5px;
						padding-left: 5px;
					}
				}
			}
		}
	}
</style>
