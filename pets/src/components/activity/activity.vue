<template>
	<div class="activity_warp">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">打卡请流浪猫狗吃年饭</div>
			<div class="share"></div>
		</div>
		<div class="activity_filter">
			<img src="../../../../kugou/src/assets/banner2.jpg" alt="">
		</div>
		<div class="activity_img">
			<img src="../../../../kugou/src/assets/banner2.jpg" alt="">
		</div>
		<div class="activity_info">
			<div class="activity_name">关爱萌宠给它一个宠物智能“芯身份证”</div>
			<div class="footprint">
				<span>浏览13.0万</span>
				<span>收藏1.3万</span>
				<span>留言65</span>
			</div>
			<div class="cost">免费</div>
			<ul class="info_list">
				<li class="flex_r_f_s richeng">
					<img class="info_l" src="../../assets/icon_time.png" alt="">
					<p>04/19 9:00~04/22 18:00</p>
				</li>
				<li class="flex_r_f_s right_sjx">
					<img class="info_l" src="../../assets/icon/map@1x.png" alt="">
					<p>成都锦江区东恒国际二栋二单元</p>
				</li>
				<li class="flex_r_f_s">
					<img class="info_l" src="../../assets/icon_renshu.png" alt="">
					<p>已报名20人/限100人报名</p>
				</li>
			</ul>
		</div>
		<div class="line"></div>
		<div class="activity_cnt">
			<img src="../../assets/active_bg.png" alt="">
		</div>
		<div class="line"></div>
		<div class="message_cnt">
			<div class="title">
				<p>留言(57)</p>
			</div>
			<ul class="eval_list">
				<li class="flex_r_s_b list_item" v-for="(item,index) in evalList" :key="index">
					<div class="head_icon">
						<!-- <img :src="item.userHeadImgAddr" alt=""> -->
					</div>
					<div class="right">
						<div class="r_top flex_r_s_b">
							<div class="r_top_l">
								<div class="user_name">
									<span v-if="item.userName1!=null">{{item.userName}}</span>
									<span v-else>未设置</span>
								</div>
								<div class="text">{{item.assessContent}}</div>
							</div>
						
						</div>
						
						<div class="data">{{item.createTime}}</div>
					</div>
				</li>
				
			</ul>
		</div>
		<div class="active_foot">
			<div class="message_input flex_r_s_b">
				<input type="text" v-model="msg" placeholder="留言">
				<span class="send_msg">发送</span>
			</div>
			<div class="bottom flex_r_f_s">
				<div class="bot_l flex_r_f_e" style="width: 50%;">
					<div class="collection">
						<img src="../../assets/shoucang.png" alt="">
						<p>收藏</p>
					</div>
					<div class="collection">
						<img src="../../assets/icon_kefu.png" alt="">
						<p>客服</p>
					</div>
				</div>
				<div class="bot_r flex_r_s_c" style="width: 50%;">
					<div class="partake flex_r_s_c">立即参加</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			return {
				evalList:[],
				msg:''
			}
		},
		mounted() {
			this.getEval(-1,-1);
		},
		methods:{
			back() {
				this.$router.go(-1); //返回上一层
			},
			getEval(isImg,isPraise){
				let self = this;
				self.axios.post(Api.shopApi+'/webShop/selectShopAssessPage',self.qs.stringify({
					shopId:18,
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
						self.evalList = res.data.data;
						console.log(res)
						
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.activity_warp{
		.line{
			height: 10px;
			background: #e8e8e8;
		}
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: fixed;
			z-index: 100;
			left: 0;
			top: 0;
			.back {
				width: 26px;
				height: 42px;
				background: url(../../assets/icon/back@2x.png) no-repeat center 0;
				background-size: cover;
			}
		
			.nav_title {
				font-size: 30px;
				color: #fff;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
		
			}
			.share{
				width: 50px;
				height: 40px;
				background: url('../../assets/icon/share@2x.png') no-repeat center 0;
				background-size: 100%;
			}
		}
		.activity_filter{
			height: 430px;
			img{
				width: 100%;
				height: 100%;
				-webkit-filter: blur(30px); /* Chrome, Opera */
				-moz-filter: blur(30px);
				-ms-filter: blur(30px);    
				filter: blur(30px);
			}
		}
		.activity_img{
			height: 70px;
			position: relative;
			img{
				position: absolute;
				width: 600px;
				height: 400px;
				border-radius: 20px;
				top: -330px;
				left: 50%;
				margin-left: -300px;
			}
		}
		.activity_info{
			padding: 30px;
			.activity_name{
				font-size: 36px;
				color: #000;
				// font-weight: bold;
			}
			.footprint{
				margin-top: 22px;
				span{
					font-size: 22px;
					color: #666;
					margin-right: 30px;
				}
			}
			.cost{
				height: 110px;
				line-height: 110px;
				color: #ff523d;
				font-size: 30px;
			}
			.info_list{
				li{
					.info_l{
						width: 20px;
						margin-right: 8px;
					}
					p{
						font-size: 26px;
						color: #000;
						
					}
					
				}
				
				.richeng{
					background: url("../../assets/icon_richeng.png") no-repeat 100% center;
					background-size: 22px;
				}
				.right_sjx{
					
					background: url("../../assets/icon/right_sjx.png") no-repeat 100% center;
					background-size: 14px;
					margin: 35px 0;
				}
			}
		}
		.activity_cnt{
			padding: 30px;
			img{
				width: 100%;
			}
		}
		.message_cnt{
			.title{
				padding: 20px;
				border-bottom: 1px solid #e8e8e8;/*no*/
				p{
					font-size: 28px;
					color: #000;
					border-left: 4px solid #ff523d;
					padding-left: 14px;
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
						
					}
				}
			}
		}
		.active_foot{
			.message_input{
				padding: 20px;
				box-sizing: border-box;
				input{
					border-radius: 50px;
					font-size: 26px;
					color: #999;
					border: 1px solid #e8e8e8;/*no*/
					padding: 20px;
					width: 600px;
					box-sizing: border-box;
					outline: none;
					color: #000;
				}
				.send_msg{
					font-size: 28px;
					color: #ff523d;
				}
			}
			.bottom{
				padding: 0 20px;
				box-sizing: border-box;
				.bot_l{
					.collection{
						padding-top: 10px;
						box-sizing: border-box;
						img{
							display: block;
							height: 56px;
							margin: 0 auto;
						}
						p{
							padding: 10px 0;
							font-size: 24px;
							color: #000;
							text-align: center;
						}
					}
				}
				.bot_r{
					.partake{
						height: 80px;
						background: #ff523d;
						color: #fff;
						font-size: 28px;
						border-radius: 10px;
						width: 100%;
					}
				}
			}
		}
	}
</style>
