<template>
	<div class="homeWarpper">
		<div class="headerWrapper">
			<header class="header">
				<div class="container flex_r_s_b">
					<div class="c_left flex_r_s_b">
						<img class="logo" src="../assets/header@2x.png" alt="">
						<div class="history">
							<span class="back pointer"></span>
							<span class="go pointer"></span>
						</div>
					</div>
					<div class="c_right flex_r_f_s">
						<img class="head_img" src="../assets/home/head_icon.png" alt="">
						<div class="data_show">
							<p>自由犬宠物用品<i class="el-icon-caret-bottom"></i></p>
						</div>
						<span class="shuxian"></span>
						<div class="quit pointer">退出登录</div>
					</div>
				</div>
			</header>
			
		</div>
		<div class="main-cnt ">
			<div class="cnt-scroll container">
				<el-container class="scrollWrapper">
					<el-aside width="350px" class="navWapper">
						
							<GeminiScrollbar class="my-scroll-bar">
								<div class="nav_left">
									<ul>
										<li :class="{active:navIndex == index}" v-for="(item,index) in navData" @click="selectNav(item,index)">
											<div class="flex_c_f_e pointer">
												
												<img :src="item.url" alt="">
												<p>{{item.navName}}</p>
											</div>
											<div class="triangle-right"></div>
										</li>
										
									</ul>
								</div>
							
							</GeminiScrollbar>
							<div class="nav_right">
								<ul>
									<li v-for="(item,index) in subNavData" class="flex_r_f_s" @click="subSelect(index)">
										<img v-if="subNavIndex==index" src="../assets/condition/icon_02.png" alt="">
										<img v-else :src="item.subIcon" alt="">
										<router-link :to="{name:item.link}" active-class="active">
											{{item.subNavName}}
										</router-link>
									</li>
								</ul>
							</div>
						
						
					</el-aside>
					<el-main class="cnt">
							<router-view></router-view>
							<footer class="footer" style="text-align: center;">自由犬  @2018  v20.41</footer>

					</el-main>
				</el-container>
			</div>
			
		</div>
		
	</div>
	
</template>

<script>
	export default {
		
		data() {
			return {
				navData:[{
					navName:'收银台',url:require('../assets/home/icon_shouyin@2x.png'),subData:[{subNavName:'',subIcon:'',}]
					},{
					navName:'商品管理',url:require('../assets/home/icon_shangpin@2x.png'),
					subData:[{
						subNavName:'新增商品',
						subIcon:require('../assets/home/icon_fabu@2x.png'),
						link:'addGoods'
						},{
						subNavName:'未出售商品',
						subIcon:require('../assets/home/icon_home3.png'),
						link:'sell'
						},{
						subNavName:'商品编辑',
						subIcon:require('../assets/home/icon_home1.png'),
						link:'goodsEdit'
						},{
						subNavName:'草稿箱',
						subIcon:require('../assets/home/icon_home2.png'),
						link:''
						},{
						subNavName:'商品展示分类',
						subIcon:require('../assets/home/icon_home5.png'),
						link:''
						},{
						subNavName:'评价管理',
						subIcon:require('../assets/home/icon_home4.png'),
						link:''
						}]	
					},{
						navName:'订单管理',url:require('../assets/home/icon_dingdan@2x.png'),subData:[{subNavName:'',subIcon:'',}]
					},{
						navName:'客户管理',url:require('../assets/home/icon_kehu@2x.png'),subData:[{subNavName:'',subIcon:'',}]
					},{
						navName:'营销推广',url:require('../assets/home/icon_yinxiao@2x.png'),subData:[{subNavName:'',subIcon:'',}]
					},{
						navName:'报表中心',url:require('../assets/home/icon_baobiao@2x.png'),subData:[{subNavName:'',subIcon:'',}]
					},{
						navName:'财务管理',url:require('../assets/home/icon_caiwu@2x.png'),subData:[{subNavName:'',subIcon:'',}]
					},{
						navName:'消息管理',url:require('../assets/home/icon_xiaoxi@2x.png'),subData:[{subNavName:'',subIcon:'',}]
					},{
						navName:'设置',url:require('../assets/home/icon_shezhi@2x.png'),subData:[{subNavName:'',subIcon:'',}]
					}],
				subNavData:[],
				navIndex:null,
				subNavIndex:null
			};
		},
		methods: {
			selectNav(item,index) {
				this.navIndex = index;
				this.subNavData = item.subData;
			},
			subSelect(index){
				this.subNavIndex = index;
			}
		},
		mounted(){
			this.navIndex = this.$store.state.nav.navNum;
			this.subNavIndex = this.$store.state.nav.subNum;
			this.subNavData = this.navData[this.navIndex].subData;
		}
			
		
		
	}
