<template>
	<div class="couponList">
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">店铺优惠券</div>
			<div class="share" @click="share"></div>
		</div>
    <div class="couponListDialog flex_r_s_c" @click.stop="dailongHide" v-show="isDialong">
      <div class="dialongCnt" @click.stop v-show="!isDialongCnt">
        <div class="dialongCntTop">
          <div class="title">
            您咱不能使用此项权益
          </div>
          <p>仅限骨米卡特权会员预定，开通骨米卡优选俱乐部会员即可享受特权优惠权益</p>
        </div>
        <div class="btnBox flex_r_s_b">
          <div class="cancelBtn flex_r_s_c" @click="dailongHide">取消</div>
          <div class="okBtn flex_r_s_c" @click="guCardLink">确定</div>
        </div>
      </div>
      <div class="payBox" @click.stop v-show="isDialongCnt">
        <div class="popupTitle flex_r_s_c">在线支付</div>
        <div class="payment flex_r_s_b">
          <span class="payment_l">需付款</span>
          <span class="payment_r">￥{{payPrice}}</span>
        </div>
        <div class="payStyle flex_r_f_e">
          <div class="flex_c_f_e">
            <div class="payImg" @click="clickAli">
              <img src="../../assets/zfb.png" alt="">
              <div class="select" v-show="activeIndex == '1'"></div>
            </div>
            <p>支付宝支付</p>
          </div>
          <div class="flex_c_f_e">
            <div class="payImg" @click="clickWx">
              <img src="../../assets/weixin.png" alt="">
              <div class="select" v-show="activeIndex == '2'"></div>
            </div>
            <p>微信支付</p>
          </div>
        </div>
        <div class="payBtn flex_r_s_c" @click="commit">确认支付</div>
      </div>
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
      <div class="distanceSelect subNav" v-show="navIndex === 3">
      	<ul>
      		<li @click="subNavClickFour(item,index)" class="flex_r_s_b" :class="{activeSub:index===subNavIndex4}" v-for="(item,index) in couponTypeData"><span>{{item.text}}</span>
      		<img v-if="index===subNavIndex4" src="../../assets/select.png" alt=""></li>
      	</ul>
      </div>
		</div>
		<div class="couponListBox">
			<cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
			<ul>
				<li class="flex_r_s_b" v-for="item in couponList">
          <img v-if="item.couponType===3" class="privilege" src="../../assets/icon_gu30@3x.png" alt="">
          <img v-if="item.couponType===2" class="privilege" src="../../assets/icon_gu32@3x.png" alt="">
          <img v-if="item.couponType===1" class="privilege" src="../../assets/icon_gu33@3x.png" alt="">
					<div class="list_l">
						<div class="listLeftTop flex_r_s_b">
							<img @click="couponXqLink(item)" :src="item.couponIcan" alt="">
              <!-- <img src="" alt=""> -->
							<div class="couponNameBox">
								<div class="couponName">{{item.couponName | descFilter}}</div>
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
							<img src="../../assets/icon_gu31@3x.png" alt="">
							<p><router-link :to="{name:'shopCoupon',query:{shopId:item.shopId}}">{{item.shopName}}</router-link></p>
						</div>
					</div>
					<div class="list_r">
						<div class="sale">
              <span v-if="item.conditionPrice===0">￥{{item.couponPrice}}</span>
              <span v-if="item.conditionPrice!==0">￥{{item.conditionPrice}}</span>
             </div>
						<div class="condition">
							<span v-if="item.conditionPrice!==0">原价:<span class="through">{{item.couponPrice}}</span></span>
							<span v-if="item.conditionPrice==0" class="activeColor">无门槛</span>
						</div>
						<div class="makeTime">{{item.couponEndTime}}前有效</div>
						<div class="receiveBtnBox">
							<div v-if="item.isReceive==0&&item.conditionPrice==0&&item.circulation>item.receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已领取</div>
              <div v-if="item.isReceive==0&&item.conditionPrice!=0&&item.circulation>item.receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已购买</div>
              <div v-if="item.circulation==item.receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已领完</div>
							<div @click="receive(item)" v-if="item.isReceive!=0&&item.conditionPrice==0" class="receiveBtn flex_r_s_c">立即领取</div>
              <div @click="receive(item)" v-if="item.isReceive!=0&&item.conditionPrice!=0" class="receiveBtn flex_r_s_c">立即购买</div>
						</div>
						<div class="saleNum">商家共{{item.shopTotalNum}}种优惠券</div>
           <!-- <div v-if="item.isReceive!==0&&(item.shopTotalNum!=item.receiveNum)">123</div> -->
					</div>
          <img v-if="item.circulation==item.receiveNum" class="imprint" src="../../assets/receiveEnd.png" alt="">
					<img v-if="(item.isReceive===0&&item.conditionPrice==0)&&item.circulation>item.receiveNum" class="imprint" src="../../assets/received.png" alt="">
          <img v-if="item.conditionPrice!=0&&item.circulation>item.receiveNum" class="imprint" src="../../assets/buyEnd.png" alt="">
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
        couponType:'-1',
        isDialongCnt:true,
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
        couponTypeData:[{text:'全部',val:'-1'}],
				arr:[1,2,3,4,5,6,7],
				navIndex:'',
				city:'',
        couponId:'',
        environment:'',
        payPrice:'',
        activeIndex:'2',
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
        code:'',
				page:0,
        isDialong:false,
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
      this.getEnvironment();
			if(JSON.parse(localStorage.getItem('user')) == null){
				// this.$store.commit('setRouterName','activity');
				this.uId = '';
			}else{
				this.uId = JSON.parse(localStorage.getItem('user')).userId;
			}
      this.getEnvironment();
      this.getCouponType();
			this.getCouponList();
		},
    filters:{
      descFilter(val){
        if(val.length>12){
          return val.substr(0,12)+'...'
        }else{
          return val
        }
      }
    },
		methods:{
			getCouponList(){
				let self = this;
				self.axios.post(Api.userApi + '/coupon/selectCouponList', self.qs.stringify({
					userId:self.uId,
					pageNo: self.page,
					city:self.city,
					couponPrice:self.couponPrice,
					condition:self.condition,
					distance:self.distance,
					pageSize: 5,
					latitude: self.lat,
					longitude: self.lng,
					couponPTypeId:self.couponPTypeId,
          couponType:self.couponType
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						setTimeout(()=>{
              self.couponList = res.data.data;
              console.log(self.couponList)
              self.couponList.forEach((e)=>{
              	e.styleObj = {
              		width:(100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'
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
				this.$router.go(-1); //-
			},
      dailongShow() {
        this.isDialong = true;
      },
      dailongHide() {
        this.isDialong = false;

      },
      clickWx() {
        this.activeIndex = '2';

      },
      clickAli() {
        this.activeIndex = '1';

      },
      getEnvironment() { //静默授权初始化
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.environment = '0';
          this.getCode();
        } else {
          this.environment = '1';
        }
      },
      getUrlPara(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
      },
      getCode () { //静默授权
      	let self = this;
      	const local = window.location.href;
      	this.code = this.getUrlPara('code');
      	if (this.code == null || this.code === '') {
      	  window.location.href =
      	    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdf1774932d9dd96e&redirect_uri=' +
      	    encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=' + '38' + '#wechat_redirect';
      	}
      },
      getCardState(item){
        let self = this;
        self.axios.post(Api.userApi + '/boneMika/selectUserBoneMikaStatus', self.qs.stringify({//查询骨米卡状态
          userId: self.uId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((re) => {
          if(re.data.code ===1){
            if(re.data.data===1&&item.conditionPrice!=0){
              self.isDialong = true;
              self.isDialongCnt = true;
              self.couponId = item.couponId;
              self.payPrice = item.conditionPrice;
            }else if(item.conditionPrice==0&&re.data.data===1){
              self.receiveCoupon(item)
            } else{
              // alert(1)
              self.isDialong = true;
              self.isDialongCnt = false;
            }
          }else{
            alert(re.data.msg)
          }

        })
      },
      getCouponType(){
        let self = this;
        this.axios.get(Api.userApi + '/coupon/selectCouponPType', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res) {
          if(res.data.code==1){
            res.data.data.forEach((e)=>{
              self.couponTypeData.push({
                text:e.name,
                val:e.typeId
              })

            })
          }else{
            alert(res.data.msg)
          }

        }).catch(function(error) {
          console.log(error);
        });
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
					pageSize: 5,
					latitude: self.lat,
					longitude: self.lng,
					couponPTypeId:self.couponPTypeId,
          couponType:self.couponType
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
						if(res.data.data.length>0){

							setTimeout(()=>{
                console.log(res.data.data)
								res.data.data.forEach((e)=>{
									e.styleObj = {
										width:(100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'
									}
									e.sx = (100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'
                  // self.couponList.push(e)
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
				this.getCouponList(item,index)
			},
      subNavClickFour(item,index){
        this.subNavIndex4 = index;
        this.couponPTypeId = item.val;
        this.navIndex = '';
        this.page = 0;
        this.getCouponList(item,index)
      },
			receiveCoupon(item){
        let self = this;
        self.axios.post(Api.userApi + '/coupon/addUserCoupon', self.qs.stringify({
        	userId: self.uId,
        	couponId:item.couponId

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
      },
      receive(item){
				let self = this;
        let itemObj = item;

				if(JSON.parse(localStorage.getItem('user')) == null){

					let url = window.location.href;
					this.$store.commit('setLoginUrl',url);
					this.$createDialog({
						type: 'confirm',
						icon: 'cubeic-warn',
						title: '需要登录后才能领取',
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

				}else if(item.couponType==2&&item.conditionPrice!=0){
          this.payPrice = item.conditionPrice;
          this.isDialong = true;
          this.couponId = item.couponId;
        }else if(item.couponType==3){
          this.getCardState(item)

          // this.payPrice = item.conditionPrice;
          // this.isDialong = true;
        }else{
          self.receiveCoupon(item)
				}
			},
      wxH5Pay() {

        let self = this;
        this.axios.post(Api.userApi + '/couponOrder/couponOrderByWXHwPay', this.qs.stringify({
          userId: self.uId,
          couponId:self.couponId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {

            let orderInfo = {
              payUrl:res.data.data.mweb_url,
              backUrl:window.location.href,
              out_trade_no:res.data.data.out_trade_no,
              payStyle:'wx'
            }
            self.$store.commit('setOrderInfo',orderInfo)
            self.$router.push({
              name:'payRes',
              query:{
                out_trade_no:res.data.data.out_trade_no,
                backUrl:'http://app.gutouzu.com/index.html#/couponList',
                orderApi:'/couponOrder/selectCouponOrderStatus'
              }
            })
            console.log(res)

          } else {
            alert(res.data.msg)
          }
        })
        //
      },
      wxPay() { // 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口

        let self = this;
        this.axios.post(Api.userApi + '/couponOrder/wxPay/gzhh5/prepay', this.qs.stringify({
          userId: self.uId,
          couponId:self.couponId,
          code: self.getUrlPara('code')
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
              'appId': res.data.data.appId,
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': 'MD5',
              'paySign': res.data.data.paySign
            }, function(res) {
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                alert('支付成功，返回活动详情页！');
                setTimeout(() => {
                  window.location.href = "http://app.gutouzu.com/index.html#/couponList?sj="+10000*Math.random();
                }, 500)
              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                alert('取消支付！');
                setTimeout(() => {
                  window.location.href = "http://app.gutouzu.com/index.html#/couponList?sj="+10000*Math.random();
                }, 500)
              } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                alert(JSON.stringify(res))
              }
            });
          } else {
            alert(res.data.msg)
          }
        })
      },
      aliPay() { //支付宝支付

        if (this.environment == '0') {
          alert('请点击右上角用浏览器打开进行支付')
        } else {
          let self = this;
          this.axios.post(Api.userApi + '/couponOrder/ali/webpay', this.qs.stringify({
            userId: self.uId,
            couponId:self.couponId
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {

            if (res.data.code == 1) {
              //localStorage.setItem('orderNum',res.data.data.out_trade_no);
              let orderInfo = {
                payUrl:res.data.data.from,
                out_trade_no:res.data.data.out_trade_no,
                payStyle:'ali'
              }
              self.$store.commit('setOrderInfo',orderInfo)
              self.$router.push({
                name:'payRes',
                query:{
                  out_trade_no:res.data.data.out_trade_no,
                  backUrl:'http://app.gutouzu.com/index.html#/couponList',
                  orderApi:'/couponOrder/selectCouponOrderStatus'
                }
              })

              // self.isPopup = false;
            } else {
              alert(res.data.msg)
            }

          })
        }

      },
      commit() {

        if (this.activeIndex == '2' && this.environment == '0') {
          this.wxPay();
        } else if (this.activeIndex == '2' && this.environment == '1') {
          this.wxH5Pay();
        } else if (this.activeIndex == '1') {
          this.aliPay();
        }
      },
      guCardLink(){
        this.$router.push({
          name:'gumiCard'
        })
      },
		}
	}
</script>

<style lang="scss">
	.couponList{
		position: relative;
		height: 100%;
    .activeColor{
      color: #ff523d;
    }
    .couponListDialog {
      position: fixed;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.6);
      .dialongCnt{
        width: 600px;
        background: #fff;
        padding-top: 50px;
        border-radius: 10px;
        .dialongCntTop{
          .title{
            font-size: 30px;
            color: #000;
            font-weight:bold;
            text-align: center;
          }
          p{
            color: #666;
            font-size: 28px;
            font-weight: bold;
            padding: 50px 30px 0 30px;
            text-align: center;
            line-height: 34px;
          }
        }
        .btnBox {
          box-sizing: border-box;
          padding: 30px 0;
          div {
            width: 50%;
            height: 70px;
            font-size: 30px;
            box-sizing: border-box;
            color: #ff523d;
          }
          .cancelBtn {
            color: #333;
          }
        }
      }
      .payBox {
        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
        width: 100%;

        .payBtn {
          height: 96px;
          background: #FF523D;
          color: #fff;
          font-size: 28px;
        }

        .payStyle {
          height: 286px;

          &>div {
            position: relative;

            .payImg {
              position: relative;

              img {
                width: 80px;
              }

              .select {
                width: 38px;
                height: 38px;
                background: url('../../assets/select.png') no-repeat center 0;
                background-size: cover;
                position: absolute;
                right: -10px;
                top: -10px;
              }
            }

            p {
              margin-top: 10px;
              font-size: 28px;
              color: #000;
            }

          }
        }

        .popupTitle {
          height: 72px;
          border-bottom: 1px solid #FF523D;
          /*no*/
          font-size: 28px;
          color: #000;
        }

        .payment {
          height: 68px;
          padding: 0 20px;
          box-sizing: border-box;

          .payment_l {
            font-size: 28px;
            color: #000;
          }

          .payment_r {
            font-size: 28px;
            color: #FF523D;
          }
        }
      }
    }
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
          position: relative;
					align-items:flex-start;
					padding: 30px 20px;
					overflow: hidden;
					background: #fff;
					position: relative;
					box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
					border-radius:10px;
					box-sizing: border-box;
          .privilege{
            position: absolute;
            left: 0;
            top: 20px;
            width: 150px;
            z-index: 100;
          }
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
									font-size: 28px;
									color: #000;
									line-height: 34px;
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
								width: 20px;
								margin-right: 12px;
							}
							p{
								font-size: 24px;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								width:385px;
                a{
                  color: #666;
                  height: 30px;
                  line-height: 30px;
                }
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
							text-align: center;
							font-size: 22px;
							padding-top: 18px;
              color: #999;
						}
            .through{
              text-decoration:line-through;
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
