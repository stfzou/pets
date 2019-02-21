<template>
	<div class="goodsComment_warp">
		<div class="goodsDetails_nav">

			<div class="back"></div>
			<div class="nav_txt flex_r_s_b">
				<router-link  :to="{name:'goodsDetails'}">商品</router-link>
				<router-link class="active" :to="{name:'goodsComment'}">评论</router-link>
				<a href="###">详情</a>
			</div>
		</div>
		<div class="comment_nav flex_r_s_b">
			<span class="flex_r_s_c" :class="{'active':curunt == index}" @click="select(item,index)" :key="index" v-for="(item,index) in evalNav">
				{{item.text}}
			</span>
			
		</div>
		<div class="line"></div>
		<div class="comment_cnt">
			<cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
				<ul class="eval_list">
					<li class="flex_r_s_b list_item" v-for="(item,index) in evalList" :key="index">
						<div class="head_icon">
							<img :src="item.userHeadImgAddr" alt="">
						</div>
						<div class="right">
							<div class="r_top flex_r_s_b">
								<div class="r_top_l">
									<div class="user_name">{{item.userName}}</div>
									<div class="text">{{item.assessContent}}</div>
								</div>
								<div class="star">
									<cube-rate v-model="item.fraction" :disabled="disabled">

									</cube-rate>

								</div>
							</div>
							<div class="eval_pic flex_r_s_b" v-if="item.images">
								<img :src="im.imgAddr" alt="" v-for="(im,i) in item.images" :key="i">

							</div>
							<div class="data">{{item.createTime}}</div>
						</div>
					</li>

				</ul>
			</cube-scroll>
		</div>
		<div class="foot flex_r_f_s">
			<div class="add_car flex_r_s_c">加入购物车</div>
			<div class="purchase flex_r_s_c">立即购买</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				evalNav:[
					{
						
						text:'全部',
						num:453,
						isImg:'-1',
						isPraise:'-1'
					},
					{
						
						text:'有图',
						num:26,
						isImg:'1',
						isPraise:'-1'
					},
					{
						
						text:'好评',
						num:365,
						isImg:'-1',
						isPraise:'5'
					},
					{
						
						text:'中评',
						num:35,
						isImg:'-1',
						isPraise:'3'
					},
					{
						
						text:'差评',
						num:4,
						isImg:'-1',
						isPraise:'1'
					}
					
				],
				evalList: [],
				disabled: true,
				page:0,
				options:{
					pullDownRefresh:{
						txt:'更新成功',
						threshold:60
					},
					pullUpLoad:{
						txt:{
							more: '加载更多', noMore: '没有更多数据了',
						},
						threshold:20,
						
					}
				},
				isImgCode:'-1',
				isPraiseCode:'-1',
				curunt:0,
			}
		},
		mounted() {
			let h = document.documentElement.clientHeight - document.querySelector(".comment_cnt").offsetTop;
			document.querySelector(".comment_cnt").style.height = h+'px';
			this.getEval(-1, -1);
			
		},
		methods: {
			select(item,index){
				this.evalList = [];
				this.$refs.scroll.scrollTo(0,0)
				this.curunt = index;
				this.isImgCode = item.isImg;
				this.isPraiseCode = item.isPraise;
				this.page = 0;
				this.getEval(item.isImg,item.isPraise);
				// this.$refs.scroll.refresh();
			},
			getEval(isImg, isPraise) {
				let self = this;
				self.axios.post('/webShop/selectShopAssessPage', self.qs.stringify({
					shopId: 23,
					isImg: isImg,
					isPraise: isPraise,
					pageNo: 0,
					pageSize: 5
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.code == 1) {
						self.evalList = res.data.data;
					}
				})
			},
			  onPullingDown() {
			// 模拟更新数据
				this.page = 0;
				this.getEval(this.isImgCode,this.isPraiseCode);
				setTimeout(() => {
			
				  this.$refs.scroll.forceUpdate();
				  
			    }, 500)
				setTimeout(() => {
				
				  this.$refs.scroll.refresh();
				  
				}, 1000)
				
			},
			onPullingUp() {
			// 模拟更新数据
				
				let self = this;
				this.page++;
				setTimeout(() => {
					
					self.axios.post('/webShop/selectShopAssessPage',self.qs.stringify({
						shopId:23,
						isImg:self.isImgCode,
						isPraise:self.isPraiseCode,
						pageNo:self.page,
						pageSize:5
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							console.log(res)
							
							if(res.data.data.length>0){
								res.data.data.forEach((e)=>{
									self.evalList.push(e)
								})
								setTimeout(()=>{
									self.$refs.scroll.refresh();
									self.$refs.scroll.forceUpdate();
									
								},500)
							}
							
							
						}else{
							self.$refs.scroll.forceUpdate()
						}
					})
				}, 1000)
			},
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';

	.goodsComment_warp {
		padding-bottom: 98px;

		.line {
			@include line;
		}

		.goodsDetails_nav {
			height: 88px;
			position: relative;
			border-bottom: 1px solid #ff523d;

			.back {
				width: 26px;
				height: 42px;
				background: url(../../assets/icon/backColory.png) no-repeat center 0;
				background-size: cover;
				position: absolute;
				left: 20px;
				top: 50%;
				margin-top: -21px;
			}

			.nav_txt {
				height: 88px;
				margin: 0 auto;
				width: 316px;

				a {
					font-size: 30px;
					color: #000;
				}
				.router-link-active{
					color: #ff523d;
				}
			}
		}

		.comment_nav {
			flex-wrap: wrap;
			padding: 0 20px 30px 20px;
			box-sizing: border-box;

			span {
				width: 150px;
				height: 38px;
				border: 1px solid #ddd;
				border-radius: 30px;
				font-size: 26px;
				margin-top: 30px;
			}

			.active {
				border: 1px solid #ff523d;
				color: #ff523d;
			}
		}

		.comment_cnt {
			.eval_list {
				height: auto;

				.list_item {
					padding: 30px 20px;
					box-sizing: border-box;

					align-items: flex-start;
					border-bottom: 1px solid #e8e8e8;

					/*no*/
					.head_icon {
						height: 90px;
						width: 90px;
						border-radius: 50%;
						background: #FFDFDF;

						img {
							height: 90px;
							width: 90px;
							border-radius: 50%;
						}
					}

					.right {
						width: 82%;

						.r_top {
							align-items: flex-start;

							.r_top_l {
								.user_name {
									font-size: 24px;
									color: #333;
									height: 30px;
								}

								.text {
									font-size: 26px;
									color: #000;
									margin-top: 26px;
								}

							}

							.cube-rate-item {
								height: 24px;
								width: 25px;

							}
						}

						.data {
							font-size: 20px;
							color: #999;
							margin-top: 40px;
						}

						.eval_pic {

							flex-wrap: wrap;

							img {
								width: 120px;
								height: 120px;
								margin-top: 30px;
							}

						}
					}
				}
			}
		}
		.foot{
			height: 98px;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			border-top: 1px solid #ff523d;/*no*/
			z-index: 1000;
			div{
				width: 50%;
				height: 98px;
				font-size: 28px;
				
			}
			.add_car{
				color: #000;
				background: #fff;
			}
			.purchase{
				background: #ff523d;
				color: #fff;
			}
		}
	}
</style>