</script>

<style lang="scss">
	.homeWarpper{
		height: 100%;
		overflow: hidden;
		.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
			background-color: #FF523D;
			border-color: #FF523D;
		}
		.el-checkbox__inner:hover{
			border-color: #FF523D;
		}
		.el-checkbox__input.is-focus .el-checkbox__inner{
			border-color: #FF523D;
		}
		.headerWrapper{
			position: fixed;
			width: 100%;
			left: 0;
			top: 0;
			z-index: 1500;
			header{
				width: 100%;
				.container{
					background:#FF8677;
					height: 120px;
					padding:0 28px;
					box-sizing: border-box;
					border-bottom: 2px solid #ff523d;
					
					.c_left{
						width: 488px;
						align-items:flex-end;
						.history{
							span{
								display: inline-block;
								width: 22px;
								height: 22px;
								border-radius: 50%;
								
							}
							.back{
								background: url(../assets/home/icon_home7.png) no-repeat center 0;
								background-size: cover;
								margin-right: 5px;
							}
							.go{
								background: url(../assets/home/icon_home6.png) no-repeat center 0;
								background-size: cover;
							}
						}
					}
					.c_right{
						width: 330px;
						justify-content:flex-end;
						.shuxian{
							height: 20px;
							width: 1px;
							background: #fff;
							margin: 0 28px;
						}
						.head_img{
							width: 50px;
							height: 50px;
							margin-right: 10px;
						}
						.data_show{
							p{
								font-size: 16px;
								color: #fff;
								line-height: 20px;
								i{
									margin-left: 12px;
								}
							}
						}
						.quit{
							font-size: 16px;
							color: #fff;
							line-height: 20px;
						}
					}
				}
			}
		}
		.main-cnt{
			height: 100%;
			position: relative;
			padding: 0;
			.cnt-scroll{
				height: calc(100% - 120px);
				margin-top: 120px;
				.scrollWrapper{
					height: 100%;
					.navWapper{
						height: 100%;
						overflow: hidden;
						position: relative;
						.nav_right{
							position: absolute;
							right: 0;
							top: 0;
							height: 100%;
							width: 240px;
							ul{
								width: 130px;
								margin: 0 auto;
								li{
									text-align: center;
									line-height: 36px;
									border-bottom: 1px solid #e8e8e8;
									margin-top: 30px;
									img{
										width: 19px;
										height: 20px;
										vertical-align: center;
									}
									a{
										font-size: 16px;
										color: #333;
										margin-left: 10px;
									}
// 									.router-link-active{
// 										color: #FF523D;
// 									}
									.active{
										color: #FF523D;
									}
								}
							}
							
						}
						.my-scroll-bar{
							height: 100%;
						
							.gm-scrollbar.-vertical {
							  width: 10px;
							  background:#eee;
							  .thumb{
								background: #ff523d;
								border-radius: 10px;
							  }
							}
							.nav_left{
								width: 110px;
								background: #434343;
								
								ul{
									li{
										height: 90px;
										margin-bottom:20px;
										padding: 0 14px;
										margin-bottom: 40px;
										div{
											color: #fff;
										}
										img{
											height: 44px;
											width: 44px;
											margin: 0 auto;
											display: block;
											margin-top: 15px;
										}
										p{
											text-align:center;
										}
									}
									li:last-child{
										margin-bottom: 0;
									}
									.active{
										position: relative;
										background: #ff523d;
										p{
											color: #fff;
										}
										.triangle-right{
											width: 0;
											height: 0;
											border-top: 45px solid transparent;
											border-left: 32px solid #ff523d;
											border-bottom: 45px solid transparent;
											position: absolute;
											right: -32px;
											top: 0;
										}
									}
								}
							}
							
						}
						
					}
					.cnt{
						background: #fff;
						padding: 0;
						.footer{
							margin-bottom: 20px;
							font-size: 14px;
							color: #333333;
						}
					}
				}
			}
		}
	}

</style>
