<template>
  <div class="paySusWarp">
    <div class="paySusCnt">
      <div class="susIcon"><i class="el-icon-success"></i></div>
      <p>您的订单<span>{{orderNo}}</span>已支付成功,感谢您的参与</p>
      <div class="btnBox">
        <el-button type="success" @click="couponLink">继续购买</el-button>
        <el-button type="primary" @click="openOrder">查看订单</el-button>
      </div>
      <div class="erweimaBox flex_r_f_e">
        <div class="ios ewmItem">
          <div class="divTop flex_r_f_s">
            <img src="../assets/iOS.png" alt="">
            <span>IOS版</span>
          </div>
          <div class="ewm">
            <img src="../assets/ewm_IOS.png" alt="">
          </div>
        </div>
        <div class="android ewmItem">
          <div class="divTop flex_r_f_s">
            <img src="../assets/Android.png" alt="">
            <span>安卓版</span>
          </div>
         <div class="ewm">
            <img src="../assets/ewm_And.png" alt="">
          </div>
        </div>

      </div>
      <div class="dowTip">推荐你下载骨米宠物APP，进入【我的】-【我的优惠券】查看订单详情信息！</div>
    </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        orderInfo:'',
        orderNo:''
      }
    },
    mounted() {
      this.orderNo = this.getUrlKey('orderNo');
      this.getOrderInfo();
    },
    methods:{
      getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      couponLink(){
        this.$router.push({
          name:'couponList'
        })
      },
      getOrderInfo(){
        let self = this;
        self.axios.post(Api.httpApi + '/couponOrder/selectCouponOrderInfo', self.qs.stringify({
        	out_trade_no:self.orderNo
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            self.orderInfo = res.data.data;

          }
        })
      },
      openOrder() {
        let self = this;
         console.log(self.orderInfo)
        this.$alert(self.orderInfo, '订单信息', {
          dangerouslyUseHTMLString: true
        });
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .paySusWarp{
    height:600px;
    box-sizing:border-box;
    position:relative;
    .paySusCnt{
      width:500px;
      height:500px;
      position: absolute;
      top:400px;
      left:50%;
      margin-left:-250px;
      margin-top:-250px;
      .dowTip{
        padding-top:20px;
        font-size:14px;
      }
      .erweimaBox{
        padding-top:30px;
        align-items:flex-start;

        .ewmItem{
          position: relative;
          border-radius: 20px;
          padding:10px;
          background:#fff;
          .divTop{
            width: 150px;
            background:#fff;
            justify-content: center;
            align-items: center;
            img{
              width:30px;
              margin-right:5px;
            }
          }
          .ewm{
            background:#fff;
            margin-top:10px;
            img{
              width:134px;
              height:134px;
            }
          }

        }
      }
      .susIcon{
        i{
          font-size:50px;
          color:#30c3a6;
        }
      }
      p{
        font-size:16px;
        padding-top:30px;
        color:#333;
        span{
          color:#ff523d;
        }
      }
      .btnBox{
        padding-top:30px;
      }
    }
  }
</style>
