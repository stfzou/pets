<template>
	<div class="dataReady">
		<header class="header">
			<img src="../assets/data_ready.png" alt="">
		</header>
		<router-view></router-view>
		<!-- <div class="main-cnt">
			<ul class="nav flex_r_f_s">
				<li class="active">
					<img v-if="sellerSuccess" class="success" src="../assets/condition/icon_02.png" alt="">
					<span v-else>①</span>
					商家信息
				</li>
				<li>
					<img v-if="sellerSuccess" src="../assets/condition/icon_01a.png" alt="">
					<img v-else src="../assets/condition/icon_01.png" alt="">
				</li>
				<li v-bind:class="{active:sellerSuccess}">
					<img v-if="zzSuccess" class="success" src="../assets/condition/icon_02.png" alt="">
					<span v-else>②</span>
					资质信息
				</li>
				<li>
					<img v-if="zzSuccess" src="../assets/condition/icon_01a.png" alt="">
					<img v-else src="../assets/condition/icon_01.png" alt="">
				</li>
				<li v-bind:class="{active:zzSuccess}">
					<img v-if="zzSuccess" class="success" src="../assets/condition/icon_02.png" alt="">
					<span v-else>③</span>
					店铺信息提交成功
				</li>
			</ul>
			<div class="view_warpper">
				<router-view></router-view>
			</div>
		</div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sellerInfoState:false
			};
		},
		methods: {
			link() {
				this.$router.push({name:'sellerInfo',query:{id:123}});
			}
		}
		
		
	}
</script>

<style lang="scss">
	.dataReady{
		height: 100%;
		width: 100%;
		background: #fff5f4;
		padding-bottom: 138px;
		overflow: auto;
		.header{
			background: #ff8677;
			height: 120px;
			padding-left:28px;
			overflow: hidden;
			img{
				width: 382px;
				margin-top: 30px;
			}
		}
		
	}
</style>
