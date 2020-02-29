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
		position: relative;
		.back{
			width: 26px;
			height: 42px;
			@include bg-image('back');
			background-size: cover;
		}
		.nav_r{
			width:115px;
			.share{
				display:inline-block;
				width: 50px;
				height: 40px;
				@include bg-image('share');
				background-size: cover;
			}
			.follow{
				display:inline-block;
				width: 42px;
				height: 38px;
				@include bg-image("icon-follow");
				background-size:cover;
				margin-right:15px;
			}
		}
		
		span{
			color: $white;
			@include font-dpr(30px);
			position: absolute;
			transform: translate(-50%,-50%);
			left: 50%;
			top: 50%;
		}
	}
</style>
