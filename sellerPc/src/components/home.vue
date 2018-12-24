<template>
	<div class="homeWarpper">
		<div class="headerWrapper">
			<header class="header">
				<div class="container">
					<img class="logo" src="../assets/header@2x.png" alt="">
					<div></div>
				</div>
			</header>
			
		</div>
		<div class="main-cnt">
			<div class="cnt-scroll container">
				<el-container class="scrollWrapper">
					<el-aside width="350px" class="navWapper">
						
							<GeminiScrollbar class="my-scroll-bar">
								<div class="nav_left">
									<ul>
										<li class="active">
											<a href="###" class="flex_c_f_e">
												<img src="../assets/home/icon_caiwu@2x.png" alt="">
												<p>收银台</p>
											</a>
											<span class="triangle-right"></span>
										</li>
										<li v-for="(item,index) in navData">
											<a href="###" class="flex_c_f_e">
												<img src="../assets/home/icon_caiwu@2x.png" alt="">
												<p>收银台</p>
											</a>
										</li>
										
									</ul>
								</div>
								<div class="nav_right">
									<ul>
										<li v-for="(item,index) in subNavData" class="flex_r_f_e">
											<img src="../assets/home/icon_fabu@2x.png" alt="">
											<a href="###">
												
												商品列表
											</a>
											
										</li>
									</ul>
								</div>
							</GeminiScrollbar>
							
						
						
					</el-aside>
					<el-main class="cnt">Main</el-main>
				</el-container>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		
		data() {
			return {
				navData:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
				subNavData:[1,2,3]
			};
		}
		
	}
</script>

<style lang="scss">
	.homeWarpper{
		height: 100%;
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
					padding-left: 28px;
					box-sizing: border-box;
					border-bottom: 2px solid #ff523d;
					.logo{
						margin-top: 34px;
					}
				}
			}
		}
		.main-cnt{
			height: 100%;
			.cnt-scroll{
				height: calc(100% - 120px);
				margin-top: 120px;
				.scrollWrapper{
					height: 100%;
					.navWapper{
						height: 100%;
						overflow: hidden;
						
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
								float: left;
								width: 110px;
								background: #434343;
								ul{
									li{
										height: 90px;
										margin-bottom:20px;
										padding: 0 14px;
										
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
							.nav_right{
								float: right;
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
											font-size: 18px;
											color: #333;
										}
									}
								}
								
							}
						}
						
					}
					.cnt{
						background: #fff;
						padding: 0;
					}
				}
			}
		}
	}

</style>
