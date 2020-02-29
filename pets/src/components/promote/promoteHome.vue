<template>
	<div class="promoteHomeWarp">
		<div class="promoteHead">

			<div class="userBox flex_r_s_b">
				<div class="userHead flex_r_f_s" @click="homeLink">
					<img :src="userHead" alt="" />
					<span>{{userName}}</span>
				</div>
				<div class="sign_out" @click="signOut">退出</div>
			</div>

			<div class="promotePost">

			</div>
		</div>
		<div class="promoteCnt">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				userHead: '',
				userName: ''
			}
		},
		mounted() {
			if(localStorage.getItem('userId') != null) {
				this.getUiserInfo();
			}
		},
		methods: {
			homeLink() {
				this.$router.push({
					name: 'promoteIndex'
				})
			},
			signOut() {
				
				localStorage.removeItem('userId')
				this.$router.push({
					name: 'promoteLogin'
				})
			},
			getUiserInfo() {
				let self = this;
				this.axios.get(Api.userApi + '/user/getUserInfo?userId=' + localStorage.getItem('userId'), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
				}).then(function(res) {
					self.userHead = res.data.data.imgAddr;
					self.userName = res.data.data.userName;
				})
					
			}
		}
	}
</script>

<style lang="scss">
	.promoteHomeWarp {
		height: 100%;
		position: relative;
		background: #fff;
		.promoteHead {
			padding: 35px 30px 0 30px;
			height: 435px;
			box-sizing: border-box;
			.promotePost {
				height: 220px;
				background-image: url('../../assets/llbx.jpg');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: 50%;
				border-radius: 10px;
				margin-top: 30px;
				img {
					width: 100%;
				}
			}
			.userBox {
				border-radius: 10px;
				height: 150px;
				box-shadow: 0px 0px 8px 0px rgba(102, 102, 102, 0.16);
				padding: 0 26px;
				box-sizing: border-box;
				.userHead {
					width: 300px;
					img {
						height: 90px;
						width: 90px;
					}
					span {
						font-size: 28px;
						color: #333;
						margin-left: 30px;
					}
				}
				.sign_out {
					width: 100px;
					height: 40px;
					border-radius: 20px;
					background: #ff523d;
					text-align: center;
					line-height: 40px;
					color: #fff;
					font-size: 24px;
				}
			}
		}
		.promoteCnt {}
	}
</style>