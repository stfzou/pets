<template>
	<div class="seller_eval">
		<div class="eval_nav flex_r_s_b">
			<router-link :to="item.link" :key="index" v-for="(item,index) in evalData">
				<span class="span1">{{item.text}}</span>
				<span class="span2">{{item.num}}</span>
			</router-link>
		</div>
		<div class="line"></div>
		<div class="eval_content">
			<cube-scroll>
			<ul class="eval_list">
				<li class="flex_r_s_b list_item">
					<div class="head_icon"></div>
					<div class="right">
						<div class="r_top flex_r_s_b">
							<div class="r_top_l">
								<div class="user_name">自**然</div>
								<div class="text">不错！狗狗很喜欢吃</div>
							</div>
							<div class="star">***</div>
						</div>
						<div class="eval_pic flex_r_s_b">
							<img src="../../assets/images/sellergoods.png" alt="">
							<img src="../../assets/images/sellergoods.png" alt="">
							<img src="../../assets/images/sellergoods.png" alt="">
							<img src="../../assets/images/sellergoods.png" alt="">
							<img src="../../assets/images/sellergoods.png" alt="">
						</div>
						<div class="data">2018.03.21 &nbsp;&nbsp;&nbsp;12:23</div>
					</div>
				</li>
				<li class="flex_r_s_b list_item">
					<div class="head_icon"></div>
					<div class="right">
						<div class="r_top flex_r_s_b">
							<div class="r_top_l">
								<div class="user_name">自**然</div>
								<div class="text">不错！狗狗很喜欢吃</div>
							</div>
							<div class="star">***</div>
						</div>
						<div class="eval_pic flex_r_s_b">
							<img src="../../assets/images/sellergoods.png" alt="">
							<img src="../../assets/images/sellergoods.png" alt="">
							<img src="../../assets/images/sellergoods.png" alt="">
							<img src="../../assets/images/sellergoods.png" alt="">
							<img src="../../assets/images/sellergoods.png" alt="">
						</div>
						<div class="data">2018.03.21 &nbsp;&nbsp;&nbsp;12:23</div>
					</div>
				</li>
				<li class="flex_r_s_b list_item">
					<div class="head_icon"></div>
					<div class="right">
						<div class="r_top flex_r_s_b">
							<div class="r_top_l">
								<div class="user_name">自**然</div>
								<div class="text">不错！狗狗很喜欢吃</div>
							</div>
							<div class="star">***</div>
						</div>
						<div class="data">2018.03.21 &nbsp;&nbsp;&nbsp;12:23</div>
					</div>
				</li>
			</ul>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				evalData:[
					{
						link:'',
						text:'全部',
						num:453
					},
					{
						link:'',
						text:'有图',
						num:26
					},
					{
						link:'',
						text:'好评',
						num:365
					},
					{
						link:'',
						text:'中评',
						num:35
					},
					{
						link:'',
						text:'差评',
						num:4
					}
				]
			};
		},
		mounted() {
			var line = doucment.querySelector(".line");
			var top = line.offsetTop();
			var height = line.offsetHeight();
			var evalC = doucment.querySelector(".eval_content");
			evalC.style.top = top + height + 'px'; 
		}
	}
</script>

<style lang="scss">
	.seller_eval{
		padding-bottom: 20px;
		.eval_nav{
			padding: 0 20px 30px 20px;
			box-sizing: border-box;
			flex-wrap: wrap;
			
			a{
				width: 149px;
				height: 38px;
				border:1px solid #999;/*no*/
				border-radius: 26px;
				text-align: center;
				line-height: 38px;
				margin-top: 30px;
			}
			a.router-link-active{
				//color: #FF523D;
				//border:1px solid #FF523D;/*no*/
			}
		}
		.line{
			height: 10px;
			background: #e8e8e8;
		}
		.eval_content{
			height: 500px;
			position: absolute;
			bottom: 0;
			
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
		}
	}
</style>
