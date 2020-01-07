<template>
  <div class="cooperWarp">
    <div class="cooperCnt">
      <div class="gmIntroduce flex_r_s_b">
        <div class="div_l">

        </div>
        <div class="div_r">
          <h1>骨米优选商城</h1>
          <h2>宠物社交电商平台</h2>
          <p>
            速认识周围有相同兴趣的宠物爱好者，参加同城宠物圈子活动，分享爱宠的精彩照片和生活趣事。
          </p>
          <p>
            同时为宠物门店提供精准的流量入口和丰富的营销工具，
            帮助商家构建线上线下结合的O2O经营体系。骨米宠物在
            给宠物爱好者带来更多养宠乐趣的同时，还能帮助中小宠
            物门店实现科学管理、精准营销与流量变现。
          </p>

          <div class="btn flex_r_f_e pointer">宠物门店入驻</div>
        </div>
      </div>
      <div class="shopList">
        <ul>
          <li class="flex_r_s_b" v-for="item in shopList">
            <div class="list_l">
              <div class="shopName">{{item.shopName}}</div>
              <div class="types">主营:{{item.shopsTypes|typeFilter}}</div>
              <div class="openTime">营业时间: {{item.startTime}}-{{item.endTime}}</div>
              <div class="addr">地址: 成都市锦江区东恒国际</div>
            </div>
            <div class="list_r">
              <div class="shopCoupon flex_r_f_s">
                <div class="item" v-for="i in item.couponList.slice(0,3)">
                  <div class="imgBox">
                    <img :src="i.compressImg" alt="">
                  </div>
                  <div class="price">¥{{i.couponPrice.toFixed(2)}}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="more pointer" @click="maskShow">查看更多商家</div>
      </div>
    </div>

  </div>
</template>

<script>
  import Api from '../api/api.js'
  export default{
    data(){
      return{
        shopList:[],
        shopTyoe:'',
      }
    },
    mounted() {
      this.getShopList();
    },
    filters:{
      typeFilter(arr){
        let tempArr = [];
        arr.forEach(e=>{
          tempArr.push(e.name)
        });
        return tempArr.join('、');

      }
    },
    methods:{
      maskShow(){
        this.$popup();
      },
      getShopList(){
        let self = this;
        this.axios.get(Api.httpApi + '/coupon/selectShopCouponListVo',{
          params:{
            keyword:'',
            latitude:0,
            longitude:0,
            pageNo:0,
            pageSize:10
          }
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.code==1){
            self.shopList = res.data.data;

          }else{
            alert(res.data.msg);
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .cooperWarp{
     padding-top:106px;
    .cooperCnt{
      width:1300px;
      margin:0 auto;
      .gmIntroduce{
        align-items:flex-start;
        padding-top:30px;
        .div_l{
          width:600px;
          height:300px;
          border:1px solid #e8e8e8;
        }
        .div_r{
           width:650px;
           text-align:left;
           h1{
             padding-top:5px;

           }
           h2{
             padding:10px 0 10px 0;
             font-family: "宋体";
           }
           p{
             line-height:24px;
             font-size:16px;
           }
           .btn{
             background:#ff523d;
             color:#fff;
             font-size:20px;
             width:150px;
             border-radius:30px;
             width:150px;
             height:50px;
            margin-top:20px;
           }
        }
      }
      .shopList{
        padding-top:50px;

        li{

          align-items:flex-start;
          padding:30px 0 20px 0;
          border-bottom:1px dashed #e8e8e8;
          .list_l{
            text-align:left;
            width:650px;
            font-size:16px;
            .shopName{
              font-size:24px;
              color:#000;
            }
            .types{
              padding-top:10px;
              line-height:20px;
            }
            .openTime{
              padding-top:10px;
            }
            .addr{
              padding-top:10px;
            }
          }
          .list_r{
             width:600px;
            .shopCoupon{
              .imgBox{
                width:130px;
                height:130px;
                margin-right:20px;
                border-radius:10px;
                img{
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius:10px;
                }
              }
              .price{
                color:#ff523d;
                font-size:16px;
                padding-top:10px;
              }
            }
          }
        }
        .more{
          text-align:center;
          font-size:18px;
          padding-top:30px;
          color:#ff523d;
          
        }
      }
    }
  }
</style>
