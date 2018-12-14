<template>
	<div class="seller_info_warp">
		<div class="seller_info">
			<h2>商家信息</h2>
			<div class="seller_pic">
				<img src="../../assets/images/seller_pic.png" alt="">
				<img src="../../assets/images/seller_pic.png" alt="">
			</div>
			<div class="text">
				商家简介：自由犬宠物用品主要针对宠物主粮、宠物零食宠物玩具等系列产品的线上及线下的销售服务，为消费者带来更好的购物体验。
			</div>
		</div>
		<div class="line"></div>
		<div class="seller_info_list">
			<div class="flex_r_s_b">
				<span>商家名称</span>
				<span>自由宠物犬用品</span>
			</div>
			<div class="flex_r_s_b">
				<span>经营品类</span>
				<span>商品销售</span>
			</div>
			<div class="flex_r_s_b">
				<span>商家地址</span>
				<span>成都市东恒国际二栋</span>
			</div>
			<div class="flex_r_s_b none">
				<span>经营时间</span>
				<span>9:00-18:00</span>
			</div>
		</div>
		<div class="line"></div>
		<div class="zizhi">
			<div class="flex_r_s_b">
				<span>经营资质</span>
				<i class="cubeic-arrow"></i>
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
	.seller_info_warp{
		.seller_info{
			padding:20px;
			h2{
				font-size: 28px;
				color: #000;
				margin-bottom: 16px;
			}
			.seller_pic{
				font-size: 0;
				margin-bottom: 16px;
				img{
					height: 150px;
					width: 150px;
					border-radius: 6px;
					margin-right: 16px;
				}
				
			}
			.text{
				color: #000;
				line-height: 36px;
				font-size: 26px;
			}
		}
		.line{
			@include line;
		}
		.seller_info_list{
			padding: 0 20px;
			div{
				height:66px;
				border-bottom: 1px solid #e8e8e8;/*no*/
				box-sizing: border-box;
				span{
					font-size: 28px;
					color: #000;
				}
			}
			.none{
				border: none;
			}
		}
		.zizhi{
			box-sizing: border-box;
			padding: 0 20px;
			div{
				
				height: 66px;
				border-bottom: 1px solid #e8e8e8;/*no*/
				span{
					font-size: 28px;
					color: #000;
				}
				i{
					font-size: 22px;
					color: #000;
				}
			}
			
		}
	}
</style>
