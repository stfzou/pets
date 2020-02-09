<template>
  <div class="cashierWarp">
     <div class="cashierWarpCnt">
      <div class="cashierHead flex_r_s_b">
         <div class="head_l flex_r_f_s">
            <i class="el-icon-success"></i>
            <div class="tip">
              <h3>还差一步，去支付咯~</h3>
              <p>请在30分钟内完成支付，超时后将自动取消订单</p>
            </div>
         </div>
         <div class="head_r">
           <div class="orderPrice">应付金额：<span>¥ {{orderPrice}}</span></div>
         </div>
       </div>
      <div class="pay_mode">
        <div class="title">选择一下支付方式</div>
        <div class="pay_panel flex_r_f_s">
          <span class="aliPay pointer" @click="aliPay" :class="{active:index===1}" @mouseenter="mouseenterBorder(1)" @mouseleave="mouseleaveBorder"></span>
          <span class="wx pointer" @click="wxPay" :class="{active:index===2}" @mouseenter="mouseenterBorder(2)" @mouseleave="mouseleaveBorder"></span>
        </div>
      </div>
      <div class="qrcodeBox">
         <vue-qr :logoSrc="require('../assets/logo2.png')" :text="qrcodeUrl" :size="300"></vue-qr>
      </div>
     </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  import vueQr from 'vue-qr'
  export default{
    data(){
      return{
        index:'',
        orderPrice:'',
        couponId:'',
        qrcodeUrl:'',
        orderNo:''
      }
    },
    mounted(){
      this.orderPrice = this.$route.query.price;
      this.couponId = this.$route.query.couponId;
    },
    components: {  vueQr },
    methods:{
      mouseenterBorder(index){
        this.index = index;
      },
      mouseleaveBorder(){
        this.index = '';
      },
      updataQrcode(orderNo){
        let self = this;
        let timer = setInterval(()=>{
          self.axios.post(Api.httpApi + '/couponOrder/selectCouponOrderStatus', self.qs.stringify({
          	out_trade_no:orderNo
          }), {
          	headers: {
          		'Content-Type': 'application/x-www-form-urlencoded'
          	}
          }).then(res=>{
            if(res.data.code==1){
              self.$router.push({
                name:'paySus',
                query:{
                  orderNo:orderNo
                }
              })
              clearInterval(timer);
            }
          })
        },5000)
      },
      wxPay(){
        let self = this;
        //console.log(1)
        self.axios.post(Api.httpApi + '/coupon/WxNativePay/prepay', self.qs.stringify({
        	userId:JSON.parse(localStorage.getItem('user')).userId,
        	couponId: self.couponId

        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            //console.log(res)
            self.qrcodeUrl = res.data.data.code_url;
            self.updataQrcode(res.data.data.out_trade_no);
          }else{
            alert(res.data.msg)
          }
        })
      },
      aliPay(){
        let self = this;
        this.$router.push({
          name:'aliPay',
          query:{
            couponId: self.couponId
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .cashierWarp{
    padding-top:130px;
    .cashierWarpCnt{
      
      width:960px;
      margin:0 auto;
      .cashierHead{
        height: 130px;
        padding:0 50px;
        box-sizing:border-box;
        background-color: #fafafa;
        .head_l{
          width:480px;
          i{
            font-size:50px;
            color:#30c3a6;
            margin-right:30px;
          }
          h3{
            font-size: 24px !important;
            margin-bottom: 5px;
            text-align:left;
          }
          p{
            font-size: 18px;
            color:#666;

          }
        }
        .head_r{
          .orderPrice{
            font-size: 16px;
            span{
              color: #ff4081;
            }
          }
        }
      }
      .pay_mode{
        text-align:left;
        padding-top:30px;
        .title{
          padding-bottom: 20px;
          font-size: 18px;
          border-bottom: 1px solid #eee;
          color:#333;

        }
        .pay_panel{
          padding-top:30px;
          span{
            width: 160px;
            height: 45px;
            border: 1px solid #E0E0E0;
            border-radius: 1px;
            box-sizing: border-box;
            margin-right:30px;
          }
          .aliPay{
            background: #fff url(../assets/aliPay.png) center center no-repeat;
            background-size: 100% auto;
          }
          .wx{
            background: #fff url(../assets/wxPay.png) center center no-repeat;
            background-size: 100% auto;
          }
          .active{
            border: 1px solid #333;
          }
        }
      }
      .qrcodeBox{
        padding-top:50px;
        #qrcode{
          width:300px;
          height:300px;
          margin:0 auto;
        }
      }
    }
  }
</style>
