<template>
  <div class="shopCouponWarp">
    <div class="shopCouponCnt">
      <div class="shopInfoBox flex_r_s_b">
        <div class="shopImg" v-bind:style="{'background-image':'url('+shopInfo.shopImgAddr+')'}"></div>
        <div class="shopInfo">
          <div class="shopName">{{shopInfo.shopName}}</div>
          <ul>

            <li class="flex_r_f_s">
              <div class="list_l">店铺简介</div>
              <div class="list_r">{{shopInfo.shopDesc}}</div>
            </li>

            <li class="flex_r_f_s">
              <div class="list_l">商户地址</div>
              <div class="list_r">
                {{shopInfo.city}}{{shopInfo.area}}{{shopInfo.shopAddress}}
              </div>
            </li>
            <li class="flex_r_f_s">
              <div class="list_l">营业时间</div>
              <div class="list_r">
                {{shopInfo.startTime}}~{{shopInfo.endTime}}
              </div>
            </li>
          </ul>
        </div>
        <div class="relevantShop">
            <div class="title">相关门店</div>
            <ul>
              <li v-for="item in storeList">
                {{item.name}}
              </li>
            </ul>
            <div class="more pointer" v-if="storeNum>7" @click="maskShow">查看更多门店</div>
        </div>
      </div>
      <div class="shopCouponList">
        <div class="title flex_r_s_b">
          <span></span>
          <b>该商户更多优惠信息</b>
          <span></span>
        </div>
        <ul class="flex_r_f_s">
          <li v-for="item in shopInfo.shopCoupons" class="pointer" @click="couponXq(item)">
            <div class="imgBox" v-bind:style="{'background-image':'url('+item.couponIcan+')'}"></div>
            <p>{{item.couponName|nameFilter}}</p>
            <div class="priceBox flex_r_f_s">
              <div class="sale">

                <span v-if="item.couponType!=1">￥{{item.conditionPrice.toFixed(1)}}</span>
                <span v-if="item.couponType===1">￥{{item.couponPrice.toFixed(1)}}</span>

              </div>
              <div class="condition">

                <span v-if="item.conditionPrice!==0&&item.couponType===1">满<span>{{item.conditionPrice.toFixed(1)}}</span>元使用</span>
                <span v-if="item.couponType!=1">原价:<span class="through">{{item.couponPrice.toFixed(1)}}</span></span>
              	<span v-if="item.conditionPrice==0&&item.couponType===1">无门槛使用</span>
              </div>
            </div>
          </li>


        </ul>
        <div class="more pointer" @click="maskShow">查看更多优惠券</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        shopId:'',
        shopInfo:'',
        shopUserId:'',
        storeList:[],
        storeNum:0

      }
    },
    filters:{
      nameFilter(val){
        if(val.length>20){
          return val.substr(0,20)+'...'
        }else{
          return val
        }
      },
    },
    mounted() {
      this.shopId = this.$route.query.shopId;
      this.getShopCouponList();
    },
    methods:{
      maskShow(){
        this.$popup();
      },
      couponXq(item){

        this.$router.push({
          name:'couponDetails',
          query:{
            couponId:item.couponId
          }
        })
      },
      getShopCouponList(){

      	let self = this;
      	self.axios.post(Api.httpApi + '/coupon/selectShopsCoupon', self.qs.stringify({
      		userId:-1,
      		shopId: self.shopId,
      		latitude:0,
      		longitude:0
      	}), {
      		headers: {
      			'Content-Type': 'application/x-www-form-urlencoded'
      		}
      	}).then((res)=>{
      		if(res.data.code == 1){
            //console.log(res.data.data)
            self.shopInfo = res.data.data;
            if(self.shopInfo.shopCoupons.length>6){
              self.shopInfo.shopCoupons = self.shopInfo.shopCoupons.slice(0,6)
            }
            self.shopUserId = res.data.data.shopUserId;
            self.getShopStore();
      		}else{
      			alert(res.data.msg)
      		}

      	})
      },
      getShopStore(){
        let self = this;
        self.axios.get(Api.httpApi + '/multipleShop/selectMultipleShopInfo',{
        	params:{
        	  userId:self.shopUserId,
        	  latitude:30.65984,
        	  longitude:104.10194
        	}
        }, {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
        	if(res.data.code == 1){
            self.storeNum = res.data.data.totalShopNum;
            if(res.data.data.list.length>7){
              self.storeList = res.data.data.list.slice(0,7);
            }else{
              self.storeList = res.data.data.list;
            }
            //console.log(self.storeList)

        	}else{
        		alert(res.data.msg)
        	}

        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .shopCouponWarp{
    padding-top:108px;
    .through{
      text-decoration:line-through;
    }
    .shopCouponCnt{
      width:1100px;
      margin:0 auto;
      .shopInfoBox{
        align-items:flex-start;
        .shopImg{
          background-size:cover;
          background-repeat: no-repeat;
          background-position: 50%;
          width:320px;
          height:320px;
          border-radius:10px;
          border:1px solid rgba(245,245,245,1);

        }
        .shopInfo{
          text-align:left;
          width:430px;
          height:300px;
          border-right:1px solid #E8E8E8;
          padding-right:60px;
          .shopName{
            font-size:20px;
            color:#333;
            padding-bottom:40px;
          }
          ul{
            color:#666;
            li{
              padding-bottom:28px;
              align-items:flex-start;
              .list_l{
                width:100px;
                padding-top:6px;
              }
              .list_r{
                width:450px;
                line-height:26px;
              }
            }
          }
        }
        .relevantShop{
          width:200px;
          .title{
            font-size:18px;
            color:#333;
          }
          ul{

            li{
              text-align:left;
              color:#666;
              padding-top:20px;
              width:200px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          .more{
            font-size:16px;
            color:#ff523d;
            padding-top:20px;
          }
        }
      }
      .shopCouponList{
        padding-top:80px;
        .title{
          width:420px;
          margin:0 auto;
          span{
            width:100px;
            height:1px;
            background:rgba(102,102,102,1);
          }
          b{
            font-size:18px;
            color:#333333;
          }
        }
        ul{
          padding-top:40px;
          align-items:flex-start;
          li{
            width:160px;
            margin-right:20px;
            .imgBox{
              background-size:cover;
              background-repeat: no-repeat;
              width:160px;
              height:160px;
              border-radius:10px;

            }
            p{
              line-height:20px;
              color:#666;
              padding-top:5px;
              text-align:left;
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
        }
        .more{
          font-size:16px;
          color:#ff523d;
          padding-top:20px;
        }
      }
    }
  }
</style>
