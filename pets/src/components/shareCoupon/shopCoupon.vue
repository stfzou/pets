<template>
	<div class="shopCoupon">
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
          <div class="okBtn flex_r_s_c" @click="guCardLink">查看权益</div>
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
		<div class="top_nav flex_r_s_b">
			<div class="back" @click="back"></div>
			<div class="nav_title">{{shopName}}</div>
			<div class="share" @click="share"></div>
		</div>
		<div class="shopBox flex_c_f_e">
			<img class="shopImg" v-if="shopImgAddr!=null" :src="shopImgAddr" alt="">
      <img class="shopImg" v-else src="../../assets/head_icon.png" alt="">
      <!-- <div class="operateTypes">主营:<span v-for="item in operateTypes">{{item.typeName}}</span></div> -->
      <div class="shopDesc">店铺简介:{{shopDesc}}</div>
			<a :href="navUrl" class="addr flex_r_s_b">
        <p>商户地址:<span>{{shopAddress}}</span></p>
				<img src="../../assets/icon/icon_she56@3x.png" alt="">
			</a>
      <div class="distance">门店距离:<span>{{distance}}</span></div>
      <div class="storeNum" v-if="storeNum!=0">相关门店:<span @click="goShopStore">查看{{storeNum}}家相关门店</span></div>
      <div class="distance" >营业时间:<span style="color:#000000;">{{startTime}}</span></div>
		</div>

		<div class="couponListBox">

			<ul>
				<li class="flex_r_s_b" v-for="(item,index) in couponList" :key="index">

          <img v-if="item.couponType===3" class="privilege" src="../../assets/icon_gu30@3x.png" alt="">
          <img v-if="item.couponType===2" class="privilege" src="../../assets/icon_gu32@3x.png" alt="">
          <img v-if="item.couponType===1" class="privilege" src="../../assets/icon_gu33@3x.png" alt="">
					<div class="list_l">
						<div class="listLeftTop flex_r_s_b">
							<img @click="couponXqLink(item)" :src="item.couponIcan" alt="">
							<div class="couponNameBox">
								<div class="couponName" @click="couponXqLink(item)">{{item.couponName | descFilter}}</div>
								<!-- <div class="distance">{{item.couponDesc | descFilter}}</div> -->
								<div class="progressBox flex_r_s_b">
									<div class="progress">
										<div :style="item.styleObj"></div>
									</div>
									<span>已领取{{item.lq}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="list_r">
						<div class="sale">
              <span v-if="item.conditionPrice!==0&&item.couponType===1">￥{{item.couponPrice|keepFloat}}</span>
              <span v-if="item.conditionPrice!==0&&item.couponType!==1">￥{{item.conditionPrice|keepFloat}}</span>
              <span  v-if="item.conditionPrice==0">￥{{item.couponPrice|keepFloat}}</span>
            </div>
						<div class="condition">

              <span v-if="item.conditionPrice!==0&&item.couponType===1">满<span>{{item.conditionPrice|keepFloat}}</span>元使用</span>
              <span v-if="item.conditionPrice!==0&&item.couponType!=1">原价:<span class="through">{{item.couponPrice|keepFloat}}</span></span>
							<span v-if="item.conditionPrice==0">无门槛使用</span>
						</div>
						<div class="makeTime">{{item.couponEndTime}}前有效</div>
						<div class="receiveBtnBox">


             <div v-if="item.isReceive==0&&item.couponType==1" class="receiveBtn receivedBtn flex_r_s_c">已领完</div>
             <div v-if="item.isReceive==0&&item.conditionPrice==0&&item.couponType!=1" class="receiveBtn receivedBtn flex_r_s_c">已领完</div>
             <div v-if="item.isReceive==0&&item.conditionPrice!=0&&item.couponType!=1" class="receiveBtn receivedBtn flex_r_s_c">已购买</div>

             <div @click="receive(item)" v-if="item.isReceive!=0&&item.couponType==1" class="receiveBtn flex_r_s_c">立即领取</div>
             <div @click="receive(item)" v-if="item.isReceive!=0&&item.conditionPrice==0&&item.couponType!=1" class="receiveBtn flex_r_s_c">立即领取</div>

             <div @click="receive(item)" v-if="item.isReceive!=0&&item.conditionPrice!=0&&item.couponType!=1" class="receiveBtn flex_r_s_c">立即购买</div>

            </div>
            <div v-if="item.isReceive!=0&&item.conditionPrice!=0&&item.shopTotalNum>item.receiveNum">123</div>
					</div>
          <img v-if="item.isReceive==0&&item.couponType!==1&&item.conditionPrice==0" class="imprint" src="../../assets/receiveEnd.png" alt="">
					<img v-if="item.isReceive==0&&item.couponType===1" class="imprint" src="../../assets/receiveEnd.png" alt="">
          <img v-if="item.isReceive===1&&item.couponType==1" class="imprint" src="../../assets/received.png" alt="">
          <img v-if="item.isReceive===1&&item.couponType!=1&&item.conditionPrice==0" class="imprint" src="../../assets/received.png" alt="">
					<!-- <img v-if="(item.isReceive===0&&item.conditionPrice==0)&&item.circulation>item.receiveNum" class="imprint" src="../../assets/received.png" alt=""> -->
					<img v-if="item.isReceive==0&&item.conditionPrice!=0&&item.couponType!=1" class="imprint" src="../../assets/buyEnd.png" alt="">
          <img v-if="item.isReceive==1&&item.conditionPrice!=0&&item.couponType!=1" class="imprint" src="../../assets/buyEnd.png" alt="">
        </li>
			</ul>

		</div>
		<div class="amap-page-container" v-show="false">
			<el-amap ref="map" vid="amapDemo" :plugin="plugin" class="amap-demo"></el-amap>

		</div>
	</div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
	import Api from '../common/apj.js'
	export default{
		data(){
			let self = this;
			return{
        code:'',
				lng:0,
				lat:0,
        couponId:'',
        storeNum:0,
        environment:'',
				uId:'',
        startTime:'',
        shopUserId:'',
        navUrl:'',
				shopId:'',
        distance:'',
        activeIndex:'2',
        shopDesc:'',
        isDialongCnt:true,
        isDialong:false,
        payPrice:'',
				couponList:[],
				shopName:'',
				shopImgAddr:'',
				shopAddress:'',
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
    filters:{
      descFilter(val){
        if(val.length>20){
          return val.substr(0,20)+'...'
        }else{
          return val
        }
      },
      distanceFilter(val){
        return parseFloat(val.substring(3))
      },
      keepFloat(val){
        return parseFloat(val).toFixed(1);
      }

    },
		mounted() {
      let self = this;
      this.getEnvironment();
      if(JSON.parse(localStorage.getItem('user')) == null){
      	// this.$store.commit('setRouterName','activity');
      	self.uId = '';
      }else{
      	self.uId = JSON.parse(localStorage.getItem('user')).userId;
      }
      self.shopId = self.getUrlKey('shopId');
      self.getShopCouponList();
		},
		methods:{
      goShopStore(){
        let self = this;
        this.$router.push({
          name:'shopStore',
          query:{
            shopUserId:self.shopUserId
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
      getCode() { //静默授权
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
            }else if(item.conditionPrice==0&&re.data.data==1){
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
			couponXqLink(item){

        window.location.href = 'http://app.gutouzu.com/index.html#/couponXq?couponId='+item.couponId;
			},
			getUrlKey(name){
			    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
			},
			getShopCouponList(){

				let self = this;
				self.axios.post(Api.userApi + '/coupon/selectShopsCoupon', self.qs.stringify({
					userId: self.uId,
					shopId: self.shopId,
					latitude: self.lat,
					longitude: self.lng
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 1){
            //console.log(res.data.data)

            let option = {
              title: res.data.data.shopName+'的优惠券来袭啦', // 分享标题, 请自行替换
              desc:'你附近的'+res.data.data.shopName+'发布了一大波优惠信息,快来看看吧~',
              link: window.location.href, // 分享链接，根据自身项目决定是否需要split
              imgUrl:res.data.data.shopCoupons[0].couponIcan, // 分享图标, 请自行替换，需要绝对路径
              success: () => {
                alert('分享成功')
              },
              error: () => {
                alert('已取消分享')
              }
            }
            console.log(res.data.data)
            wxapi.wxRegister(option)
            self.shopUserId = res.data.data.shopUserId;
						self.shopName = res.data.data.shopName;
						self.shopImgAddr = res.data.data.shopImgAddr;
						self.shopAddress = res.data.data.shopAddress;
						self.couponList = res.data.data.shopCoupons;
            self.shopDesc = res.data.data.shopDesc;
            self.distance = res.data.data.distance.split(':')[1];
            self.storeNum = res.data.data.storeNum;
            self.startTime = res.data.data.startTime;
            self.navUrl = 'https://uri.amap.com/marker?position='+res.data.data.longitude+','+res.data.data.latitude+'&name='+res.data.data.shopAddress;;
						self.couponList.forEach((e)=>{
							e.styleObj = {
								width:(100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'
							}
							e.sx = (100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'
              e.lq = (100-(100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4)))+'%'
						})
						// console.log(self.couponList)
					}else{
						alert(res.data.msg)
					}

				})
			},
			onPullingDown(){
				//刷新
			},
			onPullingUp(){
				//加载
			},
      receiveCoupon(item){
        let self = this;
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
        			self.getShopCouponList();
        		},500)
        	}else{
        		alert(res.data.msg)
        	}
        })
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
                backUrl:window.location.href,
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
        }).then((re) => {
          if (re.data.code == 1) {
            //alert('订单号'+res.data.data.out_trade_no)
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
              'appId': re.data.data.appId,
              'timeStamp': re.data.data.timeStamp,
              'nonceStr': re.data.data.nonceStr,
              'package': re.data.data.package,
              'signType': 'MD5',
              'paySign': re.data.data.paySign
            }, function(res) {
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                //self.$router.push({name:'paySus',query:{oderNum:res.data.data.out_trade_no,type:'c'}});

                alert('支付成功');
                window.location.href = 'http://app.gutouzu.com/index.html#/paySus?type=c&oderNum='+re.data.data.out_trade_no;



              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                alert('取消支付！');
                setTimeout(() => {
                  window.location.href = 'http://app.gutouzu.com/index.html#/shopCoupon?shopId='+self.shopId+'&sj='+10000*Math.random();
                }, 500)

              } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                alert(JSON.stringify(res))
              }
            });
          } else {
            alert(re.data.msg)
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
                  backUrl:'http://app.gutouzu.com/index.html#/shopCoupon?shopId='+self.shopId,
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
        let self = this;
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
			receive(item){
				let self = this;
        this.couponId = item.couponId;
				if(JSON.parse(localStorage.getItem('user')) == null){

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

				}else if(item.couponType==2&&item.conditionPrice!=0){

			    this.payPrice = item.conditionPrice;
			    this.isDialong = true;
          this.isDialongCnt = true;
			  }else if(item.couponType==3){

			    this.getCardState(item)

			    // this.payPrice = item.conditionPrice;
			    // this.isDialong = true;
			  }else{

			    this.receiveCoupon(item)

				}
			},
		}
	}
</script>

<style lang="scss">
	.shopCoupon{

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
    .through{
      text-decoration:line-through;
    }
    .activeColor{
      color: #ff523d;
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
		.shopBox{
			align-content:space-between;
			justify-content:center;
			// background: red;
			.shopImg{
				width: 120px;
				height: 120px;
				border-radius: 50%;
        object-fit: cover;
        margin: 30px 0;
        border: 1px solid #e8e8e8;
			}
			.shopName{
				color: #000;
				font-size: 30px;
				padding-top: 30px;
			}

      .shopDesc{
        padding: 0 20px 0 20px;
        line-height: 34px;
        font-size: 26px;
        color: #666;
      }
			.addr{
        box-sizing: border-box;
				padding:40px 20px 0 20px;

				img{
					width:30px;
				}
				p{
					font-size: 26px;
					color: #666;
					line-height: 44px;
          span{
            margin-left:20px;
          }
				}
			}
      .distance{
        padding: 20px 20px 0 20px;
        font-size: 26px;
        color: #666;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
        span{
          margin-left:20px;
        }
      }
      .storeNum{
        padding: 20px 20px 0 20px;
        font-size: 26px;
        color: #666;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
        span{
          margin-left:20px;
          color:#ff523d;
        }
      }
		}

    .couponListBox{

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
          .privilege{
            position: absolute;
            left: 0;
            top: 20px;
            width: 150px;
            z-index: 100;
          }
					.list_l{
						width: 450px;
						.listLeftTop{
							align-items:flex-start;
							img{
								width: 178px;
								height: 178px;
								border-radius: 10px;
							}
							.couponNameBox{
								width: 240px;
                margin-left:10px;
								.couponName{
									font-size: 28px;
									color: #000;
									line-height: 34px;
								}
                .distance{
                  font-size:24px;
                  color:#666;
                  padding-top:10px;
                  line-height:34px;
                }
								.progressBox{
									padding-top: 120px;
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
            width: 200px;

						.sale{
							font-size: 38px;
							color: #ff523d;
							text-align: center;
						}
						.condition{
							color: #999;
							text-align: center;
							font-size: 22px;
							padding-top: 15px;
						}
						.makeTime{
							font-size: 22px;
							color: #999;
							padding-top: 20px;
              text-align:center;
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
