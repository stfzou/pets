<template>
	<div class="orderAccounts">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">订单结算</div>

		</div>
		<div class="addr_box">
			<div class="addr">
				<div class="addr_name">
					<span>自由犬</span>
					<span class="phone">183******4123</span>
				</div>
				<div class="addr_text flex_r_f_s">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span class="addr_cnt">四川省成都市成华区牛王庙东恒国际</span>
					<div class="mr flex_r_s_c">默认</div>
				</div>
			</div>
			<div class="addr_line"></div>
		</div>
		<div class="orderList_box">
			<ul class="order_list">
				<li>
					<div class="shopName flex_r_f_s">
						<img src="../../assets/icon_dianpu.png" alt="">
						<span>成都自由犬</span>
					</div>
					<div class="goodsInfo flex_r_s_b">
						<img class="goods_img" src="../../assets/head_icon.png" alt="">
						<div class="goodsInfo_r">
							<div class="goodsName">比瑞吉10kg小型犬成犬天然狗粮泰迪贵宾博美比熊犬主粮小狗粮20斤</div>
							<div class="one_price flex_r_s_b">
								<span class="price_l">￥420.00</span>
								<span class="price_r">x1</span>
							</div>
						</div>
					</div>
					<div class="delivery_style flex_r_s_b">
						<span>配送方式</span>
						<span>快递，费用￥6.00</span>
					</div>
					<div class="yuyue flex_r_s_b" @click="showTimePicker">
						<span>预约送货上门时间</span>
						<span>今天18:30</span>
					</div>
					<div class="bz">（备注:营业时间为9:00-18:00）</div>
					<div class="discount flex_r_f_s">
						<span>优惠券</span>
						<span class="discount_ridus flex_r_s_c">暂无可用优惠券</span>
					</div>
				</li>
			</ul>
			<div class="integral flex_r_s_b">
				<span class="integral_l">使用100积分，抵用1.00元</span>
				<cube-switch v-model="val">

				</cube-switch>
			</div>
			<div class="detailed_list">
				<div class="detailed_box flex_r_s_b">
					<div class="detailed_l">商品总价</div>
					<div class="detailed_r">￥420.00</div>
				</div>
				<div class="detailed_box flex_r_s_b">
					<div class="detailed_l">运费</div>
					<div class="detailed_r"><span>+</span>￥8.00</div>
				</div>
				<div class="detailed_box flex_r_s_b">
					<div class="detailed_l">立减</div>
					<div class="detailed_r"><span>-</span>￥420.00</div>
				</div>
			</div>
		</div>
		<div class="order_foot flex_r_s_b">
			<div class="foot_l">待支付:￥413.00</div>
			<div class="c_btn flex_r_s_c">确认订单</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				val: ''
			}
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			showTimePicker() {
				this.$createTimePicker({
					showNow: true,
					minuteStep: 1,
					delay: 1,
					onSelect: (selectedTime, selectedText, formatedTime) => {
						this.$createDialog({
							type: 'warn',
							title: `selected time: ${selectedTime}`,
							content: `selected text: ${selectedText}<br>format time: ${formatedTime}`,
							icon: 'cubeic-alert'
						}).show()
					},
					onCancel: () => {
						this.$createToast({
							type: 'correct',
							txt: 'Picker canceled',
							time: 1000
						}).show()
					}
				}).show()
			}
		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';

	.orderAccounts {
		padding-bottom: 126px;

		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: relative;
			border-bottom: 1px solid #FF523D;

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

			}

			.text {
				font-size: 26px;
				color: #FF523D;
			}
		}

		.addr_box {
			.addr_line {
				height: 6px;
				background: url("../../assets/bg_line.png") no-repeat center 0;
				background-size: cover;
			}

			.addr {
				padding: 40px;
				background: url('../../assets/icon/right_sjx.png') no-repeat 646px center;
				background-size: 15px;

				.addr_name {
					span {
						font-size: 30px;
						color: #000;
					}

					.phone {
						margin-left: 104px;
					}
				}

				.addr_text {
					margin-top: 22px;

					.addr_cnt {
						font-size: 24px;
						color: #FF523D;
						margin-left: 18px;
						margin-right: 28px;

					}

					img {
						width: 18px;
					}

					.mr {
						width: 56px;
						height: 30px;
						background: #FF523D;
						color: #fff;
						font-size: 24px;
						border-radius: 6px;
					}
				}
			}
		}

		.orderList_box {
			padding: 0 20px;

			.cube-switch .cube-switch-input:checked+.cube-switch-ui {
				border-color: #FF523D;
				background-color: #FF523D;
			}

			.order_list {
				li {
					box-shadow: 0px 0px 7px 0px rgba(104, 104, 104, 0.12);
					border-radius: 10px;
					margin-top: 30px;
					padding-bottom: 30px;

					.shopName {
						padding: 20px 10px;
						box-sizing: border-box;

						img {
							width: 46px;
						}

						span {
							font-size: 26px;
							color: #000;
							margin-left: 24px;
						}
					}

					.goodsInfo {
						background: #fef7f6;
						padding: 15px 24px 15px 30px;
						box-sizing: border-box;

						.goods_img {
							width: 100px;
							margin-right: 60px;
						}

						.goodsInfo_r {
							.goodsName {
								line-height: 34px;
								color: #000;
								font-size: 26px;
							}

							.one_price {
								font-size: 28px;
								margin-top: 50px;

								.price_l {
									color: #FF523D;
								}

								.price_r {
									color: #000;
								}
							}
						}


					}

					.delivery_style {
						height: 60px;
						font-size: 26px;
						color: #000;
						padding-right: 40px;
						box-sizing: border-box;
						margin-top: 16px;
						background: url("../../assets/icon/right_sjx.png") no-repeat 98% center;
						background-size: 14px;
						padding-left: 10px;
					}

					.yuyue {
						height: 60px;
						font-size: 26px;
						color: #000;
						padding-right: 40px;
						box-sizing: border-box;
						background: url("../../assets/icon/right_sjx.png") no-repeat 98% center;
						background-size: 14px;
						padding-left: 10px;
					}
					.bz{
						height: 40px;
						font-size: 24px;
						color:#666;
						padding-right: 40px;
						// padding-left: 10px;
					}
					.discount {
						font-size: 26px;
						color: #000;
						padding-right: 40px;
						height: 60px;
						box-sizing: border-box;
						background: url("../../assets/icon/right_sjx.png") no-repeat 98% center;
						background-size: 14px;
						padding-left: 10px;

						.discount_ridus {
							height: 30px;
							color: #FF523D;
							border: 1px solid #FF523D;
							/*no*/
							padding: 2px;
							border-radius: 20px;
							width: 200px;
							margin-left: 15px;
						}
					}
				}
			}

			.integral {
				padding: 30px 40px 30px 10px;
				box-shadow: 0px 0px 7px 0px rgba(104, 104, 104, 0.12);
				border-radius: 10px;
				font-size: 26px;
				color: #000;
				box-sizing: border-box;
				margin-top: 30px;
			}

			.detailed_list {

				box-shadow: 0px 0px 7px 0px rgba(104, 104, 104, 0.12);
				border-radius: 10px;
				margin-top: 30px;

				.detailed_box {
					height: 60px;
					font-size: 26px;
					color: #000;
					padding: 15px 40px 15px 10px;
					box-sizing: border-box;
					background: url("../../assets/icon/right_sjx.png") no-repeat 98% center;
					background-size: 14px;

					span {
						color: #FF523D;
					}
				}
			}
		}

		.order_foot {
			height: 96px;
			position: fixed;
			left: 0;
			bottom: 0;
			border-top: 1px solid #FF523D;
			/*no*/
			background: #fff;
			padding: 0 20px;
			box-sizing: border-box;

			.foot_l {
				font-size: 26px;
				color: #000;
			}

			.c_btn {
				width: 182px;
				height: 70px;
				background: #FF523D;
				color: #fff;
				font-size: 26px;
				border-radius: 7px;
			}
		}
	}
</style>
