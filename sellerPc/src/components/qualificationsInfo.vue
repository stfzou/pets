<template>
	<div class="main-cnt">
		<ul class="nav flex_r_f_s">
			<li class="active">
				<img class="success" src="../assets/condition/icon_02.png" alt="">
				商家信息
			</li>
			<li>
				<img src="../assets/condition/icon_01a.png" alt="">
			</li>
			<li class="active">
				<span>②</span>
				资质信息
			</li>
			<li>
				<img src="../assets/condition/icon_01.png" alt="">
			</li>
			<li>
			
				<span >③</span>
				店铺信息提交成功
			</li>
		</ul>
		<div class="view_warpper">
			<div class="qualications">
				<ul class="qualications_list">
					<li>
						<div class="title">法定代表身份信息</div>
					</li>
					
					<li>
						<p>真实姓名<span>*</span></p>
						<div class="list_r">
							<input v-model="inputData.userNameVal" type="text" value="" placeholder="请输入真实号码" />
						</div>
					</li>
					<li>
						<p>证件号码<span>*</span></p>
						<div class="list_r">
							<input v-model="inputData.sfzVal" type="text" value="" placeholder="请输证件号码" />
						</div>
					</li>
					<li>
						<p>证件照片<span>*</span></p>
						<div class="list_r">
							<div class="store_img">
								<div class="outside flex_r_s_b">
									<div class="outside_img" v-if="imgData.sfzz">
										<img :src="imgData.sfzz">
										<i @click="deleteImg($refs.uploadSfzz.uploadFiles,'sfzz')" class="el-icon-circle-close"></i>
									</div>
									<div v-show="!imgData.sfzz">
											<el-upload
												ref="uploadSfzz"
												class="avatar-uploader"
												action="http://192.168.0.109:8084/updateImg"
												:show-file-list="false"
												list-type="picture-card"
												name="Img"
												:limit="1"
												:on-progress="handleSfzzPreview"
												:on-success="handleSfzzSuccess">
												<i class="el-icon-plus avatar-uploader-icon"></i>
											</el-upload>
											<el-progress v-if="imgData.sfzzP>0" :percentage="imgData.sfzzP"></el-progress>
									</div>
									<div class="mid">
										<h3>法人身份证正面照片</h3>
										<p>需要清晰展示人物五官、身份证文字信息和国徽</p>
									</div>
									<div class="eg">
										<img src="../assets/condition/shili04.png" alt="">
									</div>
								</div>
								<div class="outside inside flex_r_s_b">
									<div class="outside_img" v-if="imgData.sfzf">
										<img :src="imgData.sfzf">
										<i @click="deleteImg($refs.uploadSfzf.uploadFiles,'sfzf')" class="el-icon-circle-close"></i>
									</div>
									<div v-show="!imgData.sfzf">
											<el-upload
												ref="uploadSfzf"
												class="avatar-uploader"
												action="http://192.168.0.109:8084/updateImg"
												:show-file-list="false"
												list-type="picture-card"
												:limit="1"
												name='Img'
												:on-progress="handleSfzfPreview"
												:on-success="handleSfzfSuccess">
												<i class="el-icon-plus avatar-uploader-icon"></i>
											</el-upload>
											<el-progress v-if="imgData.sfzfP>0" :percentage="imgData.sfzfP"></el-progress>
									</div>
									<div class="mid">
										<h3>法人身份证反面照片</h3>
										<p>需要清晰展示人物五官、身份证文字信息和国徽</p>
									</div>
									<div class="eg">
										<img src="../assets/condition/shili07.png" alt="">
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="title">主体经营信息</div>
					</li>
					<li>
						<p>营业执照<span>*</span></p>
						<div class="list_r">
							<div class="store_img">
								<div class="outside flex_r_s_b">
									<div class="outside_img" v-if="imgData.yyzz">
										<img :src="imgData.yyzz">
										<i @click="deleteImg($refs.uploadYyzz.uploadFiles,'yyzz')" class="el-icon-circle-close"></i>
									</div>
									<div v-show="!imgData.yyzz">
											<el-upload
												ref="uploadYyzz"
												class="avatar-uploader"
												action="http://192.168.0.109:8084/updateImg"
												:show-file-list="false"
												list-type="picture-card"
												:limit="1"
												name="Img"
												:on-progress="handleYyzzPreview"
												:on-success="handleYyzzSuccess">
												<i class="el-icon-plus avatar-uploader-icon"></i>
											</el-upload>
											<el-progress v-if="imgData.yyzzP>0" :percentage="imgData.yyzzP"></el-progress>
									</div>
									<div class="mid">
										<h3>营业执照</h3>
										<p>需上传清晰三证合一后的营业执照，边框完整；拍复印件需加盖鲜章；二维码能够识别</p>
									</div>
									<div class="eg">
										<img src="../assets/condition/shili05.png" alt="">
									</div>
								</div>
								
							</div>
						</div>
					</li>
					<li>
						<p>注册号<span>*</span></p>
						<div class="list_r">
							<input v-model="inputData.zcCodeVal" type="text" value="" placeholder="请输入注册号" />
						</div>
					</li>
					<li>
						<p>单位名称<span>*</span></p>
						<div class="list_r">
							<input type="text" value="" placeholder="请输入单位名称" />
						</div>
					</li>
					<li>
						<div class="title">行业资质信息<span>(如:动物诊疗许可证，仅医疗单位提供)</span></div>
					</li>
					<li>
						<p>资质照片<span>*</span></p>
						<div class="list_r">
							<div class="store_img">
								<div class="outside flex_r_s_b">
									<div class="outside_img" v-if="imgData.zlz">
										<img :src="imgData.zlz">
										<i @click="deleteImg($refs.uploadZlz.uploadFiles,'zlz')" class="el-icon-circle-close"></i>
									</div>
									<div v-show="!imgData.zlz">
											<el-upload
												ref="uploadZlz"
												class="avatar-uploader"
												action="http://192.168.0.109:8084/updateImg"
												:show-file-list="false"
												list-type="picture-card"
												 name="Img"
												:limit="1"
												:on-progress="handleSZlzPreview"
												:on-success="handleZlzSuccess">
												<i class="el-icon-plus avatar-uploader-icon"></i>
											</el-upload>
											<el-progress v-if="imgData.zlzP>0" :percentage="imgData.zlzP"></el-progress>
									</div>
									
									<div class="mid">
										<h3>动物诊疗许可证</h3>
										<p>仅医疗单位上传，例如宠物医院；上传有效期内的彩色动物诊疗许可证，复印件需加盖鲜章</p>
									</div>
									<div class="eg">
										<img src="../assets/condition/shili06.png" alt="">
									</div>
								</div>
								
							</div>
						</div>
					</li>
					<li>
						<p>许可证编号<span>*</span></p>
						<div class="list_r">
							<input v-model="inputData.identifierVal" type="text" value="" placeholder="请输入许可证编号" />
						</div>
					</li>
					<li>
						<p>诊疗活动范围<span>*</span></p>
						<div class="list_r">
							<el-input
								
								class="textarea"
								type="textarea"
								resize="none"
								placeholder="请输入内容"
								v-model="activeFw">
							</el-input>
						</div>
					</li>
					<li>
						<p>有效期<span>*</span></p>
						<div class="list_r">
							<!-- <el-date-picker
								v-model="yxDate"
								type="date"
								placeholder="选择日期">
							</el-date-picker> -->
							<el-date-picker
							  class="yxdate"
							  v-model="yxDate"
							  type="daterange"
							  range-separator="至"
							  start-placeholder="开始日期"
							  end-placeholder="结束日期">
							</el-date-picker>
							<el-checkbox v-model="checked">长期</el-checkbox>
						</div>
					</li>
				</ul>
				<div class="pointer next_btn" @click="next">提交进入下一步</div>
			</div>
		</div>
	</div> 
	
