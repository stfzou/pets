<template>
	<div class="forget_warp">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">忘记密码</div>
		</div>
		<div class="logo flex_r_s_c">
			<img src="../../assets/logo.png" alt="">
		</div>
		<div class="form_cnt">
			<ul class="form_list">
				<li class="flex_r_f_s" v-if="!isPwd">
					<img src="../../assets/login/icon-phone.png" alt="">
					<input type="text" v-model="phone" @blur.prevent="inputLoseFocus" placeholder="请输入手机账号" />
				</li>
				<li class="flex_r_f_s vcode_box" v-if="!isPwd">
					<img src="../../assets/login/icon-yz.png" alt="">
					<input type="password" v-model="vCode" @blur.prevent="inputLoseFocus" placeholder="请输入验证码" />
					<div class="v_code" v-if="show">
						<span @click="getCode">获取验证码</span>
					</div>
					<div class="v_code active_vcode" v-else>
						<span>{{count}}</span>

					</div>
				</li>
				<li class="flex_r_f_s" v-if="isPwd">
					<img src="../../assets/login/icon-pwd.png" alt="">
					<input type="password" v-model="pwd" @blur.prevent="inputLoseFocus" placeholder="请设置您的新密码" />
				</li>
			</ul>

			<div class="login_btn flex_r_s_c" v-if="!isPwd" @click="next">下一步</div>
			<div class="login_btn flex_r_s_c" v-else @click="changePwd">完成</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				phone:'',
				pwd:'',
				vCode:'',
				isPwd:false,
				show: true,
				count: '',
				timer: null,
			}
		},
		methods: {
			getCode() {
				//获取验证码
				if (this.phone!='') {
					let _this = this;
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.axios.get(Api.shopApi+'/sms_getpwd?phone=' + this.phone, {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							})
							.then(function(response) {
								console.log(response);
							})
							.catch(function(error) {
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
				}else{
					let toast = this.$createToast({
						txt: '手机号不能为空',
						type: 'error'
					  })
					toast.show()
				}

			},
			next(){
				if(this.vCode!=''&&this.phone!=''){
					this.isPwd = true;
				}
			},
			inputLoseFocus() {
				setTimeout(() => {
				  window.scrollTo(0,0);
				},100);

			},
			changePwd(){
				let self = this;
				if (this.pwd == '') {

					let toast = this.$createToast({
						txt: '密码不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				} else if (this.pwd.length < 6) {

					let toast = this.$createToast({
						txt: '密码不能小于6位数',
						type: 'error'
					  })
					toast.show()
					return false;
				}else{
					this.axios.post(Api.shopApi+'/user/updatePwd', this.qs.stringify({
						phone: this.phone,
						password: this.pwd
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res) {

						if (res.data.code === 1) {

							let toast = self.$createToast({
								txt: '修改成功',
								type: 'correct'
							  })
							toast.show()
							setTimeout(()=>{
								self.$router.push({
									name:'login'
								})
							},500)


						} else {
							console.log(res)
							let toast = self.$createToast({
								txt:res.data.msg,
								type: 'error'
							  })
							toast.show()
						}

					}).catch(function(err) {
						console.log(err)
					})
				}
			},
			back() {
				this.$router.go(-1);//返回上一层
			},
		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.forget_warp{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #ff7260, #fb7667, #ff7260, #ff5e4a);
		.login_nav{
			height: 42px;
			padding: 22px 0;
			position: relative;
			.back{
				background: url("../../assets/icon/back@2x.png") no-repeat center 0;
				background-size: 100%;
				width: 28px;
				height: 42px;
				position: absolute;
				left: 20px;
				top: 50%;
				margin-top: -21px;
			}
			.title{
				font-size: 30px;
				color: #fff;
				line-height: 42px;
				text-align: center;
			}
		}
		.logo{
			height: 170px;
			img{
				width: 152px;
			}
		}
		.form_cnt{
			padding: 0 74px;
			padding-top: 85px;
			.form_list{
				li{
					height: 70px;
					margin-top: 70px;
					border-bottom: 1px solid #fff;/*no*/
					img{
						width: 38px;
					}
					input{
						background: none;
						margin-left: 112px;
						outline: none;
						font-size: 28px;
						color: #fff;
						width: 250px;
					}
					input::-webkit-input-placeholder {
			         /* placeholder颜色  */
						color: #fff;
					}

				}
				.vcode_box{

					.v_code{
						margin-left: 30px;
						span{
							display: inline-block;
							padding: 5px;
							border-radius: 6px;
							background: #fff;
							color: #FF523D;
							font-size: 24px;
						}
					}
					.active_vcode{
						span{
							width: 60px;
							text-align: center;
						}
					}
				}
				li:first-child{
					margin: 0;
				}
			}
			.link_login{
				margin-top: 30px;
				a{
					font-size: 24px;
					color: #fff;
				}
			}
			.login_btn{
				height: 90px;
				background: #fff;
				border-radius: 50px;
				margin-top: 70px;
				color: #FF523D;
				font-size: 32px;
			}
		}
	}
</style>
