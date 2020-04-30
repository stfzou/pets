<template>
	<div class="register_warp">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">注册</div>
		</div>
		<div class="logo flex_r_s_c">
			<img src="../../assets/logo.png" alt="">
		</div>
		<div class="form_cnt">
			<ul class="form_list">
				<li class="flex_r_f_s">
					<img src="../../assets/login/icon-phone.png" alt="">
					<input type="text" v-model="phone" @blur.prevent="inputLoseFocus" placeholder="请输入手机账号" />
				</li>
				<li class="flex_r_f_s">
					<img src="../../assets/login/icon-pwd.png" alt="">
					<input type="password" v-model="pwd" @blur.prevent="inputLoseFocus" placeholder="请输入密码" />
				</li>
				<li class="flex_r_f_s vcode_box">
					<img src="../../assets/login/icon-yz.png" alt="">
					<input type="text" v-model="vCode" @blur.prevent="inputLoseFocus" placeholder="请输入验证码" />
					<div class="v_code" v-if="show">
						<span @click="getCode">获取验证码</span>
					</div>
					<div class="v_code active_vcode" v-else>
						<span>{{count}}</span>
					</div>
				</li>
			</ul>
			<div class="link_login">
				<router-link to="/login">已有账号,立即登录</router-link>
			</div>
			<div class="login_btn flex_r_s_c" @click="registerRuler">注册</div>
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
				show: true,
				count: '',
				timer: null,
        inviteUserId:-1,
				reg: /^1[3456789]\d{9}$/,
			}
		},
    mounted() {
      if(this.getUrlKey('inviteUserId')!=null){
        
        let inviteUserId = this.getUrlKey('userId');
        this.inviteUserId = this.getUrlKey('inviteUserId');
        sessionStorage.setItem("inviteUserId", inviteUserId);
        
      }else if(this.getUrlKey('userId')!=null){
        
        let inviteUserId = this.getUrlKey('userId');
        sessionStorage.setItem("inviteUserId", inviteUserId);
        this.inviteUserId = this.getUrlKey('userId');
        
      }else if(sessionStorage.getItem("inviteUserId")!=null){
        this.inviteUserId = sessionStorage.getItem("inviteUserId");
      }

    },

		methods: {
			back() {
				this.$router.go(-1);//返回上一层
			},
			inputLoseFocus() {
				setTimeout(() => {
				  window.scrollTo(0,0);
				},100);
			},
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },

			getCode() {
				//获取验证码
				if (this.phone!='') {
					let _this = this;
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.axios.get(Api.shopApi+'/sms_register?phone=' + this.phone, {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							})
							.then(function(response) {

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
			registerRuler() {
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
				} else if (this.vCode === '') {

					let toast = this.$createToast({
						txt: '验证码不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				} else {
					this.axios.post(Api.shopApi+'/user_register', this.qs.stringify({
						phone: this.phone,
						password: this.pwd,
						v_code: this.vCode,
            inviteUser:this.inviteUserId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res) {

						if (res.data.code === 1) {

							let toast = self.$createToast({
								txt: '注册成功',
								type: 'correct'
							  })
							toast.show()
							setTimeout(()=>{
								self.$router.push({
									name:'login'
								})
							},500)


						} else {

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
		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.register_warp{
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
