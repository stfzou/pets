<template>
	<div class="loading flex_r_f_e">
		<cube-loading :size="28"></cube-loading>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.loading{
		height: 100%;
		width: 100%;
		position: fixed;
		background:rgba(0,0,0,0.5);
		left:0;
		top: 0;
		z-index: 10000;
		justify-conten:center;
	}
</style>
