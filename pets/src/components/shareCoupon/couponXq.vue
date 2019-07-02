<template>
	<div class="couponXq">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">店铺优惠券</div>
			<div class="share" @click="share"></div>
		</div>
		<div class="couponInfoBox flex_r_s_c">
			<div class="couponInfo">
				<div class="couponTop">
					<img class="couponImg" src="../../assets/images/seller_pic.png" alt="">
					<div class="couponName">强生宠儿全系列狗粮线下店铺优惠券</div>
					<p>强生宠儿全系列狗粮产品购买订单购满100元均可使用</p>
					<div class="sale">￥5</div>
					<div class="condition">满100元可用</div>
					<div class="receiveBtnBox">
						<div class="receiveBtn flex_r_s_c">立即领取</div>
						<div v-show="false" class="receiveBtn receivedBtn flex_r_s_c">以领取</div>
						<div v-show="false" class="receiveBtn receivedBtn flex_r_s_c">立即领取</div>
					</div>
				</div>
				<div class="couponBottom">
					<div class="posL"></div>
					<div class="posR"></div>
					<ul>
						<li class="flex_r_f_s">
							<div class="listLeft">
								商户
							</div>
							<div class="listRight">
								成华双庆宠物生活馆
							</div>
						</li>
						<li class="flex_r_f_s">
							<div class="listLeft">
								地址
							</div>
							<div class="listRight flex_r_s_b">
								<span>成都市锦江区东恒国际二栋二单元11111111111111</span>
								<img class="addrImg" src="../../assets/couponAddr.png" alt="">
							</div>
						</li>
						<li class="flex_r_f_s">
							<div class="listLeft">
								距离
							</div>
							<div class="listRight">
								0.4km
							</div>
						</li>
						<li class="flex_r_f_s">
							<div class="listLeft">
								有效期
							</div>
							<div class="listRight">
								2019/04/23前有效
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="moreCoupon">
			该商户更多优惠券
		</div>
		<div class="couponListBox">
			
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
	.couponXq{
		position: relative;
		height: 100%;
		overflow: auto;
		background: linear-gradient(150deg, #fdb366, #fbab72, #ff8c60, #ff6060);
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			z-index: 100;
			.back {
				width: 26px;
				height: 42px;
				background: url(../../assets/icon/back@2x.png) no-repeat center 0;
				background-size: cover;
			}
			.nav_title {
				font-size: 30px;
				color: #fff;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				font-weight:400;
			}
			.share{
				width: 50px;
				height: 40px;
				background: url('../../assets/icon/share@2x.png') no-repeat center 0;
				background-size: 100%;
			}
		}
		.couponInfoBox{
			height: 900px;
			.couponInfo{
				width: 590px;
				background: #fff;
				border-radius: 10px;
				overflow: hidden;
				.couponTop{
					padding: 40px 20px 50px 20px;
					img{
						width: 178px;
						height: 178px;
						display: block;
						margin: 0 auto;
					}
					.couponName{
						text-align: center;
						color: #000;
						font-size: 28px;
						padding-top: 40px;
					}
					p{
						font-size: 22px;
						color: #666;
						padding-top: 20px;
						text-align: center;
					}
					.sale{
						font-size: 60px;
						color: #ff523d;
						padding-top: 60px;
						text-align: center;
					}
					.condition{
						font-size: 24px;
						color: #ff523d;
						padding-top: 15px;
						text-align: center;
					}
					.receiveBtnBox{
						padding-top: 40px;
						.receiveBtn{
							margin: 0 auto;
							width:240px;
							height:50px;
							background:#ff523d;
							border-radius:25px;
							color: #fff;
							font-size: 26px;
						}
						.receivedBtn{
							background:#B0B0B0;
						}
						
					}
				}
				.couponBottom{
					position: relative;
					border-top: 1px dashed #e8e8e8;/*no*/
					.posL{
						width: 40px;
						height: 40px;
						border-radius: 50%;
						background: #fd9d6a;
						left: -22px;
						top: -21px;
						position: absolute
					}
					.posR{
						width: 40px;
						height: 40px;
						border-radius: 50%;
						background: #ff8c60;
						right: -22px;
						top: -20px;
						position: absolute;
					}
					ul{
						padding:20px;
						li{
							height: 52px;
							font-size: 24px;
							.addrImg{
								width: 22px;
							}
							.listLeft{
								margin-right: 18px;
								color: #333;
							}
							.listRight{
								color: #000;
								width: 460px;
							}
							span{
								display: inline-block;
								width: 400px;
								white-space: nowrap;
								overflow: hidden;
								height: 52px;
								line-height: 52px;
								text-overflow: ellipsis;
							}
						}
					}
				}
			}
		}
		.moreCoupon{
			height: 68px;
			line-height: 68px;
			text-align: center;
			font-size: 24px;
			color: #fff;
		}
		.couponListBox{
			// height: 200px;
			ul{
				padding:0 20px 10px 20px;
				overflow: hidden;
				li{
					margin-bottom: 30px;
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
