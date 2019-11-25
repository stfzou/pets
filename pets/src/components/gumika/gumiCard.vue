<template>
  <div class="guimiCard">
    <div class="guDialog flex_r_s_c" @click.stop="dailongHide" v-show="isDialong">
      <div class="dialongCnt" @click.stop v-show="isDialongCnt">
        <div class="inputBox">
          <div class="itemList flex_r_f_s">
            <p>手机号码</p>
            <input type="number" v-model="phone" @blur.prevent="inputLoseFocus" placeholder="请输入手机号码" />
          </div>
          <div class="itemList flex_r_f_s vcode_box">
            <p>验证码</p>
            <input type="number" v-model="vCode" @blur.prevent="inputLoseFocus" placeholder="请输入验证码" />
            <div class="v_code" v-if="show">
              <span @click="getCode">获取验证码</span>
            </div>
            <div class="v_code active_vcode" v-else>
              <span>{{count}}</span>
            </div>
          </div>
        </div>
        <div class="btnBox flex_r_s_b">
          <div class="cancelBtn flex_r_s_c" @click="dailongHide">取消</div>
          <div class="okBtn flex_r_s_c" @click="vCodeLogin">确定</div>
        </div>
      </div>
      <div class="payBox" @click.stop v-show="!isDialongCnt">
        <div class="popupTitle flex_r_s_c">在线支付</div>
        <div class="payment flex_r_s_b">
          <span class="payment_l">需付款</span>
          <span class="payment_r">￥299</span>
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
    <div class="headPost">
      <div class="top_nav flex_r_s_b" :class="{active_nav:isActiveColor}">
        <div class="back" @click="back"></div>
        <div class="nav_title">骨米卡特权权益</div>
        <div class="share" @click="share"></div>
      </div>
    </div>
    <div class="cardCnt">
      <div class="vipCard">
        <div class="open flex_r_s_c" @click="dailongShow" v-if="!isCard">立即开通</div>
        <div class="barCode" v-if="isCard">
          <img src="../../assets/barCode.png" alt="">
          <div class="numCode">{{number}}</div>
        </div>
        <div class="validity" v-show="isCard">有效期至 {{endTime}}</div>
      </div>
    </div>
    <div class="interestsInfoBox" v-if="isCard">
      <div class="interestsInfo flex_r_s_b">
        <div class="cnt_l">已使用权益<b>{{useNum}}</b>次</div>
        <div class="cnt_r">累计节省<b>￥{{totalPrice}}元</b></div>
      </div>
    </div>
    <div class="navShow flex_r_s_b">
      <img src="../../assets/icon_gu08@2x.png" alt="">
      <img src="../../assets/icon_gu09@2x.png" alt="">
      <img src="../../assets/icon_gu10@2x.png" alt="">
      <img src="../../assets/icon_gu11@2x.png" alt="">
      <img src="../../assets/icon_gu12@2x.png" alt="">
      <img src="../../assets/icon_gu13@2x.png" alt="">
      <img src="../../assets/icon_gu14@2x.png" alt="">
      <img src="../../assets/icon_gu15@2x.png" alt="">
    </div>
    <div class="interestsBox">
      <div class="interests">
        <img src="../../assets/icon_gu02@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu03@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu04@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu05@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu06@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu07@3x.png" alt="">
      </div>
    </div>
    <div class="gufootActive flex_r_s_b" v-if="isCard">
      <span>有效期至  {{endTime}}</span>
      <img src="../../assets/xfBtn.png" alt="" @click="renew">
    </div>
    <div class="gufoot" @click="dailongShow" v-else>
      <img src="../../assets/pay.png" alt="">
    </div>

  </div>
</template>

