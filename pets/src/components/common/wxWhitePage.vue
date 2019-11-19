<template>
  <div>{{obj}}</div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return {
        code:'',
        url:'',
        uId:55,
        couponId:'',
        obj:''
      }
    },
    mounted() {

      // if(JSON.parse(localStorage.getItem('user')) != null){
      // 	// this.$store.commit('setRouterName','activity');
      // 	this.uId = -1;
      // }else{
      // 	this.uId = JSON.parse(localStorage.getItem('user')).userId;
      // }
      let cgUrl = window.location.href;
      if(!cgUrl.match(/\?/)) {
        alert('去掉?')
          location.replace(window.location.href.split('#')[0] + '?' + window.location.hash);
          return ;

      }
      this.url = this.$route.params.url;
      this.couponId = this.$route.params.couponId;
      this.getCode();

    },
    methods:{
      getUrlPara(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
      },
      getCode () { //静默授权
      	let self = this;
      	let local = window.location.href;
      	this.code = this.getUrlPara('code');
        alert('第一次code'+this.code)
      	if (this.code == null || this.code === '') {
          alert('开始授权')
      	  window.location.href =
      	    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdf1774932d9dd96e&redirect_uri=' +
      	    encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=' + '38' + '#wechat_redirect';
      	}else{
          alert('第二次code'+this.code)
          alert('开始调起支付')
          this.wxPay();
        }
      },
      wxPay() { // 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
        alert('开始请求参数')
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
            self.obj = res.data.data;
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
              'appId': res.data.data.appId,
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': 'MD5',
              'paySign': res.data.data.paySign
            }, function(res) {
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                alert('支付成功，返回优惠券列表！');
                setTimeout(() => {
                  window.location.href = self.url;
                }, 500)
              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                alert('取消支付！');
                setTimeout(() => {
                 window.location.href = self.url;
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
    }
  }
</script>

<style lang="scss">
</style>
