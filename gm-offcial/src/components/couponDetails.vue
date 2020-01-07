<template>
  <div class="couponDetails">
      <div class="couponDetailsCnt">
        <div class="couponDetailsPost flex_r_s_b">
          <div class="activityCoverBox">
            <div class="activityCover" v-bind:style="{'background-image':'url('+couponIcanImg+')'}"></div>
            <div class="activityCoverList flex_r_s_b">
                <i class="el-icon-arrow-left leftBtn pointer" :class="{activeI:couponIndex==0}" @click="leftClick"></i>
                <ul class="flex_r_f_s pointer">
                  <li @click="imgClick(item,index)" v-for="(item,index) in couponIcan" :class="{activeLi:couponIndex==index}" v-bind:style="{'background-image':'url('+item+')'}">

                  </li>

                </ul>
                <i class="el-icon-arrow-right rightBtn pointer" :class="{activeI:couponIndex==couponIcan.length-1}" @click="rightClick"></i>
            </div>
          </div>
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
                  <div class="list_r"><div class="joinBtn pointer" @click="maskShow">立即购买</div></div>
                </li>
              </ul>

            </div>
        </div>
        <div class="explain">
          <div class="title">使用说明</div>
          <p v-html="couponDesc"></p>
        </div>
        <div class="shopMoreCoupon">
          <div class="title">商家更多福利</div>
          <div class="shopCouponList">
            <ul class="flex_r_f_s">
              <li v-for="item in shopCoupons">
                 <div class="imgBox" v-bind:style="{'background-image':'url('+item.couponIcan+')'}"></div>
                 <div class="couponName">{{item.couponName}}</div>
              </li>
            </ul>
            <div class="more pointer" @click="maskShow">查看更多</div>
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
        couponPrice:0,
        conditionPrice:0,
        couponType:'',
        shopName:'',
        receiveNum:0,
        couponStartTime:'',
        couponEndTime:'',
        shopAddress:'',
        couponIcanImg:'',
        couponIndex:0,
        shopId:'',
        couponId:'',
        shopCoupons:[]
      }
    },
    mounted() {
      this.couponId = this.$route.query.couponId;
      this.getShopCouponList();
    },
    methods:{
      maskShow(){
        this.$popup();
      },
      leftClick(){
        if(this.couponIndex <=0 ){
          this.couponIndex = 0
        }else{
          this.couponIndex--;
          this.couponIcanImg = this.couponIcan[this.couponIndex];
        }
      },
      rightClick(){

        if(this.couponIndex == this.couponIcan.length-1 ){
          this.couponIndex = this.couponIcan.length-1
        }else{
          this.couponIndex++;
          this.couponIcanImg = this.couponIcan[this.couponIndex];
        }
      },
      imgClick(item,index){
        this.couponIcanImg = item;
        this.couponIndex = index;
      },
      getShopCouponList(){
      	let self = this;
      	self.axios.post(Api.httpApi + '/coupon/selectCouponDetailsAndShopsInfo', self.qs.stringify({
      		userId: -1,
      		couponId: self.couponId,
      		latitude: 0,
      		longitude: 0
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res)=>{
      		if(res.data.code == 1){
            //console.log(res.data.data)
            self.shopId = res.data.data.shopId;
            self.getShopCoupon();
            self.couponName = res.data.data.couponName;
            self.couponPrice = res.data.data.couponPrice;
            self.conditionPrice = res.data.data.conditionPrice;
            self.couponType = res.data.data.couponType;
            self.receiveNum = res.data.data.receiveNum;
            self.couponIcanImg = res.data.data.couponIcan;
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
      getShopCoupon(){
        let self = this;
        self.axios.post(Api.httpApi + '/coupon/selectShopsCoupon', self.qs.stringify({
        	userId: -1,
        	shopId:self.shopId,
        	latitude: 0,
        	longitude: 0
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){

            if(res.data.data.shopCoupons.length>8){
              self.shopCoupons = res.data.data.shopCoupons.slice(0,8);
            }else{
              self.shopCoupons = res.data.data.shopCoupons;
            }
          }
        })
      }
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
          border-radius:10px;
        }
        .activityCoverList{
          padding-top:20px;
          i{
            font-size:32px;
            font-weight:bold;
            color:#333;
          }
          .activeI{
            color:#999;
          }
          ul{
            width:340px;
            li{
              background-size:cover;
              background-repeat: no-repeat;
              width:70px;
              height:70px;
              border-radius:10px;
              margin-right:20px;

              box-sizing:border-box;
            }
            .activeLi{
              border:1px solid red;
            }
          }

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
    .explain{
      text-align:left;
      padding-top:60px;
      .title{
        padding-left:10px;
        border-left:3px solid #ff523d;
        font-size:18px;
        color:#333;
      }
      p{
        padding-top:30px;
        line-height:20px;
        color:#999999;
        line-height:30px;
      }
    }
    .shopMoreCoupon{
      padding-top:30px;
       text-align:left;
      .title{
        padding-left:10px;
        border-left:3px solid #ff523d;
        font-size:18px;
        color:#333;
      }
      .shopCouponList{
        padding-top:30px;
        ul{
          align-items:flex-start;
          li{
            width:160px;
            margin-right:20px;
            .imgBox{
              background-size: contain;
              background-repeat: no-repeat;
              background-position: 50%;
              width:160px;
              height:160px;
              border-radius:20px;
            }
            .couponName{
              padding-top:10px;
              line-height:30px;
              color:#666;
            }
          }
        }
        .more{
          color:#ff523d;
          font-size:16px;
          padding-top:20px;
        }
      }
    }

  }
</style>
