<template>
  <div class="mobileCoupon">
    <div class="couponList">
      <ul>
        <li v-for="item in couponList">
          <div class="couponInfo flex_r_s_b">
            <div class="item_l flex_r_s_b">
              <div class="imgBox" v-bind:style="{'background-image':'url('+item.couponIcan+')'}"></div>
              <div class="item_mind">
                <div class="couponName">{{item.couponName|descFilter}}</div>
                <div class="shopName">{{item.shopName}}</div>
              </div>
            </div>
            <div class="item_r">
              <div class="sale">

                <span v-if="item.couponType==2">￥{{item.conditionPrice}}</span>
                <span v-if="item.couponType==3&&isCard==1">￥{{item.conditionPrice}}</span>
                <span v-if="item.couponType==3&&isCard!=1">￥{{item.originalPrice}}</span>
                <span v-if="item.couponType===1">￥{{item.couponPrice}}</span>

              </div>
              <div class="condition">

                <span v-if="item.conditionPrice!==0&&item.couponType===1">满<span>{{item.conditionPrice.toFixed(1)}}</span>元使用</span>
                <span v-if="item.couponType!=1"><span class="through">{{item.couponPrice.toFixed(1)}}</span></span>
                <span v-if="item.conditionPrice==0&&item.couponType===1">无门槛使用</span>
              </div>
              <div v-if="item.couponType!=1" class="joinBtn flex_r_s_c">立即购买</div>
              <div class="joinBtn flex_r_s_c" v-else>立即领取</div>
            </div>
          </div>
          <div class="distanceBox flex_r_f_s">
            <i class="cubeic-location"></i>
            <p>{{item.shopAddr}} | {{item.distance}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default {
    data() {
      return {
        couponList: [],
        isCard: '',
        lat:0,
        lng:0
      }
    },
    mounted() {
      this.lat = this.$store.state.location.lat;
      this.lng = this.$store.state.location.lng;
      this.getCouponList();
    },
    filters: {
      descFilter(val) {
        if (val.length > 15) {
          return val.substr(0, 15) + '...'
        } else {
          return val
        }
      }
    },
    methods: {
      getCouponList() {
        let self = this;
        self.axios.post(Api.userApi + '/coupon/selectCouponListByKeyword', self.qs.stringify({
          pageNo: 0,
          pageSize: 30,
          latitude:self.lat,
          longitude:self.lng,

        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data.code == 1) {
            self.couponList = res.data.data;
          } else {
            alert(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .mobileCoupon {
    .through {
      text-decoration: line-through;
    }

    .couponList {
      padding: 0 20px;

      li {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 12px 0px rgba(15, 15, 15, 0.16);
        border-radius: 10px;
        margin-top: 30px;
        padding: 30px 20px;

        .couponInfo {
          align-items: flex-start;

          .item_l {
            width: 450px;
            align-items: flex-start;

            .imgBox {
              background-size: cover;
              background-repeat: no-repeat;
              background-position: 50%;
              border-radius: 10px;
              width: 180px;
              height: 180px;
              border-radius: 10px;
            }

            .item_mind {
              width: 250px;

              .couponName {
                font-size: 28px;
                color: #000;
                line-height: 48px;
              }

              .shopName {
                line-height: 36px;
                color: #666;
                font-size: 24px;
                margin-top: 50px;
              }
            }
          }

          .item_r {
            .joinBtn {
              width: 150px;
              height: 50px;
              border-radius: 6px;
              font-size: 26px;
              color: #fff;
              background: linear-gradient(90deg, #f7b441, #FFAF60, #FE8071, #FF7660);
              border-radius: 6px;
              margin-top: 50px;
            }

            .sale {
              font-size: 48px;
              color: #ff523d;
              text-align: center;
            }

            .condition {
              font-size: 24px;
              color: #999;
              text-align: center;
              line-height: 36px;
            }
          }
        }

        .distanceBox {
          font-size: 24px;
          padding-top: 20px;
          color: #666;
          align-items: flex-start;
          line-height: 30px;

          i {
            color: #ff523d;
            font-size: 24px;
            margin-right: 10px;
          }

        }
      }
    }
  }
</style>
