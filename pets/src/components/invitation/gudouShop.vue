<template>
  <div class="gudouShop">
      <header class="gudouHead">
        <div class="headCnt flex_r_s_b">
          <img class="back" src="../../assets/icon/back@2x.png" alt="">
          <div class="pageName">骨豆商场</div>
          <div class="searchBox flex_r_s_b">
            <input class="gudouShopSearch" type="text" v-model="searchVal">
            <img src="../../assets/icon/icon-search@2x.png" alt="">
          </div>

          <div class="giftCenter">礼品中心</div>
        </div>

      </header>
      <div class="gudouShopCnt">
        <div class="gudouInfoBox">
          <div class="gudouInfo">
            <div class="gudouInfoTop flex_r_s_b">
              <div class="gudouNum">您有<span>1080</span>粒骨豆可使用></div>
              <div class="getGudou flex_r_s_c">如何获得骨豆？</div>
            </div>
            <div class="choujiang flex_r_s_b">
              <div class="cj-item flex_r_s_b">
                <div>
                  <div class="cj-name">骨豆抽奖</div>
                  <div class="cj-js">最高得价值99元礼品</div>
                </div>
                <img src="../../assets/icon_zhuanpan.png" alt="">
              </div>
              <div class="cj-item flex_r_s_b">
                <div>
                  <div class="cj-name">欢乐砸金蛋</div>
                  <div class="cj-js">最高得200粒骨豆</div>
                </div>
                <img src="../../assets/jindan.png" alt="">
              </div>
            </div>
          </div>

        </div>
        <div class="hotExchangeBox">
          <div class="hotExchange exBox">
             <div class="exTitle">热门兑换</div>
             <ul class="flex_r_f_s">
               <li v-for="item in testArr">
                 <div class="imgBox">
                   <img class="goodsPic" src="../../assets/product.png" alt="">
                   <img class="tipPic" src="../../assets/hot_tip.png" alt="">
                 </div>
                 <div class="desc">小型犬小型犬小型 犬洗澡优惠券</div>
                 <div class="gudouPrice flex_r_s_c">
                   骨豆价¥18.90
                 </div>
               </li>
             </ul>
          </div>
        </div>
        <div class="hotExchangeBox">
          <div class="hotExchange exBox">
             <div class="exTitle">热门兑换</div>
             <ul class="flex_r_f_s">
               <li v-for="item in testArr">
                 <div class="imgBox">
                   <img class="goodsPic" src="../../assets/product.png" alt="">
                   <img class="tipPic" src="../../assets/jx_tip.png" alt="">
                 </div>
                 <div class="desc">小型犬小型犬小型 犬洗澡优惠券</div>
                 <div class="gudouPrice flex_r_s_c">
                   骨豆价¥18.90
                 </div>
               </li>
             </ul>
          </div>
        </div>
        <div class="goodsNav">
          <cube-scroll
            ref="scroll"
            :data="navArr"
            direction="horizontal"
            class="horizontal-scroll-list-wrap">
            <div class="textBox">
              <span v-for="item in navArr">{{item}}</span>
            </div>

          </cube-scroll>

        </div>
      </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        searchVal:'',
        testArr:[1,2],
        navArr:['全部','宠物主粮','宠物零食','营养保健','生活日用','测试','测试2']
      }
    }
  }

</script>

<style lang="scss">
  .gudouShop{
    .gudouHead{
      height:246px;
      background: linear-gradient(90deg, #fb9f84, #f97d5c, #fd7046, #ff6c6c);
      .headCnt{
        padding:25px 20px;
        box-sizing: border-box;
        .back{
          width:26px;
        }
        .pageName{
          font-size:30px;
          color:#fff;
        }
        .searchBox{
          width:340px;
          height:60px;
          border-radius:30px;
          box-sizing:border-box;
          background:#fff;
          padding:0 20px;
          .gudouShopSearch{
            font-size:26px;
            width:245px;
          }
          img{
            width:34px;

          }
        }
        .giftCenter{
          font-size:26px;
          color:#fff;
        }
      }
    }
    .gudouShopCnt{
      background:#f3f3f3;
      .gudouInfoBox{
         height:160px;
         position:relative;
        .gudouInfo{
          width:680px;
          padding:24px 0 60px 0;
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 20px 0px rgba(0, 0, 0, 0.1);
          border-radius:10px;
          box-sizing:border-box;
          position: absolute;
          top:-135px;
          left:50%;
          margin-left:-340px;
          .gudouInfoTop{
            padding-left:22px;
            box-sizing:border-box;
            .gudouNum{
              font-size:24px;
              color:#000;
              span{
                font-size:36px;
                color:#ff523d;
              }
            }
            .getGudou{
              width:200px;
              height:36px;
              background:rgba(51,51,51,1);
              border-top-left-radius: 18px;
              border-bottom-left-radius: 18px;
              color:#fff;
              font-size:22px;
            }
          }
          .choujiang{
            padding:54px 20px 0 20px;
            box-sizing:border-box;
            .cj-item{
              width:310px;
              img{
                width:118px;
              }
              .cj-name{
                font-size:30px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:#000;

              }
              .cj-js{
                font-size:22px;
                font-family:Microsoft YaHei;
                font-weight:400;
                margin-top:22px;
                color:#666;
              }
            }
          }
        }

      }
      .hotExchangeBox{
        padding:28px 20px 0 20px;
        .exBox{
          padding-left:20px;
          background:#fff url("../../assets/hotec_bg.png") no-repeat 100% 0;
          background-size:660px;
          .exTitle{
            font-size:30px;
            color:#000;
            font-weight:400;
            height:88px;
            line-height:88px;
          }
          ul{
            li{
              width:220px;
              margin-right:30px;
              .imgBox{
                position:relative;
                width:220px;
                height:220px;
                border-radius:10px;
                .goodsPic{
                  width:220px;
                  height:220px;
                  object-fit: cover;
                }
                .tipPic{
                  position: absolute;
                  top:-6px;
                  left:-6px;
                  width:82px;
                }
              }
              .desc{
                font-size:26px;
                color:#333;
                line-height:46px;
                padding-top:9px;
                font-weight:400;
              }
              .gudouPrice{
                width:180px;
                height:40px;
                background:rgba(255,82,61,1);
                border-radius:20px;
                color:#fff;
                font-size:24px;
                margin-top:18px;
                margin-bottom:26px;
              }
            }
          }
        }
      }
      .goodsNav{

        padding:40px 0 20px 20px;


        span{
          margin-right:50px;
          color:#000;
          font-size:26px;
        }
        .cube-scroll-content{
          display: inline-block;
        }
        .textBox{
          white-space: nowrap;
        }
      }
    }
  }
</style>
