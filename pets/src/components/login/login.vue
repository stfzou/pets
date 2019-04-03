<template>
	<div class="login_warp public_login">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">登录</div>
		</div>
		<div class="logo flex_r_s_c">
			<img src="../../assets/logo.png" alt="">
		</div>
		<div class="form_cnt">
			<ul class="form_list">
				<li class="flex_r_f_s">
					<img src="../../assets/login/icon-phone.png" alt="">
					<input type="text" v-model="phone" placeholder="请输入您的手机账号" />
				</li>
				<li class="flex_r_f_s">
					<img src="../../assets/login/icon-pwd.png" alt="">
					<input type="password" v-model="pwd" placeholder="请输入您的密码" />
				</li>
			</ul>
			<div class="link flex_r_s_b">
				<router-link to="/forgetPw">忘记密码?</router-link>
				<router-link to="/vLogin">验证码登录</router-link>
				<router-link to="/register">新用户注册</router-link>
			</div>
			<div class="login_btn flex_r_s_c" @click="login">登录</div>
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
				reg: /^1[3456789]\d{9}$/,
			}
		},
		methods: {
			back() {
				this.$router.go(-1);//返回上一层
			},
			login() {
				//注册
				let self = this;
				if (this.phone == '') {
			
					let toast = this.$createToast({
						txt: '手机号不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				} else if (!this.reg.test(this.phone)) {
			
					let toast = this.$createToast({
						txt: '手机号格式错误',
						type: 'error'
					  })
					toast.show()
					return false;
				} else if (this.pwd == '') {
			
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
				}else {
					this.axios.post(Api.shopApi+'/shops_u_login', this.qs.stringify({
						phone: this.phone,
						password: this.pwd
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res) {
						console.log(res)
						if (res.data.code === 1) {
							
							var userEntity = {
								userName: res.data.user.userName,
								userId: res.data.user.userId,
								userPhone: res.data.user.phone,
								token:res.data.token,
								shopId:res.data.user.userShops.shopId
							};
							// self.$store.commit('setUserInfo',userEntity);
							
							sessionStorage.setItem('user', JSON.stringify(userEntity));
							let toast = self.$createToast({
								txt: '登录成功',
								type: 'correct'
							  })
							toast.show()
							setTimeout(()=>{
								self.$router.go(-1); //返回上一层	
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
						let toast = self.$createToast({
							txt:err,
							type: 'error'
						  })
						toast.show()
						// console.log(err)
					})
			
			
				}
			},
		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.public_login{
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
						// background: #FF523D;
					}
					
					input::-webkit-input-placeholder {
			         /* placeholder颜色  */
						color: #fff;
					}
					input:-webkit-autofill {
					 -webkit-text-fill-color: #fff !important;
					 transition: background-color 5000s ease-in-out 0s;
					}
				}
				li:first-child{
					margin: 0;
				}
			}
			.link{
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