</template>

<script>
	export default {
		data() {
			return {
				activeFw:'',
				yxDate:'',
				checked:'',
				imgData:{sfzz:'',sfzzP:0,sfzzId:'',sfzf:'',sfzfP:0,sfzfId:'',yyzz:'',yyzzP:0,yyzzId:'',zlz:'',zlzP:0,zlzId:''},
				inputData:{
					userNameVal:'',
					sfzVal:'',
					zcCodeVal:'',
					danweiVal:'',
					identifierVal:''
				},
				regId:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			};
		},
		methods: {
			handleSfzzSuccess(res,file,fileList) { //身份证正面上传
				
				this.imgData.sfzz = file.response.data.imgAddr;
				this.imgData.sfzzId = file.response.data.imgId;
				this.imgData.sfzzP = 0;
			},
			handleSfzfSuccess(res,file,fileList) {//身份证反面上传
				this.imgData.sfzf = file.response.data.imgAddr;
				this.imgData.sfzfId = file.response.data.imgId;
				this.imgData.sfzfP = 0;
			},
			handleYyzzSuccess(res,file,fileList) {//营业执照上传
				this.imgData.yyzz = file.response.data.imgAddr;
				this.imgData.yyzzId = file.response.data.imgId;
				this.imgData.yyzzP = 0;
			},
			handleZlzSuccess(res,file,fileList) {//动物诊疗许可证上传
				this.imgData.zlz =  file.response.data.imgAddr;
				this.imgData.zlzId = file.response.data.imgId;
				this.imgData.zlzP = 0;
			},
			handleSfzzPreview(file){ //上传时百分比钩子
				
				this.imgData.sfzzP = file.percent;
				console.log(this.imgData.sfzzP)
			},
			handleSfzfPreview(file){ //上传时百分比钩子
				
				this.imgData.sfzfP = file.percent;
			},
			handleYyzzPreview(file){ //上传时百分比钩子
				
				this.imgData.yyzzP = file.percent;
			},
			handleSZlzPreview(file){ //上传时百分比钩子
				
				this.imgData.zlzP = file.percent;
			},
			deleteImg(arr,img){ //照片删除
				let self = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						callback:function(action, instance){
							if(action == 'confirm'){
								self.axios.post('/deleteImg', self.qs.stringify({
									imgAddr: self.imgData[img],
								}), {
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									}
								}).then(function(res){
									if(res.data.code == 1){
										arr.splice(0, 1);
										self.imgData[img] = '';
									}else{
										self.$message({
											showClose: true,
											message:res.data.msg,
											type: 'error',
										});
									}
								
								}).catch(function(res){
										self.$message({
											showClose: true,
											message:'服务器错误',
											type: 'error',
										});
								})
								
							}
						}
				})
			},
			next(){
				console.log(this.yxDate);
				return false
				this.$store.commit("aptitudeInfoSuccess");
				this.$router.push({name:'storeSuccess'})
				if(this.inputData.userNameVal == ''){
					
					this.$message.error('真实姓名不能为空');
					return false;
					
				}else if(this.inputData.sfzVal == ''){
					
					this.$message.error('身份证号不能为空');
					return false;
					
				}else if(!this.regId.test(this.inputData.sfzVal)){
					
					this.$message.error('身份证号格式错误');
					return false;
					
				}else if(this.imgData.sfzz == ''){
					
					this.$message.error('请上传身份证正面照片');
					return false;
					
				}else if(this.imgData.sfzf == ''){
					
					this.$message.error('请上传身份证反面照片');
					return false;
					
				}else if(this.imgData.yyzz == ''){
					
					this.$message.error('请上传营业执照照片');
					return false;
					
				}else if(this.imgData.zlz == ''){
					
					this.$message.error('请上传诊疗证');
					return false;
					
				}else if(this.activeFw == ''){
					
					this.$message.error('请上输入诊疗活动范围');
					return false;
				}else if(this.yxDate == ''|| this.checked == ''){
					
					this.$message.error('请选择有效日期');
					return false;
				}
				
			}
		},
	}