<script>
  import wxapi from '../common/wxapi.js'
  import Api from '../common/apj.js'
  export default {
    data() {
      return {
        phone: '',
        isActiveColor:false,
        vCode: '',
        show: true,
        totalPrice: 198,
        count: '',
        timer: null,
        isDialong: false,
        isDialongCnt: true,
        activeIndex: '2',
        reg: /^1[3456789]\d{9}$/,
        userId: '',
        code: '',
        number:'',
        endTime:'',
        useNum:'',
        totalPrice:'',
        isCard:false,
        inviteUserId:-1,
        environment:'',

      }
    },
    mounted() {
      //localStorage.removeItem('user')
      this.shareWxCnt();
      this.getEnvironment();
      //this.shareWxCnt();
      if(JSON.parse(localStorage.getItem('user')) == null){
      	// this.$store.commit('setRouterName','activity');
      	this.userId = '';

      }else{
      	this.userId = JSON.parse(localStorage.getItem('user')).userId;
      }
      if(this.getUrlKey('inviteUserId')!=null){
        this.inviteUserId = this.getUrlKey('inviteUserId');
      }

      let self = this;
      window.addEventListener('scroll', self.handleScroll)
      this.getCardInfo()
    },
    methods: {
      shareWxCnt(){
        let option = {
          title: '骨米优选俱乐部会员特权卡', // 分享标题, 请自行替换
          desc:'享受身边的特权生活，有特权无所谓，真正享受0元购。精彩生活，一张卡就购了',
          link: window.location.href, // 分享链接，根据自身项目决定是否需要split
          imgUrl:'http://app.gutouzu.com/img/icon_tequanka.png', // 分享图标, 请自行替换，需要绝对路径
          success: () => {
            alert('分享成功')
          },
          error: () => {
            alert('已取消分享')
          }
        }
        wxapi.wxRegister(option)
      },
      share(){
      	let toast = this.$createToast({
      		txt: '点击顶部右上角进行分享',
      		type: 'warn'
      	  })
      	toast.show()
      },
      handleScroll () {

      	setTimeout(()=>{
      		var scrollTop = window.scrollY;
      		let elHeight = document.querySelector(".cardCnt").offsetHeight;
      		if(scrollTop>elHeight){

      			this.isActiveColor = true;
      		}else{
      			this.isActiveColor = false;

      		}
      		if(scrollTop>0){
      			this.isDown = false;
      		}else{
      			this.isDown = true;
      		}
      	},200)

      },
      getCardInfo(){
        //console.log(JSON.parse(localStorage.getItem('user')))

        if(JSON.parse(localStorage.getItem('user'))!= null){

            let self = this;
            this.axios.post(Api.userApi + '/boneMika/selectUserBoneMikaStatus', this.qs.stringify({
              userId:self.userId
            }), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((res)=>{

              if(res.data.code==1){
                // alert(1)
                if(res.data.data==1){

                  self.axios.post(Api.userApi + '/boneMika/selectBoneMikaVo', self.qs.stringify({
                    userId:self.userId
                  }), {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  }).then((re)=>{
                    if(re.data.code==1){
                     self.isDialong = false;
                     self.number = (re.data.data.number+'').replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
                     self.endTime = re.data.data.endTime
                     self.isCard = true
                     self.useNum = re.data.data.useNum
                     self.totalPrice = re.data.data.totalPrice
                    }else{
                      alert(re.data.msg)
                    }
                  })
                }
              }else{
                alert(res.data.msg)
              }
            })

        }

      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      getEnvironment() { //静默授权初始化
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.environment = '0';
          this.getWxCode();
        } else {
          this.environment = '1';
        }
      },
      getWxCode() { //静默授权
        let self = this;
        const local = window.location.href;
        this.code = this.getUrlPara('code');
        if (this.code == null || this.code === '') {
          window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdf1774932d9dd96e&redirect_uri='+encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=' + '38' + '#wechat_redirect';
        }

      },
      getUrlPara(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
      },
      getCode() {
        //获取验证码
        if (this.phone == '') {

          alert('请填写手机号码')
          return false;
        } else if (!this.reg.test(this.phone)) {

          alert('手机号码格式错误')
          return false;
        }
        if (this.phone) {
          let _this = this;
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            if (!this.forgetState) {
              this.axios.get(Api.userApi + '/sms_login_code?phone=' + this.phone, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
                .then(function(response) {

                })
                .catch(function(error) {
                  console.log(error);
                });
            } else {
              this.axios.get('/sms_getpwd?phone=' + this.phone, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
                .then(function(response) {

                })
                .catch(function(error) {
                  console.log(error);
                });
            }

            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
        }

      },
      back() {
        this.$router.go(-1); //返回上一层
      },
      dailongShow() {
        this.isDialong = true;
      },
      dailongHide() {
        this.isDialong = false;
        this.isDialongCnt = true;

      },
      inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);

      },
      renew() {
        let self = this;
        self.userId = JSON.parse(localStorage.getItem('user')).userId;
        //localStorage.setItem('user', JSON.stringify(userEntity));
        self.isDialong = true;
        self.isDialongCnt = false;

      },
      vCodeLogin() {
        let self = this;

        if (this.phone == '') {

          alert('请填写手机号码')
          return false;
        } else if (!this.reg.test(this.phone)) {

          alert('手机号码格式错误')
          return false;
        } else if (this.vCode == '') {
          alert('请填写验证码')
          return false;
        } else {
          this.axios.post(Api.userApi + '/user_sms_login', this.qs.stringify({
            phone: this.phone,
            vcode: this.vCode
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {

            if (res.data.code === 1) {

              var userEntity = {
                userName: res.data.user.userName,
                userId: res.data.user.userId,
                userPhone: res.data.user.phone,
                token: res.data.token
              };
              self.userId = res.data.user.userId;

              localStorage.setItem('user', JSON.stringify(userEntity));
              self.axios.post(Api.userApi + '/boneMika/selectUserBoneMikaStatus', self.qs.stringify({//查询骨米卡状态
                userId: self.userId
              }), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then((re) => {

                if(re.data.code===1){

                  if(re.data.data===1){

                    self.getCardInfo();
                  }else{

                    self.isDialong = true;
                    self.isDialongCnt = false;

                  }
                }else{
                  alert(re.data.msg)
                }

              })
            } else {
              console.log(res)
              alert(res.data.msg)
            }

          }).catch(function(err) {
            console.log(err)
          })
        }

      },

      wxH5Pay() {

        let self = this;
        this.axios.post(Api.userApi + '/boneMika/boneMikaByWXHwPay', this.qs.stringify({
          userId: self.userId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            //
            //localStorage.setItem('orderNum',res.data.data.out_trade_no);
            //window.location.href = res.data.data.mweb_url
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
                backUrl:'http://app.gutouzu.com/index.html#/gumiCard',
                orderApi:'/boneMika/selectBoneMikaOrderStatus'
              }
            })



            // weixinPay(wxData);

          } else {
            alert(res.data.msg)
          }
        })
        //
      },
      wxPay() { // 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口

        let self = this;
        this.axios.post(Api.userApi + '/boneMika/wxPay/gzhh5/prepay', this.qs.stringify({
          userId: self.userId,
          code: self.getUrlPara('code')
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((re) => {
          if (re.data.code == 1) {

            WeixinJSBridge.invoke('getBrandWCPayRequest', {
              'appId': re.data.data.appId,
              'timeStamp': re.data.data.timeStamp,
              'nonceStr': re.data.data.nonceStr,
              'package': re.data.data.package,
              'signType': 'MD5',
              'paySign': re.data.data.paySign
            }, function(res) {
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                //alert('支付成功，返回活动详情页！');
                //self.$router.push({name:'paySus',query:{type:'gmCard',userId:self.userId}});
                 window.location.href = 'http://app.gutouzu.com/index.html#/paySus?type=gmCard&userId='+self.userId;

              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                alert('取消支付！');
                setTimeout(() => {
                  window.location.href = 'http://app.gutouzu.com/index.html#/gumiCard?sj='+10000*Math.random();
                }, 500)
              } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                alert(JSON.stringify(res))
              }
            });
          } else {
            alert(re.data.msg)
            alert('错误')
          }
        })
      },
      aliPay() { //支付宝支付

        if (this.environment == '0') {
          alert('请点击右上角用浏览器打开进行支付')
        } else {
          let self = this;
          this.axios.post(Api.userApi + '/boneMika/ali/webpay', this.qs.stringify({
            userId:JSON.parse(localStorage.getItem('user')).userId,
            inviteUser:self.inviteUserId
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
                  backUrl:'http://app.gutouzu.com/index.html#/gumiCard',
                  orderApi:'/boneMika/selectBoneMikaOrderStatus'
                }
              })

              self.isPopup = false;
            } else {
              alert(res.data.msg)
            }

          })
        }

      },
      clickWx() {
        this.activeIndex = '2';

      },
      clickAli() {
        this.activeIndex = '1';

      },
      commit() {

        if (this.activeIndex == '2' && this.environment == '0') {

          this.wxPay();

        } else if (this.activeIndex == '2' && this.environment == '1') {

          this.wxH5Pay();
        } else if (this.activeIndex == '1') {

          this.aliPay();
        }
      }
    },
  }
