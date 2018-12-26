<template>
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
							<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="imgData.sfzz" :src="imgData.sfzz" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<div class="mid">
								<h3>法人身份证正面照片</h3>
								<p>需要清晰展示人物五官、身份证文字信息和国徽</p>
							</div>
							<div class="eg">
								<img src="../assets/condition/shili04.png" alt="">
							</div>
						</div>
						<div class="outside inside flex_r_s_b">
							<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="imgData.sfzf" :src="imgData.sfzf" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
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
							<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="imgData.yyzz" :src="imgData.yyzz" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
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
							<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="imgData.zlz" :src="imgData.zlz" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
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
					<el-date-picker
						v-model="yxDate"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
					<el-checkbox v-model="checked">长期</el-checkbox>
				</div>
			</li>
		</ul>
		<div class="pointer next_btn" @click="next">提交进入下一步</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeFw:'',
				yxDate:'',
				checked:'',
				imgData:{sfzz:'',sfzf:'',yyzz:'',zlz:''},
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
			handleAvatarSuccess(res, file) {
				
				this.sellerInfo.outImg = URL.createObjectURL(file.raw);
			},
		    beforeAvatarUpload(file) {
			    const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			next(){
				
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
				padding-left: 5px;
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
				}
			}
		}
	}
</style>