</script>

<style lang="scss">
	.main-cnt{
		width: 1200px;
		margin: 20px auto 0 auto;
		background: #fff;
		padding: 0 20px;
		padding-bottom: 54px;
		box-sizing: border-box;
		box-shadow: 0px 0px 10px 5px #ffe9e6;
		padding-top: 60px;
		.nav{
			width: 1000px;
			height: 60px;
			border-radius:30px;
			box-shadow: 0px 0px 10px 5px #ffe9e6;
			margin:0 auto;
			box-sizing: border-box;
			justify-content:space-around;
			li{
				font-size: 20px;
				font-weight:400;
				display: flex;
				span{
					margin-right: 12px;
				}
			}
			.active{
				color: #FF523D;
				display: flex;
				.success{
					width: 18px;
					height: 18px;
					margin-right: 12px;
				}
			}
		}
	}
	.qualications{
		margin-top: 28px;
		.next_btn{
			width:300px;
			height:38px;
			line-height:38px;
			text-align: center;
			margin: 0 auto;
			color: #fff;
			margin-top: 60px;
			background:rgba(255,82,61,1);
			box-shadow:0px 6px 8px 0px rgba(255,82,61,0.16);
			border-radius:19px;
		}
		.qualications_list{
			padding-left: 165px;
			margin-top:60px;
			.title{
				height: 20px;
				line-height: 20px;
				padding: 0 0 0 5px;
				border-left: 2px solid #ff523d;
				color:#ff523d ;
				font-size: 18px;
			}
			li{
				overflow: hidden;
				margin-top: 28px;
				&>p{
					font-size: 18px;
					color: #333;
					line-height: 32px;
					height: 32px;
					float: left;
					width: 115px;
					span{
						color: #FF523D;
					}
				}
				.list_r{
					float: left;
					position: relative;
					margin-left: 24px;
					
					.el-input__inner{
						height: 32px;
						line-height: 32px;
						border-color: #ddd;
						color: #333;
					}
					.el-input__icon{
						line-height: 32px;
					}
					.el-checkbox{
						margin-left: 5px;
						.el-checkbox__inner:hover{
							border-color: #ff523d;
						}
						.el-checkbox__inner{
							border-radius: 50%;
							border-color: #ff523d;
						}
						.el-checkbox__input.is-checked .el-checkbox__inner{
							background-color: #ff523d;
							border-color: #ff523d;
						}
						.el-checkbox__label{
							color:#666 ;
							padding-left: 5px;
						}
					}
					
					&>input{
						line-height: 32px;
						color: #333;
						font-size: 16px;
						width: 280px;
						outline: none;
						border:1px solid rgba(221,221,221,1);
						border-radius:6px;
						padding-left: 20px;
						box-sizing: border-box;
					}
					.textarea{
						textarea{
							width: 616px;
							height: 62px;
							outline: none;
							color: #333;
							font-size: 16px;
							border-color: #ddd;
						}
						
					}
					
					.store_img{
						width:620px;
						border:1px solid rgba(221,221,221,1);
						border-radius:6px;
						.avatar-uploader-icon {
							font-size: 28px;
							color: #8c939d;
							width: 110px;
							height: 110px;
							line-height: 110px;
							text-align: center;
						}
						.el-upload--picture-card{
							height: 110px;
							width: 110px;
							line-height: 110px;
						}
						.outside_img{
							height: 110px;
							width: 110px;
							position: relative;
							font-size: 0;
							img{
								height: 110px;
								width: 110px;
								
							}
							.el-icon-circle-close{
								position:absolute;
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
						.inside{
							border-top: 1px solid #ddd;
						}
						.outside{
							padding: 10px;
							box-sizing:border-box;
							align-items: flex-start;
							.mid{
								width: 270px;
								h3{
									font-size: 16px;
									color: #333;
									margin-top: 5px;
								}
								p{
									color: #666;
									font-size: 14px;
									line-height: 24px;
									margin-top: 5px;
								}
							}
							.eg{
								img{
									width: 180px;
									height: 110px;
								}
							}
						}
					}
					.yxdate{
						padding: 0 10px;
						.el-date-table td.end-date span{
								background-color:red;
						}
						.el-date-table td.start-date span{
							background-color:red;
						}
					}
				}
			}
		}
	}
</style>
