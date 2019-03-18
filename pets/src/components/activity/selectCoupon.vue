<template>
	<div class="selectCoupon">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">选择票券</div>
		</div>
		<div class="couponInfo flex_r_s_b">
			<div class="c_l">
				<img src="../../assets/images/seller_pic.png" alt="">
			</div>
			<div class="c_r">
				<div class="activiName">关爱萌宠给它一个宠物智能“芯身份证”</div>
				<div class="price">￥100~200</div>
				<div class="time">04/19~04/22</div>
				<div class="address flex_r_f_s">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span>牛王庙 &nbsp;&nbsp;&nbsp;1.3km</span>
				</div>
			</div>
		</div>
		<div class="couponList">
			<ul>
				<li class="active">
					 <img class="select" src="../../assets/icon/selectCoupon.png" alt="">
					<div class="couponName">关爱萌宠给它一个宠物智能“芯身份证”外场票</div>
					<div class="couponBox flex_r_s_b">
						<div class="couponBox_l">
							<div class="price">￥100</div>
							<div class="couponNum">
								<span>剩余50张</span>
								<span>每人限购1张</span>
							</div>
							<div class="special_tx">
								购买此票券可获得额外奖品
							</div>
							<div class="tx">【购买此票券需经过主办方审核】</div>
						</div>
						<div class="couponBox_r">
							<div class="num_box flex_r_f_s">
								<div class="add flex_r_s_c" style="width: 33.333%;">
									<img src="../../assets/reduce.png" alt="">
								</div>
								<input style="width: 33.333%;" type="text" v-model="val">
								<div style="width: 33.333%;" class="reduce flex_r_s_c">
									<img src="../../assets/add.png" alt="">
								</div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="couponName">关爱萌宠给它一个宠物智能“芯身份证”外场票</div>
					<div class="couponBox flex_r_s_b">
						<div class="couponBox_l">
							<div class="price">￥100</div>
							<div class="couponNum">
								<span>剩余50张</span>
								<span>每人限购1张</span>
							</div>
							<div class="special_tx">
								购买此票券可获得额外奖品
							</div>
							<div class="tx">【购买此票券需经过主办方审核】</div>
						</div>
						<div class="couponBox_r">
							<div class="num_box flex_r_f_s">
								<div class="add flex_r_s_c" style="width: 33.333%;">
									<img src="../../assets/reduce.png" alt="">
								</div>
								<input style="width: 33.333%;" type="text" v-model="val">
								<div style="width: 33.333%;" class="reduce flex_r_s_c">
									<img src="../../assets/add.png" alt="">
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="couponBtn flex_r_s_c">下一步</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				val:'1'
			}
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			add(subItem) {
				let self = this;
				if (subItem.productNum >= subItem.reserve) {
					self.$createDialog({
						type: 'alert',
						title: `警告`,
						content: '商品只有' + subItem.reserve + '件了哦',
						icon: 'cubeic-warn'
					}).show()
					subItem.productNum = subItem.productNum;
				} else {
					self.axios.post(Api.userApi + '/car/shopCarOperate', self.qs.stringify({
						shopId: subItem.shopId,
						productId: subItem.productId,
						skuId: subItem.skuId,
						userId: subItem.userId,
						num: 1
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'

						}
					}).then((res) => {

						if (res.data.code == 1) {
							subItem.productNum++
							subItem.skuImgId = subItem.productNum;
							self.upGetShopCar();
						} else {
							self.$createDialog({
								type: 'error',
								title: `失败`,
								content: res.data.msg,
								icon: 'cubeic-wrong'
							}).show()
						}
					})
				}
			},
			reduce(subItem) {
				if (subItem.productNum <= 1) {
					console.log('不能再减了哦')
				} else {

					let self = this;
					self.axios.post(Api.userApi + '/car/shopCarOperate', self.qs.stringify({
						shopId: subItem.shopId,
						productId: subItem.productId,
						skuId: subItem.skuId,
						userId: subItem.userId,
						num: -1
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {

						if (res.data.code == 1) {
							subItem.productNum = subItem.productNum - 1;
							subItem.skuImgId = subItem.productNum;
							self.upGetShopCar();
							console.log(self.shopCarData)
						} else {
							self.$createDialog({
								type: 'error',
								title: `失败`,
								content: res.data.msg,
								icon: 'cubeic-wrong'
							}).show()
						}
					})
				}
			},
			number(subItem) {
				subItem.productNum = subItem.productNum.replace(/[^\.\d]/g, '');
				subItem.productNum = subItem.productNum.replace('.', '');
				if (subItem.productNum == '' || subItem.productNum == subItem.skuImgId) {
					subItem.productNum = subItem.skuImgId;
				} else if (subItem.productNum >= subItem.reserve) {
					this.$createDialog({
						type: 'alert',
						title: `警告`,
						content: '商品只有' + subItem.reserve + '件了哦',
						icon: 'cubeic-warn'
					}).show()
					subItem.productNum = subItem.skuImgId;
				} else {
					// subItem.skuImgId = subItem.productNum;
					let self = this;
					self.axios.post(Api.userApi + '/car/shopCarOperate', self.qs.stringify({
						shopId: subItem.shopId,
						productId: subItem.productId,
						skuId: subItem.skuId,
						userId: subItem.userId,
						num: subItem.productNum - subItem.skuImgId
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {

						if (res.data.code == 1) {
							// subItem.productNum = subItem.productNum-1;
							subItem.skuImgId = subItem.productNum;
							self.upGetShopCar();
						} else {
							self.$createDialog({
								type: 'error',
								title: res.data.msg,
								content: res.data.msg,
								icon: 'cubeic-wrong'
							}).show()
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';

	html,
	body {
		height: 100%;
		background: #f5f5f5;
	}

	.selectCoupon {
		padding-top: 88px;
		padding-bottom: 96px;
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: fixed;
			border-bottom: 1px solid #FF523D;
			background: #fff;
			left: 0;
			top: 0;
			z-index: 100;

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

		}

		.couponInfo {
			background: #fff;
			padding: 20px;
			box-sizing: border-box;

			.c_l {
				width: 270px;
				height: 180px;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.c_r {
				width: 390px;

				.activiName {
					font-size: 28px;
					color: #000;
					line-height: 34px;
				}

				.price {
					font-size: 26px;
					color: #FF523D;
					line-height: 56px;
					height: 56px;
				}

				.time {
					font-size: 22px;
					color: #666;
				}

				.address {
					margin-top: 10px;

					img {
						width: 18px;
						margin-right: 10px;
					}

					span {
						font-size: 22px;
						color: #666;
					}
				}
			}
		}

		.couponList {
			ul {
				overflow: hidden;
				padding: 0 20px;

				li {
					padding: 20px;
					box-sizing: border-box;
					background: #fff;
					margin-top: 30px;
					box-shadow:0px 0px 8px 0px rgba(104,104,104,0.1);
					position: relative;
					.select{
						position: absolute;
						top: 0;
						right: 0;
						width: 40px;
					}
					.couponName{
						font-size: 28px;
						color: #000;
					}
					border-radius:10px;
					.couponBox {
						margin-top: 20px;
						.couponBox_l{
							.price{
								font-size: 30px;
								color: #FF523D;
								margin-bottom: 10px;
							}
							.couponNum{
								line-height: 32px;
								color: #666;
								font-size: 24px;
							}
							.special_tx{
								line-height: 32px;
								color: #666;
								font-size: 24px;
							}
							.tx{
								font-size: 24px;
								color: #999;
							}
						}
						.couponBox_r {
							.num_box {
								width: 160px;
								height: 44px;
								border-radius: 40px;
								background: #FF523D;

								div {
									img {
										width: 24px;
									}
								}

								input {
									height: 40px;
									text-align: center;
									color: #FF523D;
									font-size: 24px;
									outline: none;

								}

								.add {
									height: 40px;
								}
							}
						}
					}
				}
				.active{
					border: 1px solid #FF523D;
				}
			}
		}
		.couponBtn{
			height: 96px;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #FF523D;
			color: #fff;
			font-size: 30px;
		}
	}
</style>
