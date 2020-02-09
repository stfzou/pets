<template>
  <div class="mobileShopCoupon">
      <div class="mobileShopList">
        <ul>
          <li v-for="item in shopList" class="flex_r_s_b" @click="shopLink(item)">
            <div class="imgBox" v-bind:style="{'background-image':'url('+item.shopImgAddr+')'}"></div>
            <div class="shopInfo">
              <div class="shopName">{{item.shopName}}</div>
              <div class="shopType">主营: <span v-for="(i,subIndex) in item.shopsTypes">{{i.name}}<b v-show="subIndex!=item.shopsTypes.length-1">、</b></span></div>
              <div class="openTime flex_r_s_b"><span>营业时间 {{item.startTime}}~{{item.endTime}}</span><span>{{item.distance}}</span></div>
              <div class="saleTip flex_r_f_s"><span class="span1 flex_r_s_c">优惠</span> <span>骨米会员进店立享九折优惠</span></div>
              <div class="couponImgBox flex_r_f_s">
                <div class="couponImg" v-for="i in item.couponList.slice(0,4)">
                  <div class="pic" v-bind:style="{'background-image':'url('+i.compressImg+')'}"></div>
                  <div class="priceBox">
                    <div class="sale">

                      <span v-if="i.couponType==2">￥{{i.conditionPrice}}</span>
                      <span v-if="i.couponType==3&&isCard==1">￥{{i.conditionPrice}}</span>
                      <span v-if="i.couponType==3&&isCard!=1">￥{{i.originalPrice}}</span>
                      <span v-if="i.couponType===1">￥{{i.couponPrice}}</span>

                    </div>
                  </div>
                </div>

              </div>
              <div class="more flex_r_s_b">
                <span class="span1">该商户共有{{item.couponNum}}条优惠信息</span>
                <span class="span2">共{{item.storeNum}}家门店可用</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        shopList:[],
        isCard:'',
        lat:0,
        lng:0
      }
    },
    mounted() {
      this.lat = this.$store.state.location.lat;
      this.lng = this.$store.state.location.lng;

      this.getShopList();
    },
    filters:{
      typeFilter(val){
        return val[0]
      }
    },
    methods:{
      shopLink(item){
        this.$router.push({
          name:'shopCoupon',
          query:{
            shopId:item.shopId
          }
        })
      },
      getShopList(){
        let self = this;
        this.axios.get(Api.userApi + '/coupon/selectShopCouponListVo',{
          params:{
            keyword:'',
            latitude:self.lat,
            longitude:self.lng,
            pageNo:0,
            pageSize:60
          }
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            // self.shopList = res.data.data;
            res.data.data.forEach(e=>{
              if(e.couponList.length>0){
                self.shopList.push(e)
              }
            })
            //console.log(res)
          }else{
            alert(res.data.msg);
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .mobileShopCoupon{
    .mobileShopList{
      padding:0 20px;
      li{
        padding:30px;
        box-sizing:border-box;
        align-items:flex-start;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
        border-radius:10px;
        margin-top:30px;
        .imgBox{
          background-size:cover;
          background-repeat: no-repeat;
          background-position: 50%;
          border-radius:10px;
          width:150px;
          height:150px;
        }
        .shopInfo{
          width:439px;
          .shopName{
            font-size:28px;
            color:#000;
            font-weight:bold;

          }
          .shopType{
            font-size:22px;
            color:#999;
            line-height:36px;
            padding-top:15px;
          }
          .openTime{
            font-size:24px;
            color:#333;
            padding-top:15px;
          }
          .saleTip{
            font-size:22px;
            color:#FF523D;
            padding-top:15px;
            .span1{
              width:60px;
              height:30px;
              background:rgba(255,82,61,1);
              border-radius:15px;
              color:#fff;
              margin-right:10px;
            }
          }
          .more{
            padding-top:20px;
            font-size:22px;
            .span1{
              color:#666666;
            }
            .span2{
              color:#FF523D;
            }
          }
          .couponImgBox{
            padding-top:20px;
            .couponImg{
              margin-right:20px;
              .pic{
                background-size:cover;
                background-repeat: no-repeat;
                background-position: 50%;
                border-radius:10px;
                width:90px;
                height:90px;
              }
              .priceBox{
                padding-top:10px;
                .sale{
                  font-size:24px;
                  color:#ff523d;
                }
              }
            }

          }
        }
      }
    }
  }
</style>
