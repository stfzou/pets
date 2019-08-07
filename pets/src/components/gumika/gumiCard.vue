<template>
  <div class="guimiCard">
    <div class="headPost">
      <div class="top_nav flex_r_s_b">
      	<div class="back" @click="back"></div>
      	<div class="nav_title">骨米卡特权权益</div>
      	<div class="share" @click="share"></div>
      </div>
    </div>
    <div class="cardCnt">
      <div class="vipCard">
       <!-- <div class="open flex_r_s_c">立即开通</div> -->
        <div class="barCode">
            <img src="../../assets/barCode.png" alt="">
            <div class="numCode">1234  1234  1234  1234</div>
        </div>
        <div class="validity">有效期至  2019/8/27</div>
      </div>
    </div>
    <div class="navShow flex_r_s_b">
      <img src="../../assets/icon_gu08@2x.png" alt="">
      <img src="../../assets/icon_gu09@2x.png" alt="">
      <img src="../../assets/icon_gu10@2x.png" alt="">
      <img src="../../assets/icon_gu11@2x.png" alt="">
      <img src="../../assets/icon_gu12@2x.png" alt="">
      <img src="../../assets/icon_gu13@2x.png" alt="">
      <img src="../../assets/icon_gu14@2x.png" alt="">
      <img src="../../assets/icon_gu15@2x.png" alt="">
    </div>
    <div class="interestsBox">
      <div class="interests">
        <img src="../../assets/icon_gu02@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu03@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu04@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu05@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu06@3x.png" alt="">
      </div>
      <div class="interests">
        <img src="../../assets/icon_gu07@3x.png" alt="">
      </div>
    </div>
    <div class="gufoot">
      <img src="../../assets/pay.png" alt="">
    </div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{

      }
    },
    methods: {
      back() {

      },
      share(){

      },
    },
  }
</script>

<style lang="scss">
  .guimiCard{
    background: #f5f5f5;
    .headPost{
      height: 300px;
      background: url('../../assets/icon_she200@3x.png') no-repeat 0 center;
      background-size: 100%;
      .top_nav {
      	padding: 0 20px;
      	height: 88px;
      	box-sizing: border-box;
      	position: fixed;
      	z-index: 100;
      	left: 0;
      	top: 0;
      	.back {
      		width: 26px;
      		height: 42px;
      		background: url(../../assets/icon/back@2x.png) no-repeat center 0;
      		background-size: cover;
      	}

      	.nav_title {
      		font-size: 30px;
      		color: #fff;
      		position: absolute;
      		left: 50%;
      		top: 50%;
      		transform: translate(-50%, -50%);

      	}
      	.share{
      		width: 50px;
      		height: 40px;
      		background: url('../../assets/icon/share@2x.png') no-repeat center 0;
      		background-size: 100%;
      	}
      }
    }
    .cardCnt{
      .vipCard{
        width: 660px;
        height: 360px;
        position: relative;
        background: url('../../assets/card_bg.png') no-repeat 0 0;
        background-size: cover;
        margin: -180px auto 0 auto;
      }
      .open{
        width:240px;
        height:70px;
        background:#fff;
        border-radius:35px;
        color: #ff523d;
        font-size: 26px;
        position: absolute;
        left: 60px;
        bottom: 58px;
      }
      .barCode{
        width: 454px;
        position: absolute;
        left: 50%;
        margin-left: -227px;
        bottom:65px;
        .numCode{
          text-align: center;
          font-size: 26px;
          color: #fff;
          padding-top: 10px;
        }
        img{
          width: 454px;
        }
      }
      .validity{
        font-size: 24px;
        color: #fff;
        position: absolute;
        right: 60px;
        bottom: 16px;
      }
    }
    .navShow{
      overflow: hidden;
      padding: 0 26px;
      box-sizing: border-box;
      flex-wrap: wrap;
      img{
        width: 150px;
        margin-top: 30px;
      }
    }
    .interestsBox{
      padding: 0 26px;
      padding-bottom: 40px;
      .interests{
        padding-top: 40px;

        img{
          width: 100%;
        }
      }
    }
    .gufoot{
      width: 100%;
      height: 96px;
      img{
        width: 100%;
        height: 96px;
        display: block;
      }
    }
  }
</style>
