<template>
	
		<div class="topNav flex_r_s_b">
			<div class="back" @click="back"></div>
			<span>商家店铺</span>
			
			<div class="share"></div>
		</div>
	
	
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			back() {
				this.$router.go(-1);//返回上一层
			},
		},
		
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
		.share{
			width: 50px;
			height: 40px;
			@include bg-image('share');
			background-size: cover;
		}
		span{
			color: $white;
			@include font-dpr(30px);
		}
	}
</style>
