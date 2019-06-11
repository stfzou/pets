<template>
	<div class="realName">
		<ul class="realNameList">
			<li>
				<div class="add_goods_title">主办方实名认证</div>
			</li>
			<li class="flex_r_f_s">
				<div class="realNameList_l">
					<p>企业/组织全称<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="val" maxlength="60" placeholder="企业/组织全称"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="realNameList_l">
					<p>企业/组织注册号<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="val" maxlength="60" placeholder="企业/组织注册号"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="realNameList_l">
					<p>法人(或运营者)姓名<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="val" maxlength="60" placeholder="法人(或运营者)姓名"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s">
				<div class="realNameList_l">
					<p>法人(或运营者)身份证号<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
					<div class="sponsorName">
						<el-input class="goodsNameInput" v-model="val" maxlength="60" placeholder="法人(或运营者)身份证号"></el-input>
					</div>
				</div>
			</li>
			<li class="flex_r_f_s sponsorImgLi">
				<div class="realNameList_l">
					<p>最新营业执照照片<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
						<div class="store_img">
						<div class="outside flex_r_s_b">
							<div class="outside_img" v-if="imgData.sfzz">
								<img :src="imgData.sfzz">
								<i @click="deleteImg($refs.uploadSfzz.uploadFiles,'sfzz')" class="el-icon-circle-close"></i>
							</div>
							<div v-show="!imgData.sfzz">
								<el-upload ref="uploadSfzz" class="avatar-uploader" action="http://192.168.0.109:8084/updateImg"
								 :show-file-list="false" list-type="picture-card" name="Img" :limit="1" :on-progress="handleSfzzPreview"
								 :on-success="handleSfzzSuccess" :before-upload="beforeAvatarUpload">
									<i class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<el-progress v-if="imgData.sfzzP>0" :percentage="imgData.sfzzP"></el-progress>
							</div>
							<div class="mid">
								<h3>营业执照照片</h3>
								<p>1、需文字清晰、边框完整、露出国徽。</p>
								<p>2、拍复印件需要加盖印章，可用有效特许证件代替。</p>
							</div>
							<div class="eg">
								<img src="../../assets/condition/shili05.png" alt="">
							</div>
						</div>
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
								<el-upload ref="uploadSfzz" class="avatar-uploader" action="http://192.168.0.109:8084/updateImg"
								 :show-file-list="false" list-type="picture-card" name="Img" :limit="1" :on-progress="handleSfzzPreview"
								 :on-success="handleSfzzSuccess" :before-upload="beforeAvatarUpload">
									<i class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<el-progress v-if="imgData.sfzzP>0" :percentage="imgData.sfzzP"></el-progress>
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
								<el-upload ref="uploadSfzf" class="avatar-uploader" action="http://192.168.0.109:8084/updateImg"
								 :show-file-list="false" list-type="picture-card" :limit="1" name='Img' :on-progress="handleSfzfPreview"
								 :on-success="handleSfzfSuccess" :before-upload="beforeAvatarUpload">
									<i class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<el-progress v-if="imgData.sfzfP>0" :percentage="imgData.sfzfP"></el-progress>
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
			<li class="flex_r_f_s sponsorImgLi">
				<div class="realNameList_l">
					<p>认证公函照片<span style="color: #FF523D;">*</span></p>
				</div>
				<div class="realNameList_r">
						<div class="store_img">
						<div class="outside flex_r_s_b">
							<div class="outside_img" v-if="imgData.sfzz">
								<img :src="imgData.sfzz">
								<i @click="deleteImg($refs.uploadSfzz.uploadFiles,'sfzz')" class="el-icon-circle-close"></i>
							</div>
							<div v-show="!imgData.sfzz">
								<el-upload ref="uploadSfzz" class="avatar-uploader" action="http://192.168.0.109:8084/updateImg"
								 :show-file-list="false" list-type="picture-card" name="Img" :limit="1" :on-progress="handleSfzzPreview"
								 :on-success="handleSfzzSuccess" :before-upload="beforeAvatarUpload">
									<i class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<el-progress v-if="imgData.sfzzP>0" :percentage="imgData.sfzzP"></el-progress>
							</div>
							<div class="mid">
								<h3>法人身份证正面照片</h3>
								<p>1、需文字清晰、边框完整。</p>
								<p>2、企业公函需要加盖企业公章。</p>
							</div>
							<div class="eg">
								<img src="../../assets/condition/shili8.png" alt="">
							</div>
						</div>
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
	export default {
		data() {
			return {
				val:'',
				imgData: {
					sfzz: '',
					sfzzP: 0,
					sfzzId: '',
					sfzf: '',
					sfzfP: 0,
					sfzfId: '',
					yyzz: '',
					yyzzP: 0,
					yyzzId: '',
					zlz: '',
					zlzP: 0,
					zlzId: ''
				},
			}
		},
		methods:{
			beforeAvatarUpload(file) {
				
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isLt2M) {
				  this.$message.error('上传图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
			handleSfzzSuccess(res, file, fileList) { //身份证正面上传
			
				this.imgData.sfzz = file.response.data.imgAddr;
				this.imgData.sfzzId = file.response.data.imgId;
				this.imgData.sfzzP = 0;
			},
			handleSfzfSuccess(res, file, fileList) { //身份证反面上传
				this.imgData.sfzf = file.response.data.imgAddr;
				this.imgData.sfzfId = file.response.data.imgId;
				this.imgData.sfzfP = 0;
			},
			handleYyzzSuccess(res, file, fileList) { //营业执照上传
				this.imgData.yyzz = file.response.data.imgAddr;
				this.imgData.yyzzId = file.response.data.imgId;
				this.imgData.yyzzP = 0;
			},
			handleZlzSuccess(res, file, fileList) { //动物诊疗许可证上传
				this.imgData.zlz = file.response.data.imgAddr;
				this.imgData.zlzId = file.response.data.imgId;
				this.imgData.zlzP = 0;
			},
			handleSfzzPreview(file) { //上传时百分比钩子
			
				this.imgData.sfzzP = file.percent;
				console.log(this.imgData.sfzzP)
			},
			handleSfzfPreview(file) { //上传时百分比钩子
			
				this.imgData.sfzfP = file.percent;
			},
			handleYyzzPreview(file) { //上传时百分比钩子
			
				this.imgData.yyzzP = file.percent;
			},
			handleSZlzPreview(file) { //上传时百分比钩子
			
				this.imgData.zlzP = file.percent;
			},
			deleteImg(arr, img) { //照片删除
				let self = this;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					callback: function(action, instance) {
						if (action == 'confirm') {
							self.axios.post('/deleteImg', self.qs.stringify({
								imgAddr: self.imgData[img],
							}), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}).then(function(res) {
								if (res.data.code == 1) {
									arr.splice(0, 1);
									self.imgData[img] = '';
								} else {
									self.$message({
										showClose: true,
										message: res.data.msg,
										type: 'error',
									});
								}
			
							}).catch(function(res) {
								self.$message({
									showClose: true,
									message: '服务器错误',
									type: 'error',
								});
							})
			
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.realName {
		padding: 40px;
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
