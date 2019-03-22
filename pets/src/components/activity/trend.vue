<template>
	<div class="trend_warp">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">动态正文</div>
			<div class="share flex_r_s_b" @click="reportHide">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="trend_cnt">
			<div class="trend_mask" v-if="isMask" @click.stop="maskHide">
				<div class="share_box" v-if="!isReport" @click.stop>
					<div class="share flex_r_f_s" @click.stop="share">
						<img src="../../assets/icon/active_share.png" alt="">
						<span>分享</span>
					</div>
					<div class="report flex_r_f_s" @click.stop="reportShow">
						<img src="../../assets/icon_jubao.png" alt="">
						<span>举报</span>
					</div>
				</div>
				<div class="trend_report" v-else @click.stop>
					<div class="title flex_r_s_b">
						<span class="cancel" @click.stop="maskHide">取消</span>
						<span class="mid">举报</span>
						<span class="confirm">确定</span>
					</div>
					<ul class="report_list">
						<li v-for="(item,index) in reportData">
							<div @click="selectReport(index)" class="flex_r_s_c" :class="{active:index == activeIndex}">{{item}}</div>
						</li>
					
					</ul>
				</div>
			</div>
			
			<div class="userInfo flex_r_f_s">
				<div class="headImg">
					<img src="../../assets/head_icon.png" alt="">
				</div>
				<div class="mid">
					<div class="userName">黛玉仙女的怪阿姨</div>
					<div class="time">2018-08-20</div>
				</div>
				<div class="follow flex_r_s_c">+关注</div>
			</div>
			<div class="text_cnt">
				的时间放假的说法活动结束好绝对是富几点睡附近很多事if好看的健身房的说法的说法
			</div>
			<div class="trend_img flex_r_s_b">
				<img src="../../assets/images/seller_pic.png" alt="">
				<img src="../../assets/images/seller_pic.png" alt="">
				<img src="../../assets/images/seller_pic.png" alt="">
				<img src="../../assets/images/seller_pic.png" alt="">
				<img src="../../assets/images/seller_pic.png" alt="">
				<img src="../../assets/images/seller_pic.png" alt="">
			</div>
			<div class="trend_label">
				<div class="addr flex_r_f_s"><img src="../../assets/icon/map@2x.png" alt=""><span>牛王庙</span></div>
				<div class="footprint flex_r_f_s"><img src="../../assets/footprint.png" alt=""><span>胖太</span></div>
				<div class="explain">#异瞳#</div>
			</div>
			<div class="like_box">
				<div class="like flex_r_f_s">
					<i class="cubeic-like"></i>
					<span>34人点赞</span>
				</div>
				<div class="like_people flex_r_s_b">
					<div class="likeHeadImg">
						<img src="../../assets/head_icon.png" alt="">
					</div>
					<div class="likeHeadImg">
						<img src="../../assets/head_icon.png" alt="">
					</div>
					<div class="likeHeadImg">
						<img src="../../assets/head_icon.png" alt="">
					</div>
					<div class="likeHeadImg">
						<img src="../../assets/head_icon.png" alt="">
					</div>
					<div class="likeHeadImg">
						<img src="../../assets/head_icon.png" alt="">
					</div>
					<div class="likeHeadImg active flex_r_s_c">
						<div class="flex_r_s_b" @click="praiseLink">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					
				</div>
			</div>
			
		</div>
		<div class="line"></div>
		<div class="trend_comment">
			<div class="title flex_r_s_b">
				<div class="title_l flex_r_s_c">
					评论105
				</div>
				<div class="title_r flex_r_f_s">
					<img src="../../assets/icon-chakan.png" alt="">
					<span>650</span>
				</div>
			</div>
			<div class="comment_list">
				<cube-scroll ref="scroll">
					<ul>
						<li class="flex_r_s_b">
							<div class="list_l">
								<img src="../../assets/head_icon.png" alt="">
							</div>
							<div class="list_mid">
								<div class="userName">自由犬</div>
								<div class="comment_cent">的核辐射的返回到健身房大煞风景</div>
							</div>
							<div class="list_r">12:23</div>
						</li>
						<li class="flex_r_s_b">
							<div class="list_l">
								<img src="../../assets/head_icon.png" alt="">
							</div>
							<div class="list_mid">
								<div class="userName">自由犬</div>
								<div class="comment_cent">的核辐射的返回到健身房大煞风景</div>
							</div>
							<div class="list_r">12:23</div>
						</li>
						<li class="flex_r_s_b">
							<div class="list_l">
								<img src="../../assets/head_icon.png" alt="">
							</div>
							<div class="list_mid">
								<div class="userName">自由犬</div>
								<div class="comment_cent">的核辐射的返回到健身房大煞风景</div>
							</div>
							<div class="list_r">12:23</div>
						</li>
					</ul>
				</cube-scroll>
			</div>
			<div class="send_comment flex_r_s_b">
				<input type="text" v-model="val" placeholder="添加一条评论" />
				<div class="send_btn">发送</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				val:'',
				isMask:false,
				isReport:false,
				reportData:['垃圾营销','有害信息','违法信息','诈骗信息','不实信息'],
				activeIndex:0
			}
		},
		methods:{
			back() {
				this.$router.go(-1); //返回上一层
			},
			maskHide(){
				this.isMask = false;
			},
			maskShow(){
				this.isMask = true;
			},
			reportShow(){
				this.isReport = true;
				this.isMask = true;
			},
			reportHide(){
				this.isReport = false;
				this.isMask = true;
			},
			selectReport(index){
				this.activeIndex = index;
			},
			share(){
				this.isMask = false
				let toast = this.$createToast({
					txt: '点击浏览器顶端最右边进行分享',
					type: 'warn'
				  })
				toast.show()
			},
			praiseLink(){
				this.$router.push({
					name:'praise'
				})
			}
		}
	}
