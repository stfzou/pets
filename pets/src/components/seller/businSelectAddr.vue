<template>
	<div class="businSelectAddr">
		<div class="top_nav flex_r_s_b">
			<div class="back"></div>
			<div class="nav_title">选择收货地址</div>
			<div class="text">新增地址</div>
		</div>
		<div class="nearby_addr">
			<div class="title">附近地址</div>
			<ul>
				<li class="flex_r_f_s">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span>成都长宝大厦</span>
				</li>
				<li class="flex_r_f_s">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span>成都长宝大厦</span>
				</li>
				<li class="flex_r_f_s">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span>成都长宝大厦</span>
				</li>
				<li class="flex_r_f_s">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span>成都长宝大厦</span>
				</li>
				<li class="flex_r_f_s">
					<img src="../../assets/icon/map@2x.png" alt="">
					<span>成都长宝大厦</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	export default{
		
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
		.businSelectAddr{
			.top_nav{
				padding: 0 20px;
				height: 88px;
				box-sizing: border-box;
				position: relative;
				border-bottom: 1px solid #FF523D;
				.back{
					width: 26px;
					height: 42px;
					background:url(../../assets/icon/backColory.png) no-repeat center 0;
					background-size: cover;
				}
				.nav_title{
					font-size: 30px;
					color: #000;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					
				}
				.text{
					font-size: 26px;
					color: #FF523D;
				}
			}
			.nearby_addr{
				.title{
					font-size: 24px;
					color: #999;
					padding: 0 20px;
					padding-top: 20px;
				}
				ul{
					padding: 0 20px;
					li{
						padding: 30px 0;
						border-bottom: 1px solid #e8e8e8;/*no*/
						img{
							width: 20px;
						}
						span{
							font-size: 28px;
							color: #000;
							margin-left: 10px;
						}
					}
				}
			}
		}
</style>
