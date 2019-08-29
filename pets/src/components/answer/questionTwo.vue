<template>
  <div class="questionTwo">
    <div class="top_nav flex_r_s_b">
    	<div class="back" @click="back"></div>
    	<div class="nav_title">趣味测试</div>
    </div>
    <div class="questionBox">
      <div class="questionCnt">
        <div class="titile">测对于他人的挑衅你会隐忍吗</div>
        <div class="q_text">
          生活中遇到跟自己意见相左的人，你便会把对方列为敌人的行列吗？
        </div>
      </div>
      <ul class="questionList">
        <li class="flex_r_f_s">
          <div class="select">A</div>
          <div class="selectText">是的</div>
        </li>
        <li class="flex_r_f_s">
          <div class="select">A</div>
          <div class="selectText">是的</div>
        </li>
        <li class="flex_r_f_s">
          <div class="select">A</div>
          <div class="selectText">是的</div>
        </li>
        <li class="flex_r_f_s">
          <div class="select">A</div>
          <div class="selectText">是的</div>
        </li>
      </ul>
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
  .questionTwo{
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
        height:420px;
        background:url('../../assets/question_02.png') no-repeat 0 center;
        background-size:100%;
        .titile{
          padding:150px 50px 0 50px;
          text-align:center;
          font-weight:bold;
          font-size:30px;
          color:#333;
        }
        .q_text{
          text-align:left;
          padding:50px 50px 0 50px;
          font-size:26px;
          color:#333;
          line-height:48px;
        }

      }
      .questionList{
        padding:60px 34px 0 44px;
        li{
          background:url('../../assets/select_bg_02.png') no-repeat 0 center;
          background-size:cover;
          height:160px;
          padding-left:66px;
          box-sizing:border-box;
          border-radius:10px;
          margin-bottom:40px;
          overflow:hidden;
          .select{

            font-size:26px;
            color:#000;
          }
          .selectText{
            margin-left:40px;
            font-size:26px;
            color:#000;
          }
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