</script>

<style lang="scss">
  .guimiCard {
    background: #f5f5f5;
    padding-bottom: 96px;
    .guDialog {
      position: fixed;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.6);

      .dialongCnt {
        width: 600px;
        background: #fff;
        padding-top: 20px;

        .itemList {
          padding: 30px 20px;
          box-sizing: border-box;

          input {
            background: none;
            outline: none;
            border-radius: 4px;
            font-size: 26px;
            color: #333;
            text-align: center;
            height: 50px;
            line-height: 50px;
            width: 300px;
            margin-left: 30px;
            border: 1px solid #e8e8e8;
          }

          p {
            width: 110px;
            text-align: justify;
            text-align-last: justify;
            font-size: 26px;
          }

        }

        .vcode_box {
          input {
            width: 180px;
          }

          .v_code {
            margin-left: 30px;

            span {
              display: inline-block;
              padding: 8px;
              border-radius: 6px;
              background: #ff523d;
              color: #fff;
              font-size: 24px;
            }
          }

          .active_vcode {
            span {
              width: 60px;
              text-align: center;
            }
          }
        }

        .btnBox {
          border-top: 1px solid #e8e8e8;
          /*no*/
          box-sizing: border-box;
          margin-top: 20px;

          div {
            width: 50%;
            height: 70px;
            font-size: 30px;
            box-sizing: border-box;
          }

          .cancelBtn {
            border-right: 1px solid #e8e8e8;
            /*no*/
          }
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

    .headPost {
      height: 300px;
      background: url('../../assets/icon_she200@3x.png') no-repeat 0 center;
      background-size: 100%;

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

        .share {
          width: 50px;
          height: 40px;
          background: url('../../assets/icon/share@2x.png') no-repeat center 0;
          background-size: 100%;
        }

      }
      .active_nav{
      	background: #FE8F70;
      }
    }

    .interestsInfoBox {
      padding: 40px 26px 0 26px;

      .interestsInfo {
        height: 60px;
        box-sizing: border-box;
        border-radius: 20px;
        background: #6B6969;
        padding: 0 30px;

        .cnt_l {
          color: #fff;
          font-size: 26px;
          line-height: 60px;

          b {
            color: #FFB109;
            font-size: 40px;
            margin: 0 10px;
          }
        }

        .cnt_r {
          color: #fff;
          font-size: 26px;
          line-height: 60px;

          b {
            color: #FFB109;
            font-size: 40px;
            margin-left: 10px;
          }
        }
      }
    }

    .cardCnt {
      .vipCard {
        width: 660px;
        height: 360px;
        position: relative;
        background: url('../../assets/card_bg.png') no-repeat 0 0;
        background-size: cover;
        margin: -180px auto 0 auto;
      }

      .open {
        width: 240px;
        height: 70px;
        background: #fff;
        border-radius: 35px;
        color: #ff523d;
        font-size: 28px;
        position: absolute;
        left: 60px;
        bottom: 58px;
      }

      .barCode {
        width: 454px;
        position: absolute;
        left: 50%;
        margin-left: -227px;
        bottom: 65px;

        .numCode {
          text-align: center;
          font-size: 28px;
          color: #fff;
          padding-top: 10px;
        }

        img {
          width: 454px;
        }
      }

      .validity {
        font-size: 24px;
        color: #fff;
        position: absolute;
        right: 60px;
        bottom: 16px;
      }
    }

    .navShow {
      overflow: hidden;
      padding: 0 26px;
      box-sizing: border-box;
      flex-wrap: wrap;

      img {
        width: 150px;
        margin-top: 30px;
      }
    }

    .interestsBox {
      padding: 0 26px;
      padding-bottom: 40px;

      .interests {
        padding-top: 40px;

        img {
          width: 100%;
        }
      }
    }

    .gufoot {
      width: 100%;
      height: 96px;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 1000;
      img {
        width: 100%;
        height: 96px;
        display: block;
      }
    }
    .gufootActive{
      box-sizing: border-box;
      padding-left: 26px;
      height: 96px;
      background: #6b6a6a;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 10;
      img{
        width: 260px;
        height: 96px;
      }
      span{
        color: #fff;
        font-size: 26px;
      }
    }

  }
</style>
