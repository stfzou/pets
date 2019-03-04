<template>
	<div class="userAddr">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">选择收货地址</div>
			<div class="text" @click="newAddr">新增地址</div>
		</div>
		<ul class="userAddr_list">
			<li>
				<div class="user_name">
					<span>自由犬</span>
					<span class="phone">13990413795</span>
				</div>
				<div class="address">
					
					四川省成都市成华区牛王庙东恒国际二栋二单元1104
				</div>
				<div class="select_box flex_r_s_b">
					<div class="select_l flex_r_s_b">
						<div class="cir"></div>
						<span>默认地址</span>
					</div>
					<div class="select_r flex_r_s_b">
						<div class="edit flex_r_f_e"><img src="../../assets/edit.png" alt=""><span>编辑</span></div>
						<div class="delete flex_r_f_e" @click="maskShow"><img src="../../assets/delete.png" alt=""><span>删除</span></div>
					</div>
				</div>
			</li>
			<li>
				<div class="user_name">
					<span>自由犬</span>
					<span class="phone">13990413795</span>
				</div>
				<div class="address">四川省成都市成华区牛王庙东恒国际二栋二单元1104</div>
				<div class="select_box flex_r_s_b">
					<div class="select_l flex_r_s_b">
						<div class="cir active_cir"></div>
						<span>默认地址</span>
					</div>
					<div class="select_r flex_r_s_b">
						<div class="edit flex_r_f_e"><img src="../../assets/edit.png" alt=""><span>编辑</span></div>
						<div class="delete flex_r_f_e" @click="maskShow"><img src="../../assets/delete.png" alt=""><span>删除</span></div>
					</div>
				</div>
			</li>
			
		</ul>
		<div class="mask flex_r_s_c" v-if="isMask" @click.stop = "maskHide">
			<div class="mask_cnt" @click.stop>
				<h3>删除地址</h3>
				<p>确定删除地址?</p>
				<div class="msk_btn flex_r_f_s">
					<span class="cancel" @click="maskHide">取消</span>
					<span class="confirm">确定</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isMask:false
			}
		},
		methods: {
			maskHide() {
				this.isMask = false;
			},
			maskShow(){
				this.isMask = true;
			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			newAddr(){
				this.$router.push({
					name:'addAddr'
				})
			}
		},
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.userAddr{
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
		.line{
			@include line;
		}
		.mask{
			height: 100%;
			width: 100%;
			position: fixed;
			box-sizing: border-box;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.6);
			.mask_cnt{
				height: 240px;
				background: #fff;
				border-radius: 10px;
				position: absolute;
				width: 90%;
				padding:40px 20px;
				box-sizing: border-box;
				h3{
					font-size: 32px;
					color: #000;
				}
				p{
					font-size: 26px;
					color: #666;
					margin: 40px 0;
				}
				.msk_btn{
					justify-content:flex-end;
					.cancel{
						margin-right: 50px;
					}
					span{
						font-size: 26px;
						color: #FF523D;
					}
				}
			}
		}
		.userAddr_list{
			li{
				padding: 0 20px;
				border-bottom: 10px solid #e8e8e8;
				.user_name{
					font-size: 28px;
					color: #000;
					padding: 30px 0;
					.phone{
						margin-left: 106px;
					}
				}
				.address{
					font-size: 26px;
					color: #666;
					padding-bottom: 30px;
					border-bottom: 1px solid #e8e8e8;/*no*/
				}
				.select_box{
					padding: 20px 0;
					.select_l{
						width: 150px;
						.cir{
							width: 30px;
							height: 30px;
							border-radius: 50%;
							border: 1px solid #e8e8e8;/*no*/
							box-sizing: border-box;
						}
						.active_cir{
							background:url('../../assets/select.png') no-repeat center 0;
							background-size:100%;
							border: none;
						}
						span{
							color: #666;
							font-size: 26px;
						}
						.active_span{
							color: #FF523D;
						}
					}
					.select_r{
						width: 210px;
						.edit{
							width: 100px;
							color: #FF523D;
							font-size: 26px;
							img{
								width: 30px;
							}
						}
						.delete{
							width: 100px;
							color: #FF523D;
							font-size: 26px;
							img{
								width: 28px;
							}
						}
					}
					
				}
			}
			
		}
	}
</style>
