<template>
  <div class="exChangeXq">
    <div class="top_nav flex_r_s_b">
    	<div class="back"></div>
    	<div class="nav_title">店铺详情</div>
    </div>
    <div class="banner">
        <cube-slide ref="slide" :data="items">
          <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">

            <img src="../../assets/banner.png">

          </cube-slide-item>
        </cube-slide>
    </div>
    <div class="cntWarp">
      <div class="goodsInfoBox">
        <div class="goodsName">疯狂的小狗博美专用狗粮1.5KG*2包幼犬成犬粮小型犬美 毛去泪痕6斤</div>
        <div class="duihuanBox flex_r_f_s">
          <div class="num">已有180人兑换</div>
          <div class="sxdTip flex_r_s_c">随心兑</div>
        </div>
        <div class="gudouDeduction flex_r_s_c">骨豆抵￥10.90</div>
        <div class="gudouPrice flex_r_f_s">
          <span class="new">骨豆价<b>￥10.90</b></span>
          <span class="old">￥32.80</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="goodsXqImg">
        <img src="../../assets/active_bg.png" alt="">
      </div>
      <div class="duihuanBtn flex_r_s_c">立即兑换</div>
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        items:[1,2,3]
      }
    },
    methods:{
      clickHandler(item, index) {
          console.log(item, index)
      }
    }
  }
</script>

<style lang="scss">
  .exChangeXq{
    padding-bottom:96px;
    .line{

      height:10px;
      background:rgba(232,232,232,1);
    }
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
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
    .banner{
      height:720px;
      width:720px;
      .cube-slide-dots>span{
        width:22px;
        height:22px;
        background:#FFFFFF;
        border-radius:50%;
        margin:0 5px;
      }
      .cube-slide-dots>span.active{
        background:#ff523d;
      }
      .cube-slide-dots{
        margin-bottom:10px;
      }
      img{
        height:720px;
        width:720px;
        object-fit: cover;
      }

    }
    .cntWarp{
      .goodsInfoBox{
        padding: 10px 20px 0 20px;
        .goodsName{
          font-size:26px;
          font-weight:400;
          color:rgba(0,0,0,1);
          line-height:48px;
        }
        .duihuanBox{
          .num{
            font-size:22px;
            color:rgba(102,102,102,1);
            line-height:30px;
          }
          .sxdTip{
            width:90px;
            height:28px;
            font-size:20px;
            background:#64A9F8;
            border-radius:20px;
            color:#fff;
            margin-left:30px;
          }
        }
        .gudouDeduction{
          margin-top:20px;
          width:180px;
          height:40px;
          background:#FFB109;
          border-radius:20px;
          font-size:24px;
          color:#fff;
        }
        .gudouPrice{
          font-size:26px;
          line-height:48px;
          padding:20px 0 20px 0;
          .new{
            color:#ff523d;
            margin-right:20px;
            b{
             font-size:40px;
             font-weight:bold;

            }
          }
          .old{

            font-size:28px;
            text-decoration:line-through;
            color:#999999;

          }
        }

      }
      .goodsXqImg{
        padding-top:20px;
        img{
          width:100%;
          display:block;
        }
      }
      .duihuanBtn{
        height:96px;
        background:#FF523D;
        position: fixed;
        left:0;
        bottom:0;
        width:100%;
        font-size:28px;
        color:#fff;
      }
    }
  }
</style>
