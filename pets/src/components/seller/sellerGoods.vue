<template>
  <div class="sellerGoods_warp">
    <cube-scroll ref="scroll" @pulling-up="onPullingUp" @pulling-down="onPullingDown" :options="options">
      <div class="goods_list flex_r_s_b">
        <div class="goods" v-for="(item,index) in goodsData" :key="index" @click="goodsDetailLink(item)">
          <img class="goods_pic" :src="item.pmainImgAddr" alt="">
          <div class="goods_info">
            <h3>{{item.productName}}</h3>
            <div class="goods_price flex_r_s_b">
              <div class="left">
                <div class="money">
                  <span class="new" v-if="item.activityPricr">{{item.activityPricr}}</span>
                  <span class="new" v-else>￥{{item.original}}</span>
                  <span class="old" v-if="item.activityPricr">￥{{item.original}}</span>
                </div>
                <div class="num">已售{{item.saleNum}}件</div>
              </div>
              <div class="shop_car"></div>
            </div>
          </div>
        </div>

      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default {
    data() {
      return {
        options: {
          pullDownRefresh: {
            txt: '更新成功',
            threshold: 60
          },
          pullUpLoad: {
            txt: {
              more: '加载更多',
              noMore: '没有更多数据了',
            },
            threshold: 30,

          }
        },
        goodsData: [],
        page: 0
      };
    },
    mounted() {
      if (JSON.parse(sessionStorage.getItem('user')) == null) {

        this.$router.push({
          name: 'login'
        })
        return false;
      }
      let h = document.documentElement.clientHeight - document.querySelector(".sellerGoods_warp").offsetTop;
      document.querySelector(".sellerGoods_warp").style.height = h + 'px';

      console.log(sessionStorage.getItem('user'))
      this.getGoods()
    },
    methods: {

      onPullingDown() {
        // 模拟更新数据
        // this.page = 0;
        this.page = 0;
        this.getGoods();
      },
      onPullingUp() {
        // 模拟更新数据

        let self = this;
        this.page++;
        self.axios.post(Api.shopApi + '/webShop/selectProductBasicByShopId', self.qs.stringify({
          shopId: JSON.parse(sessionStorage.getItem('user')).shopId,
          pageNo: self.page,
          pageSize: 8
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            if(res.data.data.length>1){
              setTimeout(() => {
                self.goodsData.push(...res.data.data)
                self.$refs.scroll.forceUpdate();
                setTimeout(() => {
                  self.$refs.scroll.refresh();
                }, 100)
              }, 500)
            }else{
              setTimeout(() => {
                self.$refs.scroll.forceUpdate();
              }, 500)
            }
          } else {
            self.$refs.scroll.forceUpdate();
            let toast = self.$createToast({
              time: 500,
              txt: res.data.msg
            })
            toast.show()
          }
        })


      },
      getGoods() {
        let self = this;
        self.axios.post(Api.shopApi + '/webShop/selectProductBasicByShopId', self.qs.stringify({
          shopId: JSON.parse(sessionStorage.getItem('user')).shopId,
          pageNo: self.page,
          pageSize: 8
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if (res.data.code == 1) {
            self.goodsData = res.data.data;
            self.$refs.scroll.forceUpdate();
            setTimeout(() => {
              self.$refs.scroll.refresh();

            }, 500)
          } else {
            const toast = this.$createToast({
              time: 500,
              txt: res.data.msg
            })
            toast.show()
          }
        })
      },
      goodsDetailLink(item) {
        this.$router.push({
          name: 'goodsDetails',
          query: {
            pId: item.productId
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/mixin.scss';

  .sellerGoods_warp {

    // padding-bottom:20px;
    // height: 800px;
    .goods_list {
      padding: 0 20px;
      flex-wrap: wrap;
      box-sizing: border-box;

      .goods {

        border: 1px solid rgba(232, 232, 232, 1);
        margin-top: 16px;
        box-sizing: border-box;
        padding: 20px 20px 20px 10px;

        .goods_pic {
          width: 290px;
          height: 180px;
          display: block;
          margin: 0 auto;
          object-fit: cover;
        }

        .goods_info {
          h3 {
            font-size: 24px;
            color: #010000;
            margin-top: 36px;
            margin-bottom: 22px;
          }

          .goods_price {
            .left {
              .money {
                .new {
                  font-size: 28px;
                  color: #FF523D;
                  margin-right: 5px;
                }

                .old {
                  text-decoration: line-through;
                  font-size: 21px;
                  color: #333;
                }
              }

              .num {
                font-size: 21px;
                color: #666;
                margin-top: 13px;
              }
            }

            .shop_car {
              height: 60px;
              width: 60px;
              border-radius: 50%;
              @include bg-image("icon-car");
              background-size: cover;
            }
          }
        }
      }


    }
  }
</style>
