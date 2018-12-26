<template>
	<div class="dataReady">
		<header class="header">
			<img src="../assets/data_ready.png" alt="">
		</header>
		<div class="main-cnt">
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
		</div>
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
		},
		computed: {
			sellerSuccess() {
				return this.$store.state.inhabitantsData.sellerInfo
			},
			zzSuccess(){
				return this.$store.state.inhabitantsData.aptitudeInfo
			}
		},
		
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
		.main-cnt{
			width: 1200px;
			margin: 20px auto 0 auto;
			background: #fff;
			padding: 0 20px;
			padding-bottom: 54px;
			box-sizing: border-box;
			box-shadow: 0px 0px 10px 5px #ffe9e6;
			padding-top: 60px;
			.nav{
				width: 1000px;
				height: 60px;
				border-radius:30px;
				box-shadow: 0px 0px 10px 5px #ffe9e6;
				margin:0 auto;
				box-sizing: border-box;
				justify-content:space-around;
				li{
					font-size: 20px;
					font-weight:400;
					display: flex;
					span{
						margin-right: 12px;
					}
				}
				.active{
					color: #FF523D;
					display: flex;
					.success{
						width: 18px;
						height: 18px;
						margin-right: 12px;
					}
				}
			}
		}
	}
</style>
