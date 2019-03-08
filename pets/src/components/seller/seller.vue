<template>
	<div class="seller_warp">
		<div class="post">
			<TopNav></TopNav>
		</div>
		<div class="seller_nav_warp">
			<div class="intd_box">
				<div class="intd" :class="{active_intd:coupon}">
					
					<div class="retract" v-show="coupon" @click="close"></div>
					<div class="flex_r_f_s intd_top">
						<img class="head_icon" src="../../assets/icon/head_icon.png" alt="">
						<div class="mid">
							<div class="name">{{goodsName}}</div>
							<div class="flex_r_f_s distance">
								<span class="dist_icon"></span>
								<span class="juli">{{distance}}</span>
							</div>
							<div class="flex_r_f_s btom">
								<span class="span1">送货上门</span>
								<span>同城快递免运费</span>
								<div class="btom_icon" @click="open" v-show="!coupon"></div>
							</div>
						</div>
					</div>
					<div class="intd_btom" v-show="coupon">
						<ul class="flex_r_s_b coupon_list">
							<li class="flex_r_s_b">
								<div class="coupon_money active flex_r_s_b">
									<span class="span1">￥<b>5</b></span>
									<span class="span2">满100可用</span>
								</div>
								<span class="text">已</br>领</span>
							</li>
							<li class="flex_r_s_b">
								<div class="coupon_money flex_r_s_b">
									<span class="span1">￥<b>5</b></span>
									<span class="span2">满100可用</span>
								</div>
								<span class="text">已</br>领</span>
							</li>
							<li class="flex_r_s_b">
								<div class="coupon_money flex_r_s_b">
									<span class="span1">￥<b>5</b></span>
									<span class="span2">满100可用</span>
								</div>
								<span class="text">已</br>领</span>
							</li>
						</ul>
						<div class="tejia">折扣商品7折起</div>
						<div class="tejia tejia2">特价商品59元起</div>
						
					</div>
				</div>
				
			</div>
			<div class="seller_nav_box">
				<div class="seller_nav flex_r_f_e">
					<div class="nav_icon"></div>
					<router-link :to="item.link" @click.native="selectNav" v-for="(item,index) in navData" :key="index">
						{{item.navName}}
					</router-link>
				</div>
			</div>
			
			<!-- <transition name="fade"> -->
				<router-view></router-view>
			<!-- </transition> -->
		</div>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import TopNav from '../common/topNav.vue'
	import Api from '../common/apj.js'
	export default {
		data() {
			return {
				coupon:false,
				loading:false,
				navData:[
					{navName:'所有商品',link:{name:"sellerGoods"}},
					{navName:'店铺评价',link:{name:"sellerEval"}},
					{navName:'商家信息',link:{name:"sellerInfo"}},
				],
				goodsName:'',
				distance:''
				
			}
		},
		components:{
			TopNav
		},
		methods:{
			open(){
				this.coupon = true;
			},
			close(){
				this.coupon = false;
			},
			selectNav(e){
				//导航选中
				let pic = document.querySelector(".seller_nav .nav_icon");
				let liList = document.querySelectorAll(".seller_nav a");
				//定义向右的移动初始距离
				let currentLeft = e.target.offsetLeft+e.target.offsetWidth/2-pic.offsetWidth/2;
				pic.style.left = currentLeft+'px';
			},
			loadState(){
				
				this.loading = true;
				setTimeout(()=>{
					this.loading = false;
				},500)
			},
			getStoreInfo(){
				let self = this;
				self.axios.post(Api.shopApi+'/webShop/selectShopsInfoById',self.qs.stringify({
					shopId:23,
					lat:0,
					lng:0
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					if(res.data.code == 1){
						self.goodsName = res.data.data.shopName;
						self.distance = res.data.data.distance;
					}else{
						// self.$message.error(res.data.msg);
					}
					
				})
			}
		},
		mounted() {
			//初始化导航选中
			this.$nextTick(function(){
				let pic = document.querySelector(".seller_nav .nav_icon");
				let a = document.querySelector(".seller_nav .router-link-active");
				let currentLeft = a.offsetLeft+a.offsetWidth/2-pic.offsetWidth/2;
				pic.style.left = currentLeft+'px';
			});
			//获取商家信息
			this.getStoreInfo();
		},
		watch:{
			'$route':'loadState'
		}
	
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.div123{
		transition: all ease-in-out 0.5s;
	}
	.seller_warp{
		
		.post {
			height: 208px;
			background:url(../../assets/icon/icon-bg1.png) no-repeat center 0;
			background-size: cover;
			padding:$p20;
			position: relative;
		}
		.seller_nav_warp{
			.intd_box{
				padding: $p20;
				margin-top: -118px;
				.intd{
					margin-bottom: 5px;
					align-items: flex-start;
					padding:20px 64px 30px 28px;
					border-radius:10px;
					position: relative;
					transition: all ease-in-out 0.2s;
					background:#fff;
					box-shadow:0px 8px 10px 0px rgba(255,82,61,0.1);
					.retract{
						width: 30px;
						height: 18px;
						@include bg-image("tops");
						background-size:cover;
						position: absolute;
						left:50%;
						margin-left: -15px;
						bottom:20px;
					}
					.intd_btom{
						margin-top:28px;
						.tejia{
							margin-top:18px;
							font-size:22px;
							color:#333;
						}
						.tejia2{
							margin-bottom: 18px;
						}
						.coupon_list{
							li{
								width: 180px;
								height: 60px;
								background:rgba(255,82,61,1);
								border-radius:6px;
								box-sizing:border-box;
								.text{
									font-size:20px;
									font-family:MicrosoftYaHei;
									color:rgba(255,255,255,1);
									padding:6px;
									box-sizing:border-box;
								}
								.coupon_money{
									background:#fff;
									height:60px;
									border-radius:6px;
									border:1px solid rgba(255,82,61,1);/*no*/
									box-sizing:border-box;
									.span1{
										width:60px;
										padding:0 10px;
										color: #FF523D;
										font-size:24px;
										b{
											font-size:34px;
											
										}
									}
									.span2{
										text-align: center;
										border-left:1px solid #FF523D;/*no*/
										color:#666;
										font-size:20px;
										padding:0 4px;
									}
								}
								.coupon_money.active{
									background:#FF523D;
									border-right:1px solid #fff;/*no*/
									box-sizing: initial;
									.span1{
										color:#fff;
									}
									.span2{
										color:#fff;
										border-left:1px solid #fff;/*no*/
									}
								}
							}
							
						}
					}
					.head_icon{
						height: 120px;
						width: 120px;
					}
					.mid{
						margin-left: 35px;
						margin-top: 28px;
						.name{
							@include font-dpr(32px);
							color: $blank;
						}
						.distance{
							height: 62px;
							.dist_icon{
								height: 22px;
								width: 18px;
								@include bg-image('map');
								background-size:cover;
							}
							.juli{
								color: $text_gray;
								font-size: 22px;
								margin-left: 10px;
							}
						}
						.btom{
							
							span{
								
								border-radius:6px;
								color: #FF523D;
								@include font-dpr(20px);
								padding:2px;
								border:1px solid #FF523D;/*no*/
							}
							.span1{
								margin-right:12px;
							}
							.btom_icon{
								width: 30px;
								height: 18px;
								@include bg-image('btom');
								background-size: cover;
								display: inline-block;
								margin-left: 60px;
							}
						}
					}
				}
				
				
			}
			.seller_nav_box .seller_nav{
				position: relative;
				height: 68px;
				background: #fff;
				border-bottom: 1px solid #FF523D;/*no*/
				a{
					font-size: 26px;
					color: #000;
				}
				.nav_icon{
					width: 0;
					height: 0;
					border-left: 12px solid transparent;
					border-right: 12px solid transparent;
					border-bottom: 12px solid #FF523D;
					font-size: 0;
					line-height: 0;
					position: absolute;
					bottom: -1px;/*no*/
					  
				}
			}
			.load-warp{
				justify-content: center;
			}
		}
	}
</style>
