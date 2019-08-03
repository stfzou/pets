<template>
	<div class="couponList">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">店铺优惠券</div>
			<div class="share" @click="share"></div>
		</div>
		<div class="selectNav flex_r_f_e">
			<div class="item" @click="navClick(index)" :class="{active:index === navIndex}" v-for="(item,index) in navData">
				<span>{{item}}</span>
				<img v-if="index === navIndex" src="../../assets/icon/blank_top.png" alt="">
				<img v-else src="../../assets/icon/blank_btom.png" alt="">
			</div>

			<div class="distanceSelect subNav" v-show="navIndex === 0">
				<ul>
					<li @click="subNavClick(item,index)" class="flex_r_s_b" :class="{activeSub:index===subNavIndex}" v-for="(item,index) in distanceList"><span>{{item.text}}</span>
					<img v-if="index===subNavIndex" src="../../assets/select.png" alt=""></li>
				</ul>
			</div>
			<div class="distanceSelect subNav" v-show="navIndex === 1">
				<ul>
					<li @click="subNavClickTwo(item,index)" class="flex_r_s_b" :class="{activeSub:index===subNavIndex2}" v-for="(item,index) in conditionData"><span>{{item.text}}</span>
					<img v-if="index===subNavIndex2" src="../../assets/select.png" alt=""></li>
				</ul>
			</div>
			<div class="distanceSelect subNav" v-show="navIndex === 2">
				<ul>
					<li @click="subNavClickThree(item,index)" class="flex_r_s_b" :class="{activeSub:index===subNavIndex3}" v-for="(item,index) in discountData"><span>{{item.text}}</span>
					<img v-if="index===subNavIndex3" src="../../assets/select.png" alt=""></li>
				</ul>
			</div>
		</div>
		<div class="couponListBox">
			<cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
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
						<div class="addr flex_r_f_s">
							<img src="../../assets/icon/map@2x.png" alt="">
							<p>{{item.shopAddr}}</p>
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
						</div>
						<div class="saleNum">商家共{{item.shopTotalNum}}种优惠券</div>
					</div>
					<img v-show="item.isReceive==1" class="imprint" src="../../assets/received.png" alt="">
					<img v-show="item.isReceive==0" class="imprint" src="../../assets/receiveEnd.png" alt="">
				</li>
			</ul>
			</cube-scroll>
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
				distanceList:[
					{text:'全城区域',val:'-1'},{text:'1km范围内',val:'1'},{text:'3km范围内',val:'3'},{text:'5km范围内',val:'5'},{text:'10km范围内',val:'10'},{text:'10km范围外',val:'11'}
				],
				conditionData:[
					{text:'全部',val:'-1'},{text:'无门槛使用',val:'0'},{text:'1~100元可以用',val:'1'},{text:'101~200元可以用',val:'2'},
					{text:'201~300元可以用',val:'3'},{text:'301~500元可以用',val:'4'},{text:'500以上',val:'5'},
				],
				discountData:[
					{text:'全部',val:'-1'},{text:'50元以内',val:'50'},{text:'100元以内',val:'100'},{text:'200元以内',val:'200'},
					{text:'300元以内',val:'300'},{text:'500元以内',val:'500'},{text:'500以上',val:'600'},
				],
				arr:[1,2,3,4,5,6,7],
				navIndex:'',
				city:'',
				subNavIndex:0,
				subNavIndex2:0,
				subNavIndex3:0,
				subNavIndex4:'',
				navData:['距离范围','优惠面额','使用条件','商品类型'],
				couponList:[],
				couponPTypeId:'',
				couponPrice:'',
				condition:'',
				distance:'',
				uId:'',
				page:0,
				lng:'104.1608900000',
				lat:'30.7214200000',
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
			this.getCouponList();
		},
		methods:{
			getCouponList(){
				let self = this;
				self.axios.post(Api.userApi + '/coupon/selectCouponList', self.qs.stringify({
					userId: self.uId,
					pageNo: 0,
					city:self.city,
					couponPrice:self.couponPrice,
					condition:self.condition,
					distance:self.distance,
					pageSize: 2,
					latitude: self.lat,
					longitude: self.lng,
					couponPTypeId:self.couponPTypeId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						setTimeout(()=>{
              self.couponList = res.data.data;
              self.couponList.forEach((e)=>{
              	e.styleObj = {
              		width:Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4) + '%'
              	}
              	e.sx = (100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'
              })
							self.$refs.scroll.forceUpdate();
              setTimeout(()=>{
              	self.$refs.scroll.refresh();
              },100)
						},500)
					}else{
						alert(res.data.msg)
						setTimeout(()=>{
							self.$refs.scroll.forceUpdate();
						},500)
					}

				})
			},
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
			couponXqLink(item){
				this.$router.push({
					name:'couponXq',
					query:{
						couponId:item.couponId
					}
				})
			},
			onPullingDown(){
				//刷新
				this.page = 0;
				this.getCouponList();
			},
			onPullingUp(){
				//加载
				let self = this;
				self.page++
				self.axios.post(Api.userApi + '/coupon/selectCouponList', self.qs.stringify({
					userId: self.uId,
					pageNo: self.page,
					city:self.city,
					couponPrice:self.couponPrice,
					condition:self.condition,
					distance:self.distance,
					pageSize: 2,
					latitude: self.lat,
					longitude: self.lng,
					couponPTypeId:self.couponPTypeId
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						if(res.data.data.length>0){

							setTimeout(()=>{

								res.data.data.forEach((e)=>{
									e.styleObj = {
										width:Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4) + '%'
									}
									e.sx = (100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'

								});
                self.couponList.push(...res.data.data);
								self.$refs.scroll.forceUpdate();
								setTimeout(()=>{
									self.$refs.scroll.refresh();
								},100)

							},500)
						}else{

							setTimeout(()=>{
								self.$refs.scroll.forceUpdate();
							},500)
						}
					}else{
						alert(res.data.msg)
						setTimeout(()=>{
							self.$refs.scroll.forceUpdate();
						},500)
					}

				})
			},
			navClick(index){ //条件筛选显示
				if(this.navIndex === index){
					this.navIndex = '';

				}else{
					this.navIndex = index;
				}

			},
			subNavClick(item,index){//条件筛选
				this.subNavIndex = index;
				this.distance = item.val;
				this.navIndex = '';
				this.page = 0;
				this.getCouponList()
			},
			subNavClickTwo(item,index){//条件筛选
				this.subNavIndex2 = index;
				this.condition = item.val;
				this.navIndex = '';
				this.page = 0;
				this.getCouponList()
			},
			subNavClickThree(item,index){
				this.subNavIndex3 = index;
				this.couponPrice = item.val;
				this.navIndex = '';
				this.page = 0;
				this.getCouponList()
			},
			receive(item){
				let self = this;
				if(JSON.parse(sessionStorage.getItem('user')) == null){

					let url = window.location.href;
					this.$store.commit('setLoginUrl',url);
					this.$createDialog({
						type: 'confirm',
						icon: 'cubeic-warn',
						title: '需要登录后才参加活动',
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
								self.page = 0;
								self.getCouponList();
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
	.couponList{
		position: relative;
		height: 100%;
		.top_nav {
			padding: 0 20px;
			height: 88px;
			box-sizing: border-box;
			z-index: 100;
			border-bottom: 1px solid #ff523d;/*no*/
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
				font-weight:400;
			}
			.share{
				width: 50px;
				height: 40px;
				background: url('../../assets/icon/active_share.png') no-repeat center 0;
				background-size: 100%;
			}
		}
		.selectNav{
			height: 68px;
			border-bottom: 1px solid #bbbbbb;/*no*/
			position: relative;
			.item{
				span{
					color: #000;
					font-size: 28px;
				}
				img{
					width: 16px;
				}
			}
			.active{
				span{
					color: #ff523d
				}
			}
			.subNav{
				position: absolute;
				top: 69px;
				left: 0;
				width: 100%;
				box-sizing: border-box;
				background: #fff;
				z-index: 1000;
				ul{
					padding:10px 20px;
					li{
						padding:15px 0;
						img{
							width: 28px;
						}
						span{
							font-size: 26px;
							color: #333;
						}
					}
					.activeSub{
						span{
							color: #ff523d;
						}
					}
				}
			}
		}
		.couponListBox{
			position:absolute;
			top: 157px;
			bottom: 0;
			left: 0;
			right: 0;
			background: #f5f5f5;
			ul{
				padding:0 20px 10px 20px;

				overflow: hidden;
				li{
					margin-top: 30px;
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
								.distance{
									font-size: 22px;
									color: #666;
									margin-top: 35px;
								}
								.progressBox{
									padding-top: 24px;
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
								height: 30px;
								line-height: 30px;
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
							padding-top: 18px;
						}
						.activeColor{
							color: #999;
						}
						.makeTime{
							font-size: 22px;
							color: #999;
							padding-top: 24px;
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
