<template>
  <div class="paySus flex_r_s_c">
    <div class="flex_c_f_e">
      <i class="cubeic-right"></i>
      <h3>支付成功</h3>
      <p v-html="orderCnt"></p>
      <div class="btn flex_r_s_c" @click="isAnOrIos">{{btnTxt}}</div>
    </div>

  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        orderCnt:'',
        oderNum:'',
        btnTxt:'',
        userId:'',
        environment:''
      }
    },
    mounted() {
      //console.log(this.$route.query.orderNum)
      this.getEnvironment();
      this.oderNum = this.getUrlKey('oderNum')
      if(this.oderNum!=null||this.oderNum!=undefined){
        if(this.getUrlKey('type')=='a'){
          this.getActivityOrderInfo();
        }else{
          this.getCouponOrderInfo();
        }
        //this.getOrderInfo();
      }else if(this.getUrlKey('type')=='gmCard'){
        this.userId = this.getUrlKey('userId');
        this.getGmCardInfo();
      }
    },
    methods:{
      getEnvironment() { //判断当前浏览器环境
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.environment = '-1';

        } else {
          this.environment = '1';
        }
      },
      getActivityOrderInfo(){
        let self = this;
        this.axios.post(Api.userApi + '/ca/selectCommunityActivityOrderInfo', this.qs.stringify({
          out_trade_no:self.oderNum
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            self.btnTxt = '打开骨米宠物APP获取票券二维码'
            self.orderCnt = res.data.data;
          }else{
            alert(res.data.msg)
          }
        })
      },
      getCouponOrderInfo(){
        let self = this;
        this.axios.post(Api.userApi + '/couponOrder/selectCouponOrderInfo', this.qs.stringify({
          out_trade_no:self.oderNum
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            self.btnTxt = '打开骨米宠物APP获取票券核销二维码'
            self.orderCnt = res.data.data;
          }else{
            alert(res.data.msg)
          }
        })

      },
      getGmCardInfo(){
        let self = this;
        this.axios.post(Api.userApi + '/boneMika/selectUserBoneMikaInfo', this.qs.stringify({
          userId:self.userId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            self.btnTxt = '打开骨米宠物APP即刻享受你的特权';
            self.orderCnt = res.data.data;
            //console.log(res)
          }else{
            alert(res.data.msg)
          }
        })
      },
      isAnOrIos() {
      	var u = navigator.userAgent,
      	app = navigator.appVersion;
      	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      	if (isAndroid) {
      		//这个是安卓操作系统
      	  //alert(1)
      	  if(this.environment=='-1'){
      	    this.$router.push({name:'wxWhitePage'})
      	  }else{
      	    window.location.href = 'http://gutouzu.oss-cn-shenzhen.aliyuncs.com/manager/app-v1.0.0.apk'
      	  }
      		//alert('这个是安卓操作系统')
      	}
      	if (isIOS) {
      		//这个是ios操作系统
      		window.location.href = 'https://itunes.apple.com/cn/app/id1437699756'
      	}
      },
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
    }
  }
</script>

<style lang="scss">
  .paySus{
    height:100%;
    h3{
      font-size:36px;
      padding:30px 0;
      color:#333;
    }
    i{
      font-size:200px;
      color:green;
    }
    p{
      font-size:28px;
      color:#666;
      line-height:40px;
      padding:0 30px;
    }
    .btn{
      width:500px;
      background:#ff523d;
      height:80px;
      font-size:28px;
      color:#fff;
      border-radius:40px;
      margin-top:50px;
    }
  }
</style>
