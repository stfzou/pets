<template>
  <div class="couponDetails">
      <div class="couponDetailsCnt">
        <div class="couponDetailsPost flex_r_s_b">
            <div class="activityCover" v-bind:style="{'background-image':'url('+couponIcan[0]+')'}"></div>
            <div class="activityInfo">
              <div class="activityTitle">{{couponName}}</div>
               <div class="condition">
                 <b>¥{{couponPrice.toFixed(2)}}</b>
                 <span>满{{conditionPrice.toFixed(2)}}元使用</span>
               </div>
              <ul>
                <li class="flex_r_f_s">
                  <div class="list_l">领取数</div>
                  <div class="list_r">已领取{{receiveNum}}张</div>
                </li>
                <li class="flex_r_f_s">
                  <div class="list_l">有效期</div>
                  <div class="list_r">{{couponStartTime}}~{{couponEndTime}}</div>
                </li>

                <li class="flex_r_f_s">
                  <div class="list_l">使用门店</div>
                  <div class="list_r">
                    <div class="shopName">{{shopName}}</div>
                    <div class="addr"><i class="el-icon-location"></i>{{shopAddress}}</div>
                  </div>
                </li>
                <li class="flex_r_f_s">
                  <div class="list_l"></div>
                  <div class="list_r"><div class="joinBtn pointer">立即购买</div></div>
                </li>
              </ul>

            </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        lng:0,
        lat:0,
        shopImg:'',
        couponIcan:[],
        couponDesc:'',
        shopAddress:'',
        couponName:'',
        couponPrice:'',
        conditionPrice:'',
        couponType:'',
        shopName:'',
        receiveNum:0,
        couponStartTime:'',
        couponEndTime:'',
        shopAddress:'',
      }
    },
    mounted() {
      this.getShopCouponList();
    },
    methods:{

      getShopCouponList(){
      	let self = this;
      	self.axios.post(Api.httpApi + '/coupon/selectCouponDetailsAndShopsInfo', self.qs.stringify({
      		userId: -1,
      		couponId: 198,
      		latitude: 0,
      		longitude: 0
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res)=>{
      		if(res.data.code == 1){
            //console.log(res.data.data)
            self.couponName = res.data.data.couponName;
            self.couponPrice = res.data.data.couponPrice;
            self.conditionPrice = res.data.data.conditionPrice;
            self.couponType = res.data.data.couponType;
            self.receiveNum = res.data.data.receiveNum;
            self.couponIcan.push(res.data.data.couponIcan)
            if(res.data.data.couponIcanA!=''){
              self.couponIcan.push(res.data.data.couponIcanA)
            }
            if(res.data.data.couponIcanB!=''){
              self.couponIcan.push(res.data.data.couponIcanB)
            }
      			self.shopAddress = res.data.data.shopAddress;
      			self.couponDesc = res.data.data.couponDesc.replace(/(\r\n)|(\n)/g,'<br>');
            //console.log(self.couponDesc)
            self.shopName = res.data.data.shopName;
            self.couponStartTime = res.data.data.couponStartTime;
            self.couponEndTime = res.data.data.couponEndTime;
            self.shopAddress = res.data.data.province+res.data.data.city+res.data.data.area+res.data.data.shopAddress;
      		}else{
      			alert(res.data.msg)
      		}

      	})
      },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .couponDetails{
    padding-top:108px;
    .couponDetailsCnt{
      width:1350px;
      margin:0 auto;
      .couponDetailsPost{
        align-items:flex-start;
        text-align:left;
        .activityCover{
          width:420px;
          height:420px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: 50%;
        }
        .activityInfo{
          width:800px;
          .activityTitle{
            font-size:20px;
            line-height:36px;
          }
          .condition{
            padding-top:30px;
            color:#ff523d;
            b{
              font-size:30px;
              margin-right:15px;

            }
          }
          ul{
            padding-top:20px;
            li{
              color:#666;
              padding-top:20px;
              align-items:flex-start;
              .list_l{
                width:100px;
                padding-top:3px;
              }
              .list_r{
                width:550px;
                line-height:20px;
                .joinBtn{
                  width:180px;
                  height:40px;
                  background:#ff523d;
                  text-align:center;
                  line-height:40px;
                  border-radius:10px;
                  font-size:20px;
                  color:#fff;
                  margin-top:30px;
                }
                .addr{
                  padding-top:10px;
                  i{
                    color:#ff523d;
                    font-size:20px;
                  }
                }
              }
            }
          }
        }
      }
    }

  }
</style>
