<template>
	<div class="goodsDetails_warp">
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
					  <img :src="item.url">
					</a>
				  </cube-slide-item>
			</cube-slide>
		</div>
		<div class="countdown flex_r_s_b">
			<div class="countdown_l">
				<span class="new">￥<b>75.00</b></span>
				
			</div>
			<div class="countdown_r">
				<!-- <div class="countdown_time">距离结束<span>00:45:56</span></div> -->
				<div class="old">￥105.00</div>
				<div class="progress_box flex_r_s_b">
					<div class="progress">
						<div class="progress_line" :style="'width:'+ 80 +'%;'"></div>
					</div>
					
					<div class="sale">已售54%</div>
				</div>
			</div>
			<div class="countdown_time_box">
				<div class="text">距离结束仅剩</div>
				<div class="countdown_time flex_r_f_e">
					<span class="flex_r_s_c">00</span>:<span class="flex_r_s_c">00</span>:<span class="flex_r_s_c">00</span>
				</div>
			</div>
		</div>
		<div class="product_name">疯狂的小狗博美专用狗粮1.5KG*2包幼犬成犬粮小型犬美毛去泪痕6斤</div>
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
						<span>1.5kg</span>,
						<span>鸡肉味</span>
					</div>
				</li>
				<li class="flex_r_f_s right_bg" @click="parameterShow">
					<div class="list_title">参数</div>
					<div class="parameter">
						<span>味道</span>
						<span>颜色</span>
						<span>尺寸</span>...
					</div>
				</li>
			</ul>
		</div>
		<div class="line"></div>
		<div class="addr">
			<ul>
				<li class="flex_r_f_s right_bg">
					<div class="list_title w95">配送至</div>
					<div class="address flex_r_f_s">
						<img src="../../assets/icon/map@2x.png" alt="">
						<span>四川成都市锦江区锦华路三段</span>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_title active_title">商家送货</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span>30分钟送达</span>
							<span>2KM内免费送货上门</span>
						</div>
						<p>该商家支持送货上门，订单金额未满88元将收取6元上门费；</p>
					</div>
				</li>
				<div class="tip">您的地址已超过商家送货上门范围，推荐选择快递发货！</div>
				<li class="flex_r_f_s">
					<div class="list_title active_title">快递发货</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span>同城快递5元</span>
							<span>满88包邮</span>
							<span>商家包邮</span>
						</div>
						<p>商家承诺下单付款后12小时内完成发货</p>
					</div>
				</li>
				<li class="flex_r_f_s">
					<div class="list_title active_title">上门自提</div>
					<div class="service">
						<div class="service_label flex_r_f_s">
							<span>该商家支持上门自提</span>
						</div>
						<p>商家营业时间9：30--22：00</p>
					</div>
				</li>
				
			</ul>
			<div class="promise flex_r_f_s">
				<div><span class="promise_icon">正</span>正品保证，假一赔十</div>
				<div><span class="promise_icon">退</span>七天退换货（未拆封）</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="store_info">
			<div class="head_img flex_r_f_s">
				<img class="head_pic" src="../../assets/head_icon.png" alt="">
				<div class="headImg_right">
					<div class="store_name flex_r_s_b">
						<div class="storeName_text">自由犬宠物用品</div>
						<div class="store_addr flex_r_f_s">
							<img src="../../assets/icon/map@2x.png" alt="">
							<span>距离2.5公里</span>
						</div>
					</div>
					<div class="service_item">
						服务项目包含：用品销售、美容美发、寄养看护
					</div>
				</div>
			</div>
			<div class="follow">
				<ul class="flex_r_s_b">
					<li>
						<div>123</div>
						<p>关注人数</p>
					</li>
					<li>
						<div>123</div>
						<p>商品数量</p>
					</li>
					<li>
						<div>123</div>
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
		<div class="buyer_comment">
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
						<li class="flex_r_f_s">
							<div class="parameter_l">品牌</div>
							<div class="parameter_r">疯狂的小狗</div>
						</li>
						<li class="flex_r_f_s">
							<div class="parameter_l">品牌</div>
							<div class="parameter_r">疯狂的小狗</div>
						</li>
						<li class="flex_r_f_s">
							<div class="parameter_l">品牌</div>
							<div class="parameter_r">疯狂的小狗</div>
						</li>
						<li class="flex_r_f_s">
							<div class="parameter_l">品牌</div>
							<div class="parameter_r">疯狂的小狗</div>
						</li>
						<li class="flex_r_f_s">
							<div class="parameter_l">宠物体型</div>
							<div class="parameter_r">疯狂的小狗</div>
						</li>
						<li class="flex_r_f_s">
							<div class="parameter_l">宠物体型</div>
							<div class="parameter_r">疯狂的小狗</div>
						</li>
						<li class="flex_r_f_s">
							<div class="parameter_l">宠物体型</div>
							<div class="parameter_r">疯狂的小狗</div>
						</li>
						<li class="flex_r_f_s">
							<div class="parameter_l">宠物体型</div>
							<div class="parameter_r">疯狂的小狗</div>
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
						<img src="../../assets/product.png" alt="">
					</div>
					<div class="goods_name">
						<h4>疯狂的小狗博美专用狗粮1.5KG*2包幼犬成犬粮小型犬美毛去泪痕6斤</h4>
						<div class="price">￥75.00</div>
					</div>
				</div>
				<div class="selct_spec">
					
					<ul>
						<cube-scroll ref="scroll">
							<li v-for="(item,index) in specAttr">
								<div class="spec_name">{{item.name}}</div>
								<div class="spec_attr flex_r_f_s">
									<span @click="slectAttr(item,im)" :class="{active:item.selectId == im.anId}" class="flex_r_s_c" v-for="im in item.attr" :key="im.anid">{{im.anName}}</span>
								</div>
							</li>
						
						
						</cube-scroll>
					</ul>
					<div class="select_num flex_r_s_b">
						<div class="select_title">数量选择</div>
						<div class="num_box flex_r_f_e">
							<img @click="reduceGoods" class="reduce" src="../../assets/reduce.png" alt="">
							<span class="num flex_r_s_c">{{num}}</span>
							<img @click="addGoods" class="add" src="../../assets/add.png" alt="">
						</div>
					</div>
					<div class="spec_foot flex_r_f_s">
						<div class="add_car flex_r_s_c">加入购物车</div>
						<div class="purchase flex_r_s_c">立即购买</div>
					</div>
				</div>
				
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				slidItems:[
					{
						url: require('../../assets/banner.png')
					},
					{
						url:require('../../assets/banner.png')
					},
					{
						url:require('../../assets/banner.png')
					}
				],
				evalList:[],
				disabled:true,
				isMask:false,
				isSpec:false,
				isParameter:false,
				specAttr:[
					{selectId:'1',name:'重量',attr:[{anId:'1',anName:'0.5KG'},{anId:'2',anName:'1.5KG'}]},
					{selectId:'3',name:'鸡肉味',attr:[{anId:'3',anName:'鸡肉味'},{anId:'4',anName:'牛肉味'}]}
				],
				num:1
			}
		},
		mounted() {
			this.getEval(-1,-1);
			
		},
		methods:{
			getEval(isImg,isPraise){
				let self = this;
				self.axios.post('/webShop/selectShopAssessPage',self.qs.stringify({
					shopId:23,
					isImg:isImg,
					isPraise:isPraise,
					pageNo:0,
					pageSize:5
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						if(res.data.data.length>2){
							self.evalList = res.data.data.slice(0,2);
						}else{
							self.evalList = res.data.data;
						}
						
					}
				})
			},
			parameterShow(){
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
				item.selectId = im.anId;
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
			}

		}
	}
</script>

<style lang="scss">
	@import '../../style/common.scss';
	@import '../../style/mixin.scss';
	.goodsDetails_warp{
		padding-bottom: 98px;
		.mask{
			height: 100%;
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,0.5);
			z-index: 10000;
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
								width: 24px;
							}
							.add{
								width: 24px;
							}
							.num{
								height: 40px;
								width: 50px;
								background:#fff;
								color: #ff523d;
								font-size: 24px;
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
					margin: 15px 0;
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
						height: 38px;
						img{
							width: 18px;
							margin-right: 5px;
						}
						span{
							font-size: 24px;
							color: #000;
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
						width: 165px;
						height: 50px;
						img{
							width: 18px;
							margin-right: 10px;
						}
						span{
							font-size: 22px;
							color: #666;
						}
					}
				}
				.service_item{
					color: #333;
					font-size: 22px;
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
