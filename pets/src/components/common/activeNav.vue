<template>
		<div class="topNav flex_r_s_b">
			<div class="back"></div>
			<span>自由犬宠物用品</span>
			<div class="nav_r">
				<div class="follow"></div>
				<div class="share"></div>
			</div>
			
		</div>
	
	
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:[]
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.topNav{
		height: 88px;
		.back{
			width: 26px;
			height: 42px;
			@include bg-image('back');
			background-size: cover;
		}
		.nav_r{
			.share{
				width: 50px;
				height: 40px;
				@include bg-image('share');
				background-size: cover;
			}
		}
		
		span{
			color: $white;
			@include font-dpr(30px);
		}
	}
</style>
