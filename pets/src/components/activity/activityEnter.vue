<template>
	<div class="activityEnter">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">报名名单</div>
		</div>
		<div class="joinList">
			<ul>
				<li>
					<div class="title">姓名<span>*</span></div>
					<input type="text" v-model="val" placeholder="请输入您的姓名" />
				</li>
				<li>
					<div class="title">昵称</div>
					<input type="text" v-model="val" placeholder="请输入您的昵称" />
				</li>
				<li>
					<div class="title">电话<span>*</span></div>
					<input type="text" v-model="val" placeholder="请输入您的电话" />
				</li>
				<li>
					<div class="title">邮箱<span>*</span></div>
					<input type="text" v-model="val" placeholder="请输入您的邮箱" />
				</li>
			</ul>
			
			
		</div>
		<div class="couponBtn flex_r_s_c">确定报名</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				val:''
			}
		},
		methods:{
			back() {
				this.$router.go(-1); //返回上一层
			},
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	
	.activityEnter{
		padding-top: 88px;
		padding-bottom: 96px;
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: fixed;
			border-bottom: 1px solid #FF523D;
			background: #fff;
			left: 0;
			top: 0;
			z-index: 100;
		
			.back {
				width: 26px;
				height: 42px;
				background: url(../../assets/icon/backColory.png) no-repeat center 0;
				background-size: cover;
			}
		
			.nav_title {
				font-size: 30px;
				color: #000;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
		
			}
		
		}
		.joinList{
			ul{
				overflow: hidden;
				padding: 0 60px;
				li{
					margin-top: 40px;
					.title{
						font-size: 28px;
						color: #000;
						padding-left: 20px;
						span{
							color: #FF523D;
						}
					}
					input{
						width: 100%;
						padding: 18px;
						box-sizing: border-box;
						border: 1px solid #e8e8e8;/*no*/
						border-radius: 45px;
						margin-top: 20px;
						font-size: 26px;
					}
				}
			}
		}
		.couponBtn{
			height: 96px;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #FF523D;
			color: #fff;
			font-size: 30px;
		}
	}
</style>
