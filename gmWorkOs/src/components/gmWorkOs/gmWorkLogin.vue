<template>
	<div class="workOsLogin public_login">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">骨米业务管理系统</div>
		</div>
		<div class="logo flex_c_f_e">
			<img src="../../assets/logo.png" alt="">
		</div>
		<div class="form_cnt">
			<ul class="form_list">
				<li class="flex_r_f_s">
					<img src="../../assets/login/icon-phone.png" alt="">
					<input type="text" v-model="phone" @blur.prevent="inputLoseFocus" placeholder="请输入您的手机账号" />
				</li>
				<li class="flex_r_f_s">
					<img src="../../assets/login/icon-pwd.png" alt="">
					<input type="password" v-model="pwd" @blur.prevent="inputLoseFocus" placeholder="请输入您的密码" />
				</li>
			</ul>

			<div class="login_btn flex_r_s_c" @click="login"><cube-loading :size="28" v-if="loading"></cube-loading><span v-else>登录</span></div>
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
				loading:false
			}
		},
    mounted() {
       // localStorage.removeItem('userInfo')
    },
		methods: {
			back() {
				this.$router.push({
					name:'workOsInfoList'
				});//返回上一层
			},
			inputLoseFocus() {
				setTimeout(() => {
				  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				},100);

			},
			login() {
				//注册
				let self = this;

				if (this.phone == '' && this.phone!='root') {

					let toast = this.$createToast({
						txt: '手机号不能为空',
						type: 'error'
					  })
					toast.show()

					return false;
				} else if (!this.reg.test(this.phone) && this.phone!='root') {

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
				}else {
					self.loading = true;
					this.axios.post(Api.staffApi+'/employee/system/registerByPwd', this.qs.stringify({
						phone: this.phone,
						password: this.pwd
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res) {
						console.log(typeof res.data.data.token)
						if (res.data.code === 1) {
							let userInfo = {
								manager:res.data.data.manager,
								root:res.data.data.root,
								name:res.data.data.name,
								token:res.data.data.token,
								department:res.data.data.department,//岗位
                employeeId:res.data.data.employeeId,//员工Id
                network:res.data.data.networkId,//网点ID
                post:res.data.data.post//部门
							}
// 							self.$store.commit('setStaffNum',res.data.data.staffNum);
// 							self.$store.commit('setCustomerNum',res.data.data.clientNum);
							localStorage.setItem('userInfo', JSON.stringify(userInfo));
							setTimeout(()=>{
								self.loading = false;
								self.$router.push({
									name:'gmWorkHome'
								})
							},500)

						} else {
							console.log(res)

							setTimeout(()=>{
								self.loading = false;
							},500)
							let toast = self.$createToast({
								txt:res.data.msg,
								type: 'error'
							  })
							toast.show();
						}

					}).catch(function(err) {
						let toast = self.$createToast({
							txt:err,
							type: 'error'
						  })
						toast.show()
						self.loading = false;
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
	.workOsLogin{
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
