<template>
	<div class="seller_warp">
		<div class="post">
			<TopNav></TopNav>
		</div>
		<div class="seller_nav_warp">
			<div class="intd_box">
				<div class="flex_r_f_s intd">
					<img class="head_icon" src="../../assets/icon/head_icon.png" alt="">
					<div class="mid">
						<div class="name">自由犬宠物物品</div>
						<div class="flex_r_f_s distance">
							<span class="dist_icon"></span>
							<span class="juli">距离2.5公里</span>
						</div>
						<div class="flex_r_f_s btom">
							<span class="span1">送货上门</span>
							<span>同城快递免运费</span>
							<div class="btom_icon"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TopNav from '../common/topNav.vue'
	export default {
		data() {
			return {
				msg:'hello'
			}
		},
		components:{
			TopNav
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.seller_warp{
		
		.post {
			height: 208px;
			background:url(../../assets/icon/icon-bg1.png) no-repeat center 0;
			background-size: cover;
			padding:$p20;
			
		}
		.seller_nav_warp{
			.intd_box{
				padding: $p20;
				margin-top: -118px;
				.intd{
					align-items: flex-start;
					padding:20px 0 36px 28px;
					box-sizing:border-box;
					border-radius:10px;
					background:#fff;
					box-shadow:0px 8px 10px 0px rgba(255,82,61,0.1);
					.head_icon{
						height: 120px;
						width: 120px;
					}
					.mid{
						margin-left: 35px;
						margin-top: 28px;
						.name{
							font-size: 32px;
							color: $blank;
						}
						.distance{
							height: 62px;
							.dist_icon{
								height: 22px;
								width: 18px;
								@include bg-image('map');
								background-size:cover;
							}
							.juli{
								color: $text_gray;
								font-size: 22px;
								margin-left: 10px;
							}
						}
						.btom{
							
							span{
								border-radius:6px;
								color: #FF523D;
								font-size: 22px;
								padding:4px;
								border:1px solid #FF523D;/*no*/
							}
							.span1{
								margin-right:12px;
							}
							.btom_icon{
								width: 30px;
								height: 18px;
								@include bg-image('btom');
								background-size: cover;
								display: inline-block;
								margin-left: 90px;
							}
						}
					}
				}
				
			}
		}
	}
</style>
