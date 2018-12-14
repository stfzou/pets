<template>
	<ul class="eval_list">
		<li class="flex_r_s_b list_item" v-for="(item,index) in evalData" :key="index">
			<div class="head_icon"></div>
			<div class="right">
				<div class="r_top flex_r_s_b">
					<div class="r_top_l">
						<div class="user_name">自**然{{item}}</div>
						<div class="text">不错！狗狗很喜欢吃</div>
					</div>
					<div class="star">
						<cube-rate v-model="star" :disabled="disabled">
							
						</cube-rate>
						
					</div>
				</div>
				<div class="eval_pic flex_r_s_b">
					<img src="../../assets/images/sellergoods.png" alt="">
					<img src="../../assets/images/sellergoods.png" alt="">
					<img src="../../assets/images/sellergoods.png" alt="">
					<img src="../../assets/images/sellergoods.png" alt="">
					
				</div>
				<div class="data">2018.03.21 &nbsp;&nbsp;&nbsp;12:23</div>
			</div>
		</li>
		
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				star:3.5,
				disabled:true,
				evalData:[1,2,3,4,5,6],
				currnt:0
			};
		}
	}
</script>

<style lang="scss">
	.eval_list{
		height: auto;
		
		.list_item{
			padding: 30px 20px;
			box-sizing: border-box;
			
			align-items:flex-start;
			border-bottom: 1px solid #e8e8e8;/*no*/
			.head_icon{
				height: 90px;
				width: 90px;
				border-radius: 50%;
				background: #FFDFDF;
			}
			.right{
				width: 82%;
				.r_top{
					align-items:flex-start;
					.r_top_l{
						.user_name{
							font-size: 24px;
							color: #333;
						}
						.text{
							font-size: 26px;
							color: #000;
							margin-top: 26px;
						}
						
					}
					.cube-rate-item{
						height: 24px;
						width: 25px;
						
					}
				}
				.data{
					font-size: 20px;
					color: #999;
					margin-top: 40px;
				}
				.eval_pic{
					margin-top: 30px;
					img{
						width: 120px;
					}
					
				}
			}
		}
	}
</style>
