<template>
  <div class="answerTwo">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">趣味测试</div>
    </div>
    <div class="questionBox">
      <div class="questionCnt">
        <div class="answerImg">
          <img class="Aimg" src="../../assets/A.png" alt="">
        </div>

        <div class="res">
            你是一个意志坚强的人，不喜欢依靠别人，喜欢独来独往。在生活中，你有一颗旺盛的好奇心，对很多事情都有强烈的兴趣，喜欢钻研琢磨。你的生活态度很理性，很少会看到你冲动做出不合理的举动。初次和你相处，可能会觉得你这个人不是很好打交道，但是深入了解后会发现你并不是表面上看得那样，高冷的外表下，你其实也很关心他人，为人亲切体贴。
        </div>
        <img class="shareBg" src="../../assets/shareImg.png" alt="">
      </div>

    </div>
    <div class="bannerPost">
        <div class="tip flex_r_f_e"><span>广告</span><i class="cubeic-close"></i></div>
        <cube-slide ref="slide" :data="items">
          <cube-slide-item v-for="(item, index) in items" :key="index">
            <a href="###">
              <img src="../../assets/as_post.jpg">
            </a>
          </cube-slide-item>
        </cube-slide>
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
      back(){

      }
    }
  }
</script>

<style lang="scss">
  .answerTwo{
    height:100%;
    overflow:auto;
    background:url('../../assets/asbg_02.png') no-repeat 0 center;
    background-size:cover;
    padding-top:88px;
    box-sizing:border-box;
    .top_nav {
    	padding: 0 20px;
    	height: 88px;
    	box-sizing: border-box;
    	z-index: 100;
      position: fixed;
      background:#363636;
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
    		font-weight:400;
    	}
    	.share{
    		width: 50px;
    		height: 40px;
    		background: url('../../assets/icon/share@2x.png') no-repeat center 0;
    		background-size: 100%;
    	}
    }
    .questionBox{
      padding:0 15px;
      .questionCnt{
        height:870px;
        background:url('../../assets/answer_02.png') no-repeat 0 center;
        background-size:100%;
        .answerImg{
          padding:120px 0 0 83px;
        }
        .Aimg{
          width:80px;
          display:block;
        }
        .res{
          padding:30px 60px 0 83px;
          line-height:46px;
          font-size:26px;
          color:#333;
        }
        .shareBg{
          display:block;
          margin:50px auto 0 auto;
          width:520px;

        }
      }
    }
    .bannerPost{
      position:fixed;
      left:50%;
      bottom:30px;
      width:616px;
      height:310px;
      transform:translateX(-50%);
      .tip{
        position:absolute;
        top:10px;
        left:10px;
        width:100px;
        height:40px;
        background:rgba(0,0,0,0.6);
        border-radius:20px;
        z-index:100;
        font-size:24px;
        color:#fff;
      }
      img{
        width:100%;
        height:310px;
        border-radius:20px;
        object-fit: cover;
      }
    }
  }
</style>
