<template>
	<div class="goodsDetails_warp">
		<div class="goodsDetails_nav">
			
			<div class="back"></div>
			<div class="nav_txt flex_r_s_b">
				<a href="###">商品</a>
				<a href="###">评论</a>
				<a href="###">详情</a>
			</div>
		</div>
		<div class="goodsDetails_slide">
			<cube-slide ref="slide" :data="slidItems">
				  <cube-slide-item v-for="(item, index) in slidItems" :key="index">
					<a href="###">
					  <img :src="item.url">
					</a>
				  </cube-slide-item>
			</cube-slide>
		</div>
		<div class="countdown flex_r_s_b">
			<div class="countdown_l">
				<span class="new">￥<b>75.00</b></span>
				<span class="old">￥105.00</span>
			</div>
			<div class="countdown_r">
				<div class="countdown_time">距离结束<span>00:45:56</span></div>
				<div class="progress_box flex_r_s_b">
					<div class="progress">
						<div class="progress_line" :style="'width:'+ 80 +'%;'"></div>
					</div>
					
					<div class="sale">已售54%</div>
				</div>
			</div>
		</div>
		<div class="product_name">疯狂的小狗博美专用狗粮1.5KG*2包幼犬成犬粮小型犬美毛去泪痕6斤</div>
		<div class="line"></div>
		<div class="discount">
			<ul>
				<li class="flex_r_f_s right_bg">
					<div class="list_title">优惠</div>
					<div class="mj flex_r_f_s">
						<span>满99减5</span>
						<span>满199减10</span>
					</div>
				</li>
				<li class="flex_r_f_s right_bg">
					<div class="list_title">已选</div>
					<div class="parameter">
						<span>1.5kg</span>,
						<span>鸡肉味</span>
					</div>
				</li>
				<li class="flex_r_f_s right_bg">
					<div class="list_title">参数</div>
					<div class="parameter">
						<span>小型犬</span>,
						<span>牛肉味</span>,
						<span>幼犬期</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="line"></div>
		<div class="addr">
			<ul>
				<li class="flex_r_f_s right_bg">
					<div class="list_title">送至</div>
					<div class="address flex_r_f_s">
						<img src="../../assets/icon/map@2x.png" alt="">
						<span>四川成都市锦江区锦华路三段</span>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_title">服务</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span>30分钟送达</span>
							<span>2KM内免费送货上门</span>
						</div>
						<p>18:00下单，最快今日18：45送达;</p>
						<p>该商家支持送货上门，订单金额未满88元将收取6元上门费；</p>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_title">运费</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span>同城快递5元</span>
							<span>满88包邮</span>
							<span>商家包邮</span>
						</div>
						<p>商家承诺下单付款后12小时内完成发货</p>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_title">自提</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span>该商家支持上门自提</span>
						</div>
						<p>商家营业时间9：30--22：00</p>
					</div>
				</li>
				
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				slidItems:[
					{
						url: require('../../assets/banner.png')
					},
					{
						url:require('../../assets/banner.png')
					},
					{
						url:require('../../assets/banner.png')
					}
				]
			}
		},
		mounted() {
			
		},
		methods:{
			

		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.goodsDetails_warp{
		.goodsDetails_nav{
			height: 88px;
			position: relative;
			border-bottom: 1px solid #ff523d;
			.back{
				width: 26px;
				height: 42px;
				background:url(../../assets/icon/backColory.png) no-repeat center 0;
				background-size: cover;
				position: absolute;
				left: 20px;
				top: 50%;
				margin-top: -21px;
			}
			.nav_txt{
				height: 88px;
				margin: 0 auto;
				width: 316px;
				a{
					font-size: 30px;
					color: #000;
				}
			}
		}
		.goodsDetails_slide{
			height: 720px;
			.cube-slide-dots>span{
				height: 22px;
				width: 22px;
				border-radius: 50%;
				margin: 0 6px;
				background:#fff;
			}
			.cube-slide-dots>span.active{
				background: #ff523d;
			}
			.cube-slide-dots{
				bottom: 20px;
			}
		}
		.countdown{
			height: 90px;
			background: #ff523d;
			padding: 0 20px;
			box-sizing: border-box;
			.countdown_l{
				height: 90px;
				width: 230px;
				line-height: 90px;
				span{
					font-size: 24px;
					color: #fff;
					
				}
				.old{
					text-decoration:line-through;
					margin-left: 10px;
				}
				.new{
					b{
						font-size: 34px;
					}
					
				}
			}
			.countdown_r{
				height: 90px;
				width: 300px;
				.countdown_time{
					font-size: 24px;
					color: #fff;
					padding-top: 15px;
					text-align: right;
					margin-bottom: 10px;
					span{
						margin-left: 10px;
					}
					
				}
				.progress_box{
					overflow: hidden;
					.progress{
						position: relative;
						height: 28px;
						border: 1px solid #fff;
						padding: 1px;
						overflow: hidden;
						background: #fff;
						width: 182px;
						border-radius: 30px;
						.progress_line{
							height:100%;
							background: #ff523d;
							border-radius: 30px;
						}
					}
					.sale{
						font-size: 24px;
						color: #fff;
					}
				}
				
			}
		}
		.product_name{
			padding:20px;
			font-size: 26px;
			color: #000;
			line-height: 40px;
			font-weight:400;
		}
		.line{
			@include line;
		}
		.list_title{
			font-size:26px;
			color: #666;
			margin-right: 30px;
			width: 80px;
		}
		.right_bg{
			background: url(../../assets/icon/right_sjx.png) no-repeat 100% center;
			background-size: 14px;
		}
		.discount{
			ul{
				padding: 12px 20px;
				li{
					
					height: 62px;
					.mj{
						span{
							padding: 0 14px;
							height:36px;
							border:1px solid #FF523D;
							border-radius:6px;
							color: #ff523d;
							font-size: 24px;
							line-height: 36px;
							margin-right: 10px;
						}
					}
					.parameter{
						span{
							font-size: 26px;
							color: #000;
						}
					}
				}
			}
		}
		.addr{
			ul{
				padding: 15px 20px;
				li{
					padding: 15px 0;
					
					.address{
						height: 38px;
						img{
							width: 18px;
							margin-right: 5px;
						}
						span{
							font-size: 24px;
							color: #000;
						}
					}
					.service{
						.service_label{
							margin-bottom: 5px;
							span{
								padding: 0 14px;
								height:36px;
								border:1px solid #FF523D;
								border-radius:6px;
								color: #ff523d;
								font-size: 24px;
								line-height: 36px;
								margin-right: 10px;
							}
						}
						p{
							font-size: 22px;
							color: #999;
							line-height: 30px;
						}
					}
				}
			}
		}
	}
</style>
