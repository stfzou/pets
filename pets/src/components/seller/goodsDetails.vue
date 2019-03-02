<template>
	<div class="goodsDetails_warp">
		<cube-popup type="my-popup" ref="myPopup">
			定位失败
		</cube-popup>
		
		<div class="goodsDetails_nav">
			
			<div class="back"></div>
			<div class="nav_txt flex_r_s_b">
				<router-link :to="{name:'goodsDetails'}">商品</router-link>
				<router-link :to="{name:'goodsComment'}">评论</router-link>
				<a href="###">详情</a>
			</div>
		</div>
		
		<div class="goodsDetails_slide">
			<cube-slide ref="slide" :data="slidItems">
				  <cube-slide-item v-for="(item, index) in slidItems" :key="index">
					<a href="###">
					  <img :src="item.imgAddr">
					</a>
				  </cube-slide-item>
			</cube-slide>
		</div>
		<div class="countdown flex_r_s_b">
			<div class="countdown_l">
				<span class="new">￥<b v-if="activePrice!=''">{{activePrice}}</b><b v-else>{{price}}</b></span>
				
			</div>
			<div class="countdown_r" :class="{flex_r_s_c:activePrice==''}">
				<!-- <div class="countdown_time">距离结束<span>00:45:56</span></div> -->
				<div class="old" v-if="activePrice!=''">
					<span>￥{{price}}</span>
				</div>
				<div class="progress_box flex_r_s_b">
					<div class="progress">
						<div class="progress_line" :style="'width:'+ saleNum +'%;'"></div>
					</div>
					
					<div class="sale">已售{{saleNum}}件</div>
				</div>
			</div>
			<div class="countdown_time_box">
				<div class="text">距离结束仅剩</div>
				<div class="countdown_time flex_r_f_e">
					<span class="flex_r_s_c">00</span>:<span class="flex_r_s_c">00</span>:<span class="flex_r_s_c">00</span>
				</div>
			</div>
		</div>
		<div class="product_name">{{productName}}</div>
		<div class="line"></div>
		<div class="discount">
			<ul>
				<li class="flex_r_f_s right_bg">
					<div class="list_title">优惠</div>
					<div class="mj flex_r_f_s">
						<span>满99减5</span>
						<span>满199减10</span>
					</div>
				</li>
				<li class="flex_r_f_s right_bg" @click="specShow">
					<div class="list_title">选择</div>
					<div class="parameter">
						<span v-for="(item,index) in guige">{{item.anName | parameterFilter(index,guige.length-1)}}</span>
						
					</div>
				</li>
				<li class="flex_r_f_s right_bg" @click="parameterShow">
					<div class="list_title">参数</div>
					<div class="parameter">
						<span v-if="brand!=''">{{brand+'、'}}</span>
						<span>{{sortName}}</span>
						<span v-if="sanv.length>1">{{sanv[0].anName}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="line"></div>
		<div class="addr">
			<ul>
				<li class="flex_r_f_s right_bg">
					<div class="list_title w95">配送至</div>
					<div class="address flex_r_f_s" @click="addrLink">
						<img src="../../assets/icon/map@2x.png" alt="">
						 <span>{{addr}}</span>
					</div>
				</li>
				<li class="flex_r_f_s" v-if="isDelivery == 1">
					<div class="list_title active_title">商家送货</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span v-if="deliveryTime">{{deliveryTime}}送达</span>
							<span v-if="mostFar">{{mostFar}}免费送货上门</span>
						</div>
						<p>该商家支持送货上门，订单金额未满88元将收取6元上门费；</p>
					</div>
				</li>
				<div class="tip" v-if="isWithin==0">您的地址已超过商家送货上门范围，推荐选择快递发货！</div>
				<li class="flex_r_f_s">
					<div class="list_title active_title">快递发货</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span>同城快递5元</span>
							<span v-if="isShipping==1">商家包邮</span>
							<!-- <span>满88包邮</span> -->
							
						</div>
						<p>商家承诺下单付款后{{deliveryTime}}完成发货</p>
					</div>
				</li>
				<li class="flex_r_f_s" v-if="isExtract==1">
					<div class="list_title active_title">上门自提</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span>该商家支持上门自提</span>
						</div>
						<p>商家营业时间{{startTime}}--{{endTime}}</p>
					</div>
				</li>
				
			</ul>
			<div class="promise flex_r_f_s">
				<div><span class="promise_icon">正</span>正品保证，假一赔十</div>
				<div><span class="promise_icon">退</span>{{returnService|returnServiceFilter}}</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="store_info">
			<div class="head_img flex_r_f_s">
				<img class="head_pic" :src="shopImgAddr" alt="">
				<div class="headImg_right">
					<div class="store_name flex_r_s_b">
						<div class="storeName_text">{{shopName}}</div>
						<div class="store_addr flex_r_f_s">
							<img src="../../assets/icon/map@2x.png" alt="">
							<span>{{distance}}</span>
						</div>
					</div>
					<div class="service_item">
						服务项目包含：<!-- <span v-for="(item,index) in severItem" :key="index">{{item.typeName|severItemFilter(index)}}</span> -->
						<span v-for="(item,index) in severItem" :key="index">{{item.typeName | severItemFilter(index,severItem.length-1)}}</span>
					</div>
				</div>
			</div>
			<div class="follow">
				<ul class="flex_r_s_b">
					<li>
						<div>{{attentionNum}}</div>
						<p>关注人数</p>
					</li>
					<li>
						<div>{{productNum}}</div>
						<p>商品数量</p>
					</li>
					<li>
						<div>{{saleNum}}</div>
						<p>累计销售</p>
					</li>
				</ul>
			</div>
			<div class="follow_btn flex_r_s_b">
				<div class="l_btn">关注店铺</div>
				<div class="r_btn flex_r_f_e">
					<img src="../../assets/icon/store.png" alt="">
					<span>进店逛逛</span>
				</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="buyer_comment" v-if="evalList.length>0">
			<div class="buyerCmment_title">
				<div class="flex_r_f_s">
					<img src="../../assets/icon/icon_xiaoxi.png" alt="">
					<span>卖家评论（356）</span>
				</div>
			</div>
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
			<div class="add_car flex_r_s_c" @click="specShow">加入购物车</div>
			<div class="purchase flex_r_s_c" @click="specShow">立即购买</div>
		</div>
		<div class="mask" v-show="isMask" @click.stop = "maskHide">
			<div class="mask_parameter" v-if="isParameter" @click.stop>
				<h3 class="flex_r_s_c">产品参数</h3>
				<ul>
					<cube-scroll ref="scroll">
						<li class="flex_r_f_s" v-if="brand!=''">
							<div class="parameter_l">品牌</div>
							<div class="parameter_r">{{brand}}</div>
						</li>
						<li class="flex_r_f_s" v-if="sortName!=''">
							<div class="parameter_l">分类</div>
							<div class="parameter_r">{{sortName}}</div>
						</li>
						<li class="flex_r_f_s" v-show="sanv.length>0" v-for="(item,index) in sanv" :key="index">
							<div class="parameter_l">{{item.anName}}</div>
							<div class="parameter_r">{{item.avName}}</div>
						</li>
						
					</cube-scroll>
				</ul>
				<div class="parameterBtn_box">
					<div class="parameter_btn flex_r_s_c" @click.stop="parameterHide">
						完成
					</div>
				</div>
			</div>
			<div class="product_spec" v-if="isSpec" @click.stop>
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
						<cube-scroll ref="scroll">
							
							<li v-for="(item,index) in guige">
								<div class="spec_name">{{item.anName}}</div>
								<div class="spec_attr flex_r_f_s">
									<span @click="slectAttr(item,im)" :class="{active:item.selectId == im.attrValueId}" class="flex_r_s_c" v-for="im in item.avs" :key="im.attrValueId">{{im.attrValueName}}</span>
								</div>
							</li>
						
						
						</cube-scroll>
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
		<div class="amap-page-container" v-show="false">
			<el-amap ref="map" vid="amapDemo" :plugin="plugin" class="amap-demo">
			</el-amap>
		
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default {
		data(){
			let self = this;
			return{
				endTime:'',
				startTime:'',
				slidItems:[],
				brand:'',
				sortName:'',
				shopImgAddr:'',
				shopName:'',
				severItem:[],
				saleNum:'',
				productName:'',
				productNum:'',
				attentionNum:'',
				isExtract:'',//上门自提
				isShipping:'',//是否包邮
				isWithin:'',//是否在配送范围内
				isDelivery:'',//是否支持送货上门
				isAuthentic:'',//正品保证
				evalList:[],
				disabled:true,
				isMask:false,
				isSpec:false,
				isParameter:false,
				price:'',
				activePrice:'',
				lng:'',
				lat:'',
				addr:'',
				distance:'',
				sanv:[],
				tipTxt:'',
				specAttr:[],
				guige:[],
				num:1,
				skuId:'',
				skuImg:'',
				deliveryTime:'',//多少时间内送到
				mostFar:'',
				returnService:'',
				plugin: [

					{
						pName: 'Geolocation',
						enableHighAccuracy: true,//是否使用高精度定位，默认:true
						timeout: 100,          //超过10秒后停止定位，默认：无穷大
						maximumAge: 0,           //定位结果缓存0毫秒，默认：0
						convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
						showButton: true,        //显示定位按钮，默认：true
						buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
						showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
						showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
						panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
						extensions:'all',
						events: {
							init(o) {
								// o 是高德地图定位插件实例
								o.getCurrentPosition((status, result) => {
									
									if (result && result.position) {
 										self.lng = result.position.lng;
 										self.lat = result.position.lat;
										console.log(self.lng+'           '+self.lat)
// 										self.$nextTick();
										// console.log(result)
										self.addr = result.formattedAddress;
										setTimeout(()=>{
											
											self.axios.post(Api.shopApi+'/shop/selectShopsProductDetails',self.qs.stringify({
												productId:146,
												userId:21,
												lat:self.lat,
												lng:self.lng
											}), {
												headers: {
													'Content-Type': 'application/x-www-form-urlencoded'
												}
											}).then((res)=>{
												if(res.data.code == 1){
													self.slidItems = res.data.data.pMainImgs;
													self.distance = res.data.data.shopInfo.distance;
													self.severItem = res.data.data.shopInfo.operateTypes;
													self.shopName = res.data.data.shopInfo.shopName;
													self.shopImgAddr = res.data.data.shopInfo.shopImgAddr;
													self.price = res.data.data.skus[0].original;
													if(res.data.data.activityPrice){
														self.activePrice = res.data.data.activityPrice;
													}
													if(res.data.data.shopInfo.saleNum == 0){
														self.saleNum = 0;
													}else{
														self.saleNum = Number(res.data.data.shopInfo.saleNum/res.data.data.shopInfo.productNum*100).toFixed();
													}
													self.productNum = res.data.data.shopInfo.productNum;
													self.attentionNum = res.data.data.shopInfo.attentionNum;
													self.isExtract = res.data.data.productDelivery.isExtract;
													self.isDelivery = res.data.data.productDelivery.isDelivery;
													self.isWithin = res.data.data.isWithin;
													self.isShipping = res.data.data.productDelivery.isShipping;
													self.productName = res.data.data.productName;
													self.specAttr = res.data.data.skus;
													self.skuImg = res.data.data.skus[0].skuImgAddr;
													self.returnService = res.data.data.productTips.returnService;
													if(res.data.data.shopInfo.startTime!=null){
														self.startTime = res.data.data.shopInfo.startTime;
													}
													if(res.data.data.shopInfo.endTime!=null){
														self.endTime = res.data.data.shopInfo.endTime;
													}
													if(res.data.data.productDelivery.deliveryTime!=null){
														self.deliveryTime = res.data.data.productDelivery.deliveryTime;
													}
													if(res.data.data.productDelivery.mostFar!=null){
														self.mostFar = res.data.data.productDelivery.mostFar;
													}
													if(res.data.data.brand.brandName!= null){
														self.brand = res.data.data.brand.brandName;
														
													}
													if(res.data.data.sortDto.sortName){
														self.sortName = res.data.data.sortDto.sortName;
													}
													if(res.data.data.sanv.length>0){
														self.sanv = res.data.data.sanv;
													}
													if(res.data.data.assessDto.length>0){
														self.evalList = res.data.data.assessDto;
													}
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
										},100)
										
									}else{
										let component = self.$refs.myPopup;
										component.show()
										  setTimeout(() => {
											component.hide()
										  }, 1000)
										
									}
								});
							}
						}
					}
				]
			}
		},
		mounted() {
			
			
		},
		computed: {
			getSkuId() {
				this.skus.forEach((e)=>{
					
				})
			}
		},
		filters:{
			
			severItemFilter(val,index,arrl){
				if(arrl == index){
					return val;
				}else{
					return val+'、'
				}
			},
			parameterFilter(val,index,arrl){
				if(arrl == index){
					return val;
				}else{
					return val+'、'
				}
			},
			returnServiceFilter(val){
				if(val == 1){
					return '三天退换货(未拆封)'
				}else if(val == 2){
					return '七天退换货(未拆封)'
				}else if(val == 3){
					return '不支持退换货'
				}
			}
		},
		methods:{
			parameterShow(){
				let self = this;
				this.isMask = true;
				this.isParameter = true;
				setTimeout(()=>{
					this.$refs.scroll.refresh();
				},100)
			},
			parameterHide(){
				this.isMask = false;
				this.isParameter = false;
				this.isSpec = false;
			},
			specShow(){
				this.isMask = true;
				this.isSpec = true;
				setTimeout(()=>{
					this.$refs.scroll.refresh();
				},100)
			},
			specHide(){
				this.isSpec = false;
				this.isMask = false;
				this.isParameter = false;
			},
			maskHide(){
				this.isMask = false;
				this.isParameter = false;
				this.isSpec = false;
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
				console.log(this.skuId)
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
			addrLink(){
				this.$router.push({name:'businSelectAddr'})
			},
			addShopCar(){//加入购物车
				let self = this;
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
		
			
		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.goodsDetails_warp{
		padding-bottom: 98px;
		.cube-dialog-icon i {
			color: red;
		}
		.amap-page-container{
			height: 300px;
		}
		.cube-popup-content{
			font-size: 28px;
			color: #fff;
		}
		.mask{
			height: 100%;
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.5);
			z-index: 100;
			.mask_parameter{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				background: #fff;
				h3{
					height: 70px;
					border-bottom: 1px solid #ff523d;/*no*/
					font-size: 28px;
					color: #000;
				}
				ul{
					height: 420px;
					li{
						padding: 30px 20px;
						border-top: 1px solid #e8e8e8;/*no*/
						div{
							font-size: 26px;
						}
						.parameter_l{
							color: #666;
							width: 110px;
							margin-right: 60px;
						}
						.parameter_r{
							color: #000;
							
						}
					}
					li:first-child{
						border: none;
					}
				}
				.parameterBtn_box{
					padding: 10px 20px;
					border-top: 1px solid #e8e8e8;/*no*/
					.parameter_btn{
						height: 60px;
						border-radius: 40px;
						background: #ff523d;
						font-size: 28px;
						color: #fff;
					}
				}
			}
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
								height: 42px;
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
		.goodsDetails_nav{
			height: 88px;
			position: relative;
			border-bottom: 1px solid #ff523d;
			.back{
				width: 26px;
				height: 42px;
				background:url(../../assets/icon/backColory.png) no-repeat center 0;
				background-size: cover;
				position: absolute;
				left: 20px;
				top: 50%;
				margin-top: -21px;
			}
			.nav_txt{
				height: 88px;
				margin: 0 auto;
				width: 316px;
				a{
					font-size: 30px;
					color: #000;
				}
				.router-link-active{
					color: #ff523d;
				}
			}
		}
		.goodsDetails_slide{
			height: 720px;
			.cube-slide-dots>span{
				height: 22px;
				width: 22px;
				border-radius: 50%;
				margin: 0 6px;
				background:#fff;
			}
			.cube-slide-dots>span.active{
				background: #ff523d;
			}
			.cube-slide-dots{
				bottom: 20px;
			}
			img{
				width: 720px;
			}
		}
		.countdown{
			height: 90px;
			background: #ff523d;
			padding: 0 20px;
			padding-right: 0;
			box-sizing: border-box;
			.countdown_l{
				height: 90px;
				width: 100px;
				line-height: 90px;
				span{
					font-size: 24px;
					color: #fff;
					
				}
				.new{
					b{
						font-size: 56px;
					}
					
				}
			}
			.countdown_r{
				height: 90px;
				width: 210px;
				.old{
					text-decoration:line-through;
					height: 50px;
					line-height: 50px;
					font-size: 24px;
					color: #fff;
				}
				.progress_box{
					overflow: hidden;
					.progress{
						position: relative;
						height: 20px;
						border: 1px solid #fff;
						padding: 1px;
						overflow: hidden;
						background: #fff;
						width: 100px;
						border-radius: 30px;
						.progress_line{
							height:100%;
							background: #ff523d;
							border-radius: 30px;
						}
					}
					.sale{
						font-size: 24px;
						color: #fff;
						
					}
				}
				
			}
			.countdown_time_box{
				width: 220px;
				height: 90px;
				
				border-bottom-left-radius: 45px;
				border-top-left-radius: 45px;
				background: #FFE4E1;
				.text{
					font-size: 24px;
					color: #666;
					text-align: center;
					margin: 10px 0;
				}
				.countdown_time{
					padding: 0 20px;
					box-sizing: border-box;
					span{
						width:36px;
						height:30px;
						background:#ff523d;
						border-radius:10px;
						color: #fff;
						font-size: 22px;
					}
				}
			}
		}
		.product_name{
			padding:20px;
			font-size: 26px;
			color: #000;
			line-height: 40px;
			font-weight:400;
		}
		.line{
			@include line;
		}
		.list_title{
			font-size:26px;
			color: #666;
			margin-right: 30px;
			width: 70px;
		}
		.right_bg{
			background: url(../../assets/icon/right_sjx.png) no-repeat 100% center;
			background-size: 14px;
		}
		.discount{
			ul{
				padding: 12px 20px;
				li{
					
					height: 62px;
					.mj{
						span{
							padding: 0 14px;
							height:36px;
							border:1px solid #FF523D;
							border-radius:6px;
							color: #ff523d;
							font-size: 24px;
							line-height: 36px;
							margin-right: 10px;
						}
					}
					.parameter{
						span{
							font-size: 26px;
							color: #000;
						}
					}
				}
			}
		}
		.addr{
			ul{
				padding: 15px 20px;
				.tip{
					padding: 10px 0 10px 90px;
					background: #fff1df url('../../assets/tip.png') no-repeat 50px center;
					background-size: 30px;
					font-size: 22px;
					color: #ff523d;
					margin-bottom: 25px;
				}
				.w95{
					width: 100px;
				}
				li{
					padding: 15px 0;
					.active_title{
						width: 68px;
						height: 68px;
						box-sizing: border-box;
						font-size: 26px;
						background: #ff523d;
						color: #fff;
						border-radius: 10px;
						text-align: center;
						line-height: 36px;
					}
					.address{
						height: 50px;
						padding-right: 20px;
						box-sizing: border-box;
						img{
							width: 18px;
							margin-right: 5px;
						}
						span{
							font-size: 24px;
							color: #000;
							line-height: 28px;
						}
					}
					.service{
						.service_label{
							margin-bottom: 5px;
							span{
								padding: 0 14px;
								height:36px;
								border:1px solid #FF523D;
								border-radius:6px;
								color: #ff523d;
								font-size: 24px;
								line-height: 36px;
								margin-right: 10px;
							}
						}
						p{
							font-size: 22px;
							color: #999;
							line-height: 30px;
						}
					}
				}
			}
			.promise{
				padding: $p20;
				height: 60px;
				box-sizing: border-box;
				div{
					margin-right: 36px;
					font-size: 22px;
					
					color: #666;
					.promise_icon{
						border-radius: 50%;
						color: #ff523d;
						border: 1px solid #ff523d;
						font-size: 18px;
						padding: 4px;
						display: inline-block;
						margin-right: 10px;
					}
				}
				
			}
		}
		.store_info{
			padding: 25px 20px;
			
			.head_img{
				.head_pic{
					height: 100px;
					width: 100px;
					border: 1px solid #dadada;
					border-radius: 50%;
					margin-right: 24px;
				}
				.store_name{
					width:550px;
					height: 50px;
					.storeName_text{
						font-size: 30px;
						color: #ff523d;
						
					}
					.store_addr{
						width: 180px;
						height: 50px;
						overflow:initial;
						img{
							width: 18px;
							margin-right: 10px;
						}
						span{
							font-size: 22px;
							color: #666;
							line-height: 28px;
						}
					}
				}
				.service_item{
					color: #333;
					font-size: 22px;
					margin-top: 6px;
				}
			}
			.follow{
				padding: 0 80px;
				margin-top: 26px;
				ul{
					li{
						div{
							font-size: 26px;
							color: #000;
							text-align: center;
							margin-bottom: 10px;
						}
						p{
							font-size: 22px;
							color: #666;
							text-align: center;
						}
					}
				}
			}
			.follow_btn{
				padding: 0 120px;
				box-sizing: border-box;
				margin-top: 30px;
				.l_btn{
					width: 160px;
					height: 48px;
					border-radius: 40px;
					border: 1px solid #ff523d;
					line-height: 48px;
					font-size: 22px;
					color: #ff523d;
					text-align: center;
				}
				.r_btn{
					width: 160px;
					height: 48px;
					border-radius: 40px;
					background:linear-gradient(-30deg, #fe8071, #f38f3a, #ffaf60, #ff7660);
					font-size: 22px;
					color: #fff;
					img{
						width: 35px;
					}
				}
			}
		}
		.buyer_comment{
			padding-top: 30px;
			.buyerCmment_title{
				padding: 0 20px;
				
				div{
					background: url(../../assets/icon/right_sjx.png) no-repeat 100% center;
					background-size: 14px;
					height: 40px;
					img{
						width: 30px;
						margin-right: 12px;
					}
					span{
						font-size: 26px;
						color: #FF523D;
					}
				}
			}
			.eval_list{
				height: auto;
				
				.list_item{
					padding: 30px 20px;
					box-sizing: border-box;
					
					align-items:flex-start;
					border-bottom: 1px solid #e8e8e8;/*no*/
					.head_icon{
						height: 90px;
						width: 90px;
						border-radius: 50%;
						background: #FFDFDF;
						img{
							height: 90px;
							width: 90px;
							border-radius: 50%;
						}
					}
					.right{
						width: 82%;
						.r_top{
							align-items:flex-start;
							.r_top_l{
								.user_name{
									font-size: 24px;
									color: #333;
									height: 30px;
								}
								.text{
									font-size: 26px;
									color: #000;
									margin-top: 26px;
								}
								
							}
							.cube-rate-item{
								height: 24px;
								width: 25px;
								
							}
						}
						.data{
							font-size: 20px;
							color: #999;
							margin-top: 40px;
						}
						.eval_pic{
							
							flex-wrap:wrap;
							img{
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
			border-top: 1px solid #ff523d;
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
