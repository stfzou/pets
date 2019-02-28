<template>
	<div class="shopcar_warp">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">购物车</div>
			<div class="text">编辑</div>
		</div>
		<div class="shopCart_list">
			<ul>
				<li>
					<div class="shopName_box flex_r_f_s">
						<cube-checkbox v-model="checked" :option="option">
							
						</cube-checkbox>
						<div class="shopName flex_r_f_s">
							<img src="../../assets/icon_dianpu.png" alt="">
							<span>自由犬宠物物品</span>
						</div>
					</div>
					<div class="discount flex_r_f_s">
						<span class="discount_title flex_r_s_c">优惠</span>
						<span class="text">满99减5元</span>
					</div>
					<div class="goods_list">
						<div class="goods_item flex_r_f_e">
							<cube-checkbox v-model="checked" :option="option"></cube-checkbox>
							<div class="mid">
								<img src="../../assets/head_icon.png" alt="">
							</div>
							<div class="goods_r">
								<div class="goods_name">比瑞吉10kg小型犬成犬天然狗粮泰迪贵宾博美比熊犬主粮小狗粮20斤</div>
								<div class="parameter">鸡肉味；1.5KG</div>
								<div class="activity"><span class="flex_r_s_c">限时</span></div>
								<div class="price_box flex_r_s_b">
									<div class="price_l">
										<span class="new">￥92.00</span>
										<span class="old">￥109</span>
									</div>
									<div class="num_box flex_r_f_s">
										<div class="add flex_r_s_c" style="width: 33.333%;" @click="reduce">
											<img src="../../assets/reduce.png" alt="">
										</div>
										<input style="width: 33.333%;" type="text" v-model="val">
										<div style="width: 33.333%;" class="reduce flex_r_s_c" @click="add">
											<img src="../../assets/add.png" alt="">
										</div>
									</div>
								</div>
								
							</div>
						</div>
						<div class="goods_item flex_r_f_e">
							<cube-checkbox v-model="checked" :option="option"></cube-checkbox>
							<div class="mid">
								<img src="../../assets/head_icon.png" alt="">
							</div>
							<div class="goods_r">
								<div class="goods_name">比瑞吉10kg小型犬成犬天然狗粮泰迪贵宾博美比熊犬主粮小狗粮20斤</div>
								<div class="parameter">鸡肉味；1.5KG</div>
								<div class="activity"><span class="flex_r_s_c">限时</span></div>
								<div class="price_box flex_r_s_b">
									<div class="price_l">
										<span class="new">￥92.00</span>
										<span class="old">￥109</span>
									</div>
									<div class="num_box flex_r_f_s">
										<div class="add flex_r_s_c" style="width: 33.333%;" @click="reduce">
											<img src="../../assets/reduce.png" alt="">
										</div>
										<input style="width: 33.333%;" type="text" v-model="val">
										<div style="width: 33.333%;" class="reduce flex_r_s_c" @click="add">
											<img src="../../assets/add.png" alt="">
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="shopName_box flex_r_f_s">
						<cube-checkbox v-model="checked" :option="option">
							
						</cube-checkbox>
						<div class="shopName flex_r_f_s">
							<img src="../../assets/icon_dianpu.png" alt="">
							<span>自由犬宠物物品</span>
						</div>
					</div>
					<div class="discount flex_r_f_s">
						<span class="discount_title flex_r_s_c">优惠</span>
						<span class="text">满99减5元</span>
					</div>
					<div class="goods_list">
						<div class="goods_item flex_r_f_e">
							<cube-checkbox v-model="checked" :option="option"></cube-checkbox>
							<div class="mid">
								<img src="../../assets/head_icon.png" alt="">
							</div>
							<div class="goods_r">
								<div class="goods_name">比瑞吉10kg小型犬成犬天然狗粮泰迪贵宾博美比熊犬主粮小狗粮20斤</div>
								<div class="parameter">鸡肉味；1.5KG</div>
								<div class="activity"><span class="flex_r_s_c">限时</span></div>
								<div class="price_box flex_r_s_b">
									<div class="price_l">
										<span class="new">￥92.00</span>
										<span class="old">￥109</span>
									</div>
									<div class="num_box flex_r_f_s">
										<div class="add flex_r_s_c" style="width: 33.333%;" @click="reduce">
											<img src="../../assets/reduce.png" alt="">
										</div>
										<input style="width: 33.333%;" type="text" v-model="val">
										<div style="width: 33.333%;" class="reduce flex_r_s_c" @click="add">
											<img src="../../assets/add.png" alt="">
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="shopCart_foot flex_r_s_b">
			<div class="selct_all flex_r_f_s">
				<cube-checkbox v-model="checked" :option="option"></cube-checkbox>
				<span class="text">全选</span>
			</div>
			<div class="count_price flex_r_s_b" v-if="false">
				<div class="count_l">
					合计:￥350.00
				</div>
				<div class="count_btn flex_r_s_c">
					去结算(0)
				</div>
			</div>
			<div class="delete_btn flex_r_s_c">
				删除选中
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				checked:true,
				 option: {
					label: '',
					value: 'optionValue',
					disabled: false
				},
				val:1
			}
		},
		methods: {
			back() {
				this.$router.go(-1);//返回上一层
			},
			add(){
				this.val++;
			},
			reduce(){
				if(this.val<=1){
					this.val = 1;
				}else{
					this.val --;
				}
			}
		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.shopcar_warp{
		padding: 88px 0 86px 0;
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: relative;
			border-bottom: 1px solid #FF523D;
			position: fixed;
			left: 0;
			top: 0;
			background: #fff;
			z-index: 1000;
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
		.cube-checkbox_checked .cube-checkbox-ui i{
			color: #FF523D;
		}
		.cube-checkbox-ui:before, .cube-checkbox-ui i{
			font-size: 36px;
		}
		.cube-checkbox{
			padding: 0;
		}
		.cube-checkbox-ui{
			height:initial;
		}
		.shopCart_list{
			ul{
				li{
					border-bottom: 10px solid #e8e8e8;
					.shopName_box{
						padding: 0 20px;
						height: 86px;
						box-sizing: border-box;
						border-bottom: 1px solid #e8e8e8;/*no*/
						.shopName{
							margin-left: 30px;
							width: 280px;
							background: url('../../assets/icon/right_sjx.png') no-repeat 100% center;
							padding-right: 20px;
							background-size: 15px;
							img{
								width: 46px;
								// height: 46px;
								margin-right: 14px;
							}
							span{
								font-size: 28px;
								color: #000;
							}
						}
					}
					
					.discount{
						height: 60px;
						background: #ffefed;
						box-sizing: border-box;
						font-size: 24px;
						padding: 0 20px;
						.discount_title{
							width:80px;
							height:36px;
							border:1px solid rgba(255,82,61,1);
							border-radius:6px;
							color: #FF523D;
						}
						.text{
							color: #666;
							margin-left: 24px;
						}
					}
					.goods_list{
						padding: 0 20px;
						.goods_item{
							padding: 30px 0;
							border-top: 1px solid #e8e8e8;/*no*/
							.mid{
								img{
									width: 104px;
									margin: 0 30px;
								}
							}
							.goods_r{
								.goods_name{
									font-size: 26px;
									color: #000;
									line-height: 38px;
								}
								.parameter{
									font-size: 22px;
									color: #666;
									line-height: 34px;
								}
								.activity{
									height: 30px;
									margin: 20px 0;
									span{
										background: #c271fe;
										color: #fff;
										border-radius: 5px;
										width: 50px;
										height: 28px;
									}
								}
								.price_box{
									.price_l{
										width: 210px;
										.new{
											font-size: 28px;
											color: #FF523D;
										}
										.old{
											font-size: 24px;
											color: #666;
											margin-left: 20px;
											text-decoration: line-through;
										}
									}
									.num_box{
										width: 160px;
										height: 44px;
										border-radius: 20px;
										background: #FF523D;
										div{
											img{
												width: 24px;
											}
										}
										input{
											height: 40px;
											text-align: center;
											color: #FF523D;
											font-size: 24px;
											outline: none;
											
										}
										.add{
											height: 40px;
										}
									}
								}
							}
						}
						.goods_item:first-child{
							border: none;
						}
					}
				}
			}
		}
		.shopCart_foot{
			height: 86px;
			border-top: 1px solid #FF523D;/*no*/
			padding: 0 20px;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			.selct_all{
				.text{
					font-size: 28px;
					color: #000;
					margin-left: 20px;
				}
			}
			.count_price{
				width: 390px;
				.count_l{
					font-size: 28px;
					color: #000;
					width: 200px;
				}
				.count_btn{
					width: 180px;
					height: 70px;
					color: #fff;
					font-size: 28px;
					background:linear-gradient(90deg, #fe8071, #ffb160, #ffaf60, #ff7660);
					border-radius:7px;
				}
				
			}
			.delete_btn{
				width: 180px;
				height: 70px;
				border: 1px solid #FF523D;/*no*/;
				border-radius:7px;
				color: #FF523D;
				font-size: 28px;
			}
		}
	}
</style>
