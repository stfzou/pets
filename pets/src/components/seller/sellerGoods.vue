<template>
	<div class="sellerGoods_warp">
		
		<div class="goods_list flex_r_s_b">
			<div class="goods">
				<img class="goods_pic" src="../../assets/images/sellergoods.png" alt="">
				<div class="goods_info">
					<h3>FANKEC狗狗火腿肠150g</h3>
					<div class="goods_price flex_r_s_b">
						<div class="left">
							<div class="money"><span class="new">￥29.00</span><span class="old">￥54.00</span></div>
							<div class="num">已售100件</div>
						</div>
						<div class="shop_car"></div>
					</div>
				</div>
			</div>
			<div class="goods">
				<img class="goods_pic" src="../../assets/images/sellergoods.png" alt="">
				<div class="goods_info">
					<h3>FANKEC狗狗火腿肠150g</h3>
					<div class="goods_price flex_r_s_b">
						<div class="left">
							<div class="money"><span class="new">￥29.00</span><span class="old">￥54.00</span></div>
							<div class="num">已售100件</div>
						</div>
						<div class="shop_car"></div>
					</div>
				</div>
			</div>
			<div class="goods">
				<img class="goods_pic" src="../../assets/images/sellergoods.png" alt="">
				<div class="goods_info">
					<h3>FANKEC狗狗火腿肠150g</h3>
					<div class="goods_price flex_r_s_b">
						<div class="left">
							<div class="money"><span class="new">￥29.00</span><span class="old">￥54.00</span></div>
							<div class="num">已售100件</div>
						</div>
						<div class="shop_car"></div>
					</div>
				</div>
			</div>
			<div class="goods">
				<img class="goods_pic" src="../../assets/images/sellergoods.png" alt="">
				<div class="goods_info">
					<h3>FANKEC狗狗火腿肠150g</h3>
					<div class="goods_price flex_r_s_b">
						<div class="left">
							<div class="money"><span class="new">￥29.00</span><span class="old">￥54.00</span></div>
							<div class="num">已售100件</div>
						</div>
						<div class="shop_car"></div>
					</div>
				</div>
			</div>
		</div>
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

<style lang="scss">
	@import '../../style/mixin.scss';
	.sellerGoods_warp{
		padding-bottom:20px;
		.goods_list{
			padding: 0 20px;
			flex-wrap:wrap;
			box-sizing:border-box;
			.goods{
				
				border:1px solid rgba(232,232,232,1);
				margin-top: 16px;
				box-sizing:border-box;
				padding: 20px 20px 20px 10px;
				.goods_pic{
					width: 290px;
					height: 180px;
					display: block;
					margin: 0 auto;
				}
				.goods_info{
					h3{
						font-size: 24px;
						color: #010000;
						margin-top: 36px;
						margin-bottom: 22px;
					}
					.goods_price{
						.left{
							.money{
								.new{
									font-size: 28px;
									color: #FF523D;
									margin-right: 5px;
								}
								.old{
									text-decoration:line-through;
									font-size: 21px;
									color: #333;
								}
							}
							.num{
								font-size: 21px;
								color: #666;
								margin-top: 13px;
							}
						}
						.shop_car{
							height: 60px;
							width: 60px;
							border-radius: 50%;
							@include bg-image("icon-car");
							background-size: cover;
						}
					}
				}
			}
			
			
		}
	}
</style>
