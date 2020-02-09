<template>
	<div class="dataReady">
		<header class="header">
			<div class="container flex_r_s_b">
				<div class="c_left flex_r_s_b">
					<img class="logo" src="../assets/header@2x.png" alt="">
				</div>
				<div class="c_right flex_r_f_s">
					<img class="head_img" src="../assets/home/head_icon.png" alt="">
					<div class="data_show">
						<p>{{userName}}</p>
					</div>
					<span class="shuxian"></span>
					<div class="quit pointer" @click="quit">退出登录</div>
				</div>
			</div>
		</header>
		<router-view></router-view>

	</div>
</template>

<script>

	export default {
		data() {
			return {
				sellerInfoState:false,
        userName:''
			};
		},
    mounted() {
      this.userName = JSON.parse(sessionStorage.getItem('user')).userName;
    },
		methods: {
			link() {
				this.$router.push({name:'sellerInfo',query:{id:123}});
			},
			quit(){
				let self = this;
				this.$confirm('是否要退出登录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						callback:function(action, instance){
							if(action == 'confirm'){
								window.sessionStorage.removeItem('user');
								self.$router.push({name:'login'});
							}
						}
				})
			}
		}


	}
</script>

<style lang="scss">
	.dataReady{

		width: 100%;
		background: #fff5f4;
		padding-bottom: 138px;

		.header{
			background: #ff8677;
			height: 120px;
			padding-left:28px;
			overflow: hidden;
			.container{
				background:#FF8677;
				height: 120px;
				padding:0 28px;
				box-sizing: border-box;
				border-bottom: 2px solid #ff523d;

				.c_left{
					width: 488px;
					align-items:flex-end;
					.history{
						span{
							display: inline-block;
							width: 22px;
							height: 22px;
							border-radius: 50%;

						}
						.back{
							background: url(../assets/home/icon_home7.png) no-repeat center 0;
							background-size: cover;
							margin-right: 5px;
						}
						.go{
							background: url(../assets/home/icon_home6.png) no-repeat center 0;
							background-size: cover;
						}
					}
				}
				.c_right{
					width: 330px;
					justify-content:flex-end;
					.shuxian{
						height: 20px;
						width: 1px;
						background: #fff;
						margin: 0 28px;
					}
					.head_img{
						width: 50px;
						height: 50px;
						margin-right: 10px;
					}
					.data_show{
						p{
							font-size: 16px;
							color: #fff;
							line-height: 20px;
							i{
								margin-left: 12px;
							}
						}
					}
					.quit{
						font-size: 16px;
						color: #fff;
						line-height: 20px;
					}
				}
			}
		}

	}
</style>
