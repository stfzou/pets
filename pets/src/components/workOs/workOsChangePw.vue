<template>
	<div class="workOsChangePw">
		<div class="login_nav">
			<div class="back" @click="back"></div>
			<div class="title">修改登录信息</div>
		</div>
		<div class="addCustomer_list">
			<ul>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>手机号码:</div>
					<div class="list_r">
						<input type="text" v-model="phone" />
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>原密码:</div>
					<div class="list_r">
						<input type="password" v-model="oldPw" />
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>新密码:</div>
					<div class="list_r">
						<input type="password" v-model="newPw" />
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_l"><b>*</b>确认密码:</div>
					<div class="list_r">
						<input type="password" v-model="qrPw" />
					</div>
				</li>
			</ul>
			<div class="confirmBtn flex_r_s_c" @click="commit">确定</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data(){
			return{
				reg: /^1[3456789]\d{9}$/,
				phone:'',
				oldPw:'',
				newPw:'',
				qrPw:''
			}
		},
		mounted() {
			console.log(JSON.parse(sessionStorage.getItem('staff')))
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			commit(){
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
				} else if (this.oldPw == '') {
							
					let toast = this.$createToast({
						txt: '请输入原密码',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.newPw == ''){
					let toast = this.$createToast({
						txt: '请输入新密码',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.qrPw == ''){
					let toast = this.$createToast({
						txt: '请确认密码',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.newPw != this.qrPw){
					let toast = this.$createToast({
						txt: '密码输入不一致',
						type: 'error'
					  })
					toast.show()
					return false;
				}else{
					this.axios.post(Api.staffApi+'/business/updateBusinessStaffPwd', this.qs.stringify({
						id:JSON.parse(sessionStorage.getItem('staff')).staffId,	
						phone: this.phone,
						oldPwd: this.oldPw,
						newPwd:this.qrPw
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res) {
						console.log(res)
						
						if (res.data.code === 1) {
							sessionStorage.removeItem('staff');
							let toast = self.$createToast({
								txt: '修改成功',
								type: 'correct'
							 })
							toast.show();
							setTimeout(()=>{
								self.$router.push({
									name:'workOsLogin'
								})
							},1000)
							
								
						} else {
							alert(res.data.msg)
						}
								
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.workOsChangePw{
		.login_nav{
			height: 42px;
			padding: 22px 0;
			position: relative;
			.back{
				background: url("../../assets/icon/backColory.png") no-repeat center 0;
				background-size: cover;
				width: 24px;
				height: 40px;
				position: absolute;
				left: 20px;
				top: 50%;
				margin-top: -21px;
			}
			.title{
				font-size: 30px;
				color: #333;
				line-height: 42px;
				text-align: center;
			}
		}
		.addCustomer_list{
			padding: 0 20px;
			padding-bottom: 20px;
			li{
				padding: 20px 0;
			}
			.list_l{
				font-size: 26px;
				width: 130px;
				color: #333;
				b{
					color: #ff523d;
				}
			}
			.list_r{
				margin-left: 20px;
				&>input{
					border: 1px solid #e8e8e8;
					height: 50px;
					width: 390px;
					padding:0 10px;
					font-size: 26px;
				}
				
				
			}
			.confirmBtn{
				color: #fff;
				font-size: 30px;
				width: 500px;
				height: 60px;
				background: #ff523d;
				border-radius: 50px;
				margin: 0 auto;
				margin-top: 100px;
			}
		}
	}
</style>
