<template>
	<div class="sellerActive">
		<div class="top_nav_box">
			<active-nav></active-nav>
		</div>
		
	
	</div>
</template>

<script>
	import activeNav from "../common/activeNav.vue"
	export default {
		components:{
			activeNav:activeNav
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.sellerActive .top_nav_box{
		height: 208px;
		background:url(../../assets/icon/icon-bg2.png) no-repeat center 0;
		background-size: cover;
		padding: 0 20px;
	}
</style>
