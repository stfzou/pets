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
		<div class="comment_nav flex_r_s_b" v-if="evalList.length>0">
			<span class="flex_r_s_c" :class="{'active':curunt == index}" @click="select(item,index)" :key="index" v-for="(item,index) in evalNav">
				{{item.text}}
			</span>

		</div>
		<div class="line" v-if="evalList.length>0"></div>

		<div class="comment_cnt" v-if="evalList.length>0">
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
		<div class="comment_cnt cntTx flex_r_s_c" v-else>
			暂无评论
		</div>
		<div class="mask" v-show="isMask" @click.stop = "maskHide">

			<div class="product_spec" @click.stop>
				<div class="spec_head flex_r_f_s">
					<div class="product_img">
						<img :src="skuImg" alt="">
					</div>
					<div class="goods_name">
						<h4>{{productName}}</h4>
						<div class="price" v-if="activePrice!=''">￥{{activePrice}}</div>
						<div class="price" v-else>￥{{price}}</div>
					</div>
				</div>
				<div class="selct_spec">

					<ul>

						<li v-for="(item,index) in guige">
							<div class="spec_name">{{item.anName}}</div>
							<div class="spec_attr flex_r_f_s">
								<span @click="slectAttr(item,im)" :class="{active:item.selectId == im.attrValueId}" class="flex_r_s_c" v-for="im in item.avs" :key="im.attrValueId">{{im.attrValueName}}</span>
							</div>
						</li>

					</ul>
					<div class="select_num flex_r_s_b">
						<div class="select_title">数量选择</div>
						<div class="num_box flex_r_f_e">
							<div @click="reduceGoods" class="reduce flex_r_s_c">
								<img  src="../../assets/reduce.png" alt="">
							</div>
							<input style="width: 33.333%;" class="flex_r_s_c num" type="text" v-model="num" />
							<div @click="addGoods" class="add flex_r_s_c">
								<img src="../../assets/add.png" alt="">
							</div>

						</div>
					</div>
					<div class="spec_foot flex_r_f_s">
						<div class="add_car flex_r_s_c" @click="addShopCar">加入购物车</div>
						<div class="purchase flex_r_s_c">立即购买</div>
					</div>
				</div>

			</div>

		</div>
		<div class="foot flex_r_f_s">
			<div class="collection flex_r_f_e">
				<div class="collection_l">
					<img src="../../assets/shoucang.png" alt="">
					<p>收藏</p>
				</div>
				<div class="collection_r">
					<img src="../../assets/icon_kefu.png" alt="">
					<p>客服</p>
				</div>
			</div>
			<div class="add_car flex_r_s_c" @click="maskShow">加入购物车</div>
			<div class="purchase flex_r_s_c" @click="maskShow">立即购买</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
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
						threshold:40
					},
					pullUpLoad:{
						txt:{
							more: '加载更多', noMore: '没有更多数据了',
						},
						threshold:40,

					}
				},
				isImgCode:'-1',
				isPraiseCode:'-1',
				curunt:0,
				lng:104.09465,
				lat:30.66047,
				isMask:false,
				guige:[],
				num:1,
				skuImg:'',
				activePrice:'',
				price:'',
				skuId:'',
				shopName:'',
				specAttr:'',
				productName:''
			}
		},
		mounted() {
			let h = document.documentElement.clientHeight - document.querySelector(".comment_cnt").offsetTop;
			document.querySelector(".comment_cnt").style.height = (h-56)+'px';
			this.getEval(-1, -1);
			this.getSpec();
		},
		methods: {
			select(item,index){
				this.evalList = [];
				this.$refs.scroll.refresh();
				this.page = 0;
				this.$refs.scroll.scrollTo(0,0)
				this.curunt = index;
				this.isImgCode = item.isImg;
				this.isPraiseCode = item.isPraise;
				setTimeout(()=>{
					this.getEval(item.isImg,item.isPraise);
				},100)


			},
			addShopCar(){//加入购物车
				let self = this;
				if(self.skuId == ''){
					self.$createDialog({
						type: 'warn',
						title: `提示`,
						content: `请选择属性`,
						icon: 'cubeic-warn'
					}).show()
				}else{
					self.axios.post(Api.userApi+'/car/shopCarOperate',self.qs.stringify({
						shopId:23,
						productId:146,
						skuId:self.skuId,
						userId:24,
						num:self.num
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							console.log(res);
							self.$createDialog({
								type: 'warn',
								title: `成功`,
								content: `加入购物车成功`,
								icon: 'cubeic-right'
							}).show()
							self.isMask = false;
						}else{
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
			getEval(isImg, isPraise) {
				let self = this;
				self.axios.post(Api.shopApi+'/webShop/selectShopAssessPage', self.qs.stringify({
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
						setTimeout(() => {
              self.evalList = res.data.data;
              self.$refs.scroll.forceUpdate();
              setTimeout(() => {
              	self.$refs.scroll.refresh();
              }, 100)

						}, 500)

					}
				})
			},
			onPullingDown() {
			// 模拟更新数据
				this.page = 0;
				this.getEval(this.isImgCode,this.isPraiseCode);
			},
			onPullingUp() {
			// 模拟更新数据

				let self = this;
				this.page++;
				console.log(this.page)
				setTimeout(() => {

					self.axios.post(Api.shopApi+'/webShop/selectShopAssessPage',self.qs.stringify({
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

								setTimeout(()=>{
                  self.evalList.push(...res.data.data)
									self.$refs.scroll.forceUpdate();
									setTimeout(()=>{
										self.$refs.scroll.refresh();
									},100)
								},500)

							}else{
								self.$refs.scroll.forceUpdate();
							}


						}else{
              alert(res.data.msg)
							self.$refs.scroll.forceUpdate()
						}
					})
				}, 1000)
			},
			addGoods(){
				this.num++;
			},
			reduceGoods(){
				if(this.num<=1){
					this.num = 1;
				}else{
					this.num--;
				}
			},
			maskShow(){
				this.isMask = true;
			},
			maskHide(){
				this.isMask = false;

			},
			slectAttr(item,im){

				item.selectId = im.attrValueId;
				if(this.guige.length==2){
					this.specAttr.forEach((e)=>{
						if((e.anvs[0].avId == this.guige[0].selectId&&e.anvs[1].avId == this.guige[1].selectId)||(e.anvs[1].avId == this.guige[0].selectId&&e.anvs[0].avId == this.guige[1].selectId)){
							this.skuId = e.skuId;
							this.skuImg = e.skuImgAddr
							return false;
						}
					})
				}else if(this.guige.length==1){
					this.specAttr.forEach((e)=>{
						if(e.anvs[0].avId == this.guige[0].selectId){
							this.skuId = e.skuId;
							this.skuImg = e.skuImgAddr
							return false;
						}
					})
				}

			},
			getSpec(){
				let self = this;
				self.axios.post(Api.shopApi+'/shop/selectShopsProductDetails',self.qs.stringify({
					productId:146,
					userId:29,
					lat:self.lat,
					lng:self.lng
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){

						self.shopName = res.data.data.shopInfo.shopName;
						self.price = res.data.data.skus[0].original;
						if(res.data.data.activityPrice){
							self.activePrice = res.data.data.activityPrice;
						}
						self.productNum = res.data.data.shopInfo.productNum;
						self.specAttr = res.data.data.skus;
						self.skuImg = res.data.data.skus[0].skuImgAddr;

						if(res.data.data.guige.length>0){
							// self.guige = res.data.data.guige;
							res.data.data.guige.forEach((e)=>{
								self.guige.push({
									anId:e.anId,
									anName:e.anName,
									avs:e.avs,
									selectId:''
								})
							})

						}else if(res.data.data.guige.length==0){
							self.skuId = res.data.data.skus[0].skuId;
							self.skuImg = res.data.data.skus[0].skuImgAddr;
						}

						console.log(res)

					}else{
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';

	.goodsComment_warp {
		padding-bottom: 98px;
		.mask{
			height: 100%;
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.5);
			z-index: 10000;
			.product_spec{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				background: #fff;
				.spec_head {
					padding: 20px 20px 30px 20px;
					box-sizing: border-box;
					align-items: flex-start;
					overflow: initial;
					.product_img{
						padding: 10px;
						background: #fff;
						border:1px solid #ddd;/*no*/
						border-radius: 6px;
						margin-top: -50px;
						margin-right: 32px;
						img{
							width: 136px;
						}
					}
					.goods_name{
						h4{
							font-size: 26px;
							color: #000;
							line-height: 34px;
						}
						.price{
							color: #ff523d;
							font-size: 26px;
							margin-top: 26px;
						}
					}
				}
				.selct_spec{
					ul{
						padding: 0 20px;
						height: 270px;
						li{
							border-bottom: 1px solid #ddd;/*no*/
							padding: 20px 0 10px 0;
							.spec_name{
								font-size: 24px;
								color: #666;
								margin-bottom: 20px;
							}
							.spec_attr{
								span{
									font-size: 26px;
									color: #000;
									border: 1px solid #ddd;/*no*/
									height: 38px;
									width: 130px;
									border-radius: 20px;
									margin-right: 20px;
									margin-bottom: 10px;
								}
								.active{
									color: #ff523d;
									border: 1px solid #ff523d;/*no*/
								}
							}
						}
						li:first-child{
							border-top: 1px solid #ddd;/*no*/
						}
					}
					.select_num{
						padding: 20px 20px 50px 20px;
						box-sizing: border-box;
						.select_title{
							font-size: 24px;
							color: #666;

						}
						.num_box{
							width: 180px;
							background: #ff523d;
							border-radius: 40px;
							height: 44px;
							.reduce{
								width: 33.333%;
								img{
									width: 24px;
								}
							}
							.add{
								width: 33.333%;
								img{
									width: 24px;
								}
							}
							.num{
								height: 40px;
								background:#fff;
								color: #ff523d;
								font-size: 24px;
								text-align: center;
							}
						}
					}
					.spec_foot{
						height: 98px;
						background: #fff;
						border-top: 1px solid #ff523d;/*no*/
						div{
							width: 50%;
							height: 98px;
							font-size: 28px;
						}
						.add_car{
							color: #000;
						}
						.purchase{
							background: #ff523d;
							color: #fff;
						}
					}
				}
			}
		}
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
		.cntTx{
			font-size: 28px;
			color: #000;
		}
		.foot{
			height: 98px;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			border-top: 1px solid #ff523d;
			z-index: 1000;
			div{
				width: 33.333%;
				height: 98px;
				font-size: 28px;
			}
			.collection{
				padding-top: 10px;
				box-sizing: border-box;
				img{
					display: block;
					height: 56px;
					margin: 0 auto;
				}
				p{
					margin-top: 10px;
					font-size: 24px;
					color: #000;
					text-align: center;
				}
			}
			.add_car{
				color: #ff523d;
				background: #ffe7e7;
			}
			.purchase{
				background: #ff523d;
				color: #fff;
			}
		}
	}
</style>
