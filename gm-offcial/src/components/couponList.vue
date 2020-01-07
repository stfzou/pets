<template>
  <div class="couponListWarp">
     <div class="couponListCnt">
        <ul class="couponList flex_r_f_s">
          <li v-for="item in couponList" @click="couponXq(item)">
             <div class="couponImgBox pointer">
               <img class="couponImg" :src="item.compressImg" alt="">
               <img v-if="item.couponType===3" class="privilege" src="../assets/icon_gu30@3x.png" alt="">
               <img v-if="item.couponType===2" class="privilege" src="../assets/icon_gu32@3x.png" alt="">
               <img v-if="item.couponType===1" class="privilege" src="../assets/icon_gu33@3x.png" alt="">
             </div>
             <div class="couponName">{{item.couponName|descFilter}}</div>
             <div class="shopName pointer">{{item.shopName}}</div>
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
        couponList:[]
      }
    },
    mounted() {
      this.getCouponList();
    },
    filters:{
      descFilter(val){
        if(val.length>20){
          return val.substr(0,20)+'...'
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
      getCouponList(){
      	let self = this;
      	self.axios.post(Api.httpApi + '/coupon/selectCouponList', self.qs.stringify({
      		userId:'',
      		pageNo:0,
      		city:'',
      		couponPrice:'',
      		condition:'',
      		distance:'',
      		pageSize: 15,
      		latitude: 0,
      		longitude: 0,
      		couponPTypeId:-1,
          couponType:3
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res)=>{
      		if(res.data.code == 1){
            console.log(res)
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
    .couponListCnt{
      width:1350px;
      margin:0 auto;
      text-align:left;
      .couponList{
         flex-wrap:wrap;
         padding:0 90px;
         box-sizing:border-box;
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
           .distance{
             font-size:16px;
             color:#333;
             padding-top:10px;
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