</script>

<style lang="scss">
	.trend_warp{
		padding-top: 88px;
		
		.line{
			height: 10px;
			background: #e8e8e8;
		}
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			position: fixed;
			border-bottom: 1px solid #FF523D;
			background: #fff;
			left: 0;
			top: 0;
			z-index: 100;
		
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
			.share{
				width: 50px;
				height: 10px;
				span{
					width: 6px;/*no*/
					height: 6px;/*no*/
					border-radius: 50%;
					background: #FF523D;
				}
			}
		}
		.trend_cnt{
			padding: 0 20px 0 20px;
			position: relative;
			
			.trend_mask{
				height: 100%;
				width: 100%;
				left: 0;
				top: 0;
				position: fixed;
				background: rgba(0,0,0,0.3);
				z-index: 1000;
				.share_box{
					padding: 26px;
					background: #fff;
					border-radius:10px;
					position: absolute;
					right: 0;
					top: 88px;
					z-index: 10;
					div{
						img{
							width:30px;
							margin-right: 6px;
						}
						span{
							font-size: 28px;
							color: #333;
						}
					}
					.share{
						margin-bottom: 50px;
					}
				}
				.trend_report{
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					background: #fff;
					.title{
						height: 70px;
						font-size: 28px;
						color: #333;
						padding: 0 40px;
						box-sizing: border-box;
						border-bottom: 1px solid #ff523d;/*no*/
					}
					.report_list{
						li{
							padding: 15px 0;
							div{
								height: 70px;
								box-sizing: border-box;
								font-size: 26px;
								color: #333;
							}
							.active{
								border-top:1px solid #e8e8e8;/*no*/ 
								border-bottom:1px solid #e8e8e8;/*no*/
								color: #FF523D;
							}
						}
					}
				}
			}
			
			.userInfo{
				padding: 20px 0;
				box-sizing: border-box;
				.headImg{
					height: 90px;
					width: 90px;
					border-radius: 50%;
					background: #ffdfdf;
					margin-right: 20px;
					img{
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.mid{
					width: 250px;
					margin-right: 180px;
					.userName{
						font-size: 28px;
						color: #000;
					}
					.time{
						font-size: 22px;
						color: #999;
						margin-top: 16px;
					}
				}
				.follow{
					width:100px;
					height:40px;
					border:1px solid #FF523D;/*no*/
					border-radius:6px;
					color: #FF523D;
					font-size: 24px;
				}
			}
			.text_cnt{
				font-size: 24px;
				color: #333;
				line-height: 30px;
				margin-bottom: 10px;
			}
			.trend_img{
				flex-wrap: wrap;
				img{
					width: 220px;
					height: 220px;
					display: block;
					margin-bottom: 10px;
					border-radius: 2px;
				}
				
			}
			.trend_label{
				font-size: 22px;
				color: #666;
				margin-top: 5px;
				div{
					line-height: 34px;
				}
				.addr{
					width:110px;
					margin-right: 60px;
					
					img{
						width: 18px;
						margin-right: 10px;
					}
				}
				.footprint{
					width: 100px;
					margin: 15px 0;
					img{
						width: 22px;
						margin-right: 10px;
					}
				}
			}
			.like_box{
				margin-top: 52px;
				.like{
					i{
						font-size: 28px;
						margin-right: 10px;
						color: #FF523D;
					}
					span{
						font-size: 22px;
						color: #666;
					}
				}
				.like_people{
					padding:20px 0 30px 0;
					.likeHeadImg{
						width: 90px;
						height: 90px;
						border-radius: 50%;
						background:#ffdfdf;
						img{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.active{
						background: #e8e8e8;
						div{
							width: 50px;
							height: 10px;
							span{
								height: 6px;/*no*/
								width: 6px;/*no*/
								border-radius: 50px;
								background: #999999;
							}
						}
						
					}
				}
			}
		}
		.trend_comment{
			.title{
				height: 70px;
				border-bottom: 1px solid #e8e8e8;/*no*/
				padding: 0 20px;
				box-sizing: border-box;
				.title_l{
					height: 70px;
					width: 106px;	
					border-bottom: 1px solid #ff523d;/*no*/
					box-sizing: border-box;
					color: #ff523d;
					font-size: 26px;
				}
				.title_r{
					width: 100px;
					img{
						width: 40px;
						margin-right: 10px;
					}
					span{
						font-size: 26px;
						color: #666;
					}
				}
			}
			.comment_list{
				height: 300px;
				ul{
					padding: 0 20px;
					li{
						padding: 30px 0;
						box-sizing: border-box;
						border-bottom: 1px solid #e8e8e8;/*no*/;
						align-items: flex-start;
						.list_l{
							height: 90px;
							width: 90px;
							border-radius: 50%;
							background: #ffdfdf;
							border-radius: 50%;
							img{
								display: block;
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.list_mid{
							width: 488px;
							.userName{
								font-size: 28px;
								color: #333;
								line-height: 54px;
							}
							.comment_cent{
								font-size: #000;
								font-size: 26px;
								line-height: 54px;
							}
						}
						.list_r{
							font-size: 22px;
							color: #999;
						}
					}
					li:last-child{
						border: none;
					}
				}
			}
			.send_comment{
				padding: 20px;
				box-sizing: border-box;
				border-top: 1px solid #ff523d;
				input{
					padding: 15px;
					border-radius: 40px;
					border: 1px solid #e8e8e8;/*no*/
					font-size: 26px;
					color: #999;
					width: 600px;
					box-sizing: border-box;
				}
				.send_btn{
					font-size: 26px;
					color: #999;
				}
			}
		}
	}
</style>
