<template>
	<div class="storeRegisterWarp">
		<div class="storeRegisterPost">

		</div>
		<div class="storeRegisteCnt">
			
			<div class="title">注册</div>
			<ul class="formdata">
				<li class="phone">
					<input type="number" placeholder="输入您的手机号码" name="" id="" v-model="phone" />
				</li>
				<li class="vcode flex_r_s_b">
					<input type="number" name="" placeholder="输入验证码" id="" v-model="vCode" />
					<div class="v_code" v-if="show">
						<span @click="getCode">获取验证码</span>
					</div>
					<div class="v_code active_vcode" v-else>
						<span>{{count}}</span>
					</div>
				</li>
				<li class="nextBtn flex_r_s_c" @click="vCodeLogin">
					<cube-loading v-if="isLoading" :size="28"></cube-loading>
					<span v-else>下一步</span>
					
				</li>
			</ul>
			<div class="storeRegisterTip">
                              登录注册代表同意 <router-link :to="{name:'agreement',query:{agreementId:2}}">用户协议、</router-link><router-link :to="{name:'agreement',query:{agreementId:1}}">隐私政策</router-link>
                             
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	
	export default{
		data(){
			return{
				val:'',
				isLoading:false,
				phone:'',
				vCode:'',
				show: true,
				count: '',
				timer: null,
				salesmanId:'',
				appUserId:''
			}
		},
		mounted(){
			
			if(this.$route.query.salesmanId!=null){
				this.salesmanId = this.$route.query.salesmanId
			}
			if(this.$route.query.appUserId!=null){
				this.appUserId = this.$route.query.appUserId
			}
		},
		methods:{
			getUrlKey(name){
        		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      		},
			getCode() {
				//获取验证码
				if (this.phone) {
					let _this = this;
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						
						this.axios.get(Api.userApi+'/sms_login_code?phone=' + this.phone, {
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
				}

			},
			vCodeLogin(){
				let self = this;
				if(this.phone==''){
					let toast = this.$createToast({
						txt: '手机号不能为空',
						type: 'error'
					  })
					toast.show()
					return false;
				}else if(this.vCode == ''){
					let toast = this.$createToast({
						txt: '验证码不能为空',
						type: 'error'
					  })
					toast.show()
					
					return false;
				}else{
					this.axios.post(Api.userApi+'/user_sms_login', this.qs.stringify({
						phone: this.phone,
						vcode: this.vCode
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(res) {
						self.isLoading = true;
						if (res.data.code === 1) {
							// self.$store.commit('setUserInfo',userEntity);
							localStorage.setItem('userType',res.data.user.userType);
							localStorage.setItem('userId',res.data.user.userId);
							
							setTimeout(e=>{
								self.isLoading = true;
								if(res.data.user.userType==1){
									
									if(self.salesmanId!=''){
										self.$router.push({
											name:'storeData',
											query:{
												salesmanId:self.salesmanId
											}
										})
									}else if(self.appUserId!=''){
										
										self.$router.push({
											name:'storeData',
											query:{
												appUserId:self.appUserId
											}
										})
									}else{
										self.$router.push({
											name:'storeData'
											
										})
										
									}
									
									
									
								}else{
									self.$router.push({
										name:'storeSus'
									})
								}
								
							},500)

						} else {
							self.isLoading = false;
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

			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.storeRegisterWarp{
		height: 100%;
		position: relative;
		background: #fff;
		.storeRegisterPost{
				height: 360px;
				background-image: url('../../assets/topMenuBg.png');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: 50%;
		}
		.storeRegisteCnt{
			position: absolute;
			left: 50%;
			top: 420px;
			transform: translate(-50%,0);
			width: 560px;
			
			.title{
				font-size:60px;
				font-weight:bold;
				color: #333;
				padding-bottom: 50px;
			}
			.formdata{
				overflow: hidden;
				li{
					padding: 28px 30px;
					box-sizing: border-box;
					background: #F5F5F5;
					border-radius:60px;
					margin-top: 55px;
					font-size: 26px;
					color: #999;
					input{
						background: none;
					}
					.v_code{
						color: #ff523d;
					}
				}
				.nextBtn{
					background: #FF523D;
					color: #fff;
					font-size:30px;
				}
			}
			.storeRegisterTip{
				font-size:24px;
				color:#666;
				text-align: center;
				padding-top: 33px;
				a{
					color: #ff523d;
				}
			}
		}
		
	}
</style>