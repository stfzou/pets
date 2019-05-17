<template>
	<div class="answer">
		<div class="answerBox">
			<div class="top_nav flex_r_s_b">
				<div class="back" @click="back"></div>
				<div class="nav_title">萌宠闯关</div>
			</div>
			<div class="answerCnt">
				<router-view></router-view>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			back(){
				this.$router.go(-1); //返回上一层
			}
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.answer{
		padding: 20px;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		.answerBox{
			border: 4px solid #999;
			height: 100%;
			width: 100%;
		}
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			background: #fff;
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
	}
	
</style>
