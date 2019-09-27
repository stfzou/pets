<template>
  <div class="presentCenter">
    <div class="top_nav flex_r_s_b">
    	<div class="back"></div>
    	<div class="nav_title">礼品中心</div>
    </div>
    <div class="presentList">
      <ul>
        <li v-for="item in testArr">
          <div class="presentInfo flex_r_s_b">
            <img src="../../assets/product.png" alt="">
            <div class="present_r">
              <div class="presentName">比瑞吉10kg小型犬成犬天然狗粮泰迪贵 宾博美比宾博美比宾博美比宾博美比宾</div>
              <div class="present_r_bottom">
                <div class="duihuanNum"><span class="num">兑换数量</span><span>牛肉味x 1</span></div>
                <div class="orderNum"><span class="text">订单编号</span> <span class="num">7553706479</span> <span class="status">处理中</span> </div>
              </div>
            </div>
          </div>
          <div class="duihuanDate"><span class="span1">兑换日期</span> <span class="span2">2019/08/23  15:56:34</span></div>
          <div class="addressee"><span class="span1">收件人</span> <span class="span2">张三</span> <span class="phone">13888888888</span></div>
          <div class="addr">四川省成都市成华区双庆路213号华润二十四城2区1103号</div>
          <div class="remarkBox">
            <div class="remark">请耐心等待2~3天，兑换商品发出后将在这里显示物流信息</div>

          </div>
        </li>
      </ul>
      <div class="libaoBox">
        <div class="libaoItem flex_r_f_s">
          <img src="../../assets/product.png" alt="">
          <div class="libaoName">幸运大转盘99元大礼包</div>
          <div class="jihuoBtn flex_r_s_c">待激活</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        testArr:[1,2,3]
      }
    }
  }
</script>

<style lang="scss">
  .presentCenter{
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      border-bottom:1px solid #e8e8e8;/*no*/
    	.back {
    		width: 26px;
    		height: 42px;
    		background: url(../../assets/icon/backColory.png) no-repeat center 0;
    		background-size: cover;
    	}

    	.nav_title {
    		font-size: 30px;
    		color: #000;
    		position: absolute;
    		left: 50%;
    		top: 50%;
    		transform: translate(-50%, -50%);
    		font-weight:400;
    	}

    }
    .presentList{
      ul{
        padding:0 20px;
        padding-bottom:30px;
        overflow:hidden;
        li{
          margin-top:30px;
          padding:40px 20px 40px 20px;
          box-sizing:border-box;
          background:#FFFFFF;
          box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
          border-radius:10px;
          .presentInfo{
            align-items: flex-start;
            img{
              width:168px;
              height:168px;
              border-radius:10px;
              margin-right:15px;
            }
            .present_r{
              width:600px;
              .presentName{
                font-size:26px;
                color:#000;
                line-height:48px;
              }
              .present_r_bottom{
                font-size:24px;
                color:#999999;
                .duihuanNum{
                  padding-top:10px;
                  .num{
                    margin-right:30px;
                  }
                }
                .orderNum{
                  padding-top:10px;
                  .text{
                    margin-right:30px;
                  }
                  .num{
                    margin-right:80px;
                  }
                  .status{
                    color:#B129FF;
                  }
                }
              }
            }
          }
          .duihuanDate{
            font-size:24px;
            color:#333;
            padding-top:30px;
            .span1{
              margin-right:30px;
            }
          }
          .addressee{
            font-size:24px;
            color:#333;
            padding-top:20px;
            .span1{
              margin-right:30px;
            }
            .span2{
              margin-right:20px;
            }
          }
          .addr{
            padding-top:20px;
            font-size:24px;
            color:#333;
          }
          .remarkBox{
            margin-top:30px;
            padding-top:30px;
            border-top:1px dashed #E8E8E8;/*no*/
            .remark{
              color:#999999;
              font-size:24px;

            }
          }

        }
      }
      .libaoBox{
        padding:0 20px;
        padding-bottom:30px;
        .libaoItem{
          align-items: flex-start ;
          background:#fff;
          box-shadow:0px 4px 12px 0px rgba(15,15,15,0.16);
          border-radius:10px;
          padding:40px 20px 32px 20px;
          box-sizing:border-box;
          position:relative;
          img{
            width:168px;
            height:168px;
            border-radius:10px;
          }
          .libaoName{
            font-size:26px;
            color:#000;
          }
          .jihuoBtn{
            width:100px;
            height:36px;
            background:#FF523D;
            font-size:22px;
            border-radius:10px 10px 10px 10px;
            color:#fff;
            position:absolute;
            bottom:46px;
            right:20px;
          }
        }
      }
    }
  }
</style>
