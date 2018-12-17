<template>
	<div class="sellerActive">
		<div class="top_nav_box">
			<active-nav></active-nav>
		</div>
		<div class="intd_box">
			<div class="intd" :class="{active_intd:coupon}">
				
				<div class="retract cubeic-select" v-show="coupon" @click="close"></div>
				<div class="flex_r_f_s intd_top">
					<img class="head_icon" src="../../assets/icon/head_icon.png" alt="">
					<div class="mid">
						
						<div class="flex_r_f_s distance">
							<span class="dist_icon"></span>
							<span class="juli">距离2.5公里</span>
							<div class="score">
								<i class="cubeic-star"></i>
								评分8.2
							</div>
						</div>
						<div class="flex_r_f_s btom">
							<span class="span1">送货上门</span>
							<span>同城快递免运费</span>
							<div class="btom_icon cubeic-select" @click="open" v-show="!coupon"></div>
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
		<div class="seller_nav_box flex_r_s_b">
			<div class="search"></div>
			<div class="seller_nav flex_r_f_e">
				<router-link :to="item.link" @click.native="selectNav" 
				v-for="(item,index) in navData" :key="index" :class="{active:index == aIndex}">
					{{item.navName}}
				</router-link>
			</div>
		</div>
		<div class="goods_nav_warp">
			<cube-scroll
			  ref="scroll"
			  :data="goodsNavData"
			  direction="horizontal"
			  class="horizontal-scroll-list-wrap">
			  <ul class="list-wrapper">
				<li v-for="(item,index) in goodsNavData" class="list-item" :key="index">
					 <router-link :to="item.link" :class="{active:aIndex == index}" @click="selectNav(index)">{{ item.name }}</router-link>
				</li>
			  </ul>
			</cube-scroll>
		</div>
		<div class="nav_content">
			<transition name="fade">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import activeNav from "../common/activeNav.vue"
	export default {
		components:{
			activeNav:activeNav
		},
		data() {
			return {
				coupon:false,
				aIndex:0,
				goodsNavA:0,
				navData:[
					{navName:'所有商品',link:""},
					{navName:'店铺评价',link:""},
					{navName:'商家信息',link:""},
				],
				goodsNavData:[{name:'热销爆款',link:{name:'sellerVipCt',query:{userid:1}}},{name:'宠物玩具',link:''},{name:'宠物零食',link:''},{name:'宠物医药',link:''},{name:'宠物医药',link:''}]
			};
		},
		methods:{
			open(){
				this.coupon = true;
			},
			close(){
				this.coupon = false;
			},
			selectNav(index){
				this.aIndex = index;
			},
			initTabScroll(){
				this.$refs.scroll.refresh();
			}
		},
		created() {
			//初始化横向滚动
			setTimeout(()=>{
				this.initTabScroll()
			},100)
		}
	}
</script>

<style lang="scss">
		@import '../../style/common.scss';
		@import '../../style/mixin.scss';
		.sellerActive {
			.top_nav_box{
				height: 208px;
				background:url(../../assets/icon/icon-bg2.png) no-repeat center 0;
				background-size: cover;
				padding: 0 20px;
			}
			.intd_box{
				padding: $p20;
				margin-top: -150px;
				.intd{
					margin-bottom: 5px;
					align-items: flex-start;
					padding:20px 64px 30px 28px;
					border-radius:10px;
					position: relative;
					.intd_top{
						
					}
					.retract{
						font-size: 30px;
						background-size:cover;
						position: absolute;
						left:50%;
						transform: translateX(-50%);
						bottom:20px;
						transform: rotate(180deg);
						color: #ff523d;
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
						.name{
							@include font-dpr(32px);
							color: $blank;
						}
						.distance{
							height: 62px;
							.dist_icon{
								height: 22px;
								width: 18px;
								@include bg-image('map_fff');
								background-size:cover;
							}
							.juli{
								color:#fff;
								font-size: 22px;
								margin-left: 10px;
							}
							.score{
								margin-left: 38px;
								color: #fff;
								font-size: 22px;
								height: 30px;
								width: 130px;
								background:rgba(0,0,0,0.3);
								text-align:center;
								line-height: 30px;
								border-radius: 16px;
							}
						}
						.btom{
							height: 36px;
							span{
								border-radius:6px;
								color: #fff;
								@include font-dpr(20px);
								padding:2px;
								border:1px solid #fff;/*no*/
							}
							.span1{
								margin-right:12px;
							}
							.btom_icon{
								font-size: 30px;
								color: #fff;
								display: inline-block;
								margin-left: 60px;
							}
						}
					}
				}
				
				.active_intd{
					box-shadow:0px 8px 10px 0px rgba(255,82,61,0.1);
				}
				
				
			}
			.seller_nav_box {
				padding: 0 20px;
				box-sizing: border-box;
				border-bottom: 1px solid #FF523D;/*no*/
				.search{
					width: 36px;
					height: 38px;
					@include bg-image('icon-search');
					background-size: cover;
					margin-right: 5px;
				}
				.seller_nav{
					position: relative;
					height: 68px;
					background: #fff;
					
					a{
						font-size: 28px;
						color: #000;
						height: 68px;
						line-height: 68px;
						
					}
					a.active{
						background: url(../../assets/icon/bg_st.png) no-repeat center 100%;
						background-size:18px;
					}
					
				}
				
			}
			.goods_nav_warp{
				.horizontal-scroll-list-wrap{
					
					.cube-scroll-content{
						display: inline-block;
					}
					.list-wrapper{
						padding: 0 20px;
						line-height: 72px;
						white-space: nowrap;
					}
					.list-item{
						display: inline-block;
						margin-left: 60px;
						a{
							font-size: 28px;
							color: #000;
						}
						.active{
							color: #FF523D;
						}
					}
					.list-item:first-child{
						margin: 0;
					}
				}
			}
		}
</style>
