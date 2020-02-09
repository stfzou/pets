<template>
  <div class="couponListWarp">
     <div class="couponListCnt">
        <ul class="couponList flex_r_f_s">
          <li v-for="item in couponList">
             <div class="couponImgBox pointer">
               <img class="couponImg" :src="item.compressImg" alt="" @click="couponXq(item)">
               <img v-if="item.couponType===3" class="privilege" src="../assets/icon_gu30@3x.png" alt="">
               <img v-if="item.couponType===2" class="privilege" src="../assets/icon_gu32@3x.png" alt="">
               <img v-if="item.couponType===1" class="privilege" src="../assets/icon_gu33@3x.png" alt="">
             </div>
             <div class="couponName pointer" @click="couponXq(item)">{{item.couponName|descFilter}}</div>
             <div class="priceBox flex_r_f_s">
               <div class="sale">

                 <span v-if="item.couponType==2">￥{{item.conditionPrice}}</span>
                 <span v-if="item.couponType==3&&isCard==1">￥{{item.conditionPrice}}</span>
                 <span v-if="item.couponType==3&&isCard!=1">￥{{item.originalPrice}}</span>
                 <span v-if="item.couponType===1">￥{{item.couponPrice}}</span>

               </div>
               <div class="condition">

                 <span v-if="item.conditionPrice!==0&&item.couponType===1">满<span>{{item.conditionPrice.toFixed(1)}}</span>元使用</span>
                 <span v-if="item.couponType!=1">原价:<span class="through">{{item.couponPrice.toFixed(1)}}</span></span>
               	<span v-if="item.conditionPrice==0&&item.couponType===1">无门槛使用</span>
               </div>
             </div>
             <div class="shopName pointer" @click="shopLink(item)">{{item.shopName}}</div>
            <!-- <div class="distance">{{item.distance}}</div> -->
          </li>
        </ul>
        <div class="more pointer" @click="maskShow">查看更多优惠信息</div>
     </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        couponList:[],
        isCard:0,
      }
    },
    mounted() {
      this.getCouponList();
      if(JSON.parse(localStorage.getItem('isCard')) != null){
        this.isCard = JSON.parse(localStorage.getItem('isCard'));
      }
    },
    filters:{
      descFilter(val){
        if(val.length>22){
          return val.substr(0,22)+'...'
        }else{
          return val
        }
      },
    },
    methods:{
      couponXq(item){
        this.$router.push({
          name:'couponDetails',
          query:{
            couponId:item.couponId
          }
        })
      },
      maskShow(){
        this.$popup();
      },
      shopLink(item){
        this.$router.push({
          name:'shopCoupon',
          query:{
            shopId:item.shopId
          }
        })
      },
      getCouponList(){
      	let self = this;
      	self.axios.post(Api.httpApi + '/coupon/selectCouponAll', self.qs.stringify({
      		userId:'-1',
          pageSize:60,
      		pageNo:0,
      		latitude: 0,
      		longitude: 0,

      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res)=>{
      		if(res.data.code == 1){
            //console.log(res)
      			self.couponList = res.data.data;
      		}else{
      			alert(res.data.msg)

      		}

      	})
      },
    }

  }
</script>

<style lang="scss" scoped="scoped">
  .couponListWarp{
    padding-top:106px;
    // padding-bottom:180px;
    .through{
      text-decoration:line-through;
    }
    .couponListCnt{
      width:1350px;
      margin:0 auto;
      text-align:left;
      .couponList{
         flex-wrap:wrap;
         padding:0 90px;
         box-sizing:border-box;
         align-items:flex-start;
         li{
            width:200px;
            margin-right:30px;
            padding-bottom:20px;
           .couponImgBox{
              position: relative;
              width:200px;
              height:200px;
              .couponImg{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .privilege{
                position: absolute;
                left:0;
                top:10px;
                width:120px;
              }
           }
           .couponName{
             font-size:16px;
             color:#000;
             line-height:20px;
             padding-top:10px;
           }
           .shopName{
             font-size:14px;
             color:#666;
             padding-top:10px;
           }
           .priceBox {
             padding-top:10px;
             .sale{
               font-size:18px;
               color:#ff523d;
               margin-right:10px;
             }
             .condition{
               color:#999;
             }
           }
         }
         li:nth-child(5){
           margin-right:0;
         }
      }
      .more{
        text-align:center;
        font-size:18px;
        padding-top:50px;
        color:#ff523d;

      }
    }
  }
</style>
