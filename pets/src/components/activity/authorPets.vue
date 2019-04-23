<template>
	<div class="authorPets">
		<div class="authorPetsList">
			<cube-scroll ref="scroll" :options="options">
			<div class="authorPetsItem flex_r_s_b" v-for="item in arr">
				<div class="pet-img">
					<img src="../../assets/head_icon.png" alt="">
				</div>
				<div class="pet-info">
					<div class="petName">胖太</div>
					<div class="yanzhi flex_r_f_s">
						<img src="../../assets/footprint.png" alt="">
						<span>颜值  45</span>
					</div>
					<div class="pingzhong flex_r_f_s">
						<div class="pz flex_r_f_s">
							<img src="../../assets/icon_pinzhong.png" alt="">
							<span>英国短毛猫</span>
						</div>
						<div class="shengri flex_r_f_s">
							<img src="../../assets/icon_shengri.png" alt="">
							<span>3岁</span>
						</div>
						<div class="xingbie flex_r_f_s">
							<img src="../../assets/icon_xingbie.png" alt="">
							<span>DD</span>
						</div>
						<div class="kg flex_r_f_s">
							<img src="../../assets/icon_tizhong.png" alt="">
							<span>3kg</span>
						</div>
					</div>
					<div class="pet-tag flex_r_f_s">
						<img src="../../assets/icon_biaoqian.png" alt="">
						<div class="tagList flex_r_f_s">
							<span>吃货</span>
							<span>小胖子</span>
							<span>开心果</span>
						</div>
					</div>
					<div class="pet-describe">
						<span>
							可爱小胖子，天天欢乐多，可爱小胖子，天天欢乐多,可爱小胖子
						</span>
						<div class="triangle-up"></div>
					</div>
				</div>
			</div>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				arr:[1,2,3,4,5],
				options: {
					pullDownRefresh: {
						txt: '更新成功',
						threshold: 40
					},
					pullUpLoad: {
						txt: {
							more: '加载更多',
							noMore: '没有更多数据了',
						},
						threshold: 40,
				
					}
				},
			}
		},
		mounted() {
			let elHeight = document.querySelector(".dynamicNav").offsetHeight;
			let elTop = document.querySelector(".dynamicNav").offsetTop;
			let h = document.documentElement.clientHeight - elTop;
			document.querySelector(".authorPetsList").style.height = h + 'px';
			setTimeout(()=>{
				 this.$refs.scroll.refresh();
			},100)
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.authorPets{
		.authorPetsList{
			padding: 0 20px;
			.authorPetsItem{
				padding: 30px 0;
				align-items:flex-start;
				border-bottom: 1px solid #e8e8e8;
				.pet-img{
					width: 80px;
					height: 80px;
					border-radius: 50%;
					background: #FFDFDF;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.pet-info{
					width: 580px;
					.petName{
						font-size: 28px;
						color: #ff523d;
						height: 42px;
						line-height: 42px;
					}
					.yanzhi{
						margin-top: 20px;
						img{
							width: 22px;
							margin-right: 10px;
						}
						span{
							font-size: 24px;
							color: #000;
						}
					}
					.pingzhong{
						margin-top: 20px;
						
						div{
							float: left;
							width: initial;
							margin-left: 60px;
							img{
								margin-right: 10px;
							}
						}
						span{
							font-size: 24px;
							color: #000;
						}
						.pz{
							margin: 0;
							img{
								width: 22px;
								
							}
							
						}
						.shengri{
							img{
								width: 8px;
							}
						}
						.xingbie{
							img{
								width: 22px;
							}
						}
						.kg{
							img{
								width: 20px;
							}
						}
					}
					.pet-tag{
						margin-top: 20px;
						img{
							width: 22px;
							margin-right: 10px;
						}
						.tagList{
							span{
								
								font-size: 24px;
								color: #333;
								border: 1px solid #e8e8e8;
								border-radius:18px;
								padding: 5px 15px;
								margin-right: 20px;
							}
						}
						
					}
					.pet-describe{
						margin-top: 20px;
						padding: 10px 20px;
						background: #ff523d;
						color: #fff;
						font-size: 24px;
						line-height: 36px;
						border-radius:6px;
						position: relative;
						.triangle-up{
							width:0;
							height:0;
							border-left:10px solid transparent;
							border-right:10px solid transparent;
							border-bottom:12px solid #ff523d;
							position: absolute;
							top: -12px;
							left: 10px;
						}
					}
				}
			}
		}
	}
</style>
