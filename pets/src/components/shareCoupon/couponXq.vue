<template>
	<div class="couponXq">
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
		<div class="couponInfoBox flex_r_s_c">
			<div class="couponInfo">
        <img v-if="couponType===3" class="privilege" src="../../assets/icon_gu30@3x.png" alt="">
        <img v-if="couponType===2" class="privilege" src="../../assets/icon_gu32@3x.png" alt="">
        <img v-if="couponType===1" class="privilege" src="../../assets/icon_gu33@3x.png" alt="">

        <img v-if="circulation==receiveNum" class="sign" src="../../assets/receiveEnd.png" alt="">
        <img v-if="(isReceive===0&&conditionPrice==0)&&circulation>receiveNum" class="sign" src="../../assets/received.png" alt="">
        <img v-if="isReceive!=2&&conditionPrice!=0&&circulation>receiveNum" class="sign" src="../../assets/buyEnd.png" alt="">
				<div class="couponTop">
					<!-- <img class="couponImg" :src="couponIcan" alt=""> -->
          <div class="couponImgBox">
            <cube-slide ref="slide" :data="couponIcan">
              <cube-slide-item v-for="(item, index) in couponIcan" :key="index">
                <div class="imgBox" @click="handleImgsClick(index)">
                  <img class="couponImg" :src="item" alt="">
                </div>
              </cube-slide-item>
            </cube-slide>
          </div>
					<div class="couponName">
            {{couponName}}
          </div>
					<p>{{couponDesc}}</p>
          <div class="saleBox">
            <div class="sale">
              <span v-if="conditionPrice!==0&&couponType===1">￥{{couponPrice|keepFloat}}</span>
              <span v-if="conditionPrice!==0&&couponType!==1">￥{{conditionPrice|keepFloat}}</span>
              <span  v-if="conditionPrice==0">￥{{couponPrice|keepFloat}}</span>


            </div>
            <div class="condition">
              <span v-if="conditionPrice===0">无门槛使用</span>
              <span v-if="couponType!==1&&conditionPrice!==0">原价:<span class="through">{{couponPrice|keepFloat}}</span></span>
              <span v-if="couponType===1&&conditionPrice!==0">满{{conditionPrice|keepFloat}}元使用</span>
            </div>

          </div>

          <div class="receiveBtnBox">

            <div v-if="isReceive==0&&conditionPrice==0&&circulation>receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已领取</div>
            <div v-if="isReceive==0&&conditionPrice!=0&&circulation>receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已购买</div>
            <div v-if="circulation==receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已领完</div>
            <div @click="receiveBtn" v-if="isReceive!=0&&conditionPrice==0&&couponType===1" class="receiveBtn flex_r_s_c">立即领取</div>
            <div @click="receiveBtn" v-if="isReceive!=0&&conditionPrice==0&&couponType!==1" class="receiveBtn flex_r_s_c">立即领取</div>
            <div @click="receiveBtn" v-if="isReceive!=0&&conditionPrice!=0&&couponType!==1" class="receiveBtn flex_r_s_c">立即购买</div>
					</div>
          <div class="receiveNum">已领取{{receiveNum}}张</div>
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
                <router-link class="shopName flex_r_s_b" :to="{name:'shopCoupon',query:{shopId:shopId}}">
                  <span>{{shopName}}</span>
                  <img src="../../assets/icon_gu31@3x.png" alt="">
                </router-link>
							</div>
						</li>
						<li class="flex_r_f_s">
							<div class="listLeft">
								地址
							</div>
							<div class="listRight">
                 <a class="addr flex_r_s_b" :href="'https://uri.amap.com/marker?position='+lng+','+lat+'&name='+shopAddress">
                   <span>{{shopAddress}}</span>
                   <img class="addrImg" src="../../assets/couponAddr.png" alt="">
                 </a>

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
          <img v-if="item.couponType===3" class="privilege" src="../../assets/icon_gu30@3x.png" alt="">
          <img v-if="item.couponType===2" class="privilege" src="../../assets/icon_gu32@3x.png" alt="">
          <img v-if="item.couponType===1" class="privilege" src="../../assets/icon_gu33@3x.png" alt="">
					<div class="list_l">
						<div class="listLeftTop flex_r_s_b">
							<img @click="couponXqLink(item)" :src="item.couponIcan" alt="">
							<div class="couponNameBox">
								<div class="couponName"  @click="couponXqLink(item)">{{item.couponName | descFilter}}</div>
								<!-- <div class="distance">{{item.distance}}</div> -->
                <div class="couponDesc" >
                  {{item.couponDesc}}
                </div>
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
						<div class="sale">
              <span v-if="item.conditionPrice!==0&&item.couponType===1">￥{{item.couponPrice|keepFloat}}</span>
              <span v-if="item.conditionPrice!==0&&item.couponType!==1">￥{{item.conditionPrice|keepFloat}}</span>
              <span  v-if="item.conditionPrice==0">￥{{item.couponPrice|keepFloat}}</span>
            </div>
						<div class="condition">
              <span v-if="item.conditionPrice!==0&&item.couponType===1">满<span>{{item.conditionPrice|keepFloat}}</span>元使用</span>
              <span v-if="item.conditionPrice!==0&&item.couponType!=1">原价:<span class="through">{{item.couponPrice|keepFloat}}</span></span>

              <span  v-if="item.conditionPrice==0">无门槛使用</span>
						</div>
						<div class="makeTime">{{item.couponEndTime}}前有效</div>
						<div class="receiveBtnBox">

             <div v-if="item.isReceive==0&&item.conditionPrice==0&&item.circulation>item.receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已领取</div>
             <div v-if="item.isReceive==0&&item.conditionPrice!=0&&item.circulation>item.receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已购买</div>
             <div v-if="item.circulation==item.receiveNum" class="receiveBtn receivedBtn flex_r_s_c">已领完</div>
             <div @click="receive(item)" v-if="item.isReceive!=0&&item.conditionPrice==0&&item.couponType!=1" class="receiveBtn flex_r_s_c">立即领取</div>
             <div @click="receive(item)" v-if="item.isReceive!=0&&item.conditionPrice==0&&item.couponType==1" class="receiveBtn flex_r_s_c">立即领取</div>
             <div @click="receive(item)" v-if="item.isReceive!=0&&item.conditionPrice!=0&&item.couponType!=1" class="receiveBtn flex_r_s_c">立即购买</div>

            </div>

					</div>
					<img v-if="item.circulation==item.receiveNum" class="imprint" src="../../assets/receiveEnd.png" alt="">
					<img v-if="(item.isReceive===0&&item.conditionPrice==0)&&item.circulation>item.receiveNum" class="imprint" src="../../assets/received.png" alt="">
					<img v-if="item.isReceive!=2&&item.conditionPrice!=0&&item.circulation>item.receiveNum" class="imprint" src="../../assets/buyEnd.png" alt="">

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
				lng:0,
				lat:0,
				uId:'',
        couponType:'',
        shopId:'',
        receiveNum:'',
        isDialong:false,
        isDialongCnt:true,
        payPrice:'',
        circulation:'',
        code:'',
        activeIndex:'2',
				couponId:'',
        tempCouponId:'',
				couponList:[],
				couponName:'',
				couponIcan:[],
				shopAddress:'',
				couponDesc:'',
				couponPrice:'',
				conditionPrice:'',
        couponType:'',
				receiveNum:'',
				shopName:'',
				shopAddress:'',
        environment:'',
				distance:'',
				couponEndTime:'',
				isReceive:'',
        initialIndex:'',
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
      this.getUrlData();
			this.getShopCouponList();
		},
    filters:{
      descFilter(val){
        if(val.length>12){
          return val.substr(0,15)+'...'
        }else{
          return val
        }
      },
      keepFloat(val){
        return parseFloat(val).toFixed(1);
      }
    },
		methods:{
      handleImgsClick(index) {
      	let self = this;
        self.initialIndex = index
        const params = {
          $props: {
            imgs:self.couponIcan,
            initialIndex: 'initialIndex', // 响应式数据的key名
            loop: false
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              self.initialIndex = i
            }
          }
        }
        self.$createImagePreview({ ...params
        }).show()
      },
			back() {
				this.$router.go(-1); //返回上一层
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
      getUrlData() {// 截取url中的数据

         let tempStr = window.location.href;
         /**
          * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
          */
         let returnArr = {};
         let urlArr = tempStr.split('?');
         if(urlArr){
           urlArr.forEach((e)=>{

               if(e.indexOf('=')>-1){

                 returnArr[e.split('=')[0]] = e.split('=')[1];
               }

           })
         }
        /*输出日志*/
         this.couponId = returnArr.couponId;
         this.tempCouponId = returnArr.couponId;
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
      	  window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdf1774932d9dd96e&redirect_uri='+encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=' + '38' + '#wechat_redirect';
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
              self.payPrice = item.conditionPrice;
              self.couponId = item.couponId;
            }else if(item.conditionPrice==0&&re.data.data==1){
              self.receiveCoupon(item)
            }else{
              // alert(1)
              self.isDialong = true;
              self.isDialongCnt = false;
            }
          }else{
            alert(re.data.msg)
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
                backUrl:'http://app.gutouzu.com/index.html#/couponXq?couponId='+self.couponId,
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
                  self.$router.push({
                    name:'wxWhitePage',
                    params:{
                      wxPayBackUrl:'http://app.gutouzu.com/index.html#/couponXq?couponId='+item.couponId
                    }
                  })
                }, 500)
              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                alert('取消支付！');
                setTimeout(() => {
                  self.$router.push({
                    name:'wxWhitePage',
                    query:{
                      wxPayBackUrl:'http://app.gutouzu.com/index.html#/couponXq?couponId='+item.couponId
                    }
                  })
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
                  backUrl:'http://app.gutouzu.com/index.html#/couponXq?couponId='+self.couponId,
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
      couponXqLink(item){
        window.location.href = 'http://app.gutouzu.com/index.html#/couponXq?couponId='+item.couponId
      },
			onPullingUp(){
				//加载
			},
      guCardLink(){
        this.$router.push({
          name:'gumiCard'
        })
      },
      receiveCoupon(){
        let self = this;
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
      },
			receiveBtn(){

				let self = this;
        this.payPrice = this.conditionPrice;
        this.couponId = this.tempCouponId;
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

				}else if(this.couponType==2&&this.conditionPrice!=0){

          this.payPrice = this.conditionPrice;
          this.isDialong = true;
          this.isDialongCnt = true;
          // this.couponId = this.couponId;
        }else if(this.couponType==3){
          this.getCardState({couponId:self.couponId,conditionPrice:self.conditionPrice});

          // this.payPrice = item.conditionPrice;
          // this.isDialong = true;
        }else{
          this.receiveCoupon()
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
            console.log(res.data.data)
						self.couponName = res.data.data.couponName;
            self.receiveNum = res.data.data.receiveNum;
            self.circulation = res.data.data.circulation;
            self.couponType = res.data.data.couponType;
            self.shopId = res.data.data.shopId;
            let option = {
              title: res.data.data.shopName+'分享的优惠券', // 分享标题, 请自行替换
              desc:'附近的'+res.data.data.shopName+'给您分享了一张'+res.data.data.couponName+'优惠券信息，快来领取吧',
              link: window.location.href, // 分享链接，根据自身项目决定是否需要split
              imgUrl:res.data.data.couponIcan, // 分享图标, 请自行替换，需要绝对路径
              success: () => {
                alert('分享成功')
              },
              error: () => {
                alert('已取消分享')
              }
            }
            wxapi.wxRegister(option)
            self.couponIcan.push(res.data.data.couponIcan)
            if(res.data.data.couponIcanA!=''){
              self.couponIcan.push(res.data.data.couponIcanA)
            }
            if(res.data.data.couponIcanB!=''){
              self.couponIcan.push(res.data.data.couponIcanB)
            }
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
            self.couponType = res.data.data.couponType;
						self.couponList.forEach((e)=>{
							e.styleObj = {
								width:(100-Math.round((e.receiveNum/e.circulation * 10000)/100).toFixed(4))+'%'
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
        this.payPrice = item.conditionPrice;
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
          this.isDialongCnt = true;
          this.couponId = item.couponId;
        }else if(item.couponType==3){
          this.getCardState(item)

          // this.payPrice = item.conditionPrice;
          // this.isDialong = true;
        }else{
          // alert(111)
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
		// height: 100%;
		overflow: auto;
		background: linear-gradient(150deg, #fdb366, #fbab72, #ff8c60, #ff6060);
    padding-top: 88px;
    .through{
      text-decoration:line-through;
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
      background: #fdb366;
      position: fixed;
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

			.couponInfo{
				width: 590px;
				background: #fff;
				border-radius: 10px;
				overflow: hidden;
				position: relative;
        .privilege{
          position: absolute;
          left: 0;
          top: 20px;
          width: 150px;
          z-index: 8;
        }
				.sign{
					position: absolute;
					width: 130px;
					height: 130px;
					top: -34px;
					right: -28px;
				}
				.couponTop{
					padding: 40px 20px 50px 20px;
          .couponImgBox{
            width: 178px;
            height: 178px;
            margin: 0 auto;
            .cube-slide-dots>span{
              width: 10px;
              height: 10px;
              border-radius: 50%;
              // background: #ccc;
            }
            // .cube-slide-dots>span.active{
            //   color: #ff523d;
            // }
          }

          .imgBox{
            width: 178px;
            height: 178px;
            border-radius: 10px;
          }
					img{
						width: 178px;
						height: 178px;
						display: block;
						margin: 0 auto;

					}
					.couponName{
						text-align:center;
						color: #000;
						font-size: 28px;
            font-weight:800;
						padding-top: 40px;
            line-height: 36px;
					}
					p{
						font-size: 24px;
						color: #666;
						text-align: left;
            line-height: 30px;
            padding:20px 0;
					}
          .saleBox{
            position:relative;
          }
					.sale{
						font-size: 38px;
						color: #ff523d;
            text-align:center;
					}
					.condition{
						font-size: 24px;
						color: #999;
            position:absolute;
            right:60px;
            top:50%;
            transform:translate(0,-50%);
					}
          .activeColor{
            color:#ff523d;
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
          .receiveNum{
            font-size: 26px;
            color: #999;
            text-align:center;
            padding-top:30px;
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

								width: 460px;
                .addr{
                  color: #333;
                  height: 52px;
                  line-height: 52px;
                }
                .shopName{
                  color: #333;
                  height: 52px;
                  line-height: 52px;
                  img{
                    width: 22px;

                  }
                }
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
								.couponName{
									font-size: 28px;
									color: #000;
									line-height: 34px;
								}

								.progressBox{
									padding-top: 30px;
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
              .couponDesc{
                width: 220px;
                padding-top: 20px;
                font-size: 24px;
                color: #999;
                line-height: 30px;
                overflow: hidden;
                text-overflow:ellipsis; //加省略号
                white-space:nowrap; //强制不换行
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
            width:200px;
						.sale{
							font-size: 38px;
							text-align: center;
              color:#ff523d;
						}
						.condition{
							// color: #ff523d;
              color: #999;
							text-align: center;
							font-size: 22px;
							padding-top: 15px;
						}
            .activeColor{
              color: #ff523d;
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
            z-index: 100;
					}
				}
			}
		}
	}
</style>
