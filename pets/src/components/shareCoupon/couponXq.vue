<template>
	<div class="couponXq">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">店铺优惠券</div>
			<div class="share" @click="share"></div>
		</div>
		<div class="couponInfoBox flex_r_s_c">
			<div class="couponInfo">
				<img class="sign" v-show="isReceive===1"  src="../../assets/received.png" alt="">
				<img class="sign" v-show="isReceive===0"  src="../../assets/receiveEnd.png" alt="">
				<div class="couponTop">
					<img class="couponImg" :src="couponIcan" alt="">
					<div class="couponName">{{couponName}}</div>
					<p>{{couponDesc}}</p>
					<div class="sale">￥{{couponPrice}}</div>
					<div class="condition">满{{conditionPrice}}元可用</div>
					<div class="receiveBtnBox">
						<div v-show="isReceive===2||isReceive===1" @click="receiveBtn" class="receiveBtn flex_r_s_c">立即领取</div>
						<!-- <div v-show="isReceive===1" class="receiveBtn receivedBtn flex_r_s_c">已领取</div> -->
						<div v-show="isReceive===0" class="receiveBtn receivedBtn flex_r_s_c">已领完</div>
					</div>
				</div>
				<div class="couponBottom">
					<div class="posL"></div>
					<div class="posR"></div>
					<ul>
						<li class="flex_r_f_s">
							<div class="listLeft">
								商户
							</div>
							<div class="listRight">
								{{shopName}}
							</div>
						</li>
						<li class="flex_r_f_s">
							<div class="listLeft">
								地址
							</div>
							<div class="listRight flex_r_s_b">
								<span>{{shopAddress}}</span>
								<img class="addrImg" src="../../assets/couponAddr.png" alt="">
							</div>
						</li>
						<li class="flex_r_f_s">
							<div class="listLeft">
								距离
							</div>
							<div class="listRight">
								{{distance}}
							</div>
						</li>
						<li class="flex_r_f_s">
							<div class="listLeft">
								有效期
							</div>
							<div class="listRight">
								{{couponEndTime}}前有效
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="moreCoupon">
			该商户更多优惠券
		</div>
		<div class="couponListBox">
			
			<ul>
				<li class="flex_r_s_b" v-for="item in couponList">
					<div class="list_l">
						<div class="listLeftTop flex_r_s_b">
							<img @click="couponXqLink(item)" :src="item.couponIcan" alt="">
							<div class="couponNameBox">
								<div class="couponName">{{item.couponName}}</div>
								<div class="distance">{{item.distance}}</div>
								<div class="progressBox flex_r_s_b">
									<div class="progress">
										<div :style="item.styleObj"></div>
									</div>
									<span>剩余{{item.sx}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="list_r">
						<div class="sale" :class="{activeColor:item.receiveNum==item.circulation}">￥{{item.couponPrice}}</div>
						<div class="condition">
							<span :class="{activeColor:item.receiveNum==item.circulation}" v-if="item.conditionPrice!=0">满{{item.conditionPrice}}元可用</span>
							<span :class="{activeColor:item.receiveNum==item.circulation}" v-else>无门槛</span>
						</div>
						<div class="makeTime">{{item.couponEndTime}}前有效</div>
						<div class="receiveBtnBox">
							<div v-if="item.isReceive==0||item.receiveNum==item.circulation" class="receiveBtn receivedBtn flex_r_s_c">立即领取</div>
							<div @click="receive(item)" v-else class="receiveBtn flex_r_s_c">立即领取</div>
							<!-- <div v-show="item.receiveNum==item.circulation" class="receiveBtn receivedBtn flex_r_s_c">已领完</div> -->
							<!-- <div v-show="item.isReceive==0" class="receiveBtn receivedBtn flex_r_s_c">立即领取</div> -->
							
						</div>
						
					</div>
					<img v-show="item.isReceive==1" class="imprint" src="../../assets/received.png" alt="">
					<img v-show="item.isReceive==0" class="imprint" src="../../assets/receiveEnd.png" alt="">
				</li>
			</ul>
			
		</div>
		<div class="amap-page-container" v-show="false">
			<el-amap ref="map" vid="amapDemo" :plugin="plugin" class="amap-demo"></el-amap>
			
		</div>
	</div>
</template>

<script>
	import Api from '../common/apj.js'
	export default{
		data(){
			let self = this;
			return{
				lng:0,
				lat:0,
				uId:'',
				couponId:'',
				couponList:[],
				couponName:'',
				couponIcan:'',
				shopAddress:'',
				couponDesc:'',
				couponPrice:'',
				conditionPrice:'',
				receiveNum:'',
				shopName:'',
				shopAddress:'',
				distance:'',
				couponEndTime:'',
				isReceive:'',
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
				plugin: [
				
					{
						pName: 'Geolocation',
						enableHighAccuracy: true, //是否使用高精度定位，默认:true
						timeout: 10000, //超过10秒后停止定位，默认：无穷大
						maximumAge: 0, //定位结果缓存0毫秒，默认：0
						convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
						showButton: true, //显示定位按钮，默认：true
						buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
						showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
						showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
						panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
						extensions: 'all',
						events: {
							init(o) {
								// o 是高德地图定位插件实例
								o.getCurrentPosition((status, result) => {
				
									if (result && result.position) {
				
										self.lng = result.position.lng;
										self.lat = result.position.lat;
										
									} else {
										// self.getActivityListOne();
										let toast = self.$createToast({
											txt: '定位失败，请刷新页面重新定位',
											type: 'warn'
										  })
										toast.show()
									}
								});
							}
						}
					}
				]
			}
		},
		mounted() {
			if(JSON.parse(sessionStorage.getItem('user')) == null){
				// this.$store.commit('setRouterName','activity');
				this.uId = '';
			}else{
				this.uId = JSON.parse(sessionStorage.getItem('user')).userId;
			}
			this.couponId = this.$route.query.couponId;
			this.getShopCouponList();
		},
		methods:{
			back() {
				this.$router.go(-1); //返回上一层
			},
			share(){
				let toast = this.$createToast({
					txt: '点击顶部右上角进行分享',
					type: 'warn'
				  })
				toast.show()
			},
			onPullingDown(){
				//刷新
			
			},
			onPullingUp(){
				//加载
			},
			couponXqLink(item){
				this.$router.push({
					name:'couponXq',
					query:{
						couponId:item.couponId
					}
				});
				this.couponId = this.$route.query.couponId;
				this.getShopCouponList();
			},
			receiveBtn(){
				let self = this;
				if(JSON.parse(sessionStorage.getItem('user')) == null){
					
					let url = window.location.href;
					this.$store.commit('setLoginUrl',url);
					this.$createDialog({
						type: 'confirm',
						icon: 'cubeic-warn',
						title: '需要登录后才能评论',
						confirmBtn: {
						  text: '去登录',
						  active: true,
						  disabled: false,
						  href: 'javascript:;'
						},
						cancelBtn: {
						  text: '取消',
						  active: false,
						  disabled: false,
						  href: 'javascript:;'
						},
						onConfirm: () => {
						  self.$router.push({
						  	name:'login'
						  })
						},
						
					 }).show()
					
				}else{
					
					self.axios.post(Api.userApi + '/coupon/addUserCoupon', self.qs.stringify({
						userId: self.uId,
						couponId:self.couponId,
						
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							let toast = self.$createToast({
								txt: '领取成功',
								type: 'correct'
							  })
							toast.show();
							setTimeout(()=>{
								self.getShopCouponList();
							},500)
						}else{
							alert(res.data.msg)
						}
					})
				}
			},
			getShopCouponList(){
				let self = this;
				self.axios.post(Api.userApi + '/coupon/selectCouponDetailsAndShopsInfo', self.qs.stringify({
					userId: self.uId,
					couponId: self.couponId,
					latitude: self.lat,
					longitude: self.lng
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						self.couponName = res.data.data.couponName;
						self.couponIcan = res.data.data.couponIcan;
						self.shopAddress = res.data.data.shopAddress;
						self.couponDesc = res.data.data.couponDesc;
						self.couponList = res.data.data.shopCoupons;
						self.couponPrice = res.data.data.couponPrice;
						self.conditionPrice = res.data.data.conditionPrice;
						self.receiveNum = res.data.data.receiveNum;
						self.shopName = res.data.data.shopName;
						self.shopAddress = res.data.data.shopAddress;
						self.distance = res.data.data.distance;
						self.couponEndTime = res.data.data.couponEndTime;
						self.isReceive = res.data.data.isReceive;
						self.couponList.forEach((e)=>{
							e.styleObj = {
								width:Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4) + '%'
							}
							e.sx = (100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'
						})
						console.log(self.couponList)
					}else{
						alert(res.data.msg)
					}
					
				})
			},
			receive(item){
				let self = this;
				if(JSON.parse(sessionStorage.getItem('user')) == null){
					
					let url = window.location.href;
					this.$store.commit('setLoginUrl',url);
					this.$createDialog({
						type: 'confirm',
						icon: 'cubeic-warn',
						title: '需要登录后才能评论',
						confirmBtn: {
						  text: '去登录',
						  active: true,
						  disabled: false,
						  href: 'javascript:;'
						},
						cancelBtn: {
						  text: '取消',
						  active: false,
						  disabled: false,
						  href: 'javascript:;'
						},
						onConfirm: () => {
						  self.$router.push({
						  	name:'login'
						  })
						},
						
					 }).show()
					
				}else{
					
					self.axios.post(Api.userApi + '/coupon/addUserCoupon', self.qs.stringify({
						userId: self.uId,
						couponId:item.couponId,
						
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res)=>{
						if(res.data.code == 1){
							let toast = self.$createToast({
								txt: '领取成功',
								type: 'correct'
							  })
							toast.show();
							setTimeout(()=>{
								self.getShopCouponList();
							},500)
						}else{
							alert(res.data.msg)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.couponXq{
		position: relative;
		height: 100%;
		overflow: auto;
		background: linear-gradient(150deg, #fdb366, #fbab72, #ff8c60, #ff6060);
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			z-index: 100;
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
				font-weight:400;
			}
			.share{
				width: 50px;
				height: 40px;
				background: url('../../assets/icon/share@2x.png') no-repeat center 0;
				background-size: 100%;
			}
		}
		.couponInfoBox{
			height: 900px;
			.couponInfo{
				width: 590px;
				background: #fff;
				border-radius: 10px;
				overflow: hidden;
				position: relative;
				.sign{
					position: absolute;
					width: 130px;
					height: 130px;
					top: -34px;
					right: -28px;
				}
				.couponTop{
					padding: 40px 20px 50px 20px;
					img{
						width: 178px;
						height: 178px;
						display: block;
						margin: 0 auto;
						border-radius: 10px;
					}
					.couponName{
						text-align: center;
						color: #000;
						font-size: 28px;
						padding-top: 40px;
					}
					p{
						font-size: 22px;
						color: #666;
						padding-top: 20px;
						text-align: center;
					}
					.sale{
						font-size: 60px;
						color: #ff523d;
						padding-top: 60px;
						text-align: center;
					}
					.condition{
						font-size: 24px;
						color: #ff523d;
						padding-top: 15px;
						text-align: center;
					}
					.receiveBtnBox{
						padding-top: 40px;
						.receiveBtn{
							margin: 0 auto;
							width:240px;
							height:50px;
							background:#ff523d;
							border-radius:25px;
							color: #fff;
							font-size: 26px;
						}
						.receivedBtn{
							background:#B0B0B0;
						}
						
					}
				}
				.couponBottom{
					position: relative;
					border-top: 1px dashed #e8e8e8;/*no*/
					.posL{
						width: 40px;
						height: 40px;
						border-radius: 50%;
						background: #fd9d6a;
						left: -22px;
						top: -21px;
						position: absolute
					}
					.posR{
						width: 40px;
						height: 40px;
						border-radius: 50%;
						background: #ff8c60;
						right: -22px;
						top: -20px;
						position: absolute;
					}
					ul{
						padding:20px;
						li{
							height: 52px;
							font-size: 24px;
							.addrImg{
								width: 22px;
							}
							.listLeft{
								margin-right: 18px;
								color: #333;
							}
							.listRight{
								color: #000;
								width: 460px;
							}
							span{
								display: inline-block;
								width: 400px;
								white-space: nowrap;
								overflow: hidden;
								height: 52px;
								line-height: 52px;
								text-overflow: ellipsis;
							}
						}
					}
				}
			}
		}
		.moreCoupon{
			height: 68px;
			line-height: 68px;
			text-align: center;
			font-size: 24px;
			color: #fff;
		}
		.couponListBox{
			// height: 200px;
			ul{
				padding:0 20px 10px 20px;
				overflow: hidden;
				li{
					margin-bottom: 30px;
					align-items:flex-start;
					padding: 30px 20px;
					overflow: hidden;
					background: #fff;
					position: relative;
					box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
					border-radius:10px;
					box-sizing: border-box;
					.list_l{
						width: 430px;
						.listLeftTop{
							align-items:flex-start;
							img{
								width: 178px;
								height: 178px;
								border-radius: 10px;
							}
							.couponNameBox{
								width: 220px;
								.couponName{
									font-size: 26px;
									color: #000;
									line-height: 40px;
								}
								
								.progressBox{
									padding-top: 80px;
									.progress{
										position: relative;
										width:100px;
										height:12px;
										background:#eee;
										border-radius:10px;
										div{
											width: 50%;
											height: 100%;
											background: #ff523d;
											border-radius: 10px;
										}
									}
									span{
										font-size: 22px;
										color: #666;
									}
								}
							}
						}
						.addr{
							padding-top: 35px;
							
							img{
								width: 18px;
								margin-right: 12px;
							}
							p{
								font-size: 24px;
								color: #666;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								width:385px;
							}
						}
					}
					.list_r{
						.sale{
							font-size: 60px;
							color: #ff523d;
							text-align: center;
						}
						.condition{
							color: #ff523d;
							text-align: center;
							font-size: 22px;
							padding-top: 15px;
						}
						.makeTime{
							font-size: 22px;
							color: #999;
							padding-top: 20px;
						}
						.receiveBtnBox{
							padding-top: 12px;
							.receiveBtn{
								margin: 0 auto;
								width:120px;
								height:40px;
								background:#ff523d;
								border-radius:6px; 
								color: #fff;
								font-size: 26px;
							}
							.receivedBtn{
								background:#B0B0B0;
							}
							
						}
						.saleNum{
							font-size: 22px;
							color: #999;
							padding-top: 20px;
							text-align: center;
						}
					}
					.imprint{
						position: absolute;
						width: 130px;
						height: 130px;
						top: -28px;
						right: -20px;
					}
				}
			}
		}
	}
</style>
