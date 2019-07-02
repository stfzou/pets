<template>
	<div class="couponList">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">店铺优惠券</div>
			<div class="share" @click="share"></div>
		</div>
		<div class="selectNav flex_r_f_e">
			<div class="item">
				<span>距离范围</span>
				<img src="../../assets/icon/blank_btom.png" alt="">
			</div>
			<div class="item">
				<span>优惠面额</span>
				<img src="../../assets/icon/blank_btom.png" alt="">
			</div>
			<div class="item">
				<span>使用条件</span>
				<img src="../../assets/icon/blank_btom.png" alt="">
			</div>
			<div class="distanceSelect subNav" v-show="false">
				<ul>
					<li class="flex_r_s_b" :class="{active:index==distanceIndex}" v-for="(item,index) in distanceList"><span>{{item}}</span><img v-if="index==distanceIndex" src="../../assets/select.png" alt=""></li>
				</ul>
			</div>
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
								<div class="distance">距离0.4km</div>
								<div class="progressBox flex_r_s_b">
									<div class="progress">
										<div></div>
									</div>
									<span>剩余60%</span>
								</div>
							</div>
						</div>
						<div class="addr flex_r_f_s">
							<img src="../../assets/icon/map@2x.png" alt="">
							<p>成都市锦江区东恒国际二栋二单元1104fdgfgfgfdgfd</p>
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
						<div class="saleNum">商家共6种优惠券</div>
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
				distanceList:['1km','2km','3km','4km','5km'],
				arr:[1,2,3,4,5,6,7],
				distanceIndex:0,
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
	.couponList{
		position: relative;
		height: 100%;
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
		.selectNav{
			height: 68px;
			border-bottom: 1px solid #bbbbbb;/*no*/
			position: relative;
			.item{
				span{
					color: #000;
					font-size: 28px;
				}
				img{
					width: 16px;
				}
			}
			.subNav{
				position: absolute;
				top: 69px;
				left: 0;
				width: 100%;
				box-sizing: border-box;
				background: #fff;
				ul{
					padding:20px;
					li{
						padding:10px 0;
						img{
							width: 28px;
						}
						span{
							font-size: 26px;
							color: #333;
						}
					}
					.active{
						span{
							color: #ff523d;
						}
					}
				}
			}
		}
		.couponListBox{
			position:absolute;
			top: 157px;
			bottom: 0;
			left: 0;
			right: 0;
			background: #f5f5f5;
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
								.distance{
									font-size: 22px;
									color: #666;
									margin-top: 35px;
								}
								.progressBox{
									padding-top: 24px;
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
							padding-top: 18px;
						}
						.makeTime{
							font-size: 22px;
							color: #999;
							padding-top: 24px;
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
