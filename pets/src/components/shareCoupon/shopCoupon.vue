<template>
	<div class="shopCoupon">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">店铺优惠券</div>
			<div class="share" @click="share"></div>
		</div>
		<div class="shopBox flex_c_f_e">
			<img class="shopImg" src="../../assets/head_icon.png" alt="">
			<div class="shopName">成华双庆宠物生活馆</div>
			<a href="###" class="addr flex_r_f_s">
				<img src="../../assets/icon/map@2x.png" alt="">
				<p>成都市锦江区东恒国际二栋二单元1104fdgfgfgfdgfd</p>
			</a>
		</div>
		<div class="couponListBox">
			<cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
			<ul>
				<li class="flex_r_s_b" v-for="item in arr">
					<div class="list_l">
						<div class="listLeftTop flex_r_s_b">
							<img src="../../assets/images/seller_pic.png" alt="">
							<div class="couponNameBox">
								<div class="couponName">强生宠儿全系列狗粮线下店铺优惠券</div>
								<div class="progressBox flex_r_s_b">
									<div class="progress">
										<div></div>
									</div>
									<span>剩余60%</span>
								</div>
							</div>
						</div>
					</div>
					<div class="list_r">
						<div class="sale">￥5</div>
						<div class="condition">满100元可用</div>
						<div class="makeTime">2019/04/23前有效</div>
						<div class="receiveBtnBox">
							<div class="receiveBtn flex_r_s_c">立即领取</div>
							<div v-show="false" class="receiveBtn receivedBtn flex_r_s_c">以领取</div>
							<div v-show="false" class="receiveBtn receivedBtn flex_r_s_c">立即领取</div>
						</div>
						
					</div>
					<!-- <img class="imprint" src="../../assets/received.png" alt="">
					<img class="imprint" src="../../assets/receiveEnd.png" alt=""> -->
				</li>
			</ul>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return{
				arr:[1,2,3,4,5,6,7],
				options:{
					pullDownRefresh:{
						txt:'更新成功',
						threshold:40
					},
					pullUpLoad:{
						txt:{
							more: '加载更多', noMore: '没有更多数据了',
						},
						threshold:40,
						
					}
				},
			}
		},
		methods:{
			back() {
				this.$router.go(-1); //返回上一层
			},
			share(){
				let toast = this.$createToast({
					txt: '点击顶部右上角进行分享',
					type: 'warn'
				  })
				toast.show()
			},
			onPullingDown(){
				//刷新
			},
			onPullingUp(){
				//加载
			}
		}
	}
</script>

<style lang="scss">
	.shopCoupon{
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			z-index: 100;
			border-bottom: 1px solid #ff523d;/*no*/
			.back {
				width: 26px;
				height: 42px;
				background: url(../../assets/icon/backColory.png) no-repeat center 0;
				background-size: cover;
			}
		
			.nav_title {
				font-size: 30px;
				color: #000;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				font-weight:400;
			}
			.share{
				width: 50px;
				height: 40px;
				background: url('../../assets/icon/active_share.png') no-repeat center 0;
				background-size: 100%;
			}
		}
		.shopBox{
			height: 400px;
			align-content:space-between;
			justify-content:center;
			// background: red;
			.shopImg{
				width: 120px;
				height: 120px;
				border-radius: 50%;
			}
			.shopName{
				color: #000;
				font-size: 30px;
				padding-top: 30px;
			}
			.addr{
				padding-top: 20px;
				width: 445px;
				// display: block;
				// align-items: flex-start;
				img{
					width: 18px;
					margin-right: 14px;
				}
				p{
					font-size: 24px;
					color: #666;
					line-height: 44px;
				}
			}
		}
		.couponListBox{
			position:absolute;
			top: 489px;
			bottom: 0;
			left: 0;
			right: 0;
			ul{
				padding:0 20px 10px 20px;
				overflow: hidden;
				li{
					margin-top: 30px;
					align-items:flex-start;
					padding: 30px 20px;
					overflow: hidden;
					background: #fff;
					position: relative;
					box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
					border-radius:10px;
					box-sizing: border-box;
					.list_l{
						width: 430px;
						.listLeftTop{
							align-items:flex-start;
							img{
								width: 178px;
								height: 178px;
								border-radius: 10px;
							}
							.couponNameBox{
								width: 220px;
								.couponName{
									font-size: 26px;
									color: #000;
									line-height: 40px;
								}
								
								.progressBox{
									padding-top: 80px;
									.progress{
										position: relative;
										width:100px;
										height:12px;
										background:#eee;
										border-radius:10px;
										div{
											width: 50%;
											height: 100%;
											background: #ff523d;
											border-radius: 10px;
										}
									}
									span{
										font-size: 22px;
										color: #666;
									}
								}
							}
						}
						.addr{
							padding-top: 35px;
							
							img{
								width: 18px;
								margin-right: 12px;
							}
							p{
								font-size: 24px;
								color: #666;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								width:385px;
							}
						}
					}
					.list_r{
						.sale{
							font-size: 60px;
							color: #ff523d;
							text-align: center;
						}
						.condition{
							color: #ff523d;
							text-align: center;
							font-size: 22px;
							padding-top: 15px;
						}
						.makeTime{
							font-size: 22px;
							color: #999;
							padding-top: 20px;
						}
						.receiveBtnBox{
							padding-top: 12px;
							.receiveBtn{
								margin: 0 auto;
								width:120px;
								height:40px;
								background:#ff523d;
								border-radius:6px; 
								color: #fff;
								font-size: 26px;
							}
							.receivedBtn{
								background:#B0B0B0;
							}
							
						}
						.saleNum{
							font-size: 22px;
							color: #999;
							padding-top: 20px;
							text-align: center;
						}
					}
					.imprint{
						position: absolute;
						width: 130px;
						height: 130px;
						top: -28px;
						right: -20px;
					}
				}
			}
		}
	}
</style>
